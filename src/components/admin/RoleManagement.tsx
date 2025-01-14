import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface UserRoleData {
  id: string;
  user_id: string;
  role: "admin" | "agent" | "investor";
  user_email: string | null;
  user_full_name: string | null;
}

type Role = "admin" | "agent" | "investor";

export function RoleManagement() {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();

  const fetchUserRoles = async (): Promise<UserRoleData[]> => {
    const { data: roles, error } = await supabase
      .from("user_roles")
      .select(`
        id,
        user_id,
        role,
        users:auth.users!user_id(
          email,
          raw_user_meta_data->>'full_name'
        )
      `);

    if (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }

    const transformedData = roles.map((role: any) => ({
      id: role.id,
      user_id: role.user_id,
      role: role.role,
      user_email: role.users?.email || null,
      user_full_name: role.users?.raw_user_meta_data || null,
    }));

    return transformedData;
  };

  const { data: userRoles, isLoading } = useQuery({
    queryKey: ["userRoles"],
    queryFn: fetchUserRoles,
  });

  const updateRole = useMutation({
    mutationFn: async ({
      userId,
      newRole,
    }: {
      userId: string;
      newRole: Role;
    }) => {
      const { error } = await supabase
        .from("user_roles")
        .update({ role: newRole })
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRoles"] });
      toast.success("Role updated successfully");
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
              <TableRow key={userRole.id}>
                <TableCell>{userRole.user_full_name || "N/A"}</TableCell>
                <TableCell>{userRole.user_email || "N/A"}</TableCell>
                <TableCell>{userRole.role}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedRole}
                      onValueChange={(value: Role) => setSelectedRole(value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (selectedRole) {
                          updateRole.mutate({
                            userId: userRole.user_id,
                            newRole: selectedRole,
                          });
                        }
                      }}
                      disabled={!selectedRole || updateRole.isPending}
                    >
                      {updateRole.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}