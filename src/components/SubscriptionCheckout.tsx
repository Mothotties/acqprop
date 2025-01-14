import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface SubscriptionCheckoutProps {
  priceId: string;
  buttonText?: string;
}

export function SubscriptionCheckout({ priceId, buttonText = "Subscribe Now" }: SubscriptionCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscription = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      if (error) throw error;

      if (data?.sessionId) {
        // Redirect to Stripe Checkout
        window.location.href = `https://checkout.stripe.com/c/pay/${data.sessionId}`;
      } else {
        throw new Error('Failed to create checkout session');
      }

    } catch (error) {
      console.error('Error:', error);
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
    <Button 
      onClick={handleSubscription} 
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
}