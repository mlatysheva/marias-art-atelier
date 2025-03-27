"use server";

import { get } from '../../shared/utils/fetch';
import { Painting } from '../interfaces/painting.interface';

export default async function getPaintings() {
  return get<Painting[]>('paintings');
}