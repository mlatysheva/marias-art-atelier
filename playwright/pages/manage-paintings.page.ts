import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { PaintingCardComponent } from '../components/painting-card.component';
import { PaintingFormComponent } from '../components/painting-form.component';

export class ManagePaintingsPage {
  readonly createPaintingForm: PaintingFormComponent;

  constructor(private readonly page: Page) {
    this.createPaintingForm = new PaintingFormComponent(
      page,
      'Add a new painting',
      'Create',
    );
  }

  async goto() {
    await this.page.goto('/manage-paintings');
  }

  async reload() {
    await this.page.reload();
  }

  async expectLoaded() {
    await expect(
      this.page.getByRole('heading', { name: 'Manage your paintings' }),
    ).toBeVisible();
  }

  async openCreatePainting() {
    await this.page.getByRole('button', { name: 'add' }).click();
    await this.createPaintingForm.expectVisible();
  }

  paintingCard(title: string) {
    return new PaintingCardComponent(this.page, title);
  }
}
