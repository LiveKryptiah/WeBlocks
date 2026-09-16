"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Layers,
  Heart,
} from "lucide-react";
import { APPS, SCREENSHOTS } from "@/data/mock-data";
import { AppIconSquircle } from "@/components/ui/app-icon";
import { ButtonOutline, ButtonPrimary } from "@/components/ui/button";
import { ScreenshotGrid } from "@/components/reference/screenshot-grid";
import { AddToCollectionModal } from "@/components/collection/add-to-collection-modal";

export default function AppDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState("All");
  const [collectionModalId, setCollectionModalId] = useState<string | null>(null);

  const slug = params?.slug as string;
  const app = APPS.find((a) => a.slug === slug);

  if (!app) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-h3 font-bold text-ink mb-4">Product not found.</h1>
        <p className="text-body text-muted mb-8">
          The requested application could not be found in our catalog.
        </p>
        <ButtonPrimary onClick={() => router.push("/apps")}>
          Return to Apps Directory
        </ButtonPrimary>
      </div>
    );
  }

  const appScreens = SCREENSHOTS.filter((s) => s.appId === app.id);
  const patternsInApp = ["All", ...Array.from(new Set(appScreens.map((s) => s.pattern)))];

  const filteredScreens = selectedPattern === "All"
    ? appScreens
    : appScreens.filter((s) => s.pattern === selectedPattern);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Back navigation */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-body-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Apps</span>
        </button>
      </div>

      {/* Product Header Lockup */}
      <div className="bg-canvas-soft rounded-md p-8 sm:p-12 border border-hairline-soft mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <AppIconSquircle
            name={app.name}
            bgColor={app.iconBg}
            textColor={app.iconColor}
            symbol={app.iconSymbol}
            size={96}
          />
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-h2 font-bold text-ink">{app.name}</h1>
              <span className="text-body-sm bg-white px-3 py-1 rounded-full border border-hairline text-muted">
                {app.industry}
              </span>
            </div>
            <p className="text-body text-muted max-w-xl font-light mb-3">
              {app.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-body-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                {app.platforms.join(", ")}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {app.screensCount} indexed screens
              </span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto">
          <a
            href={app.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial"
          >
            <ButtonOutline size="md" className="w-full">
              <span>Website</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </ButtonOutline>
          </a>

          <ButtonPrimary
            size="md"
            onClick={() => setIsFollowing(!isFollowing)}
            className="flex-1 sm:flex-initial"
          >
            <Heart className={`w-4 h-4 mr-1.5 ${isFollowing ? "fill-current" : ""}`} />
            <span>{isFollowing ? "Following" : "Follow App"}</span>
          </ButtonPrimary>
        </div>
      </div>

      {/* Pattern Filter Pills for this app */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <span className="text-label uppercase tracking-wider text-muted mr-2 font-semibold shrink-0">
          Filter by pattern:
        </span>
        {patternsInApp.map((pat) => (
          <button
            key={pat}
            type="button"
            onClick={() => setSelectedPattern(pat)}
            className={`px-4 py-1.5 rounded-full text-body-sm font-semibold transition-colors shrink-0 ${
              selectedPattern === pat
                ? "bg-ink text-white dark:bg-white dark:text-[#08090a]"
                : "bg-field text-muted hover:text-ink dark:bg-[#161718] dark:text-[#8a8f98] dark:hover:text-white"
            }`}
          >
            {pat}
          </button>
        ))}
      </div>

      {/* Screenshot Gallery */}
      <ScreenshotGrid
        screenshots={filteredScreens}
        onOpenCollectionModal={(s) => setCollectionModalId(s.id)}
        emptyTitle={`No ${selectedPattern} screens indexed for ${app.name}.`}
        emptyDescription="Try selecting 'All' to view all cataloged screens for this product."
        onResetFilters={() => setSelectedPattern("All")}
      />

      {/* Add to Collection Modal */}
      <AddToCollectionModal
        screenshotId={collectionModalId}
        onClose={() => setCollectionModalId(null)}
      />
    </div>
  );
}
