import { NextRequest, NextResponse } from "next/server";
import { streamAssistantResponse, ChatMessage } from "@/lib/ai-assistant-service";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request payload: 'messages' array is required." },
        { status: 400 }
      );
    }

    const messages: ChatMessage[] = body.messages.map((m: { role?: string; content?: string }) => ({
      role: m.role === "user" ? "user" : m.role === "system" ? "system" : "assistant",
      content: typeof m.content === "string" ? m.content.slice(0, 4000) : "",
    }));

    const stream = await streamAssistantResponse(messages);

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("API Assistant route error:", error);
    return NextResponse.json(
      { error: "Failed to generate assistant response." },
      { status: 500 }
    );
  }
}
