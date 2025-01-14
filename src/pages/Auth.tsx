import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AuthError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const mounted = useRef(true);
  const lastCheck = useRef(Date.now());
  const MIN_CHECK_INTERVAL = 2000; // 2 seconds minimum between checks

  useEffect(() => {
    const checkSession = async () => {
      // Rate limiting check
      const now = Date.now();
      if (now - lastCheck.current < MIN_CHECK_INTERVAL) {
        return;
      }
      lastCheck.current = now;

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session && mounted.current) {
          console.log("Existing session found in Auth, redirecting to /");
          navigate("/");
        }
      } catch (error) {
        console.error("Session check error:", error);
        if (error instanceof Error && error.message.includes('rate limit')) {
          setErrorMessage("Too many requests. Please wait a moment.");
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, !!session);
      
      if (!mounted.current) return;

      if (event === 'SIGNED_IN' && session) {
        console.log("Successfully signed in, redirecting to /");
        setErrorMessage("");
        navigate("/");
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome to ACQPROP</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#D4AF37',
                    brandAccent: '#B4941F',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={window.location.origin}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;