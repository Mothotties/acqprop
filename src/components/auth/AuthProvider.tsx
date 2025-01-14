import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthState, AuthUser } from "@/types/auth";
import { toast } from "sonner";
import { debounce } from "lodash";
import { errorLogger } from "@/utils/errorLogger";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

const INITIAL_RETRY_DELAY = 1000;
const MAX_RETRIES = 3;
const SESSION_REFRESH_INTERVAL = 1000 * 60 * 30; // 30 minutes

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
    console.log("[AuthProvider] Fetching user data", { 
      retryCount,
      sessionExists: !!session,
      userId: session?.user?.id 
    });

    try {
      if (!session?.user) {
        console.log("[AuthProvider] No session found, clearing auth state");
        setAuthState({ user: null, isLoading: false, error: null });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      console.log("[AuthProvider] Fetching user role");

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (roleError) {
        console.error("[AuthProvider] Role fetch error:", roleError);
        if (roleError.message.includes("rate_limit") && retryCount < MAX_RETRIES) {
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
          console.log(`[AuthProvider] Rate limited, retrying in ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchUserData(retryCount + 1);
        }
        throw roleError;
      }

      console.log("[AuthProvider] Fetching user profile");
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("[AuthProvider] Profile fetch error:", profileError);
        throw profileError;
      }

      const user: AuthUser = {
        id: session.user.id,
        email: session.user.email!,
        role: roleData?.role || "investor",
        profile: profileData || { full_name: null, avatar_url: null },
      };

      console.log("[AuthProvider] User data fetched successfully:", {
        userId: user.id,
        role: user.role,
        hasProfile: !!profileData
      });

      setAuthState({ user, isLoading: false, error: null });
    } catch (error) {
      console.error("[AuthProvider] Error in fetchUserData:", error);
      errorLogger.log(error as Error, "high", { component: "AuthProvider" });
      setAuthState({
        user: null,
        isLoading: false,
        error: error as Error,
      });
      toast.error("Failed to load user data. Please try again.");
    }
  };

  const debouncedFetchUserData = debounce(fetchUserData, 2000);

  useEffect(() => {
    console.log("[AuthProvider] Provider mounted");
    let mounted = true;
    let sessionRefreshInterval: NodeJS.Timeout;

    const handleAuthChange = async (event: string) => {
      if (!mounted) return;
      console.log("[AuthProvider] Auth state changed:", { event });

      if (event === "SIGNED_IN") {
        console.log("[AuthProvider] Sign in detected, fetching user data");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await debouncedFetchUserData();
        navigate("/dashboard");
      } else if (event === "SIGNED_OUT") {
        console.log("[AuthProvider] Sign out detected, clearing state");
        setAuthState({ user: null, isLoading: false, error: null });
        if (mounted) {
          setTimeout(() => {
            navigate("/auth", { replace: true });
          }, 100);
        }
      }
    };

    const setupSessionRefresh = () => {
      console.log("[AuthProvider] Setting up session refresh interval");
      sessionRefreshInterval = setInterval(async () => {
        try {
          console.log("[AuthProvider] Attempting to refresh session");
          const { data: { session }, error } = await supabase.auth.refreshSession();
          if (error) throw error;
          console.log("[AuthProvider] Session refresh result:", {
            success: !!session,
            userId: session?.user?.id
          });
          if (!session && mounted) {
            navigate("/auth", { replace: true });
          }
        } catch (error) {
          console.error("[AuthProvider] Session refresh error:", error);
          errorLogger.log(error as Error, "medium", { 
            component: "AuthProvider",
            action: "refreshSession"
          });
          if (mounted) {
            navigate("/auth", { replace: true });
          }
        }
      }, SESSION_REFRESH_INTERVAL);
    };

    setTimeout(() => {
      if (mounted) {
        console.log("[AuthProvider] Initial user data fetch");
        fetchUserData();
        setupSessionRefresh();
      }
    }, 1000);

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      await handleAuthChange(event);
    });

    return () => {
      console.log("[AuthProvider] Provider unmounting, cleaning up");
      mounted = false;
      debouncedFetchUserData.cancel();
      clearInterval(sessionRefreshInterval);
      authListener?.subscription.unsubscribe();
    };
  }, [session, supabase, navigate]);

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={authState}>
        {authState.isLoading ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        ) : (
          children
        )}
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}