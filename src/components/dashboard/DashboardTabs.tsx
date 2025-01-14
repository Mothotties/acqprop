import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainDashboardTab } from "./tabs/MainDashboardTab";
import { InvestmentsTab } from "./tabs/InvestmentsTab";
import { PropertiesTab } from "./tabs/PropertiesTab";
import { LocationTab } from "./tabs/LocationTab";
import { useState } from "react";

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('main');

  return (
    <Tabs defaultValue="main" className="space-y-6" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="main">Overview</TabsTrigger>
        <TabsTrigger value="investments">Investments</TabsTrigger>
        <TabsTrigger value="properties">Properties</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
      </TabsList>
      
      <MainDashboardTab active={activeTab === 'main'} />
      <InvestmentsTab active={activeTab === 'investments'} />
      <PropertiesTab active={activeTab === 'properties'} />
      <LocationTab active={activeTab === 'location'} />
    </Tabs>
  );
}