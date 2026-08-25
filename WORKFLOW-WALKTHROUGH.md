# AI Writing Workflow

## Goal

Turn rough but real technical notes into a portfolio-ready case-study draft without turning unknown information into polished fiction.

This is a reusable, no-code workflow: each step can be a separate prompt/chat, an automation node, or a form-to-AI handoff. The output of one step is pasted unchanged into the next. The workflow is designed for a junior engineer whose projects include Python multimedia pipelines, a web application, and AI-assisted development work.

**Non-negotiable rule:** the workflow may organize, shorten, and critique supplied evidence. It may not create a metric, personal contribution, technology use, screenshot, repository URL, or outcome that is absent from the input. Missing information remains `[NEEDS HUMAN INPUT]`.

## Workflow Diagram

```text
RAW INPUT
  (notes, README excerpts, code paths, logs, screenshots, links)
        |
        v
STEP 1 — GATHER
  Structured PROJECT INPUT; unsupported details excluded
        |
        v
STEP 2 — SYNTHESIZE
  Factual brief; verified facts separated from missing facts
        |
        v
STEP 3 — DRAFT
  Concise technical case study
        |
        v
STEP 4 — CRITIQUE + REVIEW
  Explicit issues, risks, and corrections
        |
        v
STEP 5 — FINAL REVISION
  Portfolio-review draft, retaining [NEEDS HUMAN INPUT] where needed
```

### Reusable handoff contract

Every handoff includes:

- the prior step’s output, unchanged;
- links or file paths to the original source material;
- an `Evidence status` field (`verified`, `missing`, or `needs human verification`);
- no instructions to “fill in gaps,” improve results, or make the writing sound more impressive.

## Step 1 — Gather

### Prompt/configuration

```text
You are the Gather step in an evidence-first technical-writing workflow.

Read only the RAW INPUT below. Extract facts; do not infer, improve, or
complete them. If sources disagree, record the conflict. Do not treat a
README marketing claim as a personal measurement unless the input says it
was personally measured or independently verified.

Return only the PROJECT INPUT schema below. Use [NEEDS HUMAN INPUT] for
unknown fields. Preserve exact paths/URLs when provided.

RAW INPUT:
[PASTE NOTES, CODE/README EXCERPTS, LOGS, SCREENSHOT DESCRIPTIONS, AND LINKS]
```

### Output format

```text
PROJECT INPUT
- Project/title:
- Source material reviewed:
- Project/problem:
- Context/why it existed:
- My role/contribution:
- Technical approach:
- Verified tools/technologies:
- Important engineering decisions:
- Problems encountered:
- Debugging/fixes:
- Verified results/evidence:
- Limitations:
- Available evidence/screenshots:
- Repository/demo links:
- Missing or conflicting information:
- Human verification required:
```

**Handoff:** pass the entire `PROJECT INPUT` to Step 2.

## Step 2 — Synthesize

### Prompt/configuration

```text
You are the Synthesize step. Use only the PROJECT INPUT below. Create a
factual project brief for a technical recruiter or engineering manager.

Separate verified facts from missing information. Do not turn a tool list
into undocumented component behavior. Do not turn visual review into a
numeric result. Mark every needed detail exactly as [NEEDS HUMAN INPUT].

PROJECT INPUT:
[PASTE STEP 1 OUTPUT]
```

### Output format

```text
FACTUAL PROJECT BRIEF
1. Problem
2. Why it mattered
3. What I built
4. Technical approach
5. Key engineering decisions
6. Challenges and fixes
7. Outcome/evidence
8. Limitations
9. What could be improved

VERIFIED FACTS
- ...

MISSING / NEEDS HUMAN INPUT
- ...
```

**Handoff:** pass the entire factual brief to Step 3.

## Step 3 — Draft

### Prompt/configuration

```text
You are the Draft step. Write a concise technical case study using only
the verified facts in the factual project brief. Retain [NEEDS HUMAN INPUT]
where a missing fact is needed for an honest public claim.

Use a direct, technically credible junior-engineer voice. Avoid generic AI
buzzwords, unsupported metrics, invented personal ownership, and words such
as "revolutionary", "cutting-edge", "seamless", "leveraged AI", and
"results-driven".

FACTUAL PROJECT BRIEF:
[PASTE STEP 2 OUTPUT]
```

### Output format

```markdown
# Project Title

## The Problem

## What I Built

## How It Works

## Engineering Decisions

## Challenges

## Outcome

## Limitations

## Technical Stack
```

**Handoff:** pass the draft and the Step 2 brief to Step 4.

## Step 4 — Critique

### Prompt/configuration

```text
You are the Critique + Review step. Compare the DRAFT against the FACTUAL
PROJECT BRIEF. Do not rewrite the draft yet.

Report every issue explicitly. Check factual accuracy, technology names,
metrics, personal contribution, engineering clarity, trade-offs, concision,
and whether the draft gives an engineering manager evidence instead of
marketing claims. If there is no issue, say "No issue found" for that
category.

FACTUAL PROJECT BRIEF:
[PASTE STEP 2 OUTPUT]

DRAFT:
[PASTE STEP 3 OUTPUT]
```

