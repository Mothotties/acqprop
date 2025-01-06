import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Building2, Clock, AlertCircle } from "lucide-react";

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
  const [newRequest, setNewRequest] = useState({
    property: "",
    description: "",
    priority: "Medium" as MaintenanceRequest["priority"],
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const request: MaintenanceRequest = {
      id: requests.length + 1,
      ...newRequest,
      status: "Open",
      dateSubmitted: new Date().toISOString().split("T")[0],
    };
    setRequests([...requests, request]);
    setNewRequest({ property: "", description: "", priority: "Medium" });
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Property Name"
                value={newRequest.property}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, property: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Describe the maintenance issue..."
                value={newRequest.description}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, description: e.target.value })
                }
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <select
                className="border rounded p-2"
                value={newRequest.priority}
                onChange={(e) =>
                  setNewRequest({
                    ...newRequest,
                    priority: e.target.value as MaintenanceRequest["priority"],
                  })
                }
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{request.property}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.description}
                    </p>
                  </div>
                  <Badge
                    variant={
                      request.priority === "High"
                        ? "destructive"
                        : request.priority === "Medium"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {request.priority}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {request.dateSubmitted}
                    </div>
                    <Badge
                      variant={
                        request.status === "Open"
                          ? "destructive"
                          : request.status === "In Progress"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    {request.status !== "Completed" && (
                      <>
                        {request.status === "Open" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateStatus(request.id, "In Progress")
                            }
                          >
                            Start Work
                          </Button>
                        )}
                        {request.status === "In Progress" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(request.id, "Completed")}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}