# Portfolio Technical Case Studies

**Author:** Vivek  
**Target Role:** Junior Backend / Pipeline / Applied AI Engineer  
**Source of Truth:** Repository Project Artifacts (`PORTFOLIO-FL01/`, `FL-01/`, `foundations-app/`, `PROMPT-ITERATION-LOG.md`)  

---

## Case Study 1: AI Video Restoration Pipeline

### 1. Executive Summary
- **Domain:** Computer Vision, Automated Multimedia Processing, Deep Learning Pipeline Engineering.
- **Core Stack:** Python, PyTorch, InsightFace, Real-ESRGAN, FFmpeg, PySceneDetect, ONNX Runtime.
- **Core Contribution:** Engineered a sequential multi-model restoration pipeline and designed custom frame-matching tracking logic to eliminate multi-face distortion ("crayon effect") across scene transitions.

---

### 2. The Engineering Problem
When applying AI super-resolution and facial enhancement models to older wedding and event video footage, standard frame interpolation algorithms lack scene-cut awareness. When a camera angle cuts between subjects, standard enhancement models blend features from the outgoing frame into the incoming frame. This produces severe temporal distortion (the "crayon effect"), where facial features blur and superimpose unnaturally.

---

### 3. Pipeline Architecture & Data Flow

```text
[ Raw Input Video ]
        │
        ▼
1. SCENE DETECTION (PySceneDetect)
   └── Detects hard cuts & transition timestamps; outputs frame cut indices.
        │
        ▼
2. FRAME EXTRACTION (FFmpeg)
   └── Demuxes audio stream and extracts raw RGB video frames to disk buffer.
        │
        ▼
3. FACIAL TRACKING & EMBEDDING (InsightFace / ONNX)
   └── Extracts 512-dimensional facial embedding vectors and bounding boxes.
        │
        ▼
4. CUSTOM FACE-MATCHER LOGIC (Python)
   └── Computes cosine similarity of embeddings between adjacent frames.
   └── Resets tracking IDs on scene cuts to prevent feature blending.
        │
        ▼
5. SUPER-RESOLUTION ENHANCEMENT (Real-ESRGAN / PyTorch)
   └── Enhances facial and background details per tracked ID.
        │
        ▼
6. RE-ENCODING & AUDIO SYNC (FFmpeg)
   └── Re-muxes enhanced frames with synchronized original audio stream.
        │
        ▼
[ Restored Video Output ]
```

---

### 4. Key Engineering Decisions & Debugging
- **Custom Face-Matcher vs. Out-of-the-Box Tracking:** Standard trackers lose continuity across abrupt lighting or angle changes. Vivek implemented cosine similarity tracking on 512-dim InsightFace vectors, explicitly resetting the feature buffer whenever `PySceneDetect` flags a shot transition.
- **VRAM & Hardware Constraint Management:** Running InsightFace and Real-ESRGAN concurrently easily exceeds GPU VRAM limits. Vivek restructured the Python execution flow into modular, sequential batches, releasing CUDA cache memory between stages to prevent Out-of-Memory (OOM) crashes.

---

### 5. Provable Outcomes & Evidence
- **Artifact Resolution:** Eliminated multi-face overlap ("crayon effect") on reviewed footage across hard scene cuts.
- **Before / After Evidence:** Frame comparison pairs demonstrating clean edge isolation and natural facial detail restoration.

---

### 6. Documented Engineering Boundaries (Radical Honesty)
- **Local Workstation Constraint:** The pipeline is engineered and tested on local GPU hardware; multi-tenant distributed cloud infrastructure has not yet been implemented.
- **Scope Limit:** Has not yet been benchmarked on multi-hour long-form video files or multi-lingual subtitle synchronization.

---

## Case Study 2: AIPS (Academic Intelligence System)

### 1. Executive Summary
- **Domain:** Systems Engineering, API Security, Intelligent Context Assembly.
- **Core Stack:** Next.js (App Router), TypeScript, Groq API Proxy, React 19.
- **Core Contribution:** Architected a structured academic query processing engine with backend-only API key isolation and context window filtering.

---

### 2. The Engineering Problem
Academic assistance interfaces often expose API keys on the client side, lack context boundary controls, or fail to validate whether returned responses match the requested academic domain.

---

### 3. Architecture & Security Model
1. **Server-Side API Proxying:** All model credentials (`GROQ_API_KEY`) reside exclusively in server-side environment variables (`.env.local`), completely isolated from client bundles and network inspection.
2. **Context Window Assembly:** Ingests academic queries, strips extraneous tokens, and constructs structured system prompts before dispatching requests to the LLM runtime.
3. **Domain Verification Filter:** Enforces structured output formatting and validates that responses remain strictly within the academic topic boundaries.

---

### 4. Documented Engineering Boundaries
- **Offline Mode:** Local offline indexing is currently incomplete and acknowledged as a boundary; live online retrieval is fully functional.

---

## Case Study 3: AI-Assisted Engineering Workflow & Prompt Iteration

### 1. Executive Summary
- **Domain:** Software Engineering Hygiene, AI Collaboration Framework, Step Decomposition.
- **Core Stack:** Git, Conventional Commits, Prompt Engineering (V0 to V5), TypeScript.
- **Core Contribution:** Documented the systematic progression of AI-assisted engineering prompts to eliminate hallucinations and established strict developer verification ownership.

---

### 2. The Engineering Problem
Naive prompting ("Write a case study for my project") consistently generates generic, fabricated marketing claims ("cutting-edge AI", "10x performance improvements") that damage engineering credibility during technical hiring reviews.

---

### 3. The 5-Stage Prompt Iteration Progression

| Version | Technique Added | Observed Output Change | Remaining Gap Identified |
| :--- | :--- | :--- | :--- |
| **V0** | Naive Baseline | Generic marketing summary with no audience or proof boundaries. | Introduced unsupported claims of "damaged footage" and unmeasured results. |
| **V1** | Role Assignment | Framed work as technical evidence for an engineering hiring audience. | Still made broad assumptions about library behaviors. |
| **V2** | Verified Context Injection | Constrained prompt to verified repository tools (FFmpeg, InsightFace). | Tone was improved but lacked clear architectural structure. |
| **V3** | Few-Shot Style Grounding | Provided concrete "BAD vs. GOOD" examples of evidence-based writing. | Improved wording but output remained disorganized. |
| **V4** | Fixed Output Structure | Required exact 3-part schema: (1) Problem, (2) What I Did, (3) What Came of It. | Structurally clean, but still tempted model to extrapolate unverified outcomes. |
| **V5** | Step Decomposition | Required internal verification check before drafting; strictly forbade unverified metrics. | **Success:** Explicitly acknowledged VRAM constraints, omitted unmeasured metrics, and passed quality audit. |

---

### 4. Developer Ownership & Hygiene Rules
1. **AI as Collaborator, Never as Judge:** AI assists with drafting and debugging; the developer retains 100% responsibility for architecture, logic correctness, and Git hygiene.
2. **Commit Hygiene:** Every code update adheres to [Conventional Commits](https://www.conventionalcommits.org/) and passes local test verification prior to pushing.
