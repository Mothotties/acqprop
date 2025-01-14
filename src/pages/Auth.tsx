import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const INITIAL_RETRY_DELAY = 2000; // 2 seconds
const MAX_RETRIES = 3;

const Auth = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleAuthError = (error: AuthError) => {
    console.error("Auth error:", error);
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          if (error.message.includes("missing email")) {
            return "Please enter both email and password.";
          }
          return "Invalid login attempt. Please check your credentials.";
        case 401:
          return "Invalid credentials. Please check your email and password.";
        case 429:
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
          if (retryCount < MAX_RETRIES) {
            setRetryCount(prev => prev + 1);
            setTimeout(() => {
              setRetryCount(0);
              setErrorMessage("");
            }, delay);
            return `Too many attempts. Please wait ${delay/1000} seconds before trying again.`;
          }
          return "Too many attempts. Please try again later.";
        default:
          return error.message;
      }
    }
    return "An unexpected error occurred. Please try again.";
  };

  useEffect(() => {
    let mounted = true;
    let retryTimeout: NodeJS.Timeout;
    let navigationTimeout: NodeJS.Timeout;

    const handleSession = async () => {
      if (!mounted || !session?.user?.id) return;

      setIsLoading(true);
      try {
        // Add delay before navigation to prevent rate limiting
        navigationTimeout = setTimeout(() => {
          if (mounted) {
            navigate("/", { replace: true });
          }
        }, 2000);
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
        // Add delay before handling session to prevent rate limiting
        retryTimeout = setTimeout(() => {
          handleSession();
        }, 2000);
      } else if (event === "SIGNED_OUT") {
        setErrorMessage("");
        setRetryCount(0);
      }
    });

    if (session?.user?.id) {
      handleSession();
    }

    return () => {
      mounted = false;
      clearTimeout(retryTimeout);
      clearTimeout(navigationTimeout);
      subscription.unsubscribe();
    };
  }, [session, navigate, supabase, retryCount]);

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