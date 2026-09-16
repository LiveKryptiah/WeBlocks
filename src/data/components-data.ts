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
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-hairline-soft bg-field flex items-center justify-center">
            <img
              src={active.avatar}
              alt={active.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-xs font-bold text-ink">{active.initials}</span>
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
              <div className="w-6 h-6 rounded-full overflow-hidden bg-field shrink-0 border border-hairline-soft flex items-center justify-center">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="text-[9px] font-bold text-ink">{m.initials}</span>
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
