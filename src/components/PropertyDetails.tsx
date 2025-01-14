import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { PropertyHeader } from "./property/PropertyHeader";
import { PropertyFeatures } from "./property/PropertyFeatures";
import { PropertyAnalytics } from "./property/PropertyAnalytics";

export function PropertyDetails() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data: propertyData, error: propertyError } = await supabase
        .from("properties")
        .select(`
          *,
          property_analytics (*)
        `)
        .eq("id", id)
        .single();

      if (propertyError) {
        toast({
          title: "Error loading property",
          description: propertyError.message,
          variant: "destructive",
        });
        return null;
      }

      return propertyData;
    },
  });

  if (isLoading) {
    return <PropertyDetailsSkeleton />;
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Property not found</h2>
        <p className="text-muted-foreground">
          The property you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const analytics = property.property_analytics?.[0];

  return (
    <div className="space-y-6">
      <PropertyHeader 
        title={property.title}
        location={property.location}
        price={property.price}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <PropertyFeatures
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          squareFeet={property.square_feet}
          yearBuilt={property.year_built}
          description={property.description}
        />

        {analytics && <PropertyAnalytics analytics={analytics} />}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Contact Agent</Button>
        <Button>Schedule Viewing</Button>
      </div>
    </div>
  );
}

function PropertyDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
      </div>
    </div>
  );
}