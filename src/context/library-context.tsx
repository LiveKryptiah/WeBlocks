"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  ScreenshotEntity,
  CollectionEntity,
  SCREENSHOTS,
  COLLECTIONS,
} from "@/data/mock-data";

export type CanvasTheme = "light" | "neutral" | "dark";
export type AppTheme = "light" | "dark" | "system";

export interface ToastData {
  id: number;
  message: string;
  type?: "success" | "saved" | "collection" | "copy" | "info";
}

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
  canvasTheme: CanvasTheme;
  setCanvasTheme: (theme: CanvasTheme) => void;
  theme: AppTheme;
  isDark: boolean;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  toast: ToastData | null;
  showToast: (message: string, type?: ToastData["type"]) => void;
  dismissToast: () => void;
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
  const [canvasTheme, setCanvasThemeState] = useState<CanvasTheme>("light");
  const [theme, setThemeState] = useState<AppTheme>("system");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const applyTheme = (targetTheme: AppTheme) => {
    if (typeof window === "undefined") return;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = targetTheme === "dark" || (targetTheme === "system" && systemPrefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("weblocks_theme", newTheme);
    } catch (e) {
      console.warn("Failed to persist theme", e);
    }
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme: AppTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme === "dark" ? "dark mode" : "light mode"}`, "info");
  };

  // Listen for system theme changes when in 'system' mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  const showToast = (message: string, type: ToastData["type"] = "success") => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ id: Date.now(), message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  const dismissToast = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast(null);
  };

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
      const storedTheme = localStorage.getItem("weblocks_canvas_theme") as CanvasTheme | null;
      if (storedTheme && ["light", "neutral", "dark"].includes(storedTheme)) {
        setCanvasThemeState(storedTheme);
      }
      const storedAppTheme = localStorage.getItem("weblocks_theme") as AppTheme | null;
      if (storedAppTheme && ["light", "dark", "system"].includes(storedAppTheme)) {
        setThemeState(storedAppTheme);
        applyTheme(storedAppTheme);
      } else {
        applyTheme("system");
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
      const isCurrentlySaved = prev.includes(id);
      const next = isCurrentlySaved ? prev.filter((item) => item !== id) : [...prev, id];
      saveToStorage("weblocks_saved_ids", next);
      if (isCurrentlySaved) {
        showToast("Removed from saved references", "info");
      } else {
        showToast("Saved reference to your library", "saved");
      }
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
    showToast(`Created collection "${title}"`, "collection");
    return newCol.id;
  };

  const renameCollection = (id: string, newTitle: string) => {
    const nextCols = collections.map((col) =>
      col.id === id ? { ...col, title: newTitle } : col
    );
    setCollections(nextCols);
    saveToStorage("weblocks_collections", nextCols);
    showToast("Collection renamed", "success");
  };

  const deleteCollection = (id: string) => {
    const nextCols = collections.filter((col) => col.id !== id);
    setCollections(nextCols);
    saveToStorage("weblocks_collections", nextCols);
    showToast("Collection deleted", "info");
  };

  const addReferenceToCollection = (collectionId: string, screenshotId: string) => {
    let collectionTitle = "Collection";
    const nextCols = collections.map((col) => {
      if (col.id === collectionId) {
        collectionTitle = col.title;
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
    showToast(`Added to "${collectionTitle}"`, "collection");
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
    showToast("Removed from collection", "info");
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

  const setCanvasTheme = (theme: CanvasTheme) => {
    setCanvasThemeState(theme);
    saveToStorage("weblocks_canvas_theme", theme);
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
        canvasTheme,
        setCanvasTheme,
        theme,
        isDark,
        setTheme,
        toggleTheme,
        toast,
        showToast,
        dismissToast,
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
