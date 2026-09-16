import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "soft" | "outline" | "overlay";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-field text-ink font-semibold",
    soft: "bg-canvas-soft text-muted font-normal",
    outline: "bg-white border border-hairline text-ink font-medium",
    overlay: "bg-ink/80 text-white backdrop-blur-sm font-medium",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label tracking-normal select-none transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Electric Blue is strictly reserved for commercial emphasis (popular pricing badge & yearly savings)
export const BadgePopular: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children = "Most Popular",
  ...props
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-label font-semibold text-white bg-[#0066ff] select-none uppercase tracking-wider text-[11px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const BadgeOverlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption bg-ink/75 text-white backdrop-blur-sm select-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
