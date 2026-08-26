# Testing Strategy Documentation

Technical guide for the FlyRank AI frontend testing suite, component test coverage, Playwright E2E primary flow, offline AI route mocking, and GitHub Actions CI workflow.

---

## Testing Architecture

This repository uses a modern, high-speed testing stack configured for React 19 and Next.js 16:

- **Vitest**: Ultra-fast unit & component test runner using Vite's transformation pipeline and Native ESM module resolution.
- **React Testing Library**: Accessibility-first component testing library asserting real user-visible behavior.
- **Playwright**: Reliable browser automation for end-to-end user journey testing under real DOM conditions.

---

## Components Covered

### 1. Chat Message Renderer (`EngineeringAssistant.tsx`)
Tests cover all 6 supported message/part types:
- **Pending/Loading State**: Verifies the button transforms into loading mode (`aria-busy="true"`) during submission.
- **Streaming Text State**: Asserts the live streaming thinking indicator (`Streaming assistant response...`) is displayed.
- **Completed Assistant Message**: Verifies the assistant message bubble renders formatted text.
- **Error State**: Verifies connection error banners and functional retry button invocation (`clearError` and `regenerate`).
- **User Message**: Asserts user query message bubbles display with appropriate role styling.
- **Tool Result Embedding**: Tests embedding of structured `ProjectDetailsCard` components for AI tool outputs.

### 2. Validated Contact Form (`ContactForm.tsx`)
Tests cover all form lifecycle states:
- **Form Layout**: Verifies input labels (`Full Name`, `Email Address`, `Subject`, `Message`) and submit button accessible names.
- **Empty Submission**: Asserts required field validation errors (`role="alert"`) are displayed upon submitting empty fields.
- **Invalid Email Rejection**: Verifies email format validation rejects invalid strings (`not-an-email`).
- **Successful Submission**: Asserts valid submissions call `onSubmitSuccess`, display accessible status feedback (`role="status"`), and clear inputs.

### 3. Tool Result Component (`ProjectDetailsCard.tsx`)
Tests cover AI tool output handling:
- **Structured Rendering**: Asserts project name, problem statement, technology tags, engineering decisions, and GitHub/Demo links render correctly.
- **Safe Fallback**: Asserts `NoResultCard` renders gracefully when output is `null`, `undefined`, or returns `found: false`.
- **Zero Raw JSON**: Verifies raw JSON objects are never rendered directly to the user.

---

## Playwright E2E Primary Flow

The Playwright test suite (`e2e/chat-flow.spec.ts`) automates the core user workflow:

1. **Navigation**: Opens the application at `/assistant`.
2. **User Interaction**: Locates the AI query input field using `getByPlaceholderText` and types a query ("Tell me about the AI Video Restoration Pipeline.").
3. **Route Interception**: Intercepts `/api/assistant` network requests to return a deterministic SSE stream response offline.
4. **Submission**: Clicks the Send button.
5. **Output Verification**: Asserts user message bubble and final streamed assistant response appear on screen.

---

## Offline AI Route Mocking

To ensure test suites remain 100% deterministic, offline-capable, and fast:
- **No Real Provider Calls**: Unit and E2E tests never invoke live OpenAI API endpoints or require API keys.
- **Vitest Mocking**: `@ai-sdk/react` (`useChat`) is mocked using Vitest `vi.fn()` mocks to return exact message arrays and status states.
- **Playwright Interception**: Playwright `page.route('**/api/assistant', ...)` intercepts network calls at the browser layer.

---

## Accessibility-First Testing

Tests strictly enforce W3C ARIA accessibility standards:
- **Accessible Queries**: Uses `getByRole`, `findByRole`, `getByLabelText`, and `getByText`.
- **No Brittle CSS Queries**: Tests never query by CSS class names or internal DOM structures.
- **ARIA Semantics**: Validates `role="alert"`, `role="status"`, `aria-busy`, `aria-disabled`, and `aria-live` attributes.

---

## Continuous Integration (CI)

The GitHub Actions workflow (`.github/workflows/test.yml`) executes automatically on every `push` and `pull_request`:

1. Checkout repository (`actions/checkout@v4`).
2. Setup Node.js 20 (`actions/setup-node@v4`).
3. Install dependencies (`npm ci`).
4. Execute TypeScript typecheck (`npx tsc --noEmit`).
5. Execute ESLint linting (`npm run lint`).
6. Execute Vitest component test suite (`npm run test`).
7. Install Playwright Chromium browser (`npx playwright install --with-deps chromium`).
8. Execute Playwright E2E tests (`npm run test:e2e`).
