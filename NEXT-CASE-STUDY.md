# How to Add the Next Case Study

Use this document whenever you finish a new project and want to add it to the portfolio.
Do not redesign or rebuild the portfolio. Do not create a new page type unless the existing
case-study structure genuinely cannot support the new case.

---

## The Three-Beat Structure

Every case study in this portfolio uses exactly three beats. No exceptions.

| Beat | Question it answers |
| :--- | :--- |
| **THE PROBLEM** | What was the real problem, and why did it matter? |
| **WHAT I DID** | What was my specific contribution, implementation, and trade-off? |
| **WHAT CAME OF IT** | What is the verified outcome and what are the honest limits? |

---

## STEP 1 — Choose the Case

Before writing a single word, answer both questions:

**1. Does this project support my portfolio claim?**

The current one-line claim is:

> "I build and optimize Python-based multimedia processing pipelines that solve real data
> bottlenecks and eliminate visual artifacts like frame overlap and distortion."

The new case must either reinforce this claim directly (preferred) or extend it with a
documented, adjacent engineering skill such as AI-assisted pipeline engineering, systems
architecture, or applied AI tooling. Do not add a case that dilutes the claim into a
generic skill list.

**2. Do I have real evidence?**

If the answer to any of the following is "no", stop and gather evidence before drafting.

- A working or completed project (not a planned project).
- At least one real output: code, screenshot, diagram, log, or verified metric.
- Honest knowledge of what I personally built vs. what a library or AI tool produced.
- A clear statement of what the project cannot yet do.

---

## STEP 2 — Gather Proof

Collect all of the following before drafting. Mark anything missing as
`[TO BE COLLECTED WHEN COMPLETE]`.

### Repository and Deployment

- [ ] GitHub repository URL (confirm it is public or accessible to reviewers)
- [ ] Live demo / deployment URL (only include if verifiably live and stable)

### Visual Evidence

- [ ] Screenshots of the finished project or relevant workflow state
- [ ] Before / after evidence where the problem is visual or measurable
- [ ] Architecture or technical diagram where it improves understanding of the flow

### Technical Record

- [ ] Stack: exact tools, libraries, frameworks, models, and APIs actually used
- [ ] Implementation path: key files, modules, or scripts I personally wrote or modified
- [ ] Engineering decisions: why I chose one approach over an alternative
- [ ] Debugging record: what broke, what I diagnosed, how I resolved it
- [ ] AI-assisted steps: which steps used AI assistance and what my verification role was

### Metrics and Results

- [ ] Verified outcomes with baseline and measurement method where possible
- [ ] Limitations: what the project cannot yet do, hardware or scope constraints

**Rule:** Do not substitute a generated image, a library demo, or an aspirational claim
for real evidence. Keep the source file, URL, or command that supports every publishable claim.

---

## STEP 3 — Draft the Case

Write in the established portfolio voice:
**Direct, technical, practical, honest, concise. No buzzwords.**

### THE PROBLEM

Explain the actual problem, its context, and why it mattered to solve it.

- Name the specific technical pain point, not the general topic area.
- State what failed or was missing before the project existed.
- Do not describe a future goal as a problem already solved.

**Example from existing case:**
> "When applying AI super-resolution and facial enhancement models to older video footage,
> standard frame interpolation algorithms lack scene-cut awareness. When a camera angle
> cuts between subjects, the enhancement model blends features from the outgoing frame
> into the incoming frame, producing severe temporal distortion (the 'crayon effect')."

### WHAT I DID

State the personal contribution first, then explain implementation and decisions.

- Name exactly what you built, wrote, or configured.
- Explain the technical decision: why this approach over the alternative.
- Describe any debugging: what went wrong and how you diagnosed it.
- Note AI-assisted steps clearly and state what you personally verified.
- Use only tools and technologies you actually used.

**Example from existing case:**
> "Vivek implemented cosine similarity tracking on 512-dim InsightFace vectors, explicitly
> resetting the feature buffer whenever PySceneDetect flags a shot transition."

