"use client";

import React from "react";
import Link from "next/link";
import { AppEntity } from "@/data/mock-data";
import { AppIconSquircle } from "./app-icon";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  apps: AppEntity[];
  className?: string;
}

export const BrandMarquee: React.FC<MarqueeProps> = ({ apps, className }) => {
  // Duplicate for seamless infinite loop
  const displayApps = [...apps, ...apps];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-4 select-none mask-gradient",
        className
      )}
    >
      <div className="animate-marquee flex items-center gap-4">
        {displayApps.map((app, index) => (
          <Link
            key={`${app.id}-${index}`}
            href={`/apps/${app.slug}`}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-field hover:bg-canvas-soft border border-hairline-soft transition-all shrink-0 group"
          >
            <AppIconSquircle
              name={app.name}
              bgColor={app.iconBg}
              textColor={app.iconColor}
              symbol={app.iconSymbol}
              size={32}
            />
            <div className="text-left">
              <p className="text-body-sm font-semibold text-ink group-hover:text-muted transition-colors">
                {app.name}
              </p>
              <p className="text-[11px] text-muted leading-tight">
                {app.screensCount} references
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
