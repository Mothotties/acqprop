import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Auth = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const handleSession = async () => {
      if (!mounted) return;
      
      if (session?.user?.id) {
        try {
          // Verify user role exists
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (roleError) {
            console.error('Error fetching user role:', roleError);
            toast.error('Error verifying user access');
            return;
          }

          // If no role exists, create default role
          if (!roleData) {
            const { error: insertError } = await supabase
              .from('user_roles')
              .insert([
                { user_id: session.user.id, role: 'investor' }
              ]);

            if (insertError) {
              console.error('Error creating user role:', insertError);
              toast.error('Error setting up user access');
              return;
            }
          }

          // Navigate to home page
          navigate("/", { replace: true });
        } catch (error) {
          console.error('Session handling error:', error);
          setErrorMessage(getErrorMessage(error as AuthError));
        }
      }
    };

    handleSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_IN' && session?.user?.id) {
        handleSession();
      }
      if (event === 'SIGNED_OUT') {
        setErrorMessage("");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [session, navigate, supabase]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          return 'Please provide both email and password.';
        case 401:
          return 'Invalid credentials. Please check your email and password.';
        case 429:
          return 'Too many attempts. Please try again later.';
        default:
          return error.message;
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