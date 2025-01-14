import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionCheckout } from "@/components/SubscriptionCheckout";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    description: "Essential features for individual investors",
    priceId: "price_1QhCqV03YCYlFW6DJDUIp4ZO",
    features: [
      "Basic property analytics",
      "Market trends overview",
      "Standard support",
      "Up to 5 property comparisons",
      "Basic AI insights"
    ]
  },
  {
    name: "Pro",
    price: "$29.99",
    description: "Advanced features for professional investors",
    priceId: "price_1QhCqB03YCYlFW6DPN5E2qiD",
    features: [
      "Advanced AI-powered analytics",
      "Real-time market insights",
      "Priority support",
      "Unlimited property comparisons",
      "Advanced AI predictions",
      "Custom reports"
    ]
  },
  {
    name: "Enterprise",
    price: "$99.99",
    description: "Complete solution for investment firms",
    priceId: "price_1Qgj4y03YCYlFW6DWO35RMwV",
    features: [
      "Full access to all features",
      "Custom AI models",
      "Dedicated support",
      "API access",
      "Custom integrations",
      "Team collaboration tools",
      "Advanced security features"
    ]
  }
];

export function PricingPage() {
  return (
    <div className="container py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your investment needs. All plans include access to our core features.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <SubscriptionCheckout 
                priceId={plan.priceId}
                buttonText={`Subscribe to ${plan.name}`}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}