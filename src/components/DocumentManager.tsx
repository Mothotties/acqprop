import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DocumentManager() {
  const { data: documents } = useQuery({
    queryKey: ['property-documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_documents')
        .select(`
          *,
          properties (
            title
          )
        `);

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-8 animate-fade-up">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Property Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents?.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {doc.properties?.title}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button className="w-full mt-4">
              <Upload className="w-4 h-4 mr-2" />
              Upload New Document
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}