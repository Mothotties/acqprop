import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const INITIAL_RETRY_DELAY = 1000; // Start with 1 second
const MAX_RETRIES = 3;

const Auth = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthError = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          return "Please provide both email and password.";
        case 401:
          return "Invalid credentials. Please check your email and password.";
        case 429:
          return "Too many attempts. Please try again later.";
        default:
          return error.message;
      }
    }
    return error.message;
  };

  const verifyUserRole = useCallback(async (userId: string, retryCount = 0) => {
    try {
      // First check if user role exists
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (roleError) {
        if (roleError.code === "42501" && retryCount < MAX_RETRIES) {
          // If RLS policy error, wait and retry
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
          await new Promise(resolve => setTimeout(resolve, delay));
          return verifyUserRole(userId, retryCount + 1);
        }
        throw roleError;
      }

      if (!roleData) {
        // Create default role if none exists
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: "investor" });

        if (insertError) {
          if (insertError.code === "42501" && retryCount < MAX_RETRIES) {
            const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
            await new Promise(resolve => setTimeout(resolve, delay));
            return verifyUserRole(userId, retryCount + 1);
          }
          throw insertError;
        }
      }

      return true;
    } catch (error) {
      console.error("Error verifying user role:", error);
      return false;
    }
  }, [supabase]);

  useEffect(() => {
    let mounted = true;
    let retryTimeout: NodeJS.Timeout;

    const handleSession = async () => {
      if (!mounted || !session?.user?.id) return;

      setIsLoading(true);
      try {
        const success = await verifyUserRole(session.user.id);
        if (success && mounted) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Session handling error:", error);
        if (mounted) {
          setErrorMessage(handleAuthError(error as AuthError));
          toast.error("Error setting up user access");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_IN" && session?.user?.id) {
        handleSession();
      } else if (event === "SIGNED_OUT") {
        setErrorMessage("");
      }
    });

    if (session?.user?.id) {
      handleSession();
    }

    return () => {
      mounted = false;
      clearTimeout(retryTimeout);
      subscription.unsubscribe();
    };
  }, [session, navigate, supabase, verifyUserRole]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome to ACQPROP</CardTitle>
          <CardDescription>
            Sign in to access your real estate investment dashboard
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
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
                input: 'w-full px-3 py-2 border rounded',
              },
            }}
            theme="dark"
            providers={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;