import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, TrendingUp, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

interface AlertSettings {
  priceChanges: boolean;
  marketTrends: boolean;
  demandShifts: boolean;
}

export function MarketAlerts() {
  const [alerts, setAlerts] = useState<AlertSettings>({
    priceChanges: true,
    marketTrends: true,
    demandShifts: false,
  });

  const handleAlertToggle = (setting: keyof AlertSettings) => {
    setAlerts(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      toast.success(`${setting} alerts ${newSettings[setting] ? 'enabled' : 'disabled'}`);
      return newSettings;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-500" />
          Market Alert Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-medium">Price Changes</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Get notified of significant property price changes
              </p>
            </div>
            <Switch
              checked={alerts.priceChanges}
              onCheckedChange={() => handleAlertToggle('priceChanges')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">Market Trends</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Alert me about market trend changes
              </p>
            </div>
            <Switch
              checked={alerts.marketTrends}
              onCheckedChange={() => handleAlertToggle('marketTrends')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Demand Shifts</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Monitor changes in market demand
              </p>
            </div>
            <Switch
              checked={alerts.demandShifts}
              onCheckedChange={() => handleAlertToggle('demandShifts')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}