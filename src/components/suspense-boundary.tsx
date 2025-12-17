'use client'

import { Suspense } from 'react'

interface SuspenseBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: React.ReactNode
}

export function SuspenseBoundary({
  children,
  fallback = <LoadingSkeleton />,
}: SuspenseBoundaryProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  )
}

export function GallerySkeleton() {
  return (
    <div className="h-screen bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Loading gallery...</div>
    </div>
  )
}

export function IconCloudSkeleton() {
  return (
    <div className="h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-400">Loading company logos...</div>
    </div>
  )
}
