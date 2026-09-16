"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Bookmark,
  FolderPlus,
  ExternalLink,
  Share2,
  Check,
  ChevronRight,
} from "lucide-react";
import { useLibrary } from "@/context/library-context";
import { SCREENSHOTS } from "@/data/mock-data";
import { AppIconSquircle } from "@/components/ui/app-icon";
import { Badge } from "@/components/ui/badge";
import { ButtonPrimary, ButtonOutline } from "@/components/ui/button";
import { ScreenshotMockup } from "./screenshot-mockup";
import { cn } from "@/lib/utils";

interface ReferenceDetailModalProps {
  onOpenCollectionModal?: (screenshotId: string) => void;
}

export const ReferenceDetailModal: React.FC<ReferenceDetailModalProps> = ({
  onOpenCollectionModal,
}) => {
  const { activeLightboxRef, closeLightbox, isSaved, toggleSave, openLightbox, canvasTheme } =
    useLibrary();
  const [copied, setCopied] = useState(false);
  const [copiedFigma, setCopiedFigma] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [localTheme, setLocalTheme] = useState<"light" | "neutral" | "dark">(canvasTheme);

  if (!activeLightboxRef) return null;

  const saved = isSaved(activeLightboxRef.id);
  const relatedScreens = SCREENSHOTS.filter(
    (s) =>
      s.id !== activeLightboxRef.id &&
      (s.appId === activeLightboxRef.appId || s.pattern === activeLightboxRef.pattern)
  ).slice(0, 4);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        `${window.location.origin}/ref/${activeLightboxRef.id}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyFigma = () => {
    if (typeof window !== "undefined") {
      const figmaTokenJson = JSON.stringify(
        {
          weblocksReference: {
            title: activeLightboxRef.title,
            app: activeLightboxRef.appName,
            pattern: activeLightboxRef.pattern,
            platform: activeLightboxRef.platform,
            dimensions: activeLightboxRef.aspectRatio === "portrait" ? "390x844" : "1280x800",
            tokens: {
              borderRadius: "16px",
              elevation: "none",
              colorCanvas: "#ffffff",
              colorInk: "#141414",
            },
          },
        },
        null,
        2
      );
      navigator.clipboard.writeText(figmaTokenJson);
      setCopiedFigma(true);
      setTimeout(() => setCopiedFigma(false), 2500);
    }
  };

  const backdropBgClass =
    localTheme === "dark"
      ? "bg-[#141414]"
      : localTheme === "neutral"
      ? "bg-[#e5e5e5]"
      : "bg-canvas-soft";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-sm transition-opacity"
        onClick={closeLightbox}
        aria-hidden="true"
      />

      {/* Lightbox dialog card */}
      <div className="relative w-full max-w-5xl bg-white rounded-md border border-hairline my-auto z-10 overflow-hidden shadow-none flex flex-col max-h-[92vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-white shrink-0">
          <div className="flex items-center gap-3">
            <AppIconSquircle
              name={activeLightboxRef.appName}
              bgColor={activeLightboxRef.appIconBg}
              textColor={activeLightboxRef.appIconColor}
              size={48}
            />
            <div>
              <h3 className="text-title text-ink font-bold leading-tight">
                {activeLightboxRef.title}
              </h3>
              <p className="text-body-sm text-muted">
                {activeLightboxRef.appName} • {activeLightboxRef.platform} • Added{" "}
                {activeLightboxRef.addedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-canvas-soft hover:bg-field flex items-center justify-center text-muted hover:text-ink transition-colors"
              title="Copy link"
              aria-label="Share reference"
            >
              {copied ? <Check className="w-4 h-4 text-ink" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-canvas-soft hover:bg-field flex items-center justify-center text-muted hover:text-ink transition-colors"
              title="Close"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content area: Screenshot focus + Metadata column */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Visual Presentation with Zoom Pan & Canvas Lighting */}
          <div className={cn("relative lg:col-span-8 p-6 sm:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-hairline overflow-hidden min-h-[380px] transition-colors duration-200", backdropBgClass)}>
            {/* Top Floating Controls */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              {/* Canvas Theme Selector */}
              <div className="pointer-events-auto flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-full border border-hairline text-caption font-semibold select-none">
                <button
                  type="button"
                  onClick={() => setLocalTheme("light")}
                  className={cn(
                    "px-2 py-0.5 rounded-full transition-colors text-[11px]",
                    localTheme === "light" ? "bg-ink text-white" : "text-muted hover:text-ink"
                  )}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setLocalTheme("neutral")}
                  className={cn(
                    "px-2 py-0.5 rounded-full transition-colors text-[11px]",
                    localTheme === "neutral" ? "bg-ink text-white" : "text-muted hover:text-ink"
                  )}
                >
                  Neutral
                </button>
                <button
                  type="button"
                  onClick={() => setLocalTheme("dark")}
                  className={cn(
                    "px-2 py-0.5 rounded-full transition-colors text-[11px]",
                    localTheme === "dark" ? "bg-ink text-white" : "text-muted hover:text-ink"
                  )}
                >
                  Dark
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="pointer-events-auto flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-full border border-hairline text-caption font-semibold select-none">
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className={cn(
                    "px-2.5 py-1 rounded-full transition-colors",
                    zoomLevel === 1 ? "bg-ink text-white" : "text-muted hover:text-ink"
                  )}
                >
                  Fit
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1.4)}
                  className={cn(
                    "px-2.5 py-1 rounded-full transition-colors",
                    zoomLevel === 1.4 ? "bg-ink text-white" : "text-muted hover:text-ink"
                  )}
                >
                  1.4x
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(2)}
                  className={cn(
                    "px-2.5 py-1 rounded-full transition-colors",
                    zoomLevel === 2 ? "bg-ink text-white" : "text-muted hover:text-ink"
                  )}
                >
                  2x
                </button>
              </div>
            </div>

            <div
              className="w-full max-w-md rounded-sm overflow-hidden border border-hairline-soft bg-white transition-transform duration-200 cursor-zoom-in mt-6"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.4 : prev === 1.4 ? 2 : 1))}
              title="Click to toggle zoom magnification"
            >
              <ScreenshotMockup screenshot={activeLightboxRef} />
            </div>
          </div>

          {/* Metadata & Actions Sidebar */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-6">
              {/* Primary Actions */}
              <div className="flex flex-col gap-2.5">
                <ButtonPrimary
                  onClick={() => toggleSave(activeLightboxRef.id)}
                  className="w-full"
                >
                  <Bookmark
                    className={cn("w-4 h-4 mr-1", saved && "fill-current")}
                  />
                  {saved ? "Saved in Library" : "Save Reference"}
                </ButtonPrimary>

                {onOpenCollectionModal && (
                  <ButtonOutline
                    onClick={() => onOpenCollectionModal(activeLightboxRef.id)}
                    className="w-full"
                  >
                    <FolderPlus className="w-4 h-4 mr-1" />
                    Add to Collection
                  </ButtonOutline>
                )}

                {/* Copy for Figma Action */}
                <button
                  type="button"
                  onClick={handleCopyFigma}
                  className="w-full h-11 px-4 rounded-full border border-hairline bg-white hover:bg-canvas-soft text-ink font-semibold text-body-sm flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedFigma ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">Copied for Figma</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#F24E1E]" />
                      <span>Copy for Figma</span>
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-label text-muted uppercase tracking-wider mb-2">
                  Overview
                </h4>
                <p className="text-body text-ink-soft leading-relaxed">
                  {activeLightboxRef.description}
                </p>
              </div>

              {/* Key Notes */}
              {activeLightboxRef.notes && (
                <div>
                  <h4 className="text-label text-muted uppercase tracking-wider mb-2">
                    Design Highlights
                  </h4>
                  <ul className="space-y-1.5 text-body-sm text-ink-soft">
                    {activeLightboxRef.notes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-ink font-bold">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Metadata Grid */}
              <div className="pt-4 border-t border-hairline space-y-3">
                <div className="flex justify-between text-body-sm">
                  <span className="text-muted">Product / App</span>
                  <Link
                    href={`/apps/${activeLightboxRef.appSlug}`}
                    onClick={closeLightbox}
                    className="text-ink font-semibold flex items-center gap-1 hover:underline"
                  >
                    {activeLightboxRef.appName}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-muted">UI Pattern</span>
                  <Link
                    href={`/patterns/${activeLightboxRef.pattern.toLowerCase()}`}
                    onClick={closeLightbox}
                    className="text-ink font-semibold hover:underline"
                  >
                    {activeLightboxRef.pattern}
                  </Link>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-muted">Platform</span>
                  <span className="text-ink font-semibold">
                    {activeLightboxRef.platform}
                  </span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span className="text-muted">Industry</span>
                  <span className="text-ink font-semibold">
                    {activeLightboxRef.industry}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-label text-muted uppercase tracking-wider mb-2">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeLightboxRef.tags.map((tag) => (
                    <Badge key={tag} variant="soft">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Page Link */}
            <div className="pt-4 border-t border-hairline">
              <Link
                href={`/ref/${activeLightboxRef.id}`}
                onClick={closeLightbox}
                className="text-body-sm text-muted hover:text-ink flex items-center justify-between font-medium group"
              >
                <span>Open dedicated page</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related screens bar */}
        {relatedScreens.length > 0 && (
          <div className="px-6 py-4 bg-canvas-soft border-t border-hairline shrink-0">
            <p className="text-label uppercase tracking-wider text-muted mb-3 font-semibold">
              Related references from {activeLightboxRef.appName} & {activeLightboxRef.pattern}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedScreens.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className="cursor-pointer bg-white p-2 rounded-sm border border-hairline hover:border-ink transition-colors flex items-center gap-2.5"
                >
                  <AppIconSquircle
                    name={item.appName}
                    bgColor={item.appIconBg}
                    textColor={item.appIconColor}
                    size={32}
                  />
                  <div className="min-w-0">
                    <p className="text-caption font-semibold text-ink truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-muted truncate">
                      {item.pattern}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
