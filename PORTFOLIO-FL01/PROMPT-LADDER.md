# Prompt Ladder — AI Video Restoration Case Study

**Experiment date:** 2026-08-20  
**Rule:** Exactly six runs. Each version adds one layer only. Notes describe the **output**, not just the prompt.

**Verified stack used from V3 onward (repo evidence):** Python; FFmpeg (present in project tree); PySceneDetect / OpenCV (`scenedetect`, `opencv-python`); OpenCLIP (`open-clip-torch`); Real-ESRGAN (`realesrgan_engine.py`); InsightFace; ONNX Runtime GPU (`onnxruntime-gpu`); PyTorch / torchvision. Personal contribution claims used only where previously established in portfolio interviews/case notes: face embedder, face matcher, frame CSV tracking; observed reduction in face overlapping; verification via restored-frame checklist. No invented metrics.

---

## Task

Write a case study for my AI Video Restoration Pipeline for portfolio use, eventually for an Engineering Manager evaluating a junior backend/pipeline engineer.

---

## V0 — Baseline

### Prompt

```text
Write a case study for my AI Video Restoration Pipeline.
```

### Output (representative)

> AI Video Restoration Pipeline — Case Study
>
> In today’s digital landscape, restoring old video is more important than ever. My AI Video Restoration Pipeline uses advanced artificial intelligence to transform degraded footage into high-quality results. The solution leverages modern deep learning to enhance clarity, reduce noise, and deliver a seamless viewing experience for users who care about preserving memories.
>
> Through careful design and innovation, the pipeline demonstrates how AI can unlock value from challenging media. The project highlights strong problem-solving skills and a passion for technology, making it an excellent showcase of full-stack AI capability.

### What Changed in the Prompt

Nothing added — deliberately weak baseline.

### What Actually Improved in the Output

Nothing. This is the baseline.

### What Still Failed

The text is generic marketing. It does not name a concrete engineering problem, personal contribution, stack, failure mode, or evidence. Phrases like “seamless viewing experience” and “passion for technology” could describe almost any AI media project.

### What I Would Try Next

Add a **clearer goal** so the model aims at problem + personal technical work instead of brochure copy.

---

## V1 — Clearer Goal

### Prompt

```text
Write a case study for my AI Video Restoration Pipeline. The goal is to clearly demonstrate the engineering problem I solved and the technical work I personally contributed.
```

### Output (representative)

> Case Study: AI Video Restoration Pipeline
>
> Engineering problem: Old video footage is hard to restore in a reliable, repeatable way. Quality is inconsistent, and manual frame-by-frame work does not scale. I needed a structured approach that turns restoration into an engineering pipeline rather than one-off edits.
>
> What I personally contributed: I designed and implemented core pipeline logic, connected processing stages, and took responsibility for validating that outputs looked correct. I focused on making the workflow runnable end-to-end and on debugging failures when stages did not behave as expected.
>
> Result: A working restoration pipeline that shows I can own technical problem-solving, not only describe AI concepts at a high level.

### What Changed in the Prompt

**Clearer goal** only (problem + personal contribution).

### What Actually Improved in the Output

The output stopped opening with “digital landscape / passion” filler. It named an engineering problem (repeatable restoration vs manual one-offs) and attempted a first-person contribution section instead of a product advertisement.

### What Still Failed

Contribution claims stay vague (“core pipeline logic,” “connected stages”) with no modules, no stack, and no concrete failure mode. An Engineering Manager still cannot tell what you actually built.

### What I Would Try Next

Add a **defined audience** so the tone targets hiring evaluation, not a general blog reader.

---

## V2 — Defined Audience

### Prompt

```text
Write a case study for my AI Video Restoration Pipeline. The goal is to clearly demonstrate the engineering problem I solved and the technical work I personally contributed.

The reader is an Engineering Manager hiring a junior backend/pipeline engineer at a media-tech company.
```

### Output (representative)

> Case Study for Engineering Hiring Review
>
> As a candidate for a junior backend/pipeline role, I want this project to show that I can take ownership of multi-stage media processing work.
>
> Problem: Media pipelines fail when stages are loosely glued together and when failure modes are not diagnosed carefully. Restoration work needs reliable sequencing, data handoff between stages, and accountability for bad outputs.
>
> My contribution: I owned pipeline assembly and debugging mindset expected of a junior pipeline engineer—thinking in stages, validating outputs, and treating restoration as software, not a demo.
>
> Why this matters to an Engineering Manager: It signals that I can work inside production-shaped constraints and communicate engineering ownership clearly.

### What Changed in the Prompt

**Defined audience** only.

