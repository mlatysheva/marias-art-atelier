"use client";
import { Button } from '@mui/material';
import checkout from './actions/checkout';

interface CheckoutProps {
  paintingId: string;
}

export default function Checkout({ paintingId }: CheckoutProps) {
  const handleCheckout = async () => {
    const session = await checkout(paintingId);

    if (session.error) {
      throw new Error(session.error);
    }

    const sessionUrl = session.data?.url;

    if (!sessionUrl) {
      throw new Error('Checkout session did not include a redirect URL.');
    }

    window.location.href = sessionUrl;
  };    

  return <Button variant='contained' sx={{ width: '150px' }} onClick={handleCheckout}>Buy now</Button>;
}

