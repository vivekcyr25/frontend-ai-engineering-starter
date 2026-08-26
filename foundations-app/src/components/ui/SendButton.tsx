"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send, Check, RotateCcw, Loader2, Square } from "lucide-react";

export type ButtonState = "idle" | "loading" | "success" | "error" | "disabled";

export interface SendButtonProps {
  type?: "submit" | "button";
  /** Controlled state override if provided */
  state?: ButtonState;
  /** Explicit disabled prop */
  disabled?: boolean;
  /** Primary click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Handler when user clicks retry in error state */
  onRetry?: () => void;
  /** Handler when user clicks stop in loading/streaming state */
  onStop?: () => void;
  /** Custom labels */
  idleLabel?: string;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  disabledLabel?: string;
  /** Show stop button state during loading */
  showStopInLoading?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Custom aria-label */
  ariaLabel?: string;
  /** Auto reset to idle after success (ms). Set to 0 to disable */
  successDuration?: number;
}

export default function SendButton({
  type = "submit",
  state: externalState,
  disabled = false,
  onClick,
  onRetry,
  onStop,
  idleLabel = "Send",
  loadingLabel = "Sending...",
  successLabel = "Sent!",
  errorLabel = "Retry",
  disabledLabel = "Send",
  showStopInLoading = false,
  className = "",
  ariaLabel,
  successDuration = 1800,
}: SendButtonProps) {
  // Internal state when not externally controlled
  const [internalState, setInternalState] = useState<ButtonState>("idle");
  const activeState: ButtonState = disabled
    ? "disabled"
    : externalState !== undefined
    ? externalState
    : internalState;

  // Track state transitions for animation triggers
  const [isShaking, setIsShaking] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear running timers on unmount or state change
  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Handle side-effects on state change
  useEffect(() => {
    clearTimers();

    if (activeState === "error") {
      const animTimer = setTimeout(() => setIsShaking(true), 0);
      const shakeTimer = setTimeout(() => setIsShaking(false), 260);
      return () => {
        clearTimeout(animTimer);
        clearTimeout(shakeTimer);
      };
    }

    if (activeState === "success") {
      const animTimer = setTimeout(() => setIsPopping(true), 0);
      const popTimer = setTimeout(() => setIsPopping(false), 260);

      if (successDuration > 0 && externalState === undefined) {
        timerRef.current = setTimeout(() => {
          setInternalState("idle");
        }, successDuration);
      }
      return () => {
        clearTimeout(animTimer);
        clearTimeout(popTimer);
      };
    }
  }, [activeState, successDuration, externalState]);

  // Click router ensuring state machine safety & interruptibility
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || activeState === "disabled") {
      e.preventDefault();
      return;
    }

    if (activeState === "loading") {
      if (showStopInLoading && onStop) {
        e.preventDefault();
        onStop();
      } else {
        // Prevent duplicate submissions during loading
        e.preventDefault();
      }
      return;
    }

    if (activeState === "error") {
      e.preventDefault();
      if (onRetry) {
        onRetry();
      } else if (onClick) {
        onClick(e);
      }
      return;
    }

    if (activeState === "idle" || activeState === "success") {
      if (onClick) {
        onClick(e);
      }
    }
  };

  // State-dependent style configurations matching system visual design
  const stateStyles = {
    idle: "bg-accent-ink text-white hover:bg-accent-ink/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-focus",
    loading: "bg-accent-ink/80 text-white cursor-wait",
    success: "bg-emerald-700 text-white",
    error: "bg-red-700 text-white hover:bg-red-800 active:scale-[0.97]",
    disabled: "bg-line text-muted/60 cursor-not-allowed opacity-60",
  };

  const currentStyles = stateStyles[activeState] || stateStyles.idle;

  // ARIA attributes
  const computedAriaLabel =
    ariaLabel ||
    (activeState === "loading"
      ? showStopInLoading && onStop
        ? "Stop"
        : loadingLabel
      : activeState === "success"
      ? successLabel
      : activeState === "error"
      ? errorLabel
      : activeState === "disabled"
      ? disabledLabel
      : idleLabel);

  return (
    <button
      type={type}
      disabled={disabled || (activeState === "loading" && !showStopInLoading)}
      aria-disabled={disabled || activeState === "disabled"}
      aria-busy={activeState === "loading"}
      aria-live={activeState === "error" ? "assertive" : activeState === "success" ? "polite" : "off"}
      aria-label={computedAriaLabel}
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center gap-2
        px-4 py-2.5 min-w-[100px] min-h-[44px] h-[44px]
        rounded-lg font-bold text-xs uppercase tracking-wider
        select-none overflow-hidden
        transition-all duration-150 ease-out
        transform-gpu
        ${currentStyles}
        ${isShaking ? "animate-btn-shake" : ""}
        ${isPopping ? "animate-btn-pop" : ""}
        ${className}
      `}
    >
      {/* Compositor layer for state content transition */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-150 ease-out">
        {/* IDLE STATE */}
        {activeState === "idle" && (
          <>
            <span className="transition-opacity duration-150">{idleLabel}</span>
            <Send className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </>
        )}

        {/* LOADING STATE */}
        {activeState === "loading" && (
          <>
            {showStopInLoading && onStop ? (
              <>
                <span>Stop</span>
                <Square className="w-3.5 h-3.5 fill-current" />
              </>
            ) : (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-btn-spin" />
                <span className="animate-pulse">{loadingLabel}</span>
              </>
            )}
          </>
        )}

        {/* SUCCESS STATE */}
        {activeState === "success" && (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{successLabel}</span>
          </>
        )}

        {/* ERROR STATE */}
        {activeState === "error" && (
          <>
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{errorLabel}</span>
          </>
        )}

        {/* DISABLED STATE */}
        {activeState === "disabled" && (
          <>
            <span>{disabledLabel}</span>
            <Send className="w-3.5 h-3.5 opacity-50" />
          </>
        )}
      </span>
    </button>
  );
}
