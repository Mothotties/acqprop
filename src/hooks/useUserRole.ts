import { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'investor' | 'agent';

export function useUserRole() {
  const session = useSession();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRole() {
      if (!session?.user?.id) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role:', error);
          setRole('investor'); // Default role on error
        } else {
          setRole(data?.role as UserRole || 'investor'); // Default role if no role found
        }
      } catch (error) {
        console.error('Error in useUserRole:', error);
        setRole('investor'); // Default role on exception
      } finally {
        setLoading(false);
      }
    }

    fetchUserRole();
  }, [session]);

  return { role, loading };
}