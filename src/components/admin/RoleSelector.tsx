import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/types/roles";

interface RoleSelectorProps {
  value?: Role;
  onValueChange: (value: Role) => void;
}

export function RoleSelector({ value, onValueChange }: RoleSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="agent">Agent</SelectItem>
        <SelectItem value="investor">Investor</SelectItem>
      </SelectContent>
    </Select>
  );
}