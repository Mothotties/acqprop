import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth error:", error);
          navigate("/auth");
          return;
        }

        if (!session) {
          navigate("/auth");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate, supabase.auth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}