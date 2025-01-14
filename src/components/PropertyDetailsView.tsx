import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyViewer3D } from "./PropertyViewer3D";
import { PropertyMetrics } from "./PropertyMetrics";
import { LocationAnalysis } from "./LocationAnalysis";
import { RiskAssessmentDashboard } from "./RiskAssessmentDashboard";
import { InvestmentOpportunityScoring } from "./InvestmentOpportunityScoring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function PropertyDetailsView() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Property ID is required");
      }

      const { data, error } = await supabase
        .from("properties")
        .select(`
          *,
          property_analytics (*),
          property_market_data (*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        toast({
          title: "Error loading property",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      return data;
    },
    enabled: !!id // Only run query if we have an ID
  });

  if (isLoading) {
    return <div>Loading property details...</div>;
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

  const metrics = {
    capRate: property.property_analytics?.[0]?.cap_rate || 0,
    roi: property.property_analytics?.[0]?.roi || 0,
    cashFlow: 25000, // Example value
    occupancyRate: property.property_analytics?.[0]?.occupancy_rate,
    appreciationRate: property.property_analytics?.[0]?.predicted_growth,
    riskScore: property.property_analytics?.[0]?.risk_score,
    marketTrend: property.property_analytics?.[0]?.market_trend,
    aiConfidenceScore: property.property_analytics?.[0]?.ai_confidence_score,
    predictedGrowth: property.property_analytics?.[0]?.predicted_growth,
    marketVolatility: property.property_analytics?.[0]?.market_volatility,
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>8K Virtual Tour</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <PropertyViewer3D />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium">${property.price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{property.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property Type</span>
                <span className="font-medium">{property.property_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size</span>
                <span className="font-medium">{property.square_feet} sq ft</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PropertyMetrics metrics={metrics} />
      
      <div className="grid gap-6 md:grid-cols-2">
        <LocationAnalysis />
        <RiskAssessmentDashboard />
      </div>

      <InvestmentOpportunityScoring />
    </div>
  );
}