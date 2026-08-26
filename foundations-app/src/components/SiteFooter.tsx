import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface/50">
      <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col md:flex-row items-center justify-between gap-4 py-6 text-sm text-muted">
        <p>© 2026 {site.name} · B.Tech CSE · Applied AI & Pipeline Engineering</p>
        
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 text-xs font-semibold">
          <a
            href="https://github.com/vivekcyr25"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-2 inline-flex items-center hover:text-foreground transition rounded"
          >
            GitHub
          </a>
          <span className="text-line-strong">·</span>
          <a
            href="https://linkedin.com/in/vivekcyr25"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-2 inline-flex items-center hover:text-foreground transition rounded"
          >
            LinkedIn
          </a>
          <span className="text-line-strong">·</span>
          <Link href="/contact" className="min-h-[44px] px-2 inline-flex items-center hover:text-foreground transition rounded">
            Contact
          </Link>
          <span className="text-line-strong">·</span>
          <Link href="/work" className="min-h-[44px] px-2 inline-flex items-center font-bold text-accent-ink hover:underline rounded">
            {site.primaryCta} &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
}
