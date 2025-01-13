import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyFilters } from "./PropertyFilters";
import { PropertyList } from "./PropertyList";
import { SortOption } from "@/components/analytics/PropertySorting";
import { Property } from "@/types/property";

interface PropertyOverviewCardProps {
  properties: Property[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: SortOption) => void;
  itemsPerPage: number;
}

export function PropertyOverviewCard({
  properties,
  totalCount,
  currentPage,
  onPageChange,
  onSearchChange,
  onSortChange,
  itemsPerPage,
}: PropertyOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Property Overview
          <span className="text-sm font-normal text-muted-foreground">
            {totalCount} Properties
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PropertyFilters 
          onSearchChange={onSearchChange}
          onSortChange={onSortChange}
        />
        <PropertyList
          properties={properties}
          totalCount={totalCount}
          currentPage={currentPage}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
        />
      </CardContent>
    </Card>
  );
}