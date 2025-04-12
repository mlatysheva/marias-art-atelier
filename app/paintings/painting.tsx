import { Card, Stack, Typography } from '@mui/material';
import type { Painting } from './interfaces/painting.interface';
import Image from 'next/image';
import { API_URL } from '../shared/constants/api';

interface PaintingProps {
  painting: Painting
}
export default function Painting({ painting} : PaintingProps) {
  return (
    <Card className='p-4'>
      <Typography variant='h5'>{painting.title}</Typography>
      <Typography variant='h6'>{painting.artist}</Typography>
      {
        painting.imageExists && 
        <Image 
          src={`${API_URL}/paintings/${painting.id}/${painting.images[0]}`} 
          alt={painting.title} 
          width='0'
          height='0'
          className='w-full h-auto mt-3 mb-3'
          sizes='100vw'

        />
      }
      <Typography>{painting.description}</Typography>
      <Typography>{painting.year}</Typography>
      <Typography>{painting.dimensions[0]} cm x {painting.dimensions[1]} cm</Typography>
      <Typography>{painting.materials[0]}, {painting.materials[1]}</Typography>
      <Typography>{painting.tags.map((tag) => tag + ', ')}</Typography>
      <Typography>€{painting.price}</Typography>
    </Card>
  )
}