'use server';
import { post } from '../../shared/utils/fetch';

export default async function checkout(paintingId: string) {
  return post('checkout/session', { paintingId });
}
