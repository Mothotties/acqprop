import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building, TrendingUp, Users } from "lucide-react";

export function LocationSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MapPin className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Location Analysis</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Property Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Population Density</span>
                <span className="font-medium">High</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Median Age</span>
                <span className="font-medium">35</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Household Income</span>
                <span className="font-medium">$75,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Market Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Property Value Growth</span>
                <span className="font-medium text-green-600">+5.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rental Demand</span>
                <span className="font-medium">Strong</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Market Saturation</span>
                <span className="font-medium">Medium</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Community Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Schools Rating</span>
                <span className="font-medium">8/10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Crime Rate</span>
                <span className="font-medium text-green-600">Low</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amenities Score</span>
                <span className="font-medium">9/10</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}