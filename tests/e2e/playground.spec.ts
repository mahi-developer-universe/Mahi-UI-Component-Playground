import { test, expect } from '@playwright/test';

test.describe('Component Playground — Workbench & Live Sandbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playground');
  });

  test('should display component suite tabs and switch between buttons, badges, and cards', async ({ page }) => {
    // Buttons should be initially active or selectable
    const buttonsTab = page.getByRole('button', { name: /buttons/i }).first();
    await expect(buttonsTab).toBeVisible();

    // Switch to Badges
    const badgesTab = page.getByRole('button', { name: /badges/i }).first();
    await badgesTab.click();
    await expect(page.locator('span.badge').first()).toBeVisible();

    // Switch to Cards
    const cardsTab = page.getByRole('button', { name: /cards/i }).first();
    await cardsTab.click();
    await expect(page.locator('h4').first()).toBeVisible();
  });

  test('should switch viewport widths (Mobile, Tablet, Desktop, Full)', async ({ page }) => {
    const mobileBtn = page.getByTitle(/Mobile/i);
    await expect(mobileBtn).toBeVisible();
    await mobileBtn.click();

    const tabletBtn = page.getByTitle(/Tablet/i);
    await tabletBtn.click();

    const desktopBtn = page.getByTitle(/Desktop/i);
    await desktopBtn.click();
  });

  test('should switch to Live Sandbox mode and mount isolated iframe preview', async ({ page }) => {
    // Click Live Sandbox mode button
    const liveSandboxTab = page.getByRole('button', { name: /Live Sandbox/i });
    await expect(liveSandboxTab).toBeVisible();
    await liveSandboxTab.click();

    // Verify textarea editor is rendered
    const codeArea = page.locator('textarea');
    await expect(codeArea).toBeVisible();

    // Verify isolated iframe is mounted
    const iframe = page.locator('iframe[title="Mahi UI Component Live Sandbox"]');
    await expect(iframe).toBeVisible();

    // Verify language switcher (HTML, CSS, JS)
    const cssBtn = page.getByRole('button', { name: /^CSS$/i });
    await cssBtn.click();
    await expect(codeArea).toHaveValue(/Custom Component Styles|\.interactive-box/);
  });
});
