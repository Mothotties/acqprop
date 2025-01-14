import { errorLogger } from './errorLogger';

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private readonly MAX_METRICS = 100;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.observeLoadingMetrics();
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private observeLoadingMetrics() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          this.logMetric('LCP', entry.startTime, { element: entry.element?.tagName });
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  logMetric(name: string, duration: number, metadata?: Record<string, unknown>) {
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    };

    this.metrics.unshift(metric);

    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(0, this.MAX_METRICS);
    }

    if (duration > 1000) {
      errorLogger.log(
        new Error(`Slow operation: ${name}`),
        'low',
        { duration, ...metadata }
      );
    }

    console.info(`Performance metric - ${name}: ${duration.toFixed(2)}ms`, metadata);
  }

  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  clearMetrics(): void {
    this.metrics = [];
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();