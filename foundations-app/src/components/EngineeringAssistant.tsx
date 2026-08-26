"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ProjectDetailsCard from "@/components/ProjectDetailsCard";
import SendButton from "@/components/ui/SendButton";

const SUGGESTED_PROMPTS = [
  "Tell me about the AI Video Restoration Pipeline.",
  "What is the AIPS architecture and security model?",
  "How does Vivek's workflow prevent AI hallucinations?",
  "What are the documented hardware boundaries?",
];

export default function EngineeringAssistant() {
  const [inputVal, setInputVal] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [showJumpButton, setShowJumpButton] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);

  const {
    messages,
    status,
    error,
    sendMessage,
    regenerate,
    stop,
    clearError,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/assistant",
    }),
  });

  const isStreaming = status === "streaming" || status === "submitted";

  // Handle scroll detection
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const nearBottom = distanceFromBottom < 100;
    isNearBottomRef.current = nearBottom;
    setShowJumpButton(!nearBottom && messages.length > 0);
  };

  const scrollToBottom = () => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
    setShowJumpButton(false);
  };

  useEffect(() => {
    if (isNearBottomRef.current) {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, [messages, status]);

  const handleSubmit = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (overrideText ?? inputVal).trim();

    if (!textToSend) {
      setInputError("Please enter a question or topic.");
      return;
    }

    setInputError(null);
    if (!overrideText) setInputVal("");
    clearError();

    try {
      await sendMessage({ text: textToSend });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleRetry = async () => {
    if (isRetrying || isStreaming) return;
    setIsRetrying(true);
    clearError();
    try {
      await regenerate();
    } catch (err) {
      console.error("Retry failed:", err);
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] w-full rounded-xl border border-line bg-surface overflow-hidden shadow-sm">
      {/* Messages Viewport */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto py-8">
            <div className="h-10 w-10 rounded-full bg-accent/20 border border-accent-ink/30 flex items-center justify-center text-accent-ink font-bold mb-3">
              AI
            </div>
            <h2 className="text-lg font-bold text-foreground">
              Portfolio Engineering Assistant
            </h2>
            <p className="text-sm text-muted mt-1 mb-6">
              Ask about technical decisions, frame-matcher algorithms, systems security, or select a topic below:
            </p>

            <div className="grid grid-cols-1 gap-2 w-full">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSubmit(undefined, prompt)}
                  className="text-left text-xs md:text-sm p-3 rounded-lg border border-line bg-background hover:border-accent-ink hover:text-accent-ink transition text-foreground"
                >
                  &rarr; {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1 px-1">
                  {isUser ? "You" : "Portfolio Assistant"}
                </span>

                <div
                  className={`max-w-[92%] sm:max-w-[88%] md:max-w-[80%] rounded-xl p-4 text-sm leading-relaxed break-words overflow-hidden ${
                    isUser
                      ? "bg-foreground text-background font-medium"
                      : "bg-background border border-line text-foreground"
                  }`}
                >
                  {message.parts && message.parts.length > 0 ? (
                    message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <div key={index} className="whitespace-pre-wrap">
                            {part.text}
                          </div>
                        );
                      }

                      // Tool result parts
                      if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
                        const toolPart = part as unknown as {
                          state?: string;
                          output?: unknown;
                          errorText?: string;
                        };

                        if (toolPart.state === "output-available") {
                          return (
                            <ProjectDetailsCard
                              key={index}
                              output={toolPart.output}
                            />
                          );
                        }

                        if (toolPart.state === "output-error") {
                          return (
                            <div
                              key={index}
                              className="mt-2 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700 font-mono"
                            >
                              Tool Error: {toolPart.errorText || "Could not complete lookup"}
                            </div>
                          );
                        }

                        return (
                          <div
                            key={index}
                            className="mt-2 flex items-center gap-2 text-xs font-mono text-muted bg-surface p-2 rounded border border-line animate-pulse"
                          >
                            <span className="h-2 w-2 rounded-full bg-accent-ink" />
                            Fetching verified portfolio records...
                          </div>
                        );
                      }

                      return null;
                    })
                  ) : null}
                </div>
              </div>
            );
          })
        )}

        {/* Streaming Thinking Indicator */}
        {isStreaming && (
          <div className="flex items-center gap-2 text-xs font-mono text-muted pl-1">
            <span className="inline-block h-2 w-2 rounded-full bg-accent-ink animate-ping" />
            <span>Streaming assistant response...</span>
          </div>
        )}

        {/* Designed Error Box */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-red-900">
                Connection or Provider Error
              </p>
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-medium transition disabled:opacity-50"
              >
                {isRetrying ? "Retrying..." : "Retry Generation"}
              </button>
            </div>
            <p className="text-xs text-red-700 font-mono">
              {error.message || "An unexpected error occurred while communicating with the assistant."}
            </p>
          </div>
        )}
      </div>

      {/* Jump to bottom pill */}
      {showJumpButton && (
        <div className="relative flex justify-center -mt-10 mb-2 z-10">
          <button
            type="button"
            onClick={scrollToBottom}
            className="px-3 py-1 bg-foreground text-background text-xs font-semibold rounded-full shadow hover:opacity-90 transition"
          >
            &darr; Jump to latest
          </button>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-3 md:p-4 border-t border-line bg-background flex flex-col gap-1.5"
      >
        {inputError && (
          <span className="text-xs text-red-600 font-medium px-1">
            {inputError}
          </span>
        )}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              if (inputError) setInputError(null);
            }}
            placeholder="Ask about AI pipelines, frame-matcher, or AIPS..."
            disabled={isStreaming}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-line bg-surface text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-focus disabled:opacity-60"
          />

          <SendButton
            type="submit"
            state={
              isStreaming
                ? "loading"
                : error
                ? "error"
                : !inputVal.trim()
                ? "disabled"
                : "idle"
            }
            disabled={!inputVal.trim() && !error && !isStreaming}
            showStopInLoading={true}
            onStop={stop}
            onRetry={handleRetry}
          />
        </div>
      </form>
    </div>
  );
}
