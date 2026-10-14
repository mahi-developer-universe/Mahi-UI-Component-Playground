'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to track whether the component is mounted on the client.
 * Useful for preventing hydration mismatch when consuming client-only APIs (e.g. localStorage).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
