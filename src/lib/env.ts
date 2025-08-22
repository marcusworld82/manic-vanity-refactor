/**
 * Environment variable validation and configuration
 */

export interface Environment {
  supabaseUrl: string;
  supabaseAnonKey: string;
  stripePublishableKey?: string;
  enableAdmin?: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
}

// Required environment variables
const REQUIRED_ENV_VARS = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
] as const;

// Optional environment variables with defaults
const OPTIONAL_ENV_VARS = {
  VITE_STRIPE_PUBLISHABLE_KEY: '',
  VITE_ENABLE_ADMIN: 'false'
} as const;

/**
 * Validates and returns environment configuration
 * Throws error if required variables are missing
 */
export function validateEnvironment(): Environment {
  const missing: string[] = [];
  const env: Partial<Environment> = {};

  // Check required variables
  for (const envVar of REQUIRED_ENV_VARS) {
    const value = import.meta.env[envVar];
    if (!value) {
      missing.push(envVar);
    } else {
      switch (envVar) {
        case 'VITE_SUPABASE_URL':
          env.supabaseUrl = value;
          break;
        case 'VITE_SUPABASE_ANON_KEY':
          env.supabaseAnonKey = value;
          break;
      }
    }
  }

  // Set optional variables
  env.stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || OPTIONAL_ENV_VARS.VITE_STRIPE_PUBLISHABLE_KEY;
  env.enableAdmin = import.meta.env.VITE_ENABLE_ADMIN === 'true';
  env.isDevelopment = import.meta.env.DEV;
  env.isProduction = import.meta.env.PROD;

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return env as Environment;
}

/**
 * Get environment configuration with validation
 */
export const env = validateEnvironment();

/**
 * Stripe configuration based on environment
 */
export const stripeConfig = {
  publishableKey: env.stripePublishableKey,
  isTestMode: env.stripePublishableKey?.includes('pk_test_') ?? true,
  isLiveMode: env.stripePublishableKey?.includes('pk_live_') ?? false,
};

export default env;