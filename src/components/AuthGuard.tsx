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
  const [retryAttempt, setRetryAttempt] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const maxAttempts = 5; // Increased from 3 to 5 for more retry attempts
    const baseDelay = 1000;
    let timeoutId: NodeJS.Timeout;

    const checkAuth = async () => {
      try {
        if (!session) {
          navigate("/auth");
          return;
        }

        if (requiredRole && requiredRole.length > 0) {
          let attempt = 0;
          let lastError = null;

          while (attempt < maxAttempts) {
            try {
              const { data: userRoles, error } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .maybeSingle();

              if (error) {
                if (error.code === '429') {
                  const waitTime = Math.min(baseDelay * Math.pow(2, attempt), 10000);
                  console.log(`Rate limited, waiting ${waitTime}ms before retry`);
                  if (isMounted) {
                    setRetryAttempt(attempt + 1);
                  }
                  await new Promise(resolve => {
                    timeoutId = setTimeout(resolve, waitTime);
                  });
                  attempt++;
                  continue;
                }
                
                if (error.code === '42P17') {
                  console.error("Infinite recursion in policy detected:", error);
                  toast.error("Authorization error. Please try again later.");
                  navigate("/auth");
                  return;
                }

                throw error;
              }

              if (isMounted) {
                const hasRole = userRoles ? requiredRole.includes(userRoles.role) : false;
                setHasRequiredRole(hasRole);
                
                if (!hasRole) {
                  toast.error("You don't have permission to access this page");
                  navigate("/");
                }
              }
              break;
            } catch (error) {
              console.error("Role check error:", error);
              lastError = error;
              attempt++;
              
              if (attempt === maxAttempts) {
                if (isMounted) {
                  console.error("Max retry attempts reached:", lastError);
                  toast.error("Error checking permissions. Please try again later.");
                  setHasRequiredRole(false);
                  navigate("/");
                }
              } else {
                const waitTime = Math.min(baseDelay * Math.pow(2, attempt), 10000);
                if (isMounted) {
                  setRetryAttempt(attempt);
                }
                await new Promise(resolve => {
                  timeoutId = setTimeout(resolve, waitTime);
                });
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
          setRetryAttempt(0);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        toast.error("Authentication check failed. Please try again later.");
        navigate("/auth");
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [navigate, supabase, session, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
        {retryAttempt > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            Retrying... ({retryAttempt}/{5})
          </p>
        )}
      </div>
    );
  }

  if (!session || (requiredRole && !hasRequiredRole)) {
    return null;
  }

  return <>{children}</>;
}