"use client";

import React, { useState } from "react";
import { Copy, Check, Code2, Eye, LayoutTemplate } from "lucide-react";
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
      <div>
        {/* Card Top: Title, Category, Controls */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-h4 font-bold text-ink tracking-tight">
                {section.title}
              </h2>
            </div>
            <p className="text-body-sm text-muted mt-1 mb-4 line-clamp-2 font-light">
              {section.description}
            </p>
          </div>

          {/* Preview / Code Tab Switcher (Minimal Pill, no stroke lines) */}
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
        <div className="mb-4">
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

      {/* Card Footer matching components & patterns */}
      <div className="pt-4 border-t border-hairline-soft flex items-center justify-between text-caption text-muted">
        <div className="flex items-center gap-2">
          <span className="text-label text-muted font-semibold capitalize">
            {section.category}
          </span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="font-mono text-[11px] text-muted hover:text-ink inline-flex items-center gap-1 transition-colors"
            title="Copy section code"
          >
            <LayoutTemplate className="w-3 h-3" />
            <span>{section.slug}</span>
            {copiedCode && <Check className="w-3 h-3 text-[#0066ff]" />}
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {section.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] text-muted font-light">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
