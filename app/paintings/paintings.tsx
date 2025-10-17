import { Typography } from '@mui/material';
import refreshAuthentication from '../auth/actions/refresh-authentication';
import AuthRefresher from '../auth/auth-refresher';
import { UnauthorizedError } from '../shared/utils/fetch';
import { getPaintings, getPaintingsOfLoggedUser } from './actions/get-paintings';
import PaintingsGrid from './paintings-grid';

interface PaintingsProps {
  adminView?: boolean;
}

export default async function Paintings({ adminView = false }: PaintingsProps) {
  let paintings: Awaited<ReturnType<typeof getPaintings>> = [];
  let shouldRefreshAuth = false;

  try {
    paintings = adminView ? await getPaintingsOfLoggedUser() : await getPaintings();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      shouldRefreshAuth = true;
      paintings = [];
    } else {
      throw error;
    }
  }

  return (
    <>
      <AuthRefresher
        shouldRefresh={shouldRefreshAuth}
        refreshAuthentication={refreshAuthentication}
      />
      { adminView
        ? <Typography variant='h3' sx={{ mb: 3 }}>Manage your paintings</Typography>
        : <Typography variant='h3' sx={{ mb: 3 }}>Available paintings</Typography>
      }
      <PaintingsGrid paintings={paintings} adminView={adminView} />
    </>
  );
}
