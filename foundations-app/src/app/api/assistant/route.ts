import { openai } from "@ai-sdk/openai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { getKnowledgeFallbackResponse } from "@/lib/ai-assistant-service";
import { getProjectDetails, lookupProjectDetails } from "@/lib/ai/tools/get-project-details";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are Vivek Sharma's Portfolio Engineering Assistant. Use only verified portfolio evidence. Never invent metrics, project outcomes, technologies, ownership, or links. When a user asks about a named portfolio project, use getProjectDetails before answering so they can inspect the structured evidence. State documented limitations plainly.`;

function getModel() {
  if (process.env.OPENAI_API_KEY) {
    return openai(process.env.OPENAI_MODEL || "gpt-4o-mini");
  }

  if (process.env.GROQ_API_KEY) {
    const groq = createOpenAICompatible({
      name: "groq",
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    return groq(process.env.GROQ_MODEL || "qwen/qwen3.6-27b");
  }

  return null;
}

function extractRequestedProject(query: string) {
  return query
    .replace(/^(please\s+)?(tell me|show me|what can you tell me|give me details)\s+(about\s+)?/i, "")
    .replace(/^(the\s+)?/i, "")
    .replace(/[?.!]+$/, "")
    .trim();
}

function shouldUseProjectLookup(query: string) {
  return /video restoration|aips|academic intelligence|ai-assisted engineering workflow|contact form|project/i.test(query);
}

const wait = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function createFallbackResponse(query: string) {
  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      if (shouldUseProjectLookup(query)) {
        const toolCallId = `project-${crypto.randomUUID()}`;
        const projectName = extractRequestedProject(query);

        writer.write({ type: "tool-input-start", toolCallId, toolName: "getProjectDetails", providerExecuted: true });
        await wait(220);
        writer.write({ type: "tool-input-delta", toolCallId, inputTextDelta: JSON.stringify({ projectName }) });
        await wait(180);
        writer.write({
          type: "tool-input-available",
          toolCallId,
          toolName: "getProjectDetails",
          input: { projectName },
          providerExecuted: true,
        });

        try {
          const result = await lookupProjectDetails(projectName);
          await wait(220);
          writer.write({ type: "tool-output-available", toolCallId, output: result, providerExecuted: true });
          writer.write({ type: "text-start", id: "fallback-answer" });
          writer.write({
            type: "text-delta",
            id: "fallback-answer",
            delta: `I found verified portfolio details for ${result.project.name}. The project card below contains the available evidence and links.`,
          });
          writer.write({ type: "text-end", id: "fallback-answer" });
        } catch (error) {
          writer.write({
            type: "tool-output-error",
            toolCallId,
            errorText:
              error instanceof Error ? error.message : "Project details couldn't be loaded. Please try again.",
            providerExecuted: true,
          });
        }

        return;
      }

      const textId = "fallback-answer";
      writer.write({ type: "text-start", id: textId });
      writer.write({ type: "text-delta", id: textId, delta: getKnowledgeFallbackResponse(query) });
      writer.write({ type: "text-end", id: textId });
    },
    onError: () => "The assistant could not complete that request. Please try again.",
  });

  return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
  try {
    // ─── Development Sabotage Flags (Dev/Test Only) ─────────────────────────
    if (process.env.NODE_ENV !== "production") {
      const failureMode = process.env.AI_TEST_FAILURE;

      if (failureMode === "rate-limit") {
        return Response.json(
          {
            error: "Rate limit exceeded (HTTP 429). The AI provider has temporarily throttled requests. Please wait a few moments before retrying.",
            code: "RATE_LIMIT_EXCEEDED",
          },
          {
            status: 429,
            headers: {
              "Retry-After": "5",
            },
          }
        );
      }

      if (failureMode === "midstream") {
        const stream = createUIMessageStream({
          execute: async ({ writer }) => {
            const textId = `midstream-${crypto.randomUUID()}`;
            writer.write({ type: "text-start", id: textId });
            writer.write({
              type: "text-delta",
              id: textId,
              delta: "Inspecting pipeline evidence and sequential frame-matcher architecture...",
            });
            await wait(350);
            writer.write({
              type: "text-delta",
              id: textId,
              delta: " Verifying InsightFace and PySceneDetect boundaries...",
            });
            await wait(250);
            throw new Error("Simulated mid-stream network drop (AI_TEST_FAILURE=midstream).");
          },
          onError: () => "Mid-stream connection interrupted. Please use the retry action.",
        });

        return createUIMessageStreamResponse({ stream });
      }
    }

    const body = (await req.json()) as { messages?: UIMessage[] };

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return Response.json({ error: "A non-empty messages array is required." }, { status: 400 });
    }

    const lastUserMessage = [...body.messages]
      .reverse()
      .find((message) => message.role === "user")
      ?.parts.filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ")
      .slice(0, 4000);

    const model = getModel();

    if (!model) {
      return createFallbackResponse(lastUserMessage || "");
    }

    const sanitizedMessages = body.messages.map((message) => ({
      ...message,
      parts: Array.isArray(message.parts)
        ? message.parts.filter((part) => (part as { type: string }).type !== "reasoning")
        : message.parts,
    }));

    try {
      const result = streamText({
        model,
        system: SYSTEM_PROMPT,
        messages: await convertToModelMessages(sanitizedMessages),
        tools: { getProjectDetails },
        stopWhen: stepCountIs(5),
      });

      return result.toUIMessageStreamResponse({
        onError: (err) => {
          console.warn("Stream error encountered:", err);
          return "The assistant could not complete that request. Please try again.";
        },
      });
    } catch (streamError) {
      console.warn("streamText initialization failed, falling back to local knowledge stream:", streamError);
      return createFallbackResponse(lastUserMessage || "");
    }
  } catch (error) {
    console.error("Assistant route error:", error);
    return Response.json({ error: "The assistant could not read that request. Please try again." }, { status: 400 });
  }
}
