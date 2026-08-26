# Motion & State Lifecycle Specifications

Technical documentation for the AI Assistant Send button state machine, compositor motion rules, interruptibility handling, and reduced motion accessibility.

---

## State Model

The button component enforces 7 discrete lifecycle states:

1. **IDLE**: The resting state. Displays the primary label ("Send") and action icon (`Send`).
2. **HOVER / FOCUS**: Triggered on pointer hover or keyboard focus navigation. Applies subtle elevation and scale transformations (`scale(1.02)`), while maintaining a visible 3px focus ring (`--focus: #2f6f82`).
3. **ACTIVE / PRESSED**: Micro-compression state (`scale(0.97)`) communicating tactile click feedback without triggering layout shifts (CLS).
4. **LOADING**: Active async operation. Label and icon transition into a spinning indicator (`Loader2`) with pulse feedback. Button dimensions remain bounded (`min-w-[100px]`, `h-[40px]`), and duplicate submit events are strictly blocked (`aria-busy="true"`).
5. **SUCCESS**: Async completion feedback. Features a spring scale pop (`scale(1.05)` to `scale(1)`), green accent background (`bg-emerald-700`), checkmark icon (`Check`), and automatic timer return to `IDLE` state after 1800ms (`aria-live="polite"`).
6. **ERROR**: Async failure or network error state. Features a subtle horizontal shake animation (`translateX(-4px)` to `translateX(4px)`), red alert background (`bg-red-700`), and a "Retry" affordance (`RotateCcw`). Re-clicking triggers the retry callback (`aria-live="assertive"`).
7. **DISABLED**: Non-interactive state when text input is empty or form is inert. Communicated via reduced opacity (`opacity-60`), `cursor-not-allowed`, and `aria-disabled="true"` while preserving accessible visual contrast.

---

## Motion Decisions

All animation timings and easings were selected to match modern OS design systems and fit within natural human perceptual thresholds:

| Transition Phase | Duration | Easing Curve | Rationale |
| :--- | :--- | :--- | :--- |
| **Micro Hover / Focus** | `150ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard Material ease-out curve. Feels crisp without introducing perceptional lag. |
| **Press Feedback** | `120ms` | `cubic-bezier(0, 0, 0.2, 1)` | Rapid deceleration for immediate tactile response upon `mousedown`/`keydown`. |
| **Loading Transition** | `200ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth cross-fade between text label and loading spinner. |
| **Success Feedback (Pop)** | `220ms` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Subtle elastic overshoot (spring effect) confirming success visually. |
| **Error Feedback (Shake)**| `250ms` | `cubic-bezier(0.36, 0.07, 0.19, 0.97)`| Multi-stage horizontal displacement signaling rejection without disorienting the user. |

---

## Why Transform/Opacity

All animations strictly utilize GPU compositor-friendly properties:

- `transform` (`scale`, `translateX`, `rotate`)
- `opacity`

### Performance Rationale
1. **Zero Layout Thrashing**: Animating layout properties (such as `width`, `height`, `margin`, or `padding`) forces the browser engine to perform expensive layout recalculation (Reflow) and Paint steps on the main thread for every frame.
2. **GPU Compositing Thread Execution**: `transform` and `opacity` bypass main-thread rendering and run directly on the GPU compositor thread, guaranteeing consistent 60/120 FPS rendering even under heavy JS execution.
3. **Container Dimension Bounding**: Fixed height (`h-[40px]`) and minimum width (`min-w-[100px]`) prevent content layout shifts (CLS = 0) when switching between labels ("Send" vs "Sending..." vs "Retry").

---

## Interruptibility & State Safety

To prevent state corruption, race conditions, or memory leaks during rapid interaction:

1. **State Machine Guards**: During `LOADING` state, click handlers block secondary submit invocations unless `showStopInLoading` is explicitly enabled.
2. **Timer Cleanup**: All internal timeout references (such as auto-resetting `SUCCESS` → `IDLE` or clearing `isShaking`/`isPopping` states) are managed via React `useRef` and automatically cleared on state changes or component unmount.
3. **Rapid Clicks**: Repeated rapid clicking in `ERROR` or `IDLE` state safely triggers the click callback without stacking keyframe animations or duplicating async requests.

---

## Reduced Motion (`prefers-reduced-motion`)

The motion system fully respects accessibility preferences (`@media (prefers-reduced-motion: reduce)`):

- **Decorative Motion**: Keyframe shake (`animate-btn-shake`), spring pop (`animate-btn-pop`), and spinner rotation (`animate-btn-spin`) are disabled (`animation: none !important`, `transform: none !important`).
- **Feedback Preservation**: Color changes (green for success, red for error), text label updates ("Sent!", "Retry"), and ARIA live announcements remain 100% active and readable. Functional feedback is never removed.
