import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { PaintingFormComponent } from '../components/painting-form.component';

export class EditPaintingPage {
  readonly form: PaintingFormComponent;

  constructor(private readonly page: Page) {
    this.form = new PaintingFormComponent(page, 'Edit the painting', 'Update');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/manage-paintings\/[^/]+$/);
    await this.form.expectVisible();
  }
}
