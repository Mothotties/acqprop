import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PropertyDistributionProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const COLORS = ["#10B981", "#6366F1", "#F43F5E", "#FBBF24"];

// Sample data to use when no real data is provided
const sampleData = [
  { name: "Residential", value: 45 },
  { name: "Commercial", value: 25 },
  { name: "Industrial", value: 15 },
  { name: "Mixed-Use", value: 15 },
];

export function PropertyDistribution({ data = [] }: PropertyDistributionProps) {
  // Use sample data if no real data is provided
  const chartData = data.length > 0 ? data : sampleData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Type Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={(entry) => entry.name}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}