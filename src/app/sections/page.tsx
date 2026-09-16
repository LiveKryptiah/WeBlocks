"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  SECTIONS,
  SECTION_CATEGORIES,
  SectionCategory,
} from "@/data/sections-data";
import { SectionPreviewCard } from "@/components/sections/section-preview-card";
import { SearchInput } from "@/components/ui/input";

function SectionShowcaseContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("cat") as SectionCategory | null;

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SectionCategory | "All">(
    categoryParam && SECTION_CATEGORIES.some((c) => c.id === categoryParam)
      ? categoryParam
      : "All"
  );

  const categories = [
    { id: "All" as const, label: "All Sections" },
    ...SECTION_CATEGORIES,
  ];

  const filteredSections = useMemo(() => {
    return SECTIONS.filter((sec) => {
      const matchesCategory =
        selectedCategory === "All" || sec.category === selectedCategory;

      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        sec.title.toLowerCase().includes(q) ||
        sec.description.toLowerCase().includes(q) ||
        sec.category.toLowerCase().includes(q) ||
        sec.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-block px-3 py-1 rounded-full bg-field text-caption font-semibold text-ink mb-3">
          Section Showcase
        </div>
        <h1 className="text-display sm:text-h2 font-bold tracking-headline text-ink mb-3">
          Full-width section blocks.
        </h1>
        <p className="text-body-large text-muted max-w-2xl font-normal leading-relaxed">
          Inspect, interact with, and copy production-ready website sections — heroes, footers, contact forms, feature bentos, and pricing tables.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <div className="flex-1 w-full">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search sections by name, keyword, or tag..."
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-body-sm font-semibold transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-ink text-white"
                  : "bg-field text-muted hover:text-ink hover:bg-canvas-soft"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-10">
        {filteredSections.map((section) => (
          <SectionPreviewCard key={section.id} section={section} />
        ))}
      </div>

      {/* Empty State */}
      {filteredSections.length === 0 && (
        <div className="py-24 text-center space-y-3">
          <p className="text-body-large font-semibold text-ink">No sections match your criteria.</p>
          <p className="text-body-sm text-muted">Try resetting your search or selecting another category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
            className="mt-2 inline-flex items-center justify-center h-9 px-4 rounded-full bg-field hover:bg-canvas-soft text-ink text-body-sm font-semibold transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function SectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-8">
          <div className="h-10 w-64 bg-field rounded-full animate-pulse" />
          <div className="h-12 w-full bg-field rounded-xl animate-pulse" />
          <div className="h-96 w-full bg-field rounded-2xl animate-pulse" />
        </div>
      }
    >
      <SectionShowcaseContent />
    </Suspense>
  );
}
