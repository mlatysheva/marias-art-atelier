import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  readonly form = this.page.locator('form');
  readonly emailInput = this.page.getByLabel('Email');
  readonly passwordInput = this.page.getByLabel('Password');
  readonly submitButton = this.form.getByRole('button', { name: 'Login' });
  readonly errorAlert = this.page.getByRole('alert');

  async goto() {
    await this.page.goto('/auth/login');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL('/auth/login');
    await expect(this.form).toBeVisible();
  }

  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.submit();
  }

  async expectEmailValidationMessage() {
    await expect(this.emailInput).toBeFocused();
    await expect(this.emailInput).not.toHaveJSProperty('validationMessage', '');
  }

  async expectErrorAlertContains(text: string) {
    await expect(this.errorAlert).toContainText(text);
  }
}
