export interface Painting {
  id: string,
  title: string,
  artist: string,
  year: number,
  description: string,
  tags: string[],
  dimensions: number[],
  materials: string[],
  price: number,
  userId: string,
  imageExists: boolean,
  images: string[],
}