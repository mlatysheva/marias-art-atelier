'use server';

import { revalidateTag } from 'next/cache';
import { patch } from '../../shared/utils/fetch';
import { uploadPaintingImages } from '../../paintings/create-painting/create-painting';

export default async function updatePainting(
  paintingId: string,
  formData: FormData,
) {
  const payload: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    if (key === 'image') return;
    payload[key] = value;
  });

  if (typeof payload.tags === 'string') {
    payload.tags = payload.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .join(', ');
  }

  ['year', 'price', 'width', 'height'].forEach((field) => {
    const value = payload[field];
    if (typeof value === 'string' && value.length > 0) {
      payload[field] = Number(value);
    }
  });

  const response = await patch(`paintings/${paintingId}`, payload);
  const paintingImages = formData.getAll('image') as File[];

  if (paintingImages.length > 0 && !response.error) {
    await uploadPaintingImages(response.data.id, paintingImages);
  }

  revalidateTag('paintings', 'max');
  return response;
}
