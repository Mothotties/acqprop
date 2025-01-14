import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { errorLogger } from "@/utils/errorLogger";
import { AlertTriangle, Trash2 } from "lucide-react";

export function ErrorLogs() {
  const [logs, setLogs] = useState(errorLogger.getLogs());

  const clearLogs = () => {
    errorLogger.clearLogs();
    setLogs([]);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-yellow-500";
      case "medium":
        return "text-orange-500";
      case "high":
        return "text-red-500";
      case "critical":
        return "text-red-700";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Error Logs
        </CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={clearLogs}
          disabled={logs.length === 0}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          {logs.length === 0 ? (
            <p className="text-center text-muted-foreground">No errors logged</p>
          ) : (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className={getSeverityColor(log.severity)}>
                      {log.severity.toUpperCase()}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 font-medium">{log.message}</p>
                  {log.stack && (
                    <pre className="mt-2 max-h-[100px] overflow-auto rounded bg-muted p-2 text-xs">
                      {log.stack}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}