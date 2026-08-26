# Contact Form Feature Explainer

A beginner-friendly, plain-language guide explaining how the portfolio contact form works, what happens behind the scenes, and how messages travel from a visitor's web browser to an email inbox.

---

## What a Backend Is

Imagine visiting a restaurant. You sit at a table looking at a menu (this is the **Frontend** — the website you see and click on).

When you are ready to order, you don't walk into the kitchen to cook the food yourself. Instead, a waiter comes to your table, takes your written order, carries it back to the kitchen, and returns with your food or informs you if an item is sold out.

In web development, the **Backend** is that waiter.

The frontend (your browser) collects the information you type into a form. It then hands that data over to the backend (a server running code). The backend checks the information, processes it securely, sends it off to the right destination (like an email inbox or database), and brings back a clear answer ("Message Sent!" or "Invalid Email!").

---

## What My Feature Does

1. **What the Visitor Sees**: When a recruiter or engineering manager visits the portfolio Contact page (`/contact`), they see a clean form asking for their **Name**, **Email Address**, **Subject**, and **Message**.
2. **What Happens When Submit Is Pressed**:
   - The browser instantly checks if any required fields were left empty or if the email is typed incorrectly.
   - If something is missing, red error messages appear right under the exact field.
   - If everything is valid, the Submit button changes to a spinning loading state ("Sending Inquiry..."), preventing duplicate clicks.
3. **Where the Submission Goes**: The form sends the message data over a secure connection to the website's server API route (`/api/contact`). The server verifies the data and forwards it to a free form integration service (such as Formspree or Web3Forms), which delivers the message directly to Vivek Sharma's primary email inbox.

---

## Data Flow Diagram

```text
  [ Visitor Browser ]
         │
         ▼ (Types Name, Email, & Message)
  [ Client-Side Validation ] ────❌ (Empty / Bad Email) ──► Show Red Inline Error
         │
         ▼ (Valid Inputs)
  [ HTTP POST Request to /api/contact ]
         │
         ▼ (Next.js Server API Route)
  [ Server Validation & Sanitization ]
         │
         ▼ (Forward Request)
  [ Form Backend Service (Formspree / Web3Forms) ]
         │
         ├───► Deliver Email to Vivek's Inbox 📧
         │
         ▼ (HTTP 200 OK Response)
  [ Browser Displays Success Banner ] ("Message Sent Successfully!")
```

---

## What Happens Behind the Scenes

### 1. The Request
When the visitor clicks "Submit Inquiry", the browser packages the name, email, subject, and message into a JSON object and sends an HTTP `POST` request to `/api/contact`.

### 2. Server Processing
The Next.js server route receives the request:
- It strips out dangerous characters and double-checks that the fields are non-empty.
- It looks for an environment variable (`CONTACT_FORM_ENDPOINT`) containing the secure submission destination.
- It forwards the submission to the email service.

### 3. Response & Feedback
- **Success (HTTP 200)**: The server sends back `{ success: true }`. The form updates instantly, hiding the form fields and displaying a green checkmark confirmation banner.
- **Error (HTTP 400 / 500 / 502)**: If the network drops or the service is temporarily busy, the form receives an error response. The form keeps all the user's typed text intact (so they don't have to re-type their message) and shows a red "Retry Submission" button.
