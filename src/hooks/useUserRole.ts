import { useQuery } from "@tanstack/react-query";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

export type UserRole = 'admin' | 'agent' | 'investor';

export function useUserRole() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return useQuery({
    queryKey: ["user-role", session?.user?.id],
    queryFn: async (): Promise<UserRole> => {
      if (!session?.user?.id) {
        return 'investor';
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role:', error);
          toast.error('Error loading user permissions');
          return 'investor';
        }

        return (data?.role as UserRole) || 'investor';
      } catch (error) {
        console.error('Unexpected error fetching user role:', error);
        toast.error('Unable to load user permissions');
        return 'investor';
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000),
    staleTime: 30000, // Cache the role for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
  });
}