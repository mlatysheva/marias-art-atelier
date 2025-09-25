import CreatePaintingFab from '../paintings/create-painting/create-painting-fab';
import Paintings from '../paintings/paintings';

export default async function ManagePaintings() {
  return (
    <>
      <Paintings adminView={true} />
      <CreatePaintingFab />
    </>
  );
}
