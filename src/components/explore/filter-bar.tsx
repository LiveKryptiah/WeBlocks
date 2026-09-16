"use client";

import React from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { APPS, PATTERNS } from "@/data/mock-data";
import { SearchInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FilterState {
  query: string;
  platform: string;
  industry: string;
  pattern: string;
  app: string;
  sortBy: "latest" | "saved" | "name";
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (next: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const PLATFORMS = ["All", "iOS", "Android", "Web", "macOS"];
const INDUSTRIES = [
  "All",
  "Fintech",
  "Developer Tools",
  "Productivity",
  "Travel & Hospitality",
  "Media & Entertainment",
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const hasActiveFilters =
    filters.query ||
    filters.platform !== "All" ||
    filters.industry !== "All" ||
    filters.pattern !== "All" ||
    filters.app !== "All";

  const handleQueryChange = (val: string) => {
    onFilterChange({ ...filters, query: val });
  };

  const handlePlatformChange = (p: string) => {
    onFilterChange({ ...filters, platform: p });
  };

  const handleIndustryChange = (ind: string) => {
    onFilterChange({ ...filters, industry: ind });
  };

  const handlePatternChange = (pat: string) => {
    onFilterChange({ ...filters, pattern: pat });
  };

  const handleAppChange = (app: string) => {
    onFilterChange({ ...filters, app: app });
  };

  const handleSortChange = (sort: "latest" | "saved" | "name") => {
    onFilterChange({ ...filters, sortBy: sort });
  };

  return (
    <div className="w-full space-y-4">
      {/* Top row: Search input + Sort dropdown */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <SearchInput
            value={filters.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onClear={() => handleQueryChange("")}
            placeholder="Search screens, flows, patterns, apps, industries..."
          />
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 bg-field px-3 py-1.5 rounded-full text-body-sm">
            <SlidersHorizontal className="w-4 h-4 text-muted" />
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as "latest" | "saved" | "name")}
              className="bg-transparent text-ink font-semibold text-body-sm outline-none cursor-pointer"
            >
              <option value="latest">Sort: Latest</option>
              <option value="saved">Sort: Most Saved</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>

          <span className="text-caption text-muted font-mono whitespace-nowrap">
            {totalResults} {totalResults === 1 ? "reference" : "references"}
          </span>
        </div>
      </div>

      {/* Filter Horizontal Scroll Rows */}
      <div className="space-y-2.5 pt-1">
        {/* Platform Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-label uppercase tracking-wider text-muted mr-2 shrink-0 font-semibold">
            Platform:
          </span>
          {PLATFORMS.map((plat) => {
            const isSelected = filters.platform === plat;
            return (
              <button
                key={plat}
                type="button"
                onClick={() => handlePlatformChange(plat)}
                className={cn(
                  "px-3 py-1 rounded-full text-body-sm font-semibold transition-colors shrink-0 select-none",
                  isSelected
                    ? "bg-ink text-white"
                    : "bg-field text-muted hover:text-ink hover:bg-canvas-soft"
                )}
              >
                {plat}
              </button>
            );
          })}
        </div>

        {/* Industry Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-label uppercase tracking-wider text-muted mr-2 shrink-0 font-semibold">
            Industry:
          </span>
          {INDUSTRIES.map((ind) => {
            const isSelected = filters.industry === ind;
            return (
              <button
                key={ind}
                type="button"
                onClick={() => handleIndustryChange(ind)}
                className={cn(
                  "px-3 py-1 rounded-full text-body-sm font-semibold transition-colors shrink-0 select-none",
                  isSelected
                    ? "bg-ink text-white"
                    : "bg-field text-muted hover:text-ink hover:bg-canvas-soft"
                )}
              >
                {ind}
              </button>
            );
          })}
        </div>

        {/* Patterns Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-label uppercase tracking-wider text-muted mr-2 shrink-0 font-semibold">
            Pattern:
          </span>
          <button
            type="button"
            onClick={() => handlePatternChange("All")}
            className={cn(
              "px-3 py-1 rounded-full text-body-sm font-semibold transition-colors shrink-0 select-none",
              filters.pattern === "All"
                ? "bg-ink text-white"
                : "bg-field text-muted hover:text-ink hover:bg-canvas-soft"
            )}
          >
            All
          </button>
          {PATTERNS.map((pat) => {
            const isSelected = filters.pattern === pat.name;
            return (
              <button
                key={pat.id}
                type="button"
                onClick={() => handlePatternChange(pat.name)}
                className={cn(
                  "px-3 py-1 rounded-full text-body-sm font-semibold transition-colors shrink-0 select-none",
                  isSelected
                    ? "bg-ink text-white"
                    : "bg-field text-muted hover:text-ink hover:bg-canvas-soft"
                )}
              >
                {pat.name}
              </button>
            );
          })}
        </div>

        {/* App Filter Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-label uppercase tracking-wider text-muted mr-2 shrink-0 font-semibold">
            App:
          </span>
          <button
            type="button"
            onClick={() => handleAppChange("All")}
            className={cn(
              "px-3 py-1 rounded-full text-body-sm font-semibold transition-colors shrink-0 select-none",
              filters.app === "All"
                ? "bg-ink text-white"
                : "bg-field text-muted hover:text-ink hover:bg-canvas-soft"
            )}
          >
            All Apps
          </button>
          {APPS.map((app) => {
            const isSelected = filters.app === app.name;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => handleAppChange(app.name)}
                className={cn(
                  "px-3 py-1 rounded-full text-body-sm font-semibold transition-colors shrink-0 select-none",
                  isSelected
                    ? "bg-ink text-white"
                    : "bg-field text-muted hover:text-ink hover:bg-canvas-soft"
                )}
              >
                {app.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-hairline">
          <span className="text-caption text-muted">Active filters:</span>

          {filters.query && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-field text-body-sm text-ink">
              <span>Query: &quot;{filters.query}&quot;</span>
              <button onClick={() => handleQueryChange("")} className="hover:text-muted">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {filters.platform !== "All" && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-field text-body-sm text-ink">
              <span>Platform: {filters.platform}</span>
              <button onClick={() => handlePlatformChange("All")} className="hover:text-muted">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {filters.industry !== "All" && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-field text-body-sm text-ink">
              <span>Industry: {filters.industry}</span>
              <button onClick={() => handleIndustryChange("All")} className="hover:text-muted">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {filters.pattern !== "All" && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-field text-body-sm text-ink">
              <span>Pattern: {filters.pattern}</span>
              <button onClick={() => handlePatternChange("All")} className="hover:text-muted">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {filters.app !== "All" && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-field text-body-sm text-ink">
              <span>App: {filters.app}</span>
              <button onClick={() => handleAppChange("All")} className="hover:text-muted">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onReset}
            className="text-caption font-semibold text-muted hover:text-ink underline ml-2 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
