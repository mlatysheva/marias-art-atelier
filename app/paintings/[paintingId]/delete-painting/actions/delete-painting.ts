import { redirect } from 'next/navigation';
import { API_URL } from '../../../../shared/constants/api';

export default async function deletePainting(paintingId: string) {
  try {
    const res = await fetch(`${API_URL}/paintings/${paintingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      redirect('/');
    } else {
      console.error("Failed to delete painting");
    }
  } catch (err) {
    console.error("Error deleting painting", err);
  }
}