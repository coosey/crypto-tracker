'use client'

import { useEffect } from 'react'
import { useUserStore } from 'stores';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useUserStore((state) => state.initialize);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    initialize().then((result) => {
      unsubscribe = result;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [initialize])

  return <>{children}</>
}