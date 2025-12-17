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

export function reportWebVitals(metric: { name: string; value: number }) {
  // Store metric
  metrics[metric.name as keyof WebVitalsMetrics] = metric.value

  // Send to analytics endpoint
  if (typeof window !== 'undefined') {
    // You can send this to your analytics service
    console.log(`${metric.name}:`, metric.value.toFixed(2), 'ms')

    // Example: Send to custom endpoint
    // fetch('/api/vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric),
    // }).catch(() => {})
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
