'use server';

import { get } from '../../shared/utils/fetch';
import { Painting } from '../interfaces/painting.interface';

export async function getPaintings() {
  return get<Painting[]>(
    'paintings',
    ['paintings'],
    new URLSearchParams({ status: 'available' }),
  );
}

export async function getPaintingsOfLoggedUser() {
  return get<Painting[]>('paintings/admin', ['paintings']);
}
