import { loadStripe } from '@stripe/stripe-js';
import { env, stripeConfig } from './env';

// Initialize Stripe with environment validation
export const stripePromise = loadStripe(
  env.stripePublishableKey || ''
);

// Stripe configuration helpers
export const isStripeTestMode = stripeConfig.isTestMode;
export const isStripeLiveMode = stripeConfig.isLiveMode;

export const getStripeMode = () => {
  if (stripeConfig.isLiveMode) return 'live';
  if (stripeConfig.isTestMode) return 'test';
  return 'unknown';
};

console.log(`🔒 Stripe initialized in ${getStripeMode()} mode`);