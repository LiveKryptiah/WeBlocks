import React from "react";
import { ScreenshotEntity } from "@/data/mock-data";
import { ReferenceCard } from "./reference-card";
import { EmptyState, ScreenshotSkeletonGrid } from "@/components/ui/states";
import { Layers } from "lucide-react";

interface ScreenshotGridProps {
  screenshots: ScreenshotEntity[];
  isLoading?: boolean;
  onOpenCollectionModal?: (screenshot: ScreenshotEntity) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilters?: () => void;
}

export const ScreenshotGrid: React.FC<ScreenshotGridProps> = ({
  screenshots,
  isLoading = false,
  onOpenCollectionModal,
  emptyTitle = "No references found.",
  emptyDescription = "Try adjusting your filters or searching for different keywords.",
  onResetFilters,
}) => {
  if (isLoading) {
    return <ScreenshotSkeletonGrid count={8} />;
  }

  if (screenshots.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={<Layers className="w-6 h-6" />}
        actionLabel={onResetFilters ? "Clear all filters" : undefined}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      {screenshots.map((screenshot) => (
        <ReferenceCard
          key={screenshot.id}
          screenshot={screenshot}
          onOpenCollectionModal={onOpenCollectionModal}
        />
      ))}
    </div>
  );
};
