import CreatePaintingFab from './paintings/create-painting/create-painting-fab';
import Paintings from './paintings/paintings';

export default async function Home() {
  return (
    <>
      <Paintings />
      <CreatePaintingFab />
    </>
  );
}
