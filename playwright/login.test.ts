import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { authFile, getRequiredCredentials } from './helpers/auth';
import { AvailablePaintingsPage } from './pages/available-paintings.page';
import { LoginPage } from './pages/login.page';

test('login e2e user', async ({ page }) => {
  const { user, password } = getRequiredCredentials();
  const loginPage = new LoginPage(page);
  const availablePaintingsPage = new AvailablePaintingsPage(page);

  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  await loginPage.goto();
  await loginPage.login(user, password);
  await availablePaintingsPage.expectLoaded();

  await page.context().storageState({ path: authFile });
});
