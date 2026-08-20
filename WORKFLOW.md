# AI-Assisted Development Workflow Comparison

## 1. Experiment Setup

The same contact-form feature was implemented twice on separate branches from `master`.

- **Round 1 (`ai-vague`):** one vague prompt — “Add a contact form to the site.” — saved in `experiment/round1-vague-prompt.md`. Files: `contact.html`, `css/contact.css`, `js/contact.js`.
- **Round 2 (`ai-precise`):** a written specification with file list, accessibility constraints, edge cases, and a verification command — saved in `experiment/round2-precise-spec.md`. Files: the same three plus `js/validate.js`, `tests/validate.test.js`, and `package.json`.

Evidence: `git diff --stat ai-vague..ai-precise` shows 8 paths changed (+318 / −41 lines).

## 2. Correctness

On `ai-vague`, `js/contact.js` treats any non-empty string as valid (`if (!name || !email || !message)`), checks email only with `email.includes("@")`, and sets status to “Message sent!” with no server. Whitespace-only input such as `"   "` therefore passes.

On `ai-precise`, validation lives in `js/validate.js` (`validateContact`, `isValidEmail`). Values are trimmed; emails need `@` and a dotted domain; success copy states the demo was not sent to a server. HTML adds `maxlength` (100 / 254 / 2000) and `novalidate` so custom checks run.

## 3. Accessibility

`ai-vague` `contact.html` uses placeholders only—no `<label for="...">`, no per-field errors, no `aria-*`. Status is a plain `#status` paragraph. CSS has no explicit `:focus` outline rules.

`ai-precise` uses visible labels, `aria-describedby` tied to `#name-error` / `#email-error` / `#message-error`, `aria-invalid` on failure, and `#form-status` with `role="alert"` and `aria-live="polite"`. `js/contact.js` focuses the first invalid control. `css/contact.css` defines `:focus` outlines and invalid border color.

## 4. Edge Cases

| Case | `ai-vague` | `ai-precise` |
|------|------------|--------------|
| Empty fields | Partial (`required` + JS) | Field errors + trim |
| Whitespace-only | Accepted | Rejected in `validateContact` |
| `a@b` (no domain dot) | Accepted (`includes("@")`) | Rejected (`isValidEmail`) |
| Over-length input | No `maxlength` / JS cap | Attributes + JS limits |

## 5. Testing and Verification

`ai-vague` has no `tests/` directory and no `package.json` test script.

`ai-precise` includes `tests/validate.test.js`. Observed run: `node --test tests/validate.test.js` → **4 passed, 0 failed** (empty/whitespace, valid payload, email rules, name maxlength).

## 6. Review Effort

Exact review minutes were not measured. Qualitatively, Round 1 was fewer files but needed manual HTML/JS reading to spot label and whitespace gaps. Round 2 added more files to read, while the four automated tests reduced uncertainty about validation rules.

## 7. AI Mistake I Caught

During review of `ai-vague`, I caught that `contact.html` relied on placeholders instead of `<label>` elements, and that `js/contact.js` accepts whitespace-only fields because it never trims before the truthiness check. Both are visible in the Round 1 sources and fixed on `ai-precise`.

## 8. Lesson

A one-line prompt produced a runnable form that still failed basic accessibility and edge cases. A short written spec with constraints, edge cases, and `node --test` produced code whose validation behavior is checked in-repo. AI output still needs human review; specifications and tests make that review concrete instead of guesswork.
