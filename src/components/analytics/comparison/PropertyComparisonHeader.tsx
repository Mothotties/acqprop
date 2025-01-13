import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import { PropertyFilters, type PropertyFilters as Filters } from "../PropertyFilters";
import { PropertySorting, type SortOption } from "../PropertySorting";

interface PropertyComparisonHeaderProps {
  onFilterChange: (filters: Filters) => void;
  onSortChange: (sort: SortOption) => void;
  onEmailShare: () => void;
  onExport: () => void;
}

export function PropertyComparisonHeader({
  onFilterChange,
  onSortChange,
  onEmailShare,
  onExport,
}: PropertyComparisonHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <PropertyFilters onFilterChange={onFilterChange} />
        <PropertySorting onSortChange={onSortChange} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onEmailShare}
        >
          <Mail className="w-4 h-4" />
          Share via Email
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onExport}
        >
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}