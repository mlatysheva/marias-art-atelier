import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

// spec: specs/playwright-e2e-test-plan.md
// seed: playwright/seed.spec.ts

test.use({ storageState: { cookies: [], origins: [] } });

test('Route protection and redirect behavior', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Directly navigate to `/`.
  await page.goto('/');

  // 2. Verify redirect to `/auth/login`.
  await expect(page).toHaveURL('/auth/login');
  await loginPage.expectLoaded();

  // 3. Navigate to `/manage-paintings`.
  await page.goto('/manage-paintings');

  // 4. Verify redirect to `/auth/login`.
  await expect(page).toHaveURL('/auth/login');
  await loginPage.expectLoaded();
});
