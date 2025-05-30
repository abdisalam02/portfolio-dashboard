"use client";

import Link from "next/link";
import { useLoading } from "./LoadingProvider";
import { ReactNode, MouseEvent } from "react";

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any; // Allow other props to be passed through
}

export default function LoadingLink({ 
  href, 
  children, 
  className = "", 
  onClick,
  ...props 
}: LoadingLinkProps) {
  const { startLoading } = useLoading();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Start loading animation with target page
    startLoading(href);
    
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