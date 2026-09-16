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

  // Auto-cycle tabs smoothly every 2.4s
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => {
        const idx = items.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % items.length;
        return items[nextIdx].id;
      });
    }, 2400);
    return () => clearInterval(timer);
  }, [items]);

  return (
    <div className="flex items-center justify-center p-4">
      <nav className="flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-hairline-soft shadow-none">
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
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
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
  const [isUserHovering, setIsUserHovering] = useState(false);

  const dockItems = [
    { id: "home", label: "Overview", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "saved", label: "Saved", icon: Bookmark, badge: "4" },
    { id: "ai", label: "AI Assist", icon: Sparkles },
    { id: "alerts", label: "Activity", icon: Bell },
    { id: "settings", label: "Controls", icon: Sliders },
  ];

  // Auto wave across dock items every 1.8s
  useEffect(() => {
    if (isUserHovering) return;
    let step = 0;
    const timer = setInterval(() => {
      step = (step + 1) % dockItems.length;
      setHovered(dockItems[step].id);
      setActive(dockItems[step].id);
    }, 1800);
    return () => clearInterval(timer);
  }, [isUserHovering, dockItems.length]);

  return (
    <div
      className="flex items-center justify-center py-6"
      onMouseEnter={() => setIsUserHovering(true)}
      onMouseLeave={() => {
        setIsUserHovering(false);
        setHovered(null);
      }}
    >
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
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
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
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white text-[#141414] text-[10px] font-semibold tracking-tight whitespace-nowrap shadow-none pointer-events-none animate-in fade-in-50">
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
  const [userInteracted, setUserInteracted] = useState(false);

  // Auto-slide animation loop when idle
  useEffect(() => {
    if (userInteracted) return;

    let animTimer: NodeJS.Timeout;
    let stepTimer: NodeJS.Timeout;
    let glideInterval: NodeJS.Timeout;

    const runAutoSlide = () => {
      setIsConfirmed(false);
      setSliderPos(0);

      animTimer = setTimeout(() => {
        const track = trackRef.current?.getBoundingClientRect();
        const maxOffset = track ? Math.max(120, track.width - 44) : 180;
        let pos = 0;

        glideInterval = setInterval(() => {
          pos += Math.max(3, Math.round((maxOffset - pos) * 0.18));
          if (pos >= maxOffset - 3) {
            clearInterval(glideInterval);
            setSliderPos(maxOffset);
            setIsConfirmed(true);

            // Hold confirmed for 2.2s then repeat
            stepTimer = setTimeout(runAutoSlide, 2200);
          } else {
            setSliderPos(pos);
          }
        }, 16);
      }, 1000);
    };

    runAutoSlide();

    return () => {
      clearTimeout(animTimer);
      clearTimeout(stepTimer);
      clearInterval(glideInterval);
    };
  }, [userInteracted]);

  const handlePointerDown = () => {
    setUserInteracted(true);
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
        className="relative w-full max-w-xs h-12 rounded-full bg-[#f0f0f0] border border-hairline-soft flex items-center px-1 select-none overflow-hidden touch-none"
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
      <p className="text-[11px] text-[#707070]">Drag the pill across or watch auto-confirm loop.</p>
    </div>
  );
}

// 4. Magnetic Squircle Button
export function LiveMagneticSquircleButton() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [isUserHovering, setIsUserHovering] = useState(false);

  // Auto magnetic drift and trigger pulse
  useEffect(() => {
    if (isUserHovering) return;

    let frame = 0;
    let animId: number;

    const animate = () => {
      frame += 0.04;
      setOffset({
        x: Math.sin(frame) * 7,
        y: Math.cos(frame * 0.8) * 4,
      });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const pulseInterval = setInterval(() => {
      setClicked(true);
      setTimeout(() => setClicked(false), 1000);
    }, 3800);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(pulseInterval);
    };
  }, [isUserHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsUserHovering(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setIsUserHovering(false);
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
        <ArrowUpRight className={`w-3.5 h-3.5 text-white/80 transition-transform ${clicked ? "rotate-45 text-[#0066ff]" : ""}`} />
      </button>
      <span className="text-[11px] text-[#707070]">Hover to feel magnetic spring or watch auto-drift.</span>
    </div>
  );
}

// 5. Segmented Filter Toggle
export function LiveSegmentedToggle() {
  const [selected, setSelected] = useState("Screens");
  const [userInteracted, setUserInteracted] = useState(false);
  const options = ["Screens", "Flows", "UI Kits", "Tokens"];

  // Auto-cycle segmented options every 2.2s
  useEffect(() => {
    if (userInteracted) return;
    const timer = setInterval(() => {
      setSelected((prev) => {
        const idx = options.indexOf(prev);
        return options[(idx + 1) % options.length];
      });
    }, 2200);
    return () => clearInterval(timer);
  }, [userInteracted, options]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <div className="inline-flex items-center p-1 rounded-full bg-[#f0f0f0]">
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              onClick={() => {
                setUserInteracted(true);
                setSelected(option);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 ${
                isSelected
                  ? "bg-white text-[#141414] shadow-none"
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
  const [activeBar, setActiveBar] = useState<number | null>(40);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const data = [40, 55, 35, 60, 75, 65, 85, 95, 80, 100];

  // Auto-cycle active sparkline bar highlight
  useEffect(() => {
    if (isUserHovering) return;
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % data.length;
      setActiveBar(data[idx]);
    }, 1200);
    return () => clearInterval(timer);
  }, [isUserHovering, data]);

  return (
    <div
      className="w-full max-w-xs p-5 rounded-2xl bg-[#ffffff] border border-hairline-soft flex flex-col justify-between gap-4"
      onMouseEnter={() => setIsUserHovering(true)}
      onMouseLeave={() => {
        setIsUserHovering(false);
      }}
    >
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
        <div className="text-3xl font-bold tracking-tight text-[#141414] transition-all duration-150">
          {activeBar !== null ? `${(activeBar * 320).toLocaleString()} refs` : "32,490"}
        </div>
        <p className="text-xs text-[#707070] mt-0.5">Live updated metrics stream.</p>
      </div>

      {/* Mini SVG Sparkline */}
      <div className="h-10 w-full pt-2 border-t border-[#f0f0f0] flex items-end justify-between gap-1.5">
        {data.map((val, idx) => {
          const isHighlighted = activeBar === val;
          return (
            <div
              key={idx}
              onMouseEnter={() => {
                setIsUserHovering(true);
                setActiveBar(val);
              }}
              className={`flex-1 rounded-sm transition-all duration-200 cursor-pointer ${
                isHighlighted ? "bg-[#0066ff] scale-y-105" : "bg-[#141414] hover:bg-[#0066ff]"
              }`}
              style={{ height: `${val}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}

// 7. Squircle Product Card
export function LiveSquircleProductCard() {
  const [saved, setSaved] = useState(false);
  const { showToast } = useLibrary();

  // Auto-pulse save status every 3.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setSaved((prev) => !prev);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleSave = () => {
    setSaved(!saved);
    showToast(saved ? "Removed Linear from saved." : "Saved Linear to library.", "saved");
  };

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
        onClick={handleSave}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          saved ? "bg-[#141414] text-white scale-105" : "bg-[#f3f3f3] text-[#707070] hover:text-[#141414]"
        }`}
        aria-label="Save app"
      >
        <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current text-[#0066ff]" : ""}`} />
      </button>
    </div>
  );
}

// 8. Testimonial Ticker
export function LiveTestimonialTicker() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const testimonials = [
    {
      quote: "Weblocks completely replaced our chaotic Figma moodboards. The exact screen breakdowns save our design team hours every week.",
      name: "Elena Rostova",
      initial: "E",
      role: "Lead Product Designer, Vercel",
    },
    {
      quote: "The zero drop-shadow aesthetic and precise hairline borders match the caliber of the best digital products on the market today.",
      name: "Marcus Vance",
      initial: "M",
      role: "Design Systems Engineer, Linear",
    },
    {
      quote: "Copying ready-to-use production Tailwind components straight into our repository cut our MVP development time in half.",
      name: "Sarah Chen",
      initial: "S",
      role: "Founding Engineer, Stripe Atlas",
    },
  ];

  // Auto-cycle testimonial cards every 3.8s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % testimonials.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const t = testimonials[currentIdx];

  return (
    <div className="w-full max-w-md p-5 rounded-2xl bg-white border border-hairline-soft flex flex-col gap-3 min-h-[160px] justify-between transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#141414]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#141414]" />
          ))}
        </div>
        <div className="flex items-center gap-1">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIdx ? "w-4 bg-[#141414]" : "bg-[#e0e0e0]"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-[#141414] font-medium transition-all duration-300 line-clamp-3">
        "{t.quote}"
      </p>

      <div className="flex items-center gap-2.5 pt-2 border-t border-[#f0f0f0]">
        <div className="w-7 h-7 rounded-[30%] bg-[#141414] text-white flex items-center justify-center text-xs font-bold shrink-0">
          {t.initial}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-[#141414]">{t.name}</span>
            <CheckCircle2 className="w-3 h-3 text-[#0066ff]" />
          </div>
          <span className="text-[10px] text-[#707070]">{t.role}</span>
        </div>
      </div>
    </div>
  );
}

// 9. Command Search Input
export function LiveCommandSearchInput() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Typewriter effect auto-typing search terms
  useEffect(() => {
    if (isFocused) return;

    const phrases = [
      "floating nav pill",
      "dark mode dashboard",
      "bento metrics grid",
      "slide to confirm",
      "mobile bottom sheet",
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const typeLoop = () => {
      const current = phrases[phraseIdx];
      if (!isDeleting) {
        charIdx++;
        setQuery(current.substring(0, charIdx));
        if (charIdx === current.length) {
          isDeleting = true;
          timeout = setTimeout(typeLoop, 1600);
          return;
        }
        timeout = setTimeout(typeLoop, 80);
      } else {
        charIdx--;
        setQuery(current.substring(0, charIdx));
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timeout = setTimeout(typeLoop, 400);
          return;
        }
        timeout = setTimeout(typeLoop, 40);
      }
    };

    timeout = setTimeout(typeLoop, 800);
    return () => clearTimeout(timeout);
  }, [isFocused]);

  return (
    <div className="w-full max-w-md p-4 flex flex-col items-center gap-2">
      <div className="relative flex items-center w-full px-3.5 py-2 rounded-full bg-[#f0f0f0] border border-hairline-soft focus-within:border-[#141414] transition-colors">
        <Search className="w-4 h-4 text-[#707070] shrink-0 mr-2" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!query) setIsFocused(false);
          }}
          onChange={(e) => {
            setIsFocused(true);
            setQuery(e.target.value);
          }}
          placeholder="Search components or patterns..."
          className="w-full bg-transparent text-xs font-medium text-[#141414] placeholder-[#707070] outline-none"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery("");
              setIsFocused(false);
            }}
            className="text-[#707070] hover:text-[#141414]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="px-1.5 py-0.5 rounded-full bg-white border border-hairline-soft text-[10px] font-mono font-semibold text-[#707070]">
            ⌘K
          </span>
        )}
      </div>
      <p className="text-[11px] text-[#707070]">
        Auto-typing: <span className="font-mono font-bold text-[#141414]">"{query || "..."}"</span>
      </p>
    </div>
  );
}

// 10. OTP Verification Input
export function LiveOTPVerificationInput() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-fill OTP simulation loop
  useEffect(() => {
    if (isUserInteracting) return;

    const sampleCodes = [
      ["8", "4", "2", "9", "1", "6"],
      ["3", "7", "5", "0", "9", "2"],
    ];

    let codeIdx = 0;
    let timer: NodeJS.Timeout;

    const runOtpCycle = () => {
      setDigits(["", "", "", "", "", ""]);
      const targetCode = sampleCodes[codeIdx];
      let step = 0;

      const fillStep = () => {
        if (step < targetCode.length) {
          const s = step;
          setDigits((prev) => {
            const next = [...prev];
            next[s] = targetCode[s];
            return next;
          });
          step++;
          timer = setTimeout(fillStep, 300);
        } else {
          codeIdx = (codeIdx + 1) % sampleCodes.length;
          timer = setTimeout(runOtpCycle, 2400);
        }
      };

      timer = setTimeout(fillStep, 800);
    };

    runOtpCycle();
    return () => clearTimeout(timer);
  }, [isUserInteracting]);

  const handleChange = (index: number, val: string) => {
    setIsUserInteracting(true);
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...digits];
    next[index] = val;
    setDigits(next);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    setIsUserInteracting(true);
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
            className="w-10 h-12 rounded-xl text-center text-sm font-mono font-bold bg-[#f0f0f0] border border-hairline-soft text-[#141414] focus:bg-white focus:border-[#141414] outline-none transition-colors"
          />
        ))}
      </div>
      <p className="text-[11px] text-[#707070]">
        {code.length === 6 ? (
          <span className="font-bold text-[#141414] inline-flex items-center gap-1 animate-in fade-in">
            <Check className="w-3 h-3 text-[#0066ff]" /> Code entered: {code}
          </span>
        ) : (
          "Auto-verifying 6-digit pin..."
        )}
      </p>
    </div>
  );
}

