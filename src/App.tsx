import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <AuthGuard>
                <DashboardLayout>
                  <Routes>
                    <Route index element={<Index />} />
                    <Route path="/property/:id" element={<PropertyDetailsView />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/documents" element={<DocumentManager />} />
                    <Route path="/maintenance" element={<MaintenanceTracker />} />
                    <Route path="/analysis" element={<Analytics />} />
                    <Route path="/evaluation" element={<Analytics />} />
                    <Route path="/ai-analysis" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </DashboardLayout>
              </AuthGuard>
            } />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;