"use client";

import React, { useState, useEffect } from "react";
import SendButton, { ButtonState } from "@/components/ui/SendButton";
import Link from "next/link";
import { CheckCircle2, AlertCircle, RefreshCw, Sliders, ShieldCheck } from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  state: ButtonState;
  message: string;
}

export default function MotionDemoPage() {
  const [currentState, setCurrentState] = useState<ButtonState>("idle");
  const [isDisabled, setIsDisabled] = useState(false);
  const [forceOutcome, setForceOutcome] = useState<"random" | "success" | "error">("random");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Check prefers-reduced-motion status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const logEvent = (state: ButtonState, message: string) => {
    const newEntry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      time: new Date().toLocaleTimeString(),
      state,
      message,
    };
    setLogs((prev) => [newEntry, ...prev.slice(0, 9)]);
  };

  const handleSimulatedAsyncSend = async (forced?: "success" | "error") => {
    if (currentState === "loading") return;

    setCurrentState("loading");
    logEvent("loading", "Initiated async submit request...");

    // Random delay between 800ms and 1500ms
    const delay = Math.floor(Math.random() * 700) + 800;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const outcome = forced || forceOutcome;
    let isSuccess = true;

    if (outcome === "success") {
      isSuccess = true;
    } else if (outcome === "error") {
      isSuccess = false;
    } else {
      // 80% success, 20% failure
      isSuccess = Math.random() >= 0.2;
    }

    if (isSuccess) {
      setCurrentState("success");
      logEvent("success", `Async operation resolved successfully after ${delay}ms`);
      
      // Auto transition back to idle
      setTimeout(() => {
        setCurrentState((prev: ButtonState) => {
          if (prev === "success") {
            logEvent("idle", "Returned to idle state");
            return "idle";
          }
          return prev;
        });
      }, 1800);
    } else {
      setCurrentState("error");
      logEvent("error", `Async operation failed after ${delay}ms (Network/Server error)`);
    }
  };

  const handleRetry = () => {
    logEvent("idle", "Retry action triggered by user");
    handleSimulatedAsyncSend("success"); // Retry forces success for reliable feedback
  };

  const resetToIdle = () => {
    setCurrentState("idle");
    setIsDisabled(false);
    logEvent("idle", "State manually reset to Idle");
  };

  return (
    <main className="mx-auto min-h-screen w-[min(1120px,calc(100%-2rem))] py-8 md:py-12 space-y-10">
      {/* Header Banner */}
      <section className="space-y-4 border-b border-line pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent-ink font-semibold">
              UI Engineering Lifecycle Lab
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mt-1">
              Send Button Motion & State Lifecycle
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/assistant"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-line bg-surface hover:bg-background transition text-foreground"
            >
              Open AI Chat →
            </Link>
          </div>
        </div>

        <p className="text-sm text-muted max-w-3xl leading-relaxed">
          Interactive test harness verifying state transitions, micro-animations, interruptibility, focus states, and reduced motion fallback for the AI assistant Send button.
        </p>

        {/* Reduced Motion Badge */}
        <div className="flex items-center gap-3 pt-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${prefersReducedMotion ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-emerald-100 text-emerald-900 border border-emerald-300"}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              prefers-reduced-motion: <strong>{prefersReducedMotion ? "ENABLED (Reduced Motion Active)" : "DISABLED (Full Motion Active)"}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Showcase & Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Test Canvas */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 md:p-8 rounded-xl border border-line bg-surface shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-accent-ink" />
                Live Interactive Button
              </h2>
              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                currentState === "idle" ? "bg-slate-200 text-slate-800" :
                currentState === "loading" ? "bg-blue-100 text-blue-800" :
                currentState === "success" ? "bg-emerald-100 text-emerald-800" :
                currentState === "error" ? "bg-red-100 text-red-800" :
                "bg-gray-200 text-gray-700"
              }`}>
                State: {isDisabled ? "DISABLED" : currentState.toUpperCase()}
              </span>
            </div>

            {/* Canvas Demo Area */}
            <div className="flex flex-col items-center justify-center p-10 rounded-lg border border-dashed border-line-strong bg-background min-h-[160px] gap-4">
              <SendButton
                state={isDisabled ? "disabled" : currentState}
                disabled={isDisabled}
                onClick={() => handleSimulatedAsyncSend()}
                onRetry={handleRetry}
                showStopInLoading={false}
              />
              <p className="text-xs font-mono text-muted text-center">
                Click button to trigger async operation (Delay ~800–1500ms)
              </p>
            </div>

            {/* Quick Action Controls */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted block">
                Trigger Controlled States
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulatedAsyncSend("success")}
                  className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Force Success
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedAsyncSend("error")}
                  className="px-3 py-2 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  Force Error
                </button>

                <button
                  type="button"
                  onClick={resetToIdle}
                  className="px-3 py-2 bg-foreground hover:opacity-90 text-background rounded text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Idle
                </button>

                <button
                  type="button"
                  onClick={() => setIsDisabled((prev) => !prev)}
                  className={`px-3 py-2 rounded text-xs font-semibold border transition ${isDisabled ? "bg-amber-600 text-white border-amber-700" : "bg-background border-line text-foreground hover:bg-surface"}`}
                >
                  {isDisabled ? "Enable Button" : "Disable Button"}
                </button>
              </div>
            </div>

            {/* Simulation Mode Toggle */}
            <div className="pt-2 border-t border-line flex items-center justify-between text-xs">
              <span className="text-muted font-medium">Random Operation Mode:</span>
              <div className="flex gap-2">
                {(["random", "success", "error"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setForceOutcome(mode)}
                    className={`px-2.5 py-1 rounded capitalize text-xs font-mono font-medium transition ${forceOutcome === mode ? "bg-accent-ink text-white" : "bg-background border border-line text-muted hover:text-foreground"}`}
                  >
                    {mode === "random" ? "Random (~20% fail)" : mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* State Machine Log Inspector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl border border-line bg-surface shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
              <span>State Transition Log</span>
              <span className="text-xs font-mono text-muted">{logs.length} events</span>
            </h3>

            <div className="bg-background border border-line rounded-lg p-3 h-[240px] overflow-y-auto space-y-2 font-mono text-xs">
              {logs.length === 0 ? (
                <p className="text-muted text-center py-12">No transitions logged yet. Interact with the button above.</p>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="p-2 rounded bg-surface border border-line flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted">{log.time}</span>
                      <span className={`px-1.5 py-0.5 rounded font-bold uppercase text-[10px] ${
                        log.state === "idle" ? "bg-slate-200 text-slate-800" :
                        log.state === "loading" ? "bg-blue-100 text-blue-800" :
                        log.state === "success" ? "bg-emerald-100 text-emerald-800" :
                        log.state === "error" ? "bg-red-100 text-red-800" :
                        "bg-gray-200 text-gray-700"
                      }`}>
                        {log.state}
                      </span>
                    </div>
                    <p className="text-foreground">{log.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* State Matrix Grid Showcase */}
      <section className="space-y-4 pt-6 border-t border-line">
        <div>
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">
            Complete State Matrix Showcase
          </h2>
          <p className="text-xs text-muted">
            All 7 button lifecycle states rendered side-by-side for visual inspection and contrast compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* IDLE */}
          <div className="p-4 rounded-xl border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-foreground">1. IDLE</span>
              <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-mono">Resting</span>
            </div>
            <div className="p-4 bg-background rounded border border-line flex items-center justify-center">
              <SendButton state="idle" />
            </div>
            <p className="text-[11px] text-muted">Resting state with hover/focus affordance.</p>
          </div>

          {/* HOVER / FOCUS */}
          <div className="p-4 rounded-xl border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-foreground">2. HOVER / FOCUS</span>
              <span className="text-[10px] bg-sky-100 text-sky-900 px-2 py-0.5 rounded font-mono">Interactive</span>
            </div>
            <div className="p-4 bg-background rounded border border-line flex items-center justify-center">
              <SendButton state="idle" className="ring-2 ring-focus scale-[1.02]" />
            </div>
            <p className="text-[11px] text-muted">Visible focus outline (3px focus color) and micro scale.</p>
          </div>

          {/* ACTIVE / PRESSED */}
          <div className="p-4 rounded-xl border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-foreground">3. ACTIVE / PRESSED</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded font-mono">Compression</span>
            </div>
            <div className="p-4 bg-background rounded border border-line flex items-center justify-center">
              <SendButton state="idle" className="scale-[0.97]" />
            </div>
            <p className="text-[11px] text-muted">Immediate press feedback without layout shift.</p>
          </div>

          {/* LOADING */}
          <div className="p-4 rounded-xl border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-foreground">4. LOADING</span>
              <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-mono">Async</span>
            </div>
            <div className="p-4 bg-background rounded border border-line flex items-center justify-center">
              <SendButton state="loading" />
            </div>
            <p className="text-[11px] text-muted">Spinner & pulse text. Duplicate clicks prevented.</p>
          </div>

          {/* SUCCESS */}
          <div className="p-4 rounded-xl border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-foreground">5. SUCCESS</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">Pop Feedback</span>
            </div>
            <div className="p-4 bg-background rounded border border-line flex items-center justify-center">
              <SendButton state="success" />
            </div>
            <p className="text-[11px] text-muted">Smooth check pop. Returns to idle automatically.</p>
          </div>

          {/* ERROR */}
          <div className="p-4 rounded-xl border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-foreground">6. ERROR</span>
              <span className="text-[10px] bg-red-100 text-red-900 px-2 py-0.5 rounded font-mono font-bold">Shake & Retry</span>
            </div>
            <div className="p-4 bg-background rounded border border-line flex items-center justify-center">
              <SendButton state="error" />
            </div>
            <p className="text-[11px] text-muted">Shake motion (or static red fallback if reduced-motion).</p>
          </div>

          {/* DISABLED */}
          <div className="p-4 rounded-xl border border-line bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-foreground">7. DISABLED</span>
              <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-mono">Inert</span>
            </div>
            <div className="p-4 bg-background rounded border border-line flex items-center justify-center">
              <SendButton state="disabled" disabled={true} />
            </div>
            <p className="text-[11px] text-muted">Non-interactive, cursor-not-allowed, contrast compliant.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
