import { Card, Typography } from '@mui/material';
import type { Painting } from './interfaces/painting.interface';

interface PaintingProps {
  painting: Painting
}
export default function Painting({ painting} : PaintingProps) {
  return (
    <Card className='p-4'>
      <Typography variant='h5'>{painting.title}</Typography>
      <Typography variant='h6'>{painting.artist}</Typography>
      <Typography>{painting.description}</Typography>
      <Typography>{painting.year}</Typography>
      <Typography>{painting.dimensions[0]} cm x {painting.dimensions[1]} cm</Typography>
      <Typography>{painting.materials[0]}, {painting.materials[1]}</Typography>
      <Typography>{painting.tags.map((tag) => tag + ', ')}</Typography>
      <Typography>€{painting.price}</Typography>
    </Card>
  )
}