### Output format

```text
CRITIQUE

1. FACTUAL ACCURACY
- Issue:
- Why it matters:
- Suggested correction:

2. TECHNICAL QUALITY
- Issue:
- Why it matters:
- Suggested correction:

3. WRITING QUALITY
- Issue:
- Why it matters:
- Suggested correction:

4. PORTFOLIO QUALITY
- Issue:
- Why it matters:
- Suggested correction:

HUMAN REVIEW CHECKLIST
- Facts / role / metrics / evidence / links requiring confirmation:
```

**Handoff:** pass the draft, factual brief, and critique to Step 5.

## Step 5 — Final Revision

### Prompt/configuration

```text
You are the Final Revision step. Revise the draft using only valid
corrections in the critique and only facts in the factual project brief.
Do not add facts. Keep [NEEDS HUMAN INPUT] wherever the record is incomplete.

Return the final case study, then a short "Human approval before publishing"
checklist. This is still a draft until the project owner verifies it.

FACTUAL PROJECT BRIEF:
[PASTE STEP 2 OUTPUT]

DRAFT:
[PASTE STEP 3 OUTPUT]

CRITIQUE:
[PASTE STEP 4 OUTPUT]
```

### Output format

```text
FINAL CASE STUDY
[revised case study]

HUMAN APPROVAL BEFORE PUBLISHING
- ...
```

## Five Real Runs

The following runs use existing workspace material, not invented examples. They are compact execution records: each shows the distinct Gather → Synthesize → Draft → Critique → Final Revision handoffs. Timing was not recorded in the source material, so time fields intentionally remain unmeasured.

### Run 1 — AI Video Restoration Pipeline

**Input/project:** AI Video Restoration Pipeline.

**Starting material:** `PORTFOLIO-FL01/PORTFOLIO-CASE-STUDIES.md`, `CASE-STUDIES.md`, `CONTENT-MAP.md`, and `PROMPT-ITERATION-LOG.md`.

**Time required by workflow:** `[NEEDS HUMAN INPUT — not recorded]`
**Human review time:** `[NEEDS HUMAN INPUT — not recorded]`

#### Step 1 — Gather output

```text
PROJECT INPUT
- Project/title: AI Video Restoration Pipeline
- Project/problem: Face overlap on restored frames under heavy recursive interpolation; old and wedding footage is processed under imperfect-source and hardware limits.
- Context/why it existed: A restoration workflow needed scene handling, frame/image matching, enhancement, and reconstruction instead of a single enhancement pass.
- My role/contribution: Worked on the face embedder, face matcher, and CSV dataset tracking frames.
- Technical approach: Sequential video/vision pipeline; documented components include scene handling, embeddings, enhancement, reference selection, and video propagation.
- Verified tools/technologies: Python, FFmpeg, PySceneDetect, OpenCV, OpenCLIP, InsightFace, ONNX Runtime GPU, PyTorch/torchvision, Real-ESRGAN, CSV artifacts, pytest.
- Important engineering decisions: Track frames with CSV data; use face embedding/matching; review restored-frame checklist instead of assuming model output is correct.
- Problems encountered: Face overlap; consumer hardware and degraded source constraints.
- Debugging/fixes: Face embedder and matcher work targeted overlap; restored frames were reviewed.
- Verified results/evidence: Reduced overlapping on restored frames reviewed; repo paths, preview assets, and demo URL are listed in the source.
- Limitations: No claim of perfect restoration, all-clip success, personally reproduced README benchmarks, or long-form/cloud validation.
- Available evidence/screenshots: Degraded-frame preview assets; real before/after exports still need collection.
- Repository/demo links: github.com/vivekcyr25/AI-Video-Restoration-Pipeline; vivekcyr25.github.io/AI-Video-Restoration-Pipeline/
- Missing or conflicting information: Exact measured quality/runtime/GPU change; exact before/after files to publish.
- Human verification required: Personal role, current repository paths/links, visual result, and wording "reduced overlapping".
```

#### Step 2 — Synthesize output

```text
FACTUAL PROJECT BRIEF
1. Problem: Face overlap made restored frames untrustworthy under heavy interpolation.
2. Why it mattered: A restoration pipeline is only useful if visual artifacts can be inspected and corrected.
3. What I built: A Python video-restoration workflow with face-embedding, matching, and frame-CSV work.
4. Technical approach: Connected scene/video/vision stages and used a frame inventory; exact per-library mapping is not claimed.
5. Key engineering decisions: Treat frame tracking and visual review as explicit checks; operate within hardware limits.
6. Challenges and fixes: Face overlap was targeted through matcher/embedding work and reviewed restored frames.
7. Outcome/evidence: Source states fewer overlap failures on reviewed frames; source also provides repo/demo paths.
8. Limitations: No measured quality, throughput, reliability, or all-input claim.
9. What could be improved: Export before/after pairs, preserve run logs, and measure a defined baseline.

MISSING / NEEDS HUMAN INPUT
- [NEEDS HUMAN INPUT] exact test clips, frame counts, metrics, and publishable screenshots.
```

