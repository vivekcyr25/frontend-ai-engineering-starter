import Link from "next/link";
import { screens, site } from "@/lib/site";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-hero-from to-hero-to text-[#f4f7f5]">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20 md:py-28">
          <p className="font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tight md:text-7xl">
            {site.name}
          </p>
          <h1 className="mt-6 max-w-[22ch] font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-tight md:text-4xl">
            {site.proofStatement}
          </h1>
          <p className="mt-4 max-w-xl text-white/75">{site.audience}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="bg-accent px-4 py-3 text-sm font-semibold text-[#102016] hover:bg-accent-strong"
            >
              {site.primaryCta}
            </Link>
            <Link
              href="/contact"
              className="border border-white/35 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12 md:py-16">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          Spec screens (Foundations)
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Every screen from the portfolio sitemap exists as a routed page. Content beyond this
          foundations pass is intentionally placeholder except the health check.
        </p>
        <ul className="mt-8 divide-y divide-line border-t border-line">
          {screens.map((screen) => (
            <li key={screen.slug} className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-foreground">{screen.title}</p>
                <p className="text-sm text-muted">{screen.note}</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded border border-line px-2 py-1 text-muted">{screen.status}</span>
                <Link href={screen.href} className="font-semibold text-accent-ink">
                  Open
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
