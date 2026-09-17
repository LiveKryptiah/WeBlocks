"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  Search,
} from "lucide-react";
import {
  APPS,
  PATTERNS,
  SCREENSHOTS,
  COLLECTIONS,
} from "@/data/mock-data";
import { UI_COMPONENTS } from "@/data/components-data";
import { ButtonPrimary, ButtonOutline } from "@/components/ui/button";
import { BrandMarquee } from "@/components/ui/marquee";
import { ScreenshotGrid } from "@/components/reference/screenshot-grid";
import { CollectionCard } from "@/components/collection/collection-card";
import { AppIconSquircle } from "@/components/ui/app-icon";
import { ComponentPreviewCard } from "@/components/components-library/component-preview-card";

export default function HomePage() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/explore?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push("/explore");
    }
  };

  const featuredScreenshots = SCREENSHOTS.filter((s) => s.featured).slice(0, 8);
  const recentScreenshots = SCREENSHOTS.slice().reverse().slice(0, 4);
  const featuredComponents = UI_COMPONENTS.slice(0, 6);

  return (
    <div className="w-full flex flex-col items-center">
      {/* SECTION 1: WHITESPACE-HEAVY HERO LOCKUP */}
      <section className="w-full max-w-5xl px-6 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24 text-center flex flex-col items-center">
        {/* Subtle pill kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-canvas-soft border border-hairline-soft text-caption font-semibold text-ink mb-6 select-none">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated interface references & component blocks</span>
        </div>

        {/* Display headline (Sentence case + terminal period: 56–80px, Weight 652, tight tracking -0.02em) */}
        <h1 className="text-display font-bold tracking-headline text-ink max-w-4xl mb-5">
          Discover real-world design inspiration.
        </h1>

        {/* Minimal Subtitle: 18px, Weight 456 */}
        <p className="text-body-large text-muted max-w-xl leading-relaxed mb-8">
          Production screenshots, UI patterns, and interactive component blocks.
        </p>

        {/* Hero Interactive Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl relative mb-6"
        >
          <div className="relative flex items-center">
            <div className="absolute left-5 text-muted pointer-events-none">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Search by pattern, app, or keyword (e.g. Onboarding, Wise, Linear)..."
              className="w-full h-14 bg-field text-ink placeholder:text-faint rounded-full pl-14 pr-36 text-body transition-all border-none outline-none focus:ring-2 focus:ring-ink focus:bg-canvas"
            />
            <div className="absolute right-2">
              <ButtonPrimary type="submit" size="sm">
                Explore
              </ButtonPrimary>
            </div>
          </div>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-body-sm text-muted">
          <span>Popular searches:</span>
          {["Onboarding", "Command Palette", "Checkout", "Settings", "Passkeys"].map(
            (term) => (
              <Link
                key={term}
                href={`/explore?q=${encodeURIComponent(term)}`}
                className="px-3 py-1 rounded-full bg-canvas-soft hover:bg-field text-ink font-medium text-caption transition-colors"
              >
                {term}
              </Link>
            )
          )}
        </div>
      </section>

      {/* SECTION 2: BRAND & APP SQUIRCLE MARQUEE */}
      <section className="w-full border-y border-hairline bg-canvas-soft/60 py-6 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-3 flex items-center justify-between">
          <span className="text-label uppercase tracking-wider text-muted font-semibold">
            Cataloged production apps
          </span>
          <Link
            href="/apps"
            className="text-caption font-semibold text-ink hover:text-muted flex items-center gap-1 transition-colors"
          >
            <span>View all 12+ apps</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <BrandMarquee apps={APPS} />
      </section>

      {/* SECTION 3: DENSE VISUAL SCREENSHOT GALLERY (FEATURED) */}
      <section className="w-full max-w-7xl px-6 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-label uppercase tracking-wider text-muted font-semibold">
              Curated Highlights
            </span>
            <h2 className="text-h2 text-ink font-bold mt-1">
              Featured interface references.
            </h2>
          </div>
          <Link href="/explore">
            <ButtonOutline size="sm">Browse all references</ButtonOutline>
          </Link>
        </div>

        <ScreenshotGrid screenshots={featuredScreenshots} />
      </section>

      {/* SECTION 4: EDITORIAL BREAKOUT - POPULAR PATTERNS */}
      <section className="w-full bg-canvas-soft border-y border-hairline py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-label uppercase tracking-wider text-muted font-semibold">
                Taxonomy
              </span>
              <h2 className="text-h2 text-ink font-bold mt-1">
                Browse by design pattern.
              </h2>
            </div>
            <Link
              href="/patterns"
              className="text-link text-ink hover:text-muted flex items-center gap-1.5 transition-colors"
            >
              <span>Explore all patterns</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PATTERNS.slice(0, 8).map((pattern) => (
              <Link
                key={pattern.id}
                href={`/explore?pattern=${encodeURIComponent(pattern.name)}`}
                className="group p-5 rounded-sm bg-canvas dark:bg-[#0f1011] hover:bg-field dark:hover:bg-[#161718] border border-hairline-soft dark:border-[#23252a] transition-colors flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-body font-bold text-ink group-hover:text-muted transition-colors">
                    {pattern.name}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-canvas-soft flex items-center justify-center text-muted group-hover:text-ink group-hover:translate-x-0.5 transition-transform">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-caption text-muted line-clamp-2 mb-3">
                  {pattern.description}
                </p>
                <span className="text-[11px] font-mono text-muted">
                  {pattern.screensCount} references
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: POPULAR PRODUCTS/APPS SHOWCASE */}
      <section className="w-full max-w-7xl px-6 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-label uppercase tracking-wider text-muted font-semibold">
              Ecosystem
            </span>
            <h2 className="text-h2 text-ink font-bold mt-1">
              Top referenced products.
            </h2>
          </div>
          <Link href="/apps">
            <ButtonOutline size="sm">View all apps</ButtonOutline>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPS.slice(0, 6).map((app) => (
            <Link
              key={app.id}
              href={`/apps/${app.slug}`}
              className="group p-6 rounded-md bg-canvas-soft hover:bg-field border border-hairline-soft transition-colors flex flex-col justify-between"
            >
              <div className="flex items-start gap-4 mb-4">
                <AppIconSquircle
                  name={app.name}
                  bgColor={app.iconBg}
                  textColor={app.iconColor}
                  symbol={app.iconSymbol}
                  size={48}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-title text-ink font-bold group-hover:text-muted transition-colors truncate">
                      {app.name}
                    </h3>
                    <span className="text-caption bg-canvas dark:bg-[#161718] px-2 py-0.5 rounded-full border border-hairline dark:border-[#23252a] text-muted dark:text-[#8a8f98]">
                      {app.industry}
                    </span>
                  </div>
                  <p className="text-caption text-muted mt-1">
                    {app.platforms.join(" • ")}
                  </p>
                </div>
              </div>

              <p className="text-body-sm text-muted line-clamp-2 mb-4">
                {app.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-hairline text-body-sm">
                <span className="text-ink font-semibold">
                  {app.screensCount} screens cataloged
                </span>
                <span className="text-muted group-hover:text-ink flex items-center gap-1 font-semibold">
                  Inspect
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION: INTERACTIVE COMPONENT BLOCKS */}
      <section className="w-full border-t border-hairline py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-label uppercase tracking-wider text-muted font-semibold">
                Components
              </span>
              <h2 className="text-h2 text-ink font-bold mt-1">
                Interactive component blocks.
              </h2>
            </div>
            <Link href="/components">
              <ButtonOutline size="sm">Browse all components</ButtonOutline>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredComponents.map((comp) => (
              <ComponentPreviewCard key={comp.id} component={comp} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CURATED EDITORIAL COLLECTIONS */}
      <section className="w-full bg-canvas border-t border-hairline dark:border-[#23252a] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-label uppercase tracking-wider text-muted font-semibold">
                Curation
              </span>
              <h2 className="text-h2 text-ink font-bold mt-1">
                Editorial reference collections.
              </h2>
            </div>
            <Link href="/collections">
              <ButtonOutline size="sm">Browse all collections</ButtonOutline>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {COLLECTIONS.map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: RECENTLY ADDED REFERENCES */}
      <section className="w-full max-w-7xl px-6 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-label uppercase tracking-wider text-muted font-semibold">
              Fresh Additions
            </span>
            <h2 className="text-h2 text-ink font-bold mt-1">
              Recently cataloged screens.
            </h2>
          </div>
          <Link href="/explore?sort=latest">
            <ButtonOutline size="sm">View latest archive</ButtonOutline>
          </Link>
        </div>

        <ScreenshotGrid screenshots={recentScreenshots} />
      </section>

      {/* SECTION 8: EDITORIAL CTA SECTION */}
      <section className="w-full max-w-5xl px-6 sm:px-8 py-16 sm:py-20 mb-8 text-center">
        <div className="bg-canvas-soft rounded-md p-10 sm:p-16 border border-hairline-soft flex flex-col items-center">
          <h2 className="text-h2 font-bold text-ink mb-4 max-w-xl">
            Accelerate your product design research.
          </h2>
          <p className="text-body-large text-muted font-light max-w-lg mb-8">
            Join thousands of product designers, engineering leads, and
            founders who use Weblocks every week to discover reference patterns.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/pricing">
              <ButtonPrimary size="lg">Get All Access</ButtonPrimary>
            </Link>
            <Link href="/explore">
              <ButtonOutline size="lg">Explore Free Archive</ButtonOutline>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
