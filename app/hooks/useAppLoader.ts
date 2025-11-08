"use client";

import { useState, useEffect } from "react";

interface UseAppLoaderReturn {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  completeLoading: () => void;
}

export function useAppLoader(
  initialLoading: boolean = true
): UseAppLoaderReturn {
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    // Check if this is the first visit or a reload
    const hasVisited = sessionStorage.getItem("LegalApp-visited");

    if (!hasVisited) {
      // First visit - show loader
      setIsLoading(true);
      sessionStorage.setItem("LegalApp-visited", "true");
    } else {
      // Returning visit - check if it's a reload
      const isReload = performance.navigation?.type === 1; // TYPE_RELOAD
      setIsLoading(isReload);
    }
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const completeLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    setLoading,
    completeLoading,
  };
}
