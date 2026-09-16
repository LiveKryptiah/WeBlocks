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
      className="group flex flex-col justify-between bg-canvas-soft hover:bg-field rounded-md p-6 border-none transition-all duration-200"
    >
      <div>
        {/* Visual Preview Collage */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {previewItems.length > 0 ? (
            previewItems.map((item) => (
              <div
                key={item.id}
                className="aspect-[9/14] rounded-sm bg-white overflow-hidden p-2 flex flex-col justify-between"
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

        {/* Collection Meta */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-label text-muted font-semibold">
            {collection.itemCount || collection.screenshotIds.length} references
          </span>
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <h3 className="text-h4 text-ink font-bold mb-2 group-hover:text-ink-soft transition-colors">
          {collection.title}
        </h3>
        <p className="text-body-sm text-muted line-clamp-2">
          {collection.description}
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-hairline-soft flex items-center justify-between text-caption text-muted">
        <span>Curated by {collection.curator}</span>
        <span>Updated {collection.updatedAt}</span>
      </div>
    </Link>
  );
};
