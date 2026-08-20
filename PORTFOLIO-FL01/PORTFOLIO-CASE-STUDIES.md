-# Portfolio Case Studies

**Audience:** Engineering Manager hiring a junior backend/pipeline engineer at a media-tech company.  
**Proof statement:** I build and optimize Python-based multimedia processing pipelines that solve real processing bottlenecks and eliminate visual artifacts such as frame overlap and distortion.  
**Primary action:** Review my technical case studies.

---

## Voice Card

**Direct, technical, practical, honest, concise, no-buzzwords.**

---

## Case Study 1 — AI Video Restoration Pipeline

### The Problem

I needed to restore old and heavily distorted video assets—especially wedding footage—while working inside real hardware limits and imperfect source material. The work was not “run one model and ship.” It required face recognition, data handling across many frames, pixel interpolation, and keeping the restored output aligned with the original frame structure.

Under heavy recursive interpolation, faces became harder to recognize. The failure mode that mattered most was **face overlapping**: wrong or stacked face restorations on frames. That artifact broke trust in the output even when other stages looked improved.

### What I Did

I personally worked on the **face embedder**, the **face matcher**, and a **CSV dataset tracking frames** across the run so the pipeline had an explicit inventory of what it was processing. In the repository this lines up with modules such as `face_embedder.py`, matcher utilities/scripts (`hybrid_matcher.py`, matcher tests), and scene/frame CSV artifacts.

The wider pipeline (verified from the project layout and `requirements.txt`) chains scene handling (PySceneDetect/OpenCV), OpenCLIP embeddings, InsightFace with ONNX Runtime GPU, PyTorch/torchvision stages, a Real-ESRGAN engine module, reference selection, and video propagation—orchestrated through stage scripts and `run_pipeline.py`. I do not claim every README performance number as a personal lab measurement here; I claim ownership of the face-embedding / matching / frame-CSV path and the overlap problem it targets.

AI helped me push large sections of code toward clearer constraints and more reusable, optimization-oriented structure. I did not treat that as automatic success: I verified changes against the **live checklist of restored frames** produced by the optimized runs, watching whether overlapping improved.

### What Came of It

The face embedder + matcher work **reduced overlapping** on the restored frames I reviewed. The pipeline remains constrained by hardware and source quality; hard cases can still be difficult. The honest outcome is fewer overlap failures in the restored-frame checklist—not a claim of perfect restoration on every clip.

#### Evidence

