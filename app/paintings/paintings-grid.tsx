"use client";

import { Painting as IPainting } from './interfaces/painting.interface';
import Grid from "@mui/material/Grid";
import Painting from './painting';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '../shared/constants/api';
import revalidatePaintings from './actions/revalidate-paintings';
import getAuthentication from '../auth/actions/get-authentication';

interface PaintingsGridProps {
  paintings: IPainting[];
  adminView?: boolean;
}

export default function PaintingsGrid({ paintings, adminView = false }: PaintingsGridProps) {
  useEffect(() => {
    let socket: Socket;

    const createSocket = async() => {
      socket = io(API_URL, {
        auth: {
          Authentication: await getAuthentication(),
        },
      });
  
      socket.on('Painting updated', () => {
        revalidatePaintings();
      });
    }
    createSocket();

    return () => { socket?.disconnect() };
  }, []);

  return(
    <Grid container spacing={3}>
      {paintings?.map((painting) => (
        <Grid key={painting.id} size={{ xs: 12, md: 6, lg: 4 }} >
          <Painting painting={painting} adminView={adminView} />
        </Grid>
      ))}
    </Grid>
  )
}