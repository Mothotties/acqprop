import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/5kA4jH17b5ZlbbqdQQ";

export function PricingPage() {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    window.location.href = STRIPE_PAYMENT_LINK;
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
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <p className="text-3xl font-bold">$29/mo</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Up to 5 properties</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Basic analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Email support</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubscribe}
              className="w-full bg-gold hover:bg-gold/90"
            >
              Subscribe Now
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-gold">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For growing portfolios</CardDescription>
            <p className="text-3xl font-bold">$79/mo</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Up to 20 properties</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>AI market predictions</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubscribe}
              className="w-full bg-gold hover:bg-gold/90"
            >
              Subscribe Now
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For large portfolios</CardDescription>
            <p className="text-3xl font-bold">Contact us</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Unlimited properties</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Custom analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>24/7 support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Custom integrations</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => window.location.href = "mailto:sales@acqprop.com"}
              className="w-full"
              variant="outline"
            >
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}