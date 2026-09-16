"use client";

import React from "react";
import { Check, Bookmark, Folder, Copy, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  message: string;
  type?: "success" | "saved" | "collection" | "copy" | "info";
  onDismiss?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onDismiss,
}) => {
  const getIcon = () => {
    switch (type) {
      case "saved":
        return <Bookmark className="w-3.5 h-3.5 fill-current text-white" />;
      case "collection":
        return <Folder className="w-3.5 h-3.5 text-white" />;
      case "copy":
        return <Copy className="w-3.5 h-3.5 text-white" />;
      case "info":
        return <Info className="w-3.5 h-3.5 text-white" />;
      case "success":
      default:
        return <Check className="w-3.5 h-3.5 text-white" />;
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={onDismiss}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#141414] text-white text-body-sm font-semibold border border-white/15 shadow-none cursor-pointer select-none transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
      )}
    >
      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        {getIcon()}
      </div>
      <span className="text-white text-body-sm font-semibold tracking-tight whitespace-nowrap">
        {message}
      </span>
    </div>
  );
};
