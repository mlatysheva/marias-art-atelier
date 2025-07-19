import Grid from "@mui/material/Grid2";
import { Typography, Stack, Box } from '@mui/material';
import getPainting from './get-painting';
import PaintingImageSlider from './painting-images-slider';
import Checkout from '../../checkout/checkout';
import { API_URL } from '../../shared/constants/api';

interface SinglePaintingProps {
  params: Promise<{ paintingId: string }>;
}

export default async function SinglePainting(props: SinglePaintingProps) {
  const params = await props.params;
  const painting = await getPainting(params.paintingId);

  if (!painting) {
    return <p>Painting not found</p>;
  }

  const imageUrls = painting.images.map(
    (img) => `${API_URL}/images/paintings/${painting.id}/${img}`
  );

  return (
    <Box sx={{ marginBottom: '2rem' }}>
      <Grid container spacing={4}>
        {/* Left Column: Image Slider */}
        <Grid size={{ xs: 12, md: 6 }}>
          {painting.imageExists && painting.images.length > 0 && (
            <PaintingImageSlider images={imageUrls} alt={painting.title} />
          )}
        </Grid>

        {/* Right Column: Painting Info */}
        <Grid size={{ xs: 12, md: 5 }} marginLeft={{ xs: 0, md: 0, lg: 10 }}>
          <Stack spacing={2}>
            <Typography variant='h3'>{painting.title}</Typography>
            <Typography variant='h4' sx={{ fontFamily: 'cursive' }}>
              {painting.artist}
            </Typography>
            <Typography>{painting.description}</Typography>
            <Typography>{painting.year}</Typography>
            {painting.dimensions?.length > 0 && (
              <Typography>
                {painting.dimensions[0]} cm x {painting.dimensions[1]} cm
              </Typography>
            )}
            {painting.materials?.length > 0 && (
              <Typography>
                {painting.materials[0]}, {painting.materials[1]}
              </Typography>
            )}
            <Typography variant='h5'>€{painting.price}</Typography>
            <Checkout paintingId={painting.id} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}