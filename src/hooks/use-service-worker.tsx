'use client'

import { useEffect } from 'react'

export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          // Service Worker registered successfully
        })
        .catch(() => {
          // Service Worker registration failed
        })
    }
  }, [])
}

export function ServiceWorkerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useServiceWorker()
  return <>{children}</>
}
