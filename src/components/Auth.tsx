import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { toast } from "sonner";

export function Auth() {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);

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
        
        if (currentSession) {
          const redirectTo = location.state?.from || "/dashboard";
          console.log("[Auth] Redirecting authenticated user to:", redirectTo);
          navigate(redirectTo, { replace: true });
        }
      } catch (error) {
        console.error("[Auth] Unexpected error during session check:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [session, navigate, location.state, supabase.auth]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "github"]}
          redirectTo={`${window.location.origin}/dashboard`}
          theme="dark"
        />
      </div>
    </div>
  );
}