import { test, expect } from '@playwright/test';

test('home page loads and shows program title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(
    page.getByRole('heading', { name: 'Durableq Kiddies Motor Skills Program' })
  ).toBeVisible();

  await expect(
    page.getByText('Ages 5–12')
  ).toBeVisible();
});
