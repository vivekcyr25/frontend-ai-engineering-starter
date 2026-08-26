"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess?: (data: ContactFormData) => void;
}) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "Engineering Opportunities",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      newErrors.name = "Name is required.";
    }

    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!trimmedMessage) {
      newErrors.message = "Message content is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!validate()) {
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data.error || "Failed to submit message. Please verify your details and try again."
        );
        return;
      }

      setStatus("success");
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    } catch (err) {
      console.error("Form submit network error:", err);
      setStatus("error");
      setErrorMessage(
        "Network connection error. Please check your connection and try again."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "Engineering Opportunities",
      message: "",
    });
    setErrors({});
    setStatus("idle");
    setErrorMessage(null);
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-5 sm:p-6 md:p-8 space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-foreground">Send a Message</h2>
        <p className="text-xs text-muted mt-1 leading-relaxed">
          Submit an inquiry regarding backend engineering, media pipelines, or applied AI roles.
        </p>
      </div>

      {/* Success Banner */}
      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border border-emerald-300 bg-emerald-50/90 p-5 space-y-4 text-emerald-900"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold">Message Sent Successfully!</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Thank you for reaching out. Your message has been sent to Vivek Sharma and logged in the backend. You will receive a response shortly.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded text-xs font-semibold transition inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Send Another Message
          </button>
        </div>
      )}

      {/* Error Banner */}
      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-red-300 bg-red-50/90 p-4 flex items-start justify-between gap-3 text-red-900"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold">Submission Failed</p>
              <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-semibold shrink-0 transition"
          >
            Retry Submission
          </button>
        </div>
      )}

      {/* Form Element */}
      {status !== "success" && (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5"
            >
              Full Name <span className="text-red-600" title="Required">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              disabled={status === "submitting"}
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-focus disabled:opacity-60 transition ${
                errors.name ? "border-red-500 ring-1 ring-red-500" : "border-line"
              }`}
              placeholder="e.g. Alex Taylor"
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5"
            >
              Email Address <span className="text-red-600" title="Required">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={status === "submitting"}
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-focus disabled:opacity-60 transition ${
                errors.email ? "border-red-500 ring-1 ring-red-500" : "border-line"
              }`}
              placeholder="alex@company.com"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="contact-subject"
              className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              disabled={status === "submitting"}
              value={formData.subject}
              onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-focus disabled:opacity-60 transition"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5"
            >
              Message <span className="text-red-600" title="Required">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              disabled={status === "submitting"}
              value={formData.message}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, message: e.target.value }));
                if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
              }}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full px-3.5 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-focus disabled:opacity-60 transition ${
                errors.message ? "border-red-500 ring-1 ring-red-500" : "border-line"
              }`}
              placeholder="Write your message here..."
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
            className="w-full sm:w-auto px-6 py-3 bg-accent-ink hover:opacity-90 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-btn-spin" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