#### Step 3 — Draft output

```markdown
# AI Video Restoration Pipeline

## The Problem

Restoring old and wedding footage involved more than running an enhancement model. Under heavy interpolation, face overlap appeared on restored frames, which made the output difficult to trust.

## What I Built

I worked on the face embedder, face matcher, and CSV tracking of frames within a Python video-restoration workflow.

## How It Works

The documented workflow combines scene/video handling, frame or image matching, enhancement, and reconstruction. The project uses FFmpeg, PySceneDetect, OpenCV, OpenCLIP, InsightFace, ONNX Runtime GPU, PyTorch/torchvision, and Real-ESRGAN.

## Engineering Decisions

I treated frame tracking as explicit data rather than an implicit side effect, and reviewed restored frames against a checklist. I also kept consumer hardware and source quality as design constraints.

## Challenges

Face overlap was the main documented failure mode. The face-embedding and matching work targeted that issue; I reviewed the resulting frames rather than assuming the change was correct.

## Outcome

The project record says overlap was reduced on the restored frames reviewed. [NEEDS HUMAN INPUT: publishable before/after frame pair and any measured evaluation.]

## Limitations

The pipeline is not claimed to be perfect on every clip. Long-form, cloud, and personally reproduced benchmark claims are not established here.

## Technical Stack

Python, FFmpeg, PySceneDetect, OpenCV, OpenCLIP, InsightFace, ONNX Runtime GPU, PyTorch/torchvision, Real-ESRGAN, pytest.
```

#### Step 4 — Critique output

```text
CRITIQUE
1. FACTUAL ACCURACY
- Issue: "The project uses" can read as personal ownership of every listed component.
- Why it matters: The source limits personal ownership to the face embedder, matcher, and CSV path.
- Suggested correction: Say the wider documented workflow uses these components; keep the personal contribution separate.
2. TECHNICAL QUALITY
- Issue: Exact handoff between named tools is intentionally unspecified.
- Why it matters: Assigning each library a stage would be an unsupported inference.
- Suggested correction: Keep the workflow-level explanation.
3. WRITING QUALITY
- Issue: No issue found; the draft is concise.
4. PORTFOLIO QUALITY
- Issue: The evidence link is absent from the draft.
- Why it matters: A reviewer needs a direct verification path.
- Suggested correction: Add verified repository and demo links after human confirmation.
```

#### Step 5 — Final revision

```markdown
# AI Video Restoration Pipeline

## The Problem

I was working with old and wedding footage where heavy interpolation could create face overlap on restored frames.

## What I Built

I worked on the face embedder, face matcher, and CSV tracking of frames within a Python restoration pipeline.

## How It Works

The wider documented workflow combines scene/video handling, frame or image matching, enhancement, and reconstruction. Its documented stack includes FFmpeg, PySceneDetect, OpenCV, OpenCLIP, InsightFace, ONNX Runtime GPU, PyTorch/torchvision, and Real-ESRGAN.

## Engineering Decisions

I kept frame tracking explicit through CSV data and reviewed restored frames instead of treating model output as automatically correct. Hardware and source-quality limits remained part of the design.

## Challenges

Face overlap was the main recorded failure mode. The face-embedding and matching work targeted it, and I checked the restored-frame output.

## Outcome

The project record describes fewer overlap failures on the frames I reviewed. [NEEDS HUMAN INPUT: publishable before/after frame pair and measured evaluation, if available.]

## Limitations

This does not claim perfect restoration, success on every input, or reproduced long-run benchmarks.

## Technical Stack

Python, FFmpeg, PySceneDetect, OpenCV, OpenCLIP, InsightFace, ONNX Runtime GPU, PyTorch/torchvision, Real-ESRGAN, pytest.
```

**Problems found:** Missing published before/after evidence and measured results; risk of overstating ownership of the full toolchain.
**Human corrections required:** Verify the links, personal contribution, result wording, and evidence before publishing.

### Run 2 — AIPS (Academic Intelligence System)

**Input/project:** AIPS — Academic Intelligence System.

**Starting material:** `PORTFOLIO-FL01/PORTFOLIO-CASE-STUDIES.md`, `CASE-STUDIES.md`, `CONTENT-MAP.md`, and the documented AIPS repository/deploy links.

**Time required by workflow:** `[NEEDS HUMAN INPUT — not recorded]`
**Human review time:** `[NEEDS HUMAN INPUT — not recorded]`

#### Step 1 — Gather output

