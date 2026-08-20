# Prompt Iteration Log

## Task

Write a technical portfolio case study for the **AI Video Restoration Pipeline**.

### Verified project context used in this log

The FL-01 Workflow Audit identifies the project as a Python-based AI video restoration pipeline for old and wedding footage. It lists FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, and PyTorch, plus video/frame processing. The audit describes scene analysis, frame/image matching, enhancement, reconstruction, and practical GPU/VRAM constraints. It does **not** provide measured performance, quality, user, or reliability results; none are claimed below.

## V0 — Naive Baseline

### Prompt

```text
Write a case study for my AI Video Restoration Pipeline.
```

### Actual Output

> ## AI Video Restoration Pipeline
>
> I built an AI Video Restoration Pipeline to improve the quality of older video footage. The project combines video processing with AI-based enhancement so that damaged, low-quality, or outdated footage can be restored into a clearer final result.
>
> The pipeline processes video frames, identifies useful visual information, and applies restoration techniques to improve the output. Building it involved connecting several tools and handling the challenges of running AI models on video data.
>
> This project helped me develop skills in Python, computer vision, and AI engineering. It shows my ability to use modern AI tools to solve a practical media-processing problem.

### Notes

**Technique Added:** None — naive baseline

**What Changed in the Output:** This baseline produced a short, generic project summary without an explicit audience or evidence boundary.

**What Still Failed:** It introduced unsupported claims such as “damaged” footage, a “clearer final result,” and skills developed by the project. It also did not explain the engineering decisions behind the pipeline.

**Why I Chose the Next Technique:** The next version assigns a portfolio-writing role so the response is more likely to frame the work as engineering evidence for a hiring audience.

## V1 — Role Assignment

### Prompt

```text
You are a technical portfolio writer helping a junior software/AI engineer explain a real engineering project.

Write a case study for my AI Video Restoration Pipeline.
```

### Actual Output

> ## AI Video Restoration Pipeline
>
> I built an AI Video Restoration Pipeline as a practical computer-vision project for improving older video material. The project focuses on moving from raw video input to a restored output through a repeatable processing workflow.
>
> From an engineering perspective, the main challenge was connecting video processing and AI enhancement into one pipeline rather than treating them as separate experiments. I worked in Python to process video data, prepare frames for restoration, and produce an output that could be reviewed against the source material.
>
> The project demonstrates an interest in backend-style pipeline work: handling media inputs, coordinating processing stages, and working with AI models in a constrained environment. The exact restoration results should be supported with project evidence before presenting the case study publicly.

### Notes

**Technique Added:** Role assignment

**What Changed in the Output:** The response shifted from generic portfolio language toward describing the work from an engineering perspective and acknowledged the need to verify public claims.

**What Still Failed:** It still inferred details that were not supplied, including “raw video input,” “repeatable processing workflow,” and backend-style pipeline work. It did not name verified components or the actual project motivation.

**Why I Chose the Next Technique:** The next version supplies verified context and a target reader, so the writer can be specific without filling gaps with assumptions.

## V2 — Context + Motivation

### Prompt

```text
You are a technical portfolio writer helping a junior software/AI engineer explain a real engineering project.

Write a case study for my AI Video Restoration Pipeline.

Use only this verified project context:
- It is a Python-based AI video restoration pipeline.
- It processes old and wedding footage.
- Its verified video/vision components are FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, and PyTorch.
- The pipeline includes scene analysis, frame/image matching, enhancement, and reconstruction.
- The project was developed with practical GPU/VRAM constraints.
- Its purpose is to improve old footage and solve real processing/artifact problems.

The case study should demonstrate practical pipeline engineering ability to an Engineering Manager evaluating a junior backend/pipeline engineer.
```

### Actual Output

> ## AI Video Restoration Pipeline
>
> I developed a Python-based pipeline for restoring old and wedding footage while working within practical GPU and VRAM limits. The problem was not simply applying an enhancement model to a video: restoration required connecting scene analysis, frame and image matching, enhancement, and reconstruction into a usable sequence while managing processing and artifact issues.
>
> I used FFmpeg for video handling and combined PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, and PyTorch as relevant video and vision components. The engineering work focused on how those stages fit together: analyzing scenes before processing, matching relevant frames or images, applying enhancement, and reconstructing output while accounting for available GPU memory.
>
> The project is evidence of practical pipeline engineering with video and vision tooling. Its outcomes should be presented as verified process capability rather than quantified quality or performance claims until measurements are available.

