"use client";

import React, { useState } from "react";
import { Plus, Check, Folder } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { ButtonPrimary, ButtonSoft } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { useLibrary } from "@/context/library-context";
import { SCREENSHOTS } from "@/data/mock-data";

interface AddToCollectionModalProps {
  screenshotId: string | null;
  onClose: () => void;
}

export const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({
  screenshotId,
  onClose,
}) => {
  const {
    collections,
    createCollection,
    addReferenceToCollection,
    removeReferenceFromCollection,
  } = useLibrary();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  if (!screenshotId) return null;

  const targetScreenshot = SCREENSHOTS.find((s) => s.id === screenshotId);

  const handleToggle = (colId: string, alreadyIn: boolean) => {
    if (alreadyIn) {
      removeReferenceFromCollection(colId, screenshotId);
    } else {
      addReferenceToCollection(colId, screenshotId);
    }
  };

  const handleCreateAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newId = createCollection(newTitle.trim(), newDescription.trim());
    addReferenceToCollection(newId, screenshotId);
    setNewTitle("");
    setNewDescription("");
    setIsCreatingNew(false);
  };

  return (
    <Modal
      isOpen={Boolean(screenshotId)}
      onClose={onClose}
      title="Save to collection."
      description={
        targetScreenshot
          ? `Organize "${targetScreenshot.title}" into your research collections.`
          : "Organize references into visual collections."
      }
    >
      <div className="space-y-4">
        {/* Collection items list */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {collections.map((col) => {
            const hasRef = col.screenshotIds.includes(screenshotId);
            return (
              <div
                key={col.id}
                onClick={() => handleToggle(col.id, hasRef)}
                className="flex items-center justify-between p-3 rounded-sm bg-canvas-soft hover:bg-field cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-field flex items-center justify-center text-ink shrink-0">
                    <Folder className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-sm font-semibold text-ink truncate">
                      {col.title}
                    </p>
                    <p className="text-caption text-muted">
                      {col.screenshotIds.length} references
                    </p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    hasRef
                      ? "bg-ink text-white border-ink"
                      : "border-hairline text-transparent"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Create new collection section */}
        {isCreatingNew ? (
          <form onSubmit={handleCreateAndAdd} className="pt-3 border-t border-hairline space-y-3">
            <TextInput
              placeholder="Collection title (e.g. Dark Mode Onboarding)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <TextInput
              placeholder="Optional description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <div className="flex justify-end gap-2 pt-1">
              <ButtonSoft type="button" size="sm" onClick={() => setIsCreatingNew(false)}>
                Cancel
              </ButtonSoft>
              <ButtonPrimary type="submit" size="sm">
                Create & Save
              </ButtonPrimary>
            </div>
          </form>
        ) : (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsCreatingNew(true)}
              className="inline-flex items-center gap-2 text-body-sm font-semibold text-ink hover:text-muted transition-colors py-1"
            >
              <Plus className="w-4 h-4" />
              <span>Create new collection</span>
            </button>
          </div>
        )}

        <div className="pt-4 border-t border-hairline flex justify-end">
          <ButtonPrimary onClick={onClose}>Done</ButtonPrimary>
        </div>
      </div>
    </Modal>
  );
};
