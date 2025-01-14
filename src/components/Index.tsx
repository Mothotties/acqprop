import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Index() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to ACQPROP</h1>
      <div className="grid gap-4">
        <Button onClick={() => navigate("/properties")}>
          View Properties
        </Button>
        <Button onClick={() => navigate("/analytics")}>
          View Analytics
        </Button>
      </div>
    </div>
  );
}