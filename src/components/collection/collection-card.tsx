import React from "react";
import Link from "next/link";
import { CollectionEntity, SCREENSHOTS } from "@/data/mock-data";
import { AppIconSquircle } from "@/components/ui/app-icon";
import { ArrowUpRight } from "lucide-react";

interface CollectionCardProps {
  collection: CollectionEntity;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  // Grab preview screenshots
  const previewItems = SCREENSHOTS.filter((s) =>
    collection.screenshotIds.includes(s.id)
  ).slice(0, 3);

  return (
    <Link
      href={`/collections/${collection.id}`}
      className="group flex flex-col justify-between bg-canvas-soft hover:bg-field/70 rounded-md p-6 border border-transparent dark:border-[#23252a] transition-all duration-200"
    >
      {/* Visual Preview Collage */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {previewItems.length > 0 ? (
          previewItems.map((item) => (
            <div
              key={item.id}
              className="aspect-[9/14] rounded-sm bg-white dark:bg-[#08090a] border border-transparent dark:border-[#23252a] overflow-hidden p-2 flex flex-col justify-between"
            >
              <div className="flex items-center gap-1">
                <AppIconSquircle
                  name={item.appName}
                  bgColor={item.appIconBg}
                  textColor={item.appIconColor}
                  size={32}
                  className="w-4 h-4 text-[8px]"
                />
                <span className="text-[9px] font-bold text-ink truncate">
                  {item.appName}
                </span>
              </div>
              <div className="space-y-1 my-auto">
                <div className="h-1.5 w-full bg-field rounded-full" />
                <div className="h-1.5 w-2/3 bg-field rounded-full" />
              </div>
              <span className="text-[8px] text-muted font-mono truncate">
                {item.pattern}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-3 aspect-[16/7] rounded-sm bg-field flex items-center justify-center text-caption text-muted">
            Empty collection
          </div>
        )}
      </div>

      {/* Card Bottom: Bold Title & Reference Count / Arrow */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <h3 className="text-lg sm:text-xl font-bold text-ink tracking-tight group-hover:text-ink-soft transition-colors">
          {collection.title}
        </h3>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-field text-caption font-semibold text-muted group-hover:text-ink transition-colors shrink-0">
          <span>{collection.itemCount || collection.screenshotIds.length} refs</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
