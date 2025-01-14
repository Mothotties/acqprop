import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export type UserRole = 'admin' | 'agent' | 'investor';

export function useUserRole() {
  const session = useSession();

  return useQuery({
    queryKey: ["user-role", session?.user?.id],
    queryFn: async (): Promise<UserRole> => {
      if (!session?.user?.id) {
        return 'investor';
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error fetching user role:', error);
        return 'investor';
      }

      // If no role is found, return default role
      if (!data || data.length === 0) {
        return 'investor';
      }

      return data[0].role as UserRole;
    },
    enabled: !!session?.user?.id,
  });
}