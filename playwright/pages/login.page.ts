import type { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  readonly form = this.page.locator('form');

  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.form.getByRole('button', { name: 'Login' }).click();
  }
}
