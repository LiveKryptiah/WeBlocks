import React from "react";
import { cn } from "@/lib/utils";
import { ButtonPrimary } from "./button";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-12 sm:p-16 rounded-md bg-canvas-soft border-none my-8",
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-field flex items-center justify-center text-muted mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-h4 text-ink font-bold mb-2">{title}</h3>
      <p className="text-body text-muted max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <ButtonPrimary onClick={onAction}>{actionLabel}</ButtonPrimary>
      )}
    </div>
  );
};

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn("bg-field rounded-sm animate-pulse", className)}
      aria-hidden="true"
    />
  );
};

export const ScreenshotSkeletonGrid: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <LoadingSkeleton className="w-full aspect-[9/16] rounded-sm" />
          <div className="flex items-center gap-3">
            <LoadingSkeleton className="w-8 h-8 rounded-squircle shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <LoadingSkeleton className="h-4 w-2/3" />
              <LoadingSkeleton className="h-3 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
