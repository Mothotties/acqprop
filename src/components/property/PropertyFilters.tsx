import { PropertySearch } from "@/components/PropertySearch";
import { PropertySorting, type SortOption } from "@/components/analytics/PropertySorting";

interface PropertyFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: SortOption) => void;
}

export function PropertyFilters({ onSearch, onFilterChange, onSortChange }: PropertyFiltersProps) {
  return (
    <div className="space-y-4">
      <PropertySearch onSearch={onSearch} onFilterChange={onFilterChange} />
      <PropertySorting onSortChange={onSortChange} />
    </div>
  );
}