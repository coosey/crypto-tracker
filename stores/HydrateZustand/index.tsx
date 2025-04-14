'use client'

import { useEffect, useState } from 'react';
import { useAuthStore, useUserStore } from 'stores';

export function HydrateZustand({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const initializeAuth = useAuthStore((state) => state.initialize)
  const initializeUser = useUserStore((state) => state.initialize);

  useEffect(() => {
    async function hydrateStores() {
      await Promise.all([
        initializeAuth(),
        initializeUser(),
      ])
      setIsHydrated(true)
    }
    
    hydrateStores()
  }, [
    initializeAuth,
    initializeUser
  ])

  return isHydrated ? children : null
}