import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AuthError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log("Initial session check:", session);
      
      if (error) {
        console.error("Session check error:", error);
        setErrorMessage(getErrorMessage(error));
        return;
      }
      
      if (session) {
        console.log("User already has session, redirecting to /");
        navigate("/");
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully, redirecting to /");
        navigate("/");
        return;
      }
      
      if (event === "SIGNED_OUT") {
        console.log("User signed out");
        setErrorMessage("");
        return;
      }

      if (event === "USER_UPDATED") {
        console.log("User updated");
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session refresh error:", error);
          setErrorMessage(getErrorMessage(error));
        }
      }
    });

    return () => {
      console.log("Cleaning up auth subscriptions");
      subscription.unsubscribe();
    };
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    console.error("Auth error:", error);
    
    if (error.message.includes("User already registered")) {
      return "This email is already registered. Please sign in instead.";
    }
    
    switch (error.message) {
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials.";
      case "Email not confirmed":
        return "Please verify your email address before signing in.";
      case "validation_failed":
        return "Please enter both email and password.";
      default:
        return error.message;
    }
  };

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
            redirectTo={`${window.location.origin}/`}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;