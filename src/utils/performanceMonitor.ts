export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

// Define the PerformanceElementTiming interface
interface PerformanceElementTiming extends PerformanceEntry {
  element?: Element;
  id?: string;
  url?: string;
  loadTime?: number;
  renderTime?: number;
  size?: DOMRectReadOnly;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];

  logMetric(name: string, duration: number, metadata?: Record<string, unknown>) {
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    };

    this.metrics.push(metric);
    console.log('Performance metric logged:', metric);

    // Log slow operations as errors
    if (duration > 1000) {
      console.error('Slow operation detected:', {
        message: `Slow operation: ${name}`,
        context: { duration },
        severity: 'low',
        timestamp: new Date().toISOString(),
      });
    }
  }

  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  // Method to observe element timing
  observeElementTiming(elementId: string, callback: (timing: PerformanceElementTiming) => void) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const elementTiming = entry as PerformanceElementTiming;
        if (elementTiming.id === elementId) {
          callback(elementTiming);
        }
      }
    });

    observer.observe({ entryTypes: ['element'] });
    return observer;
  }
}

export const performanceMonitor = new PerformanceMonitor();