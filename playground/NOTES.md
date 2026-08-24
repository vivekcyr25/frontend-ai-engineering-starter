# Accessibility Component Playground

**Author:** Vivek  
**Assignment:** FlyRank AI Internship — Accessibility, React + TypeScript & Component Architecture  
**W3C Reference:** [W3C ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/)  
**Environment:** Next.js (App Router), React 19, TypeScript 5 (Strict Mode)  

---

## 1. Components Built Manually

Three zero-dependency accessible components were engineered from scratch using React, TypeScript, standard DOM APIs, and W3C ARIA Authoring Practices:

### 1. Modal Dialog (`playground/components/Modal.tsx`)
- **Semantic & ARIA Structure:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.
- **Portal Rendering:** Renders into `document.body` via `createPortal` to escape parent clipping, `overflow: hidden`, and stacking context traps.
- **Focus Entry & Restoration:** Automatically saves `document.activeElement` on open; shifts initial focus to either an explicitly designated `initialFocusRef` or the first focusable element inside the modal; restores focus to the triggering element upon closure or unmount.
- **Focus Trapping:** Intercepts `Tab` and `Shift + Tab` keydown events, querying all active tabbable elements and wrapping focus cyclically within the dialog boundaries.
- **Keyboard Dismissal & Scroll Lock:** Intercepts `Escape` key to trigger `onClose()`; applies `overflow: hidden` to `document.body` while active to prevent background scrolling.

### 2. Tabs (`playground/components/Tabs.tsx`)
- **Semantic & ARIA Structure:** `role="tablist"` with `aria-label`, `role="tab"` with `aria-selected` and `aria-controls`, `role="tabpanel"` with `aria-labelledby`.
- **Roving `tabindex` Pattern:** The active tab is set to `tabIndex={0}` while all inactive tabs are set to `tabIndex={-1}`, ensuring only the selected tab exists in the page's standard Tab sequence.
- **Keyboard Navigation:**
  - `ArrowRight` / `ArrowDown`: Moves focus to the next enabled tab (wrapping around from end to start).
  - `ArrowLeft` / `ArrowUp`: Moves focus to the previous enabled tab (wrapping around from start to end).
  - `Home`: Immediately focuses the first enabled tab.
  - `End`: Immediately focuses the last enabled tab.
- **Activation Models Supported:**
  - *Automatic Activation (Default):* Focus movement immediately activates and renders the corresponding tab panel. Recommended by W3C APG for instantaneous local content panels.
  - *Manual Activation:* Arrow keys move focus only; pressing `Enter` or `Space` activates the focused tab. Useful when tab panels require asynchronous data fetching.
- **Panel Accessibility:** Inactive panels are marked with `hidden`; active panels feature `tabIndex={0}` to allow keyboard users to tab directly into the panel content.

### 3. Disclosure / Accordion (`playground/components/Disclosure.tsx`)
- **Semantic & ARIA Structure:** Native `<button type="button">` trigger with `aria-expanded="true/false"` and `aria-controls="panel-id"`, controlling a collapsible container with `id="panel-id"` and `role="region"`.
- **Native Keyboard Support:** Natively activates on both `Enter` and `Space` keys without requiring manual key listeners.
- **Visual State Indicator:** Animated chevron indicator driven purely by CSS rotation tied to the boolean state.

---

## 2. Keyboard Testing Matrix

Every component was tested exclusively using hardware keyboard navigation in the browser.

| Component | Key / Action | Expected ARIA Behavior | Observed Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Modal** | `Enter` / `Space` on Trigger | Opens modal, traps focus, focuses first interactive element / input. | Modal opened; focus entered input/button immediately. | **PASS** |
| **Modal** | `Tab` (Forward cycle) | Moves focus through modal elements; on last element, wraps to first element. | Focus looped back to title close button after last action button. | **PASS** |
| **Modal** | `Shift + Tab` (Reverse cycle) | Moves focus backward; on first element, wraps to last element. | Focus wrapped from close button to final action button. | **PASS** |
| **Modal** | `Escape` | Closes modal immediately; prevents event bubbling to parent containers. | Modal dismissed cleanly. | **PASS** |
| **Modal** | Focus Restoration on Close | Focus returns to the original button that triggered the modal. | Focus returned cleanly to `triggerButtonRef`. | **PASS** |
| **Tabs** | `Tab` into Tablist | Focuses the single currently active tab (`tabIndex={0}`). | Focused the active tab; skipped inactive tabs. | **PASS** |
| **Tabs** | `ArrowRight` / `ArrowLeft` | Moves focus between sibling tabs; wraps around edges; skips disabled tabs. | Arrow navigation cycled enabled tabs smoothly. | **PASS** |
| **Tabs** | `Home` / `End` | Jumps to first / last enabled tab immediately. | `Home` focused Tab 1, `End` focused Tab 3. | **PASS** |
| **Tabs** | `Enter` / `Space` (Manual Mode) | Activates the focused tab when in manual activation mode. | In manual mode, arrows moved focus; `Space`/`Enter` activated panel. | **PASS** |
| **Tabs** | `Tab` from Active Tab | Focus moves into the active `tabpanel` (`tabIndex={0}`) or its first child. | Focus moved directly into the active panel content. | **PASS** |
| **Disclosure** | `Tab` to Trigger | Focuses the disclosure header button. | Outline visible on button. | **PASS** |
| **Disclosure** | `Enter` / `Space` | Toggles `aria-expanded` between `true` and `false`; reveals/hides region. | Content expanded/collapsed; `aria-expanded` updated. | **PASS** |