### WHAT CAME OF IT

State only verified outcomes and point to evidence.

- Describe the result in terms of what changed, not in terms of a percentage invented post-hoc.
- Point to a real artifact: screenshot, log, frame pair, commit, test output.
- Include remaining limitations — do not hide them.
- If the work is ongoing, write `[TO BE COLLECTED WHEN COMPLETE]` instead of guessing.

**Example from existing case:**
> "Eliminated multi-face overlap ('crayon effect') on reviewed footage across hard scene cuts.
> Before/after frame pairs demonstrate clean edge isolation and natural facial detail
> restoration."

---

## STEP 4 — Add the Case to the Portfolio

### Exact Page and Route

**Page:** `/work` (Work / Case Studies index)

**Deep-dive route:** `/work/[id]` using the dynamic Next.js route already in place at
`foundations-app/src/app/work/[id]/page.tsx`

For the FlyRank AI internship case the slug will be: `flyrank-internship`

Full route: `/work/flyrank-internship`

### Exact Order

Current `cases` array order in `foundations-app/src/app/work/page.tsx`:

| Position | Slug | Title | Rank |
| :--- | :--- | :--- | :--- |
| 1 | `video-restoration` | AI Video Restoration Pipeline | Flagship |
| 2 | `aips` | AIPS — Academic Intelligence System | Secondary |
| 3 | `ai-workflow` | AI-Assisted Engineering Workflow | Supporting |
| **4 (next)** | **`flyrank-internship`** | **FlyRank AI Internship — Capstone** | Secondary or Supporting |

Add the new entry at position 4 in the `cases` array in `work/page.tsx` and add the
corresponding entry to the `caseStudies` record in `work/[id]/page.tsx`.

**Important:** Do not change positions 1 through 3. The AI Video Restoration Pipeline
must remain the flagship at position 1.

### Component / Template to Reuse

Reuse the existing `caseStudies` record pattern in `work/[id]/page.tsx`:

```ts
"flyrank-internship": {
  title: "FlyRank AI Internship — AI-Assisted Engineering",
  sections: [
    {
      heading: "The Problem",
      body: "Real content — write after evidence is gathered.",
    },
    {
      heading: "What I Did",
      body: "Real content — write after evidence is gathered.",
    },
    {
      heading: "What Came of It",
      body: "Real content — write after evidence is gathered.",
    },
  ],
},
```

Add the `cases` list entry in `work/page.tsx`:

```ts
{
  href: "/work/flyrank-internship",
  title: "FlyRank AI Internship — AI-Assisted Engineering",
  blurb: "Real one-sentence summary — write after the case is drafted.",
},
```

### Where Supporting Evidence Appears

Store all case evidence files in:

```
PORTFOLIO-FL01/evidence/flyrank-internship/
  architecture-diagram.svg    <- pipeline or system architecture
  screenshot-01.png           <- key application or workflow screenshot
  terminal-run.png            <- CLI / test output evidence
  before-after.png            <- only if a before/after comparison exists
```

Reference these assets from the case-study component once the page is built beyond
the placeholder shell.

### CTA

**Primary CTA on case deep-dive page:**
`[ Inspect GitHub Repository ]` — links to the verified capstone GitHub repository URL

**Secondary / navigation CTA:**
`Back to Work` (the existing Back to Work link already renders in the `[id]` template)

**On the `/work` index, the entry links to:**
`/work/flyrank-internship`

---

## STEP 5 — Review Before Publishing

Confirm each point:

- [ ] Every technical claim is true and explainable without looking at a Wikipedia page.
- [ ] No metric was fabricated or copied from an unverified source.
- [ ] No technology was added merely because it sounds relevant.
- [ ] My personal contribution is clear and distinct from what a library or AI produced.
- [ ] The case voice matches the voice card: direct, technical, practical, honest, concise.
- [ ] Images are real project evidence, not stock art or generated decoration.
- [ ] Limitations are visible, not buried or omitted.
- [ ] GitHub link opens to a real, accessible repository.
- [ ] Demo link (if any) loads successfully.
- [ ] The new case slug resolves correctly at `/work/flyrank-internship`.
- [ ] Fonts, colors, spacing, card styles, CTA style, and image treatment match the existing three cases.
- [ ] The page renders correctly at mobile and desktop widths.
- [ ] All images have descriptive alt text that states what the image proves.
- [ ] The new entry appears at position 4 in the `/work` index and does not displace the flagship at position 1.

