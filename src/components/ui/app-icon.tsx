import React from "react";
import { cn } from "@/lib/utils";

export interface AppIconProps {
  name: string;
  symbol?: string;
  bgColor?: string;
  textColor?: string;
  size?: 32 | 48 | 64 | 96;
  className?: string;
}

const sizeClasses = {
  32: "w-8 h-8 text-xs",
  48: "w-12 h-12 text-base",
  64: "w-16 h-16 text-xl",
  96: "w-24 h-24 text-3xl",
};

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  symbol,
  bgColor = "#141414",
  textColor = "#ffffff",
  size = 48,
  className,
}) => {
  const displayChar = symbol || name.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center font-bold tracking-tight select-none shrink-0 transition-transform overflow-hidden",
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: "30%", // Strict 30% squircle
      }}
      title={name}
      aria-label={name}
    >
      <span>{displayChar}</span>
    </div>
  );
};

export const AppIconSquircle = AppIcon;
