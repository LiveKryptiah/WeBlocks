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

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scalePercent = Math.round(scale * 100);

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative flex flex-col justify-between rounded-2xl p-4 sm:p-6 overflow-hidden",
          "transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform",
          // Base resting state: clean translucent surface
          "bg-canvas-soft/75 dark:bg-[#0c0d10]/70 backdrop-blur-md",
          "border border-hairline-soft/80 dark:border-white/[0.06]",
          "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]",
          // Hover state: modern glass morph effect
          "hover:-translate-y-1 hover:scale-[1.003]",
          "hover:bg-white/85 dark:hover:bg-[#13151b]/75",
          "hover:backdrop-blur-2xl hover:backdrop-saturate-[180%]",
          "hover:border-white/80 dark:hover:border-white/20",
          "hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.75)_inset,0_1px_2px_rgba(255,255,255,0.9)_inset,0_10px_35px_-8px_rgba(0,102,255,0.08)]",
          "dark:hover:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_1px_2px_rgba(255,255,255,0.2)_inset,0_12px_40px_-8px_rgba(0,102,255,0.15)]"
        )}
      >
        {/* Top Edge Specular Bevel Line (Glass Rim) */}
        <div
          className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 dark:via-white/30 to-transparent pointer-events-none transition-opacity duration-500 z-10"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Diagonal Specular Sheen Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/35 via-white/5 to-transparent dark:from-white/10 dark:via-white/[0.02] dark:to-transparent pointer-events-none transition-opacity duration-500 z-10"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Dynamic Mouse Cursor Spotlight Refraction (Light Mode) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 dark:hidden"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.7), rgba(0, 102, 255, 0.05) 35%, transparent 65%)`,
          }}
        />

        {/* Dynamic Mouse Cursor Spotlight Refraction (Dark Mode) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 hidden dark:block"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), rgba(0, 102, 255, 0.12) 35%, transparent 65%)`,
          }}
        />

        {/* Main Display Area: Clean Scaled Desktop Canvas OR design.md */}
        <div className="mb-4 relative z-20">
          <div className="w-full rounded-xl bg-canvas/95 dark:bg-[#090b0e]/90 border border-hairline-soft/80 group-hover:border-hairline overflow-hidden flex flex-col shadow-xs group-hover:shadow-md transition-all duration-300">
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
        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight group-hover:text-ink transition-colors">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold bg-field/80 hover:bg-canvas text-muted hover:text-ink border border-transparent hover:border-hairline-soft backdrop-blur-sm transition-all shadow-xs"
              title="View in Fullscreen Desktop Canvas"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>

            {/* Preview / design.md Tab Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-field/80 dark:bg-[#161718]/80 backdrop-blur-sm border border-hairline-soft/60 shrink-0 select-none shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold transition-all",
                  activeTab === "preview"
                    ? "bg-white dark:bg-[#202226] text-ink shadow-xs border border-hairline-soft/40"
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
                    ? "bg-white dark:bg-[#202226] text-ink shadow-xs border border-hairline-soft/40"
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

