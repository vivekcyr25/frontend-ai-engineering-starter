"use client";

import React, { useState, useRef } from "react";
import { Modal } from "@/components/manual/Modal";
import { Tabs } from "@/components/manual/Tabs";
import { Disclosure } from "@/components/manual/Disclosure";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
} from "@/components/ui/tabs";

export default function PlaygroundPage() {
  // Manual Modal States
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [modalInitialInputFocus, setModalInitialInputFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  // Manual Tabs Configuration
  const [tabsActivation, setTabsActivation] = useState<"automatic" | "manual">("automatic");
  const [activeTabLog, setActiveTabLog] = useState("video-pipeline");

  // Sample tab items
  const manualTabItems = [
    {
      id: "video-pipeline",
      label: "AI Video Pipeline",
      content: (
        <div className="space-y-2">
          <h4 className="font-semibold text-cyan-400">AI Video Restoration Pipeline</h4>
          <p className="text-sm text-slate-300">
            Multi-model sequential processing pipeline using PySceneDetect, InsightFace, Real-ESRGAN, and FFmpeg.
          </p>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-medium text-xs rounded transition">
              Inspect Frame Matcher
            </button>
            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 transition">
              View Log
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "aips-system",
      label: "AIPS Architecture",
      content: (
        <div className="space-y-2">
          <h4 className="font-semibold text-cyan-400">Academic Intelligence System</h4>
          <p className="text-sm text-slate-300">
            Context assembly and intelligent query routing with backend-only API key isolation.
          </p>
          <a
            href="https://github.com/vivekcyr25"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-cyan-400 underline hover:text-cyan-300 mt-2"
          >
            Explore Repo →
          </a>
        </div>
      ),
    },
    {
      id: "workflow-audit",
      label: "Workflow & Hygiene",
      content: (
        <div className="space-y-2">
          <h4 className="font-semibold text-cyan-400">Prompting & Verification Hygiene</h4>
          <p className="text-sm text-slate-300">
            Step decomposition and Conventional Git commit discipline across FL-01 milestones.
          </p>
          <code className="block p-2 bg-slate-950 rounded text-xs text-slate-300 font-mono mt-2">
            git log --oneline -n 3
          </code>
        </div>
      ),
    },
    {
      id: "disabled-tab",
      label: "Disabled Stream",
      disabled: true,
      content: <div>Disabled Tab Panel (Should not be accessible)</div>,
    },
  ];

  return (
    <div className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12 space-y-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/60 border border-cyan-700/50 rounded-full text-xs font-mono text-cyan-400 uppercase tracking-wide mb-3">
          <span>⚡ Accessible Components Playground</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          W3C ARIA Accessible Component Lab
        </h1>
        <p className="mt-2 text-slate-400 max-w-2xl text-sm leading-relaxed">
          Interactive lab comparing manual, zero-dependency W3C ARIA implementations (Modal Dialog, Tabs, Disclosure) against shadcn/ui (Radix UI primitives). Strict TypeScript, focus trapping, roving tabindex, and keyboard-first design.
        </p>
      </div>

      {/* SECTION 1: MANUAL COMPONENTS */}
      <section className="space-y-8">
        <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Part 1: Manual Components (Built from Scratch)
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
            Zero External Libraries
          </span>
        </div>

        {/* 1.1 Modal Dialog */}
        <div className="border border-slate-700 bg-slate-900/60 rounded-lg p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-white">1. Modal Dialog (W3C ARIA Pattern)</h3>
              <p className="text-xs text-slate-400">
                Focus trap (Tab / Shift+Tab), Escape dismissal, focus entry & return restoration, `aria-modal=&quot;true&quot;`.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-400 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modalInitialInputFocus}
                  onChange={(e) => setModalInitialInputFocus(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                />
                Focus input on open
              </label>
              <button
                ref={triggerButtonRef}
                type="button"
                onClick={() => setIsManualModalOpen(true)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm rounded-md transition shadow"
              >
                Open Manual Modal
              </button>
            </div>
          </div>

          <Modal
            isOpen={isManualModalOpen}
            onClose={() => setIsManualModalOpen(false)}
            title="Pipeline Artifact Debugger"
            description="Inspect the custom frame-tracking logic used to eliminate face overlap across scene transitions."
            initialFocusRef={modalInitialInputFocus ? inputRef : undefined}
            finalFocusRef={triggerButtonRef}
          >
            <div className="space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                This modal is rendered via a React Portal directly into <code>document.body</code>. Focus is trapped inside: press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs text-cyan-300">Tab</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs text-cyan-300">Shift + Tab</kbd> to cycle focus, or <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs text-cyan-300">Esc</kbd> to dismiss.
              </p>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Filter Artifact Frame ID:
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="e.g. frame_0428_cut_A.png"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded border border-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert("Frame tracking filter executed!");
                    setIsManualModalOpen(false);
                  }}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold rounded transition"
                >
                  Apply Verification Filter
                </button>
              </div>
            </div>
          </Modal>
        </div>

        {/* 1.2 Tabs */}
        <div className="border border-slate-700 bg-slate-900/60 rounded-lg p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-white">2. Tabs (W3C ARIA Tabs Pattern)</h3>
              <p className="text-xs text-slate-400">
                Roving <code>tabIndex</code>, Arrow Left/Right/Home/End keyboard navigation, active panel mapping.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Activation Mode:</span>
              <button
                type="button"
                onClick={() => setTabsActivation("automatic")}
                className={`px-2.5 py-1 text-xs font-medium rounded border transition ${
                  tabsActivation === "automatic"
                    ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                    : "bg-slate-800 border-slate-700 text-slate-400"
                }`}
              >
                Automatic
              </button>
              <button
                type="button"
                onClick={() => setTabsActivation("manual")}
                className={`px-2.5 py-1 text-xs font-medium rounded border transition ${
                  tabsActivation === "manual"
                    ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                    : "bg-slate-800 border-slate-700 text-slate-400"
                }`}
              >
                Manual (Enter/Space)
              </button>
            </div>
          </div>

          <Tabs
            tabs={manualTabItems}
            ariaLabel="Engineering Case Studies"
            activationMode={tabsActivation}
            onTabChange={(id) => setActiveTabLog(id)}
          />
          <div className="text-xs font-mono text-slate-500">
            Active Tab Event: <span className="text-cyan-400">{activeTabLog}</span> (Mode: {tabsActivation})
          </div>
        </div>

        {/* 1.3 Disclosure / Accordion */}
        <div className="border border-slate-700 bg-slate-900/60 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-white">3. Disclosure / Accordion (W3C ARIA Pattern)</h3>
            <p className="text-xs text-slate-400">
              Native button trigger with <code>aria-expanded</code> and <code>aria-controls</code>, accessible content region.
            </p>
          </div>

          <div className="space-y-3">
            <Disclosure
              title="How does the custom frame-matcher eliminate multi-face overlap?"
              defaultOpen={true}
            >
              The pipeline extracts facial embedding vectors across sequential frames using InsightFace. When PySceneDetect flags a shot transition, the matcher computes cosine similarity across candidate bounding boxes. If similarity falls below the continuity threshold, tracking IDs are cleanly reset rather than blended, preventing the super-resolution model from superimposing features across faces.
            </Disclosure>

            <Disclosure title="What are the documented hardware and GPU boundaries?">
              The restoration pipeline is engineered for local workstation GPUs and treats VRAM as a hard design constraint. It processes frames in sequential batches to prevent CUDA Out-of-Memory exceptions. Long-form video files and multi-tenant distributed cloud deployments have not yet been implemented or benchmarked.
            </Disclosure>
          </div>
        </div>
      </section>

      {/* SECTION 2: SHADCN / RADIX UI COMPONENTS */}
      <section className="space-y-8">
        <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Part 2: shadcn/ui Components (Radix UI Primitives)
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
            @radix-ui/react-dialog &amp; tabs
          </span>
        </div>

        {/* 2.1 shadcn Dialog */}
        <div className="border border-slate-700 bg-slate-900/60 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">shadcn/ui Dialog</h3>
              <p className="text-xs text-slate-400">
                Built with <code>@radix-ui/react-dialog</code> with animated portals and outside-pointer dismissal.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-sm rounded-md transition shadow">
                  Open shadcn Dialog
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Radix UI Dialog Primitive</DialogTitle>
                  <DialogDescription>
                    This dialog uses Radix UI FocusScope, Presence animations, and PointerDownOutside event handling.
                  </DialogDescription>
                </DialogHeader>
                <div className="text-sm text-slate-300 py-2">
                  Radix handles edge cases like scroll locking via dynamic padding compensation, nested dialog focus trapping, and screen-reader timing synchronization.
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 2.2 shadcn Tabs */}
        <div className="border border-slate-700 bg-slate-900/60 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-white">shadcn/ui Tabs</h3>
            <p className="text-xs text-slate-400">
              Built with <code>@radix-ui/react-tabs</code> using uncontrolled/controlled compound components.
            </p>
          </div>

          <ShadcnTabs defaultValue="overview" className="w-full">
            <ShadcnTabsList className="grid w-full grid-cols-3">
              <ShadcnTabsTrigger value="overview">Overview</ShadcnTabsTrigger>
              <ShadcnTabsTrigger value="architecture">Architecture</ShadcnTabsTrigger>
              <ShadcnTabsTrigger value="boundaries">Boundaries</ShadcnTabsTrigger>
            </ShadcnTabsList>
            <ShadcnTabsContent value="overview">
              <p className="text-sm text-slate-300">
                Radix Tabs handles roving tabindex and keyboard focus delegation seamlessly across compound child triggers.
              </p>
            </ShadcnTabsContent>
            <ShadcnTabsContent value="architecture">
              <p className="text-sm text-slate-300">
                Compound component structure separates state management (`TabsPrimitive.Root`) from layout presentation (`TabsList`, `TabsTrigger`, `TabsContent`).
              </p>
            </ShadcnTabsContent>
            <ShadcnTabsContent value="boundaries">
              <p className="text-sm text-slate-300">
                Provides automated data attributes (<code>data-state=&quot;active&quot;</code>) for CSS animations.
              </p>
            </ShadcnTabsContent>
          </ShadcnTabs>
        </div>
      </section>
    </div>
  );
}
