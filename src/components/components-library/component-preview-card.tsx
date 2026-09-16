"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, FileText, Eye } from "lucide-react";
import { UIComponentEntity, getComponentDesignMd } from "@/data/components-data";
import { LIVE_COMPONENTS_MAP } from "./live-previews";
import { useLibrary } from "@/context/library-context";
import { cn } from "@/lib/utils";

interface ComponentPreviewCardProps {
  component: UIComponentEntity;
}

export const ComponentPreviewCard: React.FC<ComponentPreviewCardProps> = ({
  component,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "design">("preview");
  const [copiedMd, setCopiedMd] = useState(false);
  const { showToast } = useLibrary();

  const LivePreview = LIVE_COMPONENTS_MAP[component.slug];
  const designMarkdown = getComponentDesignMd(component);

  const handleCopyDesignMd = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(designMarkdown);
    setCopiedMd(true);
    showToast(`Copied ${component.title} design.md`, "copy");
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="group flex flex-col justify-between bg-canvas-soft hover:bg-field/70 rounded-md p-6 border-none transition-all duration-200">
      {/* Display Area: Interactive Live Preview or design.md */}
      <div className="mb-4">
        {activeTab === "preview" ? (
          <div className="w-full min-h-[220px] rounded-sm bg-white p-4 flex items-center justify-center overflow-hidden">
            {LivePreview ? (
              <div className="w-full flex items-center justify-center">
                <LivePreview />
              </div>
            ) : (
              <div className="text-caption text-muted">Preview unavailable</div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-[220px] overflow-auto rounded-sm bg-[#141414] text-[#f0f0f0] p-4 text-xs font-mono">
            <div className="sticky top-0 float-right z-10 mb-2">
              <button
                type="button"
                onClick={handleCopyDesignMd}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#262626] text-white hover:bg-[#333333] text-[10px] font-semibold transition-colors shadow-none"
              >
                {copiedMd ? <Check className="w-3 h-3 text-[#0066ff]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMd ? "Copied" : "Copy design.md"}</span>
              </button>
            </div>
            <pre className="text-[11px] leading-relaxed select-all whitespace-pre-wrap text-gray-300 font-mono">
              <code>{designMarkdown}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Card Bottom: Bold Title & Preview / design.md Controls */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <Link
            href={`/components/${component.slug}`}
            className="text-lg sm:text-xl font-bold text-ink tracking-tight hover:underline"
          >
            {component.title}
          </Link>
          {component.tier === "pro" && (
            <span className="px-2 py-0.5 rounded-full bg-[#0066ff] text-white text-[10px] font-bold tracking-tight">
              Pro
            </span>
          )}
        </div>

        {/* Preview / design.md Tab Switcher */}
        <div className="inline-flex items-center p-0.5 rounded-full bg-field shrink-0 select-none">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption font-semibold transition-all",
              activeTab === "preview"
                ? "bg-white text-ink shadow-none"
                : "text-muted hover:text-ink"
            )}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("design")}
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption font-semibold transition-all",
              activeTab === "design"
                ? "bg-white text-ink shadow-none"
                : "text-muted hover:text-ink"
            )}
          >
            <FileText className="w-3 h-3" />
            <span>design.md</span>
          </button>
        </div>
      </div>
    </div>
  );
};
