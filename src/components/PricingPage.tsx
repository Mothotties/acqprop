import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export function PricingPage() {
  const { toast } = useToast();
  const session = useSession();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!session) {
      navigate("/auth");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {},
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground">Get access to premium features and analytics</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="relative">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Essential features for getting started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">Free</div>
            <ul className="space-y-2">
              <li>✓ Basic property listings</li>
              <li>✓ Simple analytics</li>
              <li>✓ Email support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">Current Plan</Button>
          </CardFooter>
        </Card>

        <Card className="relative border-gold">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold px-4 py-1 rounded-full text-white text-sm">
            Popular
          </div>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>Advanced features for serious investors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$49/mo</div>
            <ul className="space-y-2">
              <li>✓ All Basic features</li>
              <li>✓ Advanced AI analytics</li>
              <li>✓ Market predictions</li>
              <li>✓ Priority support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gold hover:bg-gold/90" onClick={handleSubscribe}>
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>Custom solutions for large portfolios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">Custom</div>
            <ul className="space-y-2">
              <li>✓ All Pro features</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated support</li>
              <li>✓ Custom analytics</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}