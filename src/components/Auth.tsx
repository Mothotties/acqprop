import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { toast } from "sonner";

export function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAuthError = (error: AuthError) => {
    console.error("[Auth] Authentication error:", {
      error: error.message,
      status: error instanceof AuthApiError ? error.status : 'unknown',
      name: error.name,
      details: error instanceof AuthApiError ? error.status : undefined
    });
    
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          if (error.message.includes("missing email")) {
            setErrorMessage("Please enter your email address.");
          } else {
            setErrorMessage("Invalid login credentials. Please check your email and password.");
          }
          break;
        case 422:
          setErrorMessage("Email validation failed. Please enter a valid email address.");
          break;
        case 429:
          setErrorMessage("Too many login attempts. Please try again later.");
          break;
        default:
          setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("[Auth] Component mounted, checking initial session");
    let mounted = true;
    
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("[Auth] Initial session check:", {
          hasSession: !!session,
          timestamp: new Date().toISOString()
        });
        
        if (session?.user) {
          console.log("[Auth] Active session found, redirecting to dashboard");
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("[Auth] Session check error:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[Auth] Auth state changed:", { 
        event, 
        userId: session?.user?.id,
        timestamp: new Date().toISOString()
      });
      
      if (event === "SIGNED_IN" && session?.user) {
        console.log("[Auth] Sign in successful, setting up session");
        setIsLoading(true);
        
        try {
          await supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          });
          
          toast.success("Successfully signed in!");
          console.log("[Auth] Redirecting to dashboard");
          navigate("/dashboard", { replace: true });
        } catch (error) {
          console.error("[Auth] Session setup error:", error);
          handleAuthError(error as AuthError);
        }
      }
    });

    return () => {
      console.log("[Auth] Component unmounting, cleaning up subscriptions");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to ACQPROP</CardTitle>
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
              className: {
                container: 'w-full',
                button: isLoading ? 'opacity-50 cursor-not-allowed' : '',
                input: isLoading ? 'opacity-50' : '',
              }
            }}
            theme="dark"
            providers={[]}
          />
          {isLoading && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Authenticating...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}