# Visual Identity & Image Curation Specification

**Author:** Vivek  
**Assignment:** FlyRank AI Internship — Portfolio Image Curation & Visual Identity  
**Target Audience:** Engineering Managers & Technical Recruiters (Media-Tech & Backend/AI Pipeline)  
**Status:** Approved & Active Standard  

---

## 1. Core Visual Curation Philosophy

> **"The design must frame the work, never upstage it."**

In a technical engineering portfolio, visuals are **evidence artifacts**, not decorative wallpaper. Every image, diagram, and visual capture must directly answer:
* *"Does this help the hiring manager understand or trust the engineering work?"*

If an image fails to communicate verifiable technical truth, it is removed.

---

## 2. Comprehensive Image Inventory & Decision Matrix

| Portfolio Section / Project | Selected Visual Type | Purpose & Communication Goal | Evidence Value | Why Real/Diagram Wins Over AI Generation |
| :--- | :--- | :--- | :--- | :--- |
| **1. AI Video Restoration Pipeline** *(Primary Case Study)* | **1. SVG Technical Pipeline Diagram**<br>**2. Real Before/After Frame Evidence Card** | Visualizes the multi-model pipeline (`PySceneDetect → InsightFace → Real-ESRGAN → FFmpeg`) and demonstrates artifact resolution (face-matcher vs. scene cut "crayon effect" overlap). | **Direct Proof:** Shows the exact technical problem solved, model-chaining flow, and debugging ownership. | AI-generated art of "glowing video beams" or robots conveys zero engineering information and signals fabricated work. |
| **2. AIPS — Academic Intelligence System** *(Systems Case Study)* | **1. System Context Architecture Flow (SVG)**<br>**2. Real UI Application Capture** | Explains the query lifecycle, embedding retrieval, context assembly, and secure backend-only API key handling. | **System Architecture Proof:** Demonstrates backend architecture and data flow control. | AI stock graphics (e.g. glowing brains or network nodes) obscure data flow and reduce technical credibility. |
| **3. AI-Assisted Engineering Workflow** *(Process Case Study)* | **1. Real Terminal Log Artifact**<br>**2. Verified Git Commit Tree** | Proves developer ownership, Conventional Commits discipline, and test verification rigor. | **Software Craftsmanship:** Verifies authentic git hygiene and reproducible local verification. | Synthetic illustrations cannot prove actual developer workflow hygiene. |
| **4. Personal Profile (About Section)** | **Real Photograph** *(Clean, authentic developer portrait with neutral backdrop)* | Establishes genuine professional identity, authentic ownership, and approachable credibility. | **Authentic Trust:** Establishes real human connection for recruiters. | **Strictly Rejected AI Avatar:** Stylized AI portraits (e.g. Midjourney anime/cyberpunk avatars) destroy hiring credibility. |
| **5. Hero / Backgrounds / Connective Elements** | **Subtle CSS/SVG Geometric Grid** *(1px `#26334d` structural grid)* | Provides subtle depth and structural rhythm without drawing attention away from the typography and case studies. | **Non-Intrusive Framing:** Stays strictly in the background with zero contrast degradation. | Flashy 3D generative backgrounds create visual noise and distract from the proof statement. |

---

## 3. Detailed Rejection Log: 4 Rejected AI-Generated Visuals

### ❌ Rejected Visual 1: AI-Generated "Holographic Video Restoration AI Eye"
- **What it was:** A photorealistic, high-saturation 3D render of a glowing cybernetic lens reconstructing floating video frames.
- **Why it was rejected:**
  1. *Zero Technical Substance:* Does not communicate FFmpeg encoding, ONNX runtime, PyTorch model chaining, or VRAM constraints.
  2. *Deceptive Polish:* Looks like marketing concept art rather than real backend/pipeline engineering.
  3. *Breaks Visual Identity:* High-saturation neon glow clashes with the calm slate/dark navy palette.

### ❌ Rejected Visual 2: AI-Generated "Holographic Neural Brain / Glowing Synapse Cluster"
- **What it was:** An abstract glowing blue/purple 3D brain mesh representing "AI intelligence" for AIPS.
- **Why it was rejected:**
  1. *Generic Cliché:* Overused stock visual that fails to show how queries are tokenized, indexed, or verified.
  2. *Upstages the Architecture:* Draws eye tracking away from the actual component breakdown (Parser → Index → Filter).

### ❌ Rejected Visual 3: AI-Generated "Cyberpunk / Studio Stylized Avatar"
- **What it was:** An AI-generated avatar of a developer in neon-lit room wearing futuristic headphones.
- **Why it was rejected:**
  1. *Destroys Hiring Credibility:* Engineering managers hiring interns and junior engineers expect authenticity; AI avatars look amateurish.
  2. *Fails Identity Verification:* An engineering portfolio must represent a real person with genuine accountability.

### ❌ Rejected Visual 4: Floating Glassmorphic 3D Tech Badges
- **What it was:** Oversized 3D floating icons with heavy blur for Python, PyTorch, and FFmpeg logos.
- **Why it was rejected:**
  1. *Visual Clutter:* Adds decorative weight without explaining *how* the tools were used.
  2. *Substituted with:* Crisp monospace inline text tags (`[Python]`, `[PyTorch]`, `[FFmpeg]`) that maintain typographic rhythm.

---

## 4. The 5-Point Portfolio Visual Decision Rule

Before any image, graphic, or diagram is permitted into this portfolio, it must pass all 5 criteria:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    THE 5-POINT VISUAL INTEGRITY TEST                    │
│                                                                         │
│  1. EVIDENCE TEST: Does this visual prove a real engineering action,    │
│     architecture decision, or outcome?                                  │
│                                                                         │
│  2. UNDERSTANDING TEST: Does it make complex pipeline flow clearer than │
│     words alone could?                                                  │
│                                                                         │
│  3. REALITY TEST: Is this a genuine capture/diagram rather than         │
│     fabricated marketing fiction?                                       │
│                                                                         │
│  4. RESTRAINT TEST: Does the visual sit quietly behind the evidence     │
│     without neon glows, excessive shadows, or busy clutter?             │
│                                                                         │
│  5. AUTHENTICITY TEST: For personal representation, is this an          │
│     authentic photograph of the developer?                              │
│                                                                         │
│  IF ANY ANSWER IS "NO" → REJECT OR CONVERT TO STRUCTURED TEXT/CODE.     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Visual Consistency Standards for Approved Assets

- **Aspect Ratio:**
  - Case Study Previews & Screenshots: Standardized **16:9** container.
  - Architecture Diagrams: Standardized **2:1** or **3:1** horizontal ribbon flow.
  - Personal Portrait: Standardized **1:1** square with subtle `8px` border radius.
- **Framing & Borders:**
  - 1px solid border (`#26334d` on dark / `#e2e8f0` on light).
  - Clean `8px` corner radius (`--radius-md`).
  - Terminal/Code Window Framing: Dark inset backdrop (`#070b14`) with monospace caption bar.
- **Captions & Metadata:**
  - Every visual must include a technical caption in `JetBrains Mono` / monospace font explaining the exact pipeline stage or metric shown.
