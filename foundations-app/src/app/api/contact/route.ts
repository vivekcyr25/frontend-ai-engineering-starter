import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body || {};

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "Portfolio Inquiry";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    // Server-side validation
    const errors: Record<string, string> = {};

    if (!trimmedName) {
      errors.name = "Name is required.";
    }

    if (!trimmedEmail) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!trimmedMessage) {
      errors.message = "Message content is required.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors },
        { status: 400 }
      );
    }

    // Determine target form backend endpoint
    const formEndpoint =
      process.env.CONTACT_FORM_ENDPOINT ||
      process.env.FORMSPREE_ENDPOINT ||
      process.env.WEB3FORMS_ENDPOINT;

    if (formEndpoint) {
      try {
        const response = await fetch(formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("External contact form endpoint error:", errorData);
          return NextResponse.json(
            {
              success: false,
              error: "The contact service could not process your submission at this time. Please try again later.",
            },
            { status: response.status || 502 }
          );
        }

        return NextResponse.json({
          success: true,
          message: "Thank you! Your message has been sent successfully.",
        });
      } catch (externalError) {
        console.error("Failed to forward contact form request:", externalError);
        return NextResponse.json(
          {
            success: false,
            error: "Unable to connect to contact submission service. Please check your network connection.",
          },
          { status: 503 }
        );
      }
    }

    // Default development / test local processing fallback
    console.log("Contact form submission received (local processing):", {
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      messageLength: trimmedMessage.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    });
  } catch (err) {
    console.error("Contact API route exception:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
