import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect } from "react";
import { ROIMetricsGrid } from "./roi/ROIMetricsGrid";
import { ROIChart } from "./roi/ROIChart";
import { ROIInsights } from "./roi/ROIInsights";

const fetchROIData = async () => {
  const { data, error } = await supabase
    .from('property_analytics')
    .select(`
      *,
      property:properties(
        title,
        price,
        location
      )
    `)
    .order('created_at', { ascending: true });

  if (error) {
    toast.error("Failed to fetch ROI data");
    throw error;
  }

  return data.map(item => ({
    date: new Date(item.created_at).toLocaleDateString(),
    actualROI: item.roi || 0,
    predictedROI: item.predicted_growth || 0,
    confidence: item.ai_confidence_score || 0,
    marketAverage: (item.roi || 0) * 0.85,
  }));
};

export function ROIPerformanceTracker() {
  const { data: roiData = [], isLoading } = useQuery({
    queryKey: ['roiPerformance'],
    queryFn: fetchROIData,
  });

  // Set up real-time subscription for updates
  useEffect(() => {
    const channel = supabase
      .channel('roi-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_analytics'
        },
        (payload) => {
          console.log('ROI update:', payload);
          toast.success("ROI data updated");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle>ROI Performance Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-muted rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const latestData = roiData[roiData.length - 1] || {
    actualROI: 0,
    predictedROI: 0,
    confidence: 0
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-ai" />
          ROI Performance Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ROIMetricsGrid 
            latestROI={latestData.actualROI}
            predictedROI={latestData.predictedROI}
            confidenceScore={latestData.confidence}
            marketStatus="Active"
          />
          
          <ROIChart data={roiData} />
          
          <ROIInsights 
            roiValue={latestData.predictedROI}
            occupancyRate={96}
            confidenceScore={latestData.confidence}
          />
        </div>
      </CardContent>
    </Card>
  );
}