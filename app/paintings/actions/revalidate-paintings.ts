'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidatePaintings() {
  revalidateTag('paintings', 'max');
}
