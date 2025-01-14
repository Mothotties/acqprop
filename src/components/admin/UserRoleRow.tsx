import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { RoleSelector } from "./RoleSelector";
import { Role, UserRoleData } from "@/types/roles";

interface UserRoleRowProps {
  userRole: UserRoleData;
  selectedRole?: Role;
  onRoleSelect: (role: Role) => void;
  onUpdateRole: () => void;
  isUpdating: boolean;
}

export function UserRoleRow({
  userRole,
  selectedRole,
  onRoleSelect,
  onUpdateRole,
  isUpdating,
}: UserRoleRowProps) {
  return (
    <TableRow key={userRole.id}>
      <TableCell>{userRole.full_name || "N/A"}</TableCell>
      <TableCell>{userRole.email || "N/A"}</TableCell>
      <TableCell>{userRole.role}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <RoleSelector value={selectedRole} onValueChange={onRoleSelect} />
          <Button
            variant="outline"
            size="sm"
            onClick={onUpdateRole}
            disabled={!selectedRole || isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}