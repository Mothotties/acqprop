import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import { supabase } from "./integrations/supabase/client";
import { PropertyDetails } from "./components/PropertyDetails";
import { PricingPage } from "./components/PricingPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionContextProvider supabaseClient={supabase}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Index />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />
                <Route path="/pricing" element={<PricingPage />} />
              </Routes>
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
};

export default App;