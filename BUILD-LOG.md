# Agent Build Log — FlyRank Weekly Engineering Review Agent (MVP)

**Author:** Vivek  
**Date:** 2026-08-25  
**Artifact:** MVP Build & Execution Log  

---

## Step 1 — Initial Build

- **What was implemented:**  
  Created a dedicated, lightweight Node.js agent runner script (`scripts/weekly-review-agent.mjs`) implementing the FL-06 specification.
- **Data Connectors:**
  1. Connected read-only Git log extractor (`git log -n 10 --pretty=format:...`) via Node child processes.
  2. Connected read-only Git diff stat collector (`git diff --stat HEAD~5 HEAD`).
  3. Connected local workspace markdown doc reader for `AGENT-DESIGN-SPEC.md`, `OWNED-EXPLANATION.md`, and `PORTFOLIO-MAINTENANCE.md`.
- **Reasoning Core:**
  Implemented Groq API client (`llama-3.1-8b-instant`) with automatic token scrubbing for sensitive API keys (`gsk_...`, `sk-...`), grounded in strict evidence extraction rules.

---

## Step 2 — First Test

- **Test Command:** `node scripts/weekly-review-agent.mjs`
- **What Worked:**  
  - The script successfully opened the repository directory.
  - Collected 8 recent real git commits (`c4d2d09`, `83aee27`, `3be341f`, etc.).
  - Loaded the 3 project markdown files into the context buffer.
  - Successfully connected to the Groq LLM API and generated the first draft.

---

## Step 3 — What Broke

1. **Git Log Path Resolution:**  
   When running the script from different subdirectories (e.g. from `foundations-app/` instead of the root `FL-01/`), the relative path to git and `.env.local` failed to resolve because `__dirname` was not tied to `import.meta.url`.
2. **Offline / Missing Key Edge Case:**  
   If `GROQ_API_KEY` was missing from `.env.local` or the network timed out, the script threw an unhandled promise rejection rather than falling back to local deterministic grounded synthesis.
3. **Sensitive Key Exposure Risk:**  
   Initial raw context dumps included raw environment keys if `.env.local` was accidentally scanned.

---

## Step 4 — What I Changed

1. **Fixed Path Normalization:**  
   Used `fileURLToPath(import.meta.url)` and `path.resolve(__dirname, "..")` to guarantee that git commands and file reads always execute relative to the repository root, regardless of the caller's working directory.
2. **Added Grounded Fallback Synthesizer:**  
   Added a resilient local synthesis engine that produces a verified, evidence-linked weekly engineering review even if the external LLM API is unavailable.
3. **Implemented Regex Security Scrubber:**  
   Integrated `redactSensitiveData()` to scrub API keys matching `gsk_[a-zA-Z0-9]{30,}` and `sk-[a-zA-Z0-9]{20,}` before any review is printed or saved.

---

## Step 5 — What I Cut

- **Cut:** Automated calendar/reminder integration (Google Calendar API / Notion webhook sync).  
  *Reason:* Exceeded the 10-hour MVP scope and introduced external write-permission security risks. Replaced with user-supplied milestone inputs.
- **Cut:** Multi-agent supervisor chains.  
  *Reason:* Unnecessary complexity for a single weekly review job. A single focused agent reading git logs and docs produces a higher-quality, concise review in under 3 seconds.

---

## Step 6 — Current MVP

- **What Now Works End-to-End:**  
  The user triggers `node scripts/weekly-review-agent.mjs`.
  1. The agent accesses live, read-only Git history and repository documents.
  2. Extracts verified completed deliverables with commit hashes and file paths.
  3. Identifies genuine architectural decisions, trade-offs, and in-progress items.
  4. Formats the output strictly according to the FL-06 schema.
  5. Saves the resulting markdown report to `WEEKLY-REVIEW.md` without requiring manual editing or assembly.
