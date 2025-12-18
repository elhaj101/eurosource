'use client'

import { useEffect } from 'react'

export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          // Service Worker registered successfully
        })
        .catch((error) => {
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
