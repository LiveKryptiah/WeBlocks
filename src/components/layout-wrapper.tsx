"use client";

import React, { useState } from "react";
import { NavPill } from "./navigation/nav-pill";
import { Footer } from "./navigation/footer";
import { ReferenceDetailModal } from "./reference/reference-detail-modal";
import { AddToCollectionModal } from "./collection/add-to-collection-modal";

export const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collectionScreenshotId, setCollectionScreenshotId] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-ink">
      <NavPill />
      <main className="flex-1 pt-24 sm:pt-28">{children}</main>
      <Footer />

      {/* Global reference detail lightbox */}
      <ReferenceDetailModal
        onOpenCollectionModal={(id) => setCollectionScreenshotId(id)}
      />

      {/* Global add to collection modal */}
      <AddToCollectionModal
        screenshotId={collectionScreenshotId}
        onClose={() => setCollectionScreenshotId(null)}
      />
    </div>
  );
};
