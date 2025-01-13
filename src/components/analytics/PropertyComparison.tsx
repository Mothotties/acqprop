import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PropertySelection } from "./PropertySelection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Brain, Download, TrendingUp, AlertTriangle } from "lucide-react";
import { exportToCSV } from "@/utils/exportUtils";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function PropertyComparison() {
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>([]);
  const { toast } = useToast();

  const { data: comparisonData } = useQuery({
    queryKey: ['propertyComparison', selectedPropertyIds],
    enabled: selectedPropertyIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_analytics (
            ai_confidence_score,
            risk_score,
            predicted_growth,
            roi
          ),
          property_market_data (
            market_value,
            price_per_sqft,
            market_demand_score
          )
        `)
        .in('id', selectedPropertyIds);

      if (error) throw error;
      return data;
    },
  });

  const handlePropertySelect = (propertyId: string) => {
    if (selectedPropertyIds.includes(propertyId)) {
      setSelectedPropertyIds(prev => prev.filter(id => id !== propertyId));
    } else if (selectedPropertyIds.length < 3) {
      setSelectedPropertyIds(prev => [...prev, propertyId]);
    } else {
      toast({
        title: "Maximum properties reached",
        description: "You can compare up to 3 properties at a time",
      });
    }
  };

  const handleExport = () => {
    if (!comparisonData) return;

    const exportData = comparisonData.map(property => ({
      Property: property.title,
      Location: property.location,
      Price: property.price,
      'Market Value': property.property_market_data?.[0]?.market_value,
      'Price per Sqft': property.property_market_data?.[0]?.price_per_sqft,
      'AI Confidence': property.property_analytics?.[0]?.ai_confidence_score,
      'Risk Score': property.property_analytics?.[0]?.risk_score,
      'Predicted Growth': property.property_analytics?.[0]?.predicted_growth,
      ROI: property.property_analytics?.[0]?.roi,
    }));

    exportToCSV(exportData, 'property-comparison');
    toast({
      title: "Export successful",
      description: "Property comparison data has been exported to CSV",
    });
  };

  const chartData = comparisonData?.map(property => ({
    name: property.title?.substring(0, 20) + '...',
    value: property.price,
    predicted: property.property_market_data?.[0]?.market_value || 0,
    roi: property.property_analytics?.[0]?.roi || 0,
    risk: property.property_analytics?.[0]?.risk_score || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-500" />
            AI-Powered Property Comparison
          </div>
          {comparisonData && comparisonData.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <PropertySelection
            onSelect={handlePropertySelect}
            selectedIds={selectedPropertyIds}
          />

          {chartData && chartData.length > 0 && (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Current Value" fill="#10B981" />
                  <Bar dataKey="predicted" name="Predicted Value" fill="#6366F1" />
                  <Bar dataKey="roi" name="ROI %" fill="#F59E0B" />
                  <Bar dataKey="risk" name="Risk Score" fill="#F43F5E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {comparisonData && (
            <div className="grid gap-4 md:grid-cols-3">
              {comparisonData.map(property => (
                <Card key={property.id} className="p-4">
                  <h3 className="font-semibold mb-2">{property.title}</h3>
                  <div className="space-y-2">
                    <MetricItem
                      label="AI Confidence"
                      value={`${property.property_analytics?.[0]?.ai_confidence_score}%`}
                      icon={<Brain className="w-4 h-4" />}
                    />
                    <MetricItem
                      label="Growth Potential"
                      value={`${property.property_analytics?.[0]?.predicted_growth}%`}
                      icon={<TrendingUp className="w-4 h-4 text-green-500" />}
                    />
                    <MetricItem
                      label="Risk Level"
                      value={getRiskLevel(property.property_analytics?.[0]?.risk_score)}
                      icon={<AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function MetricItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function getRiskLevel(score?: number) {
  if (!score) return 'N/A';
  if (score <= 3) return 'Low';
  if (score <= 7) return 'Medium';
  return 'High';
}