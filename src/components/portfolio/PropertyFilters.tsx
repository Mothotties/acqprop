import { PropertySorting, SortOption } from "@/components/analytics/PropertySorting";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PropertyFiltersProps {
  onSearchChange: (search: string) => void;
  onSortChange: (sort: SortOption) => void;
}

export function PropertyFilters({ onSearchChange, onSortChange }: PropertyFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search properties..."
          className="pl-10"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <PropertySorting onSortChange={onSortChange} />
    </div>
  );
}