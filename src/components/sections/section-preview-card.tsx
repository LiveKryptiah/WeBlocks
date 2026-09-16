"use client";

import React, { useState } from "react";
import { Monitor, Smartphone, Copy, Check, Code, Eye } from "lucide-react";
import { SectionEntity } from "@/data/sections-data";
import { RenderSectionPreview } from "./section-previews";
import { cn } from "@/lib/utils";

interface SectionPreviewCardProps {
  section: SectionEntity;
}

export const SectionPreviewCard: React.FC<SectionPreviewCardProps> = ({ section }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(section.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <article className="w-full bg-white rounded-2xl border border-hairline-soft overflow-hidden transition-all duration-200">
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 border-b border-hairline-soft bg-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-body font-bold text-ink tracking-tight">{section.title}</h2>
            <span className="capitalize text-[11px] font-semibold px-2 py-0.5 rounded-full bg-field text-muted">
              {section.category}
            </span>
          </div>
          <p className="text-caption text-muted max-w-xl font-normal">
            {section.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {/* Responsive viewport toggle (only visible in Preview mode) */}
          {activeTab === "preview" && (
            <div className="flex items-center p-0.5 rounded-full bg-field border border-hairline-soft">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  device === "desktop" ? "bg-white text-ink shadow-none" : "text-muted hover:text-ink"
                )}
                title="Desktop View"
                aria-label="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  device === "mobile" ? "bg-white text-ink shadow-none" : "text-muted hover:text-ink"
                )}
                title="Mobile View"
                aria-label="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Preview / Code Tab Switcher */}
          <div className="flex items-center p-0.5 rounded-full bg-field border border-hairline-soft">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-semibold transition-colors",
                activeTab === "preview"
                  ? "bg-white text-ink shadow-none"
                  : "text-muted hover:text-ink"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-semibold transition-colors",
                activeTab === "code"
                  ? "bg-white text-ink shadow-none"
                  : "text-muted hover:text-ink"
              )}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
          </div>

          {/* Copy Code CTA */}
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-canvas-soft hover:bg-field border border-hairline-soft text-caption font-semibold text-ink transition-colors"
            title="Copy component code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content: Rendered Preview OR Code */}
      <div className="p-4 sm:p-6 bg-canvas-soft/60">
        {activeTab === "preview" ? (
          <div
            className={cn(
              "transition-all duration-300 mx-auto",
              device === "desktop"
                ? "w-full"
                : "max-w-[380px] bg-white rounded-2xl border border-hairline-soft p-2 overflow-hidden"
            )}
          >
            <RenderSectionPreview slug={section.slug} />
          </div>
        ) : (
          <div className="relative rounded-xl bg-[#141414] text-white p-5 overflow-hidden">
            <pre className="text-caption font-mono overflow-x-auto max-h-[420px] scrollbar-none leading-relaxed text-gray-200">
              <code>{section.code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Footer Tags */}
      <div className="px-6 py-3 border-t border-hairline-soft bg-white flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {section.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-muted bg-field px-2.5 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <span className="text-[11px] font-mono text-muted">React + Tailwind</span>
      </div>
    </article>
  );
};
