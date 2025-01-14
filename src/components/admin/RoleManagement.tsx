import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
import { UserRole } from "@/hooks/useUserRole";

interface UserRoleData {
  id: string;
  user_id: string;
  role: UserRole;
  user_email: string | null;
  user_full_name: string | null;
}

export function RoleManagement() {
  const { toast } = useToast();
  const [updating, setUpdating] = useState<string | null>(null);

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const { data: userRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select(`
          id,
          user_id,
          role,
          user:user_id (
            email:raw_user_meta_data->>'email',
            full_name:raw_user_meta_data->>'full_name'
          )
        `);

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
        throw rolesError;
      }

      // Transform the data to match our interface
      const transformedData: UserRoleData[] = userRoles.map((role: any) => ({
        id: role.id,
        user_id: role.user_id,
        role: role.role,
        user_email: role.user?.email || null,
        user_full_name: role.user?.full_name || null,
      }));

      return transformedData;
    },
  });

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      setUpdating(userId);
      const { error } = await supabase
        .from("user_roles")
        .update({ role: newRole })
        .eq("user_id", userId);

      if (error) throw error;

      toast({
        title: "Role updated",
        description: "User role has been successfully updated.",
      });
      refetch();
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error updating role",
        description: "There was an error updating the user role.",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Role Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.user_full_name || "N/A"}</TableCell>
              <TableCell>{user.user_email || "N/A"}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value: UserRole) =>
                      updateUserRole(user.user_id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                  {updating === user.user_id && (
                    <Loader2 className="h-4 w-4 animate-spin text-gold" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}