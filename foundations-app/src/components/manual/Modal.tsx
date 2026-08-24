"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  finalFocusRef?: React.RefObject<HTMLElement | null>;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'area[href]:not([tabindex="-1"])',
  'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'iframe:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
  '[contentEditable=true]:not([tabindex="-1"])',
].join(", ");

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  initialFocusRef,
  finalFocusRef,
  closeOnBackdropClick = true,
  className = "",
}: ModalProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const titleId = useId();
  const descriptionId = useId();

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimeout = window.setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          dialogRef.current.focus();
        }
      }
    }, 16);

    return () => {
      window.clearTimeout(focusTimeout);
      document.body.style.overflow = originalOverflow;

      if (finalFocusRef?.current) {
        finalFocusRef.current.focus();
      } else if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === "function") {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, initialFocusRef, finalFocusRef]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      if (!dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null || el === dialogRef.current);

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement || document.activeElement === dialogRef.current) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) {
    return null;
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
          onClose();
        }
      }}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`relative w-full max-w-lg rounded-lg border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl p-6 outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 id={titleId} className="text-xl font-bold tracking-tight text-white">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-sm text-slate-400">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-2 text-slate-300">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
