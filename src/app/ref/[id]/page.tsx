"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  FolderPlus,
  Share2,
  Check,
  ExternalLink,
} from "lucide-react";
import { SCREENSHOTS, ScreenshotEntity } from "@/data/mock-data";
import { useLibrary } from "@/context/library-context";
import { AppIconSquircle } from "@/components/ui/app-icon";
import { Badge } from "@/components/ui/badge";
import { ButtonPrimary, ButtonOutline } from "@/components/ui/button";
import { ScreenshotMockup } from "@/components/reference/screenshot-mockup";
import { ReferenceCard } from "@/components/reference/reference-card";
import { AddToCollectionModal } from "@/components/collection/add-to-collection-modal";
import { cn } from "@/lib/utils";

export default function ReferenceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isSaved, toggleSave, showToast } = useLibrary();
  const [copied, setCopied] = useState(false);
  const [copiedFigma, setCopiedFigma] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [collectionModalId, setCollectionModalId] = useState<string | null>(null);

  const refId = params?.id as string;
  const screenshot = SCREENSHOTS.find((s) => s.id === refId);

  if (!screenshot) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-h3 font-bold text-ink mb-4">Reference not found.</h1>
        <p className="text-body text-muted mb-8">
          The requested screen reference could not be located or has been archived.
        </p>
        <ButtonPrimary onClick={() => router.push("/explore")}>
          Return to Explore
        </ButtonPrimary>
      </div>
    );
  }

  const saved = isSaved(screenshot.id);

  const relatedFromApp = SCREENSHOTS.filter(
    (s) => s.id !== screenshot.id && s.appId === screenshot.appId
  );

  const relatedByPattern = SCREENSHOTS.filter(
    (s) => s.id !== screenshot.id && s.pattern === screenshot.pattern && s.appId !== screenshot.appId
  ).slice(0, 4);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast("Reference link copied to clipboard", "copy");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyFigma = () => {
    if (typeof window !== "undefined") {
      const figmaTokenJson = JSON.stringify(
        {
          weblocksReference: {
            title: screenshot.title,
            app: screenshot.appName,
            pattern: screenshot.pattern,
            platform: screenshot.platform,
            dimensions: screenshot.aspectRatio === "portrait" ? "390x844" : "1280x800",
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
      showToast("Copied design tokens for Figma", "copy");
      setTimeout(() => setCopiedFigma(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-body-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Grid: Screenshot presentation + Metadata Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Large Screenshot presentation */}
        <div className="relative lg:col-span-8 bg-canvas-soft rounded-md p-6 sm:p-10 border-none flex items-center justify-center overflow-hidden min-h-[420px]">
          {/* Zoom controls */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 dark:bg-[#161718]/90 backdrop-blur-sm p-1 rounded-full border border-hairline-soft dark:border-[#23252a] text-caption font-semibold select-none">
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className={cn(
                "px-2.5 py-1 rounded-full transition-colors",
                zoomLevel === 1 ? "bg-ink text-white dark:bg-white dark:text-[#08090a]" : "text-muted hover:text-ink"
              )}
            >
              Fit
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1.4)}
              className={cn(
                "px-2.5 py-1 rounded-full transition-colors",
                zoomLevel === 1.4 ? "bg-ink text-white dark:bg-white dark:text-[#08090a]" : "text-muted hover:text-ink"
              )}
            >
              1.4x
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(2)}
              className={cn(
                "px-2.5 py-1 rounded-full transition-colors",
                zoomLevel === 2 ? "bg-ink text-white dark:bg-white dark:text-[#08090a]" : "text-muted hover:text-ink"
              )}
            >
              2x
            </button>
          </div>

          <div
            className="w-full max-w-xl rounded-sm overflow-hidden bg-white dark:bg-[#0f1011] border border-hairline-soft dark:border-[#23252a] transition-transform duration-200 cursor-zoom-in"
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.4 : prev === 1.4 ? 2 : 1))}
            title="Click to toggle magnification"
          >
            <ScreenshotMockup screenshot={screenshot} />
          </div>
        </div>

        {/* Metadata Details Column */}
        <div className="lg:col-span-4 bg-canvas-soft dark:bg-[#0f1011] rounded-md p-6 sm:p-8 border border-hairline-soft dark:border-[#23252a] space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <AppIconSquircle
                name={screenshot.appName}
                bgColor={screenshot.appIconBg}
                textColor={screenshot.appIconColor}
                size={48}
              />
              <div>
                <h1 className="text-title font-bold text-ink leading-tight">
                  {screenshot.title}
                </h1>
                <Link
                  href={`/apps/${screenshot.appSlug}`}
                  className="text-body-sm text-muted hover:text-ink flex items-center gap-1 font-medium transition-colors"
                >
                  {screenshot.appName}
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-canvas-soft hover:bg-field flex items-center justify-center text-muted hover:text-ink transition-colors shrink-0"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4 text-ink" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <ButtonPrimary
              onClick={() => toggleSave(screenshot.id)}
              className="w-full"
            >
              <Bookmark className={cn("w-4 h-4 mr-1.5", saved && "fill-current")} />
              {saved ? "Saved in Library" : "Save Reference"}
            </ButtonPrimary>

            <ButtonOutline
              onClick={() => setCollectionModalId(screenshot.id)}
              className="w-full"
            >
              <FolderPlus className="w-4 h-4 mr-1.5" />
              Add to Collection
            </ButtonOutline>

            {/* Copy for Figma Button */}
            <button
              type="button"
              onClick={handleCopyFigma}
              className="w-full h-11 px-4 rounded-full border border-hairline dark:border-[#23252a] bg-white dark:bg-[#161718] hover:bg-canvas-soft dark:hover:bg-[#202226] text-ink font-semibold text-body-sm flex items-center justify-center gap-2 transition-colors"
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
            <h3 className="text-label text-muted uppercase tracking-wider font-semibold mb-2">
              Overview
            </h3>
            <p className="text-body text-ink-soft leading-relaxed">
              {screenshot.description}
            </p>
          </div>

          {/* Key Design Highlights */}
          {screenshot.notes && (
            <div>
              <h3 className="text-label text-muted uppercase tracking-wider font-semibold mb-2">
                Key Design Elements
              </h3>
              <ul className="space-y-1.5 text-body-sm text-ink-soft">
                {screenshot.notes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-ink font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metadata Specs */}
          <div className="pt-4 border-t border-hairline space-y-3">
            <div className="flex justify-between text-body-sm">
              <span className="text-muted">Platform</span>
              <span className="font-semibold text-ink">{screenshot.platform}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-muted">Category</span>
              <span className="font-semibold text-ink">{screenshot.category}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-muted">UI Pattern</span>
              <Link
                href={`/patterns/${screenshot.pattern.toLowerCase()}`}
                className="font-semibold text-ink hover:underline"
              >
                {screenshot.pattern}
              </Link>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-muted">Industry</span>
              <span className="font-semibold text-ink">{screenshot.industry}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-muted">Cataloged</span>
              <span className="font-mono text-muted">{screenshot.addedAt}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="pt-2">
            <h3 className="text-label text-muted uppercase tracking-wider font-semibold mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {screenshot.tags.map((t) => (
                <Badge key={t} variant="soft">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related screens from same App */}
      {relatedFromApp.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-h3 font-bold text-ink">
              More screens from {screenshot.appName}.
            </h2>
            <Link
              href={`/apps/${screenshot.appSlug}`}
              className="text-link text-ink hover:text-muted"
            >
              View all from {screenshot.appName}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedFromApp.map((s) => (
              <ReferenceCard key={s.id} screenshot={s} />
            ))}
          </div>
        </section>
      )}

      {/* Related by pattern */}
      {relatedByPattern.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-h3 font-bold text-ink">
              Related {screenshot.pattern} patterns.
            </h2>
            <Link
              href={`/explore?pattern=${encodeURIComponent(screenshot.pattern)}`}
              className="text-link text-ink hover:text-muted"
            >
              Explore all {screenshot.pattern}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedByPattern.map((s) => (
              <ReferenceCard key={s.id} screenshot={s} />
            ))}
          </div>
        </section>
      )}

      <AddToCollectionModal
        screenshotId={collectionModalId}
        onClose={() => setCollectionModalId(null)}
      />
    </div>
  );
}
