import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class AvailablePaintingsPage {
  constructor(private readonly page: Page) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL('/');
    await expect(
      this.page.getByRole('heading', { name: 'Available paintings' }),
    ).toBeVisible();
  }
}
