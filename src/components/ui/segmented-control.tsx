import React from "react";
import { cn } from "@/lib/utils";

export interface SegmentOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  badge?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className,
  size = "md",
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "inline-flex items-center bg-field p-1 rounded-full select-none",
        size === "sm" ? "h-9" : "h-11",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative inline-flex items-center justify-center gap-1.5 font-semibold rounded-full transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
              size === "sm" ? "px-3 text-body-sm h-7" : "px-4 text-body h-9",
              isSelected
                ? "bg-white text-ink shadow-none"
                : "text-muted hover:text-ink bg-transparent"
            )}
          >
            <span>{option.label}</span>
            {option.badge && <span>{option.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
