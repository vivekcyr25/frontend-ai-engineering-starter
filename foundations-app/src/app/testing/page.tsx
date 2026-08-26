import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Cpu, Terminal, GitBranch, Layers } from "lucide-react";

export const metadata = {
  title: "Testing & CI Architecture — FlyRank Assignment",
  description: "Comprehensive testing strategy, Vitest component coverage, AI route mocking, Playwright E2E, and GitHub Actions CI workflow.",
};

export default function TestingModulePage() {
  return (
    <main className="mx-auto min-h-screen w-[min(1120px,calc(100%-2rem))] py-8 md:py-12 space-y-10">
      {/* Header Banner */}
      <section className="space-y-4 border-b border-line pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent-ink font-semibold">
              FlyRank AI Assignment Module
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mt-1">
              Frontend Testing &amp; CI Architecture
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/assistant"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-line bg-surface hover:bg-background transition text-foreground"
            >
              Test AI Assistant →
            </Link>
          </div>
        </div>

        <p className="text-sm text-muted max-w-3xl leading-relaxed">
          Comprehensive overview of the unit, component, E2E, and continuous integration architecture implemented for the capstone application.
        </p>

        {/* Stack Status Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Vitest + React Testing Library</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-100 text-sky-900 border border-sky-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Playwright E2E</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-100 text-purple-900 border border-purple-300">
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub Actions CI</span>
          </div>
        </div>
      </section>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Unit & Component Testing */}
        <div className="rounded-xl border border-line bg-surface p-6 space-y-3">
          <div className="flex items-center gap-2 text-accent-ink font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <span>Unit &amp; Component Tests</span>
          </div>
          <h2 className="text-base font-bold text-foreground">Vitest + React Testing Library</h2>
          <p className="text-xs text-muted leading-relaxed">
            Fast, isolated component testing driven by accessibility-first queries (<code className="font-mono text-foreground">getByRole</code>, <code className="font-mono text-foreground">getByLabelText</code>). Zero reliance on brittle CSS classes or internal React state.
          </p>
        </div>

        {/* Card 2: AI Route Mocking */}
        <div className="rounded-xl border border-line bg-surface p-6 space-y-3">
          <div className="flex items-center gap-2 text-accent-ink font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>AI Route Mocking</span>
          </div>
          <h2 className="text-base font-bold text-foreground">100% Offline &amp; Deterministic</h2>
          <p className="text-xs text-muted leading-relaxed">
            Zero real external API calls to OpenAI during testing. AI hooks and HTTP endpoints are deterministically mocked in both Vitest and Playwright route interception.
          </p>
        </div>

        {/* Card 3: E2E & CI */}
        <div className="rounded-xl border border-line bg-surface p-6 space-y-3">
          <div className="flex items-center gap-2 text-accent-ink font-bold text-sm">
            <GitBranch className="w-4 h-4" />
            <span>Playwright &amp; GitHub Actions</span>
          </div>
          <h2 className="text-base font-bold text-foreground">Automated Quality Gate</h2>
          <p className="text-xs text-muted leading-relaxed">
            Full end-to-end user journey verification running on every <code className="font-mono text-foreground">push</code> and <code className="font-mono text-foreground">pull_request</code> with mandatory typecheck, lint, unit, and E2E gates.
          </p>
        </div>
      </div>

      {/* Target Component Coverage Section */}
      <section className="space-y-6 pt-4">
        <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">
          Target Components Tested
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Component A: Chat Message Renderer */}
          <div className="rounded-xl border border-line bg-background p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-accent-ink uppercase">Component A</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">6 States Covered</span>
            </div>
            <h3 className="text-sm font-bold text-foreground">EngineeringAssistant.tsx</h3>
            <ul className="text-xs text-muted space-y-1.5 list-disc list-inside">
              <li>Pending / Loading state</li>
              <li>Streaming response text state</li>
              <li>Completed assistant message</li>
              <li>Connection error state with Retry CTA</li>
              <li>User prompt message bubble</li>
              <li>Tool invocation result embedding</li>
            </ul>
          </div>

          {/* Component B: Validated Form */}
          <div className="rounded-xl border border-line bg-background p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-accent-ink uppercase">Component B</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">4 States Covered</span>
            </div>
            <h3 className="text-sm font-bold text-foreground">ContactForm.tsx</h3>
            <ul className="text-xs text-muted space-y-1.5 list-disc list-inside">
              <li>Form layout with accessible input labels</li>
              <li>Empty submission required field validation</li>
              <li>Invalid email format rejection</li>
              <li>Valid submission success alert &amp; reset</li>
            </ul>
          </div>

          {/* Component C: Tool Result Component */}
          <div className="rounded-xl border border-line bg-background p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-accent-ink uppercase">Component C</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">3 States Covered</span>
            </div>
            <h3 className="text-sm font-bold text-foreground">ProjectDetailsCard.tsx</h3>
            <ul className="text-xs text-muted space-y-1.5 list-disc list-inside">
              <li>Structured project details (title, problem, tech, decisions)</li>
              <li>GitHub repository and Live Demo URL links</li>
              <li>Safe fallback card (<code className="font-mono">NoResultCard</code>) for missing/null output</li>
              <li>Zero raw JSON rendering</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Commands & Documentation Section */}
      <section className="space-y-4 pt-4 border-t border-line">
        <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">
          Testing Suite Commands
        </h2>

        <div className="bg-surface border border-line rounded-xl p-5 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-accent-ink shrink-0" />
            <span className="text-foreground font-bold">npm run test</span>
            <span className="text-muted ml-auto">Executes Vitest unit &amp; component test suite</span>
          </div>

          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-accent-ink shrink-0" />
            <span className="text-foreground font-bold">npm run test:e2e</span>
            <span className="text-muted ml-auto">Executes Playwright end-to-end user flow</span>
          </div>

          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-accent-ink shrink-0" />
            <span className="text-foreground font-bold">npm run lint</span>
            <span className="text-muted ml-auto">Verifies code formatting and accessibility rules</span>
          </div>

          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-accent-ink shrink-0" />
            <span className="text-foreground font-bold">npx tsc --noEmit</span>
            <span className="text-muted ml-auto">Verifies strict TypeScript type safety</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/contact"
            className="px-4 py-2.5 bg-accent-ink text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition"
          >
            Inspect Validated Contact Form →
          </Link>
        </div>
      </section>
    </main>
  );
}
