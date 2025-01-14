import { useState } from "react";
import { Brain, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AISearchResult {
  properties: Array<{
    id: string;
    title: string;
    score: number;
    match_reason: string;
  }>;
  total: number;
}

export function AISearchInterface() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["ai-search", searchQuery],
    queryFn: async (): Promise<AISearchResult> => {
      if (!searchQuery) return { properties: [], total: 0 };
      
      const { data, error } = await supabase
        .from("properties")
        .select(`
          id,
          title,
          property_analytics (
            ai_confidence_score
          )
        `)
        .textSearch("title", searchQuery)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return {
        properties: data.map(p => ({
          id: p.id,
          title: p.title,
          score: p.property_analytics?.[0]?.ai_confidence_score || 0,
          match_reason: "AI-powered match based on your search criteria"
        })),
        total: data.length
      };
    },
    enabled: searchQuery.length > 0
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search properties with AI assistance..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-20"
        />
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 gap-2"
          disabled={isLoading}
        >
          <Brain className="h-4 w-4" />
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          AI Search
        </Button>
      </div>

      {error && (
        <div className="text-destructive text-sm">
          Error: {error.message}
        </div>
      )}

      {data?.properties.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Found {data.total} properties matching your search
          </p>
          <div className="divide-y">
            {data.properties.map((property) => (
              <div key={property.id} className="py-2">
                <h3 className="font-medium">{property.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {property.match_reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}