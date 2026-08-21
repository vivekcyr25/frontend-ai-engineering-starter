import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-wrap items-center justify-between gap-3 py-6 text-sm text-muted">
        <p>Foundations phase · Next.js App Router · Server Components by default</p>
        <Link href="/work" className="font-semibold text-accent-ink">
          {site.primaryCta}
        </Link>
      </div>
    </footer>
  );
}
