import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface/50">
      <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col md:flex-row items-center justify-between gap-4 py-6 text-sm text-muted">
        <p>© {new Date().getFullYear()} {site.name} · B.Tech CSE · Applied AI & Pipeline Engineering</p>
        
        <div className="flex items-center gap-4 text-xs font-medium">
          <a
            href="https://github.com/vivekcyr25"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            GitHub
          </a>
          <span className="text-line-strong">·</span>
          <a
            href="https://linkedin.com/in/vivekcyr25"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            LinkedIn
          </a>
          <span className="text-line-strong">·</span>
          <Link href="/contact" className="hover:text-foreground transition">
            Contact
          </Link>
          <span className="text-line-strong">·</span>
          <Link href="/work" className="font-semibold text-accent-ink hover:underline">
            {site.primaryCta} &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
}
