import Link from "next/link";
import { notFound } from "next/navigation";

const caseStudies: Record<
  string,
  { title: string; sections: { heading: string; body: string }[] }
> = {
  "video-restoration": {
    title: "AI Video Restoration Pipeline",
    sections: [
      {
        heading: "The Problem",
        body: "Placeholder — restore old/wedding footage under hardware limits; face overlapping under heavy interpolation.",
      },
      {
        heading: "What I Did",
        body: "Placeholder — face embedder, face matcher, frame CSV tracking; verify against restored-frame checklists.",
      },
      {
        heading: "What Came of It",
        body: "Placeholder — reduced overlapping on reviewed frames; no unsupported metrics claimed here.",
      },
    ],
  },
  aips: {
    title: "AIPS — Academic Intelligence System",
    sections: [
      {
        heading: "The Problem",
        body: "Placeholder — usable academic product with secure AI assistance; offline access still incomplete.",
      },
      {
        heading: "What I Did",
        body: "Placeholder — UI/UX concept, architecture, Groq assistant with backend-only API key.",
      },
      {
        heading: "What Came of It",
        body: "Placeholder — live online app; offline not claimed as finished.",
      },
    ],
  },
  "ai-workflow": {
    title: "AI-Assisted Engineering Workflow",
    sections: [
      {
        heading: "The Problem",
        body: "Placeholder — vague prompts produced messy code and weak intent match.",
      },
      {
        heading: "What I Did",
        body: "Placeholder — precise prompts, workflow audit, vague vs precise experiment documentation.",
      },
      {
        heading: "What Came of It",
        body: "Placeholder — clearer exposure of engineering intent and reviewable artifacts.",
      },
    ],
  },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return Object.keys(caseStudies).map((id) => ({ id }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const study = caseStudies[id];

  if (!study) notFound();

  return (
    <article className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12 md:py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-ink">
        Foundations placeholder
      </p>
      <h1 className="max-w-[16ch] font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
        {study.title}
      </h1>
      <div className="mt-10 space-y-8 border-t border-line pt-8">
        {study.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
              {section.heading}
            </h2>
            <p className="mt-3 max-w-3xl text-muted">{section.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">
        <Link href="/work" className="font-semibold text-accent-ink">
          Back to Work
        </Link>
      </p>
    </article>
  );
}
