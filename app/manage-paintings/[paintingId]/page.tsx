import getPainting from '../../paintings/[paintingId]/get-painting';
import EditPaintingForm from './edit-painting-form';

interface EditPaintingProps {
  params: Promise<{ paintingId: string }>;
}

export default async function EditPainting(props: EditPaintingProps) {
  const params = await props.params;
  const painting = await getPainting(params.paintingId);

  if (!painting) {
    return <p>Painting not found</p>;
  }

  return <EditPaintingForm painting={painting} />;
}
