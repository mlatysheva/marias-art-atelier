"use server";

import { revalidateTag } from 'next/cache';
import { post } from '../../shared/utils/fetch';

export default async function createPainting(formData: FormData) {
  const response = post("paintings", formData);
  revalidateTag('paintings');
  return response;
}