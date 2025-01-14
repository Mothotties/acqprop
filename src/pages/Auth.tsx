import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN') {
        navigate("/");
      }
      
      if (event === 'USER_UPDATED') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setErrorMessage(getErrorMessage(error));
        }
      }
      
      if (event === 'SIGNED_OUT') {
        setErrorMessage("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, navigate]);

  const getErrorMessage = (error: AuthError) => {
    console.error("Auth error:", error);
    
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          return 'Invalid credentials. Please check your email and password.';
        case 422:
          return 'Invalid email format. Please enter a valid email address.';
        case 429:
          return 'Too many attempts. Please try again later.';
        default:
          return error.message;
      }
    }
    return 'An unexpected error occurred. Please try again.';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome to ACQPROP</CardTitle>
          <CardDescription>
            Sign in to access your real estate portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
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
            providers={['google', 'github']}
            redirectTo={window.location.origin}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;