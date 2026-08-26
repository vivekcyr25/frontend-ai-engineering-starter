# Contact Form Technical Setup Guide

Documentation for the contact form backend architecture, service configuration, environment variables, API endpoint specifications, and verification procedure.

---

## 1. Chosen Service & Rationale

- **Chosen Service**: **Formspree** / **Web3Forms** free-tier submission integration.
- **Why It Was Chosen**:
  1. **Zero Database Needed**: Eliminates the overhead, maintenance cost, and security vulnerabilities of managing an SQL/NoSQL database for contact messages.
  2. **Free-Tier Limits**: Formspree and Web3Forms offer generous free tiers (up to 50–250 email submissions per month) ideal for developer portfolio sites.
  3. **Server-Side Security**: Submissions are proxied through Next.js Server API route `/api/contact`, keeping target endpoints and access keys strictly server-side.
  4. **Netlify Compatibility**: Seamlessly integrates with Netlify hosting environment without requiring custom server infrastructure.

---

## 2. API Path & Environment Variables

### Exact API Endpoint Path
`/api/contact` (Next.js Server API Route executing `src/app/api/contact/route.ts`).

### Required Environment Variable
```env
CONTACT_FORM_ENDPOINT="https://formspree.io/f/your_form_id"
```
*(Alternative supported variable names: `FORMSPREE_ENDPOINT`, `WEB3FORMS_ENDPOINT`)*

> [!IMPORTANT]
> Never commit actual API keys or endpoints with real tokens into Git. Keep values in `.env.local` for local development and configure them in the Netlify Dashboard under **Site Configuration > Environment Variables**.

---

## 3. Configuration Steps

### Local Development
1. Create or open `.env.local` in `foundations-app/`.
2. Add `CONTACT_FORM_ENDPOINT="https://formspree.io/f/sample_form_id"`.
3. If no endpoint is configured in `.env.local`, the `/api/contact` server route executes a local development logging fallback and returns HTTP 200 `{ success: true, message: "Thank you! Your message has been sent successfully." }`.

### Netlify Live Production Deployment
1. Log in to [Netlify Dashboard](https://app.netlify.com).
2. Select the `vivekcyr25-portfolio` project site.
3. Navigate to **Site Configuration** → **Environment Variables**.
4. Add `CONTACT_FORM_ENDPOINT` with your verified Formspree/Web3Forms form URL.
5. Trigger a site redeployment.

---

## 4. Verification Procedure

### Local Verification
1. Run `npm run dev` inside `foundations-app`.
2. Navigate to `http://localhost:3000/contact`.
3. Test empty submission → Verify inline red error alerts appear for Name, Email, and Message.
4. Test invalid email (`alex@invalid`) → Verify email format alert appears.
5. Submit valid form data → Verify loading state ("Sending Inquiry..."), HTTP POST request to `/api/contact`, and green success confirmation banner.

### Live Netlify Verification
1. Open the live deployment URL.
2. Fill out and submit the live contact form at `/contact`.
3. Open browser DevTools Network tab → Verify `/api/contact` returns HTTP 200 OK.
4. Check destination email inbox to confirm receipt of the submission.

---

## 5. Troubleshooting Checklist

If submissions stop working:
1. **Check Environment Variables**: Verify `CONTACT_FORM_ENDPOINT` is configured correctly in Netlify Environment Variables.
2. **Check Provider Quota**: Verify Formspree/Web3Forms monthly submission limit (e.g. 50 submissions) has not been exceeded.
3. **Inspect Network Tab**: Open browser DevTools → Network tab → Inspect payload sent to `/api/contact` and review the HTTP status code (400 = Validation error, 502/503 = Form service offline).
