"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

const INITIAL_SUGGESTIONS = [
  "How does the frame-matcher fix the multi-face overlap artifact?",
  "Explain the sequential dataflow for AI Video Restoration.",
  "What is the security model of AIPS?",
  "What are your documented GPU and VRAM constraints?",
];

export default function EngineeringAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Hello! I am Vivek's Portfolio Engineering Assistant. I can answer questions about the **AI Video Restoration Pipeline**, **AIPS**, multi-model chaining with FFmpeg & InsightFace, and workflow verification hygiene.\n\nWhat technical area would you like to explore?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showJumpToBottom, setShowJumpToBottom] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isAutoScrollEnabledRef = useRef(true);

  // Monitor scroll position to determine if user is at the bottom
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    const isNearBottom = distanceToBottom < 60;

    isAutoScrollEnabledRef.current = isNearBottom;
    setShowJumpToBottom(!isNearBottom);
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  // Auto-scroll when messages update if auto-scroll is enabled
  useEffect(() => {
    if (isAutoScrollEnabledRef.current) {
      scrollToBottom(false);
    }
  }, [messages, isThinking, scrollToBottom]);

  // Handle Stop Generation
  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
    setIsThinking(false);

    // Mark current streaming message as finished
    setMessages((prev) =>
      prev.map((msg) => (msg.isStreaming ? { ...msg, isStreaming: false } : msg))
    );

    // Re-focus input
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  }, []);

  // Handle Send Message
  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isGenerating) return;

    // Reset input
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `asst-${Date.now()}`;

    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      content: messageContent,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Prepare assistant message
    setIsGenerating(true);
    setIsThinking(true);
    isAutoScrollEnabledRef.current = true;
    scrollToBottom(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: abortController.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let assistantContent = "";
      let firstTokenReceived = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        if (!firstTokenReceived && chunk.length > 0) {
          firstTokenReceived = true;
          setIsThinking(false);

          // Add assistant message bubble
          setMessages((prev) => [
            ...prev,
            {
              id: assistantMessageId,
              role: "assistant",
              content: assistantContent,
              isStreaming: true,
            },
          ]);
        } else {
          // Update existing message
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: assistantContent, isStreaming: true }
                : msg
            )
          );
        }
      }

      // Finish streaming
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg
        )
      );
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") {
        // User aborted - partial response is already preserved
        console.log("Generation stopped by user.");
      } else {
        console.error("Stream generation error:", err);
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: "⚠ An error occurred while retrieving project information. Please try again.",
          },
        ]);
      }
    } finally {
      setIsGenerating(false);
      setIsThinking(false);
      abortControllerRef.current = null;
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  // Keyboard shortcut: Enter sends, Shift+Enter newlines
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  return (
    <div className="flex flex-col h-[650px] w-full max-w-4xl mx-auto rounded-xl border border-slate-800 bg-[#090d16] shadow-2xl overflow-hidden text-slate-100 font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#0d1424]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-700/60 text-cyan-400 font-mono text-xs font-bold shadow-inner">
            AI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-white">
                Vivek&apos;s Portfolio Engineering Assistant
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/80 text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Grounded Truth
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Explores real video pipeline code, AIPS architecture, and verification logs.
            </p>
          </div>
        </div>

        {isGenerating && (
          <button
            type="button"
            onClick={handleStop}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 rounded-md transition shadow-sm"
            aria-label="Stop generating response"
          >
            <span className="w-2 h-2 rounded-sm bg-red-400"></span>
            Stop Generation
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        role="log"
        aria-live="polite"
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative scroll-smooth"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="flex-shrink-0 w-7 h-7 rounded-md bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400 text-xs font-mono font-bold mt-1">
                VS
              </div>
            )}

            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-lg p-4 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-slate-800 border border-slate-700 text-white shadow-sm"
                  : "bg-[#0f172a] border border-slate-800/90 text-slate-200 shadow-md"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span>{msg.role === "user" ? "You (Reviewer)" : "Technical Assistant"}</span>
                {msg.isStreaming && (
                  <span className="text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    Streaming
                  </span>
                )}
              </div>

              {/* Render Structured Text & Markdown Safely */}
              <SafeMarkdownRenderer content={msg.content} />
            </div>
          </div>
        ))}

        {/* Thinking / Loading State before first token */}
        {isThinking && (
          <div className="flex gap-3 items-start animate-in fade-in duration-200">
            <div className="flex-shrink-0 w-7 h-7 rounded-md bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400 text-xs font-mono font-bold">
              VS
            </div>
            <div className="bg-[#0f172a] border border-slate-800 p-3.5 rounded-lg text-xs text-cyan-400 font-mono flex items-center gap-2.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
              </div>
              <span>Retrieving project architecture &amp; verified evidence...</span>
            </div>
          </div>
        )}

        {/* Floating Jump to Latest Button */}
        {showJumpToBottom && (
          <button
            type="button"
            onClick={() => scrollToBottom(true)}
            className="fixed bottom-24 right-8 md:bottom-28 md:right-1/4 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold rounded-full shadow-lg transition transform hover:-translate-y-0.5"
            aria-label="Jump to latest message"
          >
            <span>↓</span> Jump to latest
          </button>
        )}
      </div>

      {/* Suggestion Chips */}
      {messages.length <= 2 && !isGenerating && (
        <div className="px-4 py-2 bg-[#0a0f1d] border-t border-slate-800/60 overflow-x-auto">
          <div className="flex gap-2 text-xs">
            {INITIAL_SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleSendMessage(sug)}
                className="flex-shrink-0 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-300 transition text-left text-[11px]"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 md:p-4 border-t border-slate-800 bg-[#0d1424]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2 items-end"
        >
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
              placeholder={
                isGenerating
                  ? "Assistant is streaming response..."
                  : "Ask about Vivek's video pipeline, AIPS, or verification workflows..."
              }
              aria-label="Ask about engineering work"
              className="w-full resize-none rounded-lg bg-[#070b14] border border-slate-700/80 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed max-h-40"
            />
          </div>

          {isGenerating ? (
            <button
              type="button"
              onClick={handleStop}
              className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold tracking-wide transition shadow"
              aria-label="Stop generation"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold tracking-wide transition shadow disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              Send
            </button>
          )}
        </form>

        <div className="mt-1.5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <span>Enter to send · Shift+Enter for newline</span>
          <span>Zero hallucinated metrics · Server-side protected API</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Safe, Robust Partial Markdown Renderer
 * Parses code blocks, headers, bullet points, bolding, and links without crashing on mid-token stream splits.
 */
function SafeMarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  // Split by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2.5 font-sans">
      {parts.map((part, idx) => {
        if (part.startsWith("```")) {
          // Code block
          const match = part.match(/^```(\w+)?\n?([\s\S]*?)```?$/);
          const lang = match?.[1] || "text";
          const code = match?.[2] || part.slice(3, -3);

          return (
            <div key={idx} className="my-2 rounded-md overflow-hidden border border-slate-700 bg-slate-950">
              <div className="flex justify-between items-center px-3 py-1 bg-slate-900 border-b border-slate-800 text-[10px] font-mono text-cyan-400">
                <span>{lang}</span>
                <span className="text-slate-500">Pipeline Code</span>
              </div>
              <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto">
                <code>{code.trim()}</code>
              </pre>
            </div>
          );
        }

        // Standard text lines
        const lines = part.split("\n");

        return (
          <div key={idx} className="space-y-1.5">
            {lines.map((line, lineIdx) => {
              const trimmed = line.trim();

              if (!trimmed) return <div key={lineIdx} className="h-1" />;

              // Headers
              if (trimmed.startsWith("### ")) {
                return (
                  <h4 key={lineIdx} className="text-sm font-bold text-cyan-400 pt-1">
                    {parseInlineMarkdown(trimmed.slice(4))}
                  </h4>
                );
              }
              if (trimmed.startsWith("#### ")) {
                return (
                  <h5 key={lineIdx} className="text-xs font-semibold text-slate-200 pt-0.5">
                    {parseInlineMarkdown(trimmed.slice(5))}
                  </h5>
                );
              }

              // Bullet list items
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-cyan-400 font-bold text-xs">•</span>
                    <span>{parseInlineMarkdown(trimmed.slice(2))}</span>
                  </div>
                );
              }

              // Numbered list items
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
              if (numMatch) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-cyan-400 font-mono text-xs">{numMatch[1]}.</span>
                    <span>{parseInlineMarkdown(numMatch[2])}</span>
                  </div>
                );
              }

              return <p key={lineIdx}>{parseInlineMarkdown(line)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Parses bold (**text**), inline code (`code`), and italics (*text*)
 */
function parseInlineMarkdown(text: string): React.ReactNode {
  // Regex splitting by bold (**...**) and inline code (`...`)
  const segments = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return segments.map((seg, i) => {
    if (seg.startsWith("**") && seg.endsWith("**") && seg.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-white">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    if (seg.startsWith("`") && seg.endsWith("`") && seg.length >= 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-[12px]"
        >
          {seg.slice(1, -1)}
        </code>
      );
    }
    return seg;
  });
}
