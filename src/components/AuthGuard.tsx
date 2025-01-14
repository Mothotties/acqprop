import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useUserRole } from "@/hooks/useUserRole";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "agent" | "investor";
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const session = useSession();
  const navigate = useNavigate();
  const { data: userRole, isLoading, error } = useUserRole();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    
    const redirectTimeout = setTimeout(() => {
      if (!mounted.current) return;
      
      if (!session) {
        toast.error("Please sign in to access this page");
        navigate("/auth", { replace: true });
        return;
      }

      if (requiredRole && userRole && userRole !== requiredRole) {
        toast.error(`You need ${requiredRole} access to view this page`);
        navigate("/", { replace: true });
      }
    }, 100);

    return () => {
      mounted.current = false;
      clearTimeout(redirectTimeout);
    };
  }, [session, userRole, requiredRole, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching user role:", error);
    return <div>Error loading authentication status</div>;
  }

  if (!session) {
    return null;
  }

  if (requiredRole && userRole !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}