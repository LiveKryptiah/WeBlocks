"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Compass,
  Sparkles,
  FolderHeart,
  Home,
  Search,
  Bookmark,
  Sliders,
  Bell,
  ChevronRight,
  Check,
  ArrowUpRight,
  TrendingUp,
  Star,
  CheckCircle2,
  X,
  Share2,
  Copy,
  Download,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import { useLibrary } from "@/context/library-context";

// 1. Floating Nav Pill
export function LiveFloatingNavPill() {
  const [active, setActive] = useState("explore");
  const items = [
    { id: "explore", label: "Explore", icon: Compass },
    { id: "patterns", label: "Patterns", icon: Sparkles },
    { id: "saved", label: "Saved", icon: FolderHeart },
  ];

  return (
    <div className="flex items-center justify-center p-4">
      <nav className="flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-[#e0e0e0] shadow-none">
        <div className="w-7 h-7 rounded-lg bg-[#141414] text-white flex items-center justify-center font-bold text-xs">
          W
        </div>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-[#f0f0f0] text-[#141414]"
                  : "text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// 2. Island Dock
export function LiveIslandDock() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);

  const dockItems = [
    { id: "home", label: "Overview", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "saved", label: "Saved", icon: Bookmark, badge: "4" },
    { id: "ai", label: "AI Assist", icon: Sparkles },
    { id: "alerts", label: "Activity", icon: Bell },
    { id: "settings", label: "Controls", icon: Sliders },
  ];

  return (
    <div className="flex items-center justify-center py-6">
      <div className="relative flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#141414] text-white border border-[#262626] shadow-none">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const isHovered = hovered === item.id;

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => setActive(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 ${
                  isActive
                    ? "bg-white text-[#141414]"
                    : "text-[#adadad] hover:text-white hover:bg-[#262626]"
                } ${isHovered ? "scale-110 -translate-y-1" : ""}`}
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
    </div>
  );
}

// 3. Slide to Confirm
export function LiveSlideToConfirm() {
  const [sliderPos, setSliderPos] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handlePointerDown = () => {
    if (!isConfirmed) isDragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || isConfirmed || !trackRef.current) return;
    const track = trackRef.current.getBoundingClientRect();
    const maxOffset = track.width - 44;
    const offset = Math.max(0, Math.min(e.clientX - track.left, maxOffset));
    setSliderPos(offset);

    if (offset >= maxOffset - 4) {
      setIsConfirmed(true);
      setSliderPos(maxOffset);
      isDragging.current = false;
    }
  };

  const handlePointerUp = () => {
    if (!isConfirmed) {
      isDragging.current = false;
      setSliderPos(0);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmed(false);
    setSliderPos(0);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 w-full">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full max-w-xs h-12 rounded-full bg-[#f0f0f0] border border-[#e0e0e0] flex items-center px-1 select-none overflow-hidden touch-none"
      >
        <div
          className="absolute left-0 top-0 bottom-0 bg-[#141414] transition-all"
          style={{ width: isConfirmed ? "100%" : `${sliderPos + 44}px` }}
        />
        <div
          className="relative z-10 w-10 h-10 rounded-full bg-white text-[#141414] flex items-center justify-center cursor-grab active:cursor-grabbing font-bold transition-transform shadow-none"
          style={{ transform: `translateX(${sliderPos}px)` }}
        >
          {isConfirmed ? (
            <Check className="w-4 h-4 text-[#0066ff]" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
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
      <p className="text-[11px] text-[#707070]">Drag the pill across to complete action.</p>
    </div>
  );
}

// 4. Magnetic Squircle Button
export function LiveMagneticSquircleButton() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 1200);
        }}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141414] text-white text-xs font-semibold tracking-tight transition-transform duration-75 active:scale-95 border border-[#141414]"
      >
        <span>{clicked ? "Triggered!" : "Deploy Reference"}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
      </button>
      <span className="text-[11px] text-[#707070]">Hover and drag around to feel magnetic spring.</span>
    </div>
  );
}

// 5. Segmented Filter Toggle
export function LiveSegmentedToggle() {
  const [selected, setSelected] = useState("Screens");
  const options = ["Screens", "Flows", "UI Kits", "Tokens"];

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <div className="inline-flex items-center p-1 rounded-full bg-[#f0f0f0] border border-[#e0e0e0]">
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-150 ${
                isSelected
                  ? "bg-white text-[#141414] border border-[#e0e0e0]"
                  : "text-[#707070] hover:text-[#141414]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-[#707070]">Active filter: <span className="font-bold text-[#141414]">{selected}</span></p>
    </div>
  );
}

// 6. Metrics Bento Tile
export function LiveMetricsBentoTile() {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const data = [40, 55, 35, 60, 75, 65, 85, 95, 80, 100];

  return (
    <div className="w-full max-w-xs p-5 rounded-2xl bg-[#ffffff] border border-[#e0e0e0] flex flex-col justify-between gap-4">
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
        <div className="text-3xl font-bold tracking-tight text-[#141414]">
          {activeBar !== null ? `${activeBar * 320} refs` : "32,490"}
        </div>
        <p className="text-xs text-[#707070] mt-0.5">Updated every 24 hours.</p>
      </div>

      {/* Mini SVG Sparkline */}
      <div className="h-10 w-full pt-2 border-t border-[#f0f0f0] flex items-end justify-between gap-1.5">
        {data.map((val, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setActiveBar(val)}
            onMouseLeave={() => setActiveBar(null)}
            className="flex-1 rounded-sm bg-[#141414] transition-all hover:bg-[#0066ff] cursor-pointer"
            style={{ height: `${val}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// 7. Squircle Product Card
export function LiveSquircleProductCard() {
  const [saved, setSaved] = useState(false);
  const { showToast } = useLibrary();

  const handleSave = () => {
    setSaved(!saved);
    showToast(saved ? "Removed Linear from saved." : "Saved Linear to library.", "saved");
  };

  return (
    <div className="w-full max-w-sm p-4 rounded-2xl bg-white border border-[#e0e0e0] flex items-center justify-between gap-3 group">
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
        onClick={handleSave}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          saved ? "bg-[#141414] text-white" : "bg-[#f3f3f3] text-[#707070] hover:text-[#141414]"
        }`}
        aria-label="Save app"
      >
        <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
      </button>
    </div>
  );
}

// 8. Testimonial Ticker
export function LiveTestimonialTicker() {
  return (
    <div className="w-full max-w-md p-5 rounded-2xl bg-white border border-[#e0e0e0] flex flex-col gap-3">
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
}

// 9. Command Search Input
export function LiveCommandSearchInput() {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full max-w-md p-4 flex flex-col items-center gap-2">
      <div className="relative flex items-center w-full px-3.5 py-2 rounded-full bg-[#f0f0f0] border border-[#e0e0e0] focus-within:border-[#141414] transition-colors">
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
          <span className="px-1.5 py-0.5 rounded-full bg-white border border-[#e0e0e0] text-[10px] font-mono font-semibold text-[#707070]">
            ⌘K
          </span>
        )}
      </div>
      {query && (
        <p className="text-[11px] text-[#707070]">Query: <span className="font-mono text-[#141414]">"{query}"</span></p>
      )}
    </div>
  );
}

// 10. OTP Verification Input
export function LiveOTPVerificationInput() {
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

  const code = digits.join("");

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
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
            className="w-10 h-12 rounded-xl text-center text-sm font-mono font-bold bg-[#f0f0f0] border border-[#e0e0e0] text-[#141414] focus:bg-white focus:border-[#141414] outline-none transition-colors"
          />
        ))}
      </div>
      <p className="text-[11px] text-[#707070]">
        {code.length === 6 ? (
          <span className="font-bold text-[#141414] inline-flex items-center gap-1">
            <Check className="w-3 h-3 text-[#0066ff]" /> Code entered: {code}
          </span>
        ) : (
          "Enter 6-digit authentication pin."
        )}
      </p>
    </div>
  );
}

// 11. Bottom Action Sheet
export function LiveBottomActionSheet() {
  const [open, setOpen] = useState(false);
  const { showToast } = useLibrary();

  const handleAction = (label: string) => {
    setOpen(false);
    showToast(`${label} performed.`, "info");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 rounded-full bg-[#141414] text-white text-xs font-semibold hover:bg-[#262626] transition-colors"
      >
        Open Action Sheet
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl p-5 border border-[#e0e0e0] flex flex-col gap-3 animate-in slide-in-from-bottom-4"
          >
            <div className="w-10 h-1 rounded-full bg-[#e0e0e0] mx-auto mb-1" />
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#141414]">Reference Actions</h3>
              <button onClick={() => setOpen(false)} className="text-[#707070] hover:text-[#141414]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <button
                onClick={() => handleAction("Share Link")}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-full text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3] text-left"
              >
                <Share2 className="w-3.5 h-3.5 text-[#707070]" /> Share Link
              </button>
              <button
                onClick={() => handleAction("Copy Figma Tokens")}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-full text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3] text-left"
              >
                <Copy className="w-3.5 h-3.5 text-[#707070]" /> Copy Figma Tokens
              </button>
              <button
                onClick={() => handleAction("Export PNG")}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-full text-xs font-semibold text-[#141414] hover:bg-[#f3f3f3] text-left"
              >
                <Download className="w-3.5 h-3.5 text-[#707070]" /> Export High-Res PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 12. Spotlight Dialog
export function LiveSpotlightDialog() {
  const [open, setOpen] = useState(false);
  const { showToast } = useLibrary();

  const handleConfirm = () => {
    setOpen(false);
    showToast("Item successfully deleted.", "info");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-full border border-[#e0e0e0] bg-white text-[#141414] text-xs font-semibold hover:bg-[#f3f3f3]"
      >
        Trigger Dialog
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white border border-[#e0e0e0] p-6 flex flex-col gap-4 animate-in zoom-in-95"
          >
            <div className="w-9 h-9 rounded-full bg-[#f0f0f0] flex items-center justify-center text-[#141414]">
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
                onClick={handleConfirm}
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
}

// 13. Audio Lyrics Scrubber
export function LiveAudioLyricsScrubber() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const lyrics = [
    { time: 0, text: "Designing systems that endure the noise." },
    { time: 4, text: "Zero drop shadows, clear hairlines, pure intent." },
    { time: 8, text: "Form strictly follows the rhythm of thought." },
    { time: 13, text: "Ink and canvas dancing in perfect harmony." },
    { time: 18, text: "Every pixel placed with deliberate precision." },
  ];

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
    <div className="w-full max-w-sm p-4 rounded-2xl bg-[#141414] text-white border border-[#262626] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#0066ff]">
            Synced Scrubber
          </span>
          <h4 className="text-xs font-bold text-white">Design Symphony No. 4</h4>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded-full bg-white text-[#141414] flex items-center justify-center font-bold hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
            className="w-7 h-7 rounded-full bg-[#262626] text-white flex items-center justify-center hover:bg-[#333333]"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Lyrics Stack */}
      <div className="flex flex-col gap-1.5 py-1">
        {lyrics.map((line, idx) => {
          const isActive =
            currentTime >= line.time &&
            (idx === lyrics.length - 1 || currentTime < lyrics[idx + 1].time);
          const isPassed = currentTime > line.time;

          return (
            <div
              key={idx}
              onClick={() => setCurrentTime(line.time)}
              className={`cursor-pointer text-[11px] font-semibold transition-all duration-300 ${
                isActive
                  ? "text-white text-xs font-bold translate-x-1"
                  : isPassed
                  ? "text-[#707070]"
                  : "text-[#404040]"
              }`}
            >
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Time Scrubber */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#262626]">
        <span className="text-[10px] font-mono text-[#adadad]">0:{currentTime < 10 ? `0${currentTime}` : currentTime}</span>
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
}

// 14. Stat Counter Ticker
export function LiveStatCounterTicker() {
  const [count, setCount] = useState(142);
  const target = 200;
  const percentage = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="w-full max-w-xs p-5 rounded-2xl bg-white border border-[#e0e0e0] flex flex-col gap-3">
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
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Component lookup map by slug
export const LIVE_COMPONENTS_MAP: Record<string, React.ComponentType> = {
  "floating-nav-pill": LiveFloatingNavPill,
  "island-dock": LiveIslandDock,
  "slide-to-confirm": LiveSlideToConfirm,
  "magnetic-squircle-button": LiveMagneticSquircleButton,
  "segmented-toggle": LiveSegmentedToggle,
  "metrics-bento-tile": LiveMetricsBentoTile,
  "squircle-product-card": LiveSquircleProductCard,
  "testimonial-ticker": LiveTestimonialTicker,
  "command-search-input": LiveCommandSearchInput,
  "otp-verification-input": LiveOTPVerificationInput,
  "bottom-action-sheet": LiveBottomActionSheet,
  "spotlight-dialog": LiveSpotlightDialog,
  "audio-lyrics-scrubber": LiveAudioLyricsScrubber,
  "stat-counter-ticker": LiveStatCounterTicker,
};
