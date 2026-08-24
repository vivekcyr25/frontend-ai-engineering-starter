"use client";

import React, { useId, useRef, useState } from "react";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultActiveTabId?: string;
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  ariaLabel?: string;
  activationMode?: "automatic" | "manual";
  className?: string;
}

export function Tabs({
  tabs,
  defaultActiveTabId,
  activeTabId,
  onTabChange,
  ariaLabel = "Content sections",
  activationMode = "automatic",
  className = "",
}: TabsProps) {
  const baseId = useId();
  const [internalActiveId, setInternalActiveId] = useState<string>(() => {
    if (defaultActiveTabId) return defaultActiveTabId;
    const firstEnabled = tabs.find((t) => !t.disabled);
    return firstEnabled ? firstEnabled.id : tabs[0]?.id || "";
  });

  const isControlled = activeTabId !== undefined;
  const currentActiveId = isControlled ? activeTabId : internalActiveId;

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  function selectTab(id: string) {
    if (!isControlled) {
      setInternalActiveId(id);
    }
    onTabChange?.(id);
  }

  const enabledTabs = tabs.filter((t) => !t.disabled);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const currentIndex = enabledTabs.findIndex((t) => t.id === currentActiveId);
    if (currentIndex === -1) return;

    let nextIndex = -1;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        nextIndex = (currentIndex + 1) % enabledTabs.length;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;

      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;

      case "End":
        event.preventDefault();
        nextIndex = enabledTabs.length - 1;
        break;

      case "Enter":
      case " ":
        if (activationMode === "manual") {
          event.preventDefault();
          const targetTab = enabledTabs.find(
            (t) => tabRefs.current.get(t.id) === document.activeElement
          );
          if (targetTab) {
            selectTab(targetTab.id);
          }
        }
        return;

      default:
        return;
    }

    if (nextIndex !== -1) {
      const nextTab = enabledTabs[nextIndex];
      const tabElement = tabRefs.current.get(nextTab.id);

      if (tabElement) {
        tabElement.focus();
        if (activationMode === "automatic") {
          selectTab(nextTab.id);
        }
      }
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Tab List */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-1 border-b border-slate-700 bg-slate-900/60 p-1 rounded-t-lg"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === currentActiveId;
          const tabId = `${baseId}-tab-${tab.id}`;
          const panelId = `${baseId}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
                else tabRefs.current.delete(tab.id);
              }}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => {
                if (!tab.disabled) selectTab(tab.id);
              }}
              className={`relative px-4 py-2.5 text-sm font-medium transition-all rounded-md outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                isActive
                  ? "bg-slate-800 text-cyan-400 font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              } ${tab.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {tab.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-400 rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="rounded-b-lg border border-t-0 border-slate-700 bg-slate-900/90 p-6 text-slate-200">
        {tabs.map((tab) => {
          const isActive = tab.id === currentActiveId;
          const tabId = `${baseId}-tab-${tab.id}`;
          const panelId = `${baseId}-panel-${tab.id}`;

          return (
            <div
              key={tab.id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              tabIndex={0}
              hidden={!isActive}
              className={`outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 rounded p-1 ${
                isActive ? "block" : "hidden"
              }`}
            >
              {isActive && tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
