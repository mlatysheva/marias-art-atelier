import { API_URL } from '../shared/constants/api';

export const getFirstPaintingImagePath = (paintingId: string, paintingImages: string[]): string => {
  return `${API_URL}/images/paintings/${paintingId}/${paintingImages[0]}`;
}

export const getPaintingImages = async (paintingId: string): Promise<string[]> => {
  const folderPath = `/images/paintings/${paintingId}`;
  const res = await fetch(folderPath);
  if (!res.ok) {
    return [];
  }
  const files = await res.json();
  return files.filter((file: string) => /\.(jpe?g|png)$/i.test(file));
}