import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Calendar,
  TrendingUp,
  Brain,
} from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {property.location}
          </p>
        </div>
        <Badge variant="secondary" className="text-lg">
          ${property.price.toLocaleString()}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {property.bedrooms && (
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-muted-foreground" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-muted-foreground" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
              )}
              {property.square_feet && (
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-muted-foreground" />
                  <span>{property.square_feet} sq ft</span>
                </div>
              )}
              {property.year_built && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Built {property.year_built}</span>
                </div>
              )}
            </div>
            {property.description && (
              <p className="text-muted-foreground">{property.description}</p>
            )}
          </CardContent>
        </Card>

        {analytics && (
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {analytics.ai_confidence_score && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <span>AI Confidence Score</span>
                    </div>
                    <span className="font-medium">
                      {analytics.ai_confidence_score}%
                    </span>
                  </div>
                )}
                {analytics.predicted_growth && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>Predicted Growth</span>
                    </div>
                    <span className="font-medium text-green-600">
                      {analytics.predicted_growth}%
                    </span>
                  </div>
                )}
                {analytics.cap_rate && (
                  <div className="flex items-center justify-between">
                    <span>Cap Rate</span>
                    <span className="font-medium">{analytics.cap_rate}%</span>
                  </div>
                )}
                {analytics.roi && (
                  <div className="flex items-center justify-between">
                    <span>ROI</span>
                    <span className="font-medium">{analytics.roi}%</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
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
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6" />
              ))}
            </div>
            <Skeleton className="h-24" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-6" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}