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

  useEffect(() => {
    if (error) {
      console.error("Auth error:", error);
      toast.error("Authentication error. Please try again.");
      navigate("/auth");
      return;
    }

    if (!isLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user && requiredRole) {
      const hasRole = requiredRole.includes(user.role);
      setHasRequiredRole(hasRole);
      
      if (!hasRole) {
        toast.error("You don't have permission to access this page.");
        navigate("/");
      }
    } else {
      setHasRequiredRole(true);
    }
  }, [user, isLoading, error, navigate, requiredRole]);

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