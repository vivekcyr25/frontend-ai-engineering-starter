"use client";

import React, { useId, useState } from "react";

export interface DisclosureProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  id?: string;
  className?: string;
}

export function Disclosure({
  title,
  children,
  defaultOpen = false,
  isOpen,
  onToggle,
  id,
  className = "",
}: DisclosureProps) {
  const generatedId = useId();
  const baseId = id || generatedId;
  const buttonId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);

  const isControlled = isOpen !== undefined;
  const isExpanded = isControlled ? isOpen : internalOpen;

  function toggle() {
    const nextState = !isExpanded;
    if (!isControlled) {
      setInternalOpen(nextState);
    }
    onToggle?.(nextState);
  }

  return (
    <div className={`border border-slate-700 rounded-lg overflow-hidden bg-slate-900 ${className}`}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={toggle}
          className="flex w-full items-center justify-between p-4 text-left font-semibold text-slate-100 bg-slate-800/60 hover:bg-slate-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          <span>{title}</span>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180 text-cyan-400" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isExpanded}
        className={`p-4 border-t border-slate-700/60 text-slate-300 text-sm leading-relaxed ${
          isExpanded ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
