import { get } from '../../shared/utils/fetch';
import { Painting } from '../interfaces/painting.interface';

export default async function getPainting(paintingId: string) {
  return get<Painting>(`paintings/${paintingId}`);
}
