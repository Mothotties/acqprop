import { Database } from "@/integrations/supabase/types";

export type Role = Database["public"]["Enums"]["app_role"];

export interface UserRoleData {
  id: string;
  email: string | null;
  role: Role;
  full_name: string | null;
}

export interface RoleUpdatePayload {
  userId: string;
  newRole: Role;
}