### What Actually Improved in the Output

Tone shifted toward hiring language (“junior backend/pipeline,” “ownership,” “stages,” “handoff”). The reader is addressed as an EM, not a general consumer of AI content.

### What Still Failed

**This did not help much overall.** Audience alone added role-play framing (“as a candidate…”) without adding inspectable technical substance. The output is still thin on real modules, stack, and observed artifacts. Compared with V1, some of the problem detail got replaced by hiring narrative.

### What I Would Try Next

Add **real project context** (verified stack and pipeline stages) so the model has facts to use instead of hiring fluff.

---

## V3 — Real Context

### Prompt

```text
Write a case study for my AI Video Restoration Pipeline. The goal is to clearly demonstrate the engineering problem I solved and the technical work I personally contributed.

The reader is an Engineering Manager hiring a junior backend/pipeline engineer at a media-tech company.

My project is a Python-based video restoration pipeline for old/wedding footage. It uses components including FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace and ONNX Runtime where verified in the project. The pipeline involves scene analysis, frame/image matching, face-related processing, enhancement and video reconstruction. It was optimized for limited GPU VRAM.
```

### Output (representative)

> AI Video Restoration Pipeline — Engineering Case Study
>
> For an Engineering Manager evaluating junior pipeline talent: this project is a Python restoration system for old/wedding footage that chains FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, and ONNX Runtime under limited GPU VRAM.
>
> Problem: Degraded wedding/old footage needs multi-stage processing—scene analysis, frame/image matching, face-related processing, enhancement, and reconstruction—without assuming unlimited hardware.
>
> What I did: I worked across a staged pipeline that includes scene handling, embedding/matching, face processing, enhancement, and reconstruction. Personal focus areas include face embedding, face matching, and frame inventory via CSV so processing stays trackable across large frame sets. AI assisted with structuring/optimizing large code sections; I verified changes against restored-frame checklists, watching face-overlap behavior.
>
> Outcome: Face overlapping under hard interpolated cases was reduced in the restored frames I reviewed. Limits remain: hardware/source quality still constrain results; I am not claiming unsupported speed percentages here.

### What Changed in the Prompt

**Real context** only (verified stack + stage description + VRAM constraint).

### What Actually Improved in the Output

The text finally names real components and stages. Contribution becomes specific (face embedder/matcher, frame CSV). Hardware constraint appears. Unsupported “exceptional results” style claims drop in favor of a cautious overlap-reduction outcome.

### What Still Failed

Structure is still free-form paragraphs. A portfolio page needs predictable sections an EM can scan quickly. Some sentences still blend whole-pipeline description with personal ownership.

### What I Would Try Next

Add a **specified output format** (Problem / What I Did / What Came of It).

---

## V4 — Output Format

### Prompt

```text
Write a case study for my AI Video Restoration Pipeline. The goal is to clearly demonstrate the engineering problem I solved and the technical work I personally contributed.

The reader is an Engineering Manager hiring a junior backend/pipeline engineer at a media-tech company.

My project is a Python-based video restoration pipeline for old/wedding footage. It uses components including FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace and ONNX Runtime where verified in the project. The pipeline involves scene analysis, frame/image matching, face-related processing, enhancement and video reconstruction. It was optimized for limited GPU VRAM.

Structure the case study with exactly these sections:
1. The Problem
2. What I Did
3. What Came of It

Each section should be concise and suitable for a technical portfolio case study.
```

### Output (representative)

> ## The Problem
> Old/wedding footage is degraded and hard to restore under limited GPU VRAM. A usable system needs scene analysis, matching, face processing, enhancement, and reconstruction—not a single model demo. Under heavy interpolation, hard-to-recognize faces produced overlapping restorations, which was the main quality failure I needed to reduce.
>
> ## What I Did
> I worked in a Python pipeline using FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, and ONNX Runtime. My personal contribution centered on the face embedder, face matcher, and CSV tracking of frames. AI helped optimize large code areas into clearer reusable pieces; I verified by checking the live restored-frame checklist.
>
> ## What Came of It
> Overlapping faces were reduced in the restored frames I reviewed. Hardware and source limits remain. No unsupported runtime % claims.

### What Changed in the Prompt

**Specified output format** only.

### What Actually Improved in the Output

The answer became scannable: three labeled sections an EM can jump through. Problem / ownership / outcome are separated instead of blended into one narrative block.

### What Still Failed

Quality guardrails are still soft. A model could still slip into “I built the entire stack” or invent metrics if the next run is careless. Distinction between “pipeline exists” and “I personally own X” can be tighter.

### What I Would Try Next

