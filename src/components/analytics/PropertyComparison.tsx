import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface PropertyComparisonProps {
  onPropertySelect?: (propertyIds: string[]) => void;
}

export function PropertyComparison({ onPropertySelect }: PropertyComparisonProps) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const { data: properties } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const handlePropertyToggle = (propertyId: string) => {
    setSelectedProperties(prev => {
      const newSelection = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      
      return newSelection;
    });
  };

  useEffect(() => {
    if (onPropertySelect) {
      onPropertySelect(selectedProperties);
    }
  }, [selectedProperties, onPropertySelect]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties?.map((property) => (
            <div key={property.id} className="flex items-center space-x-4">
              <Checkbox
                id={property.id}
                checked={selectedProperties.includes(property.id)}
                onCheckedChange={() => handlePropertyToggle(property.id)}
              />
              <label htmlFor={property.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {property.title} - {property.location}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}