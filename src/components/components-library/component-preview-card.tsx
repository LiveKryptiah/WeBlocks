"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, Terminal, ExternalLink, Code2, Eye, Sparkles } from "lucide-react";
import { UIComponentEntity } from "@/data/components-data";
import { LIVE_COMPONENTS_MAP } from "./live-previews";
import { useLibrary } from "@/context/library-context";
import { cn } from "@/lib/utils";

interface ComponentPreviewCardProps {
  component: UIComponentEntity;
}

export const ComponentPreviewCard: React.FC<ComponentPreviewCardProps> = ({
  component,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const { showToast } = useLibrary();

  const LivePreview = LIVE_COMPONENTS_MAP[component.slug];

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(component.code);
    setCopiedCode(true);
    showToast(`Copied ${component.title} code to clipboard.`, "copy");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCli = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(component.cliCommand);
    setCopiedCli(true);
    showToast(`Copied CLI command: ${component.cliCommand}`, "copy");
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-hairline overflow-hidden transition-all duration-150 shadow-none hover:border-ink/40">
      {/* Top Bar / Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-hairline bg-canvas">
        <div className="flex items-center gap-2">
          <Link
            href={`/components/${component.slug}`}
            className="font-bold text-sm text-ink hover:underline tracking-tight"
          >
            {component.title}
          </Link>

          {/* Tier badge */}
          {component.tier === "pro" ? (
            <span className="px-2 py-0.5 rounded-full bg-[#0066ff] text-white text-[10px] font-bold tracking-tight inline-flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 fill-current" />
              Pro
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-field text-ink text-[10px] font-semibold">
              Free
            </span>
          )}

          {/* Category */}
          <span className="text-[11px] text-muted capitalize hidden sm:inline">
            • {component.category}
          </span>
        </div>

        {/* Action Controls & Tab Switcher */}
        <div className="flex items-center gap-2">
          {/* CLI Copy Pill */}
          <button
            onClick={handleCopyCli}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-canvas-soft hover:bg-field border border-hairline text-[11px] font-mono text-muted hover:text-ink transition-colors"
            title="Click to copy CLI installation command"
          >
            <Terminal className="w-3 h-3 text-muted" />
            <span>{component.slug}</span>
            {copiedCli ? (
              <Check className="w-3 h-3 text-[#0066ff]" />
            ) : (
              <Copy className="w-3 h-3 text-muted" />
            )}
          </button>

          {/* Preview / Code Segmented Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-field border border-hairline">
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all",
                activeTab === "preview"
                  ? "bg-white text-ink shadow-none border border-hairline"
                  : "text-muted hover:text-ink"
              )}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all",
                activeTab === "code"
                  ? "bg-white text-ink shadow-none border border-hairline"
                  : "text-muted hover:text-ink"
              )}
            >
              <Code2 className="w-3 h-3" />
              <span>Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Live Preview or Code View */}
      <div className="relative min-h-[260px] flex items-center justify-center p-4 sm:p-6 bg-canvas-soft overflow-hidden">
        {activeTab === "preview" ? (
          <div className="w-full flex items-center justify-center">
            {LivePreview ? (
              <LivePreview />
            ) : (
              <div className="text-xs text-muted">Preview not available</div>
            )}
          </div>
        ) : (
          /* Code View */
          <div className="relative w-full h-full max-h-[300px] overflow-auto rounded-xl bg-[#141414] text-[#f0f0f0] p-4 text-xs font-mono">
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262626] text-white hover:bg-[#333333] text-[11px] font-semibold transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3 h-3 text-[#0066ff]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy TSX</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] leading-relaxed overflow-x-auto select-all pr-16">
              <code>{component.code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-canvas border-t border-hairline text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          {component.dependencies.map((dep) => (
            <span
              key={dep}
              className="px-2 py-0.5 rounded-full bg-field text-[10px] font-mono text-muted"
            >
              {dep}
            </span>
          ))}
        </div>

        <Link
          href={`/components/${component.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink transition-colors"
        >
          <span>Inspect API</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
