import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

const Auth = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/");
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
      if (event === 'SIGNED_IN') {
        navigate("/");
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

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, supabase.auth]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 429:
          return 'Too many requests. Please wait a moment and try again.';
        case 500:
          return 'Server error. Please try again later.';
        case 400:
          switch (error.message) {
            case 'Email not confirmed':
              return 'Please verify your email address before signing in.';
            case 'Invalid login credentials':
              return 'Invalid email or password. Please check your credentials.';
            default:
              return error.message;
          }
        default:
          return error.message;
      }
    }
    return error.message;
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/20 via-gold/10 to-gold/5" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          ACQPROP
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Transform your real estate investment journey with AI-powered insights and analytics."
            </p>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            {isLoading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-gold" />
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;