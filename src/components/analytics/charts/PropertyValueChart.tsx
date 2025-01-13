import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const propertyValueData = [
  { month: "Jan", currentValue: 850000, predictedValue: 855000, marketAverage: 840000 },
  { month: "Feb", currentValue: 860000, predictedValue: 870000, marketAverage: 845000 },
  { month: "Mar", currentValue: 870000, predictedValue: 885000, marketAverage: 855000 },
  { month: "Apr", currentValue: 885000, predictedValue: 900000, marketAverage: 870000 },
  { month: "May", currentValue: 890000, predictedValue: 915000, marketAverage: 880000 },
  { month: "Jun", currentValue: 900000, predictedValue: 925000, marketAverage: 895000 },
];

export function PropertyValueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-500" />
          Property Value Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={propertyValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="currentValue"
                stroke="#10B981"
                name="Current Value"
              />
              <Line
                type="monotone"
                dataKey="predictedValue"
                stroke="#6366F1"
                name="Predicted Value"
              />
              <Line
                type="monotone"
                dataKey="marketAverage"
                stroke="#F43F5E"
                name="Market Average"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}