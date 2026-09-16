"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Edit2,
  Folder,
  Layers,
} from "lucide-react";
import { useLibrary } from "@/context/library-context";
import { SCREENSHOTS, ScreenshotEntity } from "@/data/mock-data";
import { ButtonPrimary, ButtonSoft, ButtonOutline } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { TextInput } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/states";
import { ReferenceCard } from "@/components/reference/reference-card";

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const {
    collections,
    renameCollection,
    deleteCollection,
    removeReferenceFromCollection,
  } = useLibrary();

  const id = params?.id as string;
  const collection = collections.find((c) => c.id === id);

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameTitle, setRenameTitle] = useState(collection?.title || "");

  if (!collection) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-h3 font-bold text-ink mb-4">Collection not found.</h1>
        <p className="text-body text-muted mb-8">
          The requested collection does not exist or was deleted.
        </p>
        <ButtonPrimary onClick={() => router.push("/collections")}>
          Return to Collections
        </ButtonPrimary>
      </div>
    );
  }

  const collectionScreenshots = SCREENSHOTS.filter((s) =>
    collection.screenshotIds.includes(s.id)
  );

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renameTitle.trim()) return;
    renameCollection(collection.id, renameTitle.trim());
    setIsRenameOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${collection.title}"?`)) {
      deleteCollection(collection.id);
      router.push("/collections");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.push("/collections")}
          className="inline-flex items-center gap-2 text-body-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Collections</span>
        </button>
      </div>

      {/* Collection Header */}
      <div className="bg-canvas-soft rounded-md p-8 sm:p-12 border border-hairline-soft mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-label uppercase tracking-wider text-muted font-semibold mb-2">
            <Folder className="w-3.5 h-3.5" />
            <span>Collection • {collection.screenshotIds.length} references</span>
          </div>
          <h1 className="text-h2 font-bold text-ink mb-3">{collection.title}</h1>
          <p className="text-body text-muted max-w-xl font-light">
            {collection.description}
          </p>
          <p className="text-caption text-muted mt-3">
            Curated by {collection.curator} • Updated {collection.updatedAt}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <ButtonOutline
            size="sm"
            onClick={() => {
              setRenameTitle(collection.title);
              setIsRenameOpen(true);
            }}
          >
            <Edit2 className="w-3.5 h-3.5 mr-1" />
            <span>Rename</span>
          </ButtonOutline>

          <button
            type="button"
            onClick={handleDelete}
            className="w-10 h-10 rounded-full bg-white border border-hairline text-muted hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-colors"
            title="Delete collection"
            aria-label="Delete collection"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Screenshots Grid or Empty State */}
      {collectionScreenshots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collectionScreenshots.map((item) => (
            <div key={item.id} className="relative group/colitem">
              <ReferenceCard screenshot={item} />
              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeReferenceFromCollection(collection.id, item.id);
                }}
                className="absolute top-2 right-2 z-40 px-2 py-1 bg-ink/90 hover:bg-red-600 text-white text-[11px] rounded-full opacity-0 group-hover/colitem:opacity-100 transition-opacity"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="This collection is currently empty."
          description="Browse references across the library and use the 'Add to Collection' button to populate this space."
          icon={<Layers className="w-6 h-6" />}
          actionLabel="Explore references"
          onAction={() => router.push("/explore")}
        />
      )}

      {/* Rename Modal */}
      <Modal
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        title="Rename collection."
      >
        <form onSubmit={handleRenameSubmit} className="space-y-4 pt-2">
          <TextInput
            value={renameTitle}
            onChange={(e) => setRenameTitle(e.target.value)}
            placeholder="Collection title"
            autoFocus
            required
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-hairline">
            <ButtonSoft type="button" onClick={() => setIsRenameOpen(false)}>
              Cancel
            </ButtonSoft>
            <ButtonPrimary type="submit">Save</ButtonPrimary>
          </div>
        </form>
      </Modal>
    </div>
  );
}
