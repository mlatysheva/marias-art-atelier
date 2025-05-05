import getPaintings from './actions/get-paintings';
import PaintingsGrid from './paintings-grid';

export default async function Paintings() {
    const paintings = await getPaintings();

    return (
     <PaintingsGrid paintings={paintings} />
    )
}