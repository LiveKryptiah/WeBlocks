"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Terminal,
  Code2,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Package,
  FileCode,
  Layers,
} from "lucide-react";
import { UI_COMPONENTS } from "@/data/components-data";
import { LIVE_COMPONENTS_MAP } from "@/components/components-library/live-previews";
import { ComponentPreviewCard } from "@/components/components-library/component-preview-card";
import { useLibrary } from "@/context/library-context";
import { ButtonPrimary } from "@/components/ui/button";
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
      <div className="w-full max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-h3 font-bold text-ink mb-4">Component not found.</h1>
        <p className="text-body text-muted mb-8">
          The requested UI component block does not exist or has been removed.
        </p>
        <ButtonPrimary onClick={() => router.push("/components")}>
          Return to Components
        </ButtonPrimary>
      </div>
    );
  }

  const LivePreview = LIVE_COMPONENTS_MAP[component.slug];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(component.code);
    setCopiedCode(true);
    showToast(`Copied ${component.title} code.`, "copy");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(component.cliCommand);
    setCopiedCli(true);
    showToast(`Copied CLI: ${component.cliCommand}`, "copy");
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const installDepsCmd = `npm install ${component.dependencies.join(" ")}`;
  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installDepsCmd);
    setCopiedInstall(true);
    showToast("Copied dependencies command.", "copy");
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const relatedComponents = UI_COMPONENTS.filter(
    (c) => c.slug !== component.slug && c.category === component.category
  ).slice(0, 2);

  const fallbackRelated = relatedComponents.length > 0 
    ? relatedComponents 
    : UI_COMPONENTS.filter((c) => c.slug !== component.slug).slice(0, 2);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/components"
          className="inline-flex items-center gap-2 text-body-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Components</span>
        </Link>
      </div>

      {/* Component Header (Matching Patterns & Apps page styling) */}
      <div className="bg-canvas-soft rounded-md p-8 sm:p-12 border-none mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-label text-muted font-semibold">
                {component.category}
              </span>
              {component.tier === "pro" && (
                <span className="px-2 py-0.5 rounded-full bg-[#0066ff] text-white text-[10px] font-bold">
                  Pro Block
                </span>
              )}
            </div>
            <h1 className="text-h2 font-bold text-ink mb-3">{component.title}.</h1>
            <p className="text-body text-muted max-w-2xl font-light">
              {component.description}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs bg-white dark:bg-[#161718] text-ink px-4 py-2.5 rounded-full border border-hairline-soft dark:border-[#23252a] shrink-0">
            <Terminal className="w-4 h-4 text-muted" />
            <span className="select-all">{component.cliCommand}</span>
            <button
              onClick={handleCopyCli}
              className="text-muted hover:text-ink ml-1.5"
              title="Copy"
            >
              {copiedCli ? <Check className="w-3.5 h-3.5 text-[#0066ff]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Showcase Stage */}
      <div className="bg-canvas-soft rounded-md p-6 sm:p-8 border-none mb-10">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-hairline-soft">
          {/* Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-full bg-field select-none">
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-caption font-semibold transition-all",
                activeTab === "preview"
                  ? "bg-white dark:bg-[#161718] text-ink shadow-none"
                  : "text-muted hover:text-ink"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Interactive Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-caption font-semibold transition-all",
                activeTab === "code"
                  ? "bg-white dark:bg-[#161718] text-ink shadow-none"
                  : "text-muted hover:text-ink"
              )}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Snippet</span>
            </button>
            <button
              onClick={() => setActiveTab("props")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-caption font-semibold transition-all",
                activeTab === "props"
                  ? "bg-white dark:bg-[#161718] text-ink shadow-none"
                  : "text-muted hover:text-ink"
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Props & API</span>
            </button>
          </div>

          {/* Viewport Resizer */}
          {activeTab === "preview" && (
            <div className="hidden sm:inline-flex items-center gap-1 p-1 rounded-full bg-field text-muted select-none">
              <button
                onClick={() => setViewportWidth("mobile")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  viewportWidth === "mobile" ? "bg-white dark:bg-[#161718] text-ink shadow-none" : "hover:text-ink"
                )}
                title="Mobile (380px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportWidth("tablet")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  viewportWidth === "tablet" ? "bg-white dark:bg-[#161718] text-ink shadow-none" : "hover:text-ink"
                )}
                title="Tablet (640px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportWidth("desktop")}
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  viewportWidth === "desktop" ? "bg-white dark:bg-[#161718] text-ink shadow-none" : "hover:text-ink"
                )}
                title="Desktop (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Quick copy TSX button */}
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-ink text-white dark:bg-white dark:text-[#08090a] hover:bg-ink-soft dark:hover:bg-[#e5e5e6] text-caption font-semibold transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-[#0066ff]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? "Copied" : "Copy TSX"}</span>
          </button>
        </div>

        {/* Stage Area */}
        <div className="pt-6">
          {activeTab === "preview" && (
            <div
              className={cn(
                "w-full transition-all duration-200 flex items-center justify-center mx-auto min-h-[340px] bg-white dark:bg-[#08090a] rounded-md border border-hairline-soft dark:border-[#23252a] p-6",
                viewportWidth === "mobile" && "max-w-[380px]",
                viewportWidth === "tablet" && "max-w-[640px]",
                viewportWidth === "desktop" && "max-w-full"
              )}
            >
              {LivePreview ? (
                <div className="w-full flex items-center justify-center">
                  <LivePreview />
                </div>
              ) : (
                <div className="text-caption text-muted">Preview unavailable</div>
              )}
            </div>
          )}

          {activeTab === "code" && (
            <div className="w-full rounded-md bg-[#141414] text-[#f0f0f0] p-6 font-mono text-xs overflow-x-auto max-h-[480px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#262626] text-[11px] text-[#adadad]">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-[#0066ff]" />
                  components/{component.slug}.tsx
                </span>
                <span>React 19 + TypeScript</span>
              </div>
              <pre className="text-[12px] leading-relaxed select-all">
                <code>{component.code}</code>
              </pre>
            </div>
          )}

          {activeTab === "props" && (
            <div className="w-full bg-white rounded-md border border-hairline-soft p-6">
              <h3 className="text-title font-bold text-ink mb-2">Component API & Props</h3>
              <p className="text-body-sm text-muted mb-4">
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

      {/* Installation and Dependencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-canvas-soft rounded-md p-6 border border-hairline-soft flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-4 h-4 text-ink" />
              <h3 className="text-title font-bold text-ink">Install via CLI</h3>
            </div>
            <p className="text-body-sm text-muted">
              Add this block directly into your project's component directory.
            </p>
          </div>
          <div className="flex items-center justify-between p-3 rounded-sm bg-white border border-hairline font-mono text-xs">
            <span className="text-ink select-all">{component.cliCommand}</span>
            <button onClick={handleCopyCli} className="text-muted hover:text-ink ml-2">
              {copiedCli ? <Check className="w-4 h-4 text-[#0066ff]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="bg-canvas-soft rounded-md p-6 border border-hairline-soft flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-4 h-4 text-ink" />
              <h3 className="text-title font-bold text-ink">Dependencies</h3>
            </div>
            <p className="text-body-sm text-muted">
              Required npm packages to support icons and style utilities.
            </p>
          </div>
          <div className="flex items-center justify-between p-3 rounded-sm bg-white border border-hairline font-mono text-xs">
            <span className="text-ink select-all">{installDepsCmd}</span>
            <button onClick={handleCopyInstall} className="text-muted hover:text-ink ml-2">
              {copiedInstall ? <Check className="w-4 h-4 text-[#0066ff]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Related Components Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-h2 font-bold text-ink">
            Related components in {component.category}.
          </h2>
          <Link
            href="/components"
            className="text-body-sm font-semibold text-muted hover:text-ink transition-colors"
          >
            View all components →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fallbackRelated.map((rel) => (
            <ComponentPreviewCard key={rel.id} component={rel} />
          ))}
        </div>
      </div>
    </div>
  );
}
