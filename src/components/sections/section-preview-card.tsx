"use client";

import React, { useState } from "react";
import { Copy, Check, Code2, Eye } from "lucide-react";
import { SectionEntity } from "@/data/sections-data";
import { RenderSectionPreview } from "./section-previews";
import { useLibrary } from "@/context/library-context";
import { cn } from "@/lib/utils";

interface SectionPreviewCardProps {
  section: SectionEntity;
}

export const SectionPreviewCard: React.FC<SectionPreviewCardProps> = ({ section }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copiedCode, setCopiedCode] = useState(false);
  const { showToast } = useLibrary();

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(section.code);
    setCopiedCode(true);
    showToast(`Copied ${section.title} code.`, "copy");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="group flex flex-col justify-between bg-canvas-soft hover:bg-field/70 rounded-md p-6 border-none transition-all duration-200">
      {/* Card Top: Title & Controls */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-h4 font-bold text-ink tracking-tight">
          {section.title}
        </h2>

        {/* Preview / Code Tab Switcher */}
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
            onClick={() => setActiveTab("code")}
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption font-semibold transition-all",
              activeTab === "code"
                ? "bg-white text-ink shadow-none"
                : "text-muted hover:text-ink"
            )}
          >
            <Code2 className="w-3 h-3" />
            <span>Code</span>
          </button>
        </div>
      </div>

      {/* Display Area: Interactive Preview or Code */}
      <div>
        {activeTab === "preview" ? (
          <div className="w-full min-h-[220px] rounded-sm bg-white p-4 flex items-center justify-center overflow-hidden">
            <div className="w-full flex items-center justify-center">
              <RenderSectionPreview slug={section.slug} />
            </div>
          </div>
        ) : (
          <div className="relative w-full h-[220px] overflow-auto rounded-sm bg-[#141414] text-[#f0f0f0] p-4 text-xs font-mono">
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#262626] text-white hover:bg-[#333333] text-[10px] font-semibold transition-colors"
              >
                {copiedCode ? <Check className="w-3 h-3 text-[#0066ff]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? "Copied" : "Copy TSX"}</span>
              </button>
            </div>
            <pre className="text-[11px] leading-relaxed select-all">
              <code>{section.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