---

## STEP 6 — Publish

1. Run `npm run dev` inside `foundations-app/` and review the page locally at
   `http://localhost:3000/work/flyrank-internship`.
2. Check mobile layout using browser DevTools at 375px width.
3. Run `npm run build` and resolve any TypeScript or lint errors before committing.
4. Commit only the case study, assets, and supporting documentation changes:
   ```
   feat(work): add FlyRank AI internship capstone case study
   ```
5. Deploy via the existing portfolio deployment process.
6. Open the live page and recheck responsive layout, evidence, links, and CTA targets.
7. Check that the `/work` index now shows four entries with correct ordering.

---

## Next Intended Case: FlyRank AI Internship

**Name:** FlyRank AI Internship — AI-Assisted Engineering / Capstone Work
**Status:** Ongoing. Not yet complete. No outcome, metric, or result may be claimed now.

### THE PROBLEM

[TO BE COLLECTED WHEN COMPLETE] — Describe the specific engineering problem assigned
during the FlyRank AI internship capstone. State what was broken, missing, or
inefficient before the capstone work began, and why solving it mattered in the
context of the company or product.

### WHAT I DID

[TO BE COLLECTED WHEN COMPLETE] — Describe the specific engineering contribution:
which components were built or modified, which tools and models were used, which
technical decisions were made and why, which AI-assisted steps were taken and what
manual verification was applied.

### WHAT CAME OF IT

[TO BE COLLECTED WHEN COMPLETE] — Describe only what can be verified: the working
artifact, the test output, the before/after comparison, or the documented improvement.
State what is still incomplete or out of scope.

### Evidence to Collect When the Internship Capstone Is Complete

| Evidence Item | Status |
| :--- | :--- |
| Final capstone application (working, reviewable) | [TO BE COLLECTED WHEN COMPLETE] |
| GitHub repository URL (public or accessible) | [TO BE COLLECTED WHEN COMPLETE] |
| Live deployment URL (if applicable) | [TO BE COLLECTED WHEN COMPLETE] |
| Key implementation screenshots | [TO BE COLLECTED WHEN COMPLETE] |
| Architecture / technical diagram | [TO BE COLLECTED WHEN COMPLETE] |
| Key engineering decisions documented | [TO BE COLLECTED WHEN COMPLETE] |
| AI-assisted workflow evidence (prompts, iterations, verifications) | [TO BE COLLECTED WHEN COMPLETE] |
| Verification / testing evidence (test logs, coverage, audit) | [TO BE COLLECTED WHEN COMPLETE] |
| Final outcome statement (what changed, what improved) | [TO BE COLLECTED WHEN COMPLETE] |
| Limitations and honest scope boundaries | [TO BE COLLECTED WHEN COMPLETE] |

---

## Portfolio Mapping for the Next Case

| Attribute | Value |
| :--- | :--- |
| **Page** | `/work` (Work / Case Studies) |
| **Route** | `/work/flyrank-internship` |
| **Position in index** | 4th, after `ai-workflow` |
| **Featured or secondary** | Secondary or Supporting — not flagship |
| **Template to reuse** | `caseStudies` record in `work/[id]/page.tsx` |
| **Index list entry** | Add to `cases` array in `work/page.tsx` |
| **Primary CTA** | `Inspect GitHub Repository` |
| **Secondary CTA** | `Back to Work` (existing link in the template) |
| **Evidence storage** | `PORTFOLIO-FL01/evidence/flyrank-internship/` |

The flagship AI Video Restoration Pipeline remains at position 1 and is not displaced.
