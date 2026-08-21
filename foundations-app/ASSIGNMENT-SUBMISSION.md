# Foundations Phase — Assignment Submission

## Deliverable checklist

- [x] Next.js App Router scaffold
- [x] Root layout + navigation
- [x] Placeholder routes for every portfolio screen in the spec
- [x] Tailwind + design tokens in `src/app/globals.css`
- [x] Health-check page rendering fetched data (`/health`)
- [x] Env var structure via `.env.example` (no secrets committed)
- [ ] Vercel/Netlify Git connection with preview URL on every push
- [ ] Preview URL shared below after first successful deploy

## Spec screens (routed)

| Screen | Route |
|--------|-------|
| Home | `/` |
| Work | `/work` |
| Case study — Video Restoration | `/work/video-restoration` |
| Case study — AIPS | `/work/aips` |
| Case study — AI Workflow | `/work/ai-workflow` |
| About | `/about` |
| Contact | `/contact` |
| Health check | `/health` |

## Links for submission

- **Repo:** https://github.com/vivekcyr25/frontend-ai-engineering-starter
- **App directory in repo:** `foundations-app/`
- **Live preview URL:** _pending first Vercel/Netlify deploy — paste here after connect_

## Local verification

```bash
cd foundations-app
npm install
npm run dev
npm run build
```

Responsive checks: 375px and 1280px in browser DevTools.
