"use client"

import { Card, CardActionArea, Typography } from '@mui/material';
import type { Painting } from './interfaces/painting.interface';
import Image from 'next/image';
import { getFirstPaintingImagePath } from './painting-image';
import { useRouter } from 'next/navigation';

interface PaintingProps {
  painting: Painting
}

export default function Painting({ painting} : PaintingProps) {
  const router = useRouter();

  return (
    <CardActionArea onClick={() => router.push(`/paintings/${painting.id}`)}>
      <Card className='p-4'>
        <Typography variant='h5'>{painting.title}</Typography>
        <Typography variant='h6' sx={{ fontFamily: 'cursive' }}>{painting.artist}</Typography>
        {
          painting.imageExists && 
          <Image 
            src={getFirstPaintingImagePath(painting.id, painting.images)}
            alt={painting.title} 
            width='0'
            height='0'
            className='w-full h-auto mt-3 mb-3'
            sizes='100vw'

        />
        }
        <Typography>{painting.year}</Typography>
        <Typography>{painting.dimensions[0]} cm x {painting.dimensions[1]} cm</Typography>
        <Typography>{painting.materials[0]}, {painting.materials[1]}</Typography>
        <Typography>{painting.tags.map((tag) => tag + ', ')}</Typography>
        <Typography>€{painting.price}</Typography>
      </Card>
    </CardActionArea>
  )
}