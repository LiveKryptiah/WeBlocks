"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { APPS } from "@/data/mock-data";
import { AppIconSquircle } from "@/components/ui/app-icon";
import { SearchInput } from "@/components/ui/input";

export default function AppsDirectoryPage() {
  const [query, setQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const industries = ["All", "Fintech", "Developer Tools", "Productivity", "Media & Entertainment", "Travel & Hospitality"];

  const filteredApps = APPS.filter((app) => {
    const matchesQuery =
      app.name.toLowerCase().includes(query.toLowerCase()) ||
      app.description.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || app.industry === selectedIndustry;
    return matchesQuery && matchesIndustry;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-h2 font-bold text-ink mb-2">Apps & products.</h1>
        <p className="text-body text-muted max-w-2xl font-light">
          Browse design systems and real-world interfaces indexed from top production software.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
        <div className="flex-1 w-full">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search products by name or description..."
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1">
          {industries.map((ind) => (
            <button
              key={ind}
              type="button"
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-1.5 rounded-full text-body-sm font-semibold transition-colors shrink-0 ${
                selectedIndustry === ind
                  ? "bg-ink text-white"
                  : "bg-field text-muted hover:text-ink"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <Link
            key={app.id}
            href={`/apps/${app.slug}`}
            className="group bg-canvas-soft hover:bg-field rounded-md p-6 border border-hairline-soft transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <AppIconSquircle
                    name={app.name}
                    bgColor={app.iconBg}
                    textColor={app.iconColor}
                    symbol={app.iconSymbol}
                    size={64}
                  />
                  <div>
                    <h2 className="text-title font-bold text-ink group-hover:text-muted transition-colors">
                      {app.name}
                    </h2>
                    <span className="text-caption text-muted">
                      {app.industry}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-muted group-hover:text-ink transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <p className="text-body-sm text-muted line-clamp-3 mb-6">
                {app.description}
              </p>
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between text-caption text-muted">
              <span className="font-semibold text-ink">
                {app.screensCount} cataloged screens
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                {app.platforms.join(", ")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