- GitHub: [AI-Video-Restoration-Pipeline](https://github.com/vivekcyr25/AI-Video-Restoration-Pipeline)
- Code paths: `pipeline/face_embedder.py`, matcher scripts/utils, frame/scene CSV samples, `tests/`
- Preview/demo site: [vivekcyr25.github.io/AI-Video-Restoration-Pipeline](https://vivekcyr25.github.io/AI-Video-Restoration-Pipeline/)
- Preview assets under `preview/public/assets/` (degraded frame samples)
- Dependency list in `requirements.txt` (OpenCLIP, InsightFace, onnxruntime-gpu, PyTorch, scenedetect, OpenCV, pytest)

#### Limitations

- Consumer hardware and degraded sources still limit quality and runtime.
- Overlap is reduced, not claimed eliminated on every interpolated hard case.
- README speed/quality claims (for example long-run hour reductions) are project documentation; use only if you can personally reproduce them for a hiring conversation.

---

## Case Study 2 — AIPS (Academic Intelligence System)

### The Problem

AIPS targets academic workflow software. The gap I was solving toward was **no solid offline access yet**—students still need a system that works when the network is unreliable. I am not claiming offline is finished.

Online, the need was a usable academic product: clear UI, coherent architecture, and an AI assistant that does not dump secrets into the browser.

### What I Did

I owned the **UI/UX core idea**, the **architecture direction**, and the **AI assistant integration using Groq with an API key kept on the backend—not the frontend**.

Verified from the AIPS repository: React + Vite frontend, Firebase persistence/auth patterns, Vercel serverless `/api` handlers (including AI chat/stream and verification), and architecture docs describing a proxied AI path. I describe only what I personally claim here: product/architecture ownership and backend-keyed Groq assistant wiring—not every badge or “production-ready” marketing line in the README.

### What Came of It

The system **works live online**. Offline access remains incomplete. Someone can use the deployed app; they should not expect full offline-first behavior yet.

#### Evidence

- GitHub: [APIS-Academic-Intelligence-System](https://github.com/vivekcyr25/APIS-Academic-Intelligence-System)
- Live deploy (repo homepage): [apis-academic-intelligence-system.vercel.app](https://apis-academic-intelligence-system.vercel.app)
- Architecture docs: `ARCHITECTURE.md` (proxy/AI request flow)
- Stack signals in repo: TypeScript/React/Vite, Firebase, Vercel `api/`

#### Limitations

- Offline access is not ready.
- Do not over-claim “ambient intelligence” or SRE telemetry unless you can walk through those modules in an interview.

---

## Case Study 3 — AI-Assisted Engineering Workflow (Internship Process)

### The Problem

AI-assisted coding was producing **messy code**. Vague asks led to outputs that did not match what I actually wanted, which increased cleanup cost and weakened trust in the result.

### What I Did

I changed the process: **better, more precise project prompts** so the model could understand constraints, structure, and intent instead of guessing from a one-liner.

In this repository, that approach is demonstrated by the contact-form experiment documented in `WORKFLOW.md`: Round 1 used a vague prompt on branch `ai-vague`; Round 2 used a written specification (files, accessibility rules, edge cases, verification) on `ai-precise`. I reviewed the outputs myself and recorded concrete gaps (for example missing labels, whitespace-only acceptance) rather than accepting AI code blindly.

Related internship artifacts also include the FL-01 workflow audit and portfolio planning docs under `FL-01/` and `PORTFOLIO-FL01/`, which classify when AI may assist versus when I must verify.

### What Came of It

The main improvement I noticed was better **exposure**—clearer presentation of intent and of the engineering work (specs, diffs, review notes) so the result is easier to evaluate. The precise-prompt round produced stronger structure (labels, validation module, tests) than the vague round, as recorded in `WORKFLOW.md` and the branch diff.

#### Evidence

- `WORKFLOW.md` (vague vs precise comparison)
- Branches `ai-vague` / `ai-precise` (contact form implementations)
- `experiment/round1-vague-prompt.md`, `experiment/round2-precise-spec.md`
- `FL-01/FL-01-Workflow-Audit.md`
- `PORTFOLIO-FL01/` planning package

#### Limitations

- Process improvement is not a substitute for deep domain delivery; the Video Pipeline remains the primary proof for a media-pipeline hire.
- Exact review time was not measured.

---

## Bio

I am Vivek, a B.Tech CSE student building toward software and AI engineering roles with a practical bias: ship working systems, then harden them. My strongest work is Python multimedia pipeline engineering—especially restoring degraded video under hardware and source limits—alongside full-stack academic tooling (AIPS) and a disciplined AI-assisted development process. I use AI to move faster on large codebases, then verify with frame checks, tests, and live behavior. I write and present work directly, without buzzwords.

*(Word count: ~85)*

---

## Contact / CTA

**Primary CTA:** Review my technical case studies.

Supporting line: Have a problem that needs a practical software or AI solution? Let's talk.

**Channels (fill your preferred email before publishing):**

- GitHub: [github.com/vivekcyr25](https://github.com/vivekcyr25)
- LinkedIn: *(add your profile URL)*
- Email: *(add your address)*

Do not compete with the primary action. Contact is secondary.

---

## Before / After AI Copy

### Before — Generic AI Copy

"I leveraged cutting-edge AI technologies to develop an innovative video restoration solution that delivers exceptional results."

### After — My Edited Version

"I built a Python video-restoration pipeline that combines scene detection, image matching, face processing, and AI super-resolution to improve old wedding footage. I personally worked on the face embedder, face matcher, and frame CSV tracking to reduce face overlapping under heavy interpolation."

### Why the edit is stronger

- **Removed:** “leveraged,” “cutting-edge,” “innovative,” “exceptional results” — empty praise with no inspectable claim.
- **Made specific:** names the pipeline domain, wedding/old footage context, and the modules I own.
- **Evidence that makes it credible:** public repo modules (`face_embedder.py`, matcher path, CSV/frame artifacts), preview site, and my verification via restored-frame checklist—not a slogan.
