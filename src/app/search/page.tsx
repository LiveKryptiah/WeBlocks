"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  Trash2,
  Sparkles,
  Grid,
  Layers,
  ArrowRight,
  Folder,
} from "lucide-react";
import {
  APPS,
  PATTERNS,
  SCREENSHOTS,
  COLLECTIONS,
} from "@/data/mock-data";
import { useLibrary } from "@/context/library-context";
import { SearchInput } from "@/components/ui/input";
import { AppIconSquircle } from "@/components/ui/app-icon";
import { ReferenceCard } from "@/components/reference/reference-card";
import { EmptyState } from "@/components/ui/states";

export default function SearchPage() {
  const { searchHistory, addSearchQuery, clearSearchHistory } = useLibrary();
  const [query, setQuery] = useState("");

  const searchSuggestions = [
    "Onboarding",
    "Linear command palette",
    "Wise balance",
    "Passkey authentication",
    "Checkout sheet",
    "Settings toggles",
    "Dark mode",
  ];

  const handleSearch = (term: string) => {
    setQuery(term);
    addSearchQuery(term);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        screens: [],
        apps: [],
        patterns: [],
        collections: [],
      };
    }

    const matchedScreens = SCREENSHOTS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.appName.toLowerCase().includes(q) ||
        s.pattern.toLowerCase().includes(q) ||
        s.industry.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );

    const matchedApps = APPS.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.industry.toLowerCase().includes(q)
    );

    const matchedPatterns = PATTERNS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    const matchedCollections = COLLECTIONS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );

    return {
      screens: matchedScreens,
      apps: matchedApps,
      patterns: matchedPatterns,
      collections: matchedCollections,
    };
  }, [query]);

  const totalResults =
    results.screens.length +
    results.apps.length +
    results.patterns.length +
    results.collections.length;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h2 font-bold text-ink mb-2">Search library.</h1>
        <p className="text-body text-muted max-w-xl font-light">
          Instantly query screens, patterns, products, and curated design collections.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="mb-8">
        <SearchInput
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim().length > 2) {
              addSearchQuery(e.target.value.trim());
            }
          }}
          onClear={() => setQuery("")}
          placeholder="Search by keywords, products, patterns, or tags..."
          className="h-14 text-body-large rounded-full pl-14"
          autoFocus
        />
      </div>

      {/* When no query is typed yet: show suggestions & recent searches */}
      {!query.trim() && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
          {/* Recent searches */}
          <div className="bg-canvas-soft rounded-md p-6 border border-hairline-soft">
            <div className="flex items-center justify-between mb-4">
              <span className="text-label uppercase tracking-wider text-muted font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Recent searches
              </span>
              {searchHistory.length > 0 && (
                <button
                  type="button"
                  onClick={clearSearchHistory}
                  className="text-caption text-muted hover:text-ink flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {searchHistory.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSearch(item)}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-field text-ink text-body-sm font-medium border border-hairline transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-body-sm text-muted">
                Your recent searches will appear here.
              </p>
            )}
          </div>

          {/* Curated suggestions */}
          <div className="bg-canvas-soft rounded-md p-6 border border-hairline-soft">
            <span className="text-label uppercase tracking-wider text-muted font-semibold flex items-center gap-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Suggested topics
            </span>
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map((term, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSearch(term)}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-field text-ink text-body-sm font-medium border border-hairline transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Query Results View */}
      {query.trim() && (
        <div className="space-y-12">
          {/* Results Summary */}
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <p className="text-body font-semibold text-ink">
              {totalResults === 0
                ? "No results found"
                : `${totalResults} ${totalResults === 1 ? "result" : "results"} for "${query}"`}
            </p>
            {totalResults > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-caption text-muted hover:text-ink underline"
              >
                Clear search
              </button>
            )}
          </div>

          {totalResults === 0 && (
            <EmptyState
              title="No references found for your query."
              description="Try searching for broader design terms like 'Onboarding', 'Checkout', 'Fintech', or 'Stripe'."
              icon={<Search className="w-6 h-6" />}
              actionLabel="View all references"
              onAction={() => setQuery("")}
            />
          )}

          {/* Section: Matched Apps */}
          {results.apps.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-muted" />
                <h2 className="text-title font-bold text-ink">Apps & Products</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.apps.map((app) => (
                  <Link
                    key={app.id}
                    href={`/apps/${app.slug}`}
                    className="p-4 rounded-sm bg-canvas-soft hover:bg-field border border-hairline-soft transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <AppIconSquircle
                        name={app.name}
                        bgColor={app.iconBg}
                        textColor={app.iconColor}
                        symbol={app.iconSymbol}
                        size={48}
                      />
                      <div className="min-w-0">
                        <p className="text-body font-bold text-ink group-hover:text-muted transition-colors truncate">
                          {app.name}
                        </p>
                        <p className="text-caption text-muted truncate">
                          {app.industry} • {app.screensCount} screens
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-ink group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section: Matched Patterns */}
          {results.patterns.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Grid className="w-4 h-4 text-muted" />
                <h2 className="text-title font-bold text-ink">UI Patterns</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {results.patterns.map((pat) => (
                  <Link
                    key={pat.id}
                    href={`/explore?pattern=${encodeURIComponent(pat.name)}`}
                    className="p-4 rounded-sm bg-canvas-soft hover:bg-field border border-hairline-soft transition-colors flex flex-col justify-between group"
                  >
                    <span className="text-body font-bold text-ink group-hover:text-muted transition-colors">
                      {pat.name}
                    </span>
                    <span className="text-caption text-muted mt-2 font-mono">
                      {pat.screensCount} screens
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section: Matched Collections */}
          {results.collections.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Folder className="w-4 h-4 text-muted" />
                <h2 className="text-title font-bold text-ink">Collections</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.collections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className="p-5 rounded-sm bg-canvas-soft hover:bg-field border border-hairline-soft transition-colors flex justify-between items-center group"
                  >
                    <div>
                      <p className="text-body font-bold text-ink group-hover:text-muted transition-colors">
                        {col.title}
                      </p>
                      <p className="text-caption text-muted mt-1">
                        {col.itemCount} references • Curated by {col.curator}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-ink group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section: Matched Reference Screens */}
          {results.screens.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-4 h-4 text-muted" />
                <h2 className="text-title font-bold text-ink">
                  Screenshots & References ({results.screens.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.screens.map((screenshot) => (
                  <ReferenceCard key={screenshot.id} screenshot={screenshot} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
