import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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
    let isMounted = true;
    const maxAttempts = 3;
    let attempts = 0;
    const baseDelay = 1000;

    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth error:", error);
          toast.error("Authentication error. Please try again.");
          navigate("/auth");
          return;
        }

        if (!session) {
          navigate("/auth");
          return;
        }

        // If requiredRole is specified, check user roles with retry logic
        if (requiredRole && requiredRole.length > 0) {
          while (attempts < maxAttempts) {
            try {
              const { data: userRoles, error: rolesError } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .single();

              if (rolesError) {
                if (rolesError.code === '429') {
                  const waitTime = baseDelay * Math.pow(2, attempts);
                  await new Promise(resolve => setTimeout(resolve, waitTime));
                  attempts++;
                  continue;
                }
                throw rolesError;
              }

              if (isMounted) {
                const hasRole = requiredRole.includes(userRoles?.role);
                setHasRequiredRole(hasRole);
                
                if (!hasRole) {
                  toast.error("You don't have permission to access this page.");
                  navigate("/");
                }
              }
              break;
            } catch (error) {
              console.error("Role check error:", error);
              attempts++;
              
              if (attempts === maxAttempts) {
                if (isMounted) {
                  toast.error("Error checking user permissions.");
                  setHasRequiredRole(false);
                  navigate("/");
                }
              }
            }
          }
        } else {
          if (isMounted) {
            setHasRequiredRole(true);
          }
        }

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        toast.error("Authentication check failed. Please try again.");
        navigate("/auth");
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
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