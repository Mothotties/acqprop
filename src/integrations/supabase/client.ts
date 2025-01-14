import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fldafqlezglfbmqrgcoj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZGFmcWxlemdsZmJtcXJnY29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzU4MTYsImV4cCI6MjA1MjI1MTgxNn0.y-KD3PDARRDp1X2zusmKZEaKwL4UbO1FbzgmhkYYw-8";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window?.localStorage,
    storageKey: 'supabase.auth.token',
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'acqprop'
    },
    // Add retries for failed requests
    fetch: (url, options) => {
      const retries = 3;
      const retryDelay = 1000; // 1 second

      const fetchWithRetry = async (attempt: number): Promise<Response> => {
        try {
          const response = await fetch(url, options);
          if (!response.ok && attempt < retries) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        } catch (error) {
          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
            return fetchWithRetry(attempt + 1);
          }
          throw error;
        }
      };

      return fetchWithRetry(1);
    }
  }
});

// Add error boundary handler
export const handleSupabaseError = (error: Error): string => {
  console.error('Supabase error:', error);
  
  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('JWT')) {
      return 'Authentication error. Please sign in again.';
    }
    if (error.message.includes('network')) {
      return 'Network error. Please check your connection.';
    }
    if (error.message.includes('permission')) {
      return 'You do not have permission to perform this action.';
    }
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};