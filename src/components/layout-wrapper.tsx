"use client";

import React, { useState, useEffect } from "react";
import { NavPill } from "./navigation/nav-pill";
import { Footer } from "./navigation/footer";
import { ReferenceDetailModal } from "./reference/reference-detail-modal";
import { AddToCollectionModal } from "./collection/add-to-collection-modal";
import { CommandPalette } from "./navigation/command-palette";
import { Toast } from "./ui/toast";
import { useLibrary } from "@/context/library-context";

export const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast, dismissToast } = useLibrary();
  const [collectionScreenshotId, setCollectionScreenshotId] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink transition-colors duration-200">
      <NavPill onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <main className="flex-1 pt-24 sm:pt-28">{children}</main>
      <Footer />

      {/* Global Command-K spotlight palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Global reference detail lightbox */}
      <ReferenceDetailModal
        onOpenCollectionModal={(id) => setCollectionScreenshotId(id)}
      />

      {/* Global add to collection modal */}
      <AddToCollectionModal
        screenshotId={collectionScreenshotId}
        onClose={() => setCollectionScreenshotId(null)}
      />

      {/* Global toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={dismissToast}
        />
      )}
    </div>
  );
};
