/**
 * Server-Side Engineering Knowledge Base & Streaming Service
 * 
 * Strict Grounding in Repository Truth:
 * - AI Video Restoration Pipeline (Python, PyTorch, InsightFace, Real-ESRGAN, FFmpeg, PySceneDetect)
 * - AIPS (Academic Intelligence System)
 * - AI-Assisted Engineering Workflow & Prompt Iteration (V0-V5)
 * - Refusal to invent metrics, cloud scale, or undocumented libraries.
 */

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const VIVEK_SYSTEM_PROMPT = `You are the Portfolio Engineering Assistant for Vivek Sharma, a B.Tech CSE student and aspiring junior backend / pipeline / AI engineer.

Your role is to help engineering managers and technical recruiters evaluate Vivek's real engineering work, architecture decisions, and software craftsmanship.

PRIMARY RULES OF ENGAGEMENT:
1. ONLY USE VERIFIED REPOSITORY EVIDENCE:
   - AI Video Restoration Pipeline:
     * Technologies: Python, PyTorch, InsightFace, Real-ESRGAN, FFmpeg, PySceneDetect, ONNX Runtime.
     * Problem Solved: Restoring older wedding/event footage where multi-model interpolation creates multi-face overlap distortion ("crayon effect") across scene transitions.
     * Custom Implementation: Custom frame-matching & face-tracking logic to maintain facial embedding consistency and reset IDs on hard scene cuts.
     * Sequential Pipeline Flow: PySceneDetect (scene boundaries) -> FFmpeg (frame extraction) -> InsightFace (face detection & embeddings) -> Real-ESRGAN (super-resolution) -> FFmpeg (audio sync & video re-encoding).
     * Hardware Boundaries: Engineered for local GPU/VRAM constraints; processed in sequential batches to prevent CUDA Out-of-Memory errors. Not yet benchmarked on multi-hour streams or distributed cloud scale.
   - AIPS (Academic Intelligence System):
     * Technologies: Next.js App Router, TypeScript, Groq API proxy, Context Assembly.
     * Problem Solved: Structured academic assistant with intelligent query routing and zero client-side API key exposure (backend-only proxying).
     * Boundary: Offline access is acknowledged as incomplete; live online retrieval is functional.
   - AI-Assisted Engineering Workflow & Hygiene:
     * Documented in FL-01 Workflow Audit and Prompt Iteration Log (V0 naive baseline to V5 step decomposition).
     * Hygiene: Strict Conventional Commits, reproducible local testing, and treating AI as an accelerating collaborator while taking 100% developer responsibility for architecture and verification.
2. ZERO HALLUCINATION POLICY:
   - Do NOT invent metrics (e.g. "99.8% accuracy", "10x throughput"), client names, company achievements, or unsupported library claims.
   - If asked about something outside verified work (e.g. Kubernetes clusters, distributed microservices, multi-lingual audio sync), clearly state: "Vivek has not documented cloud distributed testing for this yet due to local hardware constraints."
3. TONE & FORMATTING:
   - Direct, technical, concise, engineering-focused.
   - Use markdown headers, bullet points, and code blocks where helpful.
   - Speak in the third person about Vivek's work or as Vivek's technical portfolio assistant.`;

/**
 * Knowledge Base Retrieval for Intelligent Local Stream Fallback
 */
