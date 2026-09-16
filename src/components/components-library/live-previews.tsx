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
  Scan,
  Layers,
  Code2,
  ShieldCheck,
  Mail,
  BellOff,
  ChevronDown,
  Send,
  Trash2,
  Users,
  MoreHorizontal,
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

// 15. Live Transcribe (Effects & Media)
export function LiveTranscribe() {
  const [isRecording, setIsRecording] = useState(true);
  const [language, setLanguage] = useState("English");
  const [wordIndex, setWordIndex] = useState(6);
  const [sentenceIdx, setSentenceIdx] = useState(0);

  const sentences = [
    "Weblocks is a way to view design inspiration at a glance—today's screen references, navigation pills, bento grids, design tokens, and components in real time.",
    "Transform curated mobile references into production React code—instant token export, zero drop shadows, tight hairline borders, and fluid responsive layouts.",
  ];

  const words = sentences[sentenceIdx].split(" ");

  // Auto-streaming live transcription word-by-word
  useEffect(() => {
    if (!isRecording) return;

    const timer = setInterval(() => {
      setWordIndex((prev) => {
        if (prev >= words.length) {
          // Pause at end then switch sentence
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
          {/* 文A Language icon */}
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
          onClick={() => setIsRecording(!isRecording)}
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
}

// 16. Perspective Roller Picker (Buttons & Controls)
export function LivePerspectiveRollerPicker() {
  const [activeIndex, setActiveIndex] = useState(3); // Start centered on purple item
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const items = [
    { id: "palette", label: "Design Tokens", color: "bg-[#e5a968]", icon: Sliders },
    { id: "typography", label: "Typography System", color: "bg-[#5b96f7]", icon: Sparkles },
    { id: "source", label: "Source Inspiration", color: "bg-[#d49b6a]", icon: Layers },
    { id: "screens", label: "Screen Verification", color: "bg-[#9d4edd]", icon: Scan },
    { id: "states", label: "Interactive States", color: "bg-[#64b5f6]", icon: Share2 },
    { id: "export", label: "Clean Code Export", color: "bg-[#66bb6a]", icon: Code2 },
    { id: "audit", label: "Production Audit", color: "bg-[#e57373]", icon: ShieldCheck },
  ];

  // Auto-rolling wheel animation
  useEffect(() => {
    if (isUserInteracting) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [isUserInteracting, items.length]);

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    setIsUserInteracting(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3500);
  };

  const n = items.length;

  return (
    <div className="relative w-full h-[210px] flex items-center justify-center overflow-hidden select-none">
      <div className="relative w-64 sm:w-72 h-full flex items-center justify-center" style={{ perspective: "800px" }}>
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
                transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`,
                opacity,
                zIndex,
              }}
              className={`absolute left-0 right-0 h-12 rounded-2xl flex items-center gap-3 px-3.5 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer ${
                isCenter
                  ? "bg-white border border-hairline-soft"
                  : "bg-white/80 hover:bg-white border border-transparent"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl ${item.color} text-white flex items-center justify-center shrink-0 transition-transform ${
                  isCenter ? "scale-105" : "scale-95 opacity-90"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              <span
                className={`text-xs sm:text-sm tracking-tight truncate transition-colors ${
                  isCenter ? "font-bold text-ink" : "font-medium text-[#707070]"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 17. Spotlight Directory Card (Cards & Bento)
export function LiveSpotlightDirectoryCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { showToast } = useLibrary();

  const members = [
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

  // Auto-cycle featured member when not expanded
  useEffect(() => {
    if (isExpanded) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % members.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isExpanded, members.length]);

  const active = members[activeIdx];
  const otherMembers = members.filter((_, idx) => idx !== activeIdx);

  const handleMessage = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    showToast(`Direct message started with ${name}`, "info");
  };

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
          onClick={(e) => handleMessage(e, active.name)}
          className="w-8 h-8 rounded-xl bg-field hover:bg-canvas-soft flex items-center justify-center text-ink shrink-0 transition-colors cursor-pointer"
          title={`Message ${active.name}`}
        >
          <Mail className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Blurred / Frosted Members List Beneath Spotlight */}
      <div
        className={`relative flex flex-col gap-1.5 py-1.5 px-0.5 transition-all duration-300 ${
          isExpanded
            ? "filter-none opacity-100 max-h-44 overflow-y-auto"
            : "blur-[2.5px] opacity-35 pointer-events-none max-h-16 overflow-hidden"
        }`}
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
}

// 18. Share Popover Card (Cards & Bento)
export function LiveSharePopoverCard() {
  const [activeIdx, setActiveIdx] = useState(1); // Gmail default active matching reference
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [permissionIdx, setPermissionIdx] = useState(0);
  const [accessIdx, setAccessIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const { showToast } = useLibrary();

  const permissions = ["Anyone with this link", "Team members only", "Weblocks community"];
  const accessLevels = ["can view", "can inspect", "can copy code"];

  const destinations = [
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: (
        <svg className="w-3.5 h-3.5 text-ink shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.92 0-1.67.75-1.67 1.67 0 .91.75 1.66 1.67 1.66s1.67-.75 1.67-1.66c0-.92-.75-1.67-1.67-1.67Z" />
        </svg>
      ),
    },
    {
      id: "gmail",
      name: "Gmail",
      icon: (
        <svg className="w-3.5 h-3.5 text-ink shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: (
        <svg className="w-3.5 h-3.5 text-ink shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 0 1-5.82 2.41h-.01c-1.42 0-2.82-.37-4.05-1.08l-.29-.17-3.11.82.83-3.03-.19-.3a8.21 8.21 0 0 1-1.26-4.48c0-4.55 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" />
        </svg>
      ),
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: (
        <svg className="w-3.5 h-3.5 text-ink shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: (
        <svg className="w-3.5 h-3.5 text-ink shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.93-1.28 4.88-2.12 5.86-2.54 2.79-1.16 3.37-1.36 3.75-1.36.08 0 .28.02.4.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
    },
  ];

  // Auto-cycle destinations when not hovering
  useEffect(() => {
    if (isHovered || !isOpen) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % destinations.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isHovered, isOpen, destinations.length]);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("https://weblocks.dev/ref/screen-729");
    setCopied(true);
    showToast("Shareable reference link copied!", "copy");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTarget = (e: React.MouseEvent, destName: string) => {
    e.stopPropagation();
    showToast(`Shared Weblocks reference to ${destName}`, "info");
  };

  const handleMoreOptions = (e: React.MouseEvent, destName: string) => {
    e.stopPropagation();
    showToast(`Additional options for ${destName}`, "info");
  };

  const cyclePermission = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPermissionIdx((prev) => (prev + 1) % permissions.length);
    showToast(`Permission set: ${permissions[(permissionIdx + 1) % permissions.length]}`, "info");
  };

  const cycleAccess = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAccessIdx((prev) => (prev + 1) % accessLevels.length);
    showToast(`Access updated: ${accessLevels[(accessIdx + 1) % accessLevels.length]}`, "info");
  };

  return (
    <div className="relative w-full max-w-[320px] flex flex-col items-center select-none py-2">
      {/* 1. Popover Card with Pointer Beak */}
      <div
        className={`w-full transition-all duration-300 transform origin-bottom ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 mb-3"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none mb-0 h-0 overflow-hidden"
        }`}
      >
        <div className="relative w-full rounded-[24px] bg-white border border-hairline-soft p-2.5 shadow-none">
          {/* Destination List */}
          <div
            className="flex flex-col gap-0.5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {destinations.map((dest, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={dest.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all duration-150 cursor-pointer ${
                    isActive ? "bg-[#ebebed]" : "bg-transparent hover:bg-[#f5f5f7]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      {dest.icon}
                    </div>
                    <span className="text-xs font-medium text-ink tracking-tight">
                      {dest.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleMoreOptions(e, dest.name)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#141414] text-white hover:bg-[#262626] scale-105"
                          : "bg-[#f0f0f2] text-[#8e8e93] hover:bg-[#e4e4e7] hover:text-ink"
                      }`}
                      title={`Options for ${dest.name}`}
                    >
                      <MoreHorizontal className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleShareTarget(e, dest.name)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#141414] text-white hover:bg-[#262626] scale-105"
                          : "bg-[#f0f0f2] text-[#8e8e93] hover:bg-[#e4e4e7] hover:text-ink"
                      }`}
                      title={`Share to ${dest.name}`}
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
              onClick={cyclePermission}
              className="flex items-center gap-0.5 hover:text-ink transition-colors cursor-pointer truncate max-w-[90px]"
              title="Change permission scope"
            >
              <span className="truncate">{permissions[permissionIdx]}</span>
              <ChevronDown className="w-2.5 h-2.5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={cycleAccess}
              className="flex items-center gap-0.5 hover:text-ink transition-colors cursor-pointer shrink-0"
              title="Change access level"
            >
              <span>{accessLevels[accessIdx]}</span>
              <ChevronDown className="w-2.5 h-2.5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer shadow-none shrink-0 ${
                copied
                  ? "bg-[#141414] text-white"
                  : "bg-[#e8e8ea] text-ink hover:bg-[#141414] hover:text-white"
              }`}
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
          onClick={() => showToast("Quick dispatch triggered", "info")}
          className="p-1.5 text-[#707070] hover:text-ink transition-colors cursor-pointer"
          title="Send reference"
        >
          <Send className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => showToast("Moved to archive", "info")}
          className="p-1.5 text-[#707070] hover:text-ink transition-colors cursor-pointer"
          title="Archive reference"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        {/* Center Share Pill Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight transition-all cursor-pointer ${
            isOpen
              ? "bg-white text-ink border border-hairline-soft shadow-none scale-105"
              : "bg-transparent text-[#707070] hover:text-ink hover:bg-white/60"
          }`}
          title="Toggle share popover"
        >
          <span>share</span>
          <Share2 className="w-3 h-3" />
        </button>

        <button
          type="button"
          onClick={() => showToast("Collaborator permissions", "info")}
          className="p-1.5 text-[#707070] hover:text-ink transition-colors cursor-pointer"
          title="Team collaborators"
        >
          <Users className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => showToast("Saved to collection", "info")}
          className="p-1.5 text-[#707070] hover:text-ink transition-colors cursor-pointer"
          title="Bookmark reference"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
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
  "live-transcribe": LiveTranscribe,
  "perspective-roller-picker": LivePerspectiveRollerPicker,
  "spotlight-directory-card": LiveSpotlightDirectoryCard,
  "share-popover-card": LiveSharePopoverCard,
};
