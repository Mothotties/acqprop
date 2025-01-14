type ErrorSeverity = "low" | "medium" | "high" | "critical";

interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: string;
  severity: ErrorSeverity;
  userId?: string;
  context?: Record<string, unknown>;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private logs: ErrorLog[] = [];
  private readonly MAX_LOGS = 100;

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  log(error: Error, severity: ErrorSeverity = "medium", context?: Record<string, unknown>) {
    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      severity,
      context,
    };

    console.error("Error logged:", errorLog);
    this.logs.unshift(errorLog);

    // Keep only the last MAX_LOGS entries
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(0, this.MAX_LOGS);
    }

    // Here we could send to an external logging service
  }

  getLogs(): ErrorLog[] {
    return this.logs;
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const errorLogger = ErrorLogger.getInstance();
