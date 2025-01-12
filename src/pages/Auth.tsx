import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-xl border border-gold/10">
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
  );
};

export default Auth;