### Notes

**Technique Added:** Context and motivation

**What Changed in the Output:** The response names the verified stack, frames the problem as a pipeline-integration problem, and connects the work to GPU/VRAM constraints and the Engineering Manager audience.

**What Still Failed:** The paragraph is dense and reads partly as a component inventory. It also does not make the desired evidence-based writing style obvious enough to prevent broad phrases such as “practical pipeline engineering.”

**Why I Chose the Next Technique:** The next version gives concise examples of specific, evidence-based phrasing to guide the tone without adding a new structure.

## V3 — Few-Shot Examples

### Prompt

```text
You are a technical portfolio writer helping a junior software/AI engineer explain a real engineering project.

Write a case study for my AI Video Restoration Pipeline.

Use only this verified project context:
- It is a Python-based AI video restoration pipeline.
- It processes old and wedding footage.
- Its verified video/vision components are FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, and PyTorch.
- The pipeline includes scene analysis, frame/image matching, enhancement, and reconstruction.
- The project was developed with practical GPU/VRAM constraints.
- Its purpose is to improve old footage and solve real processing/artifact problems.

The case study should demonstrate practical pipeline engineering ability to an Engineering Manager evaluating a junior backend/pipeline engineer.

Follow the specificity and evidence-based style of these examples:

BAD: "I leveraged cutting-edge AI technologies to create an innovative solution."
GOOD: "I combined scene detection, frame matching, and AI enhancement into a single restoration pipeline."

BAD: "The project significantly improved video quality."
GOOD: "The restored output can be compared against the original footage to evaluate changes in visual quality and artifacts."
```

### Actual Output

> ## AI Video Restoration Pipeline
>
> I built a Python-based restoration pipeline for old and wedding footage. Instead of describing the work as a single AI enhancement step, the pipeline combines scene analysis, frame/image matching, enhancement, and reconstruction so that the video can move through connected processing stages.
>
> I used FFmpeg for video handling and worked with PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, and PyTorch in the video/vision workflow. A practical constraint was GPU and VRAM availability, so the implementation had to account for the cost of running processing stages rather than treating model execution as unlimited.
>
> The output can be compared with the original footage to evaluate visual changes and artifacts. This provides a concrete basis for reviewing restoration results without claiming unmeasured quality or performance improvements.

### Notes

**Technique Added:** Few-shot examples

**What Changed in the Output:** The response replaced broad quality language with a comparison of restored and original footage, and it stated the GPU/VRAM limitation more concretely.

**What Still Failed:** This did not help significantly with organization: the answer is still three dense paragraphs without clear separation between the problem, implementation decisions, and outcomes. It also repeats the component list rather than selecting the details that matter most.

**Why I Chose the Next Technique:** The next version imposes a concise three-part structure so an engineering reader can scan the problem, contribution, and verified outcome separately.

## V4 — Output Structure

### Prompt

```text
You are a technical portfolio writer helping a junior software/AI engineer explain a real engineering project.

Write a case study for my AI Video Restoration Pipeline.

Use only this verified project context:
- It is a Python-based AI video restoration pipeline.
- It processes old and wedding footage.
- Its verified video/vision components are FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, and PyTorch.
- The pipeline includes scene analysis, frame/image matching, enhancement, and reconstruction.
- The project was developed with practical GPU/VRAM constraints.
- Its purpose is to improve old footage and solve real processing/artifact problems.

The case study should demonstrate practical pipeline engineering ability to an Engineering Manager evaluating a junior backend/pipeline engineer.

Follow the specificity and evidence-based style of these examples:

BAD: "I leveraged cutting-edge AI technologies to create an innovative solution."
GOOD: "I combined scene detection, frame matching, and AI enhancement into a single restoration pipeline."

BAD: "The project significantly improved video quality."
GOOD: "The restored output can be compared against the original footage to evaluate changes in visual quality and artifacts."

Require exactly these concise sections:
1. The Problem
2. What I Did
3. What Came of It

Under "What I Did", emphasize technical decisions, implementation work, and trade-offs.
Under "What Came of It", use only verified outcomes.
```

