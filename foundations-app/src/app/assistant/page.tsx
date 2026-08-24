import React from "react";
import EngineeringAssistant from "@/components/EngineeringAssistant";
import { site } from "@/lib/site";

export const metadata = {
  title: `Technical AI Assistant — ${site.name}`,
  description: "Explore Vivek's AI Video Restoration Pipeline, AIPS architecture, and verification workflows through an interactive technical assistant.",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-10 md:py-14 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/60 border border-cyan-700/50 rounded-full text-xs font-mono text-cyan-400 uppercase tracking-wide mb-3">
          <span>⚡ Interactive Portfolio Explorer</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Technical Portfolio Assistant
        </h1>
        <p className="mt-3 text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Ask questions about pipeline architecture, custom face-matching logic, multi-model chaining with FFmpeg &amp; InsightFace, or review documented verification boundaries.
        </p>
      </div>

      <EngineeringAssistant />
    </div>
  );
}
