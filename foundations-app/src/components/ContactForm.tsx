"use client";

import React, { useState } from "react";

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message content is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    }
  };

  return (
    <div className="rounded-xl border border-line bg-surface p-6 md:p-8 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
        <p className="text-xs text-muted mt-1">
          Submit your inquiry regarding backend architecture, media pipelines, or engineering roles.
        </p>
      </div>

      {isSubmitted ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 font-medium"
        >
          Message sent successfully! Thank you for reaching out.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
              Full Name <span className="text-red-600" title="Required">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-focus"
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
            <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
              Email Address <span className="text-red-600" title="Required">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-focus"
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
            <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-focus"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
              Message <span className="text-red-600" title="Required">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={formData.message}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, message: e.target.value }));
                if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
              }}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-focus"
              placeholder="Write your message here..."
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-accent-ink hover:opacity-90 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition"
          >
            Submit Inquiry
          </button>
        </form>
      )}
    </div>
  );
}
