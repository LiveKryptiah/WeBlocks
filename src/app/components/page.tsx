"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Terminal,
  Copy,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  Filter,
} from "lucide-react";
import {
  UI_COMPONENTS,
  COMPONENT_CATEGORIES,
  ComponentCategory,
} from "@/data/components-data";
import { ComponentPreviewCard } from "@/components/components-library/component-preview-card";
import { useLibrary } from "@/context/library-context";
import { cn } from "@/lib/utils";

export default function ComponentsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | "all">("all");
  const [selectedTier, setSelectedTier] = useState<"all" | "free" | "pro">("all");
  const [copiedStarter, setCopiedStarter] = useState(false);
  const { showToast } = useLibrary();

  const starterCli = "npx weblocks add floating-nav-pill";

  const handleCopyStarter = () => {
    navigator.clipboard.writeText(starterCli);
    setCopiedStarter(true);
    showToast("Copied starter CLI command.", "copy");
    setTimeout(() => setCopiedStarter(false), 2000);
  };

  const filteredComponents = useMemo(() => {
    return UI_COMPONENTS.filter((comp) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        comp.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || comp.category === selectedCategory;

      const matchesTier =
        selectedTier === "all" || comp.tier === selectedTier;

      return matchesSearch && matchesCategory && matchesTier;
    });
  }, [searchQuery, selectedCategory, selectedTier]);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <section className="mb-10 sm:mb-12">
        <span className="text-label uppercase tracking-wider text-muted font-semibold">
          Components
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mt-1 mb-2 max-w-3xl">
          Interactive component blocks.
        </h1>
        <p className="text-body text-muted max-w-xl font-light">
          Production React and Tailwind UI components with live interactive playgrounds.
        </p>

        {/* CLI Quick Starter Banner */}
        <div className="mt-6 flex flex-wrap items-center gap-3 p-3 sm:p-4 rounded-2xl bg-canvas border border-hairline max-w-2xl">
          <div className="w-8 h-8 rounded-xl bg-ink text-white flex items-center justify-center shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs font-bold text-ink">Install directly via CLI</div>
            <div className="text-[11px] font-mono text-muted">{starterCli}</div>
          </div>
          <button
            onClick={handleCopyStarter}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-field hover:bg-canvas-soft border border-hairline text-xs font-semibold text-ink transition-colors"
          >
            {copiedStarter ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#0066ff]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted" />
                <span>Copy Command</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="mb-8 flex flex-col gap-4">
        {/* Search Bar & Tier Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter components (e.g. dock, pill, confirm, otp)..."
              className="w-full pl-9 pr-9 py-2 rounded-full bg-canvas border border-hairline text-xs font-medium text-ink placeholder-muted focus:outline-none focus:border-ink transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tier Segmented Toggle */}
          <div className="flex items-center self-start sm:self-auto gap-1 p-1 rounded-full bg-field border border-hairline">
            {(["all", "free", "pro"] as const).map((tier) => {
              const isSelected = selectedTier === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all",
                    isSelected
                      ? "bg-white text-ink shadow-none border border-hairline"
                      : "text-muted hover:text-ink"
                  )}
                >
                  {tier === "pro" ? (
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#0066ff]" />
                      Pro
                    </span>
                  ) : (
                    tier
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
              selectedCategory === "all"
                ? "bg-ink text-white"
                : "bg-field text-muted hover:text-ink hover:bg-canvas-soft"
            )}
          >
            All Components ({UI_COMPONENTS.length})
          </button>
          {COMPONENT_CATEGORIES.map((cat) => {
            const count = UI_COMPONENTS.filter((c) => c.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
                  isSelected
                    ? "bg-ink text-white"
                    : "bg-field text-muted hover:text-ink hover:bg-canvas-soft"
                )}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between mb-6 text-xs text-muted">
        <span>
          Showing <strong className="text-ink">{filteredComponents.length}</strong> component
          {filteredComponents.length === 1 ? "" : "s"}.
        </span>
        {(selectedCategory !== "all" || selectedTier !== "all" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedTier("all");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-ink underline hover:opacity-75"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Components Grid */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredComponents.map((comp) => (
            <ComponentPreviewCard key={comp.id} component={comp} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-canvas-soft border border-hairline">
          <div className="w-12 h-12 rounded-2xl bg-field flex items-center justify-center text-muted mb-3">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-ink mb-1">No components found.</h3>
          <p className="text-xs text-muted max-w-sm mb-4">
            We couldn't find any component matching your search or category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedTier("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-full bg-ink text-white text-xs font-semibold hover:bg-[#262626]"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
