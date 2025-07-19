"use client";
import React from 'react';
import { Button } from '@mui/material';
import checkout from './actions/checkout';
import getStripe from './stripe';

interface CheckoutProps {
  paintingId: string;
}

export default function Checkout({ paintingId }: CheckoutProps) {
  const handleCheckout = async () => {
    const session = await checkout(paintingId);
    const stripe = await getStripe();
    await stripe?.redirectToCheckout({
      sessionId: session.data.id,
    });
  };    

  return <Button variant='contained' sx={{ width: '150px' }} onClick={handleCheckout}>Buy now</Button>;
}