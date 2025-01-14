import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthGuard } from "@/components/AuthGuard";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PropertyDetailsView } from "@/components/PropertyDetailsView";
import { Auth } from "@/components/Auth";
import { Index } from "@/components/Index";
import { Dashboard } from "@/components/Dashboard";
import { Properties } from "@/components/Properties";
import { Analytics } from "@/components/Analytics";
import { Settings } from "@/components/Settings";
import { Profile } from "@/components/Profile";
import { DocumentManager } from "@/components/DocumentManager";
import { MaintenanceTracker } from "@/components/MaintenanceTracker";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const queryClient = new QueryClient();

// Custom hook to log navigation
const useNavigationLogger = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[Navigation] Route changed:", {
      path: location.pathname,
      timestamp: new Date().toISOString(),
      state: location.state
    });
  }, [location]);

  return { location, navigate };
};

// Route configuration with metadata
const ROUTES = {
  public: {
    auth: {
      path: "/auth",
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

function App() {
  const { location } = useNavigationLogger();

  // Log route access attempts
  useEffect(() => {
    console.log("[Router] Attempting to access route:", {
      path: location.pathname,
      timestamp: new Date().toISOString(),
      isPublicRoute: Object.values(ROUTES.public).some(route => 
        location.pathname === route.path
      )
    });
  }, [location]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path={ROUTES.public.auth.path} element={
              <AuthGuard requireAuth={false}>
                <Auth />
              </AuthGuard>
            } />

            {/* Protected routes */}
            <Route path="/" element={
              <AuthGuard>
                <DashboardLayout>
                  <Routes>
                    <Route index element={
                      <Navigate 
                        to={ROUTES.private.dashboard.path} 
                        replace 
                      />
                    } />
                    <Route path={ROUTES.private.dashboard.path} element={<Dashboard />} />
                    <Route path={ROUTES.private.properties.path} element={<Properties />} />
                    <Route path={ROUTES.private.propertyDetails.path} element={<PropertyDetailsView />} />
                    <Route path={ROUTES.private.documents.path} element={<DocumentManager />} />
                    <Route path={ROUTES.private.maintenance.path} element={<MaintenanceTracker />} />
                    <Route path={ROUTES.private.analysis.path} element={<Analytics />} />
                    <Route path={ROUTES.private.evaluation.path} element={<Analytics />} />
                    <Route path={ROUTES.private.aiAnalysis.path} element={<Analytics />} />
                    <Route path={ROUTES.private.settings.path} element={<Settings />} />
                    <Route path={ROUTES.private.profile.path} element={<Profile />} />
                  </Routes>
                </DashboardLayout>
              </AuthGuard>
            } />

            {/* Catch all route with error handling */}
            <Route path="*" element={
              (() => {
                console.error("[Router] Invalid route accessed:", {
                  path: location.pathname,
                  timestamp: new Date().toISOString()
                });
                toast.error("Page not found");
                return <Navigate to={ROUTES.private.dashboard.path} replace />;
              })()
            } />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;