import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface MaintenanceRequestFormProps {
  onSubmit: (request: {
    property: string;
    description: string;
    priority: "High" | "Medium" | "Low";
  }) => void;
}

export function MaintenanceRequestForm({ onSubmit }: MaintenanceRequestFormProps) {
  const [newRequest, setNewRequest] = useState({
    property: "",
    description: "",
    priority: "Medium" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newRequest);
    setNewRequest({ property: "", description: "", priority: "Medium" });
  };

  return (
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
              priority: e.target.value as "High" | "Medium" | "Low",
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
  );
}