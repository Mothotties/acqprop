import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthState, AuthUser } from "@/types/auth";
import { toast } from "sonner";
import { debounce } from "lodash";

const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

const RETRY_DELAY = 1000; // Start with 1 second
const MAX_RETRIES = 3;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });
  const [retryCount, setRetryCount] = useState(0);

  const fetchUserData = async (retryAttempt = 0) => {
    try {
      if (!session?.user) {
        setAuthState({ user: null, isLoading: false, error: null });
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (roleError) {
        if (roleError.message.includes("rate_limit") && retryAttempt < MAX_RETRIES) {
          const delay = RETRY_DELAY * Math.pow(2, retryAttempt);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchUserData(retryAttempt + 1);
        }
        throw roleError;
      }

      if (!roleData) {
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert({ user_id: session.user.id, role: "investor" });

        if (insertError) throw insertError;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      const user: AuthUser = {
        id: session.user.id,
        email: session.user.email!,
        role: roleData?.role || "investor",
        profile: profileData || { full_name: null, avatar_url: null },
      };

      setAuthState({ user, isLoading: false, error: null });
      setRetryCount(0);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setAuthState({
        user: null,
        isLoading: false,
        error: error as Error,
      });
      toast.error("Failed to load user data. Please try again.");
    }
  };

  const debouncedFetchUserData = debounce(fetchUserData, 1000);

  useEffect(() => {
    let mounted = true;

    const handleAuthChange = async (event: string) => {
      if (!mounted) return;

      if (event === "SIGNED_IN") {
        await debouncedFetchUserData();
      } else if (event === "SIGNED_OUT") {
        setAuthState({ user: null, isLoading: false, error: null });
        if (mounted) {
          setTimeout(() => {
            navigate("/auth", { replace: true });
          }, 100);
        }
      }
    };

    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      await handleAuthChange(event);
    });

    return () => {
      mounted = false;
      debouncedFetchUserData.cancel();
      authListener?.subscription.unsubscribe();
    };
  }, [session, supabase, navigate]);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}