import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function PropertyDetails() {
  const { id } = useParams();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
        throw new Error("Invalid property ID");
      }

      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          property_analytics(*)
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching property:", error);
        throw error;
      }

      if (!data) {
        throw new Error("Property not found");
      }

      return data;
    },
    retry: (failureCount, error: any) => {
      // Don't retry on 400 errors (invalid UUID)
      if (error?.status === 400) return false;
      return failureCount < 3;
    }
  });

  if (error) {
    toast.error(error instanceof Error ? error.message : "Failed to load property details");
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-destructive">Error loading property details</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p>Property not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{property.title}</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden">
            {property.images && property.images[0] ? (
              <img 
                src={property.images[0]} 
                alt={property.title} 
                className="w-full h-[300px] object-cover"
              />
            ) : (
              <div className="w-full h-[300px] bg-muted flex items-center justify-center">
                No image available
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <p className="text-2xl font-bold">${property.price.toLocaleString()}</p>
            <p className="text-muted-foreground">{property.location}</p>
            <p>{property.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Bedrooms</p>
              <p className="text-lg font-semibold">{property.bedrooms}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Bathrooms</p>
              <p className="text-lg font-semibold">{property.bathrooms}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Square Feet</p>
              <p className="text-lg font-semibold">{property.square_feet}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Year Built</p>
              <p className="text-lg font-semibold">{property.year_built}</p>
            </div>
          </div>

          {property.property_analytics && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Analytics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Risk Score</p>
                  <p className="text-lg font-semibold">
                    {property.property_analytics.risk_score}%
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-lg font-semibold">
                    {property.property_analytics.roi}%
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Market Trend</p>
                  <p className="text-lg font-semibold">
                    {property.property_analytics.market_trend}
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                  <p className="text-lg font-semibold">
                    {property.property_analytics.occupancy_rate}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}