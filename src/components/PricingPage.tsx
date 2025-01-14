import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function PricingPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe to a plan",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/dashboard?checkout=success`,
          cancelUrl: `${window.location.origin}/pricing?checkout=cancelled`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground">Choose the plan that's right for you</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$29/month</div>
            <ul className="space-y-2">
              <li>✓ Up to 5 properties</li>
              <li>✓ Basic analytics</li>
              <li>✓ Email support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleSubscribe('price_basic')}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Subscribe Now'}
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="border-gold">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For growing portfolios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$79/month</div>
            <ul className="space-y-2">
              <li>✓ Up to 20 properties</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Priority support</li>
              <li>✓ AI market insights</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-gold hover:bg-gold/90" 
              onClick={() => handleSubscribe('price_pro')}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Subscribe Now'}
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For large portfolios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$199/month</div>
            <ul className="space-y-2">
              <li>✓ Unlimited properties</li>
              <li>✓ Custom analytics</li>
              <li>✓ 24/7 support</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated account manager</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleSubscribe('price_enterprise')}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Contact Sales'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}