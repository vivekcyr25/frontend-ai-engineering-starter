import Link from "next/link";

const cases = [
  {
    href: "/work/video-restoration",
    title: "AI Video Restoration Pipeline",
    blurb: "Python multimedia pipeline case study placeholder.",
  },
  {
    href: "/work/aips",
    title: "AIPS — Academic Intelligence System",
    blurb: "Academic product case study placeholder.",
  },
  {
    href: "/work/ai-workflow",
    title: "AI-Assisted Engineering Workflow",
    blurb: "Prompting and verification workflow placeholder.",
  },
];

export default function WorkPage() {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12 md:py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-ink">
        Foundations placeholder
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
        Work / Case Studies
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Routed placeholders for every case study screen in the portfolio spec. Full copy lands in a
        later phase.
      </p>
      <ul className="mt-10 divide-y divide-line border-t border-line">
        {cases.map((item) => (
          <li key={item.href} className="py-5">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
              <Link href={item.href} className="hover:text-accent-ink">
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 text-muted">{item.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
