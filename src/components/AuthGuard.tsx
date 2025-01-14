import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: "admin" | "agent" | "investor";
}

export function AuthGuard({ children, requireAuth = true, requiredRole }: AuthGuardProps) {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userRole, isLoading: roleLoading, error } = useUserRole();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    
    const handleAuth = () => {
      if (!mounted.current) return;

      // Handle authentication check
      if (requireAuth && !session) {
        toast.error("Please sign in to access this page");
        navigate("/auth", { 
          replace: true,
          state: { from: location.pathname }
        });
        return;
      }

      // Handle public routes when authenticated
      if (!requireAuth && session) {
        navigate("/dashboard", { replace: true });
        return;
      }

      // Handle role-based access
      if (requiredRole && userRole && userRole !== requiredRole) {
        toast.error(`You need ${requiredRole} access to view this page`);
        navigate("/dashboard", { replace: true });
      }
    };

    // Add slight delay to prevent race conditions
    const redirectTimeout = setTimeout(handleAuth, 100);

    return () => {
      mounted.current = false;
      clearTimeout(redirectTimeout);
    };
  }, [session, userRole, requiredRole, navigate, location, requireAuth]);

  if (roleLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching user role:", error);
    return (
      <div className="flex min-h-screen items-center justify-center text-destructive">
        Error loading authentication status
      </div>
    );
  }

  // Don't render anything for authenticated routes if not authenticated
  if (requireAuth && !session) {
    return null;
  }

  // Don't render anything for public routes if authenticated
  if (!requireAuth && session) {
    return null;
  }

  // Don't render if role requirement not met
  if (requiredRole && userRole !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}