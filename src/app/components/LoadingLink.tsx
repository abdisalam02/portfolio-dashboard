/* eslint-disable */
"use client";

import Link from "next/link";
import { useLoading } from "./LoadingProvider";
import { ReactNode, MouseEvent, ComponentProps } from "react";

interface LoadingLinkProps extends Omit<ComponentProps<typeof Link>, 'href' | 'children' | 'onClick'> {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default function LoadingLink({ 
  href, 
  children, 
  className = "", 
  onClick,
  ...props 
}: LoadingLinkProps) {
  const { startLoading, stopLoading } = useLoading();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Prevent multiple clicks
    const target = event.currentTarget;
    if (target.dataset.loading === "true") {
      event.preventDefault();
      return;
    }
    
    target.dataset.loading = "true";
    
    // Immediate cleanup of any existing overlays
    const existingOverlays = document.querySelectorAll('[data-loading-overlay]');
    existingOverlays.forEach(overlay => {
      (overlay as HTMLElement).style.pointerEvents = 'none';
    });
    
    // Start loading animation with target page
    startLoading(href);
    
    // Quick cleanup timer for smooth transitions
    const cleanupTimer = setTimeout(() => {
      target.dataset.loading = "false";
      // Emergency stop loading if still active
      stopLoading();
    }, 400); // Reduced from 600ms to 400ms for smoother handoff
    
    // Clear timer if component unmounts
    const clearTimer = () => {
      clearTimeout(cleanupTimer);
      target.dataset.loading = "false";
    };
    
    // Add cleanup on page visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimer();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange, { once: true });
    
    // Call any additional onClick handler
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
} 