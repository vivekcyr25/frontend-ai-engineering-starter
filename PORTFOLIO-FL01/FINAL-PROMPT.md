# Final Reusable Prompt — Video Restoration Case Study

Use this after the prompt-ladder experiment. It combines the layers that actually improved output: clearer goal, audience, real context, fixed format, and quality criteria.

Give the model your verified facts in the placeholders. Do not leave placeholders filled with guesses.

---

## Prompt (copy/paste)

```text
Write a portfolio case study for my AI Video Restoration Pipeline.

GOAL
Clearly demonstrate the engineering problem I solved and the technical work I personally contributed.

AUDIENCE
An Engineering Manager hiring a junior backend/pipeline engineer at a media-tech company.

VERIFIED PROJECT CONTEXT
- Domain: Python-based video restoration for old/wedding footage
- Verified components (include only if present in the repo): FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, PyTorch
- Pipeline concerns: scene analysis, frame/image matching, face-related processing, enhancement, video reconstruction
- Constraint: optimized for limited GPU VRAM
- My personal contribution (edit to match reality): face embedder, face matcher, CSV tracking of frames
- Observed outcome I can defend (edit to match reality): reduced face overlapping on restored frames I reviewed
- How I verified AI-assisted refactors (edit to match reality): checked live restored-frame checklists
- Evidence links (optional but preferred): GitHub repo URL, preview/demo URL, key file paths

OUTPUT FORMAT (exact section titles)
1. The Problem
2. What I Did
3. What Came of It

Keep each section concise and technical-portfolio appropriate.

QUALITY CRITERIA
- Prefer specific engineering decisions over generic claims
- Distinguish my contribution from AI assistance
- Do not invent technologies, metrics, users, features, or performance improvements
- Describe outcomes only when supported by the verified context above
- If something is unknown, omit it rather than guessing
```

---

## How another developer should use this

1. Replace the personal-contribution / outcome / verification lines with their own verified facts.
2. Delete any technology not present in their repository.
3. Paste the prompt into the model once.
4. Review the draft against the repo before publishing.

## Why this prompt exists

From the ladder experiment:

- Goal removed marketing fluff (V1)
- Audience alone without facts did little (V2)
- Context produced the biggest substance jump (V3)
- Format made the draft scannable (V4)
- Quality criteria reduced over-claiming (V5)
