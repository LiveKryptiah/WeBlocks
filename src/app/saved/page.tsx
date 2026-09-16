"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Layers } from "lucide-react";
import { useLibrary } from "@/context/library-context";
import { SCREENSHOTS, ScreenshotEntity } from "@/data/mock-data";
import { SearchInput } from "@/components/ui/input";
import { ScreenshotGrid } from "@/components/reference/screenshot-grid";
import { AddToCollectionModal } from "@/components/collection/add-to-collection-modal";

export default function SavedPage() {
  const router = useRouter();
  const { savedIds } = useLibrary();
  const [query, setQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [collectionModalId, setCollectionModalId] = useState<string | null>(null);

  const platforms = ["All", "iOS", "Android", "Web", "macOS"];

  // Match saved IDs against SCREENSHOTS
  const savedScreenshots = useMemo(() => {
    return SCREENSHOTS.filter((s) => savedIds.includes(s.id));
  }, [savedIds]);

  const filteredScreenshots = useMemo(() => {
    return savedScreenshots.filter((item) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.appName.toLowerCase().includes(q) ||
          item.pattern.toLowerCase().includes(q) ||
          item.industry.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      if (selectedPlatform !== "All" && item.platform !== selectedPlatform) {
        return false;
      }

      return true;
    });
  }, [savedScreenshots, query, selectedPlatform]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-label uppercase tracking-wider text-muted font-semibold mb-2">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Library Storage</span>
        </div>
        <h1 className="text-h2 font-bold text-ink mb-2">Saved references.</h1>
        <p className="text-body text-muted max-w-2xl font-light">
          Your personal archive of bookmarked interaction patterns, screens, and design references.
        </p>
      </div>

      {/* Filter and Search controls */}
      {savedScreenshots.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-canvas-soft p-4 rounded-md border border-hairline-soft">
          <div className="flex-1 w-full max-w-md">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
              placeholder="Search in saved references..."
              className="bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1">
            {platforms.map((plat) => (
              <button
                key={plat}
                type="button"
                onClick={() => setSelectedPlatform(plat)}
                className={`px-3.5 py-1.5 rounded-full text-body-sm font-semibold transition-colors shrink-0 ${
                  selectedPlatform === plat
                    ? "bg-ink text-white dark:bg-white dark:text-[#08090a]"
                    : "bg-white dark:bg-[#161718] text-muted hover:text-ink border border-hairline dark:border-[#23252a] dark:text-[#8a8f98] dark:hover:text-white"
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid or Empty State */}
      <ScreenshotGrid
        screenshots={filteredScreenshots}
        onOpenCollectionModal={(s: ScreenshotEntity) => setCollectionModalId(s.id)}
        emptyTitle={
          savedScreenshots.length === 0
            ? "You haven't saved any references yet."
            : "No saved references match your search."
        }
        emptyDescription={
          savedScreenshots.length === 0
            ? "Click the bookmark icon on any screen card to add it to your personal library."
            : "Try clearing your search query or selecting a different platform."
        }
        onResetFilters={
          savedScreenshots.length === 0
            ? () => router.push("/explore")
            : () => {
                setQuery("");
                setSelectedPlatform("All");
              }
        }
      />

      <AddToCollectionModal
        screenshotId={collectionModalId}
        onClose={() => setCollectionModalId(null)}
      />
    </div>
  );
}
