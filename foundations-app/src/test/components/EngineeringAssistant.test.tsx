import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useChat } from "@ai-sdk/react";
import EngineeringAssistant from "@/components/EngineeringAssistant";

vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(),
}));

describe("EngineeringAssistant Component (Chat Message Renderer)", () => {
  const mockSendMessage = vi.fn();
  const mockRegenerate = vi.fn();
  const mockStop = vi.fn();
  const mockClearError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [],
      status: "ready",
      error: null,
      sendMessage: mockSendMessage,
      regenerate: mockRegenerate,
      stop: mockStop,
      clearError: mockClearError,
    });
  });

  it("1. User Message: renders user prompt message bubble correctly", () => {
    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user",
          parts: [{ type: "text", text: "How does the frame matcher algorithm work?" }],
        },
      ],
      status: "ready",
      error: null,
      sendMessage: mockSendMessage,
      regenerate: mockRegenerate,
      stop: mockStop,
      clearError: mockClearError,
    });

    render(<EngineeringAssistant />);

    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("How does the frame matcher algorithm work?")).toBeInTheDocument();
  });

  it("2. Completed Assistant Message: renders assistant text message bubble correctly", () => {
    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user",
          parts: [{ type: "text", text: "Tell me about AIPS." }],
        },
        {
          id: "msg-2",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "AIPS is an Academic Intelligence System with backend-only API key isolation.",
            },
          ],
        },
      ],
      status: "ready",
      error: null,
      sendMessage: mockSendMessage,
      regenerate: mockRegenerate,
      stop: mockStop,
      clearError: mockClearError,
    });

    render(<EngineeringAssistant />);

    expect(screen.getByText("Portfolio Assistant")).toBeInTheDocument();
    expect(
      screen.getByText("AIPS is an Academic Intelligence System with backend-only API key isolation.")
    ).toBeInTheDocument();
  });

  it("3. Streaming State: displays streaming thinking indicator when response is streaming", () => {
    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "user",
          parts: [{ type: "text", text: "Explain video restoration pipeline." }],
        },
      ],
      status: "streaming",
      error: null,
      sendMessage: mockSendMessage,
      regenerate: mockRegenerate,
      stop: mockStop,
      clearError: mockClearError,
    });

    render(<EngineeringAssistant />);

    expect(screen.getByText("Streaming assistant response...")).toBeInTheDocument();
  });

  it("4. Pending/Loading State: renders send button in loading mode during submission", () => {
    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [],
      status: "submitted",
      error: null,
      sendMessage: mockSendMessage,
      regenerate: mockRegenerate,
      stop: mockStop,
      clearError: mockClearError,
    });

    render(<EngineeringAssistant />);

    // In submitted/streaming state, SendButton shows Stop action
    expect(screen.getByRole("button", { name: /stop/i })).toBeInTheDocument();
  });

  it("5. Error State: renders connection error banner and functional retry button", async () => {
    const user = userEvent.setup();

    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [],
      status: "ready",
      error: new Error("Network connection lost while reaching model API."),
      sendMessage: mockSendMessage,
      regenerate: mockRegenerate,
      stop: mockStop,
      clearError: mockClearError,
    });

    render(<EngineeringAssistant />);

    expect(screen.getByText("Connection or Provider Error")).toBeInTheDocument();
    expect(screen.getByText("Network connection lost while reaching model API.")).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", { name: /retry generation/i });
    await user.click(retryBtn);

    expect(mockClearError).toHaveBeenCalled();
    expect(mockRegenerate).toHaveBeenCalled();
  });

  it("6. Tool Result Part: renders embedded ProjectDetailsCard component for tool output", () => {
    (useChat as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "assistant",
          parts: [
            {
              type: "tool-result",
              state: "output-available",
              output: {
                found: true,
                project: {
                  slug: "aips",
                  name: "Academic Intelligence System (AIPS)",
                  summary: "Intelligent context assembly engine.",
                  problem: "Preventing API token leakage in client apps.",
                  technologies: ["Next.js", "Python", "FastAPI"],
                  engineeringDecisions: ["Isolated key vault in proxy tier"],
                  evidence: ["0 leaked credentials in production audit"],
                },
              },
            },
          ],
        },
      ],
      status: "ready",
      error: null,
      sendMessage: mockSendMessage,
      regenerate: mockRegenerate,
      stop: mockStop,
      clearError: mockClearError,
    });

    render(<EngineeringAssistant />);

    expect(screen.getByRole("heading", { level: 3, name: "Academic Intelligence System (AIPS)" })).toBeInTheDocument();
    expect(screen.getByText("Preventing API token leakage in client apps.")).toBeInTheDocument();
  });

  it("7. Input Validation: shows error feedback when attempting to submit an empty prompt", async () => {
    const user = userEvent.setup();

    render(<EngineeringAssistant />);

    const input = screen.getByPlaceholderText(/ask about ai pipelines/i);
    await user.type(input, "   "); // whitespace input

    const sendBtn = screen.getByRole("button", { name: /send/i });
    await user.click(sendBtn);

    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});
