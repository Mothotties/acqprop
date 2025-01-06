import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface PropertySearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

export function PropertySearch({ onSearch, onFilterChange }: PropertySearchProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search properties..."
          className="pl-9"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Select onValueChange={onFilterChange} defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Properties</SelectItem>
          <SelectItem value="multi-family">Multi-Family</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="retail">Retail</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}