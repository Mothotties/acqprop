import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthState, AuthUser } from "@/types/auth";
import { toast } from "sonner";

const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        if (!session?.user) {
          if (isMounted) {
            setAuthState({ user: null, isLoading: false, error: null });
          }
          return;
        }

        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (roleError) throw roleError;

        if (!roleData) {
          // Create default role if none exists
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert({ user_id: session.user.id, role: 'investor' });

          if (insertError) throw insertError;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", session.user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (isMounted) {
          const user: AuthUser = {
            id: session.user.id,
            email: session.user.email!,
            role: roleData?.role || 'investor',
            profile: profileData || { full_name: null, avatar_url: null },
          };

          setAuthState({ user, isLoading: false, error: null });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (isMounted) {
          setAuthState({
            user: null,
            isLoading: false,
            error: error as Error,
          });
          toast.error("Failed to load user data. Please try again.");
        }
      }
    };

    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        await fetchUserData();
      } else if (event === "SIGNED_OUT") {
        if (isMounted) {
          setAuthState({ user: null, isLoading: false, error: null });
          // Use setTimeout to ensure safe navigation
          setTimeout(() => {
            if (isMounted) {
              navigate("/auth", { replace: true });
            }
          }, 0);
        }
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, [session, supabase, navigate]);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}