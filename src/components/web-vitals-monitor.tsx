'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

interface WebVitalsMetrics {
  CLS: number
  INP: number
  FCP: number
  LCP: number
  TTFB: number
}

const metrics: Partial<WebVitalsMetrics> = {}

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      action: string,
      params: {
        event_category: string;
        event_label: string;
        value: number;
        non_interaction: boolean;
        [key: string]: string | number | boolean | undefined;
      }
    ) => void;
  }
}

export function reportWebVitals(metric: { name: string; value: number; id: string }) {
  // Store metric
  metrics[metric.name as keyof WebVitalsMetrics] = metric.value

  // Send to analytics endpoint
  if (typeof window !== 'undefined') {
    // Send to Google Analytics if initialized
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
  }
}

export function WebVitalsMonitor() {
  useEffect(() => {
    // Measure all Web Vitals
    onCLS(reportWebVitals)
    onINP(reportWebVitals)
    onFCP(reportWebVitals)
    onLCP(reportWebVitals)
    onTTFB(reportWebVitals)
  }, [])

  return null
}

export function getWebVitalsMetrics() {
  return metrics
}