```text
PROJECT INPUT
- Project/title: AIPS — Academic Intelligence System
- Project/problem: Provide a usable academic product and avoid exposing the Groq API key in the browser; offline access is not complete.
- Context/why it existed: Students need an academic workflow system even when network reliability is a concern.
- My role/contribution: UI/UX core idea, architecture direction, and Groq AI-assistant integration using a backend-held API key.
- Technical approach: React + Vite frontend; Firebase persistence/auth patterns; Vercel serverless API handlers for AI chat/stream and verification; proxied AI path.
- Verified tools/technologies: TypeScript, React, Vite, Firebase, Vercel serverless API handlers, Groq API.
- Verified results/evidence: System works live online; repository, deployed URL, and architecture document are named.
- Limitations: Offline access is incomplete.
- Repository/demo links: github.com/vivekcyr25/APIS-Academic-Intelligence-System; apis-academic-intelligence-system.vercel.app
- Missing information: Measured users, latency, retrieval quality, offline roadmap, and screenshot to publish.
- Human verification required: Current deployment status, exact role, security implementation, and all external links.
```

#### Step 2 — Synthesize output

```text
FACTUAL PROJECT BRIEF
1. Problem: Build an academic app with a usable online experience without moving the AI key into client code.
2. Why it mattered: Client-side credentials are unsafe; offline access is an acknowledged unmet need.
3. What I built: AIPS with a frontend, serverless API path, and Groq-assistant integration.
4. Technical approach: Frontend requests pass through Vercel serverless handlers; Firebase patterns support application persistence/auth.
5. Key engineering decisions: Keep the API key in backend/server configuration; do not claim offline-first support.
6. Challenges and fixes: Security boundary is addressed through the proxied path; offline work remains unfinished, not "fixed."
7. Outcome/evidence: Live online deployment and repository/architecture documents.
8. Limitations: Offline functionality incomplete; no measured product or model outcome supplied.
9. What could be improved: Verify current architecture/deploy, capture UI, define and implement offline scope.
```

#### Step 3 — Draft output

```markdown
# AIPS — Academic Intelligence System

## The Problem

I wanted to build an academic application with a usable online experience while keeping an AI-provider key out of the browser. Offline access was also a real need, but it is not complete.

## What I Built

I worked on the UI/UX core idea, architecture direction, and Groq assistant integration. The documented application uses a React and Vite frontend with Vercel serverless API handlers.

## How It Works

The documented AI path uses server-side handlers rather than exposing the provider key in frontend code. The repository also shows Firebase persistence/auth patterns.

## Engineering Decisions

The key decision was to keep the Groq credential on the backend/server side. I kept the online and offline states separate instead of presenting incomplete offline access as a finished feature.

## Challenges

Offline access is not ready, so the live system should be described as online-first.

## Outcome

The project record says the system works live online. [NEEDS HUMAN INPUT: current UI screenshot and verification of the deployed URL.]

## Limitations

Offline access remains incomplete. No user, latency, or quality metrics are claimed.

## Technical Stack

TypeScript, React, Vite, Firebase, Vercel serverless API handlers, Groq API.
```

#### Step 4 — Critique output

```text
CRITIQUE
1. FACTUAL ACCURACY
- Issue: Firebase is documented as a pattern; the draft should not imply every Firebase feature is production-active.
- Why it matters: The source does not establish the exact current data model.
- Suggested correction: Keep "Firebase persistence/auth patterns" wording.
2. TECHNICAL QUALITY
- Issue: No request/data-flow diagram or link is in the body.
- Why it matters: A manager needs an inspectable architecture path.
- Suggested correction: Add the verified repo, live URL, and ARCHITECTURE.md after checking them.
3. WRITING QUALITY
- Issue: No issue found.
4. PORTFOLIO QUALITY
- Issue: A live-online statement needs a current manual check.
- Why it matters: Deployments change.
- Suggested correction: Open the production URL before publishing.
```

#### Step 5 — Final revision

```markdown
# AIPS — Academic Intelligence System

## The Problem

I was building an academic application that needed a usable online experience without exposing an AI-provider key in the browser. Offline access is a separate need that is not complete.

## What I Built

I worked on the UI/UX core idea, architecture direction, and the Groq assistant integration. The documented app has a React/Vite frontend and Vercel serverless API handlers.

## How It Works

The documented AI path sends requests through server-side handlers so the Groq credential stays outside the frontend bundle. The repository also documents Firebase persistence/auth patterns.

## Engineering Decisions

Keeping the provider key on the server was the core security decision. I kept the online system and incomplete offline work separate in the project description.

## Challenges

Offline access is unfinished, so I describe the system as online-first rather than offline-first.

## Outcome

The project record describes a working live online deployment. [NEEDS HUMAN INPUT: current UI capture and deployment check.]

## Limitations

Offline access remains incomplete; no product-usage, latency, or response-quality metrics are claimed.

## Technical Stack

TypeScript, React, Vite, Firebase persistence/auth patterns, Vercel serverless API handlers, Groq API.
```

**Problems found:** Live status and current UI evidence require a manual check; Firebase specifics can be overstated.
**Human corrections required:** Verify deployment, links, screenshots, exact role, and backend-key implementation before publishing.

### Run 3 — AI-Assisted Engineering Workflow

**Input/project:** AI-assisted engineering workflow / precise-prompt contact-form experiment.

