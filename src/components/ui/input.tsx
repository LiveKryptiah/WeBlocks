import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full h-12 bg-field text-ink placeholder:text-faint rounded-sm px-4 text-body transition-all border border-transparent dark:border-[#23252a] outline-none focus:ring-2 focus:ring-ink focus:bg-white dark:focus:bg-[#0f1011]",
            icon ? "pl-11" : "px-4",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onClear, placeholder = "Search screens, apps, patterns...", ...props }, ref) => {
    const hasValue = Boolean(value && String(value).length > 0);

    return (
      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none flex items-center justify-center">
          <Search className="w-5 h-5 text-muted" />
        </div>
        <input
          type="text"
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 bg-field text-ink placeholder:text-faint rounded-sm pl-12 pr-10 text-body transition-all border border-transparent dark:border-[#23252a] outline-none focus:ring-2 focus:ring-ink focus:bg-white dark:focus:bg-[#0f1011]",
            className
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors p-1 rounded-full"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
