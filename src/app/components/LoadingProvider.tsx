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

  // Handle pathname changes
  useEffect(() => {
    // When pathname changes, stop loading after a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTargetPage("");
    }, 1200); // Slightly longer for page-specific animations

    return () => clearTimeout(timer);
  }, [pathname]);

  const startLoading = (targetPath?: string) => {
    setIsLoading(true);
    if (targetPath) {
      setTargetPage(targetPath);
    }
  };

  const stopLoading = () => {
    setIsLoading(false);
    setTargetPage("");
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (!loading) {
      setTargetPage("");
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