"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { PATTERNS, SCREENSHOTS } from "@/data/mock-data";
import { ButtonPrimary } from "@/components/ui/button";
import { ScreenshotGrid } from "@/components/reference/screenshot-grid";
import { AddToCollectionModal } from "@/components/collection/add-to-collection-modal";

export default function PatternDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [collectionModalId, setCollectionModalId] = useState<string | null>(null);

  const slug = params?.slug as string;
  const pattern = PATTERNS.find((p) => p.slug === slug);

  if (!pattern) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-h3 font-bold text-ink mb-4">Pattern not found.</h1>
        <p className="text-body text-muted mb-8">
          The requested UI pattern is not indexed in our current taxonomy.
        </p>
        <ButtonPrimary onClick={() => router.push("/patterns")}>
          Return to Patterns
        </ButtonPrimary>
      </div>
    );
  }

  const platforms = ["All", "iOS", "Android", "Web", "macOS"];

  const patternScreens = SCREENSHOTS.filter(
    (s) => s.pattern.toLowerCase() === pattern.name.toLowerCase()
  );

  const filteredScreens = selectedPlatform === "All"
    ? patternScreens
    : patternScreens.filter((s) => s.platform === selectedPlatform);

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
          <span>Back to Patterns</span>
        </button>
      </div>

      {/* Pattern Header */}
      <div className="bg-canvas-soft rounded-md p-8 sm:p-12 border border-hairline-soft mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-hairline text-caption font-semibold text-ink mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Design Taxonomy</span>
        </div>
        <h1 className="text-h2 font-bold text-ink mb-3">{pattern.name}.</h1>
        <p className="text-body-large text-muted font-light max-w-2xl leading-relaxed mb-6">
          {pattern.description}
        </p>

        {/* Platform selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-hairline">
          <span className="text-label uppercase tracking-wider text-muted mr-2 font-semibold shrink-0">
            Platform:
          </span>
          {platforms.map((plat) => (
            <button
              key={plat}
              type="button"
              onClick={() => setSelectedPlatform(plat)}
              className={`px-4 py-1.5 rounded-full text-body-sm font-semibold transition-colors shrink-0 ${
                selectedPlatform === plat
                  ? "bg-ink text-white"
                  : "bg-white text-muted hover:text-ink border border-hairline"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Screenshot Gallery */}
      <ScreenshotGrid
        screenshots={filteredScreens}
        onOpenCollectionModal={(s) => setCollectionModalId(s.id)}
        emptyTitle={`No ${pattern.name} screens found for ${selectedPlatform}.`}
        emptyDescription="Try selecting 'All' platforms to view all matching pattern references."
        onResetFilters={() => setSelectedPlatform("All")}
      />

      <AddToCollectionModal
        screenshotId={collectionModalId}
        onClose={() => setCollectionModalId(null)}
      />
    </div>
  );
}
