"use client";

import React, { useState } from "react";
import { Copy, Check, FileText, Eye } from "lucide-react";
import { SectionEntity, getSectionDesignMd } from "@/data/sections-data";
import { RenderSectionPreview } from "./section-previews";
import { useLibrary } from "@/context/library-context";
import { cn } from "@/lib/utils";

interface SectionPreviewCardProps {
  section: SectionEntity;
}

export const SectionPreviewCard: React.FC<SectionPreviewCardProps> = ({ section }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "design">("preview");
  const [copiedMd, setCopiedMd] = useState(false);
  const { showToast } = useLibrary();

  const designMarkdown = getSectionDesignMd(section);

  const handleCopyDesignMd = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(designMarkdown);
    setCopiedMd(true);
    showToast(`Copied ${section.title} design.md`, "copy");
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="group flex flex-col justify-between bg-canvas-soft hover:bg-field/60 rounded-xl p-3.5 sm:p-5 border-none transition-all duration-200">
      {/* Display Area: Desktop Window Viewport or design.md */}
      <div className="mb-3">
        {activeTab === "preview" ? (
          <div className="w-full rounded-lg bg-canvas border border-hairline-soft overflow-hidden flex flex-col shadow-sm">
            {/* Desktop Window Chrome Titlebar */}
            <div className="h-7 px-3 bg-canvas-soft/80 border-b border-hairline-soft flex items-center justify-between text-[11px] text-muted shrink-0 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
              </div>
              <div className="flex items-center gap-1 px-3 py-0.5 rounded-full bg-field/80 text-[10px] text-muted font-mono max-w-[240px] truncate">
                <span>weblocks.design</span>
                <span className="opacity-40">/</span>
                <span className="text-ink font-medium">{section.slug}</span>
              </div>
              <div className="w-10" />
            </div>

            {/* Desktop Viewport Canvas (16:10 / 16:9 Screen Proportions) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[420px] overflow-hidden flex items-center justify-center bg-canvas">
              <div className="w-full h-full flex items-center justify-center">
                <RenderSectionPreview slug={section.slug} />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[420px] overflow-auto rounded-lg bg-[#141414] text-[#f0f0f0] p-4 sm:p-5 text-xs font-mono">
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

      {/* Card Bottom: Bold Title & Controls */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <h2 className="text-lg sm:text-xl font-bold text-ink tracking-tight">
          {section.title}
        </h2>

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
