import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { SubscriptionCheckout } from "./SubscriptionCheckout";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    description: "Essential features for individual investors",
    priceId: "price_basic", // Replace with your actual Stripe price ID
    features: [
      "Basic property analytics",
      "Market trends overview",
      "Property comparison tools",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: "$29.99",
    description: "Advanced features for professional investors",
    priceId: "price_pro", // Replace with your actual Stripe price ID
    features: [
      "Advanced AI-powered analytics",
      "Real-time market insights",
      "Portfolio optimization tools",
      "Priority support",
      "Custom reports"
    ]
  },
  {
    name: "Enterprise",
    price: "$99.99",
    description: "Complete solution for investment firms",
    priceId: "price_enterprise", // Replace with your actual Stripe price ID
    features: [
      "Full access to all features",
      "Custom AI models",
      "API access",
      "Dedicated account manager",
      "24/7 premium support",
      "Custom integrations"
    ]
  }
];

export function PricingPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground">
          Choose the perfect plan for your investment needs
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
              <div className="text-3xl font-bold mb-6">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <SubscriptionCheckout 
                priceId={plan.priceId}
                buttonText={`Get ${plan.name}`}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}