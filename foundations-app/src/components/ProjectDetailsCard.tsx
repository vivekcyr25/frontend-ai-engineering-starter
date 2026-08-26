import type { PortfolioProject } from "@/lib/portfolio-projects";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectDetailsCardProps {
  output: unknown;
}

// ─── No-result state ─────────────────────────────────────────────────────────

function NoResultCard() {
  return (
    <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
      <p className="text-sm font-semibold text-amber-800">
        No matching project found
      </p>
      <p className="mt-1 text-sm text-amber-700">
        That name did not match a verified portfolio entry. Try asking about the{" "}
        <strong>AI Video Restoration Pipeline</strong>, <strong>AIPS</strong>,
        or the <strong>AI-Assisted Engineering Workflow</strong>.
      </p>
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <div className="mt-2 space-y-3 rounded-lg border border-line bg-background p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Portfolio Project
          </p>
          <h3 className="mt-0.5 text-base font-bold text-foreground">
            {project.name}
          </h3>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-accent-ink hover:underline min-h-[44px] inline-flex items-center px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              GitHub →
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-accent-ink hover:underline min-h-[44px] inline-flex items-center px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-muted">{project.summary}</p>

      {/* The Problem */}
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
          The Problem
        </p>
        <p className="text-sm text-foreground">{project.problem}</p>
      </div>

      {/* Technologies */}
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
          Technologies
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-block rounded border border-line bg-surface px-2 py-0.5 font-mono text-xs text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Engineering Decisions */}
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
          Engineering Decisions
        </p>
        <ul className="space-y-1.5">
          {project.engineeringDecisions.map((decision, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ink"
                aria-hidden="true"
              />
              {decision}
            </li>
          ))}
        </ul>
      </div>

      {/* Evidence */}
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
          Evidence
        </p>
        <ul className="space-y-1">
          {project.evidence.map((item, i) => (
            <li key={i} className="text-sm text-muted">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

/**
 * Renders the result of a getProjectDetails tool call.
 * Accepts the raw `output` from the tool invocation part and guards for
 * missing / error responses without crashing.
 */
export default function ProjectDetailsCard({ output }: ProjectDetailsCardProps) {
  if (output === null || output === undefined || typeof output !== "object") {
    return <NoResultCard />;
  }

  const result = output as Record<string, unknown>;

  if (!result.found || !result.project || typeof result.project !== "object") {
    return <NoResultCard />;
  }

  return <ProjectCard project={result.project as PortfolioProject} />;
}
