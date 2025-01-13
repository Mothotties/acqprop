import { PropertySearch } from "@/components/PropertySearch";
import { PropertyGrid } from "@/components/property/PropertyGrid";

export function PropertyListingView() {
  return (
    <div className="space-y-6">
      <PropertySearch onSearch={() => {}} onFilterChange={() => {}} />
      <PropertyGrid />
    </div>
  );
}