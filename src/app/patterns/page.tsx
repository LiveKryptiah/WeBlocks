"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { PATTERNS } from "@/data/mock-data";
import { SearchInput } from "@/components/ui/input";

export default function PatternsDirectoryPage() {
  const [query, setQuery] = useState("");

  const filteredPatterns = PATTERNS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-h2 font-bold text-ink mb-2">UI patterns.</h1>
        <p className="text-body text-muted max-w-2xl font-light">
          Explore recurring interface behaviors, architectural components, and interaction flows.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mb-10">
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search patterns (e.g. Onboarding, Checkout, Modals)..."
        />
      </div>

      {/* Grid of patterns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatterns.map((pattern) => (
          <Link
            key={pattern.id}
            href={`/patterns/${pattern.slug}`}
            className="group bg-canvas-soft hover:bg-field rounded-md p-6 sm:p-8 border border-hairline-soft transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ink shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-muted group-hover:text-ink group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <h2 className="text-h4 font-bold text-ink mb-2 group-hover:text-muted transition-colors">
                {pattern.name}
              </h2>
              <p className="text-body-sm text-muted leading-relaxed mb-6">
                {pattern.description}
              </p>
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between text-caption text-muted">
              <span className="font-mono font-semibold text-ink">
                {pattern.screensCount} curated references
              </span>
              <span className="group-hover:text-ink font-semibold">Inspect flow →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
