import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Target, DollarSign } from "lucide-react";

interface OpportunityCard {
  title: string;
  location: string;
  price: number;
  aiScore: number;
  potentialRoi: number;
  riskLevel: string;
}

const opportunities: OpportunityCard[] = [
  {
    title: "Luxury Apartment Complex",
    location: "Beverly Hills, CA",
    price: 2500000,
    aiScore: 92,
    potentialRoi: 15.4,
    riskLevel: "Low",
  },
  {
    title: "Commercial Office Space",
    location: "Downtown LA",
    price: 4800000,
    aiScore: 88,
    potentialRoi: 12.8,
    riskLevel: "Medium",
  },
  {
    title: "Retail Plaza",
    location: "Santa Monica",
    price: 3200000,
    aiScore: 90,
    potentialRoi: 14.2,
    riskLevel: "Low",
  },
];

export function InvestmentOpportunities() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">AI-Powered Investment Opportunities</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {opportunities.map((opportunity, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{opportunity.location}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="font-medium">
                    ${opportunity.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Confidence Score</span>
                  <div className="flex items-center gap-1">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="font-medium">{opportunity.aiScore}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Potential ROI</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-green-600">
                      {opportunity.potentialRoi}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{opportunity.riskLevel}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}