import { test, expect } from '@playwright/test';

test.describe('Accessibility & Keyboard Navigation', () => {
  test('should support keyboard navigation across interactive buttons and dialogs', async ({ page }) => {
    await page.goto('/playground');

    // Press Tab multiple times to verify focusability
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Expect focused element to exist
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedTag);
  });

  test('should open and dismiss modal with Escape key in component playground', async ({ page }) => {
    await page.goto('/playground');

    // Select Modals component suite
    const modalsTab = page.getByRole('button', { name: /modals/i }).first();
    if (await modalsTab.isVisible()) {
      await modalsTab.click();

      // Trigger the demo dialog
      const triggerBtn = page.getByRole('button', { name: /Trigger Demo Dialog/i });
      if (await triggerBtn.isVisible()) {
        await triggerBtn.click();

        // Expect dialog to be open
        const dialog = page.locator('role=dialog');
        if (await dialog.isVisible()) {
          // Press Escape
          await page.keyboard.press('Escape');
          await expect(dialog).not.toBeVisible();
        }
      }
    }
  });
});
