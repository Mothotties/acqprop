import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
          <h2 className="mt-6 text-3xl font-bold">Unauthorized Access</h2>
          <p className="mt-2 text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} variant="default">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}