### Actual Output

> ## The Problem
>
> Old and wedding footage can require more than a single enhancement pass: restoration work must address processing and artifact problems across a video. The project needed a Python-based workflow that could analyze scenes, match frames or images, enhance material, and reconstruct output while working within GPU and VRAM constraints.
>
> ## What I Did
>
> I built the pipeline around connected video and vision stages. FFmpeg handles video processing; PySceneDetect supports scene analysis; and the workflow uses OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, and PyTorch for relevant matching, enhancement, and model-execution work. I treated GPU/VRAM availability as an implementation constraint when combining these stages rather than assuming every model could run without resource limits.
>
> ## What Came of It
>
> The result is a defined restoration pipeline for old and wedding footage that brings scene analysis, frame/image matching, enhancement, and reconstruction together. Restored output can be reviewed against source footage for visual changes and artifacts. No quantified quality, speed, or reliability outcome is claimed because the available project record does not verify one.

### Notes

**Technique Added:** Output structure

**What Changed in the Output:** The response now separates the engineering problem, implementation choices, and evidence-supported outcome. The trade-off is visible in the implementation section.

**What Still Failed:** It assumes exact mappings between each named tool and a pipeline stage that the audit does not document. Even though the full tool list is verified, the precise responsibility of each component is not.

**Why I Chose the Next Technique:** The next version directs the model to identify evidence and remove unsupported claims before drafting, which should reduce these implied component-to-stage mappings.

## V5 — Step Decomposition

### Prompt

```text
You are a technical portfolio writer helping a junior software/AI engineer explain a real engineering project.

Write a case study for my AI Video Restoration Pipeline.

Use only this verified project context:
- It is a Python-based AI video restoration pipeline.
- It processes old and wedding footage.
- Its verified video/vision components are FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, and PyTorch.
- The pipeline includes scene analysis, frame/image matching, enhancement, and reconstruction.
- The project was developed with practical GPU/VRAM constraints.
- Its purpose is to improve old footage and solve real processing/artifact problems.

The case study should demonstrate practical pipeline engineering ability to an Engineering Manager evaluating a junior backend/pipeline engineer.

Follow the specificity and evidence-based style of these examples:

BAD: "I leveraged cutting-edge AI technologies to create an innovative solution."
GOOD: "I combined scene detection, frame matching, and AI enhancement into a single restoration pipeline."

BAD: "The project significantly improved video quality."
GOOD: "The restored output can be compared against the original footage to evaluate changes in visual quality and artifacts."

Require exactly these concise sections:
1. The Problem
2. What I Did
3. What Came of It

Under "What I Did", emphasize technical decisions, implementation work, and trade-offs.
Under "What Came of It", use only verified outcomes.

Before writing the final case study, internally work through these stages:
1. Identify the actual engineering problem.
2. Identify my personal contribution.
3. Identify the important technical decisions.
4. Identify evidence-supported outcomes.
5. Remove unsupported claims.
6. Write the final case study using the required three-section structure.

Do not expose private chain-of-thought. Only provide the final answer and a short summary of the checks performed.
```

### Actual Output

> ## The Problem
>
> I was developing a Python-based AI video restoration pipeline for old and wedding footage. The engineering problem was to connect scene analysis, frame/image matching, enhancement, and reconstruction into one workflow while addressing processing and artifact concerns under practical GPU/VRAM limits.
>
> ## What I Did
>
> I implemented the project as a video and vision processing pipeline using FFmpeg, PySceneDetect, OpenCLIP, Real-ESRGAN, InsightFace, ONNX Runtime, and PyTorch. My contribution was bringing the verified processing stages together and treating GPU/VRAM availability as a design constraint when working with the pipeline. I kept the description focused on the documented workflow rather than attributing unverified behavior to individual libraries or models.
>
> ## What Came of It
>
> The project produced a defined restoration workflow for processing old and wedding footage. Its output can be compared with the original footage to review visual changes and artifacts. The available record does not verify a numerical improvement in quality, throughput, reliability, or GPU usage, so those outcomes are not claimed.
>
> **Checks performed:** Used only the verified project scope, component list, workflow stages, and GPU/VRAM constraint; excluded unmeasured results and unverified library-level claims.

