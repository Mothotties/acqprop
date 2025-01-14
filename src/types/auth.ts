import { Database } from "@/integrations/supabase/types";

export type UserRole = Database["public"]["Enums"]["app_role"];

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
}