"use server";

import { revalidateTag } from 'next/cache';
import { patch } from '../../shared/utils/fetch';
import { uploadPaintingImages } from '../../paintings/create-painting/create-painting';

export default async function updatePainting(paintingId: string, formData: FormData) {
  const payload = Object.fromEntries(formData.entries());
  // Remove images from payload
  delete payload.image; 

  const response = await patch(`paintings/${paintingId}`, payload);
  const paintingImages = formData.getAll('image') as File[];
  
  if (paintingImages.length > 0 && !response.error) {
    uploadPaintingImages(response.data.id, paintingImages);
  }

  revalidateTag('paintings');
  return response;
}
