import { Stack, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2/Grid2";
import getPainting from './get-painting';
import Image from 'next/image';
import { getFirstPaintingImagePath } from '../painting-image';
import Checkout from '../../checkout/checkout';

interface SinglePaintingProps {
  params: {
    paintingId: string;
  };
}

export default async function SinglePainting({ params }: SinglePaintingProps) {
  const painting = await getPainting(params.paintingId);

  if (!painting) {
    return <p>Painting not found</p>;
  }

  return (
    <Grid container marginBottom={"2rem"} spacing={2}>
      <Grid sx={{ xs: 12, md: 6 }} className='p-4'>
        <Stack spacing={2}>
          <Typography variant='h3'>{ painting.title }</Typography>
          <Typography variant='h4' sx={{ fontFamily: 'cursive' }}>{ painting.artist }</Typography>
          <Typography>{ painting.description }</Typography>
          <Typography>{ painting.year }</Typography>
          { 
            painting.dimensions?.length > 0 && (
              <Typography>{ painting.dimensions[0] } cm x { painting.dimensions[1] } cm</Typography>
            )
          }
          {
            painting.materials?.length > 0 && (
              <Typography>{ painting.materials[0] }, { painting.materials[1] }</Typography>
            )
          }
          <Typography variant='h5'>€{ painting.price }</Typography>
        </Stack>
        {
          painting.imageExists && (
            <Grid sx={{ xs: 12, md: 6 }} className='pb-6'>
              <Image 
                src={getFirstPaintingImagePath(painting.id, painting.images)}
                alt={painting.title}
                width={0}
                height={0}
                className='w-auto sm:w-3/4 mt-3 mb-3'  
                sizes='100vw'          
              />
            </Grid>
          )
        }
        <Checkout paintingId={painting.id} />
      </Grid>
    </Grid>
  );
  }