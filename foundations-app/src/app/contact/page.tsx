import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: `Contact — ${site.name}`,
  description: "Connect with Vivek Sharma for junior backend, media pipeline, and applied AI engineering opportunities.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12 md:py-16 space-y-10">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-ink">
          Connect &amp; Collaborate
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg leading-relaxed">
          I am currently open to Junior Backend, Pipeline Engineering, and Applied AI roles.
          The best way to evaluate my work is through my verified technical case studies.
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="https://github.com/vivekcyr25"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-line bg-surface p-5 hover:border-accent-ink transition group"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-muted">Code &amp; Repositories</p>
          <h2 className="mt-1 text-lg font-bold text-foreground group-hover:text-accent-ink transition">
            GitHub &rarr;
          </h2>
          <p className="mt-2 text-xs text-muted font-mono">github.com/vivekcyr25</p>
        </a>

        <a
          href="https://linkedin.com/in/vivekcyr25"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-line bg-surface p-5 hover:border-accent-ink transition group"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-muted">Professional Network</p>
          <h2 className="mt-1 text-lg font-bold text-foreground group-hover:text-accent-ink transition">
            LinkedIn &rarr;
          </h2>
          <p className="mt-2 text-xs text-muted font-mono">linkedin.com/in/vivekcyr25</p>
        </a>

        <a
          href="mailto:vivek@example.com"
          className="rounded-xl border border-line bg-surface p-5 hover:border-accent-ink transition group"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-muted">Direct Email</p>
          <h2 className="mt-1 text-lg font-bold text-foreground group-hover:text-accent-ink transition">
            Email &rarr;
          </h2>
          <p className="mt-2 text-xs text-muted font-mono">vivek@example.com</p>
        </a>
      </div>

      {/* Secondary CTAs */}
      <div className="rounded-xl border border-line bg-background p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-foreground">Want to review technical evidence first?</h3>
          <p className="text-xs text-muted mt-1">Explore sequential multi-model pipeline architectures and verification logs.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/work"
            className="rounded-md bg-accent-ink px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition"
          >
            Review Case Studies
          </Link>
          <Link
            href="/assistant"
            className="rounded-md border border-line bg-surface px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-background transition"
          >
            AI Assistant
          </Link>
        </div>
      </div>
    </section>
  );
}