**Starting material:** `WORKFLOW.md`, `FL-01-Workflow-Audit.md`, and `PORTFOLIO-FL01/PORTFOLIO-CASE-STUDIES.md`.

**Time required by workflow:** `[NEEDS HUMAN INPUT — not recorded]`
**Human review time:** `[NEEDS HUMAN INPUT — not recorded]`

#### Step 1 — Gather output

```text
PROJECT INPUT
- Project/title: AI-Assisted Engineering Workflow
- Project/problem: Vague AI prompts produced code that missed requirements and increased cleanup/review risk.
- Context/why it existed: A contact form was implemented twice on branches ai-vague and ai-precise.
- My role/contribution: Wrote/reviewed the specifications and implementation outcomes; identified missing labels and whitespace-only validation failures.
- Technical approach: Compare a one-line prompt with a detailed spec including files, accessibility rules, edge cases, and verification.
- Verified tools/technologies: HTML, CSS, JavaScript, Node test runner, Git branches/diff.
- Important engineering decisions: Use visible labels, trimming, specific email validation, maxlength, custom errors, ARIA relationships, focus management, and tests.
- Verified results/evidence: Exact branch diff is +318/-41 across 8 paths; precise round has 4 passing Node tests; exact review minutes were not measured.
- Limitations: Experiment is one feature comparison, not proof that AI is reliable without review.
- Evidence: WORKFLOW.md; ai-vague/ai-precise branches; experiment prompt/spec files.
- Missing information: Time spent in each round.
```

#### Step 2 — Synthesize output

```text
FACTUAL PROJECT BRIEF
1. Problem: A vague prompt made a form runnable but left accessibility and validation gaps.
2. Why it mattered: Form validation and accessibility require explicit acceptance criteria.
3. What I built: A comparison between vague and precise AI-assisted implementations.
4. Technical approach: Added a written spec, separated validation module, test file, error handling, and accessible markup in the precise round.
5. Key decisions: Make requirements executable/testable instead of relying on a broad request.
6. Challenges/fixes: Placeholder-only inputs and whitespace acceptance were found in the vague round; visible labels and trim-based validation addressed them.
7. Outcome/evidence: Four observed Node tests passed in the precise round; git diff documents added structure.
8. Limitations: Review time is unmeasured; no backend message delivery exists.
9. Improvement: Test more assistive-technology and browser scenarios.
```

#### Step 3 — Draft output

```markdown
# AI-Assisted Engineering Workflow

## The Problem

A vague request to add a contact form produced a runnable version that still had gaps: placeholders were used instead of visible labels, and whitespace-only values could pass validation.

## What I Built

I compared two implementations on separate branches. The second used a written specification covering files, accessibility, edge cases, and a verification command.

## How It Works

The precise version separates validation into `js/validate.js`, uses visible labels and error relationships, trims input, applies length limits, focuses the first invalid field, and tests validation with Node's test runner.

## Engineering Decisions

I treated the specification and tests as part of the engineering work, not as optional AI instructions.

## Challenges

The vague version accepted whitespace-only input and did not provide accessible field labeling. The precise version addressed those documented gaps.

## Outcome

The precise branch added eight changed paths (+318/-41 compared with the vague branch), and the recorded test run reported 4 passing tests and 0 failures. The demo does not send a message to a server.

## Limitations

This is one controlled feature experiment; exact review minutes were not recorded.

## Technical Stack

HTML, CSS, JavaScript, Node test runner, Git.
```

#### Step 4 — Critique output

```text
CRITIQUE
1. FACTUAL ACCURACY
- Issue: No issue found; the numerical diff and test result are explicitly documented.
2. TECHNICAL QUALITY
- Issue: The draft does not name that the email check is intentionally modest.
- Why it matters: Readers should not infer a complete email-validation system.
- Suggested correction: State that validation is a client-side demo rule, not delivery or identity verification.
3. WRITING QUALITY
- Issue: No issue found.
4. PORTFOLIO QUALITY
- Issue: Branch names and source paths should be linked or shown where the portfolio allows.
- Why it matters: They make the claim inspectable.
- Suggested correction: Add verified repo/branch references.
```

#### Step 5 — Final revision

```markdown
# AI-Assisted Engineering Workflow

## The Problem

A vague request to add a contact form produced a runnable version that still missed important checks: it relied on placeholders rather than visible labels and accepted whitespace-only values.

## What I Built

I compared a vague-prompt implementation with a second implementation guided by a written specification for files, accessibility, edge cases, and verification.

## How It Works

The precise version separates validation into `js/validate.js`, uses visible labels and error relationships, trims values, applies length limits, focuses the first invalid field, and includes Node tests.

## Engineering Decisions

I made the requirements concrete enough to review and test instead of treating an AI answer as correct by default.

## Challenges

The vague implementation exposed label and whitespace-validation gaps. The precise implementation addressed those documented issues.

## Outcome

The recorded branch diff is eight paths changed (+318/-41), and the observed Node test run reported 4 passing tests and 0 failures. This is a client-side validation demo; it does not send a message to a server.

## Limitations

This is one feature experiment, not a claim that AI output is reliable without review. Exact review time was not measured.

## Technical Stack

HTML, CSS, JavaScript, Node test runner, Git.
```

