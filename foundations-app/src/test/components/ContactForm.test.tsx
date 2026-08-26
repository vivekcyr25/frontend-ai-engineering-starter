import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ContactForm from "@/components/ContactForm";

describe("ContactForm Component", () => {
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

  it("accepts valid input, calls onSubmitSuccess callback, and renders success status message", async () => {
    const user = userEvent.setup();
    const handleSubmitSuccess = vi.fn();

    render(<ContactForm onSubmitSuccess={handleSubmitSuccess} />);

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i });

    await user.type(nameInput, "Jordan Lee");
    await user.type(emailInput, "jordan@example.com");
    await user.type(messageInput, "Great engineering portfolio! Let's schedule an interview.");

    await user.click(submitBtn);

    // Verify callback invocation
    expect(handleSubmitSuccess).toHaveBeenCalledTimes(1);
    expect(handleSubmitSuccess).toHaveBeenCalledWith({
      name: "Jordan Lee",
      email: "jordan@example.com",
      subject: "Engineering Opportunities",
      message: "Great engineering portfolio! Let's schedule an interview.",
    });

    // Verify accessible role="status" success message
    const statusAlert = screen.getByRole("status");
    expect(statusAlert).toHaveTextContent(/message sent successfully/i);
  });
});
