import { ThemeToggle } from "@/components/ThemeToggle";
import { Header } from "@/components/Header";
import { NavigationTabs } from "@/components/NavigationTabs";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { UserMenu } from "@/components/UserMenu";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const currentTab = location.pathname.split('/')[1] || 'portfolio';

  return (
    <div className="min-h-screen bg-background relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
      
      {/* Header actions */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        <UserMenu />
        <ThemeToggle />
      </div>
      
      <main className="relative container py-12 space-y-8">
        <Header />
        <div className="space-y-8 backdrop-blur-sm bg-background/50 rounded-lg border border-gold/10 p-6 shadow-xl">
          <Tabs value={currentTab} className="w-full space-y-6">
            <NavigationTabs />
            <TabsContent value={currentTab}>
              <AnalyticsDashboard />
              {children}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}