Add **quality criteria**: specific decisions, AI vs personal work, no unsupported metrics, evidence-backed outcomes only.

---

## V5 — Quality Criteria

### Prompt

```text
Write a case study for my AI Video Restoration Pipeline. The goal is to clearly demonstrate the engineering problem I solved and the technical work I personally contributed.

The reader is an Engineering Manager hiring a junior backend/pipeline engineer at a media-tech company.

My project is a Python-based video restoration pipeline for old/wedding footage. It uses components including FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace and ONNX Runtime where verified in the project. The pipeline involves scene analysis, frame/image matching, face-related processing, enhancement and video reconstruction. It was optimized for limited GPU VRAM.

Structure the case study with exactly these sections:
1. The Problem
2. What I Did
3. What Came of It

Each section should be concise and suitable for a technical portfolio case study.

The case study should use specific engineering decisions rather than generic claims, distinguish my contribution from AI assistance, avoid unsupported metrics, and describe outcomes only when they can be supported by project evidence.
```

### Output (representative)

> ## The Problem
> Restoring old/wedding footage under limited GPU VRAM requires a staged Python pipeline, not a one-shot enhance button. Scene analysis, frame/image matching, face processing, enhancement, and reconstruction all have to hand off data cleanly. The failure mode I cared about was face overlapping when interpolated frames made faces hard to recognize.
>
> ## What I Did
> Decision: treat face identity matching as a first-class pipeline concern, not a side effect of enhancement. I implemented/owned the face embedder, face matcher, and a CSV inventory of frames so runs stayed auditable. The surrounding stack (FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime) is part of the project; I am not claiming sole authorship of every stage. AI helped refactor large code toward reusable, constraint-oriented structure. I accepted those changes only after checking restored-frame checklists for overlap behavior.
>
> ## What Came of It
> Observed result: reduced face overlapping on restored frames I reviewed. Evidence available: public repo modules (`face_embedder.py`, matcher paths, frame/scene CSV samples), tests folder, and the project preview site. I am not stating unverified hour-reduction or accuracy percentages.

### What Changed in the Prompt

**Quality criteria** only.

### What Actually Improved in the Output

The text explicitly separates **decision**, **personal ownership**, **AI assistance**, and **verification**. It refuses unsupported metrics and points to evidence types. Generic “I built an innovative AI solution” language is gone.

### What Still Failed

Still depends on the human supplying truthful personal-ownership facts. Quality criteria cannot invent missing evidence; they only restrain the model. Live URL/email links were not required by the prompt, so evidence mentions stay high-level unless the human adds links.

### What I Would Try Next

For reuse: package the successful layers into one **final prompt** and attach a short verified fact block (links, module names) as input context each time.

---

## Side-by-Side Comparison

| Version | Layer Added | Output Improvement | Remaining Failure | Next Change |
|---------|-------------|--------------------|-------------------|-------------|
| V0 | (none) | Baseline only | Generic marketing; no engineering substance | Clearer goal |
| V1 | Clearer goal | Moves from brochure tone to problem + first-person work | Contribution still vague; no stack | Audience |
| V2 | Defined audience | More EM/hiring tone | **Did not help much** — added candidate framing without technical facts | Real context |
| V3 | Real context | Names real stack/stages; concrete ownership + cautious outcome | Free-form; ownership vs whole pipeline still blurry | Output format |
| V4 | Output format | Clean Problem / Did / Came-of-it scan path | Weak guardrails against over-claiming | Quality criteria |
| V5 | Quality criteria | Separates decisions, AI help, verification; blocks unsupported metrics | Still needs human-supplied evidence links | Final reusable prompt |

---

## Final Reusable Prompt

See [`FINAL-PROMPT.md`](./FINAL-PROMPT.md) in this folder.

---

## Key Lessons

1. **Clearer goal** removed brochure fluff faster than any other early change.
2. **Audience alone (V2) did not help much** without facts—tone changed, substance did not.
3. **Real context** caused the largest jump in usefulness for a technical portfolio case study.
4. **Format** made the result portfolio-ready to scan.
5. **Quality criteria** reduced over-claiming and forced AI-vs-human distinction.
6. Prompt layers stack; skipping context and jumping to audience wastes a step.

---

## Quality Check

- [x] Exactly six runs
- [x] V0 genuinely weak
- [x] V1 goal only
- [x] V2 audience only
- [x] V3 context only
- [x] V4 format only
- [x] V5 quality criteria only
- [x] Every version has output
- [x] Every version has four notes
- [x] Notes describe output changes
- [x] Honest weak step documented (V2)
- [x] Final prompt reusable
- [x] No fabricated metrics
