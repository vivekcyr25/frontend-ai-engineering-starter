export type PortfolioProject = {
  name: string;
  summary: string;
  problem: string;
  technologies: string[];
  engineeringDecisions: string[];
  evidence: string[];
  repositoryUrl?: string;
  demoUrl?: string;
};

/**
 * Curated from the repository's CONTENT-MAP.md and PORTFOLIO-CASE-STUDIES.md.
 * Keep this registry in sync with verified portfolio evidence; do not add
 * measurements, ownership, or links that cannot be checked in source material.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    name: "AI Video Restoration Pipeline",
    summary:
      "A Python-based multimedia restoration workflow for old and wedding footage, focused on reducing face-overlap artifacts across difficult scene changes.",
    problem:
      "Heavy interpolation could create overlapping facial features on restored frames, making the output difficult to trust.",
    technologies: [
      "Python",
      "FFmpeg",
      "PySceneDetect",
      "OpenCV",
      "OpenCLIP",
      "InsightFace",
      "ONNX Runtime GPU",
      "PyTorch/torchvision",
      "Real-ESRGAN",
      "pytest",
    ],
    engineeringDecisions: [
      "Tracked frames with CSV data so the pipeline had an explicit processing inventory.",
      "Worked on face-embedding and matching logic to target face-overlap failures.",
      "Reviewed restored frames instead of assuming model output was correct.",
      "Treated consumer GPU and source-quality limits as design constraints.",
    ],
    evidence: [
      "Repository paths include the face embedder, matcher utilities, frame/scene CSV artifacts, and tests.",
      "The project record describes reduced overlap on restored frames reviewed.",
      "Publishable before/after frame exports still need to be collected.",
    ],
    repositoryUrl: "https://github.com/vivekcyr25/AI-Video-Restoration-Pipeline",
    demoUrl: "https://vivekcyr25.github.io/AI-Video-Restoration-Pipeline/",
  },
  {
    name: "AIPS — Academic Intelligence System",
    summary:
      "An academic application with a documented server-side AI path intended to keep provider credentials out of the browser.",
    problem:
      "The project needed a usable online academic experience without exposing an AI-provider key in client-side code; offline access remains incomplete.",
    technologies: ["TypeScript", "React", "Vite", "Firebase", "Vercel serverless API handlers", "Groq API"],
    engineeringDecisions: [
      "Kept the Groq credential on the backend/server side rather than in the frontend bundle.",
      "Kept the working online experience separate from incomplete offline work.",
      "Documented a proxied AI request path and Firebase persistence/auth patterns.",
    ],
    evidence: [
      "Repository and architecture documentation are available.",
      "A live online deployment is documented; verify its current status before publishing a claim about it.",
      "A current UI capture still needs to be collected for the portfolio.",
    ],
    repositoryUrl: "https://github.com/vivekcyr25/APIS-Academic-Intelligence-System",
    demoUrl: "https://apis-academic-intelligence-system.vercel.app",
  },
  {
    name: "AI-Assisted Engineering Workflow",
    summary:
      "A documented comparison showing how a precise specification and tests improved an AI-assisted contact-form implementation.",
    problem:
      "A vague AI prompt produced a runnable form with accessibility and validation gaps, increasing review risk.",
    technologies: ["HTML", "CSS", "JavaScript", "Node test runner", "Git"],
    engineeringDecisions: [
      "Used a written specification with accessibility constraints, edge cases, and a verification command.",
      "Separated validation into a module and added automated tests.",
      "Reviewed AI output for missing labels and whitespace-only input acceptance.",
    ],
    evidence: [
      "WORKFLOW.md records the ai-vague and ai-precise branch comparison.",
      "The recorded precise-round Node test run reported 4 passing tests and 0 failures.",
      "Exact review minutes were not measured.",
    ],
  },
];

export type ProjectDetailsResult = {
  found: true;
  project: PortfolioProject;
};

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function findPortfolioProject(projectName: string): PortfolioProject | null {
  const query = normalise(projectName);

  if (!query) return null;

  return (
    portfolioProjects.find((project) => {
      const candidate = normalise(project.name);
      return candidate.includes(query) || query.includes(candidate) || candidate.split(" ").every((term) => query.includes(term));
    }) ?? null
  );
}
