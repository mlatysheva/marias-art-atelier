'use client';

import {
  Card,
  CardActionArea,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { Painting } from './interfaces/painting.interface';
import Image from 'next/image';
import { getFirstPaintingImagePath } from './painting-image';
import { useRouter } from 'next/navigation';
import DeletePainting from './[paintingId]/delete-painting/delete-painting';

interface PaintingProps {
  painting: Painting;
  adminView?: boolean;
}

export default function Painting({
  painting,
  adminView = false,
}: PaintingProps) {
  const router = useRouter();

  return (
    <Card className="p-4 flex flex-col justify-between">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h5">{painting.title}</Typography>
          <Typography variant="h6" sx={{ fontFamily: 'cursive' }}>
            {painting.artist}
          </Typography>
        </Box>

        {adminView && (
          <Box>
            <Tooltip title="Edit painting" arrow>
              <IconButton
                aria-label="edit"
                onClick={() => router.push(`/manage-paintings/${painting.id}`)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <DeletePainting paintingId={painting.id} />
          </Box>
        )}
      </Box>

      {/* Click on the card navigates to the painting page for editing/viewing */}
      <CardActionArea
        onClick={() =>
          adminView
            ? router.push(`/manage-paintings/${painting.id}`)
            : router.push(`/paintings/${painting.id}`)
        }
      >
        {painting.imageExists && (
          <Image
            src={getFirstPaintingImagePath(painting.id, painting.images)}
            alt={painting.title}
            width={0}
            height={0}
            className="w-full h-auto mt-3 mb-3"
            sizes="100vw"
          />
        )}

        <Typography>{painting.year}</Typography>
        <Typography>
          {painting.dimensions[0]} cm x {painting.dimensions[1]} cm
        </Typography>
        <Typography>
          {painting.materials[0]}, {painting.materials[1]}
        </Typography>
        <Typography>€{painting.price}</Typography>
      </CardActionArea>
    </Card>
  );
}
