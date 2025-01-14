import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "./auth/AuthProvider";
import { UserRole } from "@/types/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole[];
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const navigate = useNavigate();
  const { user, isLoading, error } = useAuth();
  const [hasRequiredRole, setHasRequiredRole] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timeoutId: number;

    const checkAuthAndNavigate = () => {
      if (!mounted) return;

      if (error) {
        console.error("Auth error:", error);
        toast.error("Authentication error. Please try again.");
        if (!isNavigating) {
          setIsNavigating(true);
          timeoutId = window.setTimeout(() => {
            navigate("/auth", { replace: true });
          }, 100);
        }
        return;
      }

      if (!isLoading && !user) {
        if (!isNavigating) {
          setIsNavigating(true);
          timeoutId = window.setTimeout(() => {
            navigate("/auth", { replace: true });
          }, 100);
        }
        return;
      }

      if (user && requiredRole) {
        const hasRole = requiredRole.includes(user.role);
        setHasRequiredRole(hasRole);
        
        if (!hasRole && !isNavigating) {
          setIsNavigating(true);
          toast.error("You don't have permission to access this page.");
          timeoutId = window.setTimeout(() => {
            navigate("/", { replace: true });
          }, 100);
        }
      } else {
        setHasRequiredRole(true);
      }
    };

    checkAuthAndNavigate();

    return () => {
      mounted = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [user, isLoading, error, navigate, requiredRole, isNavigating]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!user || (requiredRole && !hasRequiredRole)) {
    return null;
  }

  return <>{children}</>;
}