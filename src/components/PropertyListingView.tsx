import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PropertyFilters } from "./property/PropertyFilters";
import { PropertyGrid } from "./property/PropertyGrid";
import type { SortOption } from "./analytics/PropertySorting";

export function PropertyListingView() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortOption, setSortOption] = useState<SortOption>({ 
    field: "created_at", 
    direction: "desc" 
  });

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", sortOption],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select("*")
        .order(sortOption.field, { ascending: sortOption.direction === "asc" });

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error fetching properties",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    },
  });

  const filteredProperties = properties?.filter((property) => {
    const matchesSearch = property.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All Types" || property.property_type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <PropertyFilters
        onSearch={setSearchTerm}
        onFilterChange={setSelectedType}
        onSortChange={setSortOption}
      />
      <PropertyGrid 
        properties={filteredProperties || []} 
        isLoading={isLoading} 
      />
    </div>
  );
}