"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Layers,
  Sparkles,
  Grid,
  FolderHeart,
  CornerDownLeft,
  X,
  Code2,
  LayoutTemplate,
} from "lucide-react";
import { APPS, PATTERNS, SCREENSHOTS, COLLECTIONS } from "@/data/mock-data";
import { UI_COMPONENTS } from "@/data/components-data";
import { SECTIONS } from "@/data/sections-data";
import { useLibrary } from "@/context/library-context";
import { AppIconSquircle } from "@/components/ui/app-icon";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { openLightbox } = useLibrary();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Compute matched items
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();

    // Default quick navigation actions if query is empty
    if (!q) {
      return [
        {
          id: "nav-sections",
          type: "nav" as const,
          title: "Section Showcase",
          subtitle: "Hero sections, footers, contact forms, and pricing",
          icon: <LayoutTemplate className="w-4 h-4 text-muted" />,
          action: () => router.push("/sections"),
        },
        {
          id: "nav-components",
          type: "nav" as const,
          title: "Interactive UI Components",
          subtitle: "14 copy-paste React & Tailwind building blocks",
          icon: <Code2 className="w-4 h-4 text-muted" />,
          action: () => router.push("/components"),
        },
        {
          id: "nav-patterns",
          type: "nav" as const,
          title: "UI Patterns Taxonomy",
          subtitle: "14 core recurring interface components",
          icon: <Grid className="w-4 h-4 text-muted" />,
          action: () => router.push("/patterns"),
        },
        {
          id: "nav-apps",
          type: "nav" as const,
          title: "Production Products Directory",
          subtitle: "Linear, Wise, Stripe, Raycast, and more",
          icon: <Sparkles className="w-4 h-4 text-muted" />,
          action: () => router.push("/apps"),
        },
        {
          id: "nav-collections",
          type: "nav" as const,
          title: "Curated Thematic Collections",
          subtitle: "Fintech, Command Palettes, Mobile Sheets",
          icon: <FolderHeart className="w-4 h-4 text-muted" />,
          action: () => router.push("/collections"),
        },
      ];
    }

    const results: Array<{
      id: string;
      type: "screen" | "app" | "pattern" | "collection" | "component" | "section";
      title: string;
      subtitle: string;
      icon: React.ReactNode;
      action: () => void;
    }> = [];

    // Matched Sections
    SECTIONS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    )
      .slice(0, 3)
      .forEach((sec) => {
        results.push({
          id: `sec-${sec.id}`,
          type: "section",
          title: sec.title,
          subtitle: `${sec.category.toUpperCase()} • Section Block`,
          icon: <LayoutTemplate className="w-4 h-4 text-muted" />,
          action: () => router.push(`/sections?cat=${sec.category}`),
        });
      });

    // Matched Components
    UI_COMPONENTS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    )
      .slice(0, 3)
      .forEach((comp) => {
        results.push({
          id: `comp-${comp.id}`,
          type: "component",
          title: comp.title,
          subtitle: `${comp.category} • ${comp.tier.toUpperCase()} • ${comp.cliCommand}`,
          icon: <Code2 className="w-4 h-4 text-muted" />,
          action: () => router.push(`/components/${comp.slug}`),
        });
      });

    // Matched Apps
    APPS.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.industry.toLowerCase().includes(q)
    )
      .slice(0, 3)
      .forEach((app) => {
        results.push({
          id: `app-${app.id}`,
          type: "app",
          title: app.name,
          subtitle: `${app.industry} • ${app.screensCount} screens`,
          icon: (
            <AppIconSquircle
              name={app.name}
              bgColor={app.iconBg}
              textColor={app.iconColor}
              symbol={app.iconSymbol}
              size={32}
              className="w-5 h-5 text-[9px]"
            />
          ),
          action: () => router.push(`/apps/${app.slug}`),
        });
      });

    // Matched Patterns
    PATTERNS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
      .slice(0, 3)
      .forEach((pat) => {
        results.push({
          id: `pat-${pat.id}`,
          type: "pattern",
          title: pat.name,
          subtitle: `${pat.screensCount} pattern references`,
          icon: <Grid className="w-4 h-4 text-muted" />,
          action: () => router.push(`/patterns/${pat.slug}`),
        });
      });

    // Matched Screens
    SCREENSHOTS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.appName.toLowerCase().includes(q) ||
        s.pattern.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    )
      .slice(0, 5)
      .forEach((screen) => {
        results.push({
          id: `screen-${screen.id}`,
          type: "screen",
          title: screen.title,
          subtitle: `${screen.appName} • ${screen.pattern} (${screen.platform})`,
          icon: <Layers className="w-4 h-4 text-muted" />,
          action: () => openLightbox(screen),
        });
      });

    // Matched Collections
    COLLECTIONS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    )
      .slice(0, 2)
      .forEach((col) => {
        results.push({
          id: `col-${col.id}`,
          type: "collection",
          title: col.title,
          subtitle: `${col.itemCount} references • ${col.curator}`,
          icon: <FolderHeart className="w-4 h-4 text-muted" />,
          action: () => router.push(`/collections/${col.id}`),
        });
      });

    return results;
  }, [query, router, openLightbox]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, items.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + items.length) % Math.max(1, items.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (items[selectedIndex]) {
          items[selectedIndex].action();
          onClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-ink/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Spotlight palette container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Menu"
        className="relative w-full max-w-2xl bg-white rounded-md border border-hairline overflow-hidden shadow-none z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search input header */}
        <div className="flex items-center px-4 py-3 border-b border-hairline gap-3 bg-white">
          <Search className="w-5 h-5 text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search components, screens, apps, patterns, or collections..."
            className="flex-1 text-body text-ink placeholder:text-faint bg-transparent border-none outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-muted hover:text-ink"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] font-mono text-muted bg-field px-2 py-0.5 rounded-full">
              ESC to close
            </span>
          )}
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {items.length > 0 ? (
            items.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-sm cursor-pointer transition-colors select-none",
                    isSelected ? "bg-canvas-soft text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-field flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-body-sm font-semibold text-ink truncate">
                        {item.title}
                      </p>
                      <p className="text-caption text-muted truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-muted shrink-0 ml-2">
                      <span>Jump</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-body-sm text-muted">
              No references found for &quot;{query}&quot;.
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-canvas-soft border-t border-hairline flex items-center justify-between text-caption text-muted">
          <div className="flex items-center gap-3">
            <span>Navigation</span>
            <span className="font-mono bg-field px-1.5 py-0.5 rounded text-[10px]">↑↓</span>
            <span>Select</span>
            <span className="font-mono bg-field px-1.5 py-0.5 rounded text-[10px]">↵</span>
          </div>
          <span>Weblocks Quick Command</span>
        </div>
      </div>
    </div>
  );
};
