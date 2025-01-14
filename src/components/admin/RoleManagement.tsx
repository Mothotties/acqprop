import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { UserRoleRow } from "./UserRoleRow";
import { Role, RoleUpdatePayload, UserRoleData } from "@/types/roles";
import { useState } from "react";

export function RoleManagement() {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<Role>();

  const fetchUserRoles = async (): Promise<UserRoleData[]> => {
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        id,
        user_id,
        role,
        users:user_id (
          email,
          raw_user_meta_data->full_name
        )
      `);

    if (error) {
      toast.error("Failed to fetch user roles");
      throw error;
    }

    return data.map((item: any) => ({
      id: item.id,
      email: item.users?.email,
      role: item.role,
      full_name: item.users?.raw_user_meta_data?.full_name
    }));
  };

  const { data: userRoles, isLoading, error } = useQuery({
    queryKey: ["userRoles"],
    queryFn: fetchUserRoles,
  });

  const updateRole = useMutation({
    mutationFn: async ({ userId, newRole }: RoleUpdatePayload) => {
      const { error } = await supabase
        .from("user_roles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRoles"] });
      toast.success("Role updated successfully");
      setSelectedRole(undefined);
    },
    onError: (error) => {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load user roles. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Role Management</h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userRoles?.map((userRole) => (
              <UserRoleRow
                key={userRole.id}
                userRole={userRole}
                selectedRole={selectedRole}
                onRoleSelect={setSelectedRole}
                onUpdateRole={() => {
                  if (selectedRole) {
                    updateRole.mutate({
                      userId: userRole.id,
                      newRole: selectedRole,
                    });
                  }
                }}
                isUpdating={updateRole.isPending}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}