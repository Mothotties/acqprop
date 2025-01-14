import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { Loader2, UserCog } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UserRole = 'admin' | 'agent' | 'investor';

interface UserWithRole {
  id: string;
  email: string;
  role: UserRole;
}

export function UserRoleManagement() {
  const [updating, setUpdating] = useState<string | null>(null);

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['users-with-roles'],
    queryFn: async () => {
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, email:auth.users!inner(email), user_roles!inner(role)');

      if (usersError) {
        toast.error("Error fetching users", {
          description: usersError.message
        });
        return [];
      }

      return usersData.map(user => ({
        id: user.id,
        email: user.email,
        role: user.user_roles?.[0]?.role || 'investor'
      })) as UserWithRole[];
    }
  });

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      setUpdating(userId);
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast.success("Role updated successfully");
      refetch();
    } catch (error) {
      toast.error("Error updating role", {
        description: error.message
      });
    } finally {
      setUpdating(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5" />
          User Role Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value: UserRole) => updateUserRole(user.id, value)}
                    disabled={updating === user.id}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {updating === user.id && (
                    <Button variant="ghost" size="sm" disabled>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}