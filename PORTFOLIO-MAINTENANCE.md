# Portfolio Maintenance

---

## Next Case Location

The next case study will be added to the existing Work / Case Studies page.

| Attribute | Value |
| :--- | :--- |
| **Page** | `/work` — Work / Case Studies index |
| **Deep-dive route** | `/work/flyrank-internship` |
| **Position in index** | 4th entry, after `ai-workflow` |
| **Featured or secondary** | Secondary or Supporting — not flagship |
| **Template / component** | `caseStudies` record in `foundations-app/src/app/work/[id]/page.tsx` |
| **Index entry** | Add to `cases` array in `foundations-app/src/app/work/page.tsx` |
| **Primary CTA** | `Inspect GitHub Repository` |
| **Evidence storage** | `PORTFOLIO-FL01/evidence/flyrank-internship/` |

The flagship AI Video Restoration Pipeline stays at position 1 on the Work index.
The existing dynamic route `work/[id]/page.tsx` supports this case without any new page type.

---

## How to Add the Next Case

Full repeatable process: **[NEXT-CASE-STUDY.md](NEXT-CASE-STUDY.md)**

Summary of the six steps:

1. **Choose the case** — Confirm it supports the portfolio claim and that real evidence exists.
2. **Gather proof** — Collect repository, deployment URL, screenshots, architecture diagram,
   technical decisions, AI-assisted workflow evidence, verified metrics, and limitations.
3. **Draft the case** — Write the three-beat structure using only verified information.
4. **Add the case to the portfolio** — Add slug to `work/page.tsx` and entry to
   `work/[id]/page.tsx`; store evidence in `PORTFOLIO-FL01/evidence/flyrank-internship/`.
5. **Review** — Check every claim, every link, every image, and the responsive layout.
6. **Publish** — Run build, commit with Conventional Commits message, deploy, verify live.

---

## Three-Beat Case Structure

Every case study in this portfolio uses exactly three beats.

### THE PROBLEM
Explain the real problem and why it mattered. Name the specific technical failure or gap.
Do not describe a future goal as a problem already solved.

### WHAT I DID
State the personal contribution first. Then explain implementation, technical decisions,
trade-offs, AI-assisted steps, and the verification actions taken. Use only real tools.

### WHAT CAME OF IT
State only verified outcomes and point to real evidence. Include limitations honestly.
If work is ongoing, use `[TO BE COLLECTED WHEN COMPLETE]` — never guess at a result.

---

## Next Real Piece of Work

**FlyRank AI Internship — AI-Assisted Engineering / Capstone Work**

This is ongoing work. It is not yet complete. No outcome, metric, screenshot, or result
may be added to the portfolio until the work is genuinely finished and evidence is collected.

### THE PROBLEM

[TO BE COLLECTED WHEN COMPLETE]

### WHAT I DID

[TO BE COLLECTED WHEN COMPLETE]

### WHAT CAME OF IT

[TO BE COLLECTED WHEN COMPLETE]

---

## Evidence to Gather

Collect all of the following before drafting the case. Do not publish without them.

| Evidence Item | Status |
| :--- | :--- |
| Final capstone application (working, reviewable) | [TO BE COLLECTED WHEN COMPLETE] |
| GitHub repository URL (public or accessible) | [TO BE COLLECTED WHEN COMPLETE] |
| Live deployment URL (if applicable) | [TO BE COLLECTED WHEN COMPLETE] |
| Key implementation screenshots | [TO BE COLLECTED WHEN COMPLETE] |
| Architecture / technical diagram | [TO BE COLLECTED WHEN COMPLETE] |
| Key engineering decisions documented | [TO BE COLLECTED WHEN COMPLETE] |
| AI-assisted workflow evidence (prompts, iterations, verifications) | [TO BE COLLECTED WHEN COMPLETE] |
| Verification / testing evidence (test logs, coverage, audit output) | [TO BE COLLECTED WHEN COMPLETE] |
| Final outcome statement (what changed, what improved) | [TO BE COLLECTED WHEN COMPLETE] |
| Limitations and honest scope boundaries | [TO BE COLLECTED WHEN COMPLETE] |

---

## Claude Project Continuity

Full context document: **[CLAUDE-CONTINUITY.md](CLAUDE-CONTINUITY.md)**

The Claude Project for this portfolio already holds the proof statement, audience
definition, primary CTA, voice card, visual identity rules, content map, three-beat
case-study structure, portfolio constraints, and evidence standards.

For a new case:

1. Start a new conversation inside the existing Claude Project.
2. Provide only the new project's real source material: notes, code paths, logs,
   screenshots, verified links, measured results, decisions, and known limitations.
3. Ask Claude to follow the three-beat format: THE PROBLEM, WHAT I DID, WHAT CAME OF IT.
4. Require `[TO BE COLLECTED WHEN COMPLETE]` for every unknown future result,
   screenshot, metric, or link.
5. Review the draft against the real repository and evidence before placing it in
   the portfolio.

Claude drafts and critiques. The developer retains 100% responsibility for technical
facts, personal contribution, metrics, screenshots, links, limitations, and the final
publishing decision.

**Important:** It has not been independently verified that the Claude Project is currently
preserved or still active. Verify its status before relying on existing project context.
If the project no longer exists, recreate the custom instructions from
`PORTFOLIO-FL01/claude-project-instructions.md` and paste the content of
`CLAUDE-CONTINUITY.md` as the starting context.

---

## Reminder

Full reminder setup document: **[REMINDER-SETUP.md](REMINDER-SETUP.md)**

**Reminder title:** Add FlyRank AI internship capstone case study

**Suggested timing:** Two days after the internship / capstone work is actually complete.

**Purpose:** Give time to export final screenshots, collect the repository URL, document
engineering decisions while they are fresh, and draft the case from finished evidence.

**The reminder has not been created.** Create it manually in your preferred calendar
or task tool (Google Calendar, Notion, Linear, Todoist, or a GitHub Issue in this
repository). Do not mark it as done until the case is live and verified.

---

## Final Checklist

- [ ] Next case location identified
- [ ] Reusable add-case process documented (`NEXT-CASE-STUDY.md`)
- [ ] Three-beat structure included
- [ ] Next real piece named (FlyRank AI Internship)
- [ ] Evidence list created
- [ ] Claude Project continuity documented (`CLAUDE-CONTINUITY.md`)
- [ ] Reminder details prepared (`REMINDER-SETUP.md`)
- [ ] Actual reminder set manually in calendar or task tool
- [ ] Screenshot of reminder captured (once set manually)
- [ ] Future case only added after work is genuinely complete
