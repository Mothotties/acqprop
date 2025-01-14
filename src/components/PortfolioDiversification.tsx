import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Building2, Briefcase, Home, Building, Factory, AlertTriangle, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const portfolioData = [
  { name: "Residential", value: 45, color: "#10B981" },
  { name: "Commercial", value: 25, color: "#6366F1" },
  { name: "Industrial", value: 15, color: "#F43F5E" },
  { name: "Mixed-Use", value: 15, color: "#D4AF37" },
];

const metrics = [
  { icon: Home, label: "Residential", value: "45%", color: "text-emerald-500" },
  { icon: Building2, label: "Commercial", value: "25%", color: "text-indigo-500" },
  { icon: Factory, label: "Industrial", value: "15%", color: "text-rose-500" },
  { icon: Building, label: "Mixed-Use", value: "15%", color: "text-amber-500" },
];

export function PortfolioDiversification() {
  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('portfolio-diversification')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'properties'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          toast.success("Portfolio diversification updated");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Portfolio Diversification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className={`text-lg font-bold ${metric.color}`}>
                  {metric.value}
                </span>
              </div>
            ))}
            
            <div className="mt-6 pt-4 border-t space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Diversification Score</span>
                </div>
                <Badge variant="secondary" className="text-lg font-bold">
                  8.5/10
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Risk Level</span>
                </div>
                <Badge 
                  variant="outline" 
                  className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors"
                >
                  Moderate
                </Badge>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>Your portfolio shows a balanced distribution across different property types, 
                with a healthy focus on residential properties. The moderate risk level 
                suggests a well-managed investment strategy.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}