// 11. Bottom Action Sheet
export function LiveBottomActionSheet() {
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Auto-slide sheet up/down cycle
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let stepTimer: NodeJS.Timeout;

    const runSheetLoop = () => {
      setOpen(true);
      setActiveItem(null);

      timer = setTimeout(() => {
        setActiveItem("Figma Tokens");
        stepTimer = setTimeout(() => {
          setOpen(false);
          setTimeout(runSheetLoop, 1400);
        }, 2000);
      }, 1200);
    };

    runSheetLoop();
    return () => {
      clearTimeout(timer);
      clearTimeout(stepTimer);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xs h-[190px] rounded-2xl bg-[#f0f0f0] border border-hairline-soft overflow-hidden flex flex-col justify-end p-2 select-none">
      {/* Background Simulated UI Wireframe */}
      <div className="absolute inset-0 p-3 flex flex-col gap-2 opacity-50">
        <div className="w-20 h-2 rounded-full bg-[#d0d0d0]" />
        <div className="w-full h-10 rounded-xl bg-white border border-hairline-soft" />
        <div className="w-2/3 h-2 rounded-full bg-[#d0d0d0]" />
      </div>

      {/* Dimmed backdrop */}
      <div
        className={`absolute inset-0 bg-black/25 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-up Sheet */}
      <div
        className={`relative z-10 w-full bg-white rounded-2xl p-3 border border-hairline-soft flex flex-col gap-2 transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-8 h-1 rounded-full bg-[#e0e0e0] mx-auto mb-0.5" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#141414]">Actions</span>
          <button onClick={() => setOpen(false)} className="text-[#707070] hover:text-[#141414]">
            <X className="w-3 h-3" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <div
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#141414] transition-all duration-200 ${
              activeItem === "Figma Tokens" ? "bg-[#f0f0f0] text-[#0066ff]" : "hover:bg-[#f3f3f3]"
            }`}
          >
            <Copy className="w-3 h-3 text-[#707070]" /> Copy Figma Tokens
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#141414] hover:bg-[#f3f3f3]">
            <Share2 className="w-3 h-3 text-[#707070]" /> Share Link
          </div>
        </div>
      </div>
    </div>
  );
}

// 12. Spotlight Dialog
export function LiveSpotlightDialog() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 900);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-xs p-5 rounded-2xl bg-white border border-hairline-soft flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-full bg-[#f0f0f0] flex items-center justify-center text-[#141414] transition-transform duration-200 ${pulse ? "scale-110 bg-[#e8f0fe]" : ""}`}>
          <AlertCircle className={`w-4 h-4 transition-colors ${pulse ? "text-[#0066ff]" : "text-[#141414]"}`} />
        </div>
        <div>
          <h3 className="text-xs font-bold text-[#141414]">Delete collection?</h3>
          <p className="text-[10px] text-[#707070]">This action cannot be undone.</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#f0f0f0]">
        <button className="px-3 py-1 rounded-full text-[11px] font-semibold text-[#707070] hover:text-[#141414]">
          Cancel
        </button>
        <button className={`px-3 py-1 rounded-full bg-[#141414] text-white text-[11px] font-semibold transition-all duration-200 ${pulse ? "bg-[#0066ff] scale-105" : ""}`}>
          Confirm Delete
        </button>
      </div>
    </div>
  );
}

// 13. Audio Lyrics Scrubber
export function LiveAudioLyricsScrubber() {
  const [isPlaying, setIsPlaying] = useState(true);
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
            return 0; // Infinite loop
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

  // Auto-increment ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) return 120;
        return prev + 6;
      });
    }, 1400);
    return () => clearInterval(timer);
  }, [target]);

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

        <span className="text-3xl font-bold font-mono text-[#141414] tracking-tight transition-all duration-150">
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
          className="h-full bg-[#141414] transition-all duration-300"
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
