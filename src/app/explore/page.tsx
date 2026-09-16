"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SCREENSHOTS, ScreenshotEntity } from "@/data/mock-data";
import { FilterBar, FilterState } from "@/components/explore/filter-bar";
import { ScreenshotGrid } from "@/components/reference/screenshot-grid";
import { AddToCollectionModal } from "@/components/collection/add-to-collection-modal";

function ExploreContent() {
  const searchParams = useSearchParams();

  const initialFilters: FilterState = {
    query: searchParams.get("q") || "",
    platform: searchParams.get("platform") || "All",
    industry: searchParams.get("industry") || "All",
    pattern: searchParams.get("pattern") || "All",
    app: searchParams.get("app") || "All",
    sortBy: (searchParams.get("sort") as "latest" | "saved" | "name") || "latest",
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [collectionScreenshotId, setCollectionScreenshotId] = useState<string | null>(null);

  // Sync with searchParams when they change
  useEffect(() => {
    setFilters({
      query: searchParams.get("q") || "",
      platform: searchParams.get("platform") || "All",
      industry: searchParams.get("industry") || "All",
      pattern: searchParams.get("pattern") || "All",
      app: searchParams.get("app") || "All",
      sortBy: (searchParams.get("sort") as "latest" | "saved" | "name") || "latest",
    });
  }, [searchParams]);

  // Filter & sort logic
  const filteredScreenshots = useMemo(() => {
    return SCREENSHOTS.filter((item) => {
      // Query search
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.appName.toLowerCase().includes(q) ||
          item.pattern.toLowerCase().includes(q) ||
          item.industry.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Platform filter
      if (filters.platform !== "All" && item.platform !== filters.platform) {
        return false;
      }

      // Industry filter
      if (filters.industry !== "All" && item.industry !== filters.industry) {
        return false;
      }

      // Pattern filter
      if (filters.pattern !== "All" && item.pattern !== filters.pattern) {
        return false;
      }

      // App filter
      if (filters.app !== "All" && item.appName !== filters.app) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "saved") {
        return b.savedCount - a.savedCount;
      }
      if (filters.sortBy === "name") {
        return a.title.localeCompare(b.title);
      }
      // default: latest
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      query: "",
      platform: "All",
      industry: "All",
      pattern: "All",
      app: "All",
      sortBy: "latest",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-ink mb-2">
          Explore reference library.
        </h1>
        <p className="text-body text-muted max-w-2xl font-light">
          Search, filter, and inspect verified design references by platform,
          pattern, industry, and application.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="mb-10 bg-white p-4 rounded-md border border-hairline">
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          totalResults={filteredScreenshots.length}
        />
      </div>

      {/* Dominant Screenshot Gallery */}
      <ScreenshotGrid
        screenshots={filteredScreenshots}
        onOpenCollectionModal={(s: ScreenshotEntity) => setCollectionScreenshotId(s.id)}
        emptyTitle="No interface references match your filters."
        emptyDescription="Try clearing one or more active filters or search terms."
        onResetFilters={handleResetFilters}
      />

      {/* Add to Collection Modal */}
      <AddToCollectionModal
        screenshotId={collectionScreenshotId}
        onClose={() => setCollectionScreenshotId(null)}
      />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-7xl mx-auto px-6 py-12">
          <div className="h-10 w-64 bg-field rounded-full animate-pulse mb-8" />
          <div className="h-28 bg-field rounded-md animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[9/16] bg-field rounded-sm animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
