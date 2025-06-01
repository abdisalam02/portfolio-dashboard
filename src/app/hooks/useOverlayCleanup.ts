"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hook to ensure loading overlays are properly cleaned up and don't interfere with page responsiveness
 */
export function useOverlayCleanup() {
  const pathname = usePathname();

  // Cleanup overlays when route changes
  useEffect(() => {
    const cleanup = () => {
      const overlays = document.querySelectorAll('[data-loading-overlay]');
      overlays.forEach(overlay => {
        const element = overlay as HTMLElement;
        element.style.pointerEvents = 'none';
        element.style.opacity = '0';
      });

      // Also cleanup any loading flags on links
      const loadingLinks = document.querySelectorAll('[data-loading="true"]');
      loadingLinks.forEach(link => {
        (link as HTMLElement).dataset.loading = 'false';
      });
    };

    // Immediate cleanup on route change
    cleanup();

    // Cleanup on window focus/blur to handle tab switching
    const handleFocus = () => cleanup();
    const handleBlur = () => cleanup();

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      cleanup();
    };
  }, [pathname]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      const overlays = document.querySelectorAll('[data-loading-overlay]');
      overlays.forEach(overlay => {
        (overlay as HTMLElement).style.pointerEvents = 'none';
      });
    };
  }, []);
}

export default useOverlayCleanup; 