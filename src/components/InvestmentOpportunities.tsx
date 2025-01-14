import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Target, DollarSign } from "lucide-react";

/**
 * Interface defining the structure of an opportunity card
 */
interface OpportunityCard {
  title: string;
  location: string;
  price: number;
  aiScore: number;
  potentialRoi: number;
  riskLevel: string;
}

/**
 * Sample investment opportunities data
 * In a production environment, this would be fetched from an API
 */
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

/**
 * InvestmentOpportunities Component
 * Displays a grid of AI-recommended investment opportunities
 * Features:
 * - Property details
 * - AI confidence scores
 * - ROI predictions
 * - Risk assessments
 */
export function InvestmentOpportunities() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">AI-Powered Investment Opportunities</h2>
      </div>

      {/* Opportunities Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {opportunities.map((opportunity, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{opportunity.location}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Price Information */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="font-medium">
                    ${opportunity.price.toLocaleString()}
                  </span>
                </div>
                {/* AI Confidence Score */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Confidence Score</span>
                  <div className="flex items-center gap-1">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="font-medium">{opportunity.aiScore}%</span>
                  </div>
                </div>
                {/* ROI Potential */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Potential ROI</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-green-600">
                      {opportunity.potentialRoi}%
                    </span>
                  </div>
                </div>
                {/* Risk Level */}
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