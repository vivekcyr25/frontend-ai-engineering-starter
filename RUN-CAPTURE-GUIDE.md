# Run Capture Guide — FlyRank Weekly Engineering Review Agent

This guide outlines the exact ~2-minute screen recording sequence for the Checkpoint 1 / MVP demonstration.

---

## Recording Setup

- **Target Duration:** ~90–120 seconds.
- **Recording Tool:** OBS Studio, Loom, or Windows Game Bar (`Win + Alt + R`).
- **Screen Layout:** Open your terminal on one half of the screen and your code editor (`FL-01/`) on the other half.

---

## 5-Step Screen Recording Sequence

### Step 1: Open the Agent Environment (0:00 – 0:20)
- Show the project directory structure in VS Code / terminal:
  - Highlight `scripts/weekly-review-agent.mjs`.
  - Show the recent git history (`git log --oneline -n 5`).
- State the goal: *"I'm going to run the FlyRank Weekly Engineering Review Agent to audit my recent internship commits and project notes."*

### Step 2: Trigger the Agent Request (0:20 – 0:35)
- In the terminal at the root of `FL-01/`, run:
  ```bash
  node scripts/weekly-review-agent.mjs
  ```
- Point out the terminal output initializing the review engine.

### Step 3: Show Real Live Tool / Data Connection (0:35 – 0:55)
- Show the live console logs confirming real data access:
  - `✓ Collected 8 recent git commits.`
  - `✓ Collected git diff summary of changed files.`
  - `✓ Loaded context from 3 project documents.`
- Emphasize that the agent is actively inspecting real repository history, not simulated data.

### Step 4: Watch Synthesis & Security Guardrails (0:55 – 1:20)
- Observe the agent formatting the weekly engineering review in real-time.
- Highlight how it extracts:
  - Exact commit hashes (`c4d2d09`, `83aee27`) and file evidence.
  - Clear separation between completed tasks and in-progress items.
  - Architectural decisions and honest boundaries.

### Step 5: Inspect the Generated Output Artifact (1:20 – 1:50)
- In VS Code, open the newly generated `WEEKLY-REVIEW.md` file.
- Scroll through the 6 sections to demonstrate clean formatting:
  1. Completed Work (with evidence citations).
  2. Meaningful Changes.
  3. Technical Decisions & Trade-Offs.
  4. Blockers & Risks.
  5. Still in Progress.
  6. Top 3 Priorities for Next Week.
- Conclude: *"The review was generated end-to-end with real git data and zero manual editing."*

---

## Checkpoint Submission Checklist
- [x] Agent executes end-to-end with a single command.
- [x] Real read-only git log and document connectors used.
- [x] Output strictly follows the 6-part FL-06 schema.
- [x] `BUILD-LOG.md` and `SPEC-DEVIATIONS.md` completed.
- [x] Screen capture recorded and saved to submission folder.