**Problems found:** The original draft could imply production-grade validation; time data is absent.
**Human corrections required:** Verify branch links and rerun tests if presenting the result after code changes.

### Run 4 — Portfolio Foundations App

**Input/project:** FlyRank portfolio foundations app.

**Starting material:** `foundations-app/AGENTS.md`, `foundations-app/ASSIGNMENT-SUBMISSION.md`, `foundations-app/package.json`, and `CONTENT-MAP.md`.

**Time required by workflow:** `[NEEDS HUMAN INPUT — not recorded]`
**Human review time:** `[NEEDS HUMAN INPUT — not recorded]`

#### Step 1 — Gather output

```text
PROJECT INPUT
- Project/title: Portfolio Foundations App
- Project/problem: Establish a routed, maintainable portfolio shell for technical case studies.
- Context/why it existed: Portfolio targets managers/recruiters evaluating junior backend/pipeline work.
- My role/contribution: [NEEDS HUMAN INPUT — source documents describe deliverables but do not state a personal role precisely.]
- Technical approach: Next.js App Router foundation with routes, components, design tokens, and environment-variable structure.
- Verified tools/technologies: Next.js 16, React 19, TypeScript, Tailwind CSS v4, ESLint, Vercel.
- Verified results/evidence: Routes and foundation checklist are marked complete; a Vercel production deployment URL is documented.
- Limitations: Case-study pages remain placeholders; Git-connected preview deployments are optional/unconfirmed in the checklist.
- Evidence: assignment submission, source routes, package manifest, documented deploy URLs.
- Missing information: Personal contribution wording, exact test/build result for the current revision, final case-study content and evidence assets.
```

#### Step 2 — Synthesize output

```text
FACTUAL PROJECT BRIEF
1. Problem: A portfolio needs a consistent route and visual foundation before long-form evidence pages are added.
2. Why it mattered: Technical work needs a clear path from homepage to case studies and contact.
3. What I built: A Next.js foundation with routed screens, navigation, Tailwind tokens, and environment structure.
4. Technical approach: App Router routes and reusable components; server components by default and client interaction where necessary.
5. Key decisions: Keep the foundation minimal and avoid adding a database for static case studies.
6. Challenges/fixes: Not supplied as a concrete development incident.
7. Outcome/evidence: Existing routes and documented Vercel deployment.
8. Limitations: Content pages are placeholders and evidence assets are still being collected.
9. Improvement: Replace placeholders with verified case-study data/assets and run current build checks.
```

#### Step 3 — Draft output

```markdown
# Portfolio Foundations App

## The Problem

I needed a maintainable portfolio foundation that could route recruiters from a homepage to technical case studies, supporting pages, and contact information.

## What I Built

The documented foundation is a Next.js App Router application with navigation, routed portfolio screens, Tailwind design tokens, and an environment-variable structure.

## How It Works

The app uses Next.js 16, React 19, TypeScript, and Tailwind CSS. It includes routes for home, work, individual case-study placeholders, about, contact, health, and an optional assistant screen.

## Engineering Decisions

The foundation keeps the portfolio static-first, so long-form case studies and evidence do not require a database.

## Challenges

[NEEDS HUMAN INPUT: a verified development issue and how it was resolved.]

## Outcome

The assignment record documents a Vercel production deployment and the initial routed shell. [NEEDS HUMAN INPUT: verify the current deployment and build status.]

## Limitations

The work and case-study routes are still placeholders until verified content and real evidence assets are added.

## Technical Stack

Next.js 16, React 19, TypeScript, Tailwind CSS v4, ESLint, Vercel.
```

#### Step 4 — Critique output

```text
CRITIQUE
1. FACTUAL ACCURACY
- Issue: "I needed" and implied ownership need human confirmation.
- Why it matters: The source lists deliverables, not a detailed role statement.
- Suggested correction: Confirm personal contribution before publication.
2. TECHNICAL QUALITY
- Issue: The draft does not show a concrete engineering decision beyond static-first architecture.
- Why it matters: A case study needs more technical depth.
- Suggested correction: Add a documented route/component/design trade-off after reviewing commits and code.
3. WRITING QUALITY
- Issue: No issue found; the missing challenge is correctly visible.
4. PORTFOLIO QUALITY
- Issue: This is foundation work, not as strong as the video-restoration case study.
- Why it matters: It should support the portfolio rather than replace the flagship proof.
- Suggested correction: Keep it as a short supporting case study or build note.
```

#### Step 5 — Final revision

