import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PropertyTrendsProps {
  data: Array<{
    month: string;
    value: number;
  }>;
}

// Sample data to use when no real data is provided
const sampleData = [
  { month: "Jan", value: 850000 },
  { month: "Feb", value: 875000 },
  { month: "Mar", value: 890000 },
  { month: "Apr", value: 920000 },
  { month: "May", value: 950000 },
  { month: "Jun", value: 980000 },
];

export function PropertyTrends({ data = [] }: PropertyTrendsProps) {
  // Use sample data if no real data is provided
  const chartData = data.length > 0 ? data : sampleData;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Property Value Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={{ top: 10, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}