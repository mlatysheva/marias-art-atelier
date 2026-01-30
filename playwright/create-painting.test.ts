import { test, expect } from '@playwright/test';

test('create painting from manage page and open edit view', async ({
  page,
}) => {
  const paintingTitle = `E2E Painting ${Date.now()}`;

  await page.goto('/manage-paintings');
  await expect(
    page.getByRole('heading', { name: 'Manage your paintings' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'add' }).click();
  await expect(
    page.getByRole('heading', { name: 'Add a new painting' }),
  ).toBeVisible();

  await page.getByLabel('Title').fill(paintingTitle);
  await page.getByLabel('Tags').fill('ocean, blue, light, abstract, e2e');
  await page
    .getByLabel('Description')
    .fill('E2E test painting created by Playwright.');
  await page.getByLabel('Artist').fill('E2E Artist');
  await page.getByLabel('Price').fill('150');
  await page.getByLabel('Width').fill('50');
  await page.getByLabel('Height').fill('40');

  await page.locator('#medium').click();
  await page.getByRole('option', { name: 'Oil' }).click();
  await page.locator('#base').click();
  await page.getByRole('option', { name: 'Paper' }).click();

  await page.locator('input[type="file"][name="image"]').setInputFiles({
    name: 'e2e-painting.png',
    mimeType: 'image/png',
    buffer: Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=',
      'base64',
    ),
  });
  await expect(page.getByText('e2e-painting.png')).toBeVisible();

  await page.getByRole('button', { name: 'Create' }).click();
  await expect(
    page.getByRole('heading', { name: 'Add a new painting' }),
  ).toBeHidden();

  await page.reload();
  await expect(
    page.getByRole('heading', { name: paintingTitle }),
  ).toBeVisible();

  const paintingCard = page
    .getByRole('heading', { name: paintingTitle })
    .locator('xpath=ancestor::*[contains(@class,"MuiCard-root")]');
  await paintingCard.getByRole('button', { name: 'edit' }).click();
  await expect(page).toHaveURL('http://localhost:3000/manage-paintings');
  await expect(
    page.getByRole('heading', { name: 'Edit the painting' }),
  ).toBeVisible();
  await expect(page.getByLabel('Title')).toHaveValue(paintingTitle);

  await page.goto('/manage-paintings');
  await expect(
    page.getByRole('heading', { name: paintingTitle }),
  ).toBeVisible();
  page.once('dialog', (dialog) => dialog.accept());
  const deleteCard = page
    .getByRole('heading', { name: paintingTitle })
    .locator('xpath=ancestor::*[contains(@class,"MuiCard-root")]');
  await deleteCard.getByRole('button', { name: 'delete' }).click();
  await expect(page.getByRole('heading', { name: paintingTitle })).toHaveCount(
    0,
  );
});
