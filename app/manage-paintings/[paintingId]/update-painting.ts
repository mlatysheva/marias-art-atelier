'use server';

import { revalidateTag } from 'next/cache';
import { getHeaders, patch } from '../../shared/utils/fetch';
import { API_URL } from '../../shared/constants/api';

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

  const imagesToKeepRaw = formData.get('imagesToKeep') as string;
  const imagesToKeep = imagesToKeepRaw ? JSON.parse(imagesToKeepRaw) : [];
  const newFiles = formData.getAll('image') as File[];

  if ((newFiles.length > 0 || imagesToKeep.length > 0) && !response.error) {
    await updatePaintingImages(response.data.id, newFiles, imagesToKeep);
  }

  revalidateTag('paintings', 'max');
  return response;
}

export async function updatePaintingImages(
  paintingId: string,
  newFiles: File[],
  imagesToKeep: string[],
) {
  const formData = new FormData();
  newFiles.forEach((file) => formData.append('image', file));
  imagesToKeep.forEach((fileName) => formData.append('imagesToKeep', fileName));

  await fetch(`${API_URL}/paintings/${paintingId}/images`, {
    body: formData,
    method: 'PATCH',
    headers: await getHeaders(),
  });
}