### Notes

**Technique Added:** Step decomposition

**What Changed in the Output:** The response explicitly limits itself to the evidence available, avoids assigning undocumented roles to individual components, and includes a short verification summary while retaining the required structure.

**What Still Failed:** The project record still does not contain evaluation evidence such as sample comparisons, artifact categories, run logs, or resource measurements. Prompting cannot supply that missing proof.

**Why I Chose the Next Technique:** No further technique was added. The next practical step is to collect and verify project evidence before revising the case study.

## Claude vs ChatGPT

### Actual Claude Output

```text
[NOT AVAILABLE — REAL RUN ATTEMPTED]

The V5 prompt was submitted through the locally configured Claude CLI on 2026-08-20. Claude returned exactly:

Credit balance is too low

No Claude case-study response is included because fabricating one would violate the assignment requirement.
```

### Actual ChatGPT Output

The V5 **Actual Output** above is the ChatGPT run used for this comparison.

### Comparison

| Criterion | ChatGPT | Claude |
| --- | --- | --- |
| Tone | Direct and suitable for an Engineering Manager; it explains the work as pipeline engineering rather than marketing. | Not assessable: Claude did not produce an answer. |
| Accuracy | It stayed within the audit by naming only the verified scope, component list, stages, and GPU/VRAM constraint; it explicitly excluded metrics. | Not assessable: no content was returned. |
| Structure | It followed the requested three sections and added the requested short checks summary. | Not assessable: no content was returned. |
| Specificity | It gives the actual workflow stages and verified components but correctly avoids undocumented per-library behavior. | Not assessable: no content was returned. |
| Failure points | It cannot provide proof beyond the audit: no metrics, test results, or visual examples are available. | The run failed before generation because the available credit balance was too low. |

**Comparison status:** This is not a completed model-quality comparison. A valid Claude-vs-ChatGPT comparison requires rerunning the unchanged V5 prompt in Claude after credit or account access is restored, then replacing the placeholder and updating the table with evidence from both outputs.

## Final Reusable Prompt Template

```text
You are a technical portfolio writer helping a junior software/AI engineer explain a real engineering project to [TARGET AUDIENCE].

Write a concise technical portfolio case study for [PROJECT NAME].

Use only the following verified information:
- Engineering problem: [ENGINEERING PROBLEM]
- Project context: [PROJECT CONTEXT]
- My contribution: [MY CONTRIBUTION]
- Technical decisions and trade-offs: [TECHNICAL DECISIONS]
- Verified outcomes: [VERIFIED OUTCOMES]

Follow the specificity and evidence-based style of these examples:

BAD: "I used cutting-edge technology to create an innovative solution."
GOOD: "I connected [PROCESSING STAGE A], [PROCESSING STAGE B], and [PROCESSING STAGE C] into one workflow."

BAD: "The project significantly improved performance."
GOOD: "[VERIFIED MEASUREMENT OR REVIEW METHOD] was used to evaluate [SPECIFIC OUTCOME] against [BASELINE OR SOURCE]."

Require exactly these concise sections:
1. The Problem
2. What I Did
3. What Came of It

In "What I Did", emphasize technical decisions, implementation work, and trade-offs.
In "What Came of It", use only verified outcomes. If an outcome is not verified, state the evaluation method or omit the claim.

Before writing, internally:
1. Identify the actual engineering problem.
2. Identify my personal contribution.
3. Identify the important technical decisions.
4. Identify evidence-supported outcomes.
5. Remove unsupported claims.
6. Write the final case study using the required three-section structure.

Do not expose private chain-of-thought. Provide only the final answer and a short summary of the checks performed.
```

## Key Lessons

- Role assignment changed the framing but did not by itself prevent unsupported assumptions.
- Verified context and motivation made the case study materially more specific and relevant to the hiring audience.
- Few-shot examples improved evidence-based wording, but did not help significantly with organization.
- A fixed output structure made the engineering story easier to scan.
- Step decomposition most clearly reduced unsupported claims by requiring an evidence check before drafting.
- A prompt cannot replace missing project evidence. Add before/after footage samples, documented artifact observations, processing logs, and measured resource or runtime data before making stronger outcome claims.
- The Claude comparison remains intentionally incomplete until a real Claude V5 response can be obtained.
