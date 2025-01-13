import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowUp, ArrowDown, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MarketAlerts() {
  const alerts = [
    {
      type: "opportunity",
      title: "Price Drop Alert",
      description: "10% price reduction on luxury properties in Beverly Hills",
      impact: "High",
      icon: ArrowDown,
      color: "text-green-500",
      badge: "bg-green-100 text-green-800",
    },
    {
      type: "trend",
      title: "Market Trend Alert",
      description: "Rising demand in downtown residential properties",
      impact: "Medium",
      icon: ArrowUp,
      color: "text-blue-500",
      badge: "bg-blue-100 text-blue-800",
    },
    {
      type: "risk",
      title: "Risk Alert",
      description: "Potential zoning changes in Santa Monica area",
      impact: "Medium",
      icon: AlertTriangle,
      color: "text-yellow-500",
      badge: "bg-yellow-100 text-yellow-800",
    },
    {
      type: "info",
      title: "Market Update",
      description: "New tax incentives for first-time investors",
      impact: "Low",
      icon: Info,
      color: "text-purple-500",
      badge: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-primary" />
          Market Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <alert.icon className={`w-5 h-5 ${alert.color} mt-1`} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{alert.title}</p>
                  <Badge className={alert.badge}>
                    {alert.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {alert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}