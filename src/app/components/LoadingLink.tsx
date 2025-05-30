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