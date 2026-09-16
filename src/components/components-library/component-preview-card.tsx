"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, Terminal, ExternalLink, Code2, Eye, Sparkles, ArrowRight } from "lucide-react";
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
    showToast(`Copied ${component.title} code.`, "copy");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCli = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(component.cliCommand);
    setCopiedCli(true);
    showToast(`Copied CLI: ${component.cliCommand}`, "copy");
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="group flex flex-col justify-between bg-canvas-soft hover:bg-field/70 rounded-md p-6 border border-hairline-soft transition-all duration-200">
      <div>
        {/* Card Top: Title, Tier, Controls */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <Link
                href={`/components/${component.slug}`}
                className="text-h4 font-bold text-ink hover:underline tracking-tight"
              >
                {component.title}
              </Link>
              {component.tier === "pro" && (
                <span className="px-2 py-0.5 rounded-full bg-[#0066ff] text-white text-[10px] font-bold tracking-tight">
                  Pro
                </span>
              )}
            </div>
            <p className="text-body-sm text-muted mt-1 mb-4 line-clamp-2">
              {component.description}
            </p>
          </div>

          {/* Preview / Code Tab Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-full bg-field border border-hairline shrink-0">
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption font-semibold transition-all",
                activeTab === "preview"
                  ? "bg-white text-ink border border-hairline"
                  : "text-muted hover:text-ink"
              )}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-caption font-semibold transition-all",
                activeTab === "code"
                  ? "bg-white text-ink border border-hairline"
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
            <div className="w-full min-h-[220px] rounded-sm bg-white border border-hairline-soft p-4 flex items-center justify-center overflow-hidden">
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
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#262626] text-white hover:bg-[#333333] text-[10px] font-semibold transition-colors"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-[#0066ff]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? "Copied" : "Copy TSX"}</span>
                </button>
              </div>
              <pre className="text-[11px] leading-relaxed select-all">
                <code>{component.code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer matching collections/patterns meta */}
      <div className="pt-4 border-t border-hairline flex items-center justify-between text-caption text-muted">
        <div className="flex items-center gap-2">
          <span className="text-label text-muted uppercase tracking-wider font-semibold">
            {component.category}
          </span>
          <button
            onClick={handleCopyCli}
            className="font-mono text-[11px] text-muted hover:text-ink inline-flex items-center gap-1 transition-colors"
            title="Copy CLI command"
          >
            <Terminal className="w-3 h-3" />
            <span>{component.slug}</span>
            {copiedCli && <Check className="w-3 h-3 text-[#0066ff]" />}
          </button>
        </div>

        <Link
          href={`/components/${component.slug}`}
          className="group-hover:text-ink font-semibold flex items-center gap-1 transition-colors"
        >
          <span>Inspect component</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
