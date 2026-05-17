import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

// spec: specs/playwright-e2e-test-plan.md
// seed: playwright/seed.spec.ts

test.use({ storageState: { cookies: [], origins: [] } });

test('login validation and authentication error handling', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Open `/auth/login`.
  await loginPage.goto();
  await loginPage.expectLoaded();

  // 2. Submit invalid email and short password.
  await loginPage.fillCredentials('invalid-email', '123');
  await loginPage.submit();

  // 3. Verify validation errors are shown.
  await loginPage.expectEmailValidationMessage();
  await expect(page).toHaveURL('/auth/login');

  // 4. Submit valid-format credentials that are incorrect.
  await loginPage.fillCredentials(
    `wrong-user-${Date.now()}@example.com`,
    'Password123!',
  );
  await loginPage.submit();

  // 5. Verify server error alert is shown and user remains on login page.
  await expect(loginPage.errorAlert).toBeVisible();
  await expect(page).toHaveURL('/auth/login');
});
