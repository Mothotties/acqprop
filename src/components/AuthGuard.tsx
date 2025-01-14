import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useUserRole, type UserRole } from "@/hooks/useUserRole";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole[];
}

export const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const session = useSession();
  const navigate = useNavigate();
  const { data: role, isLoading: roleLoading } = useUserRole();

  useEffect(() => {
    if (!session) {
      navigate("/auth");
    } else if (!roleLoading && requiredRole && role && !requiredRole.includes(role)) {
      navigate("/"); // Redirect to home if user doesn't have required role
    }
  }, [session, navigate, role, roleLoading, requiredRole]);

  if (!session) {
    return null;
  }

  if (roleLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (requiredRole && role && !requiredRole.includes(role)) {
    return null;
  }

  return <>{children}</>;
};