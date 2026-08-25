# Three Roads — Stack Decision

## My Constraints

I am building a portfolio for engineering managers and technical recruiters assessing me for junior backend, pipeline, and applied-AI work. Its job is to make one claim easy to verify: I build and optimize Python multimedia pipelines that address bottlenecks and visual artifacts such as frame overlap and distortion.

The portfolio is evidence-first. The important content is the AI Video Restoration Pipeline case study, the AIPS case study, the AI-assisted engineering workflow, real before/after frames, real UI and terminal captures, architecture diagrams, repository links, and demo links where they exist. The content map explicitly says that the video-restoration screenshots and AIPS UI capture still need to be collected; I should collect those rather than substitute decorative generated images.

My constraints are equally important:

- I need a genuinely free core portfolio. A paid custom domain is optional, not required.
- I am comfortable with React, Next.js, TypeScript/JavaScript, Python, Git/GitHub, and basic APIs. I should be able to debug the result myself.
- I have a two-week build window.
- The existing `foundations-app/` is already a Next.js 16, React 19, TypeScript, and Tailwind CSS project with the required routes and a working Vercel deployment. It currently has one optional streaming-assistant route; most portfolio pages are static placeholders awaiting real content.
- A backend and database must earn their place. Neither is needed to publish case studies, images, diagrams, or links.

## Option 1 — Simplest

### Stack

