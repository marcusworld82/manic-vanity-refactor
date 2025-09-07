/**
 * Environment configuration for Lovable projects
 * Supabase keys are hardcoded as they are public keys
 */

export interface Environment {
  supabaseUrl: string;
  supabaseAnonKey: string;
  stripePublishableKey?: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

/**
 * Get environment configuration
 * In Lovable, Supabase keys are hardcoded and Stripe keys come from Supabase secrets
 */
export function getEnvironment(): Environment {
  return {
    // Supabase configuration (hardcoded public keys)
    supabaseUrl: "https://zxvbcgdldlipsdfewdgy.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmJjZ2RsZGxpcHNkZmV3ZGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0ODY4MzUsImV4cCI6MjA3MTA2MjgzNX0.OhgucHU8aNZpFYQ_Zv8aOz9XfUA2QkXTLaUttyFUDzE",
    
    // Optional Stripe key (will be undefined until added as secret)
    stripePublishableKey: undefined,
    
    // Environment flags
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  };
}

/**
 * Get environment configuration
 */
export const env = getEnvironment();

/**
 * Stripe configuration based on environment
 */
export const stripeConfig = {
  publishableKey: env.stripePublishableKey,
  isTestMode: env.stripePublishableKey?.includes('pk_test_') ?? true,
  isLiveMode: env.stripePublishableKey?.includes('pk_live_') ?? false,
};

export default env;