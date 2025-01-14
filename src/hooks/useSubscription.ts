import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

export function useSubscription() {
  const session = useSession();

  return useQuery({
    queryKey: ["subscription", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching subscription:", error);
        toast.error("Failed to fetch subscription status");
        return null;
      }

      return data;
    },
    enabled: !!session?.user?.id,
  });
}