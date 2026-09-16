"use client";

import React, { useState } from "react";
import {
  UI_COMPONENTS,
  COMPONENT_CATEGORIES,
  ComponentCategory,
} from "@/data/components-data";
import { ComponentPreviewCard } from "@/components/components-library/component-preview-card";
import { SearchInput } from "@/components/ui/input";

export default function ComponentsDirectoryPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | "All">("All");

  const categories = [
    { id: "All" as const, label: "All" },
    ...COMPONENT_CATEGORIES,
  ];

  const filteredComponents = UI_COMPONENTS.filter((comp) => {
    const matchesQuery =
      query.trim() === "" ||
      comp.title.toLowerCase().includes(query.toLowerCase()) ||
      comp.description.toLowerCase().includes(query.toLowerCase()) ||
      comp.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      comp.slug.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || comp.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-h2 font-bold text-ink mb-2">UI components.</h1>
        <p className="text-body text-muted max-w-2xl font-light">
          Explore interactive production blocks crafted with pure React, Tailwind CSS, and zero drop shadows.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <div className="flex-1 w-full">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search components by name, category, or tag..."
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
                  ? "bg-ink text-white"
                  : "bg-field text-muted hover:text-ink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Components Grid - 3 cards per row on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((comp) => (
          <ComponentPreviewCard key={comp.id} component={comp} />
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="py-20 text-center text-body text-muted">
          No components found matching &quot;{query}&quot;.
        </div>
      )}
    </div>
  );
}
