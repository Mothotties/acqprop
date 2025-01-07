import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Wrench } from "lucide-react";
import { MaintenanceRequestForm } from "./maintenance/MaintenanceRequestForm";
import { MaintenanceRequestItem } from "./maintenance/MaintenanceRequestItem";

interface MaintenanceRequest {
  id: number;
  property: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Completed";
  dateSubmitted: string;
}

const initialRequests: MaintenanceRequest[] = [
  {
    id: 1,
    property: "Luxury Apartment Complex",
    description: "HVAC system maintenance required in Unit 204",
    priority: "High",
    status: "Open",
    dateSubmitted: "2024-01-02",
  },
  {
    id: 2,
    property: "Downtown Office Building",
    description: "Elevator inspection due",
    priority: "Medium",
    status: "In Progress",
    dateSubmitted: "2024-01-01",
  },
];

export function MaintenanceTracker() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests);
  const { toast } = useToast();

  const handleSubmit = (newRequest: {
    property: string;
    description: string;
    priority: MaintenanceRequest["priority"];
  }) => {
    const request: MaintenanceRequest = {
      id: requests.length + 1,
      ...newRequest,
      status: "Open",
      dateSubmitted: new Date().toISOString().split("T")[0],
    };
    setRequests([...requests, request]);
    toast({
      title: "Maintenance Request Created",
      description: "Your request has been submitted successfully.",
    });
  };

  const updateStatus = (id: number, newStatus: MaintenanceRequest["status"]) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
    toast({
      title: "Status Updated",
      description: `Request status changed to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit New Request</CardTitle>
        </CardHeader>
        <CardContent>
          <MaintenanceRequestForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <MaintenanceRequestItem
                key={request.id}
                request={request}
                onUpdateStatus={updateStatus}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}