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
  const { isSaved, toggleSave } = useLibrary();
  const [copied, setCopied] = useState(false);
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
      setTimeout(() => setCopied(false), 2000);
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
        <div className="lg:col-span-8 bg-canvas-soft rounded-md p-6 sm:p-10 border border-hairline-soft flex items-center justify-center">
          <div className="w-full max-w-xl rounded-sm overflow-hidden bg-white border border-hairline-soft">
            <ScreenshotMockup screenshot={screenshot} />
          </div>
        </div>

        {/* Metadata Details Column */}
        <div className="lg:col-span-4 bg-white rounded-md p-6 sm:p-8 border border-hairline space-y-6">
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
