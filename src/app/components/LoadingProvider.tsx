"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import PageLoadingScreen from "./PageLoadingScreen";

interface LoadingContextType {
  isLoading: boolean;
  targetPage: string;
  setLoading: (loading: boolean) => void;
  startLoading: (targetPath?: string) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [targetPage, setTargetPage] = useState("");
  const pathname = usePathname();

  // Handle pathname changes - stop loading immediately when route changes
  useEffect(() => {
    // Immediately stop loading when route changes
    if (isLoading) {
      setIsLoading(false);
      setTargetPage("");
    }
  }, [pathname, isLoading]);

  // Cleanup any stuck overlays on mount
  useEffect(() => {
    const cleanup = () => {
      // Force remove any pointer-events that might be stuck
      const overlays = document.querySelectorAll('[data-loading-overlay]');
      overlays.forEach(overlay => {
        (overlay as HTMLElement).style.pointerEvents = 'none';
      });
    };
    
    cleanup();
    
    // Also cleanup on window focus (in case user switches tabs during loading)
    window.addEventListener('focus', cleanup);
    return () => window.removeEventListener('focus', cleanup);
  }, [isLoading]);

  // Safety cleanup - force stop loading after max time
  useEffect(() => {
    if (isLoading) {
      const safetyTimer = setTimeout(() => {
        console.log("Force stopping loading due to timeout");
        setIsLoading(false);
        setTargetPage("");
        
        // Force cleanup any stuck pointer events
        const overlays = document.querySelectorAll('[data-loading-overlay]');
        overlays.forEach(overlay => {
          (overlay as HTMLElement).style.pointerEvents = 'none';
        });
      }, 500); // Reduced from 800ms to 500ms for faster handoff

      return () => clearTimeout(safetyTimer);
    }
  }, [isLoading]);

  const startLoading = (targetPath?: string) => {
    setIsLoading(true);
    if (targetPath) {
      setTargetPage(targetPath);
    }
  };

  const stopLoading = () => {
    setIsLoading(false);
    setTargetPage("");
    
    // Immediate cleanup of pointer events
    setTimeout(() => {
      const overlays = document.querySelectorAll('[data-loading-overlay]');
      overlays.forEach(overlay => {
        (overlay as HTMLElement).style.pointerEvents = 'none';
      });
    }, 100);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (!loading) {
      setTargetPage("");
      // Immediate cleanup when loading is set to false
      setTimeout(() => {
        const overlays = document.querySelectorAll('[data-loading-overlay]');
        overlays.forEach(overlay => {
          (overlay as HTMLElement).style.pointerEvents = 'none';
        });
      }, 100);
    }
  };

  const contextValue: LoadingContextType = {
    isLoading,
    targetPage,
    setLoading,
    startLoading,
    stopLoading,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      <PageLoadingScreen isLoading={isLoading} targetPage={targetPage} />
      {children}
    </LoadingContext.Provider>
  );
} 