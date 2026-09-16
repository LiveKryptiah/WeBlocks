"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Check, FileText, Eye, Lock, Maximize2 } from "lucide-react";
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
        {/* Main Display Area: Windows 11 Chrome Window Container */}
        <div className="mb-4">
          <div className="w-full rounded-xl bg-canvas border border-hairline-soft overflow-hidden flex flex-col shadow-sm">
            {/* Windows 11 Desktop Title Bar */}
            <div className="h-9 px-3 bg-canvas-soft border-b border-hairline-soft flex items-center justify-between text-xs text-muted shrink-0 select-none">
              {/* Left: Window Tab / Brand */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-canvas text-ink text-[11px] font-medium border border-hairline-soft/80 shadow-xs max-w-[200px] truncate">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  <span className="truncate">{section.title}</span>
                </div>

                {/* Simulated URL bar */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-field text-[10px] text-muted font-mono max-w-[280px] truncate">
                  <Lock className="w-2.5 h-2.5 text-muted shrink-0" />
                  <span>https://weblocks.design/</span>
                  <span className="text-ink font-medium truncate">{section.slug}</span>
                </div>
              </div>

              {/* Right: Screen Resolution Badge & Windows 11 Control Buttons */}
              <div className="flex items-center gap-2 h-full">
                {/* 16:9 Desktop Resolution Indicator */}
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-muted bg-field">
                  1440 × 810 · {scalePercent}% (16:9 Desktop)
                </span>

                {/* Windows 11 Window Controls */}
                <div className="flex items-center h-full -mr-3">
                  {/* Minimize (—) */}
                  <button
                    type="button"
                    title="Minimize"
                    onClick={() => showToast("Desktop window scale locked to 16:9 widescreen", "info")}
                    className="w-10 h-full flex items-center justify-center text-muted hover:text-ink hover:bg-field transition-colors"
                  >
                    <svg width="10" height="1" viewBox="0 0 10 1" className="fill-current">
                      <rect width="10" height="1" />
                    </svg>
                  </button>

                  {/* Maximize (▢) - Launches true Full-Screen Desktop Modal */}
                  <button
                    type="button"
                    title="Maximize (Full-Screen Desktop Canvas)"
                    onClick={() => setIsFullscreen(true)}
                    className="w-10 h-full flex items-center justify-center text-muted hover:text-ink hover:bg-field transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" className="fill-none stroke-current" strokeWidth="1">
                      <rect x="0.5" y="0.5" width="9" height="9" />
                    </svg>
                  </button>

                  {/* Close (✕) - Turns red on hover (Authentic Windows OS signature) */}
                  <button
                    type="button"
                    title="Close"
                    onClick={() => setActiveTab(activeTab === "preview" ? "design" : "preview")}
                    className="w-10 h-full flex items-center justify-center text-muted hover:text-white hover:bg-[#e81123] transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" className="stroke-current" strokeWidth="1">
                      <line x1="1" y1="1" x2="9" y2="9" />
                      <line x1="9" y1="1" x2="1" y2="9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

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
              title="View in 100% Fullscreen Windows Display"
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
                    ? "bg-white text-ink shadow-xs"
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
                    ? "bg-white text-ink shadow-xs"
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

      {/* Interactive Full-Screen Windows 11 Desktop Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-2 sm:p-6 items-center justify-center animate-in fade-in duration-200"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="w-full max-w-[1500px] h-[92vh] max-h-[960px] bg-canvas rounded-xl border border-hairline overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Windows 11 Title Bar in Fullscreen Modal */}
            <div className="h-10 px-4 bg-canvas-soft border-b border-hairline-soft flex items-center justify-between text-xs text-muted shrink-0 select-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-canvas text-ink text-xs font-medium border border-hairline-soft shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  <span>{section.title}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-field text-[11px] text-muted font-mono">
                  <Lock className="w-3 h-3 text-muted" />
                  <span>https://weblocks.design/</span>
                  <span className="text-ink font-semibold">{section.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 h-full">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-muted bg-field">
                  1440 × 810 (100% Native Desktop Resolution)
                </span>

                <div className="flex items-center h-full -mr-4">
                  {/* Minimize (exit fullscreen) */}
                  <button
                    type="button"
                    title="Minimize"
                    onClick={() => setIsFullscreen(false)}
                    className="w-11 h-full flex items-center justify-center text-muted hover:text-ink hover:bg-field transition-colors"
                  >
                    <svg width="10" height="1" viewBox="0 0 10 1" className="fill-current">
                      <rect width="10" height="1" />
                    </svg>
                  </button>

                  {/* Restore Down (overlapping squares) */}
                  <button
                    type="button"
                    title="Restore Down"
                    onClick={() => setIsFullscreen(false)}
                    className="w-11 h-full flex items-center justify-center text-muted hover:text-ink hover:bg-field transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" className="fill-none stroke-current" strokeWidth="1">
                      <rect x="2.5" y="0.5" width="7" height="7" />
                      <path d="M0.5,2.5 v7 h7" />
                    </svg>
                  </button>

                  {/* Close (red hover) */}
                  <button
                    type="button"
                    title="Close Fullscreen (Esc)"
                    onClick={() => setIsFullscreen(false)}
                    className="w-11 h-full flex items-center justify-center text-muted hover:text-white hover:bg-[#e81123] transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" className="stroke-current" strokeWidth="1">
                      <line x1="1" y1="1" x2="9" y2="9" />
                      <line x1="9" y1="1" x2="1" y2="9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* 100% Native 1440px Desktop Viewport inside Modal */}
            <div className="flex-1 w-full overflow-auto bg-canvas flex items-center justify-center p-4">
              <div className="w-[1440px] h-[810px] rounded-lg overflow-hidden shrink-0 shadow-lg border border-hairline-soft">
                <RenderSectionPreview slug={section.slug} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

