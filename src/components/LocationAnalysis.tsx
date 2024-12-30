import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, TrendingUp, Users, School, Car, ShoppingBag, Heart, Shield } from "lucide-react";

const marketTrendData = [
  { month: 'Jan', value: 2500 },
  { month: 'Feb', value: 2600 },
  { month: 'Mar', value: 2800 },
  { month: 'Apr', value: 3000 },
  { month: 'May', value: 2900 },
  { month: 'Jun', value: 3100 },
];

export function LocationAnalysis() {
  return (
    <div className="grid gap-4 animate-fade-up">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#D4AF37" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <MetricCard
              icon={<Building2 className="h-4 w-4" />}
              label="Market Growth"
              value="+15.3%"
              badge={{ text: "Growing", className: "bg-green-100 text-green-800" }}
            />
            <MetricCard
              icon={<Users className="h-4 w-4" />}
              label="Population Growth"
              value="+2.3%"
              badge={{ text: "Stable", className: "bg-blue-100 text-blue-800" }}
            />
            <MetricCard
              icon={<TrendingUp className="h-4 w-4" />}
              label="Price Trend"
              value="$285/sqft"
              badge={{ text: "Premium", className: "bg-gold-light/10 text-gold-dark" }}
            />
            <MetricCard
              icon={<Building2 className="h-4 w-4" />}
              label="Rental Demand"
              value="High"
              badge={{ text: "Strong", className: "bg-green-100 text-green-800" }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ScoreItem label="Age Distribution" score={75} />
              <ScoreItem label="Income Level" score={85} />
              <ScoreItem label="Education Level" score={90} />
              <ScoreItem label="Employment Rate" score={95} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Area Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <FeatureCard icon={<School />} label="Schools" rating={4.5} count={12} />
              <FeatureCard icon={<ShoppingBag />} label="Shopping" rating={4.2} count={8} />
              <FeatureCard icon={<Car />} label="Transport" rating={4.0} count={5} />
              <FeatureCard icon={<Heart />} label="Healthcare" rating={4.8} count={3} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge: {
    text: string;
    className: string;
  };
}

function MetricCard({ icon, label, value, badge }: MetricCardProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <Badge variant="secondary" className={badge.className}>
        {badge.text}
      </Badge>
    </div>
  );
}

interface ScoreItemProps {
  label: string;
  score: number;
}

function ScoreItem({ label, score }: ScoreItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{score}%</span>
      </div>
      <Progress value={score} className="h-2" />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  label: string;
  rating: number;
  count: number;
}

function FeatureCard({ icon, label, rating, count }: FeatureCardProps) {
  return (
    <div className="p-4 border rounded-lg space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Rating: {rating}/5</span>
        <span className="text-xs text-muted-foreground">({count})</span>
      </div>
    </div>
  );
}