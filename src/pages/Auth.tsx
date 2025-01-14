import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

const Auth = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only redirect if we have a valid session
    if (session?.user?.id) {
      // Use replace instead of push to prevent back navigation issues
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  const retryWithBackoff = async (operation: () => Promise<any>, retryCount = 0) => {
    try {
      return await operation();
    } catch (error: any) {
      if (error?.status === 429 && retryCount < MAX_RETRIES) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryWithBackoff(operation, retryCount + 1);
      }
      throw error;
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.id) {
        // Use replace instead of push to prevent back navigation issues
        navigate("/", { replace: true });
      }
      if (event === 'USER_UPDATED') {
        setIsLoading(true);
        try {
          await retryWithBackoff(async () => {
            const { error } = await supabase.auth.getSession();
            if (error) throw error;
          });
        } catch (error) {
          console.error('Session refresh error:', error);
          setErrorMessage(getErrorMessage(error as AuthError));
          toast.error(getErrorMessage(error as AuthError));
        } finally {
          setIsLoading(false);
        }
      }
      if (event === 'SIGNED_OUT') {
        setErrorMessage("");
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, navigate]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 429:
          return 'Too many requests. Please wait a moment and try again.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          switch (error.message) {
            case 'Invalid login credentials':
              return 'Invalid email or password. Please check your credentials.';
            case 'Email not confirmed':
              return 'Please verify your email address before signing in.';
            case 'User not found':
              return 'No account found with these credentials.';
            default:
              return error.message;
          }
      }
    }
    return error.message;
  };

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
            }}
            providers={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;