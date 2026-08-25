# Claude Project Continuity

This document preserves the full context that must be present in the Claude Project
for the portfolio to remain consistent across future case studies.

When starting a new case study conversation, paste only the new verified project
evidence alongside this context. Do not rebuild the entire project context from scratch
for each case.

---

## Proof Statement

> "I build and optimize Python-based multimedia processing pipelines that solve real
> data bottlenecks and eliminate visual artifacts like frame overlap and distortion,
> helping engineering managers at media and tech companies identify a junior
> backend/pipeline engineer who can turn complex model workflows into clean, working
> solutions. Review my technical case studies to see the architecture, debugging
> decisions, and before-and-after results."

Source: `PORTFOLIO-FL01/portfolio-proof-statement.md`

---

## Target Audience

**Primary:** Engineering Managers, Lead Backend Engineers, and Technical Recruiters at
media-tech companies, video platforms, and AI product teams evaluating junior
backend/pipeline engineers.

**Audience mindset:** Skeptical of generic "AI wrappers" and buzzword-heavy CVs. They
look for:

1. Can this candidate write clean, modular Python?
2. Do they understand multi-model dataflow, memory constraints, and encoding pipelines?
3. Can they diagnose and debug real edge cases such as frame overlap and scene transitions?
4. Do they know their engineering boundaries without fabricating metrics?

Source: `CONTENT-MAP.md` — Section 2

---

## Primary CTA

> "Review my technical case studies."

Every page, card, button, and layout choice exists to drive the visitor toward reading
and verifying the technical case studies.

Source: `CONTENT-MAP.md` — Section 3

---

## Voice Card

**Direct, technical, practical, honest, concise. No buzzwords.**

Apply this voice to all portfolio copy, case studies, Claude Project replies, and AI
drafts before publishing. Challenge vague claims. Prefer specific engineering language
over marketing phrases.

Source: `PORTFOLIO-FL01/voice-card.md`

---

## Visual Identity

| Element | Specification |
| :--- | :--- |
| Palette | Dark navy / slate. Background `#070b14`, surface `#0f1623`, border `#26334d`. |
| Accent | `accent-ink` token (defined in Tailwind/CSS config). |
| Typography | Display font via `--font-display` CSS variable. Monospace for code, captions, and tags via `JetBrains Mono`. |
| Image rule | Visuals are evidence artifacts, not decoration. Every image must pass the 5-point visual integrity test (Evidence, Understanding, Reality, Restraint, Authenticity). |
| Tech tags | Inline monospace text: `[Python]`, `[PyTorch]`, `[FFmpeg]`. Not floating 3D badges. |
| Diagrams | SVG technical flow ribbons at 2:1 or 3:1 ratio. Clean, minimal, no neon. |
| Screenshots | 16:9 container, 1px solid border `#26334d`, 8px corner radius. |
| Background | Subtle 1px `#26334d` geometric/structural grid. No flashy 3D generative backgrounds. |

Source: `VISUAL-IDENTITY.md`

---

## Content Map

**Portfolio pages and order:**

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | HOME | Hook with one-line claim, funnel to case studies. |
| `/work` | WORK / CASE STUDIES | Centralized index of all case studies. |
| `/work/video-restoration` | AI Video Restoration Pipeline | Flagship deep-dive. |
| `/work/aips` | AIPS | Systems engineering deep-dive. |
| `/work/ai-workflow` | AI-Assisted Engineering Workflow | Process and hygiene deep-dive. |
| `/work/flyrank-internship` | FlyRank AI Internship | Next case — not yet added. |
| `/about` | ABOUT | Engineering mindset and background. |
| `/contact` | CONTACT | Conversion channels. |

**Project ranking (strongest work first):**

1. AI Video Restoration Pipeline — Flagship. Do not displace from position 1.
2. AIPS — Academic Intelligence System
3. AI-Assisted Engineering Workflow
4. FlyRank AI Internship (to be added when complete)

Source: `CONTENT-MAP.md` — Sections 4 and 5

---

## Case-Study Three-Beat Structure

Every case study uses exactly these three sections. No additional sections are added
unless they are explicitly described in the CONTENT-MAP page spec.

**THE PROBLEM**
The actual technical problem, its context, and why it mattered. Not a future goal.
Not a marketing framing.

**WHAT I DID**
Personal contribution stated first. Then: implementation path, technical decisions,
trade-offs, AI-assisted steps, and manual verification. Only real tools named.

**WHAT CAME OF IT**
Only verified outcomes pointing to real artifacts. Remaining limitations explicitly
stated. Unknown or incomplete outcomes use `[TO BE COLLECTED WHEN COMPLETE]`.

Source: `CASE-STUDIES.md`, `NEXT-CASE-STUDY.md`, `NEXT-CASE-STUDY-WORKFLOW.md`

---

## Portfolio Constraints

These constraints are non-negotiable and apply to every future case study:

1. Do not invent projects, achievements, metrics, technologies, users, or results.
2. Use only information provided by or verified from real project artifacts.
3. Do not create a new page type unless the existing case-study structure cannot
   support the new case.
4. Do not change global styles, fonts, colors, spacing, or CTA conventions unless
   there is a specific, documented reason.
5. Do not claim a result while the project is still ongoing. Use
   `[TO BE COLLECTED WHEN COMPLETE]`.
6. The AI Video Restoration Pipeline stays at position 1 on the Work page.
7. Every image in the portfolio must pass the 5-point visual integrity test.
8. Commit messages follow Conventional Commits format.

Source: `CLAUDE.md`, `VISUAL-IDENTITY.md`, `NEXT-CASE-STUDY.md`

---

## Evidence Standards

Before any claim is published, it must meet all of the following:

- The claim is supported by a real artifact: code, screenshot, log, frame, test output,
  or architecture diagram.
- The source of the artifact (file path, URL, or command) is known and retainable.
- The claimed outcome names the baseline and the change. It does not name a percentage
  without a measurement method.
- Limitations are stated in the same place as the outcome, not omitted.
- AI-assisted steps are labelled as such, with the developer's verification step named.

Source: `PORTFOLIO-FL01/portfolio-proof-statement.md`, `CASE-STUDIES.md`

---

## Claude's Standing Role

Claude acts as a portfolio drafting collaborator and critical reviewer.

- Claude drafts and critiques. The developer retains 100% responsibility for technical
  facts, personal contribution, metrics, screenshots, links, limitations, and the
  final publishing decision.
- Claude challenges vague claims and unsupported language before they reach the page.
- Claude does not invent outcomes. When evidence is missing, it writes
  `[TO BE COLLECTED WHEN COMPLETE]`.

Source: `PORTFOLIO-FL01/claude-project-instructions.md`, `CLAUDE-PROJECT-CONTINUATION.md`

---

## Verification Status of This Document

This document is derived from the current repository state as of the date it was
created. It reflects the files present in the repository at that point. It is not
a live sync. Verify against the actual repository files before relying on specific
details such as routes, file paths, or component names.
