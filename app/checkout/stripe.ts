import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Stripe | null = null;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    );
  }

  return stripePromise;
};

export default getStripe;
