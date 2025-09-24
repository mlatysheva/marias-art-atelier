"use client";
import React from 'react';
import { Button } from '@mui/material';
import deletePainting from './actions/delete-painting';

interface DeletePaintingProps {
  paintingId: string;
}

export default function DeletePainting({ paintingId }: DeletePaintingProps) {
  const handleDelete = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const confirmed = confirm("Are you sure you want to delete this painting?");
    if (!confirmed) return;

    await deletePainting(paintingId);
  };

  return <Button variant='contained' color="error" className="mt-3" sx={{ width: '150px' }} onClick={handleDelete}>Delete</Button>;
}