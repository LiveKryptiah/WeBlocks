"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  Sparkles,
  Compass,
  Grid,
  FolderHeart,
  Code2,
} from "lucide-react";
import { useLibrary } from "@/context/library-context";
import { ButtonPrimary } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavPillProps {
  onOpenCommandPalette?: () => void;
}

export const NavPill: React.FC<NavPillProps> = ({ onOpenCommandPalette }) => {
  const pathname = usePathname();
  const { savedIds } = useLibrary();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/components", label: "Components", icon: Code2 },
    { href: "/patterns", label: "Patterns", icon: Grid },
    { href: "/apps", label: "Apps", icon: Sparkles },
    { href: "/collections", label: "Collections", icon: FolderHeart },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <>
      {/* Floating Centered Desktop / Mobile Container */}
      <header
        className={cn(
          "fixed top-4 sm:top-6 inset-x-0 z-40 flex justify-center px-4 transition-all duration-200 pointer-events-none"
        )}
      >
        {/* Desktop & Tablet Floating Pill */}
        <nav
          role="navigation"
          aria-label="Main Navigation"
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border border-hairline-soft transition-all duration-200 backdrop-blur-md max-w-5xl w-full shadow-none",
            isScrolled ? "bg-white/95" : "bg-white/90"
          )}
        >
          {/* Logo / Brand Mark */}
          <Link
            href="/"
            className="flex items-center gap-2 pl-2 pr-3 py-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-full"
          >
            {/* Geometric Mark */}
            <div className="w-7 h-7 rounded-[8px] bg-ink flex items-center justify-center text-white font-bold text-xs group-hover:scale-95 transition-transform">
              W
            </div>
            <span className="font-bold text-title tracking-tight text-ink">
              Weblocks
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-body-sm font-semibold transition-colors duration-150",
                    isActive
                      ? "bg-field text-ink"
                      : "text-muted hover:text-ink hover:bg-canvas-soft"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2">
            {/* Primary CTA (Black Pill) */}
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-8 sm:h-9 px-3.5 sm:px-4 rounded-full bg-ink text-white hover:bg-ink-soft text-caption sm:text-body-sm font-semibold transition-colors select-none active:scale-[0.98] whitespace-nowrap"
            >
              Get access
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-ink hover:bg-canvas-soft transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm md:hidden pt-24 px-4 pb-6 overflow-y-auto">
          <div className="bg-white rounded-md border border-hairline-soft p-6 space-y-4">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-full text-body font-semibold transition-colors",
                      isActive
                        ? "bg-field text-ink"
                        : "text-muted hover:text-ink hover:bg-canvas-soft"
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-hairline-soft space-y-2">
              <Link
                href="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-full text-body font-semibold text-ink bg-canvas-soft"
              >
                <span>Saved References</span>
                <span className="w-6 h-6 rounded-full bg-ink text-white text-xs flex items-center justify-center font-bold">
                  {savedIds.length}
                </span>
              </Link>

              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-full text-body font-semibold text-ink bg-canvas-soft"
              >
                <User className="w-4 h-4" />
                <span>Account & Plan</span>
              </Link>

              <div className="pt-2">
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block"
                >
                  <ButtonPrimary size="md" className="w-full">
                    Get access
                  </ButtonPrimary>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
