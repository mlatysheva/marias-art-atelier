import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { PaintingFormComponent } from '../components/painting-form.component';

export class EditPaintingPage {
  readonly form: PaintingFormComponent;

  constructor(private readonly page: Page) {
    this.form = new PaintingFormComponent(page, 'Edit the painting', 'Update');
  }

  async expectLoaded() {
    // Support both route shapes:
    // - /manage-paintings/:id (dedicated edit route)
    // - /manage-paintings (inline/edit-in-place variant)
    await expect(this.page).toHaveURL(
      /\/manage-paintings(?:\/[^/?#]+)?(?:[?#].*)?$/,
    );
    await this.form.expectVisible();
  }
}