```markdown
# Portfolio Foundations App

## The Problem

The portfolio needed a clear, maintainable route structure so a reviewer can move from the landing page into technical case studies and contact details.

## What I Built

The documented foundation is a Next.js App Router application with navigation, routed portfolio screens, Tailwind design tokens, and environment-variable structure.

## How It Works

It uses Next.js 16, React 19, TypeScript, and Tailwind CSS. The documented routes cover home, work, case-study placeholders, about, contact, health, and an optional assistant screen.

## Engineering Decisions

The foundation is static-first: case-study content and evidence can be versioned in the repository without introducing a database.

## Challenges

[NEEDS HUMAN INPUT: a verified development issue, decision, and resolution.]

## Outcome

The assignment record documents an initial Vercel deployment and routed application shell. [NEEDS HUMAN INPUT: current deploy and build verification.]

## Limitations

The case-study screens remain placeholders until real content and evidence are added.

## Technical Stack

Next.js 16, React 19, TypeScript, Tailwind CSS v4, ESLint, Vercel.
```

**Problems found:** No detailed personal role or documented engineering incident; pages are placeholders.
**Human corrections required:** Confirm contribution, rerun build, check deploy URL, and add only real implementation evidence.

### Run 5 — Accessibility-Focused Contact Form

**Input/project:** Contact-form implementation comparison.

**Starting material:** `WORKFLOW.md` and the documented `ai-vague` / `ai-precise` branches.

**Time required by workflow:** `[NEEDS HUMAN INPUT — not recorded]`
**Human review time:** `[NEEDS HUMAN INPUT — not recorded]`

#### Step 1 — Gather output

```text
PROJECT INPUT
- Project/title: Accessible Contact Form Comparison
- Project/problem: A basic client-side form needs accessible labels, understandable errors, and validation that rejects empty/whitespace/over-length input.
- Context/why it existed: The same feature was generated from a vague prompt and a detailed specification.
- My role/contribution: Reviewed outputs and caught missing labels and whitespace-only input acceptance.
- Technical approach: HTML form, CSS, JavaScript; separate validation module and Node tests in the precise version.
- Verified engineering decisions: visible labels, aria-describedby, aria-invalid, role=alert, aria-live, focus management, trim checks, maxlength, custom email rule, explicit no-server success copy.
- Verified result/evidence: Four tests passed; vague version had the documented failures; the precise implementation is not a message-delivery backend.
- Limitations: Email rule is intentionally simple; no server, spam protection, or real submission.
- Missing information: Manual assistive-technology test results and time spent.
```

#### Step 2 — Synthesize output

```text
FACTUAL PROJECT BRIEF
1. Problem: A form can appear to work while failing basic input and accessibility expectations.
2. Why it mattered: A contact path must not mislead users or exclude keyboard/screen-reader users.
3. What I built: A precise-prompt contact-form implementation and comparison record.
4. Technical approach: Client-side validation module plus HTML semantics, ARIA errors/status, CSS focus styles, and Node tests.
5. Key decisions: Make success copy honest about no backend; test validation rules.
6. Challenges/fixes: Placeholder-only labels and whitespace acceptance were identified and addressed.
7. Outcome/evidence: Four passing tests; source comparison records exact changes.
8. Limitations: No actual form delivery, anti-spam, server validation, or accessibility-assistive-tech study.
9. Improvement: Add a backend only if contact submission is required; test real assistive technology.
```

#### Step 3 — Draft output

```markdown
# Accessible Contact Form Comparison

## The Problem

A form can look complete while still failing input validation and accessibility basics. In the vague implementation, placeholders replaced visible labels and whitespace-only values could pass.

## What I Built

I reviewed a second implementation built from a detailed specification and compared it with the vague-prompt version.

## How It Works

The precise version uses visible labels, per-field error relationships, invalid-state attributes, an announced status, focus management, trimmed values, length limits, and a separate validation module tested with Node.

## Engineering Decisions

The success message states that the demo does not send data to a server. That keeps the interface honest about its scope.

## Challenges

The review identified placeholder-only labels and whitespace acceptance in the vague version. The precise version added documented fixes.

## Outcome

The recorded Node test run reported 4 passing tests and 0 failures.

## Limitations

The form has no server delivery, spam protection, server-side validation, or completed assistive-technology test record.

## Technical Stack

HTML, CSS, JavaScript, Node test runner.
```

#### Step 4 — Critique output

```text
CRITIQUE
1. FACTUAL ACCURACY
- Issue: "Accessible" in the title can be read as a completed accessibility certification.
- Why it matters: The source documents improvements, not a full assistive-technology validation study.
- Suggested correction: Use "Accessibility-Focused" or retain a limitation immediately after the title.
2. TECHNICAL QUALITY
- Issue: No issue found; the engineering checks are specific.
3. WRITING QUALITY
- Issue: No issue found.
4. PORTFOLIO QUALITY
- Issue: The form is a smaller supporting example.
- Why it matters: It should demonstrate review discipline, not distract from larger systems work.
- Suggested correction: Position it as a workflow/code-quality evidence item.
```

#### Step 5 — Final revision

