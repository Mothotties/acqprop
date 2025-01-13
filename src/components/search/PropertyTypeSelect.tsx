import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface PropertyTypeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function PropertyTypeSelect({ value, onValueChange, disabled }: PropertyTypeSelectProps) {
  return (
    <Select 
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[200px]">
        <Filter className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Property type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Properties</SelectItem>
        <SelectItem value="residential">Residential</SelectItem>
        <SelectItem value="commercial">Commercial</SelectItem>
        <SelectItem value="industrial">Industrial</SelectItem>
        <SelectItem value="land">Land</SelectItem>
      </SelectContent>
    </Select>
  );
}