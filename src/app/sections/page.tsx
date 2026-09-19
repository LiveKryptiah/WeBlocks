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
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12 relative overflow-visible">
      {/* Ambient background light glows for authentic frosted glass refraction */}
      <div className="absolute top-28 left-4 w-96 h-96 bg-blue-500/[0.07] dark:bg-blue-600/[0.12] rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-4 w-[500px] h-[500px] bg-purple-500/[0.05] dark:bg-indigo-600/[0.1] rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] bg-sky-500/[0.05] dark:bg-blue-500/[0.08] rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-h2 font-bold text-ink mb-2">Section showcase.</h1>
        <p className="text-body text-muted max-w-2xl font-light">
          Explore interactive production sections crafted with pure React, Tailwind CSS, and zero drop shadows.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <div className="flex-1 w-full">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search sections by name, category, or tag..."
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-body-sm font-semibold transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-ink text-white dark:bg-white dark:text-[#08090a]"
                  : "bg-field text-muted hover:text-ink dark:bg-[#161718] dark:text-[#8a8f98] dark:hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Single-Row (1 Card per Row) Sections Showcase */}
      <div className="flex flex-col gap-12 w-full">
        {filteredSections.map((section) => (
          <SectionPreviewCard key={section.id} section={section} />
        ))}
      </div>

      {/* Empty State */}
      {filteredSections.length === 0 && (
        <div className="py-20 text-center text-body text-muted font-light">
          No sections found matching &quot;{query}&quot;.
        </div>
      )}
    </div>
  );
}

export default function SectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-12 space-y-8">
          <div className="h-10 w-64 bg-field rounded-full animate-pulse" />
          <div className="h-12 w-full bg-field rounded-xl animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-field rounded-2xl animate-pulse" />
            <div className="h-96 bg-field rounded-2xl animate-pulse" />
          </div>
        </div>
      }
    >
      <SectionShowcaseContent />
    </Suspense>
  );
}
