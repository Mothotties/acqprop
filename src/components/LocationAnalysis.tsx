import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LocationAnalysis() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Market Growth</p>
              <p className="text-2xl font-bold">+15.3%</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Growing
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Avg. Days on Market</p>
              <p className="text-2xl font-bold">45</p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Fast Moving
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Price per Sq Ft</p>
              <p className="text-2xl font-bold">$285</p>
              <Badge variant="secondary" className="bg-gold-light/10 text-gold-dark">
                Premium
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Rental Demand</p>
              <p className="text-2xl font-bold">High</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Strong
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Median Age</span>
                <span className="font-medium">34</span>
              </div>
              <div className="flex justify-between">
                <span>Median Income</span>
                <span className="font-medium">$85,000</span>
              </div>
              <div className="flex justify-between">
                <span>Population Growth</span>
                <span className="font-medium">+2.3%</span>
              </div>
              <div className="flex justify-between">
                <span>Employment Rate</span>
                <span className="font-medium">96%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Flood Risk</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Low
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Crime Rate</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Low
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Natural Disasters</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Medium
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Economic Stability</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  High
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}