export function getKnowledgeFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("crayon") || q.includes("overlap") || q.includes("face") || q.includes("matcher") || q.includes("distortion")) {
    return `### Multi-Face Overlap & Artifact Resolution

In the **AI Video Restoration Pipeline**, Vivek diagnosed a critical edge-case artifact: **multi-face overlap (the "crayon effect")** occurring across scene cuts.

#### The Technical Problem
When standard super-resolution models (e.g., Real-ESRGAN) interpolate video frames without scene awareness, facial features from one shot bleed into the next shot, creating a distorted, blended artifact.

#### Vivek's Custom Solution
1. **Scene Boundary Detection:** Uses \`PySceneDetect\` to flag exact frame numbers where shot transitions occur.
2. **Facial Embedding Extraction:** Runs \`InsightFace\` to compute 512-dimensional facial embedding vectors.
3. **Face Matcher Logic:** Custom Python tracking compares cosine similarity of embeddings between adjacent frames. When similarity drops below the threshold (indicating a cut), tracking IDs are cleanly reset rather than interpolated.
4. **Outcome:** Prevents feature blending across camera cuts and produces clean, artifact-free restored frames.

*Boundary Note: Benchmarked on local GPU workstations; long-form distributed rendering is planned for future iterations.*`;
  }

  if (q.includes("pipeline") || q.includes("video") || q.includes("ffmpeg") || q.includes("architecture") || q.includes("flow")) {
    return `### AI Video Restoration Pipeline Architecture

Vivek architected the pipeline as an automated, sequential multi-model workflow:

\`\`\`text
[Input Video]
      │
      ▼
1. PySceneDetect  ──► Identifies scene cuts & transition timestamps
      │
      ▼
2. FFmpeg Extraction ──► Extracts raw frames to memory/disk buffer
      │
      ▼
3. InsightFace     ──► Detects facial landmarks & tracks identity embeddings
      │
      ▼
4. Real-ESRGAN     ──► Applies super-resolution enhancement to frames
      │
      ▼
5. FFmpeg Assembly ──► Re-encodes video stream & synchronizes audio channels
      │
      ▼
[Restored Output Video]
\`\`\`

#### Key Engineering Decisions
- **VRAM Constraint Management:** Sequential batching prevents CUDA Out-of-Memory (OOM) errors on local GPUs.
- **Modularity:** Video extraction, vision inference, and final audio/video encoding are isolated into distinct Python stages.`;
  }

  if (q.includes("aips") || q.includes("academic") || q.includes("security") || q.includes("key")) {
    return `### AIPS — Academic Intelligence System

**AIPS** is a systems engineering project designed to provide academic query assistance while adhering to strict security and architecture standards.

#### Core Architecture
1. **Secure Backend Proxy:** Groq and LLM API keys are strictly maintained in server-side environment variables and are never exposed in client bundles or network requests.
2. **Context Window Assembly:** Ingests academic queries, parses relevant tokens, and formats context filters prior to model dispatch.
3. **Verification Filter:** Verifies that returned responses match the requested academic domain.

#### Documented Boundary
- **Offline Access:** Local offline mode is currently incomplete; the live online retrieval pipeline is fully functional.`;
  }

  if (q.includes("workflow") || q.includes("prompt") || q.includes("audit") || q.includes("git") || q.includes("hygiene")) {
    return `### Engineering Workflow & AI Collaboration Hygiene

Documented in the **FL-01 Workflow Audit** and **Prompt Iteration Log**:

1. **Prompt Iteration Discipline:** Vivek documented a step-by-step evolution from a naive prompt (\`V0\`) to a structured, evidence-grounded prompt with step decomposition (\`V5\`).
2. **Developer Ownership:** AI is used strictly for drafting, debugging assistance, and exploratory tooling; Vivek retains 100% responsibility for architecture decisions, testing, and Git hygiene.
3. **Commit Discipline:** Every code modification follows [Conventional Commits](https://www.conventionalcommits.org/) with reproducible local test verification before pushing.`;
  }

  if (q.includes("who") || q.includes("background") || q.includes("vivek") || q.includes("hire") || q.includes("contact")) {
    return `### About Vivek Sharma

- **Background:** B.Tech in Computer Science & Engineering (CSE).
- **Core Positioning:** *"I build and optimize Python-based multimedia processing pipelines that solve real data bottlenecks and eliminate visual artifacts like frame overlap and distortion."*
- **Primary Focus:** Junior Backend, Media Pipeline, and Applied AI Engineering roles.
- **Top Evidence:**
  1. AI Video Restoration Pipeline (Multi-model CV pipeline in Python/FFmpeg).
  2. AIPS (Academic Intelligence System).
  3. AI-Assisted Engineering Workflow & Verification.
- **Contact:** Open for junior engineering opportunities and internships via GitHub and direct email.`;
  }

  // Default contextual response
  return `### Engineering Overview

Vivek's portfolio demonstrates practical Python multimedia pipeline engineering, systems integration, and strict verification discipline:

1. **AI Video Restoration Pipeline:** Multi-model chaining (\`PySceneDetect\` → \`InsightFace\` → \`Real-ESRGAN\` → \`FFmpeg\`) with custom frame-tracking logic to eliminate scene-cut overlap artifacts.
2. **AIPS (Academic Intelligence System):** Backend-only API key security with context window assembly and intelligent query routing.
3. **Engineering Workflow:** Step-decomposition prompting and Conventional Commits hygiene.

*Feel free to ask specific questions about the frame-matcher algorithm, pipeline data flow, VRAM constraints, or AIPS architecture!*`;
}

/**
 * Multi-Provider Server-Side Streaming Engine
 */
export async function streamAssistantResponse(messages: ChatMessage[]): Promise<ReadableStream<Uint8Array>> {
  const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content || "";
  const encoder = new TextEncoder();

  // 1. Check for OpenAI Key
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          stream: true,
          messages: [{ role: "system", content: VIVEK_SYSTEM_PROMPT }, ...messages],
        }),
      });

      if (response.ok && response.body) {
        return createOpenAIStream(response.body);
      }
    } catch (e) {
      console.warn("OpenAI API streaming failed, falling back to repository knowledge stream:", e);
    }
  }

  // 2. Check for Groq Key
  if (process.env.GROQ_API_KEY) {
    try {
      const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY.trim()}`,
        },
        body: JSON.stringify({
          model: model,
          stream: true,
          temperature: 0.2,
          messages: [{ role: "system", content: VIVEK_SYSTEM_PROMPT }, ...messages],
        }),
      });

      if (response.ok && response.body) {
        return createOpenAIStream(response.body);
      } else {
        const errorText = await response.text();
        console.warn("Groq API responded with error:", response.status, errorText);
      }
    } catch (e) {
      console.warn("Groq API streaming request failed, falling back to repository knowledge stream:", e);
    }
  }

  // 3. Reliable Server-Side Real-Token Streaming Fallback
  // Emits real token-by-token stream from the verified knowledge base with authentic delays
  const fullText = getKnowledgeFallbackResponse(lastUserMessage);
  const words = fullText.split(" ");

  return new ReadableStream({
    async start(controller) {
      // Simulate initial server processing / thinking latency (200ms)
      await new Promise((resolve) => setTimeout(resolve, 200));

      for (let i = 0; i < words.length; i++) {
        const token = (i === 0 ? "" : " ") + words[i];
        controller.enqueue(encoder.encode(token));
        
        // Random micro-delay (15ms - 35ms) to mirror real LLM token streaming
        const delay = Math.floor(Math.random() * 20) + 15;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      controller.close();
    },
  });
}

function createOpenAIStream(body: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = body.getReader();

  return new ReadableStream({
    async start(controller) {
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  controller.enqueue(encoder.encode(delta));
                }
              } catch {
                // Ignore parse errors on partial lines
              }
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}