---

## 3. Manual Implementation vs. shadcn/ui (Radix UI) Deep Dive

Inspecting the generated source code for `@radix-ui/react-dialog` and `@radix-ui/react-tabs` revealed several sophisticated accessibility safeguards and edge-case handling mechanisms:

### Concrete Gap 1: Body Scroll Locking & Scrollbar Layout Shift Compensation
- **My Manual Implementation:** Sets `document.body.style.overflow = "hidden"` on open and resets it on close.
- **shadcn / Radix Primitive (`react-remove-scroll`):**
  1. *Layout Shift:* When `overflow: hidden` removes the browser scrollbar, the entire viewport width expands by ~15px, causing jarring layout shifts. Radix calculates the scrollbar width (`window.innerWidth - document.documentElement.clientWidth`) and injects matching `padding-right` to `document.body` to preserve layout geometry.
  2. *iOS / Mobile WebKit Overscroll:* Setting `overflow: hidden` on `body` does not prevent touch-drag elastic scrolling on iOS Safari. Radix uses active non-passive touch event listeners and touch-action containment to prevent background dragging on mobile devices.

### Concrete Gap 2: Outside Pointer Event Interception & Focus Outside Defense
- **My Manual Implementation:** Listens to `onClick` on the backdrop overlay `div`. If the user clicks outside, it calls `onClose()`.
- **shadcn / Radix Primitive (`DismissableLayer` & `FocusScope`):**
  1. *PointerDown vs Click:* Radix listens to `pointerdown` rather than `click`. This prevents "ghost clicks" where a user mouses down inside a modal, drags outside, and releases, which would erroneously trigger a click event.
  2. *Nested Dialogs / Dropdowns:* If a Select dropdown or sub-dialog is spawned inside a dialog, Radix coordinates a layer stack (`DismissableLayerBranch`). Clicking the nested dropdown does not dismiss the parent modal.
  3. *`aria-hidden` Sibling Tree Inversion:* Radix automatically applies `aria-hidden="true"` to all sibling DOM nodes outside the portal root (`aria-hidden` tree walker), preventing screen readers from reading background content via virtual cursor shortcuts even if DOM focus is trapped.

### Concrete Gap 3: Compound Component Architecture & Roving Focus Delegation
- **My Manual Implementation:** Renders tabs from a static array of objects (`tabs: TabItem[]`) passed to a single `<Tabs />` component.
- **shadcn / Radix Primitive (`TabsPrimitive.Root`, `List`, `Trigger`, `Content`):**
  1. *Composability:* Radix uses React Context to allow arbitrary JSX nesting (e.g. putting search inputs or action buttons inside the `TabsList` or splitting tabs across different layout wrappers).
  2. *Roving Focus Group Primitive (`@radix-ui/react-roving-focus`):* Radix abstracts roving `tabIndex` into a reusable headless controller that manages orientation (`horizontal` vs `vertical`), loop behavior, and directional focus memory independently of tab business logic.

---

## 4. What I Learned About Accessible Component Design

1. **Accessibility is Behavioral, Not Just Semantic:** Adding `role="dialog"` or `role="tab"` is only 10% of the work. The real engineering difficulty lies in **focus state synchronization**: initial focus placement, trapping focus within cyclic bounds, restoring focus to the exact trigger element upon destruction, and managing roving `tabIndex`.
2. **Timing and Mount Cycles Matter:** Moving focus immediately during React state updates often fails because the DOM node has not yet mounted or animated in. Using microtasks, `requestAnimationFrame`, or `setTimeout(..., 16)` guarantees that elements are rendered and focusable before `.focus()` is called.
3. **Compound Components Provide Superior Developer Ergonomics:** Structuring components as compound primitives (`DialogTrigger`, `DialogContent`, `DialogClose`) decouples state management from visual layout, eliminating prop-drilling and allowing consumers to compose accessible components freely.

---

## 5. Manual Review & Testing Corrections Made

- **Correction 1 (Modal Initial Focus):** During initial keyboard testing, if a modal opened with no explicit interactive input, focus remained on the document body. Fixed by adding a fallback query that selects the first focusable element inside the modal, or falls back to focusing the dialog container itself via `tabIndex={-1}`.
- **Correction 2 (Tabs Roving Focus):** In early testing, pressing `Tab` inside the tablist traversed through all tabs sequentially, violating W3C APG. Corrected by strictly applying `tabIndex={0}` to the active tab and `tabIndex={-1}` to all inactive tabs, ensuring `Arrow` keys handle inter-tab navigation while `Tab` exits to the panel content.
- **Correction 3 (Strict TypeScript Props):** Refactored all component interfaces to ensure zero `any` types, using explicit `React.ReactNode`, `React.RefObject<HTMLElement | null>`, and discriminated union props.