- **Frontend framework:** No framework: semantic HTML, CSS, and small JavaScript modules, using the existing starter-repository conventions.
- **Styling approach:** One maintainable CSS file (or a few scoped CSS files) with CSS variables for the established visual tokens, responsive Grid/Flexbox, and accessible native controls.
- **Content/data approach:** Markdown drafts kept in the repository, manually copied into HTML pages or rendered at build time with a very small static-site script. Project metadata can be a single `projects.js` file.
- **Image/asset handling:** Put compressed, captioned PNG/WebP screenshots and SVG diagrams in an `assets/` folder. Use side-by-side before/after images, not hosted raw videos. Link a video demo externally if one becomes available.
- **Hosting platform:** GitHub Pages from the public repository.
- **Deployment approach:** Push to `main`; GitHub Actions builds/uploads the static site and deploys it to Pages. GitHub Pages supports custom Actions workflows, so it can deploy a plain site or a static-site generator output. [GitHub Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- **Completely free?:** Yes for a public-repository portfolio on the GitHub-provided `github.io` address. A custom domain would be a separate, optional purchase.
- **Maintenance effort:** Low: edit files, test locally, push.
- **Learning complexity:** Low. There is no framework lifecycle, server runtime, or deployment-specific API to diagnose.

### Hosting

GitHub Pages is sufficient for a static portfolio with case-study pages, responsive CSS, screenshots, diagrams, GitHub links, and normal outbound demo links. It is a static hosting service: it does not execute my own server-side route handlers. Repository or Actions secrets are useful only at build/deploy time; they are not a secure runtime secret store for browser code. Therefore an API key must never be placed in client-side JavaScript.

### Backend

- **Current backend requirement:** None.
- **Database requirement:** None. The portfolio content changes when I edit it, so versioned files are simpler and more reviewable than database records.
- **Future AI chat:** Add a separate API later—such as a small serverless endpoint on Vercel or Cloudflare Workers—and keep the browser UI static. This is an added deployment and security boundary; it is not something GitHub Pages itself provides. The model provider would also need an API key and may not remain free.

### How It Displays My Work

Each project is a static page with a problem statement, architecture diagram, selected code explanation, honest limitations, gallery, and prominent GitHub/demo links. Before/after evidence can be a responsive two-column comparison or a small client-side slider. This fully supports the defined portfolio journey because none of those elements need per-visitor data.

### Trade-offs

I gain the fastest path to a clean, durable site and the fewest failure modes. I give up React components, typed route/data conventions, server rendering, and the ability to place a secure server endpoint in the same deploy. Repeated UI patterns must be kept consistent manually unless I introduce a build tool. This is not a weakness for the evidence pages, but it would mean a future assistant becomes a second system rather than a file added to the site.

## Option 2 — Balanced

### Stack

- **Frontend framework:** The existing Next.js 16 App Router + React 19 + TypeScript app in `foundations-app/`.
- **Styling approach:** The project’s existing Tailwind CSS v4 tokens and global CSS; use reusable components only where repetition is real (for example, case-study sections, evidence cards, and link buttons).
- **Content/data approach:** Keep each case study as version-controlled TypeScript data and/or local MDX/Markdown files. A small typed project registry supplies title, tags, evidence assets, GitHub URL, and optional demo URL. No CMS is needed.
- **Image/asset handling:** Store real optimized screenshots and SVG diagrams under `public/`; reference them with meaningful alt text and technical captions. Use `next/image` where its optimization is useful, but do not rely on it to turn large raw video files into portfolio assets.
- **Hosting platform:** Vercel Hobby, using the already successful deployment.
- **Deployment approach:** Connect the GitHub repository, set `foundations-app` as the root directory, and let pushes create preview deployments before production. Vercel’s Hobby plan includes personal Git integration and previews, but is limited to personal/non-commercial use. [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)
- **Completely free?:** Yes for the static portfolio on the Hobby plan within its included limits. A future chat can be deployed as a small function within the free allowance, but its AI-provider usage is a separate cost/quota risk—not a promise of permanently free inference.
- **Maintenance effort:** Low to moderate. I maintain Node dependencies, Next.js upgrades when I choose to take them, content files, and the deployment configuration.
- **Learning complexity:** Moderate but realistic: it uses tools I already know and the app is already built.

### Hosting

Vercel is a particularly practical fit here because it deploys the existing Next.js app without adapting it to another runtime. Static pages are cached and served as static output; if I later need a route handler, Vercel turns that server-side work into a Function. It supports encrypted environment variables, with a 64 KB total per-deployment limit for supported server runtimes. [Vercel environment variables](https://vercel.com/docs/environment-variables) The free Hobby plan includes Function usage, but it has quotas and is for personal projects; I should not build a high-traffic or expensive AI proxy on the assumption that it is unlimited. [Vercel Functions limits](https://vercel.com/docs/functions/limitations)

### Backend

- **Current backend requirement:** None for the core. Keep all portfolio pages statically rendered.
- **Database requirement:** None. Local files provide a clearer audit trail for case studies and are easy to update through Git.
- **Future AI chat:** The existing `app/api/assistant/route.ts` is the right shape for a later server-side streaming endpoint. It can read a provider key from Vercel environment variables and stream a response without exposing that key to the browser. Before enabling it, I would add rate limiting, a small allowed knowledge base, request validation (some already exists), an error state, and a strict usage cap. A free model/API allowance, if available, should be treated as temporary and limited.

### How It Displays My Work

This option directly maps to the current route structure: `/`, `/work`, `/work/video-restoration`, `/work/aips`, `/work/ai-workflow`, `/about`, and `/contact`. Server Components can render static case-study data without shipping unnecessary code; a Client Component is reserved for actual interaction, such as the navigation, before/after slider, or future assistant. The project’s existing case-study routes and visual system can therefore be completed rather than replaced.

GitHub and demo links are ordinary, explicit anchors in the typed project data. Each case study can show the repository link even when no live demo exists; it should never manufacture a demo URL. Architecture diagrams and real evidence remain local static assets, so they work in previews and production alike.

### Trade-offs

I gain reusable, typed components; clean routes for long case studies; image handling; preview deployments; and a safe path to a later server-side assistant without changing the public site’s architecture. I accept a Node/Next build, dependency updates, more files than a plain site, and the need to understand static versus dynamic rendering. I also accept Vercel’s personal-use and quota terms. For this portfolio, those are manageable costs because the foundation already exists and the added structure makes the evidence pages easier—not more speculative—to maintain.

## Option 3 — Most Powerful

### Stack

- **Frontend framework:** Next.js 16 + React 19 + TypeScript, retaining the existing app.
- **Styling approach:** Existing Tailwind CSS tokens and a component layer for galleries, evidence comparison, diagrams, form states, and assistant UI.
- **Content/data approach:** Local MDX for long-form writing plus a database-backed content model for projects, images, links, and draft/published status.
- **Backend requirement:** Server-side route handlers for a contact form, protected streaming AI assistant, content APIs, and optional administration paths.
- **Database requirement:** A managed Postgres database such as Supabase Free (or equivalent), with row-level security and migrations. Object storage is needed only if the evidence library outgrows repository-hosted assets.
- **Image/asset handling:** Optimized public images for the core site; object storage/CDN for a growing gallery. Do not upload uncompressed video datasets to the portfolio host.
- **Hosting platform:** Vercel Hobby for the Next.js frontend/functions, with the database/storage provider on its free tier.
- **Deployment approach:** GitHub-to-Vercel previews plus database migrations, environment variables in Vercel, and separate backup/export discipline for database content.
- **Completely free?:** The core can start on free tiers, but this is no longer as reliably free as Options 1 or 2. It depends on several providers’ quotas and policy changes; future AI inference is especially not guaranteed free.
- **Maintenance effort:** High for a portfolio: multiple dashboards, schema changes, secrets, migrations, access policies, monitoring, and usage limits.
- **Learning complexity:** High. The difficult part is not writing a page; it is securing, debugging, and keeping several services coherent.

### Hosting

Vercel still fits full-stack Next.js and supports Next.js streaming through Route Handlers and Functions. [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) Its free function quota is adequate for testing a small assistant, but not a substitute for an AI budget or abuse protection. The database/storage layer must have its own free-tier limits and credentials, which means the site is no longer a single-hosting deployment.

Cloudflare Pages is a plausible alternative if I deliberately want a Workers-based backend: static assets are free and unlimited, while Pages Functions count against the Workers Free quota of 100,000 requests per day. [Cloudflare Pages Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/) Its Free plan also limits a site to 20,000 asset files and individual static assets to 25 MiB. [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) That can work for a static portfolio, but adapting the existing Next.js server features to the Workers runtime adds migration work and is not a benefit by itself.

### Backend

The backend would handle:

- secure AI-provider calls and streaming responses;
- authentication for an editor/admin area, if I actually need browser-based publishing;
- form submissions and spam protection;
- database reads/writes for case studies and metadata;
- storage authorization for uploaded evidence;
- rate limits, logging, migrations, and backup/export checks.

Environment variables are available in serverless platforms, but each extra secret is a responsibility: it must be scoped, never sent to the browser, rotated if exposed, and configured in preview and production. A database is justified only when I truly need browser-based editing, user data, or queries that files cannot handle.

### How It Displays My Work

It can provide a private content editor, filtered case-study search, hosted evidence galleries, contact submissions, and a richer assistant. GitHub/demo links would live as database records and render through the same project components. Those capabilities are real, but the present portfolio does not need them to show the three documented projects convincingly.

### Trade-offs

I gain runtime content updates without redeploying, a private editor, structured querying, forms, storage workflows, and a fully integrated assistant path. I accept the operational work behind every one of those features: database schema and migrations, security policies, authentication, secret management, backups, vendor quota checks, API error states, bot/abuse control, and debugging across services. The extra infrastructure does not make a before/after frame, a diagram, or a technical explanation more credible. It mainly creates capabilities I have not yet established a need for.

## Front-Runner Pressure Test

**Front-runner: Option 2 — the existing Next.js + TypeScript + Tailwind portfolio, deployed on Vercel Hobby, with file-based content and no database for the core.**

It is the best fit because it preserves the working foundation, matches my present skills, supports the planned evidence pages, and leaves a clear upgrade path for the existing optional assistant route. It is not selected because Next.js is fashionable; it is selected because changing stacks would spend the two-week deadline on migration instead of evidence collection and case-study writing.

1. **What breaks if I choose the simplest option?** Nothing essential breaks for the published evidence pages. What breaks is continuity with the existing Next.js implementation: I would rewrite routes and components and create a separate future API deployment.
2. **What capabilities would I lose?** Typed component/data patterns, Vercel preview workflow, built-in route handlers, and the easiest path to the already scaffolded streaming assistant.
3. **Would it still display my technical work properly?** Yes. A static site can display all required written and visual proof.
4. **Can I add detailed case studies?** Yes. Long static pages are one of the simplest things to publish.
5. **Can I display real screenshots and before/after evidence?** Yes. Compressed images, captions, SVG diagrams, and a small browser-only comparison slider are sufficient.
6. **Can I link repositories and demos?** Yes. They are normal external links and need no backend.
7. **Can I add an AI chat later?** Yes, but through an additional serverless/API deployment rather than GitHub Pages itself. It needs a protected key and usage controls.
8. **What happens if the portfolio grows?** More HTML can become repetitive and manual. A static generator or migration to Next.js becomes reasonable if case-study templates, content volume, or interaction grow.
9. **What would I have to maintain?** HTML/CSS/JS, asset compression and captions, link checking, and the Pages workflow. There is no server, database, dependency tree, or runtime secret store.
10. **Can I realistically finish it within two weeks?** Yes, but rebuilding the already-started Next.js portfolio would consume time without improving the proof.
11. **Can I personally understand and debug the stack?** Yes. It is the easiest option to own.
12. **What is the biggest risk of choosing it?** The risk is not technical failure; it is duplicating effort now and making the future assistant integration feel bolted on.

## Simplest Option — What I Would Lose

Option 1 is capable of the complete static portfolio. I would lose convenience and continuity, not portfolio credibility. The actual losses are:

- the already built Next.js routes, Tailwind visual foundation, reusable components, and deployment;
- TypeScript checks around project data and internal links;
- Git-push preview deployments tailored to the existing app;
- one place to add a protected future assistant endpoint;
- lower-friction expansion to interactive evidence components.

I would **not** lose the ability to publish real screenshots, diagram the restoration pipeline, write deeply technical case studies, link GitHub, show AIPS, or contact recruiters. Therefore Option 1 remains a valid fallback if build tooling becomes a blocker.

## Most Powerful Option — What I Would Maintain

Option 3 asks me to maintain infrastructure that the current requirements do not use: a database, migrations, row-level policies, storage permissions, an editor/authentication surface, multiple environment configurations, form and chat abuse controls, logs, provider accounts, and recovery/backup habits. I would also need to decide which content is canonical—the repository MDX or the database—and prevent them from drifting.

The backend would be useful for a deliberately public streaming assistant, a secure contact workflow, or browser-based content publishing. It would not improve the core proof: a reviewer evaluates the quality of the restoration evidence, architecture explanation, code links, and honest boundaries. Adding this layer would slow the two-week build and split attention away from exporting the real before/after frames and completing the placeholder case-study pages.

For a junior portfolio, the stronger demonstration is appropriate engineering judgment: show that I can build server-side systems in the AIPS case study, but do not operate a database-backed product where a version-controlled static portfolio is enough.

## Final Decision

I will build the core portfolio with **Option 2: the existing Next.js 16 + React 19 + TypeScript + Tailwind CSS app, file-based case-study content and assets, deployed on Vercel Hobby.** I will keep the portfolio statically rendered and will not add a database or active AI assistant in this two-week phase.

The immediate build order is: replace placeholder case-study copy with verified content; export and optimize the real restoration and AIPS evidence; add clear GitHub/demo links only where verified; test the routes at mobile and desktop widths; and deploy through the existing Vercel project. The assistant route stays disabled or clearly marked as a future feature until I have a safe provider, key management, rate limits, and a usage budget.

## Why I Chose It

I chose the existing Next.js, TypeScript, Tailwind, and Vercel stack because it is already the foundation of my portfolio and it fits what I can realistically build and debug. It gives me clean pages for detailed case studies, real screenshots, before/after evidence, diagrams, GitHub links, and demos without making me build a database first.

I considered a plain HTML/CSS/JavaScript site on GitHub Pages. I rejected it for this project because it would mean replacing work I already have and would make a future AI chat a separate system. I also considered a fuller Next.js app with a database, storage, authentication, and a streaming assistant. I rejected that because I would have to maintain secrets, migrations, security rules, free-tier limits, and abuse protection before I have a real need for them.

**Can I maintain this?** Yes. I already understand the main tools, and the content will stay in the repository where I can review changes with Git.

**Does it show my work well?** Yes. The important proof is the quality of the case studies and the real evidence, not whether the portfolio has a database.

I do not actually need a backend right now. I only need one later if I make the streaming AI assistant live or add another genuinely dynamic feature. The core stack is realistically free on Vercel Hobby for a personal portfolio within its limits, although I will not assume future AI API use is free. I can finish this within two weeks because I am completing the existing app and gathering real evidence instead of building unnecessary infrastructure.
