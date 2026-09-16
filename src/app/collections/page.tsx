"use client";

import React, { useState } from "react";
import { Plus, FolderHeart } from "lucide-react";
import { useLibrary } from "@/context/library-context";
import { CollectionCard } from "@/components/collection/collection-card";
import { ButtonPrimary, ButtonSoft } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { TextInput } from "@/components/ui/input";

export default function CollectionsPage() {
  const { collections, createCollection } = useLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createCollection(newTitle.trim(), newDescription.trim());
    setNewTitle("");
    setNewDescription("");
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-h2 font-bold text-ink mb-2">Curated collections.</h1>
          <p className="text-body text-muted max-w-xl font-light">
            Editorial moodboards and thematic research bundles gathered by designers worldwide.
          </p>
        </div>

        <ButtonPrimary onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" />
          <span>New Collection</span>
        </ButtonPrimary>
      </div>

      {/* Grid of collections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {collections.map((col) => (
          <CollectionCard key={col.id} collection={col} />
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a new collection."
        description="Group references for a specific client, feature sprint, or moodboard."
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <div>
            <label className="text-label uppercase tracking-wider text-muted font-semibold block mb-1.5">
              Title
            </label>
            <TextInput
              placeholder="e.g. Fintech KYC Onboarding"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div>
            <label className="text-label uppercase tracking-wider text-muted font-semibold block mb-1.5">
              Description
            </label>
            <TextInput
              placeholder="Brief summary of the collection focus"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-hairline">
            <ButtonSoft type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </ButtonSoft>
            <ButtonPrimary type="submit">Create Collection</ButtonPrimary>
          </div>
        </form>
      </Modal>
    </div>
  );
}
