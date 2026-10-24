"use client";

import { ReactNode } from "react";

/**
 * Uses native hardware-accelerated browser scrolling on both desktop and mobile
 * so wheel/trackpad scrolling never fights virtual scroll momentum or auto-scrolling
 * project preview containers in the middle of the page.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
