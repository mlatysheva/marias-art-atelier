"use server";

import { revalidateTag } from 'next/cache';
import { getHeaders, post } from '../../shared/utils/fetch';
import { API_URL } from '../../shared/constants/api';

export default async function createPainting(formData: FormData) {
  const response = await post("paintings", formData);
  const paintingImage = formData.get('image');
  if (paintingImage && !response.error) {
    uploadPaintingImage(response.data.id, [paintingImage as File]);
  }
  revalidateTag('paintings');
  return response;
}

export async function uploadPaintingImage(paintingId: string, files: File[]) {
  const formData = new FormData();
  files.forEach(async (file) => { 
    formData.append("image", file);
    await fetch (`${API_URL}/paintings/${paintingId}/image`, {
      body: formData,
      method: 'POST',
      headers: await getHeaders(),
    });
  });
  
}