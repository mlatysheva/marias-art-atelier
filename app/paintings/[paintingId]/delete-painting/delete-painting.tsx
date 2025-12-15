'use client';

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import deletePainting from './actions/delete-painting';
import { useRouter } from 'next/navigation';
import revalidatePaintings from '../../actions/revalidate-paintings';

interface DeletePaintingProps {
  paintingId: string;
}

export default function DeletePainting({ paintingId }: DeletePaintingProps) {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this painting?');
    if (!confirmed) return;

    const result = await deletePainting(paintingId);
    if (result.ok) {
      await revalidatePaintings();
      router.refresh();
    } else {
      alert('Failed to delete painting');
    }
  };

  return (
    <Tooltip title="Delete painting" arrow>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
