import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Clock } from "lucide-react";

interface MaintenanceRequest {
  id: number;
  property: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Completed";
  dateSubmitted: string;
}

interface MaintenanceRequestItemProps {
  request: MaintenanceRequest;
  onUpdateStatus: (id: number, status: MaintenanceRequest["status"]) => void;
}

export function MaintenanceRequestItem({
  request,
  onUpdateStatus,
}: MaintenanceRequestItemProps) {
  return (
    <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">{request.property}</span>
          </div>
          <p className="text-sm text-muted-foreground">{request.description}</p>
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
                  onClick={() => onUpdateStatus(request.id, "In Progress")}
                >
                  Start Work
                </Button>
              )}
              {request.status === "In Progress" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateStatus(request.id, "Completed")}
                >
                  Mark Complete
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}