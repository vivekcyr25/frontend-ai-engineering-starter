import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ContactForm from "@/components/ContactForm";

describe("ContactForm Component", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("renders all form input fields with accessible labels and submit button", () => {
    render(<ContactForm />);

    expect(screen.getByRole("heading", { level: 2, name: /send a message/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit inquiry/i })).toBeInTheDocument();
  });

  it("displays validation error alerts when submitting an empty form", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i });
    await user.click(submitBtn);

    // Verify accessible role="alert" validation error messages
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBeGreaterThanOrEqual(3);

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email address is required.")).toBeInTheDocument();
    expect(screen.getByText("Message content is required.")).toBeInTheDocument();
  });

  it("rejects invalid email address formats with accessible feedback", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i });

    await user.type(nameInput, "Alex Taylor");
    await user.type(emailInput, "not-an-email");
    await user.type(messageInput, "I am interested in discussing your video restoration pipeline.");

    await user.click(submitBtn);

    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("accepts valid input, posts to /api/contact, calls onSubmitSuccess, and renders success status message", async () => {
    const user = userEvent.setup();
    const handleSubmitSuccess = vi.fn();

    // Mock fetch for /api/contact
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "Thank you! Message received." }),
    } as Response);

    render(<ContactForm onSubmitSuccess={handleSubmitSuccess} />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i });

    await user.type(nameInput, "Jordan Lee");
    await user.type(emailInput, "jordan@example.com");
    await user.type(messageInput, "Great engineering portfolio! Let's schedule an interview.");

    await user.click(submitBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            name: "Jordan Lee",
            email: "jordan@example.com",
            subject: "Engineering Opportunities",
            message: "Great engineering portfolio! Let's schedule an interview.",
          }),
        })
      );
    });

    expect(handleSubmitSuccess).toHaveBeenCalledTimes(1);

    // Verify accessible role="status" success message
    const statusAlert = screen.getByRole("status");
    expect(statusAlert).toHaveTextContent(/message sent successfully/i);
  });

  it("handles server submission errors, preserves entered field values, and provides retry option", async () => {
    const user = userEvent.setup();

    // Mock fetch failing with 502
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({
        success: false,
        error: "Backend submission endpoint unavailable.",
      }),
    } as Response);

    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i });

    await user.type(nameInput, "Sam Reed");
    await user.type(emailInput, "sam@example.com");
    await user.type(messageInput, "Checking pipeline throughput specs.");

    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Backend submission endpoint unavailable.")).toBeInTheDocument();
    });

    // Verify entered field values are PRESERVED on error
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Sam Reed");
    expect(screen.getByLabelText(/email address/i)).toHaveValue("sam@example.com");
    expect(screen.getByLabelText(/message/i)).toHaveValue("Checking pipeline throughput specs.");

    // Verify Retry button exists
    expect(screen.getByRole("button", { name: /retry submission/i })).toBeInTheDocument();
  });
});
