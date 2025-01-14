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
  const [isLoading, setIsLoading] = useState(false);
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
    console.log("[Auth] Component mounted, initializing auth state tracking");
    let mounted = true;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Step 1: Log authentication attempt
      console.log("[Auth] Auth state changed:", { 
        event, 
        userId: session?.user?.id,
        timestamp: new Date().toISOString(),
        hasSession: !!session,
        accessToken: session?.access_token ? 'present' : 'absent',
        refreshToken: session?.refresh_token ? 'present' : 'absent'
      });
      
      if (event === "SIGNED_IN") {
        // Step 2: Show loading state
        setIsLoading(true);
        console.log("[Auth] Sign in detected, attempting session setup", {
          timestamp: new Date().toISOString(),
          userId: session?.user?.id
        });
        
        try {
          // Step 3: Handle Supabase response
          if (session?.access_token && session?.refresh_token) {
            // Step 4: Check for successful authentication
            console.log("[Auth] Setting up session with valid tokens", {
              timestamp: new Date().toISOString(),
              tokenType: session.token_type,
              expiresIn: session.expires_in
            });
            await supabase.auth.setSession({
              access_token: session.access_token,
              refresh_token: session.refresh_token,
            });
            
            // Step 5: Success notification and redirect
            toast.success("Successfully signed in!");
            console.log("[Auth] Redirecting to dashboard", {
              timestamp: new Date().toISOString(),
              destination: "/"
            });
            navigate("/");
          }
        } catch (error) {
          // Step 6: Handle and display errors
          console.error("[Auth] Session setup error:", {
            error,
            timestamp: new Date().toISOString(),
            context: "session setup"
          });
          handleAuthError(error as AuthError);
        } finally {
          if (mounted) setIsLoading(false);
        }
      }
    });

    // Set up session refresh interval
    const refreshInterval = setInterval(async () => {
      console.log("[Auth] Attempting token refresh", {
        timestamp: new Date().toISOString()
      });
      try {
        const { data, error } = await supabase.auth.refreshSession();
        if (error) throw error;
        console.log("[Auth] Token refresh result:", {
          success: !!data.session,
          userId: data.session?.user?.id,
          timestamp: new Date().toISOString(),
          newExpiresIn: data.session?.expires_in
        });
        if (!data.session) {
          console.log("[Auth] No valid session found, redirecting to auth", {
            timestamp: new Date().toISOString()
          });
          navigate("/auth");
        }
      } catch (error) {
        console.error("[Auth] Token refresh error:", {
          error,
          timestamp: new Date().toISOString(),
          context: "refresh interval"
        });
        navigate("/auth");
      }
    }, 1000 * 60 * 60); // Refresh every hour

    return () => {
      console.log("[Auth] Component unmounting, cleaning up subscriptions", {
        timestamp: new Date().toISOString()
      });
      mounted = false;
      subscription.unsubscribe();
      clearInterval(refreshInterval);
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