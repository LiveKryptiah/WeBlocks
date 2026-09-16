"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Check, FileText, Eye, Maximize2, X } from "lucide-react";
import { SectionEntity, getSectionDesignMd } from "@/data/sections-data";
import { RenderSectionPreview } from "./section-previews";
import { useLibrary } from "@/context/library-context";
import { cn } from "@/lib/utils";

interface SectionPreviewCardProps {
  section: SectionEntity;
}

const DESKTOP_BASE_WIDTH = 1440;
const DESKTOP_BASE_HEIGHT = 810; // Exact 16:9 widescreen ratio (1440 * 9 / 16 = 810)

export const SectionPreviewCard: React.FC<SectionPreviewCardProps> = ({ section }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "design">("preview");
  const [copiedMd, setCopiedMd] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(0.65);
  const containerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useLibrary();

  const designMarkdown = getSectionDesignMd(section);

  // Measure container clientWidth and calculate precise desktop scale factor
  useEffect(() => {
    if (!containerRef.current) return;

    const computeScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / DESKTOP_BASE_WIDTH);
        }
      }
    };

    computeScale();
    const observer = new ResizeObserver(computeScale);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Keyboard shortcut: Escape exits fullscreen modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleCopyDesignMd = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(designMarkdown);
    setCopiedMd(true);
    showToast(`Copied ${section.title} design.md`, "copy");
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const scalePercent = Math.round(scale * 100);

  return (
    <>
      <div className="group flex flex-col justify-between bg-canvas-soft hover:bg-field/50 rounded-2xl p-4 sm:p-6 border border-hairline-soft transition-all duration-200">
        {/* Main Display Area: Clean Scaled Desktop Canvas OR design.md */}
        <div className="mb-4">
          <div className="w-full rounded-xl bg-canvas border border-hairline-soft overflow-hidden flex flex-col shadow-sm">
            {/* Viewport Content: True Scaled Desktop Canvas OR design.md */}
            {activeTab === "preview" ? (
              <div
                ref={containerRef}
                className="relative w-full aspect-[16/9] overflow-hidden bg-canvas select-none"
                style={{
                  height: `${DESKTOP_BASE_HEIGHT * scale}px`,
                }}
              >
                {/* 1440px × 810px Virtual Desktop Frame */}
                <div
                  style={{
                    width: DESKTOP_BASE_WIDTH,
                    height: DESKTOP_BASE_HEIGHT,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                  className="w-[1440px] h-[810px] shrink-0 pointer-events-auto"
                >
                  <RenderSectionPreview slug={section.slug} />
                </div>
              </div>
            ) : (
              <div
                className="relative w-full aspect-[16/9] overflow-auto bg-[#0d0f12] text-[#f0f0f0] p-5 sm:p-6 text-xs font-mono select-text"
                style={{
                  height: `${DESKTOP_BASE_HEIGHT * scale}px`,
                }}
              >
                <div className="sticky top-0 float-right z-10 mb-2">
                  <button
                    type="button"
                    onClick={handleCopyDesignMd}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#20242c] text-white hover:bg-[#2b313c] text-[11px] font-semibold transition-colors border border-white/10"
                  >
                    {copiedMd ? <Check className="w-3.5 h-3.5 text-[#0066ff]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMd ? "Copied" : "Copy design.md"}</span>
                  </button>
                </div>
                <pre className="text-[12px] leading-relaxed whitespace-pre-wrap text-gray-300 font-mono">
                  <code>{designMarkdown}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer: Bold Section Title & Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              {section.title}
            </h2>
            <p className="text-caption text-muted font-light mt-0.5 max-w-xl">
              {section.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Fullscreen desktop trigger */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold bg-field hover:bg-canvas-soft text-muted hover:text-ink transition-colors"
              title="View in Fullscreen Desktop Canvas"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>

            {/* Preview / design.md Tab Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-field shrink-0 select-none">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold transition-all",
                  activeTab === "preview"
                    ? "bg-white dark:bg-[#161718] text-ink shadow-xs"
                    : "text-muted hover:text-ink"
                )}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("design")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold transition-all",
                  activeTab === "design"
                    ? "bg-white dark:bg-[#161718] text-ink shadow-xs"
                    : "text-muted hover:text-ink"
                )}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>design.md</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Full-Screen Desktop Modal without Title Bar */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Floating Close Button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors shadow-lg cursor-pointer"
            title="Close Fullscreen (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="w-full max-w-[1500px] h-[94vh] bg-canvas rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 100% Native 1440px Desktop Viewport */}
            <div className="w-full h-full overflow-auto flex items-center justify-center p-2 sm:p-6 bg-canvas">
              <div className="w-[1440px] h-[810px] rounded-xl overflow-hidden shrink-0 shadow-xl border border-hairline-soft">
                <RenderSectionPreview slug={section.slug} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

