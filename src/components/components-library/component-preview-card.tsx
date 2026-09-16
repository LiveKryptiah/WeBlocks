"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { UIComponentEntity } from "@/data/components-data";
import { LIVE_COMPONENTS_MAP } from "./live-previews";
import { useLibrary } from "@/context/library-context";

interface ComponentPreviewCardProps {
  component: UIComponentEntity;
}

export const ComponentPreviewCard: React.FC<ComponentPreviewCardProps> = ({
  component,
}) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useLibrary();

  const LivePreview = LIVE_COMPONENTS_MAP[component.slug];

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(component.code);
    setCopied(true);
    showToast(`Copied ${component.title} code`, "copy");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex flex-col justify-between bg-canvas-soft hover:bg-field/70 rounded-md p-6 border-none transition-all duration-200">
      {/* Display Area: Interactive Live Preview */}
      <div className="mb-4">
        <div className="w-full min-h-[220px] rounded-sm bg-white p-4 flex items-center justify-center overflow-hidden">
          {LivePreview ? (
            <div className="w-full flex items-center justify-center">
              <LivePreview />
            </div>
          ) : (
            <div className="text-caption text-muted">Preview unavailable</div>
          )}
        </div>
      </div>

      {/* Card Bottom: Bold Title & Copy Only Button */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href={`/components/${component.slug}`}
            className="text-lg sm:text-xl font-bold text-ink tracking-tight hover:underline truncate"
          >
            {component.title}
          </Link>
          {component.tier === "pro" && (
            <span className="px-2 py-0.5 rounded-full bg-[#0066ff] text-white text-[10px] font-bold tracking-tight shrink-0">
              Pro
            </span>
          )}
        </div>

        {/* Copy Only Button */}
        <button
          type="button"
          onClick={handleCopyCode}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold bg-field hover:bg-canvas-soft text-ink transition-colors shrink-0 cursor-pointer select-none"
          title={`Copy ${component.title} code`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#0066ff]" />
              <span className="text-[#0066ff]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
