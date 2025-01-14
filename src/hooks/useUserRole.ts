import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export type UserRole = "admin" | "investor" | "agent";

export function useUserRole() {
  const session = useSession();

  return useQuery({
    queryKey: ["userRole", session?.user?.id],
    queryFn: async (): Promise<UserRole> => {
      if (!session?.user?.id) {
        return "investor"; // Default role
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error);
        return "investor"; // Default role on error
      }

      return (data?.role as UserRole) || "investor";
    },
    enabled: !!session?.user?.id,
  });
}