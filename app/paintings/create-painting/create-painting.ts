'use server';

import { revalidatePath } from 'next/cache';
import { getHeaders, post } from '../../shared/utils/fetch';
import { API_URL } from '../../shared/constants/api';

export default async function createPainting(formData: FormData) {
  const response = await post('paintings', formData);
  const paintingImages = formData.getAll('image') as File[];

  if (paintingImages.length > 0 && !response.error) {
    await uploadPaintingImages(response.data.id, paintingImages);
  }

  revalidatePath('/manage-paintings');

  return response;
}

export async function uploadPaintingImages(paintingId: string, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append('image', file));

  await fetch(`${API_URL}/paintings/${paintingId}/images`, {
    body: formData,
    method: 'POST',
    headers: await getHeaders(),
  });
}
