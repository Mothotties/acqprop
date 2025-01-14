import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, AlertTriangle, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function MaintenanceTracker() {
  const { data: maintenanceRequests } = useQuery({
    queryKey: ['maintenance-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_documents')
        .select(`
          *,
          properties (
            title,
            location
          )
        `)
        .eq('document_type', 'maintenance');

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-8 animate-fade-up">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Maintenance Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceRequests?.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{request.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {request.properties?.title} - {request.properties?.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {request.status === 'pending' ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}

            <Button className="w-full mt-4">
              <Wrench className="w-4 h-4 mr-2" />
              Create New Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}