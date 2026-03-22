import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class PaintingCardComponent {
  constructor(
    private readonly page: Page,
    private readonly paintingTitle: string,
  ) {}

  get heading() {
    return this.page.getByRole('heading', {
      name: this.paintingTitle,
      exact: true,
    });
  }

  get root() {
    return this.heading.locator(
      'xpath=ancestor::*[contains(@class,"MuiCard-root")]',
    );
  }

  async expectVisible() {
    await expect(this.heading).toBeVisible();
  }

  async expectMissing() {
    await expect(this.heading).toHaveCount(0);
  }

  async openEdit() {
    await this.root.getByRole('button', { name: 'edit' }).click();
  }

  async delete() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.root.getByRole('button', { name: 'delete' }).click();
  }
}
