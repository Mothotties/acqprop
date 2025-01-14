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
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Initial session check:", session); // Debug log
      if (session) {
        console.log("User already has session, redirecting to /"); // Debug log
        navigate("/");
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session); // Debug log
      
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully, redirecting to /"); // Debug log
        navigate("/");
        return;
      }
      
      if (event === "SIGNED_OUT") {
        console.log("User signed out"); // Debug log
        navigate("/auth");
        return;
      }

      if (event === "USER_UPDATED") {
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session error:", error); // Debug log
          setErrorMessage(getErrorMessage(error));
        }
      }
    });

    return () => {
      console.log("Cleaning up auth subscriptions"); // Debug log
      subscription.unsubscribe();
    };
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case "User already registered":
        return "This email is already registered. Please try signing in instead.";
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "Email not confirmed":
        return "Please verify your email address before signing in.";
      case "User not found":
        return "No user found with these credentials.";
      default:
        return error.message;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              AcqProp
            </span>
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your real estate investment dashboard
          </p>
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="bg-card rounded-lg shadow-xl border border-gold/10 p-6">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#D4AF37',
                    brandAccent: '#B8860B',
                  }
                }
              }
            }}
            providers={["google"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;