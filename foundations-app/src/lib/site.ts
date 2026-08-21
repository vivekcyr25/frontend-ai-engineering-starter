export const site = {
  name: "Vivek Sharma",
  proofStatement:
    "I build and optimize Python-based multimedia processing pipelines that solve real processing bottlenecks and eliminate visual artifacts such as frame overlap and distortion.",
  primaryCta: "Review my technical case studies",
  audience:
    "Engineering Manager hiring a junior backend/pipeline engineer at a media-tech company.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/health", label: "Health" },
] as const;

export const screens = [
  {
    slug: "home",
    href: "/",
    title: "Home",
    status: "placeholder",
    note: "Hero, proof statement, featured work previews, primary CTA.",
  },
  {
    slug: "work",
    href: "/work",
    title: "Work / Case Studies",
    status: "placeholder",
    note: "Index of technical case studies.",
  },
  {
    slug: "work-video",
    href: "/work/video-restoration",
    title: "Case Study — AI Video Restoration",
    status: "placeholder",
    note: "Problem / What I Did / What Came of It.",
  },
  {
    slug: "work-aips",
    href: "/work/aips",
    title: "Case Study — AIPS",
    status: "placeholder",
    note: "Academic Intelligence System case study.",
  },
  {
    slug: "work-workflow",
    href: "/work/ai-workflow",
    title: "Case Study — AI Workflow",
    status: "placeholder",
    note: "AI-assisted engineering workflow case study.",
  },
  {
    slug: "about",
    href: "/about",
    title: "About",
    status: "placeholder",
    note: "Short bio and engineering focus.",
  },
  {
    slug: "contact",
    href: "/contact",
    title: "Contact",
    status: "placeholder",
    note: "Contact channels and form shell.",
  },
  {
    slug: "health",
    href: "/health",
    title: "Health Check",
    status: "live-data",
    note: "Server Component fetching public API data.",
  },
] as const;
