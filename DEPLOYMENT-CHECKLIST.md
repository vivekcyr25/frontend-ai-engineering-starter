# Personal Portfolio Deployment Checklist

**Candidate:** Vivek Sharma  
**Target Role:** Junior Backend / Pipeline / Applied AI Engineer  
**Status:** Pre-Deployment Verified & Netlify Ready  

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 with custom design tokens (`globals.css`)
- **Typography:** Barlow Condensed (via Google Fonts `next/font`)
- **AI Core:** AI SDK v5 (`@ai-sdk/react`, `@ai-sdk/openai-compatible`)
- **Component Primitives:** W3C ARIA Accessible Components & Radix UI

---

## Hosting

- **Platform:** Netlify (Free Tier)
- **Deployment Adapter:** `@netlify/plugin-nextjs`
- **Output:** Next.js App Router Serverless Functions & Static Edge Pre-rendering

---

## Build

- **Root Working Directory (Base):** `foundations-app`
- **Build Command:** `npm run build`
- **Publish Directory:** `.next`
- **Node Version:** `20.x`

---

## Required Environment Variables

Configure these in the Netlify Dashboard under **Site configuration > Environment variables**:

| Variable Name | Purpose | Value Guide | Scope |
| :--- | :--- | :--- | :--- |
| `GROQ_API_KEY` | Powers the server-side assistant route (`/api/assistant`) | Real Groq API Key (`gsk_...`) | Secret (Server only) |
| `GROQ_MODEL` | Specifies the LLM model identifier | `llama-3.1-8b-instant` | Public / Server |
| `NODE_VERSION` | Enforces Node.js 20 LTS runtime | `20` | Build only |

> **Note:** If `GROQ_API_KEY` is omitted, the site remains 100% functional; the assistant automatically falls back to its verified local knowledge-stream without crashing.

---

## Verification Summary

| Check | Method | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Build** | `npm run build` inside `foundations-app/` | **PASS** | 14/14 routes pre-rendered with 0 errors. |
| **Lint** | `npm run lint` | **PASS** | Strict ESLint 9 checks passed. |
| **Typecheck** | `npx tsc --noEmit` | **PASS** | 0 TypeScript diagnostic errors. |
| **Responsive** | Tested at 375px, 768px, 1280px | **PASS** | Fluid typography, hamburger menu with ESC key, zero horizontal overflow. |
| **Links** | Inspected all internal and external anchors | **PASS** | Verified GitHub, LinkedIn, Contact mailto, and case-study slugs. |
| **HTTPS** | Netlify automatic Let's Encrypt SSL/TLS | **PENDING LIVE RUN** | Enforced by default upon Netlify deployment. |

---

## Live URL

`[ADD AFTER DEPLOYMENT]`  
*(Suggested format: `https://vivek-sharma.netlify.app` or `https://viveksharma.netlify.app`)*

---

## GitHub

- **Repository URL:** `https://github.com/vivekcyr25/frontend-ai-engineering-starter`
- **Default Branch:** `master`

---

## LinkedIn

- **Profile URL:** `https://linkedin.com/in/vivekcyr25`

---

## CV

- **CV Link / File:** Available via direct contact at `mailto:vivek@example.com` or repository case studies (PDF export in `FL-01-Workflow-Audit.pdf`).

---

## Exact Manual Netlify Deployment Steps

Follow these steps in your browser:

1. **Log in to Netlify:** Go to [app.netlify.com](https://app.netlify.com) and log in with your GitHub account.
2. **Add New Site:** Click **"Add new site" > "Import an existing project"**.
3. **Select GitHub:** Choose GitHub as your Git provider and select the repository: `vivekcyr25/frontend-ai-engineering-starter`.
4. **Configure Build Settings:**
   - **Base directory:** `foundations-app`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. **Add Environment Variables:**
   - Click **"Add environment variable"**.
   - Add `GROQ_API_KEY` = your private Groq key.
   - Add `GROQ_MODEL` = `llama-3.1-8b-instant`.
6. **Deploy Site:** Click **"Deploy foundations-app"**. Netlify will build the project and output a live HTTPS URL.
7. **Change Site Name (Custom Subdomain):**
   - In your Netlify site dashboard, go to **Site configuration > General > Site details > Change site name**.
   - Set the site name to `vivek-sharma` (or `viveksharma` / `vivek-engineering`).
   - Your final public URL becomes `https://vivek-sharma.netlify.app`.
8. **Verify Live Page:** Open `https://vivek-sharma.netlify.app` in an incognito / private browser window to confirm that home, case studies, assistant, and contact pages load cleanly over HTTPS.