```markdown
# Accessibility-Focused Contact Form Comparison

## The Problem

A form can appear complete while failing basic validation and accessibility expectations. In the vague implementation, placeholders replaced visible labels and whitespace-only values could pass.

## What I Built

I reviewed a second implementation built from a detailed specification and compared it with the vague-prompt version.

## How It Works

The precise version uses visible labels, per-field error relationships, invalid-state attributes, an announced status, focus management, trimmed values, length limits, and a separately tested validation module.

## Engineering Decisions

The success copy says the demo does not send data to a server, so the UI does not claim a feature it does not provide.

## Challenges

Review identified placeholder-only labels and whitespace acceptance in the vague version; the precise version addressed those documented gaps.

## Outcome

The recorded Node test run reported 4 passing tests and 0 failures.

## Limitations

This is an accessibility-focused implementation, not a completed assistive-technology certification. It has no server delivery, spam protection, or server-side validation.

## Technical Stack

HTML, CSS, JavaScript, Node test runner.
```

**Problems found:** The title could overstate validation; no server or assistive-technology testing.
**Human corrections required:** Verify tests against the branch/version presented and avoid claiming full accessibility compliance.

## Time Comparison

No source material records manual drafting time, workflow execution time, human review time, correction time, or one-time workflow setup time. Inventing values would make the comparison itself inaccurate. The table below is therefore a measurement sheet, not a false performance claim.

| Run | Manual research / organizing | Manual drafting | Manual review | Manual total | Workflow preparation | Workflow execution | Human review | Correction | Workflow total | Time saved |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 — Video Restoration | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | Not calculable |
| 2 — AIPS | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | Not calculable |
| 3 — AI workflow | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | Not calculable |
| 4 — Foundations app | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | Not calculable |
| 5 — Contact form | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | `[NEEDS HUMAN INPUT]` | Not calculable | Not calculable |

### Measurement method for the next five live runs

1. Start a timer when collecting source notes for either process.
2. Stop and record each named stage separately.
3. Record the human time required to check technical claims, links, screenshots, and personal role.
4. Record correction time after critique; do not hide it inside “AI time.”
5. Use minutes and preserve raw observations in a log.

```text
manual total = manual research/organizing + manual drafting + manual review
workflow total = preparation + workflow execution + human review + correction
per-run time saved = manual total - workflow total

one-time setup cost = time to build/test these prompts and a storage/handoff process
cumulative saving after N runs = sum(per-run time saved) - one-time setup cost
break-even run = first N where cumulative saving is zero or positive
```

**Setup cost:** `[NEEDS HUMAN INPUT — not recorded]`

**Per-run savings:** Not calculable until comparable time data is collected.
**Estimated break-even point:** Not calculable without setup cost and per-run measurements. The workflow can be slower for short, already-organized inputs because gathering and review still take time.

## Failure Points

1. **Tool-list hallucination:** a model may assign exact jobs to libraries merely because the libraries appear in `requirements.txt`. The Gather/Synthesize prompts forbid this.
2. **Outcome inflation:** phrases such as “improved performance” can appear where only visual review or a general project claim exists. The workflow requires an evidence type and preserves missing measurements.
3. **Role inflation:** project documentation can describe a large system while the author only owned part of it. The project input separates “my contribution” from the wider system.
4. **Stale links and screenshots:** a documented deployment can later fail or change. Humans must open links and confirm assets before publishing.
5. **False completeness:** clear prose can make a missing test, offline feature, or security detail seem finished. The final revision must preserve `[NEEDS HUMAN INPUT]` and limitations.
6. **Critique weakness:** the Critique step is the weakest step if it is asked to review only the draft. It must receive the factual brief as its comparison baseline.
7. **No-code handoff loss:** copying outputs between tools can omit source paths or edits. Keep each raw input and intermediate output in a dated folder or automation record.

## Human Review Requirements

The human owner must approve all of the following before a final case study is published:

- technical facts, code paths, tools, architecture, and the exact personal contribution;
- every metric and every outcome statement;
- screenshots, before/after evidence, run logs, and captions;
- GitHub, demo, and deployment links;
- whether limits and unfinished work are represented honestly;
- whether the final tone sounds like the author and not a generic marketing summary;
- whether a claim can be explained and defended in an interview.

The human also decides whether to remove a section with weak evidence. The workflow must not compensate for weak evidence with broader language.

## What I Would Improve

For version 2, I would add a structured input form with required source links and evidence status, so the workflow cannot start with an untraceable paragraph. I would also add a separate link checker, a screenshot manifest, and a claim ledger that maps every public sentence to a source path.

I would improve the Critique step with a simple claim table:

| Public claim | Source path / link | Evidence type | Owner verified? | Publish status |
| --- | --- | --- | --- | --- |
| Example: "4 Node tests passed" | `WORKFLOW.md` | observed test result | `[NEEDS HUMAN INPUT]` | Draft |

Finally, I would collect real time measurements for five comparable live runs. Only then can I report credible savings and a break-even point. The objective is not to eliminate human review; it is to make the repetitive organization and first-draft work faster while making verification more visible.
