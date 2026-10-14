import { test, expect } from '@playwright/test';

test.describe('Component Code & Standalone Package Exporter', () => {
  test('should display Export ZIP Project button and Single File Download', async ({ page }) => {
    await page.goto('/playground');

    // Locate Export ZIP Project button
    const zipBtn = page.getByRole('button', { name: /Export ZIP Project/i });
    await expect(zipBtn).toBeVisible();

    // Locate single file download button
    const fileBtn = page.getByRole('button', { name: /Download File/i });
    await expect(fileBtn).toBeVisible();

    // Locate Copy Code button
    const copyBtn = page.getByRole('button', { name: /Copy Code/i });
    await expect(copyBtn).toBeVisible();
  });
});
