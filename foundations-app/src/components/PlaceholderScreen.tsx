import Link from "next/link";

type PlaceholderProps = {
  title: string;
  description: string;
  nextHref?: string;
  nextLabel?: string;
};

export default function PlaceholderScreen({
  title,
  description,
  nextHref = "/work",
  nextLabel = "Continue to Work",
}: PlaceholderProps) {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12 md:py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-ink">
        Foundations placeholder
      </p>
      <h1 className="max-w-[16ch] font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">{description}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={nextHref}
          className="bg-accent px-4 py-3 text-sm font-semibold text-[#102016] hover:bg-accent-strong"
        >
          {nextLabel}
        </Link>
        <Link
          href="/health"
          className="border border-line-strong px-4 py-3 text-sm font-semibold text-foreground hover:bg-surface"
        >
          Open health check
        </Link>
      </div>
    </section>
  );
}
