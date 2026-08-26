import { test, expect } from "@playwright/test";

test.describe("AI Assistant Primary User Flow", () => {
  test("user can navigate to assistant, send a prompt, and receive AI response", async ({ page }) => {
    // 1. Open AI Assistant page
    await page.goto("/assistant");

    // 2. Verify page header
    await expect(page.getByRole("heading", { name: /portfolio engineering assistant/i })).toBeVisible();

    // 3. Locate text input and enter query
    const input = page.getByPlaceholder(/ask about ai pipelines/i);
    await expect(input).toBeVisible();
    await input.fill("Tell me about the AI Video Restoration Pipeline.");

    // 4. Click Send button
    const sendButton = page.getByRole("button", { name: /send/i });
    await expect(sendButton).toBeEnabled();
    await sendButton.click();

    // 5. Verify user message appears in chat history
    await expect(page.getByText("You", { exact: true })).toBeVisible();

    // 6. Verify assistant response streams and displays output card
    await expect(page.getByText("Portfolio Assistant", { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("heading", { name: /ai video restoration pipeline/i })).toBeVisible({ timeout: 10000 });
  });
});
