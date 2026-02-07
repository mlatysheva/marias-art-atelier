'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export default async function revalidatePaintings() {
  revalidateTag('paintings', 'max');
  revalidatePath('/');
  revalidatePath('/manage-paintings');
}
