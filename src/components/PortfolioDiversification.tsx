import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Building2, Briefcase, Home, Building, Factory } from "lucide-react";

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
  return (
    <Card>
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
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className={`text-lg font-bold ${metric.color}`}>
                  {metric.value}
                </span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Diversification Score: <span className="font-bold text-green-500">8.5/10</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Risk Level: <span className="font-bold text-yellow-500">Moderate</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}