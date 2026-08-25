# Site Deployment Notes — Architecture & File Inventory

**Author:** Vivek  
**Target:** Production Deployment on Netlify  
**Framework:** Next.js App Router (TypeScript, Tailwind CSS)  

---

## 1. Core Deployment & Build Configuration Files

| File | Purpose in Deployment |
| :--- | :--- |
| **`netlify.toml`** | Instructs Netlify on build settings: base directory (`foundations-app`), build command (`npm run build`), publish directory (`.next`), Node version (`20`), security headers, and the `@netlify/plugin-nextjs` adapter. |
| **`foundations-app/package.json`** | Declares project metadata, npm dependencies (`next`, `react`, `@ai-sdk/react`, `lucide-react`, `tailwindcss`), and execution scripts (`npm run build`, `npm run lint`). |
| **`foundations-app/next.config.ts`** | Next.js runtime configuration module controlling framework compiler options and asset optimization. |
| **`foundations-app/tsconfig.json`** | TypeScript compiler options enforcing strict typing, path aliases (`@/*` mapping to `./src/*`), and JSX transformations. |
| **`foundations-app/postcss.config.mjs`** | CSS processor configuration linking Tailwind CSS v4 to the build pipeline. |

---

## 2. Source Entry Points & Application Shell

| File | Purpose in Deployment |
| :--- | :--- |
| **`src/app/layout.tsx`** | The root layout component wrapping every page. Injects the Google Font `Barlow_Condensed` CSS variable (`--font-display`), sets site metadata, provides skip-to-content accessibility links, and mounts `SiteHeader` and `SiteFooter`. |
| **`src/app/globals.css`** | The global design system stylesheet defining CSS theme variables: background (`#eef3f0`), surface (`#f7faf8`), foreground (`#142028`), accent-ink (`#1f6b45`), and focus rings. |
| **`src/components/SiteHeader.tsx`** | The responsive top navigation bar featuring Vivek's brand monogram, desktop navigation links, and a mobile slide-out drawer with Escape key dismissal. |
| **`src/components/SiteFooter.tsx`** | Global footer providing direct links to Vivek's GitHub, LinkedIn, Contact channels, and the primary case study CTA. |

---

## 3. Routed Pages & Case Studies

| Route / File | Deployed Page Function |
| :--- | :--- |
| **`src/app/page.tsx` (`/`)** | The landing page: Hero section with the core proof statement, primary CTA buttons, and index of spec screens. |
| **`src/app/work/page.tsx` (`/work`)** | The case studies index listing the top engineering projects in rank order (AI Video Restoration, AIPS, AI Workflow). |
| **`src/app/work/[id]/page.tsx` (`/work/[id]`)** | Dynamic case study template using `generateStaticParams()` to statically pre-render individual deep-dive case studies. |
| **`src/app/about/page.tsx` (`/about`)** | Engineering bio and background: B.Tech CSE foundation, multimedia pipeline focus, and AI collaboration discipline. |
| **`src/app/contact/page.tsx` (`/contact`)** | Conversion page featuring direct interactive cards for GitHub, LinkedIn, and direct email communication. |
| **`src/app/health/page.tsx` (`/health`)** | Server Component demonstrating live data fetching and HTTP revalidation (`1m` cache policy). |
| **`src/app/playground/page.tsx` (`/playground`)** | W3C ARIA Accessible Component Lab comparing zero-dependency manual components against Radix UI primitives. |

---

## 4. Production AI Assistant & Server Routes

| File | Deployed Function |
| :--- | :--- |
| **`src/app/assistant/page.tsx` (`/assistant`)** | The interactive portfolio explorer UI where recruiters can test the assistant. |
| **`src/app/assistant/error.tsx`** | Next.js App Router error boundary providing designed recovery UI and "Try Again" state without crashing the page. |
| **`src/app/api/assistant/route.ts` (`/api/assistant`)** | Serverless Node.js API route that proxies AI requests, protects private API keys on the server, streams real-time responses, and runs tool lookups. |
| **`src/components/EngineeringAssistant.tsx`** | Client chat component handling real-time token streaming, tool result rendering, empty state suggestions, inline retry, and auto-scroll. |
| **`src/components/ProjectDetailsCard.tsx`** | Zero-crash tool result card rendering verified project evidence and honest boundaries. |
| **`src/lib/portfolio-projects.ts`** | Single source of truth containing verified project records for the tool lookup. |

---

## 5. Assets & Static Files

| Directory / File | Purpose |
| :--- | :--- |
| **`foundations-app/public/favicon.ico`** | Brand browser tab icon. |
| **`foundations-app/public/`** | Public static asset folder served directly at the domain root (e.g. for resume PDF or images). |
| **`.env.example`** | Safe template documenting required environment variables (`GROQ_API_KEY`, `GROQ_MODEL`) without exposing secret values. |
