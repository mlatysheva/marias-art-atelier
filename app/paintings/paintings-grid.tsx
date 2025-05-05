"use client";

import { Painting as IPainting } from './interfaces/painting.interface';
import Grid from "@mui/material/Grid2/Grid2";
import Painting from './painting';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from '../shared/constants/api';
import revalidatePaintings from './actions/revalidate-paintings';

interface PaintingsGridProps {
  paintings: IPainting[];
}

export default function PaintingsGrid({ paintings }: PaintingsGridProps) {
  useEffect(() => {
    const socket = io(API_URL);

    socket.on('Painting updated', () => {
      revalidatePaintings();
    });

    return () => { socket.disconnect() };
  }, []);

  return(
    <Grid container spacing={3}>
    {paintings.map((painting) => (
      <Grid key={painting.id} size={{ xs: 12, md: 6, lg: 4 }} >
        <Painting painting={painting}/>
      </Grid>
    ))}
  </Grid>
  )
}