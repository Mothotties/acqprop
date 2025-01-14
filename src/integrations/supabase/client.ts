import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fldafqlezglfbmqrgcoj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZGFmcWxlemdsZmJtcXJnY29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzU4MTYsImV4cCI6MjA1MjI1MTgxNn0.y-KD3PDARRDp1X2zusmKZEaKwL4UbO1FbzgmhkYYw-8";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});