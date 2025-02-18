import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthGuard } from "@/components/AuthGuard";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PropertyDetailsView } from "@/components/PropertyDetailsView";
import { Auth } from "@/components/Auth";
import { Dashboard } from "@/components/Dashboard";
import { Properties } from "@/components/Properties";
import { Analytics } from "@/components/Analytics";
import { Settings } from "@/components/Settings";
import { Profile } from "@/components/Profile";
import { DocumentManager } from "@/components/DocumentManager";
import { MaintenanceTracker } from "@/components/MaintenanceTracker";
import { PricingPage } from "@/components/PricingPage";
import { useEffect, Suspense } from "react";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ROUTES = {
  public: {
    auth: {
      path: "/auth",
      requireAuth: false
    },
    pricing: {
      path: "/pricing",
      requireAuth: false
    }
  },
  private: {
    dashboard: {
      path: "/dashboard",
      requireAuth: true
    },
    properties: {
      path: "/properties",
      requireAuth: true
    },
    propertyDetails: {
      path: "/property/:id",
      requireAuth: true
    },
    documents: {
      path: "/documents",
      requireAuth: true
    },
    maintenance: {
      path: "/maintenance",
      requireAuth: true
    },
    analysis: {
      path: "/analysis",
      requireAuth: true
    },
    evaluation: {
      path: "/evaluation",
      requireAuth: true
    },
    aiAnalysis: {
      path: "/ai-analysis",
      requireAuth: true
    },
    settings: {
      path: "/settings",
      requireAuth: true
    },
    profile: {
      path: "/profile",
      requireAuth: true
    }
  }
};

const NavigationLogger = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("[Navigation] Route changed:", {
      path: location.pathname,
      timestamp: new Date().toISOString(),
      state: location.state
    });

    console.log("[Router] Attempting to access route:", {
      path: location.pathname,
      timestamp: new Date().toISOString(),
      isPublicRoute: Object.values(ROUTES.public).some(route => 
        location.pathname === route.path
      )
    });
  }, [location]);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SessionContextProvider supabaseClient={supabase}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={
              <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-sm text-muted-foreground">Loading application...</p>
                </div>
              </div>
            }>
              <Router>
                <NavigationLogger />
                <Routes>
                  {/* Public routes */}
                  <Route path="/auth" element={
                    <AuthGuard requireAuth={false}>
                      <Auth />
                    </AuthGuard>
                  } />
                  <Route path="/pricing" element={<PricingPage />} />

                  {/* Protected routes wrapped in DashboardLayout */}
                  <Route element={
                    <AuthGuard>
                      <DashboardLayout>
                        <Outlet />
                      </DashboardLayout>
                    </AuthGuard>
                  }>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/property/:id" element={<PropertyDetailsView />} />
                    <Route path="/documents" element={<DocumentManager />} />
                    <Route path="/maintenance" element={<MaintenanceTracker />} />
                    <Route path="/analysis" element={<Analytics />} />
                    <Route path="/evaluation" element={<Analytics />} />
                    <Route path="/ai-analysis" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Router>
            </Suspense>
            <Toaster />
          </QueryClientProvider>
        </SessionContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;