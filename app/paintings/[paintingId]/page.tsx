interface SinglePaintingProps {
  params: {
    paintingId: string;
  };
}

export default async function SinglePainting({ params }: SinglePaintingProps) {
  return (<p>Single Painting {(await params).paintingId}</p>);
}