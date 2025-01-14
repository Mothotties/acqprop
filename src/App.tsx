import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./integrations/supabase/client";
import { AuthGuard } from "./components/AuthGuard";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const PropertyDetails = lazy(() => import("./components/PropertyDetails").then(module => ({ default: module.PropertyDetails })));
const PricingPage = lazy(() => import("./components/PricingPage").then(module => ({ default: module.PricingPage })));
const CreatePropertyForm = lazy(() => import("./components/property/CreatePropertyForm").then(module => ({ default: module.CreatePropertyForm })));
const ProfileManagement = lazy(() => import("./components/profile/ProfileManagement").then(module => ({ default: module.ProfileManagement })));
const RoleManagement = lazy(() => import("./components/admin/RoleManagement").then(module => ({ default: module.RoleManagement })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="p-8 space-y-4">
    <Skeleton className="h-8 w-[250px]" />
    <Skeleton className="h-[200px] w-full" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-[150px]" />
      ))}
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      gcTime: 1000 * 60 * 10, // Keep unused data in cache for 10 minutes
      refetchOnWindowFocus: false, // Disable automatic refetching when window gains focus
    },
    mutations: {
      onSettled: (data, error) => {
        if (error) {
          console.error("Mutation error:", error);
        }
      },
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionContextProvider supabaseClient={supabase}>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <BrowserRouter>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route
                      path="/"
                      element={
                        <AuthGuard>
                          <Index />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <AuthGuard>
                          <ProfileManagement />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="/admin/roles"
                      element={
                        <AuthGuard requiredRole={["admin"]}>
                          <RoleManagement />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="/properties/create"
                      element={
                        <AuthGuard requiredRole={["admin", "agent"]}>
                          <CreatePropertyForm />
                        </AuthGuard>
                      }
                    />
                    <Route path="/properties/:id" element={<PropertyDetails />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </SessionContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;