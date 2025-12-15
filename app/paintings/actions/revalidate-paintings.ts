'use server';

import { revalidatePath } from 'next/cache';

export default async function revalidatePaintings() {
  revalidatePath('/manage-paintings');
}
