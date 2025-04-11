// components/StoreHydration.tsx
'use client'

import { useEffect, useState } from 'react';
import { useUserStore } from '../UserStore';

export function HydrateZustand({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const initializeUser = useUserStore((state) => state.initialize)
  // EXAMPLES
  // const loadCart = useCartStore((state) => state.load)
  // const loadSettings = useSettingsStore((state) => state.load)

  useEffect(() => {
    async function hydrateStores() {
      // Hydrate in sequence if there are dependencies
      await initializeUser()
      
      // Hydrate other stores in parallel if no dependencies
      // await Promise.all([
        // loadCart(),
        // loadSettings()
      // ])
      
      setIsHydrated(true)
    }
    
    hydrateStores()
  }, [
    initializeUser,
  ])

  return isHydrated ? children : null
}