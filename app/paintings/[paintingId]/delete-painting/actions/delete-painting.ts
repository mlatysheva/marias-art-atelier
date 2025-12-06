import { API_URL } from '../../../../shared/constants/api';

export default async function deletePainting(paintingId: string) {
  const res = await fetch(`${API_URL}/paintings/${paintingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return res;
}
