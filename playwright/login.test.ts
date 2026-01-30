import { test, expect } from '@playwright/test';

const user = process.env.PLAYWRIGHT_USER;
const password = process.env.PLAYWRIGHT_PASSWORD;

test('login e2e user', async ({ page }) => {
  if (!user || !password) {
    throw new Error(
      'Missing PLAYWRIGHT_USER or PLAYWRIGHT_PASSWORD in playwright/.env',
    );
  }

  await page.goto('/auth/login');
  await page.getByLabel('Email').fill(user);
  await page.getByLabel('Password').fill(password);
  await page.locator('form').getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/');
  await expect(
    page.getByRole('heading', { name: 'Available paintings' }),
  ).toBeVisible();
});
