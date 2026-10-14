import { test, expect } from '@playwright/test';

test.describe('Mahi UI Hub — Core Navigation & Theme Switching', () => {
  test('should load the home page and render brand header', async ({ page }) => {
    await page.goto('/');
    
    // Expect brand name to be visible
    const brand = page.locator('#brand-logo');
    await expect(brand).toBeVisible();
    await expect(brand).toContainText('Mahi');
  });

  test('should toggle theme attribute on document root', async ({ page }) => {
    await page.goto('/');

    // Check root has data-theme
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', /.+/);

    // Open theme selector dropdown if present
    const themeBtn = page.locator('button.theme-btn').first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      // Click a different theme
      const cyberpunkBtn = page.getByRole('button', { name: /cyberpunk/i });
      if (await cyberpunkBtn.isVisible()) {
        await cyberpunkBtn.click();
        await expect(html).toHaveAttribute('data-theme', 'cyberpunk');
      }
    }
  });

  test.describe('Top-level application routes', () => {
    test('should navigate to Component Playground', async ({ page }) => {
      await page.goto('/playground');
      await expect(page).toHaveURL(/.*playground/);
      await expect(page.locator('h1, h2, span').filter({ hasText: /Component/i }).first()).toBeVisible();
    });

    test('should navigate to All 30 Projects Directory', async ({ page }) => {
      await page.goto('/projects');
      await expect(page).toHaveURL(/.*projects/);
      await expect(page.locator('h1, h2').filter({ hasText: /Projects/i }).first()).toBeVisible();
    });

    test('should navigate to Design Studios', async ({ page }) => {
      await page.goto('/studios');
      await expect(page).toHaveURL(/.*studios/);
      await expect(page.locator('h1, h2, span').filter({ hasText: /Studio/i }).first()).toBeVisible();
    });

    test('should navigate to Favorites & Bookmarks', async ({ page }) => {
      await page.goto('/favorites');
      await expect(page).toHaveURL(/.*favorites/);
    });

    test('should navigate to Platform Settings', async ({ page }) => {
      await page.goto('/settings');
      await expect(page).toHaveURL(/.*settings/);
    });
  });
});
