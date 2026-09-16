"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ScreenshotEntity,
  CollectionEntity,
  SCREENSHOTS,
  COLLECTIONS,
} from "@/data/mock-data";

export interface UserProfile {
  name: string;
  email: string;
  plan: "free" | "pro";
  isAuthenticated: boolean;
  avatarChar: string;
}

interface LibraryContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  collections: CollectionEntity[];
  createCollection: (title: string, description: string) => string;
  renameCollection: (id: string, newTitle: string) => void;
  deleteCollection: (id: string) => void;
  addReferenceToCollection: (collectionId: string, screenshotId: string) => void;
  removeReferenceFromCollection: (collectionId: string, screenshotId: string) => void;
  activeLightboxRef: ScreenshotEntity | null;
  openLightbox: (screenshot: ScreenshotEntity) => void;
  closeLightbox: () => void;
  user: UserProfile;
  login: (email: string, name?: string) => void;
  logout: () => void;
  upgradeToPro: () => void;
  searchHistory: string[];
  addSearchQuery: (query: string) => void;
  clearSearchHistory: () => void;
}

const defaultUser: UserProfile = {
  name: "Alex Designer",
  email: "alex@weblocks.design",
  plan: "pro",
  isAuthenticated: true,
  avatarChar: "A",
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedIds, setSavedIds] = useState<string[]>(["ref-1", "ref-2", "ref-5", "ref-7"]);
  const [collections, setCollections] = useState<CollectionEntity[]>(COLLECTIONS);
  const [activeLightboxRef, setActiveLightboxRef] = useState<ScreenshotEntity | null>(null);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Onboarding flows",
    "Linear dark mode",
    "Wise currency calculator",
    "Checkout sheet",
  ]);

  // Load from localStorage if client-side
  useEffect(() => {
    try {
      const storedSaved = localStorage.getItem("weblocks_saved_ids");
      if (storedSaved) {
        setSavedIds(JSON.parse(storedSaved));
      }
      const storedCols = localStorage.getItem("weblocks_collections");
      if (storedCols) {
        setCollections(JSON.parse(storedCols));
      }
      const storedUser = localStorage.getItem("weblocks_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.warn("Storage access failed", e);
    }
  }, []);

  const saveToStorage = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveToStorage("weblocks_saved_ids", next);
      return next;
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const createCollection = (title: string, description: string) => {
    const newCol: CollectionEntity = {
      id: `col-${Date.now()}`,
      title,
      description,
      curator: user.name,
      itemCount: 0,
      screenshotIds: [],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    const nextCols = [newCol, ...collections];
    setCollections(nextCols);
    saveToStorage("weblocks_collections", nextCols);
    return newCol.id;
  };

  const renameCollection = (id: string, newTitle: string) => {
    const nextCols = collections.map((col) =>
      col.id === id ? { ...col, title: newTitle } : col
    );
    setCollections(nextCols);
    saveToStorage("weblocks_collections", nextCols);
  };

  const deleteCollection = (id: string) => {
    const nextCols = collections.filter((col) => col.id !== id);
    setCollections(nextCols);
    saveToStorage("weblocks_collections", nextCols);
  };

  const addReferenceToCollection = (collectionId: string, screenshotId: string) => {
    const nextCols = collections.map((col) => {
      if (col.id === collectionId) {
        const nextIds = col.screenshotIds.includes(screenshotId)
          ? col.screenshotIds
          : [...col.screenshotIds, screenshotId];
        return {
          ...col,
          screenshotIds: nextIds,
          itemCount: nextIds.length,
          updatedAt: new Date().toISOString().split("T")[0],
        };
      }
      return col;
    });
    setCollections(nextCols);
    saveToStorage("weblocks_collections", nextCols);
  };

  const removeReferenceFromCollection = (collectionId: string, screenshotId: string) => {
    const nextCols = collections.map((col) => {
      if (col.id === collectionId) {
        const nextIds = col.screenshotIds.filter((id) => id !== screenshotId);
        return {
          ...col,
          screenshotIds: nextIds,
          itemCount: nextIds.length,
          updatedAt: new Date().toISOString().split("T")[0],
        };
      }
      return col;
    });
    setCollections(nextCols);
    saveToStorage("weblocks_collections", nextCols);
  };

  const openLightbox = (screenshot: ScreenshotEntity) => {
    setActiveLightboxRef(screenshot);
  };

  const closeLightbox = () => {
    setActiveLightboxRef(null);
  };

  const login = (email: string, name = "Alex Designer") => {
    const nextUser: UserProfile = {
      name,
      email,
      plan: "pro",
      isAuthenticated: true,
      avatarChar: name.charAt(0).toUpperCase() || "A",
    };
    setUser(nextUser);
    saveToStorage("weblocks_user", nextUser);
  };

  const logout = () => {
    const nextUser: UserProfile = {
      name: "Guest",
      email: "",
      plan: "free",
      isAuthenticated: false,
      avatarChar: "G",
    };
    setUser(nextUser);
    saveToStorage("weblocks_user", nextUser);
  };

  const upgradeToPro = () => {
    const nextUser: UserProfile = {
      ...user,
      plan: "pro",
    };
    setUser(nextUser);
    saveToStorage("weblocks_user", nextUser);
  };

  const addSearchQuery = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase());
      return [query.trim(), ...filtered].slice(0, 8);
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <LibraryContext.Provider
      value={{
        savedIds,
        toggleSave,
        isSaved,
        collections,
        createCollection,
        renameCollection,
        deleteCollection,
        addReferenceToCollection,
        removeReferenceFromCollection,
        activeLightboxRef,
        openLightbox,
        closeLightbox,
        user,
        login,
        logout,
        upgradeToPro,
        searchHistory,
        addSearchQuery,
        clearSearchHistory,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
};
