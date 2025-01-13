import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const occupancyData = [
  { month: "Jan", occupancy: 92, pricePerSqft: 425 },
  { month: "Feb", occupancy: 94, pricePerSqft: 430 },
  { month: "Mar", occupancy: 95, pricePerSqft: 435 },
  { month: "Apr", occupancy: 93, pricePerSqft: 440 },
  { month: "May", occupancy: 96, pricePerSqft: 445 },
  { month: "Jun", occupancy: 97, pricePerSqft: 450 },
];

export function OccupancyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-amber-500" />
          Price per Square Foot & Occupancy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar
                yAxisId="left"
                dataKey="pricePerSqft"
                fill="#F59E0B"
                name="Price/sqft"
              />
              <Bar
                yAxisId="right"
                dataKey="occupancy"
                fill="#10B981"
                name="Occupancy %"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}