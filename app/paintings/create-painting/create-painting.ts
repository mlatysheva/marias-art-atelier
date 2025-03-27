"use server";

import { post } from '../../shared/utils/fetch';

export default async function createPainting(formData: FormData) {
  return post("paintings", formData);
}