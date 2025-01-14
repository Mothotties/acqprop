import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

export function Auth() {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    console.log("[Auth] Component mounted, checking session:", { session });
    
    const checkSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("[Auth] Session check error:", error);
          toast.error("Authentication error. Please try again.");
          return;
        }

        console.log("[Auth] Session check result:", { currentSession });
        
        // Only redirect if we have both a session and have done the initial check
        if (currentSession && initialCheckDone) {
          const redirectTo = location.state?.from || "/dashboard";
          console.log("[Auth] Redirecting authenticated user to:", redirectTo);
          navigate(redirectTo, { replace: true });
        }
      } catch (error) {
        console.error("[Auth] Unexpected error during session check:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
        setInitialCheckDone(true);
      }
    };

    // Add a small delay before the initial session check
    const timer = setTimeout(() => {
      checkSession();
    }, 500);

    return () => clearTimeout(timer);
  }, [session, navigate, location.state, supabase.auth, initialCheckDone]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-8 px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Welcome to ACQPROP</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access your real estate investment dashboard
            </p>
          </div>
          
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary))',
                  }
                }
              }
            }}
            theme="dark"
            providers={["google", "github"]}
            redirectTo={`${window.location.origin}/auth/callback`}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}