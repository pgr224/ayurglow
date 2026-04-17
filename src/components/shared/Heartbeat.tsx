"use client"

import { useEffect } from 'react'

/**
 * Heartbeat component to keep the worker warm and monitor session activity.
 * Pings /api/heartbeat every 5 minutes.
 */
export function Heartbeat() {
  useEffect(() => {
    // Initial heartbeat
    const ping = () => {
      fetch('/api/heartbeat').catch(() => {
        // Silently fail if offline or error
      })
    }

    ping()

    // Interval every 5 minutes (300,000 ms)
    const interval = setInterval(ping, 300000)

    return () => clearInterval(interval)
  }, [])

  return null
}
