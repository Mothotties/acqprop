import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

export type UserRole = 'admin' | 'agent' | 'investor';

export function useUserRole() {
  const session = useSession();

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
          .maybeSingle(); // Use maybeSingle instead of single to handle no results case

        if (error) {
          console.error('Error fetching user role:', error);
          toast.error('Error fetching user role');
          return 'investor';
        }

        // If no role is found, return default role
        if (!data) {
          // Create a default role for the user
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert([
              { user_id: session.user.id, role: 'investor' }
            ]);

          if (insertError) {
            console.error('Error creating default role:', insertError);
            toast.error('Error creating default role');
          }

          return 'investor';
        }

        return data.role as UserRole;
      } catch (error) {
        console.error('Error in useUserRole:', error);
        toast.error('Error fetching user role');
        return 'investor';
      }
    },
    enabled: !!session?.user?.id,
    retry: 1, // Only retry once to avoid infinite loops
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}