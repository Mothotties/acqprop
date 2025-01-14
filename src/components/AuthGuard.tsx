import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);
  const [hasRequiredRole, setHasRequiredRole] = useState(false);

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

        // If requiredRole is specified, check user roles
        if (requiredRole && requiredRole.length > 0) {
          const { data: userRoles, error: rolesError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          if (rolesError) {
            console.error("Role check error:", rolesError);
            setHasRequiredRole(false);
          } else {
            setHasRequiredRole(requiredRole.includes(userRoles?.role));
          }
        } else {
          setHasRequiredRole(true);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate, supabase.auth, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!session || (requiredRole && !hasRequiredRole)) {
    return null;
  }

  return <>{children}</>;
}