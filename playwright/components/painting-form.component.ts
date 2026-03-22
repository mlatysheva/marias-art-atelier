import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import type { PaintingFormInput } from '../helpers/painting-test-data';
import type { TestFilePayload } from '../helpers/painting-test-data';

export class PaintingFormComponent {
  constructor(
    private readonly page: Page,
    private readonly headingName: string,
    private readonly submitButtonName: string,
  ) {}

  readonly titleInput = this.page.getByLabel('Title');
  readonly tagsInput = this.page.getByLabel('Tags');
  readonly descriptionInput = this.page.getByLabel('Description');
  readonly artistInput = this.page.getByLabel('Artist');
  readonly priceInput = this.page.getByLabel('Price');
  readonly widthInput = this.page.getByLabel('Width');
  readonly heightInput = this.page.getByLabel('Height');
  readonly imageInput = this.page.locator('input[type="file"][name="image"]');

  get heading() {
    return this.page.getByRole('heading', { name: this.headingName });
  }

  get submitButton() {
    return this.page.getByRole('button', { name: this.submitButtonName });
  }

  async expectVisible() {
    await expect(this.heading).toBeVisible();
  }

  async expectHidden() {
    await expect(this.heading).toBeHidden();
  }

  async fill(details: PaintingFormInput) {
    await this.titleInput.fill(details.title);
    await this.tagsInput.fill(details.tags);
    await this.descriptionInput.fill(details.description);
    await this.artistInput.fill(details.artist);
    await this.priceInput.fill(details.price);
    await this.widthInput.fill(details.width);
    await this.heightInput.fill(details.height);
    await this.selectOption('medium', details.medium);
    await this.selectOption('base', details.base);
  }

  async selectOption(fieldId: 'medium' | 'base', optionName: string) {
    await this.page.locator(`#${fieldId}`).click();
    await this.page.getByRole('option', { name: optionName }).click();
  }

  async uploadImage(file: TestFilePayload | TestFilePayload[]) {
    await this.imageInput.setInputFiles(file);
  }

  async expectUploadedFile(fileName: string) {
    await expect(this.page.getByText(fileName)).toBeVisible();
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectTitleValue(expectedTitle: string) {
    await expect(this.titleInput).toHaveValue(expectedTitle);
  }
}
