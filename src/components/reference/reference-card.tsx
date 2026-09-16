"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bookmark, FolderPlus, ArrowUpRight } from "lucide-react";
import { ScreenshotEntity } from "@/data/mock-data";
import { useLibrary } from "@/context/library-context";
import { AppIconSquircle } from "@/components/ui/app-icon";
import { BadgeOverlay } from "@/components/ui/badge";
import { ScreenshotMockup } from "./screenshot-mockup";
import { cn } from "@/lib/utils";

interface ReferenceCardProps {
  screenshot: ScreenshotEntity;
  onOpenCollectionModal?: (screenshot: ScreenshotEntity) => void;
  priority?: boolean;
}

export const ReferenceCard: React.FC<ReferenceCardProps> = ({
  screenshot,
  onOpenCollectionModal,
}) => {
  const { isSaved, toggleSave, openLightbox } = useLibrary();
  const saved = isSaved(screenshot.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col cursor-pointer transition-transform duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Screenshot Container */}
      <div
        onClick={() => openLightbox(screenshot)}
        className="relative w-full rounded-sm overflow-hidden bg-field dark:bg-[#0f1011] transition-all border border-hairline-soft dark:border-[#23252a]"
      >
        <ScreenshotMockup screenshot={screenshot} />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          <BadgeOverlay>{screenshot.pattern}</BadgeOverlay>
          <BadgeOverlay>{screenshot.platform}</BadgeOverlay>
        </div>

        {/* Hover Action Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-200 flex flex-col justify-between p-4 z-30 pointer-events-auto",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Action buttons */}
          <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => toggleSave(screenshot.id)}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all select-none",
                saved
                  ? "bg-white text-ink"
                  : "bg-ink/80 text-white hover:bg-white hover:text-ink"
              )}
              title={saved ? "Remove from saved" : "Save reference"}
              aria-label="Save reference"
            >
              <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
            </button>

            {onOpenCollectionModal && (
              <button
                type="button"
                onClick={() => onOpenCollectionModal(screenshot)}
                className="w-9 h-9 rounded-full bg-ink/80 hover:bg-white text-white hover:text-ink flex items-center justify-center transition-all select-none"
                title="Add to collection"
                aria-label="Add to collection"
              >
                <FolderPlus className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bottom quick inspect trigger */}
          <div className="flex items-center justify-between text-white">
            <span className="text-body-sm font-semibold">Inspect screen</span>
            <div className="w-7 h-7 rounded-full bg-white text-ink flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Meta Footer */}
      <div className="flex items-center justify-between pt-3 px-0.5">
        <Link
          href={`/apps/${screenshot.appSlug}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2.5 group/app min-w-0"
        >
          <AppIconSquircle
            name={screenshot.appName}
            bgColor={screenshot.appIconBg}
            textColor={screenshot.appIconColor}
            size={32}
          />
          <div className="min-w-0">
            <p className="text-body-sm font-semibold text-ink group-hover/app:text-muted truncate transition-colors">
              {screenshot.title}
            </p>
            <p className="text-caption text-muted truncate">
              {screenshot.appName} • {screenshot.industry}
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(screenshot.id);
          }}
          className="text-muted hover:text-ink p-1 transition-colors shrink-0 ml-2"
          aria-label={saved ? "Saved" : "Save"}
        >
          <Bookmark className={cn("w-4 h-4", saved && "fill-ink text-ink")} />
        </button>
      </div>
    </div>
  );
};
