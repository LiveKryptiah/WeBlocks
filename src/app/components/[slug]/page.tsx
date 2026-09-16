"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Terminal,
  Sparkles,
  Layers,
  Code2,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Package,
  FileCode,
  Info,
} from "lucide-react";
import { UI_COMPONENTS } from "@/data/components-data";
import { LIVE_COMPONENTS_MAP } from "@/components/components-library/live-previews";
import { ComponentPreviewCard } from "@/components/components-library/component-preview-card";
import { useLibrary } from "@/context/library-context";
import { cn } from "@/lib/utils";

export default function ComponentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useLibrary();

  const slug = params?.slug as string;
  const component = UI_COMPONENTS.find((c) => c.slug === slug);

  const [activeTab, setActiveTab] = useState<"preview" | "code" | "props">("preview");
  const [viewportWidth, setViewportWidth] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  if (!component) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-ink mb-2">Component not found.</h1>
        <p className="text-xs text-muted mb-6">
          The requested component block does not exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/components")}
          className="px-5 py-2 rounded-full bg-ink text-white text-xs font-semibold"
        >
          Return to Components
        </button>
      </div>
    );
  }

  const LivePreview = LIVE_COMPONENTS_MAP[component.slug];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(component.code);
    setCopiedCode(true);
    showToast(`Copied ${component.title} code to clipboard.`, "copy");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(component.cliCommand);
    setCopiedCli(true);
    showToast(`Copied CLI command: ${component.cliCommand}`, "copy");
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const installDepsCmd = `npm install ${component.dependencies.join(" ")}`;
  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installDepsCmd);
    setCopiedInstall(true);
    showToast("Copied dependencies install command.", "copy");
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const relatedComponents = UI_COMPONENTS.filter(
    (c) => c.slug !== component.slug && c.category === component.category
  ).slice(0, 2);

  const fallbackRelated = relatedComponents.length > 0 
    ? relatedComponents 
    : UI_COMPONENTS.filter((c) => c.slug !== component.slug).slice(0, 2);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center gap-2 mb-6 text-xs text-muted">
        <Link
          href="/components"
          className="inline-flex items-center gap-1 hover:text-ink transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Components</span>
        </Link>
        <span>/</span>
        <span className="capitalize text-muted">{component.category}</span>
        <span>/</span>
        <span className="text-ink font-semibold">{component.title}</span>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-field text-ink text-xs font-semibold capitalize">
              {component.category}
            </span>
            {component.tier === "pro" ? (
              <span className="px-2.5 py-0.5 rounded-full bg-[#0066ff] text-white text-xs font-bold inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                Pro Block
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-field text-muted text-xs font-semibold">
                Free Block
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-2">
            {component.title}.
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
            {component.description}
          </p>
        </div>

        {/* CLI Command Box */}
        <div className="flex items-center gap-2 self-start md:self-auto p-2 rounded-2xl bg-canvas border border-hairline">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-canvas-soft text-xs font-mono text-ink">
            <Terminal className="w-3.5 h-3.5 text-muted" />
            <span>{component.cliCommand}</span>
          </div>
          <button
            onClick={handleCopyCli}
            className="p-2 rounded-xl bg-field hover:bg-canvas-soft text-ink transition-colors"
            title="Copy command"
          >
            {copiedCli ? (
              <Check className="w-4 h-4 text-[#0066ff]" />
            ) : (
              <Copy className="w-4 h-4 text-muted" />
            )}
          </button>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="rounded-3xl bg-white border border-hairline overflow-hidden mb-12 shadow-none">
        {/* Stage Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-hairline bg-canvas">
          {/* View Mode Tabs */}
          <div className="inline-flex items-center p-1 rounded-full bg-field border border-hairline">
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                activeTab === "preview"
                  ? "bg-white text-ink border border-hairline"
                  : "text-muted hover:text-ink"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Interactive Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                activeTab === "code"
                  ? "bg-white text-ink border border-hairline"
                  : "text-muted hover:text-ink"
              )}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Full Code</span>
            </button>
            <button
              onClick={() => setActiveTab("props")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all",
                activeTab === "props"
                  ? "bg-white text-ink border border-hairline"
                  : "text-muted hover:text-ink"
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Props & API</span>
            </button>
          </div>

          {/* Viewport Resizer (Only in Preview mode) */}
          {activeTab === "preview" && (
            <div className="hidden sm:inline-flex items-center gap-1 p-1 rounded-full bg-field border border-hairline text-muted">
              <button
                onClick={() => setViewportWidth("mobile")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  viewportWidth === "mobile"
                    ? "bg-white text-ink border border-hairline"
                    : "hover:text-ink"
                )}
                title="Mobile preview (380px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportWidth("tablet")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  viewportWidth === "tablet"
                    ? "bg-white text-ink border border-hairline"
                    : "hover:text-ink"
                )}
                title="Tablet preview (640px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportWidth("desktop")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  viewportWidth === "desktop"
                    ? "bg-white text-ink border border-hairline"
                    : "hover:text-ink"
                )}
                title="Desktop preview (Full width)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Copy Code Action Button */}
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-ink text-white hover:bg-[#262626] text-xs font-semibold transition-colors"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0066ff]" />
                <span>Copied TSX</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy TSX</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Content Stage */}
        <div className="bg-canvas-soft min-h-[380px] flex items-center justify-center p-6 sm:p-12 transition-all">
          {activeTab === "preview" && (
            <div
              className={cn(
                "w-full transition-all duration-300 flex items-center justify-center mx-auto",
                viewportWidth === "mobile" && "max-w-[380px] p-4 bg-white rounded-3xl border border-hairline",
                viewportWidth === "tablet" && "max-w-[640px] p-6 bg-white rounded-3xl border border-hairline",
                viewportWidth === "desktop" && "max-w-full"
              )}
            >
              {LivePreview ? (
                <div className="w-full flex items-center justify-center">
                  <LivePreview />
                </div>
              ) : (
                <div className="text-xs text-muted">Preview renderer unavailable.</div>
              )}
            </div>
          )}

          {activeTab === "code" && (
            <div className="w-full rounded-2xl bg-[#141414] text-[#f0f0f0] p-6 font-mono text-xs overflow-x-auto max-h-[500px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262626] text-[11px] text-[#adadad]">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-[#0066ff]" />
                  components/{component.slug}.tsx
                </span>
                <span>React 19 + TypeScript</span>
              </div>
              <pre className="text-[12px] leading-relaxed overflow-x-auto select-all">
                <code>{component.code}</code>
              </pre>
            </div>
          )}

          {activeTab === "props" && (
            <div className="w-full bg-white rounded-2xl border border-hairline p-6 max-w-3xl mx-auto">
              <h3 className="text-sm font-bold text-ink mb-2">Component API & Props</h3>
              <p className="text-xs text-muted mb-4">
                Configuration properties accepted by the {component.title} component.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-hairline text-muted">
                      <th className="py-2.5 pr-4 font-semibold">Prop</th>
                      <th className="py-2.5 pr-4 font-semibold">Type</th>
                      <th className="py-2.5 pr-4 font-semibold">Default</th>
                      <th className="py-2.5 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {component.props.map((prop) => (
                      <tr key={prop.name} className="hover:bg-canvas-soft">
                        <td className="py-2.5 pr-4 font-mono font-bold text-ink">
                          {prop.name}
                        </td>
                        <td className="py-2.5 pr-4 font-mono text-muted text-[11px]">
                          {prop.type}
                        </td>
                        <td className="py-2.5 pr-4 font-mono text-muted text-[11px]">
                          {prop.default !== undefined ? String(prop.default) : "—"}
                        </td>
                        <td className="py-2.5 text-muted leading-relaxed">
                          {prop.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Installation & Dependencies Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* CLI Installation */}
        <div className="p-6 rounded-2xl bg-white border border-hairline flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-4 h-4 text-ink" />
              <h3 className="text-sm font-bold text-ink">Install via CLI</h3>
            </div>
            <p className="text-xs text-muted">
              Add this block directly into your project's component directory.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-soft border border-hairline font-mono text-xs">
            <span className="text-ink select-all">{component.cliCommand}</span>
            <button
              onClick={handleCopyCli}
              className="text-muted hover:text-ink ml-2"
              title="Copy"
            >
              {copiedCli ? <Check className="w-4 h-4 text-[#0066ff]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dependencies */}
        <div className="p-6 rounded-2xl bg-white border border-hairline flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-4 h-4 text-ink" />
              <h3 className="text-sm font-bold text-ink">Dependencies</h3>
            </div>
            <p className="text-xs text-muted">
              Required npm packages to support icons and style utilities.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-soft border border-hairline font-mono text-xs">
            <span className="text-ink select-all">{installDepsCmd}</span>
            <button
              onClick={handleCopyInstall}
              className="text-muted hover:text-ink ml-2"
              title="Copy"
            >
              {copiedInstall ? <Check className="w-4 h-4 text-[#0066ff]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Related Components */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-ink tracking-tight">
            Related components in {component.category}.
          </h2>
          <Link
            href="/components"
            className="text-xs font-semibold text-muted hover:text-ink transition-colors"
          >
            View all components →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fallbackRelated.map((rel) => (
            <ComponentPreviewCard key={rel.id} component={rel} />
          ))}
        </div>
      </div>
    </div>
  );
}
