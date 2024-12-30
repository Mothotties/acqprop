import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, DollarSign, PieChart } from "lucide-react";
import { PropertySearch } from "./PropertySearch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const performanceData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
];

const allProperties = [
  {
    id: 1,
    name: "Luxury Apartment Complex",
    type: "Multi-Family",
    revenue: 25000,
    occupancy: 95,
    status: "Performing",
  },
  {
    id: 2,
    name: "Downtown Office Building",
    type: "Commercial",
    revenue: 45000,
    occupancy: 88,
    status: "Attention Needed",
  },
  {
    id: 3,
    name: "Retail Plaza",
    type: "Retail",
    revenue: 35000,
    occupancy: 92,
    status: "Performing",
  },
];

export function PortfolioDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredProperties = allProperties.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || property.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-up">
      <PropertySearch
        onSearch={setSearchQuery}
        onFilterChange={setFilterType}
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Properties"
          value={allProperties.length.toString()}
          icon={<Building2 className="w-4 h-4" />}
          trend="+2"
          trendUp={true}
        />
        <MetricCard
          title="Monthly Revenue"
          value="$182,000"
          icon={<DollarSign className="w-4 h-4" />}
          trend="+8.2%"
          trendUp={true}
        />
        <MetricCard
          title="Avg Occupancy"
          value="91.7%"
          icon={<PieChart className="w-4 h-4" />}
          trend="-2.3%"
          trendUp={false}
        />
        <MetricCard
          title="ROI"
          value="15.4%"
          icon={<TrendingUp className="w-4 h-4" />}
          trend="+1.2%"
          trendUp={true}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{property.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      {property.type}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${property.revenue.toLocaleString()}</p>
                    <Badge
                      variant="secondary"
                      className={
                        property.status === "Performing"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {property.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

function MetricCard({ title, value, icon, trend, trendUp }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${
            trendUp ? "text-green-600" : "text-red-600"
          } flex items-center gap-1 mt-1`}
        >
          {trend}
          <TrendingUp className={`w-3 h-3 ${trendUp ? "" : "rotate-180"}`} />
        </p>
      </CardContent>
    </Card>
  );
}
