import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionCheckoutProps {
  priceId: string;
  buttonText?: string;
}

export function SubscriptionCheckout({ priceId, buttonText = "Subscribe" }: SubscriptionCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      console.log("[SubscriptionCheckout] Starting checkout process for priceId:", priceId);

      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe to a plan",
          variant: "destructive",
        });
        return;
      }

      console.log("[SubscriptionCheckout] Invoking create-checkout function");
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      if (error) {
        console.error("[SubscriptionCheckout] Function invocation error:", error);
        throw error;
      }

      console.log("[SubscriptionCheckout] Checkout session created:", data);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('[SubscriptionCheckout] Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading}
      className="w-full bg-gold hover:bg-gold/90 text-white"
    >
      {loading ? (
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