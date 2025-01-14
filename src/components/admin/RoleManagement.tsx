import { DashboardLayout } from "@/components/DashboardLayout";
import { UserRoleManagement } from "./UserRoleManagement";

export function RoleManagement() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Role Management</h1>
        <UserRoleManagement />
      </div>
    </DashboardLayout>
  );
}