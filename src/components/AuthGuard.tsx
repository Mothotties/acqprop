import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useUserRole } from "@/hooks/useUserRole";
import { PortfolioDashboardSkeleton } from "./portfolio/PortfolioDashboardSkeleton";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "investor" | "agent";
}

export const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const session = useSession();
  const navigate = useNavigate();
  const { data: role, isLoading: roleLoading } = useUserRole();

  useEffect(() => {
    if (!session) {
      navigate("/auth");
      return;
    }

    if (!roleLoading && requiredRole && role !== requiredRole) {
      navigate("/unauthorized");
    }
  }, [session, role, requiredRole, roleLoading, navigate]);

  if (!session) {
    return null;
  }

  if (roleLoading) {
    return <PortfolioDashboardSkeleton />;
  }

  if (requiredRole && role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};