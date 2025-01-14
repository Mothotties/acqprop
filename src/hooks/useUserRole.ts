import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

export type UserRole = 'admin' | 'agent' | 'investor';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useUserRole() {
  const session = useSession();

  return useQuery({
    queryKey: ["user-role", session?.user?.id],
    queryFn: async (): Promise<UserRole> => {
      if (!session?.user?.id) {
        return 'investor';
      }

      let attempts = 0;
      const maxAttempts = 3;
      const baseDelay = 1000; // Start with 1 second delay

      while (attempts < maxAttempts) {
        try {
          const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          if (error) {
            if (error.code === '429') { // Rate limit error
              const waitTime = baseDelay * Math.pow(2, attempts);
              console.log(`Rate limited, waiting ${waitTime}ms before retry`);
              await delay(waitTime);
              attempts++;
              continue;
            }
            
            console.error('Error fetching user role:', error);
            toast.error('Error loading user permissions. Using default role.');
            return 'investor';
          }

          // If no role is found, return default role
          if (!data) {
            return 'investor';
          }

          return data.role as UserRole;
        } catch (error) {
          console.error('Unexpected error fetching user role:', error);
          attempts++;
          
          if (attempts === maxAttempts) {
            toast.error('Unable to load user permissions. Using default role.');
            return 'investor';
          }
          
          await delay(baseDelay * Math.pow(2, attempts));
        }
      }

      return 'investor'; // Fallback to default role if all attempts fail
    },
    enabled: !!session?.user?.id,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000),
    staleTime: 30000, // Cache the role for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
  });
}