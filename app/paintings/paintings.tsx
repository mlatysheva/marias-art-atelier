import { Typography } from '@mui/material';
import {
  getPaintings,
  getPaintingsOfLoggedUser,
} from './actions/get-paintings';
import PaintingsGrid from './paintings-grid';

interface PaintingsProps {
  adminView?: boolean;
}

export default async function Paintings({ adminView = false }: PaintingsProps) {
  const paintings = adminView
    ? await getPaintingsOfLoggedUser()
    : await getPaintings();

  return (
    <>
      {adminView ? (
        <Typography variant="h3" sx={{ mb: 3 }}>
          Manage your paintings
        </Typography>
      ) : (
        <Typography variant="h3" sx={{ mb: 3 }}>
          Available paintings
        </Typography>
      )}
      <PaintingsGrid paintings={paintings} adminView={adminView} />
    </>
  );
}
