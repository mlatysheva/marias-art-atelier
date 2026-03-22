import { test } from '@playwright/test';
import {
  buildPaintingFormInput,
  createTestPaintingImage,
} from './helpers/painting-test-data';
import { EditPaintingPage } from './pages/edit-painting.page';
import { ManagePaintingsPage } from './pages/manage-paintings.page';

test('create painting from manage page and open edit view', async ({
  page,
}) => {
  const paintingTitle = `E2E Painting ${Date.now()}`;
  const managePaintingsPage = new ManagePaintingsPage(page);
  const editPaintingPage = new EditPaintingPage(page);
  const paintingDetails = buildPaintingFormInput(paintingTitle);

  await managePaintingsPage.goto();
  await managePaintingsPage.expectLoaded();

  await managePaintingsPage.openCreatePainting();
  await managePaintingsPage.createPaintingForm.fill(paintingDetails);
  await managePaintingsPage.createPaintingForm.uploadImage(
    createTestPaintingImage(),
  );
  await managePaintingsPage.createPaintingForm.expectUploadedFile(
    'e2e-painting.png',
  );
  await managePaintingsPage.createPaintingForm.submit();
  await managePaintingsPage.createPaintingForm.expectHidden();

  await managePaintingsPage.reload();
  const paintingCard = managePaintingsPage.paintingCard(paintingTitle);
  await paintingCard.expectVisible();

  await paintingCard.openEdit();
  await editPaintingPage.expectLoaded();
  await editPaintingPage.form.expectTitleValue(paintingTitle);

  await managePaintingsPage.goto();
  await paintingCard.expectVisible();
  await paintingCard.delete();
  await paintingCard.expectMissing();
});
