import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SUBSCRIPTION_TIERS = {
  basic: {
    priceId: "price_1QhCqV03YCYlFW6DJDUIp4ZO",
    name: "Basic",
    description: "Perfect for getting started",
    price: "$29/mo",
    features: [
      "Up to 5 properties",
      "Basic analytics",
      "Email support"
    ]
  },
  pro: {
    priceId: "price_1QhCqB03YCYlFW6DPN5E2qiD",
    name: "Pro",
    description: "For growing portfolios",
    price: "$79/mo",
    features: [
      "Up to 20 properties",
      "Advanced analytics",
      "Priority support",
      "AI market predictions"
    ]
  },
  enterprise: {
    priceId: "price_1Qgj4y03YCYlFW6DWO35RMwV",
    name: "Enterprise",
    description: "For large portfolios",
    price: "Contact us",
    features: [
      "Unlimited properties",
      "Custom analytics",
      "24/7 support",
      "Custom integrations"
    ]
  }
};

export function PricingPage() {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = async (tier: keyof typeof SUBSCRIPTION_TIERS) => {
    try {
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe to a plan",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: SUBSCRIPTION_TIERS[tier].priceId }
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error starting checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include access to our core features
          and AI-powered analytics.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => (
          <Card key={key} className={key === 'pro' ? 'border-gold' : ''}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <p className="text-3xl font-bold">{tier.price}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe(key as keyof typeof SUBSCRIPTION_TIERS)}
                className={`w-full ${key === 'enterprise' ? '' : 'bg-gold hover:bg-gold/90'}`}
                variant={key === 'enterprise' ? 'outline' : 'default'}
              >
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}