export type ComponentCategory =
  | "navigation"
  | "buttons"
  | "cards"
  | "inputs"
  | "modals"
  | "effects";

export interface ComponentPropDoc {
  name: string;
  type: string;
  default?: string | number | boolean;
  description: string;
}

export interface UIComponentEntity {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ComponentCategory;
  tier: "free" | "pro";
  cliCommand: string;
  dependencies: string[];
  tags: string[];
  props: ComponentPropDoc[];
  code: string;
}

export const COMPONENT_CATEGORIES: { id: ComponentCategory; label: string }[] = [
  { id: "navigation", label: "Navigation" },
  { id: "buttons", label: "Buttons & Controls" },
  { id: "cards", label: "Cards & Bento" },
  { id: "inputs", label: "Inputs & Forms" },
  { id: "modals", label: "Modals & Sheets" },
  { id: "effects", label: "Effects & Media" },
];

export const UI_COMPONENTS: UIComponentEntity[] = [
  {
    id: "comp-1",
    slug: "floating-nav-pill",
    title: "Floating Nav Pill",
    description: "Centrally positioned floating pill navigation with active tab indicator, subtle hairline borders, and zero shadows.",
    category: "navigation",
    tier: "free",
    cliCommand: "npx weblocks add floating-nav-pill",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    tags: ["navigation", "pill", "header", "minimal"],
    props: [
      { name: "items", type: "Array<{ label: string; href: string }>", description: "List of navigation link items" },
      { name: "activeItem", type: "string", default: "Explore", description: "Currently active item label" },
      { name: "onSelect", type: "(item: string) => void", description: "Callback when a navigation item is clicked" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { Compass, Sparkles, FolderHeart } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ITEMS: NavItem[] = [
  { id: "explore", label: "Explore", icon: Compass },
  { id: "patterns", label: "Patterns", icon: Sparkles },
  { id: "saved", label: "Saved", icon: FolderHeart },
];

export function FloatingNavPill() {
  const [active, setActive] = useState("explore");

  return (
    <nav className="flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-hairline-soft shadow-none">
      <div className="w-7 h-7 rounded-lg bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
        W
      </div>
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={\`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 \${
              isActive
                ? "bg-[#f0f0f0] text-[#141414]"
                : "text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]"
            }\`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}`,
  },
  {
    id: "comp-2",
    slug: "island-dock",
    title: "Island Dock",
    description: "Compact floating dock with smooth scale effects on hover, squircle icons, and active status indicators.",
    category: "navigation",
    tier: "pro",
    cliCommand: "npx weblocks add island-dock",
    dependencies: ["lucide-react"],
    tags: ["dock", "island", "navigation", "squircle"],
    props: [
      { name: "items", type: "Array<{ id: string; label: string; icon: string }>", description: "Array of dock item configurations" },
      { name: "onItemClick", type: "(id: string) => void", description: "Handler fired when an icon is tapped" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { Home, Search, Bookmark, Sliders, Bell, Sparkles } from "lucide-react";

const DOCK_ITEMS = [
  { id: "home", label: "Overview", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "saved", label: "Saved", icon: Bookmark, badge: "4" },
  { id: "ai", label: "AI Assist", icon: Sparkles },
  { id: "alerts", label: "Activity", icon: Bell },
  { id: "settings", label: "Controls", icon: Sliders },
];

export function IslandDock() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#141414] text-white border border-[#262626] shadow-none">
      {DOCK_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        const isHovered = hovered === item.id;

        return (
          <div key={item.id} className="relative group">
            <button
              onClick={() => setActive(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className={\`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 \${
                isActive ? "bg-white text-[#141414]" : "text-[#adadad] hover:text-white hover:bg-[#262626]"
              } \${isHovered ? "scale-110 -translate-y-0.5" : ""}\`}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#0066ff] text-white text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
            {isHovered && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white text-[#141414] text-[10px] font-semibold tracking-tight whitespace-nowrap shadow-none pointer-events-none">
                {item.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}`,
  },
  {
    id: "comp-3",
    slug: "slide-to-confirm",
    title: "Slide to Confirm",
    description: "Interactive pill slider for critical actions (publish, checkout, delete) with tactile drag threshold and complete state.",
    category: "buttons",
    tier: "pro",
    cliCommand: "npx weblocks add slide-to-confirm",
    dependencies: ["lucide-react"],
    tags: ["button", "slider", "confirm", "tactile"],
    props: [
      { name: "label", type: "string", default: "Slide to publish", description: "Slider placeholder text" },
      { name: "onConfirm", type: "() => void", description: "Fires when user successfully slides past threshold" },
      { name: "successMessage", type: "string", default: "Confirmed!", description: "Text shown after successful slide" },
    ],
    code: `"use client";

import React, { useState, useRef } from "react";
import { ChevronRight, Check } from "lucide-react";

export function SlideToConfirm() {
  const [sliderPos, setSliderPos] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (isConfirmed || !trackRef.current) return;
    const track = trackRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offset = Math.max(0, Math.min(clientX - track.left, track.width - 44));
    setSliderPos(offset);

    if (offset >= track.width - 48) {
      setIsConfirmed(true);
      setSliderPos(track.width - 44);
    }
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setSliderPos(0);
  };

  return (
    <div
      ref={trackRef}
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      onTouchMove={handleDrag}
      className="relative w-full max-w-xs h-12 rounded-full bg-[#f0f0f0] border border-hairline-soft flex items-center px-1 select-none overflow-hidden"
    >
      <div
        className="absolute left-0 top-0 bottom-0 bg-[#141414] transition-all"
        style={{ width: isConfirmed ? "100%" : \`\${sliderPos + 44}px\` }}
      />
      <div
        className="relative z-10 w-10 h-10 rounded-full bg-white text-[#141414] flex items-center justify-center cursor-grab active:cursor-grabbing font-bold transition-transform"
        style={{ transform: \`translateX(\${sliderPos}px)\` }}
      >
        {isConfirmed ? <Check className="w-4 h-4 text-[#0066ff]" /> : <ChevronRight className="w-4 h-4" />}
      </div>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold tracking-tight text-[#707070] pointer-events-none">
        {isConfirmed ? (
          <span className="text-white font-bold">Action Confirmed.</span>
        ) : (
          "Slide to confirm"
        )}
      </span>
      {isConfirmed && (
        <button
          onClick={handleReset}
          className="absolute right-3 z-20 text-[10px] uppercase tracking-wider font-bold text-[#adadad] hover:text-white"
        >
          Reset
        </button>
      )}
    </div>
  );
}`,
  },
  {
    id: "comp-4",
    slug: "magnetic-squircle-button",
    title: "Magnetic Squircle Button",
    description: "Tactile action button with squircle geometry, micro-spring press state, and clean border outline.",
    category: "buttons",
    tier: "free",
    cliCommand: "npx weblocks add magnetic-squircle-button",
    dependencies: ["lucide-react"],
    tags: ["button", "squircle", "magnetic", "pill"],
    props: [
      { name: "label", type: "string", default: "Explore references", description: "Button text label" },
      { name: "variant", type: "'primary' | 'outline' | 'soft'", default: "'primary'", description: "Visual variant" },
      { name: "onClick", type: "() => void", description: "Click event callback" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function MagneticSquircleButton() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: \`translate(\${offset.x}px, \${offset.y}px)\` }}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141414] text-white text-xs font-semibold tracking-tight transition-transform duration-75 active:scale-95 border border-[#141414]"
    >
      <span>Deploy Reference</span>
      <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
    </button>
  );
}`,
  },
  {
    id: "comp-5",
    slug: "segmented-toggle",
    title: "Segmented Filter Toggle",
    description: "Zero-shadow segmented toggle with pill container and smooth active indicator highlight.",
    category: "buttons",
    tier: "free",
    cliCommand: "npx weblocks add segmented-toggle",
    dependencies: ["clsx"],
    tags: ["segmented", "toggle", "pill", "filter"],
    props: [
      { name: "options", type: "string[]", default: "['Screens', 'Flows', 'UI Kits']", description: "Option titles" },
      { name: "value", type: "string", description: "Selected option" },
      { name: "onChange", type: "(val: string) => void", description: "Selection change handler" },
    ],
    code: `"use client";

import React, { useState } from "react";

const OPTIONS = ["Screens", "Flows", "UI Kits", "Tokens"];

export function SegmentedToggle() {
  const [selected, setSelected] = useState("Screens");

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-[#f0f0f0] border border-hairline-soft">
      {OPTIONS.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={\`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-150 \${
              isSelected
                ? "bg-white text-[#141414] border border-hairline-soft"
                : "text-[#707070] hover:text-[#141414]"
            }\`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}`,
  },
  {
    id: "comp-6",
    slug: "metrics-bento-tile",
    title: "Metrics Bento Tile",
    description: "Compact Bento metrics card with mini SVG sparkline, live counter delta badge, and muted labels.",
    category: "cards",
    tier: "pro",
    cliCommand: "npx weblocks add metrics-bento-tile",
    dependencies: ["lucide-react"],
    tags: ["card", "bento", "analytics", "sparkline"],
    props: [
      { name: "title", type: "string", default: "Active references", description: "Tile metric label" },
      { name: "value", type: "string", default: "24,890", description: "Primary metric display value" },
      { name: "delta", type: "string", default: "+14.2%", description: "Percentage growth badge" },
    ],
    code: `"use client";

import React from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";

export function MetricsBentoTile() {
  return (
    <div className="w-full max-w-sm p-5 rounded-2xl bg-[#ffffff] border border-hairline-soft flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#707070]">
          Verified Screens
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] text-[11px] font-bold">
          <TrendingUp className="w-3 h-3 text-[#0066ff]" />
          +18.4%
        </span>
      </div>

      <div>
        <div className="text-3xl font-bold tracking-tight text-[#141414]">32,490</div>
        <p className="text-xs text-[#707070] mt-0.5">Updated every 24 hours.</p>
      </div>

      {/* Mini SVG Sparkline */}
      <div className="h-10 w-full pt-2 border-t border-[#f0f0f0] flex items-end justify-between gap-1">
        {[40, 55, 35, 60, 75, 65, 85, 95, 80, 100].map((val, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-sm bg-[#141414] transition-all hover:bg-[#0066ff]"
            style={{ height: \`\${val}%\` }}
          />
        ))}
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-7",
    slug: "squircle-product-card",
    title: "Squircle Product Card",
    description: "Product preview card featuring a 30% border radius squircle app icon, category pills, and quick save action.",
    category: "cards",
    tier: "free",
    cliCommand: "npx weblocks add squircle-product-card",
    dependencies: ["lucide-react"],
    tags: ["card", "squircle", "product", "save"],
    props: [
      { name: "title", type: "string", default: "Linear Mobile", description: "Application name" },
      { name: "category", type: "string", default: "Productivity", description: "Category taxonomy" },
      { name: "screensCount", type: "number", default: 42, description: "Total referenced screens" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { Bookmark, Sparkles } from "lucide-react";

export function SquircleProductCard() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="w-full max-w-sm p-4 rounded-2xl bg-white border border-hairline-soft flex items-center justify-between gap-3 group">
      <div className="flex items-center gap-3">
        {/* 30% Squircle Icon */}
        <div className="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center font-bold text-base shrink-0">
          L
        </div>
        <div>
          <h4 className="text-sm font-bold tracking-tight text-[#141414] group-hover:underline">
            Linear Mobile
          </h4>
          <p className="text-xs text-[#707070]">Issue tracking and cycles.</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="px-2 py-0.5 rounded-full bg-[#f0f0f0] text-[10px] font-semibold text-[#141414]">
              Productivity
            </span>
            <span className="text-[10px] text-[#707070]">42 screens</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setSaved(!saved)}
        className={\`w-8 h-8 rounded-full flex items-center justify-center transition-colors \${
          saved ? "bg-[#141414] text-white" : "bg-[#f3f3f3] text-[#707070] hover:text-[#141414]"
        }\`}
        aria-label="Save app"
      >
        <Bookmark className={\`w-3.5 h-3.5 \${saved ? "fill-current" : ""}\`} />
      </button>
    </div>
  );
}`,
  },
  {
    id: "comp-8",
    slug: "testimonial-ticker",
    title: "Testimonial Ticker",
    description: "Minimalist feedback quote tile with squircle avatar, star ratings, and verified badge.",
    category: "cards",
    tier: "free",
    cliCommand: "npx weblocks add testimonial-ticker",
    dependencies: ["lucide-react"],
    tags: ["testimonial", "quote", "card", "review"],
    props: [
      { name: "quote", type: "string", description: "Customer statement" },
      { name: "author", type: "string", description: "Person name" },
      { name: "role", type: "string", description: "Design title / company" },
    ],
    code: `"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

export function TestimonialTicker() {
  return (
    <div className="w-full max-w-md p-5 rounded-2xl bg-white border border-hairline-soft flex flex-col gap-3">
      <div className="flex items-center gap-1 text-[#141414]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#141414]" />
        ))}
      </div>

      <p className="text-xs leading-relaxed text-[#141414] font-medium">
        "Weblocks completely replaced our chaotic Figma moodboards. The exact screen breakdowns save our design team hours every week."
      </p>

      <div className="flex items-center gap-2.5 pt-2 border-t border-[#f0f0f0]">
        <div className="w-7 h-7 rounded-[30%] bg-[#141414] text-white flex items-center justify-center text-xs font-bold">
          E
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-[#141414]">Elena Rostova</span>
            <CheckCircle2 className="w-3 h-3 text-[#0066ff]" />
          </div>
          <span className="text-[10px] text-[#707070]">Lead Product Designer, Vercel</span>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-9",
    slug: "command-search-input",
    title: "Command Search Input",
    description: "Borderless search bar with keyboard shortcut pill, search icon, clear button, and focus ring.",
    category: "inputs",
    tier: "free",
    cliCommand: "npx weblocks add command-search-input",
    dependencies: ["lucide-react"],
    tags: ["search", "input", "cmd-k", "filter"],
    props: [
      { name: "placeholder", type: "string", default: "Search UI references...", description: "Input placeholder" },
      { name: "onSearch", type: "(query: string) => void", description: "Query change handler" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

export function CommandSearchInput() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex items-center w-full max-w-md px-3.5 py-2 rounded-full bg-[#f0f0f0] border border-hairline-soft focus-within:border-[#141414] transition-colors">
      <Search className="w-4 h-4 text-[#707070] shrink-0 mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search components or patterns..."
        className="w-full bg-transparent text-xs font-medium text-[#141414] placeholder-[#707070] outline-none"
      />
      {query ? (
        <button onClick={() => setQuery("")} className="text-[#707070] hover:text-[#141414]">
          <X className="w-3.5 h-3.5" />
        </button>
      ) : (
        <span className="px-1.5 py-0.5 rounded-full bg-white border border-hairline-soft text-[10px] font-mono font-semibold text-[#707070]">
          ⌘K
        </span>
      )}
    </div>
  );
}`,
  },
  {
    id: "comp-10",
    slug: "otp-verification-input",
    title: "OTP Verification Input",
    description: "6-cell numeric one-time passcode verification field with auto-focus advance, backspace navigation, and paste support.",
    category: "inputs",
    tier: "pro",
    cliCommand: "npx weblocks add otp-verification-input",
    dependencies: ["lucide-react"],
    tags: ["otp", "pin", "verification", "input"],
    props: [
      { name: "length", type: "number", default: "6", description: "Number of pin digits" },
      { name: "onComplete", type: "(code: string) => void", description: "Callback when all digits are populated" },
    ],
    code: `"use client";

import React, { useState, useRef } from "react";

export function OTPVerificationInput() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...digits];
    next[index] = val;
    setDigits(next);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className="w-10 h-12 rounded-xl text-center text-sm font-mono font-bold bg-[#f0f0f0] border border-hairline-soft text-[#141414] focus:bg-white focus:border-[#141414] outline-none transition-colors"
        />
      ))}
    </div>
  );
}`,
  },
  {
    id: "comp-11",
    slug: "bottom-action-sheet",
    title: "Bottom Action Sheet",
    description: "Mobile-first spring drawer sheet with drag pill handle, action buttons, and click-outside dismiss.",
    category: "modals",
    tier: "pro",
    cliCommand: "npx weblocks add bottom-action-sheet",
    dependencies: ["lucide-react"],
    tags: ["sheet", "drawer", "modal", "mobile"],
    props: [
      { name: "open", type: "boolean", description: "Drawer open state" },
      { name: "onClose", type: "() => void", description: "Dismiss callback" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { X, Share2, Copy, Download, Trash2 } from "lucide-react";

export function BottomActionSheet() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-full bg-[#141414] text-white text-xs font-semibold"
      >
        Open Action Sheet
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-hairline-soft flex flex-col gap-3">
            <div className="w-10 h-1 rounded-full bg-[#e0e0e0] mx-auto mb-1" />
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#141414]">Reference Actions</h3>
              <button onClick={() => setOpen(false)} className="text-[#707070] hover:text-[#141414]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-full text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3]"
              >
                <Share2 className="w-3.5 h-3.5 text-[#707070]" /> Share Link
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-full text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3]"
              >
                <Copy className="w-3.5 h-3.5 text-[#707070]" /> Copy Figma Tokens
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-full text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3]"
              >
                <Download className="w-3.5 h-3.5 text-[#707070]" /> Export High-Res PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`,
  },
  {
    id: "comp-12",
    slug: "spotlight-dialog",
    title: "Spotlight Dialog",
    description: "Clean modal dialog with high-focus typography, confirm/cancel pill actions, and keyboard dismiss.",
    category: "modals",
    tier: "free",
    cliCommand: "npx weblocks add spotlight-dialog",
    dependencies: ["lucide-react"],
    tags: ["dialog", "modal", "spotlight", "confirm"],
    props: [
      { name: "title", type: "string", default: "Confirm deletion", description: "Modal title" },
      { name: "onConfirm", type: "() => void", description: "Confirm callback" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { AlertCircle, X } from "lucide-react";

export function SpotlightDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-full border border-hairline-soft bg-white text-[#141414] text-xs font-semibold hover:bg-[#f3f3f3]"
      >
        Trigger Dialog
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-hairline-soft p-6 flex flex-col gap-4">
            <div className="w-8 h-8 rounded-full bg-[#f0f0f0] flex items-center justify-center text-[#141414]">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#141414]">Delete collection?</h3>
              <p className="text-xs text-[#707070] mt-1">
                This will permanently remove 14 saved references. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#f0f0f0]">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#707070] hover:text-[#141414]"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 rounded-full bg-[#141414] text-white text-xs font-semibold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`,
  },
  {
    id: "comp-13",
    slug: "audio-lyrics-scrubber",
    title: "Audio Lyrics Scrubber",
    description: "Interactive synced lyrics player inspired by Apple Music and Skiper UI with active syllable highlight and scrub time slider.",
    category: "effects",
    tier: "pro",
    cliCommand: "npx weblocks add audio-lyrics-scrubber",
    dependencies: ["lucide-react"],
    tags: ["audio", "lyrics", "scrubber", "player", "interactive"],
    props: [
      { name: "lines", type: "Array<{ time: number; text: string }>", description: "Time-coded lyrics array" },
      { name: "duration", type: "number", default: "24", description: "Audio duration in seconds" },
    ],
    code: `"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const LYRICS = [
  { time: 0, text: "Designing systems that endure the noise." },
  { time: 4, text: "Zero drop shadows, clear hairlines, pure intent." },
  { time: 8, text: "Form strictly follows the rhythm of thought." },
  { time: 13, text: "Ink and canvas dancing in perfect harmony." },
  { time: 18, text: "Every pixel placed with deliberate precision." },
];

export function AudioLyricsScrubber() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 22) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-md p-5 rounded-2xl bg-[#141414] text-white border border-[#262626] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066ff]">
            Synced Scrubber
          </span>
          <h4 className="text-sm font-bold text-white">Design Symphony No. 4</h4>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-white text-[#141414] flex items-center justify-center font-bold"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
            className="w-8 h-8 rounded-full bg-[#262626] text-white flex items-center justify-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lyrics Stack */}
      <div className="flex flex-col gap-2 py-2">
        {LYRICS.map((line, idx) => {
          const isActive =
            currentTime >= line.time &&
            (idx === LYRICS.length - 1 || currentTime < LYRICS[idx + 1].time);
          const isPassed = currentTime > line.time;

          return (
            <div
              key={idx}
              onClick={() => setCurrentTime(line.time)}
              className={\`cursor-pointer text-xs font-semibold transition-all duration-300 \${
                isActive
                  ? "text-white text-sm font-bold translate-x-1"
                  : isPassed
                  ? "text-[#707070]"
                  : "text-[#404040]"
              }\`}
            >
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Time Scrubber */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#262626]">
        <span className="text-[10px] font-mono text-[#adadad]">0:0{currentTime}</span>
        <input
          type="range"
          min={0}
          max={22}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="w-full accent-[#0066ff] h-1 bg-[#262626] rounded-full appearance-none cursor-pointer"
        />
        <span className="text-[10px] font-mono text-[#adadad]">0:22</span>
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-14",
    slug: "stat-counter-ticker",
    title: "Stat Counter Ticker",
    description: "Interactive animated counter with live increment and decrement step triggers, progress bar, and percentage computation.",
    category: "effects",
    tier: "free",
    cliCommand: "npx weblocks add stat-counter-ticker",
    dependencies: ["lucide-react"],
    tags: ["counter", "stat", "ticker", "animation"],
    props: [
      { name: "initialValue", type: "number", default: "128", description: "Starting count" },
      { name: "goal", type: "number", default: "200", description: "Target goal for progress bar" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";

export function StatCounterTicker() {
  const [count, setCount] = useState(142);
  const target = 200;
  const percentage = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="w-full max-w-xs p-5 rounded-2xl bg-white border border-hairline-soft flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#707070]">Goal Completion</span>
        <span className="text-xs font-bold text-[#141414]">{percentage}%</span>
      </div>

      <div className="flex items-center justify-between py-2">
        <button
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="w-8 h-8 rounded-full bg-[#f0f0f0] text-[#141414] flex items-center justify-center font-bold hover:bg-[#e0e0e0]"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="text-3xl font-bold font-mono text-[#141414] tracking-tight">
          {count}
        </span>

        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-8 h-8 rounded-full bg-[#141414] text-white flex items-center justify-center font-bold hover:bg-[#262626]"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress track */}
      <div className="w-full h-1.5 rounded-full bg-[#f0f0f0] overflow-hidden">
        <div
          className="h-full bg-[#141414] transition-all duration-200"
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-15",
    slug: "live-transcribe",
    title: "Live Transcribe",
    description: "Real-time voice-to-text transcription card with dynamic streaming text, language badge, and audio record control adapted for Weblocks.",
    category: "effects",
    tier: "free",
    cliCommand: "npx weblocks add live-transcribe",
    dependencies: ["lucide-react"],
    tags: ["transcribe", "voice", "audio", "speech-to-text", "media", "ai", "streaming"],
    props: [
      { name: "initialLanguage", type: "string", default: "English", description: "Default transcription language" },
      { name: "autoStart", type: "boolean", default: "true", description: "Whether to start streaming on mount" },
      { name: "onToggle", type: "(isRecording: boolean) => void", description: "Callback when record/stop button is clicked" },
    ],
    code: `"use client";

import React, { useState, useEffect } from "react";

export function LiveTranscribe({
  initialLanguage = "English",
  autoStart = true,
  onToggle,
}: {
  initialLanguage?: string;
  autoStart?: boolean;
  onToggle?: (isRecording: boolean) => void;
}) {
  const [isRecording, setIsRecording] = useState(autoStart);
  const [language, setLanguage] = useState(initialLanguage);
  const [wordIndex, setWordIndex] = useState(6);
  const [sentenceIdx, setSentenceIdx] = useState(0);

  const sentences = [
    "Weblocks is a way to view design inspiration at a glance—today's screen references, navigation pills, bento grids, design tokens, and components in real time.",
    "Transform curated mobile references into production React code—instant token export, zero drop shadows, tight hairline borders, and fluid responsive layouts.",
  ];

  const words = sentences[sentenceIdx].split(" ");

  useEffect(() => {
    if (!isRecording) return;

    const timer = setInterval(() => {
      setWordIndex((prev) => {
        if (prev >= words.length) {
          setTimeout(() => {
            setSentenceIdx((s) => (s + 1) % sentences.length);
            setWordIndex(4);
          }, 2000);
          return words.length;
        }
        return prev + 1;
      });
    }, 280);

    return () => clearInterval(timer);
  }, [isRecording, words.length, sentences.length]);

  const committedWords = words.slice(0, Math.max(0, wordIndex - 3)).join(" ");
  const activeWords = words.slice(Math.max(0, wordIndex - 3), wordIndex).join(" ");

  const languages = ["English", "Design Spec", "TypeScript"];
  const handleToggleLang = () => {
    setLanguage((prev) => {
      const idx = languages.indexOf(prev);
      return languages[(idx + 1) % languages.length];
    });
  };

  const handleToggleRecording = () => {
    const next = !isRecording;
    setIsRecording(next);
    onToggle?.(next);
  };

  return (
    <div className="w-full max-w-sm rounded-3xl bg-[#1c1c1e] text-white p-5 border border-[#2c2c2e] flex flex-col justify-between gap-5 select-none transition-all duration-200">
      {/* Real-time speech transcript */}
      <div className="min-h-[76px] text-xs sm:text-[13px] leading-relaxed font-medium">
        <span className="text-[#8e8e93] transition-colors duration-200">
          {committedWords}{committedWords ? " " : ""}
        </span>
        <span className="text-white font-bold tracking-tight inline transition-all duration-150">
          {activeWords}
        </span>
        {isRecording && (
          <span className="inline-block w-1.5 h-3 ml-1 bg-[#f05a28] rounded-xs animate-pulse align-middle" />
        )}
      </div>

      {/* Bottom controls: Language Pill & Record/Stop Button */}
      <div className="flex items-center justify-between pt-1">
        {/* Language Badge */}
        <button
          type="button"
          onClick={handleToggleLang}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white/90 text-[11px] font-semibold transition-colors cursor-pointer"
          title="Toggle Language"
        >
          <svg
            className="w-3.5 h-3.5 text-white/80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 8 6 6" />
            <path d="m4 14 6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2h1" />
            <path d="m22 22-5-10-5 10" />
            <path d="M14 18h6" />
          </svg>
          <span>{language}</span>
        </button>

        {/* Record / Stop Button */}
        <button
          type="button"
          onClick={handleToggleRecording}
          className="relative w-10 h-10 rounded-full bg-[#f05a28] hover:bg-[#ff6838] flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-none"
          title={isRecording ? "Stop transcribing" : "Start transcribing"}
        >
          {isRecording && (
            <span className="absolute inset-0 rounded-full bg-[#f05a28] animate-ping opacity-30 pointer-events-none" />
          )}
          {isRecording ? (
            <span className="w-3.5 h-3.5 rounded-[2.5px] bg-[#1c1c1e]" />
          ) : (
            <span className="w-3.5 h-3.5 rounded-full bg-[#1c1c1e]" />
          )}
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-16",
    slug: "perspective-roller-picker",
    title: "Perspective Roller Picker",
    description: "3D perspective cylindrical list picker with smooth depth stacking, squircle badge icons, and fluid auto-rolling selection adapted for Weblocks.",
    category: "buttons",
    tier: "pro",
    cliCommand: "npx weblocks add perspective-roller-picker",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    tags: ["picker", "roller", "wheel", "perspective", "3d", "controls", "buttons", "selector", "stack"],
    props: [
      { name: "items", type: "Array<{ id: string; label: string; color: string; icon: React.ComponentType }>", description: "List of options with labels, colors, and icons" },
      { name: "defaultIndex", type: "number", default: "3", description: "Default centered index" },
      { name: "autoRoll", type: "boolean", default: "true", description: "Whether to continuously auto-roll through items" },
      { name: "onChange", type: "(item: any, index: number) => void", description: "Callback when active item changes" },
    ],
    code: `"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sliders,
  Sparkles,
  Layers,
  Scan,
  Share2,
  Code2,
  ShieldCheck,
} from "lucide-react";

export interface RollerItem {
  id: string;
  label: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEFAULT_ITEMS: RollerItem[] = [
  { id: "palette", label: "Design Tokens", color: "bg-[#e5a968]", icon: Sliders },
  { id: "typography", label: "Typography System", color: "bg-[#5b96f7]", icon: Sparkles },
  { id: "source", label: "Source Inspiration", color: "bg-[#d49b6a]", icon: Layers },
  { id: "screens", label: "Screen Verification", color: "bg-[#9d4edd]", icon: Scan },
  { id: "states", label: "Interactive States", color: "bg-[#64b5f6]", icon: Share2 },
  { id: "export", label: "Clean Code Export", color: "bg-[#66bb6a]", icon: Code2 },
  { id: "audit", label: "Production Audit", color: "bg-[#e57373]", icon: ShieldCheck },
];

export function PerspectiveRollerPicker({
  items = DEFAULT_ITEMS,
  defaultIndex = 3,
  autoRoll = true,
  onChange,
}: {
  items?: RollerItem[];
  defaultIndex?: number;
  autoRoll?: boolean;
  onChange?: (item: RollerItem, index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoRoll || isUserInteracting) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % items.length;
        onChange?.(items[next], next);
        return next;
      });
    }, 2400);

    return () => clearInterval(timer);
  }, [autoRoll, isUserInteracting, items, onChange]);

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    onChange?.(items[idx], idx);
    setIsUserInteracting(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3500);
  };

  const n = items.length;

  return (
    <div className="relative w-full h-[210px] flex items-center justify-center overflow-hidden select-none">
      <div
        className="relative w-64 sm:w-72 h-full flex items-center justify-center"
        style={{ perspective: "800px" }}
      >
        {items.map((item, idx) => {
          let diff = idx - activeIndex;
          while (diff > n / 2) diff -= n;
          while (diff < -n / 2) diff += n;

          if (Math.abs(diff) > 3) return null;

          const isCenter = diff === 0;
          const translateY = diff * 36;
          const scale = 1 - Math.abs(diff) * 0.08;
          const opacity = Math.max(0.15, 1 - Math.abs(diff) * 0.28);
          const zIndex = 20 - Math.abs(diff) * 5;
          const rotateX = -diff * 12;

          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => handleSelect(idx)}
              style={{
                transform: \`translateY(\${translateY}px) scale(\${scale}) rotateX(\${rotateX}deg)\`,
                opacity,
                zIndex,
              }}
              className={\`absolute left-0 right-0 h-12 rounded-2xl flex items-center gap-3 px-3.5 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer \${
                isCenter
                  ? "bg-white border border-hairline-soft"
                  : "bg-white/80 hover:bg-white border border-transparent"
              }\`}
            >
              <div
                className={\`w-7 h-7 rounded-xl \${item.color} text-white flex items-center justify-center shrink-0 transition-transform \${
                  isCenter ? "scale-105" : "scale-95 opacity-90"
                }\`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              <span
                className={\`text-xs sm:text-sm tracking-tight truncate transition-colors \${
                  isCenter ? "font-bold text-ink" : "font-medium text-[#707070]"
                }\`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-17",
    slug: "spotlight-directory-card",
    title: "Spotlight Directory Card",
    description: "Team member directory card featuring a prominent elevated focus card, progressive defocus backdrop list, and interactive expand control adapted for Weblocks.",
    category: "cards",
    tier: "free",
    cliCommand: "npx weblocks add spotlight-directory-card",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    tags: ["directory", "team", "members", "blur", "cards", "bento", "spotlight", "frosted"],
    props: [
      { name: "members", type: "Array<{ id: string; name: string; role: string; avatar: string; initials: string }>", description: "List of team member profiles" },
      { name: "defaultExpanded", type: "boolean", default: "false", description: "Whether the directory list starts expanded" },
      { name: "onMessage", type: "(member: any) => void", description: "Callback when the direct message action is triggered" },
    ],
    code: `"use client";

import React, { useState, useEffect } from "react";
import { Mail, BellOff, ChevronDown } from "lucide-react";

export interface MemberProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  initials: string;
}

const DEFAULT_MEMBERS: MemberProfile[] = [
  {
    id: "phil",
    name: "Phil Foster",
    role: "UI DESIGNER AT @GRIDSTUDIO.DESIGN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    initials: "PF",
  },
  {
    id: "elena",
    name: "Elena Rostova",
    role: "DESIGN SYSTEMS LEAD AT @WEBLOCKS",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    initials: "ER",
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    role: "SYSTEMS ARCHITECT AT @LINEAR.APP",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    initials: "MV",
  },
  {
    id: "sarah",
    name: "Sarah Chen",
    role: "PRINCIPAL ENGINEER AT @STRIPE.ATLAS",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    initials: "SC",
  },
  {
    id: "liam",
    name: "Liam Davies",
    role: "FRONTEND LEAD AT @VERCEL.COM",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    initials: "LD",
  },
];

export function SpotlightDirectoryCard({
  members = DEFAULT_MEMBERS,
  defaultExpanded = false,
  onMessage,
}: {
  members?: MemberProfile[];
  defaultExpanded?: boolean;
  onMessage?: (member: MemberProfile) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    if (isExpanded) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % members.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isExpanded, members.length]);

  const active = members[activeIdx];
  const otherMembers = members.filter((_, idx) => idx !== activeIdx);

  return (
    <div className="relative w-full max-w-[320px] rounded-3xl bg-white border border-hairline-soft p-3 flex flex-col justify-between select-none overflow-hidden transition-all duration-300">
      {/* 1. Elevated Spotlight Featured Member Card */}
      <div className="relative z-20 w-full rounded-2xl bg-white border border-hairline-soft p-2.5 sm:p-3 flex items-center justify-between gap-2.5 shadow-none transition-all duration-200">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-hairline-soft bg-field">
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-ink select-none">
              {active.initials}
            </span>
            <img
              key={active.id}
              src={active.avatar}
              alt={active.name}
              className="relative z-10 w-full h-full aspect-square object-cover rounded-full block"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-ink tracking-tight truncate">
                {active.name}
              </h4>
              <BellOff className="w-3 h-3 text-[#adadad] shrink-0" />
              <ChevronDown className="w-3 h-3 text-[#adadad] shrink-0" />
            </div>
            <p className="text-[9px] uppercase tracking-wider text-[#707070] font-semibold truncate mt-0.5">
              {active.role}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onMessage?.(active)}
          className="w-8 h-8 rounded-xl bg-field hover:bg-canvas-soft flex items-center justify-center text-ink shrink-0 transition-colors cursor-pointer"
          title={\`Message \${active.name}\`}
        >
          <Mail className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Blurred / Frosted Members List Beneath Spotlight */}
      <div
        className={\`relative flex flex-col gap-1.5 py-1.5 px-0.5 transition-all duration-300 \${
          isExpanded
            ? "filter-none opacity-100 max-h-44 overflow-y-auto"
            : "blur-[2.5px] opacity-35 pointer-events-none max-h-16 overflow-hidden"
        }\`}
      >
        {otherMembers.map((m) => (
          <div
            key={m.id}
            onClick={() => {
              if (isExpanded) {
                const idx = members.findIndex((x) => x.id === m.id);
                if (idx !== -1) setActiveIdx(idx);
              }
            }}
            className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-field/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-hairline-soft bg-field">
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-ink select-none">
                  {m.initials}
                </span>
                <img
                  key={m.id}
                  src={m.avatar}
                  alt={m.name}
                  className="relative z-10 w-full h-full aspect-square object-cover rounded-full block"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-ink truncate">{m.name}</div>
                <div className="text-[8px] uppercase tracking-wider text-[#707070] truncate">
                  {m.role}
                </div>
              </div>
            </div>
            <div className="w-5 h-5 rounded-lg bg-field flex items-center justify-center text-[#707070] shrink-0">
              <Mail className="w-2.5 h-2.5" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Bottom Pill Button: View more members */}
      <div className="flex items-center justify-center pt-1">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-1.5 rounded-full bg-[#141414] hover:bg-[#262626] text-white text-[11px] font-semibold tracking-tight transition-all cursor-pointer shadow-none"
        >
          {isExpanded ? "Collapse members" : "View more members"}
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-18",
    slug: "share-popover-card",
    title: "Share Popover Card",
    description: "Interactive sharing popover card featuring destination app shortcuts, granular permission selectors, quick copy link, and bottom docked toolbar controls adapted for Weblocks.",
    category: "cards",
    tier: "free",
    cliCommand: "npx weblocks add share-popover-card",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    tags: ["share", "popover", "dock", "toolbar", "cards", "bento", "social", "permissions"],
    props: [
      { name: "defaultOpen", type: "boolean", default: "true", description: "Whether the popover starts in an open state" },
      { name: "shareUrl", type: "string", default: '"https://weblocks.dev/ref/screen-729"', description: "The resource URL to copy and share" },
      { name: "onShare", type: "(destination: string) => void", description: "Callback when a destination is selected" },
      { name: "onCopy", type: "(url: string) => void", description: "Callback when the link is copied" },
    ],
    code: `"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Trash2,
  Share2,
  Users,
  Bookmark,
  MoreHorizontal,
  ArrowUpRight,
  ChevronDown,
  Check,
} from "lucide-react";

export interface ShareDestination {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const DEFAULT_DESTINATIONS: ShareDestination[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: (
      <svg className="w-3.5 h-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.92 0-1.67.75-1.67 1.67 0 .91.75 1.66 1.67 1.66s1.67-.75 1.67-1.66c0-.92-.75-1.67-1.67-1.67Z" />
      </svg>
    ),
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: (
      <svg className="w-3.5 h-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: (
      <svg className="w-3.5 h-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 0 1-5.82 2.41h-.01c-1.42 0-2.82-.37-4.05-1.08l-.29-.17-3.11.82.83-3.03-.19-.3a8.21 8.21 0 0 1-1.26-4.48c0-4.55 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
      </svg>
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: (
      <svg className="w-3.5 h-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: (
      <svg className="w-3.5 h-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.93-1.28 4.88-2.12 5.86-2.54 2.79-1.16 3.37-1.36 3.75-1.36.08 0 .28.02.4.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
  },
];

export function SharePopoverCard({
  defaultOpen = true,
  shareUrl = "https://weblocks.dev/ref/screen-729",
  onShare,
  onCopy,
}: {
  defaultOpen?: boolean;
  shareUrl?: string;
  onShare?: (dest: string) => void;
  onCopy?: (url: string) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [permissionIdx, setPermissionIdx] = useState(0);
  const [accessIdx, setAccessIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const permissions = ["Anyone with this link", "Team members only", "Weblocks community"];
  const accessLevels = ["can view", "can inspect", "can copy code"];

  useEffect(() => {
    if (isHovered || !isOpen) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % DEFAULT_DESTINATIONS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isHovered, isOpen]);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    onCopy?.(shareUrl);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-[320px] flex flex-col items-center select-none py-2">
      {/* 1. Popover Card with Pointer Beak */}
      <div
        className={\`w-full transition-all duration-300 transform origin-bottom \${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 mb-3"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none mb-0 h-0 overflow-hidden"
        }\`}
      >
        <div className="relative w-full rounded-[24px] bg-white border border-hairline-soft p-2.5 shadow-none">
          {/* Destination List */}
          <div
            className="flex flex-col gap-0.5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {DEFAULT_DESTINATIONS.map((dest, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={dest.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={\`flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-150 cursor-pointer \${
                    isActive ? "bg-[#ebebed]" : "bg-transparent hover:bg-[#f5f5f7]"
                  }\`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-4 h-4 flex items-center justify-center shrink-0 text-ink">
                      {dest.icon}
                    </div>
                    <span className="text-xs font-medium text-ink tracking-tight">
                      {dest.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      className={\`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer \${
                        isActive
                          ? "bg-[#141414] text-white hover:bg-[#262626] scale-105"
                          : "bg-[#f0f0f2] text-[#8e8e93] hover:bg-[#e4e4e7] hover:text-ink"
                      }\`}
                      title={\`Options for \${dest.name}\`}
                    >
                      <MoreHorizontal className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShare?.(dest.name);
                      }}
                      className={\`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer \${
                        isActive
                          ? "bg-[#141414] text-white hover:bg-[#262626] scale-105"
                          : "bg-[#f0f0f2] text-[#8e8e93] hover:bg-[#e4e4e7] hover:text-ink"
                      }\`}
                      title={\`Share to \${dest.name}\`}
                    >
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Popover Footer: Permissions & Copy Link */}
          <div className="flex items-center justify-between gap-1 pt-2.5 mt-1 border-t border-hairline-soft/60 px-1 text-[10px] text-[#707070]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPermissionIdx((prev) => (prev + 1) % permissions.length);
              }}
              className="flex items-center gap-0.5 hover:text-ink transition-colors cursor-pointer truncate max-w-[90px]"
            >
              <span className="truncate">{permissions[permissionIdx]}</span>
              <ChevronDown className="w-2.5 h-2.5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setAccessIdx((prev) => (prev + 1) % accessLevels.length);
              }}
              className="flex items-center gap-0.5 hover:text-ink transition-colors cursor-pointer shrink-0"
            >
              <span>{accessLevels[accessIdx]}</span>
              <ChevronDown className="w-2.5 h-2.5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className={\`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer shadow-none shrink-0 \${
                copied
                  ? "bg-[#141414] text-white"
                  : "bg-[#e8e8ea] text-ink hover:bg-[#141414] hover:text-white"
              }\`}
            >
              {copied ? (
                <>
                  <Check className="w-2.5 h-2.5" />
                  <span>copied</span>
                </>
              ) : (
                <span>copy link</span>
              )}
            </button>
          </div>

          {/* Speech bubble pointer beak */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r border-b border-hairline-soft rotate-45 z-10" />
        </div>
      </div>

      {/* 2. Floating Dock Toolbar at Bottom */}
      <div className="relative z-20 flex items-center justify-between w-full max-w-[280px] px-3.5 py-1.5 rounded-full bg-[#f2f2f4] border border-hairline-soft shadow-none">
        <button
          type="button"
          className="p-1.5 text-[#707070] hover:text-ink transition-colors cursor-pointer"
          title="Send reference"
        >
          <Send className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          className="p-1.5 text-[#707070] hover:text-ink transition-colors cursor-pointer"
          title="Archive reference"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        {/* Center Share Pill Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={\`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight transition-all cursor-pointer \${
            isOpen
              ? "bg-white text-ink border border-hairline-soft shadow-none scale-105"
              : "bg-transparent text-[#707070] hover:text-ink hover:bg-white/60"
          }\`}
          title="Toggle share popover"
        >
          <span>share</span>
          <Share2 className="w-3 h-3" />
        </button>

        <button
          type="button"
          className="p-1.5 text-[#707070] hover:text-ink transition-colors cursor-pointer"
          title="Team collaborators"
        >
          <Users className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          className="p-1.5 text-[#707070] hover:text-ink transition-colors cursor-pointer"
          title="Bookmark reference"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-19",
    slug: "parameter-slider-sheet",
    title: "Parameter Slider Sheet",
    description: "Floating action toolbar with integrated parameter popover sheet, featuring a calibrated capsule slider with graduated tick ruler.",
    category: "modals",
    tier: "free",
    cliCommand: "npx weblocks add parameter-slider-sheet",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    tags: ["modals", "sheets", "popover", "slider", "toolbar", "controls"],
    props: [
      { name: "label", type: "string", default: "Intensity", description: "Parameter title label displayed above the slider" },
      { name: "value", type: "number", default: 50, description: "Current numerical value (0 to 100)" },
      { name: "min", type: "number", default: 0, description: "Minimum slider value" },
      { name: "max", type: "number", default: 100, description: "Maximum slider value" },
      { name: "onChange", type: "(value: number) => void", description: "Callback triggered on slider value changes" },
      { name: "onAdd", type: "() => void", description: "Callback triggered when clicking the + Add button" },
    ],
    code: `"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown } from "lucide-react";

interface ParameterSliderSheetProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (val: number) => void;
  onAdd?: () => void;
  defaultOpen?: boolean;
}

export function ParameterSliderSheet({
  label = "Intensity",
  value: controlledValue,
  min = 0,
  max = 100,
  onChange,
  onAdd,
  defaultOpen = true,
}: ParameterSliderSheetProps) {
  const [internalValue, setInternalValue] = useState(50);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const updateFromPointer = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const nextVal = Math.round(min + ratio * (max - min));
    setInternalValue(nextVal);
    onChange?.(nextVal);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updateFromPointer(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      updateFromPointer(e.clientX);
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [min, max]);

  const percentage = Math.max(0, Math.min(100, ((currentValue - min) / (max - min)) * 100));

  // 36 graduated tick marks
  const totalTicks = 36;

  return (
    <div className="relative w-full max-w-[340px] flex flex-col items-center select-none font-sans">
      {/* 1. Top Control Bar */}
      <div className="flex items-center gap-2 w-full justify-center mb-3">
        {/* + Add Button */}
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white dark:bg-[#161718] border border-hairline-soft dark:border-[#23252a] text-xs font-semibold text-ink hover:bg-field dark:hover:bg-[#23252a] transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 text-muted" />
          <span>Add</span>
        </button>

        {/* Consolidated Pill Toolbar */}
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white dark:bg-[#161718] border border-hairline-soft dark:border-[#23252a] shadow-xs">
          {/* Type / Grid Item */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-ink hover:text-ink transition-colors cursor-pointer"
          >
            {/* Waffle 9-dot Icon */}
            <svg className="w-3.5 h-3.5 text-muted shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="7" cy="7" r="1.2" />
              <circle cx="12" cy="7" r="1.2" />
              <circle cx="17" cy="7" r="1.2" />
              <circle cx="7" cy="12" r="1.2" />
              <circle cx="12" cy="12" r="1.2" />
              <circle cx="17" cy="12" r="1.2" />
              <circle cx="7" cy="17" r="1.2" />
              <circle cx="12" cy="17" r="1.2" />
              <circle cx="17" cy="17" r="1.2" />
            </svg>
            <span>Type</span>
          </button>

          {/* Active Parameter Value Dropdown Pill */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={\`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer \${
              isOpen
                ? "bg-[#ebecee] dark:bg-[#23252a] text-ink"
                : "hover:bg-[#f2f3f5] dark:hover:bg-[#1d1f24] text-muted hover:text-ink"
            }\`}
          >
            <span className="font-mono text-xs">{currentValue}</span>
            <ChevronDown className={\`w-3 h-3 text-muted transition-transform duration-200 \${isOpen ? "rotate-180" : ""}\`} />
          </button>

          {/* Divider */}
          <div className="w-[1px] h-3.5 bg-hairline-soft dark:bg-[#23252a] mx-0.5" />

          {/* 3-Dots Options Button */}
          <button
            type="button"
            className="p-1 rounded-lg text-muted hover:text-ink transition-colors cursor-pointer"
            title="Options"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Floating Parameter Sheet / Popover Card */}
      <div
        className={\`w-full transition-all duration-300 origin-top \${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none h-0 overflow-hidden"
        }\`}
      >
        <div className="w-full rounded-[22px] bg-white dark:bg-[#161718] border border-hairline-soft dark:border-[#23252a] p-4 flex flex-col gap-3 shadow-xs">
          {/* Header Label */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ink tracking-tight">{label}</span>
            <span className="text-[10px] font-mono text-muted font-medium">{currentValue}%</span>
          </div>

          {/* Capsule Slider Track */}
          <div
            ref={sliderRef}
            onPointerDown={handlePointerDown}
            className="relative w-full h-6 rounded-full bg-[#f0f1f3] dark:bg-[#0f1011] overflow-hidden cursor-pointer select-none border border-transparent dark:border-[#23252a] touch-none"
          >
            {/* Active Blue Gradient Progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#93c5fd] via-[#60a5fa] to-[#38bdf8] dark:from-[#2563eb] dark:via-[#3b82f6] dark:to-[#60a5fa] transition-[width] duration-75 rounded-full"
              style={{ width: \`\${percentage}%\` }}
            >
              {/* End Indicator Line Thumb */}
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#0066ff] dark:bg-white rounded-xs" />
            </div>
          </div>

          {/* Graduated Tick Ruler */}
          <div className="flex items-center justify-between gap-1.5 px-0.5 text-[10px] text-muted select-none">
            <span className="font-medium text-[10px]">Low</span>

            {/* Micro Tick Notches */}
            <div className="flex-1 flex items-center justify-between px-2 h-3">
              {Array.from({ length: totalTicks }).map((_, i) => {
                const isMajor = i === 0 || i === Math.floor(totalTicks / 4) || i === Math.floor(totalTicks / 2) || i === Math.floor((totalTicks * 3) / 4) || i === totalTicks - 1;
                return (
                  <span
                    key={i}
                    className={\`w-[1px] rounded-full transition-colors \${
                      isMajor
                        ? "h-2.5 bg-muted/60 dark:bg-gray-500"
                        : "h-1.5 bg-hairline dark:bg-[#23252a]"
                    }\`}
                  />
                );
              })}
            </div>

            <span className="font-medium text-[10px]">High</span>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-20",
    slug: "file-upload-progress",
    title: "File Upload Progress Pill",
    description: "Compact floating transfer status pill card featuring a file badge, smooth progress track, real-time percentage, and transferred byte counter adapted for Weblocks.",
    category: "cards",
    tier: "free",
    cliCommand: "npx weblocks add file-upload-progress",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    tags: ["cards", "bento", "upload", "progress", "toast", "file", "download", "status"],
    props: [
      { name: "fileName", type: "string", default: '"weblocks-design-system.pdf"', description: "Target document or file name displayed on card" },
      { name: "fileSize", type: "number", default: 12.6, description: "Total file size in Megabytes (MB)" },
      { name: "progress", type: "number", default: 62, description: "Current transfer completion percentage (0-100)" },
      { name: "fileExtension", type: "string", default: '"PDF"', description: "Document badge type indicator" },
      { name: "status", type: '"uploading" | "paused" | "completed" | "error"', default: '"uploading"', description: "Current transfer state" },
      { name: "onPauseToggle", type: "(isPaused: boolean) => void", description: "Callback when pause or resume is toggled" },
      { name: "onCancel", type: "() => void", description: "Callback when file transfer is cancelled" },
    ],
    code: `"use client";

import React, { useState } from "react";

export interface FileUploadProgressProps {
  fileName?: string;
  fileSize?: number;
  progress?: number;
  fileExtension?: string;
  status?: "uploading" | "paused" | "completed" | "error";
  onPauseToggle?: (isPaused: boolean) => void;
  onCancel?: () => void;
}

export function FileUploadProgress({
  fileName = "weblocks-design-system.pdf",
  fileSize = 12.6,
  progress: controlledProgress,
  fileExtension = "PDF",
  status = "uploading",
  onPauseToggle,
  onCancel,
}: FileUploadProgressProps) {
  const [internalProgress, setInternalProgress] = useState(62);
  const [isPaused, setIsPaused] = useState(status === "paused");

  const currentProgress = controlledProgress !== undefined ? controlledProgress : internalProgress;
  const isComplete = currentProgress >= 100;
  const currentMB = ((fileSize * Math.min(100, currentProgress)) / 100).toFixed(1);

  const handleTogglePause = () => {
    const next = !isPaused;
    setIsPaused(next);
    onPauseToggle?.(next);
  };

  return (
    <div className="relative inline-flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white dark:bg-[#161718] border border-black/[0.06] dark:border-[#23252a] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)] w-full max-w-[360px] transition-all select-none">
      {/* 1. Folded Paper File Badge with Extension Label */}
      <div className="relative w-9 h-11 shrink-0 rounded-md bg-[#f1f2f4] dark:bg-[#202226] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-center overflow-hidden">
        {/* Folded Top-Right Corner */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#e2e4e8] dark:bg-[#2c2f36] rounded-bl-[2px]" />
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-t-white dark:border-t-[#161718] border-l-[12px] border-l-transparent pointer-events-none" />

        {/* Extension Pill Badge (e.g. PDF) */}
        <div className="absolute bottom-1.5 left-1.5 px-1 py-0.5 rounded-[3px] bg-[#f04438] text-white text-[8px] font-bold uppercase tracking-wider leading-none shadow-xs">
          {fileExtension}
        </div>
      </div>

      {/* 2. File Information & Progress Track */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        {/* Header: Filename & Percentage */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-medium text-[#1c1c1e] dark:text-[#f3f4f6] truncate leading-tight">
            {fileName}
          </span>
          <span className="text-[12px] font-medium text-[#8e8e93] dark:text-[#a1a1aa] tabular-nums shrink-0">
            {isComplete ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100%</span>
            ) : (
              \`\${Math.round(currentProgress)}%\`
            )}
          </span>
        </div>

        {/* Horizontal Progress Track */}
        <div className="w-full h-1.5 bg-[#eceef1] dark:bg-[#27272a] rounded-full overflow-hidden">
          <div
            className={\`h-full rounded-full transition-all duration-300 ease-out \${
              isComplete
                ? "bg-emerald-500"
                : "bg-[#f04438]"
            }\`}
            style={{ width: \`\${Math.min(100, Math.max(0, currentProgress))}%\` }}
          />
        </div>

        {/* Subtitle: Uploaded Size of Total */}
        <div className="flex items-center justify-between text-[11px] text-[#8e8e93] dark:text-[#8e8e93] leading-tight">
          <span>
            {currentMB} MB of {fileSize} MB
          </span>
          {isPaused && (
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              Paused
            </span>
          )}
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-21",
    slug: "waitlist-referral-card",
    title: "Waitlist Referral Card",
    description: "Interactive waitlist and referral queue card featuring concentric radar wave graphics, interconnected user and referral slot nodes, live queue positioning, and invite progression adapted for Weblocks.",
    category: "cards",
    tier: "free",
    cliCommand: "npx weblocks add waitlist-referral-card",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    tags: ["cards", "bento", "waitlist", "referral", "queue", "nodes", "social", "radar"],
    props: [
      { name: "brand", type: "string", default: '"Weblocks"', description: "Product or ecosystem badge name" },
      { name: "userAvatar", type: "string", default: '"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"', description: "Primary account avatar URL" },
      { name: "initialJoined", type: "boolean", default: "false", description: "Whether the user starts as already on the waitlist" },
      { name: "queuePosition", type: "number", default: 142, description: "Waitlist numerical rank position" },
      { name: "totalInvites", type: "number", default: 3, description: "Total available referral slots to unlock perks" },
      { name: "onJoin", type: "() => void", description: "Callback triggered when user joins waitlist" },
      { name: "onShareInvite", type: "() => void", description: "Callback triggered when user copies invite link" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Sparkles, Copy, Users } from "lucide-react";

export interface WaitlistReferralCardProps {
  brand?: string;
  userAvatar?: string;
  initialJoined?: boolean;
  queuePosition?: number;
  totalInvites?: number;
  onJoin?: () => void;
  onShareInvite?: () => void;
}

export function WaitlistReferralCard({
  brand = "Weblocks",
  userAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  initialJoined = false,
  queuePosition = 142,
  totalInvites = 3,
  onJoin,
  onShareInvite,
}: WaitlistReferralCardProps) {
  const [isJoined, setIsJoined] = useState(initialJoined);
  const [copied, setCopied] = useState(false);
  const [invitedCount, setInvitedCount] = useState(0);

  const handleJoin = () => {
    setIsJoined(true);
    onJoin?.();
  };

  const handleCopy = () => {
    setCopied(true);
    if (invitedCount < totalInvites) {
      setInvitedCount((prev) => prev + 1);
    }
    onShareInvite?.();
    setTimeout(() => setCopied(false), 2000);
  };

  const slots = Array.from({ length: totalInvites }, (_, idx) => ({
    id: idx,
    isClaimed: isJoined && idx < invitedCount,
  }));

  return (
    <div className="flex flex-col items-center select-none font-sans">
      {/* 1. Floating Brand Capsule */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/10 text-[11px] font-medium text-ink dark:text-white/80 mb-3 shadow-xs backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>{brand} Access</span>
      </div>

      {/* 2. Main Card Container */}
      <div className="relative w-full max-w-[340px] rounded-[26px] bg-[#121316] dark:bg-[#0e0f11] text-white p-5 border border-white/10 dark:border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Background Concentric Radar Rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="70" cy="62" r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="70" cy="62" r="68" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="70" cy="62" r="102" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="70" cy="62" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="70" cy="62" r="185" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="70" cy="62" r="235" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Top Nodes Row: You -> Interconnector -> Referral Slots */}
        <div className="relative z-10 flex items-center justify-between mb-6 pt-1">
          {/* "You" Node */}
          <div className="relative flex flex-col items-center justify-center p-2 rounded-2xl bg-white/[0.06] border border-white/15 w-[66px] h-[78px] backdrop-blur-md shadow-md">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/25 bg-white/10 flex items-center justify-center mb-1 shrink-0">
              <img
                src={userAvatar}
                alt="You"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <span className="text-[10px] font-medium text-white/90">You</span>
          </div>

          {/* Connector Line */}
          <div className="relative flex-1 flex items-center justify-center px-1">
            <div className="w-full h-[1.5px] bg-gradient-to-r from-white/30 via-white/15 to-white/30 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>
          </div>

          {/* Referral Slot Cluster */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.02] border border-white/5">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-white/[0.04] border border-white/5 w-[52px] h-[72px] gap-1 transition-all"
              >
                <div
                  className={\`w-7 h-7 rounded-full flex items-center justify-center border transition-all \${
                    slot.isClaimed
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-400"
                      : "border-white/10 bg-white/[0.06] text-white/30"
                  }\`}
                >
                  {slot.isClaimed ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  )}
                </div>
                <span
                  className={\`px-1 py-0.5 rounded text-[8px] font-medium flex items-center gap-0.5 leading-none \${
                    slot.isClaimed
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-white/[0.06] text-white/40"
                  }\`}
                >
                  {slot.isClaimed ? "Joined" : "Join ✓"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Content */}
        <div className="relative z-10 flex flex-col gap-1.5 mb-5">
          <h3 className="text-[17px] font-semibold text-white tracking-tight leading-snug">
            {isJoined ? \`You're #\${queuePosition} in the waitlist\` : "You're not in the waitlist"}
          </h3>
          <p className="text-[12.5px] text-white/50 leading-relaxed max-w-[280px]">
            {isJoined
              ? "Share your referral link with teammates to jump ahead in line and unlock component packs early."
              : "You need to join the waitlist before able to see your referral point."}
          </p>
        </div>

        {/* Bottom Action Button */}
        <div className="relative z-10">
          {isJoined ? (
            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-full bg-white text-black font-semibold text-xs tracking-tight hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Referral link copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-black" />
                  <span>Copy referral link</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleJoin}
              className="w-full py-2.5 px-4 rounded-full bg-white/[0.08] hover:bg-white hover:text-black text-white font-semibold text-xs tracking-tight border border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
            >
              <span>Join waitlist now</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    id: "comp-22",
    slug: "share-modal-dialog",
    title: "Share Modal Dialog",
    description: "Floating share dialog featuring a protruding top chain link badge, quick copy resource link input, and 1-click social network destinations adapted for Weblocks.",
    category: "modals",
    tier: "free",
    cliCommand: "npx weblocks add share-modal-dialog",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    tags: ["modals", "sheets", "share", "dialog", "social", "copy-link", "popover"],
    props: [
      { name: "title", type: "string", default: '"Share with Friends"', description: "Primary heading text" },
      { name: "subtitle", type: "string", default: '"Designing is more effective when you connect with teammates!"', description: "Secondary descriptive text" },
      { name: "shareUrl", type: "string", default: '"https://weblocks.dev/ref/screen-729"', description: "Resource URL to copy or distribute" },
      { name: "isOpen", type: "boolean", default: "true", description: "Whether the dialog modal is visible" },
      { name: "onClose", type: "() => void", description: "Callback triggered when close button is clicked" },
      { name: "onShare", type: "(platform: string) => void", description: "Callback when a social destination is clicked" },
      { name: "onCopy", type: "(url: string) => void", description: "Callback when the link is copied" },
    ],
    code: `"use client";

import React, { useState } from "react";
import { X, Copy, Check, Link2 } from "lucide-react";

export interface ShareModalDialogProps {
  title?: string;
  subtitle?: string;
  shareUrl?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onShare?: (platform: string) => void;
  onCopy?: (url: string) => void;
}

export function ShareModalDialog({
  title = "Share with Friends",
  subtitle = "Designing is more effective when you connect with teammates!",
  shareUrl = "https://weblocks.dev/ref/screen-729",
  isOpen = true,
  onClose,
  onShare,
  onCopy,
}: ShareModalDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    onCopy?.(shareUrl);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialChannels = [
    {
      name: "Facebook",
      bgClass: "bg-[#1877f2] hover:bg-[#166fe5]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "X",
      bgClass: "bg-black dark:bg-[#262626] hover:bg-neutral-800",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Whatsapp",
      bgClass: "bg-[#25d366] hover:bg-[#20bd5a]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 2c-5.508 0-9.988 4.477-9.988 9.984 0 1.76.459 3.478 1.333 4.993L2 22l5.233-1.373c1.458.794 3.1 1.213 4.798 1.213 5.508 0 9.988-4.477 9.988-9.984C22.019 6.477 17.539 2 12.031 2zm0 18.291c-1.503 0-2.977-.404-4.264-1.168l-.306-.182-3.167.831.845-3.088-.2-.318a8.272 8.272 0 0 1-1.268-4.382c0-4.577 3.724-8.3 8.301-8.3 4.577 0 8.301 3.723 8.301 8.3 0 4.577-3.724 8.3-8.301 8.3zm4.549-6.216c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062-.249-.125-1.052-.388-2.003-1.236-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075 0 1.224.892 2.407 1.016 2.573.125.166 1.756 2.681 4.254 3.759.594.257 1.058.411 1.42.526.597.19 1.141.163 1.57.099.479-.071 1.472-.602 1.68-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      bgClass: "bg-[#24a1de] hover:bg-[#208fc4]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      name: "Linkedin",
      bgClass: "bg-[#0077b5] hover:bg-[#00669c]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.92 0-1.67.75-1.67 1.67 0 .91.75 1.66 1.67 1.66s1.67-.75 1.67-1.66c0-.92-.75-1.67-1.67-1.67Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-full max-w-[360px] rounded-[32px] bg-white dark:bg-[#161718] border border-black/[0.06] dark:border-[#23252a] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] pt-9 pb-6 px-6 select-none font-sans">
      {/* Protruding Top Center Emblem: Interconnected Chain Links */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white dark:bg-[#161718] border-4 border-[#f4f4f5] dark:border-[#0e0f11] shadow-sm flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#94a3b8] to-[#cbd5e1] dark:from-[#334155] dark:to-[#64748b] flex items-center justify-center shadow-inner">
          <Link2 className="w-4 h-4 text-white -rotate-45" />
        </div>
      </div>

      {/* Top Right Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full border border-black/[0.06] dark:border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-[#111827] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
          title="Close dialog"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-[#111827] dark:text-white tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af] max-w-[260px] mx-auto mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Section 1: Share your link */}
      <div className="mb-5">
        <label className="block text-[13px] font-bold text-[#111827] dark:text-white mb-2">
          Share your link
        </label>
        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#f8f9fa] dark:bg-[#202226] border border-black/[0.04] dark:border-white/[0.06] text-[13px] text-[#374151] dark:text-[#d1d5db]">
          <span className="truncate pr-2 select-all font-sans text-[12.5px]">
            {shareUrl}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded-md text-[#6b7280] dark:text-[#9ca3af] hover:text-ink dark:hover:text-white transition-colors cursor-pointer shrink-0"
            title="Copy link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Section 2: Share to Social Network Icons */}
      <div>
        <label className="block text-[13px] font-bold text-[#111827] dark:text-white mb-3">
          Share to
        </label>
        <div className="flex items-center justify-between gap-1">
          {socialChannels.map((channel) => (
            <button
              key={channel.name}
              type="button"
              onClick={() => onShare?.(channel.name)}
              className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none"
            >
              <div
                className={\`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-xs transition-transform duration-150 group-hover:scale-105 group-active:scale-95 \${channel.bgClass}\`}
              >
                {channel.icon}
              </div>
              <span className="text-[10.5px] font-medium text-[#6b7280] dark:text-[#9ca3af] group-hover:text-[#111827] dark:group-hover:text-white transition-colors">
                {channel.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  },
];

export function getComponentDesignMd(component: UIComponentEntity): string {
  const propsLines = component.props && component.props.length > 0
    ? component.props.map((p) => `- \`${p.name}\` (\`${p.type}\`${p.default ? `, default: ${p.default}` : ""}): ${p.description}`)
    : ["- No configurable props required (self-contained block)."];

  const tagsStr = component.tags.map((t) => "#" + t).join(" ");
  const depsStr = component.dependencies.join(", ");

  return [
    `# ${component.title} — design.md`,
    "",
    "## 1. Overview",
    component.description,
    "",
    "## 2. Component Properties (Props)",
    ...propsLines,
    "",
    "## 3. Design Tokens & Styling",
    "- **Typeface**: M Saans / Inter Variable",
    "- **Optical Weights**: Headlines 652 • Body 456 • Actions 600",
    "- **Elevation**: Level 1 (borderless contrast, zero shadows)",
    "- **Border Radius**: rounded-full (pill) / rounded-md",
    "- **Dependencies**: " + depsStr,
    "",
    "## 4. CLI Installation",
    "```bash",
    component.cliCommand,
    "```",
    "",
    "## 5. Metadata",
    `- **Category**: ${component.category}`,
    `- **Tier**: ${component.tier}`,
    `- **Slug**: ${component.slug}`,
    `- **Tags**: ${tagsStr}`,
    "",
    "## 6. React + Tailwind Implementation",
    "```tsx",
    component.code,
    "```",
  ].join("\n");
}
