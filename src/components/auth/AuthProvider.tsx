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

const INITIAL_RETRY_DELAY = 1000; // Start with 1 second
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

  const fetchUserData = async (retryCount = 0) => {
    try {
      if (!session?.user) {
        setAuthState({ user: null, isLoading: false, error: null });
        return;
      }

      // Wait for a short delay before making requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

      // First, try to get the user's role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (roleError) {
        // If we hit rate limit and haven't exceeded max retries, wait and try again
        if (roleError.message.includes("rate_limit") && retryCount < MAX_RETRIES) {
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchUserData(retryCount + 1);
        }
        throw roleError;
      }

      // If no role exists, create one with default role
      if (!roleData) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Add delay before insert
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert([{ user_id: session.user.id, role: "investor" }]);

        if (insertError) throw insertError;
      }

      // Add delay before fetching profile
      await new Promise(resolve => setTimeout(resolve, 100));

      // Get user profile data
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

  // Increase debounce delay to help with rate limiting
  const debouncedFetchUserData = debounce(fetchUserData, 2000);

  useEffect(() => {
    let mounted = true;

    const handleAuthChange = async (event: string) => {
      if (!mounted) return;

      if (event === "SIGNED_IN") {
        // Add delay before fetching user data after sign in
        await new Promise(resolve => setTimeout(resolve, 1000));
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

    // Initial fetch with delay
    setTimeout(() => {
      if (mounted) {
        fetchUserData();
      }
    }, 1000);

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