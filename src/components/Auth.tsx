import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { toast } from "sonner";
import { debounce } from "lodash";

export function Auth() {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  // Debounced session check to prevent rapid auth requests
  const debouncedCheckSession = useCallback(
    debounce(async () => {
      try {
        console.log("[Auth] Checking session...");
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();

        if (error) {
          if (error.status === 429) {
            console.log("[Auth] Rate limit hit, implementing backoff...");
            const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);
            
            if (retryCount < MAX_RETRIES) {
              setRetryCount(prev => prev + 1);
              setTimeout(() => debouncedCheckSession(), backoffDelay);
              return;
            } else {
              toast.error("Too many requests. Please try again later.");
              return;
            }
          }
          
          throw error;
        }

        console.log("[Auth] Session check result:", { currentSession });
        
        // Only redirect if we have both a session and have done the initial check
        if (currentSession && initialCheckDone) {
          const redirectTo = location.state?.from || "/dashboard";
          console.log("[Auth] Redirecting authenticated user to:", redirectTo);
          navigate(redirectTo, { replace: true });
        }
      } catch (error) {
        console.error("[Auth] Error checking session:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
        setInitialCheckDone(true);
      }
    }, 1000),
    [navigate, location.state, supabase.auth, initialCheckDone, retryCount]
  );

  useEffect(() => {
    console.log("[Auth] Component mounted, checking session:", { session });

    // Add a small delay before the initial session check
    const timer = setTimeout(() => {
      debouncedCheckSession();
    }, 500);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      debouncedCheckSession.cancel();
    };
  }, [session, debouncedCheckSession]);

  // Set up auth state change listener with rate limiting protection
  useEffect(() => {
    let retryTimeout: NodeJS.Timeout;
    let retryCount = 0;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      debounce(async (event, session) => {
        console.log("[Auth] Auth state changed:", event, session);
        
        if (event === "SIGNED_IN") {
          try {
            await debouncedCheckSession();
          } catch (error) {
            if (error.status === 429 && retryCount < MAX_RETRIES) {
              retryCount++;
              const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);
              retryTimeout = setTimeout(() => debouncedCheckSession(), backoffDelay);
            }
          }
        }
      }, 1000)
    );

    return () => {
      subscription.unsubscribe();
      clearTimeout(retryTimeout);
    };
  }, [supabase.auth, debouncedCheckSession]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to ACQPROP</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access your real estate investment dashboard
          </p>
        </div>

        <div className="mt-8">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary))',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
}