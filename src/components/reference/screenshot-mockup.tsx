import React from "react";
import { ScreenshotEntity } from "@/data/mock-data";
import { cn } from "@/lib/utils";

interface ScreenshotMockupProps {
  screenshot: ScreenshotEntity;
  className?: string;
}

export const ScreenshotMockup: React.FC<ScreenshotMockupProps> = ({
  screenshot,
  className,
}) => {
  const isMobile = screenshot.uiMockupType === "mobile";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none flex flex-col justify-between font-sans transition-all duration-200",
        isMobile ? "aspect-[9/16] bg-[#0c0d0e]" : "aspect-[16/10] bg-[#111215]",
        className
      )}
    >
      {/* Device Header */}
      {isMobile ? (
        <div className="w-full px-5 pt-3 pb-2 flex items-center justify-between text-[11px] font-medium text-white/70 shrink-0 z-10">
          <span>9:41</span>
          <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <div className="w-5 h-2.5 border border-white/60 rounded-[3px] p-0.5">
              <div className="h-full w-3/4 bg-white/80 rounded-[1px]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 py-2.5 border-b border-white/5 flex items-center justify-between shrink-0 z-10 bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
          </div>
          <span className="text-[11px] text-white/40 font-mono tracking-tight">
            {screenshot.appName.toLowerCase()}.app
          </span>
          <div className="w-8" />
        </div>
      )}

      {/* Screen Core UI Mockup */}
      <div className="flex-1 px-4 py-2 flex flex-col justify-center overflow-hidden">
        {renderMockupContent(screenshot)}
      </div>

      {/* Device Footer */}
      {isMobile ? (
        <div className="w-full py-2 flex justify-center shrink-0">
          <div className="w-28 h-1 bg-white/30 rounded-full" />
        </div>
      ) : (
        <div className="w-full px-4 py-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 shrink-0">
          <span>{screenshot.pattern}</span>
          <span className="font-mono">{screenshot.platform}</span>
        </div>
      )}
    </div>
  );
};

function renderMockupContent(s: ScreenshotEntity) {
  switch (s.id) {
    case "ref-1": // Wise Balance Hub
      return (
        <div className="space-y-3 text-white">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[11px] text-white/60 uppercase tracking-wider">Total Balance</span>
              <h4 className="text-2xl font-bold tracking-tight text-[#9FE870]">£14,850.40</h4>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#9FE870] text-black font-bold flex items-center justify-center text-xs">
              W
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 p-2.5 rounded-sm">
              <span className="text-[10px] text-white/60">USD Balance</span>
              <p className="text-sm font-semibold">$8,450.00</p>
            </div>
            <div className="bg-white/10 p-2.5 rounded-sm">
              <span className="text-[10px] text-white/60">EUR Balance</span>
              <p className="text-sm font-semibold">€6,200.20</p>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <div className="flex-1 py-1.5 rounded-full bg-[#9FE870] text-black text-center text-xs font-semibold">
              Send money
            </div>
            <div className="flex-1 py-1.5 rounded-full bg-white/15 text-white text-center text-xs font-semibold">
              Add funds
            </div>
          </div>
          <div className="pt-2 border-t border-white/10 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/80">Stripe Inc.</span>
              <span className="text-[#9FE870] font-mono">+$2,400.00</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/50 font-mono">AWS Cloud</span>
              <span className="text-white/50 font-mono">-£142.50</span>
            </div>
          </div>
        </div>
      );

    case "ref-2": // Linear Command Palette
      return (
        <div className="bg-[#1b1c21] rounded-sm p-4 border border-white/10 text-white space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <div className="w-3 h-3 rounded-full border border-white/40" />
            <span className="text-xs text-white/90 font-medium">Type a command or search issues...</span>
            <span className="ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-mono">ESC</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between p-2 rounded bg-[#5E6AD2]/20 text-[#c5cbff] text-xs">
              <span className="font-medium">Create new issue</span>
              <span className="text-[10px] font-mono opacity-80">C</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 text-white/70 text-xs">
              <span>Switch active project</span>
              <span className="text-[10px] font-mono opacity-60">P</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 text-white/70 text-xs">
              <span>View roadmaps & cycles</span>
              <span className="text-[10px] font-mono opacity-60">G then R</span>
            </div>
          </div>
        </div>
      );

    case "ref-3": // Revolut Crypto Swap
      return (
        <div className="space-y-3 text-white">
          <div className="text-center pb-1">
            <span className="text-xs text-white/50 font-medium">Exchange Currencies</span>
          </div>
          <div className="bg-white/5 p-3 rounded-sm border border-white/10 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/60">You pay</span>
              <span className="text-xs font-semibold bg-white/10 px-2 py-0.5 rounded-full">USD</span>
            </div>
            <p className="text-2xl font-bold font-mono">$1,500.00</p>
          </div>
          <div className="flex justify-center -my-1">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">↓</div>
          </div>
          <div className="bg-white/5 p-3 rounded-sm border border-white/10 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/60">You receive</span>
              <span className="text-xs font-semibold bg-white/10 px-2 py-0.5 rounded-full">BTC</span>
            </div>
            <p className="text-2xl font-bold font-mono text-emerald-400">0.01642</p>
          </div>
          <div className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-center text-xs">
            Confirm Exchange
          </div>
        </div>
      );

    case "ref-5": // Stripe Express Checkout
      return (
        <div className="bg-white text-black p-4 rounded-sm space-y-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-bold text-gray-500">Total Due</span>
            <span className="text-base font-bold">$149.00</span>
          </div>
          <div className="w-full py-2 bg-black text-white rounded-full text-center text-xs font-semibold">
            Pay with Pay
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-400 justify-center">
            <div className="h-px bg-gray-200 flex-1" />
            <span>Or pay with card</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="bg-gray-50 p-2.5 rounded border border-gray-200 text-xs space-y-1.5">
            <div className="text-gray-400 text-[11px]">Card Number</div>
            <div className="font-mono text-gray-800 text-xs">4242 •••• •••• 4242</div>
            <div className="flex justify-between pt-1 text-[10px] text-gray-500 font-mono">
              <span>08/28</span>
              <span>CVC •••</span>
            </div>
          </div>
        </div>
      );

    case "ref-17": // Apple Music Live Lyrics
      return (
        <div className="space-y-4 text-white">
          <div className="flex items-center gap-2">
            <span className="bg-[#FC3C44] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              LOSSLESS
            </span>
            <span className="bg-white/10 text-white/70 text-[9px] font-semibold px-2 py-0.5 rounded-full">
              DOLBY ATMOS
            </span>
          </div>
          <div className="space-y-2 py-2">
            <p className="text-xs text-white/40">Cause we were just kids when we fell in love</p>
            <p className="text-lg font-bold text-white tracking-tight leading-tight">
              Not knowing what it was...
            </p>
            <p className="text-xs text-white/40">I will not give you up this time</p>
          </div>
          <div className="space-y-1 pt-2">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-white rounded-full" />
            </div>
            <div className="flex justify-between text-[9px] text-white/50 font-mono">
              <span>2:14</span>
              <span>-1:46</span>
            </div>
          </div>
        </div>
      );

    case "ref-18": // Perplexity Pro Search Synthesis
      return (
        <div className="bg-[#181a1b] p-4 rounded-sm border border-white/10 text-white space-y-3">
          <div className="flex items-center gap-2 text-[11px] text-[#20B2AA] font-semibold">
            <div className="w-2 h-2 rounded-full bg-[#20B2AA]" />
            <span>Answer synthesized from 18 web sources</span>
          </div>
          <div className="flex gap-1.5 overflow-hidden">
            <span className="bg-white/5 text-[10px] px-2 py-1 rounded border border-white/10 text-white/80 font-mono truncate">
              [1] bloomberg.com
            </span>
            <span className="bg-white/5 text-[10px] px-2 py-1 rounded border border-white/10 text-white/80 font-mono truncate">
              [2] techcrunch.com
            </span>
          </div>
          <p className="text-xs text-white/85 leading-relaxed">
            The next-generation AI architecture replaces standard transformers with hybrid state-space models [1], achieving 4.2x lower latency [2].
          </p>
          <div className="flex gap-1.5 pt-1">
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] text-white/70">
              Compare benchmark scores →
            </span>
          </div>
        </div>
      );

    case "ref-19": // Airbnb Map Pin Clusters
      return (
        <div className="relative h-full flex flex-col justify-between text-white p-2">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-[#1e232a] opacity-80 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-6 opacity-30 text-[10px] text-white">
              <span>Central Park</span>
              <span>Midtown</span>
              <span>SoHo</span>
              <span>Tribeca</span>
            </div>
          </div>
          <div className="relative flex justify-center gap-3 pt-2">
            <span className="bg-black text-white px-2.5 py-1 rounded-full text-xs font-bold border border-white/20">
              $185
            </span>
            <span className="bg-white text-black px-2.5 py-1 rounded-full text-xs font-bold scale-110">
              $240
            </span>
            <span className="bg-black text-white px-2.5 py-1 rounded-full text-xs font-bold border border-white/20">
              $310
            </span>
          </div>
          <div className="relative bg-white text-black p-3 rounded-sm shadow-none mt-auto">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold">The Industrial Loft</p>
                <p className="text-[10px] text-gray-500">★ 4.98 • Tribeca</p>
              </div>
              <p className="text-sm font-bold font-mono">$240<span className="text-[10px] font-normal text-gray-500">/nt</span></p>
            </div>
          </div>
        </div>
      );

    case "ref-21": // Figma Dev Mode
      return (
        <div className="bg-[#1e1e1e] p-4 rounded-sm border border-white/10 text-white font-mono space-y-2">
          <div className="flex justify-between items-center text-[10px] text-white/50 pb-2 border-b border-white/10">
            <span>CSS Variables</span>
            <span className="text-[#38bdf8]">COPY CODE</span>
          </div>
          <pre className="text-[11px] text-[#e2e8f0] leading-relaxed">
            <span className="text-[#f43f5e]">border-radius</span>: var(<span className="text-[#38bdf8]">--radius-sm</span>, 16px);{"\n"}
            <span className="text-[#f43f5e]">background</span>: var(<span className="text-[#38bdf8]">--color-canvas</span>);{"\n"}
            <span className="text-[#f43f5e]">box-shadow</span>: <span className="text-emerald-400">none</span>;
          </pre>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
            <span className="text-white/60">Layout: flex-col</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-white/70">W: 380px</span>
          </div>
        </div>
      );

    case "ref-23": // Linear Velocity Burnup
      return (
        <div className="bg-[#16171a] p-4 rounded-sm border border-white/10 text-white space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-white/90">Cycle 42 Burnup</span>
            <span className="text-[10px] font-mono text-[#5E6AD2] bg-[#5E6AD2]/15 px-2 py-0.5 rounded-full">
              ON TRACK
            </span>
          </div>
          <div className="h-20 flex items-end gap-1.5 pt-2">
            {[20, 35, 45, 60, 72, 85, 94].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-1 items-center">
                <div
                  className="w-full bg-[#5E6AD2] rounded-t-[2px] transition-all"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-white/50 border-t border-white/10 pt-2 font-mono">
            <span>Scope: 94 pts</span>
            <span className="text-emerald-400">+12 pts velocity</span>
          </div>
        </div>
      );

    case "ref-31": // GitHub Code Diff Review
      return (
        <div className="bg-[#0d1117] p-3 rounded-sm border border-white/10 text-white font-mono text-[10px] space-y-2">
          <div className="flex items-center justify-between text-white/60 border-b border-white/10 pb-1">
            <span>src/tokens.ts</span>
            <span className="text-emerald-400">+4 -1</span>
          </div>
          <div className="space-y-1">
            <div className="bg-red-500/10 text-red-300 px-1 py-0.5 rounded flex items-center gap-1">
              <span className="opacity-50">-</span>
              <span>boxShadow: &apos;0 4px 6px -1px rgb(0 0 0 / 0.1)&apos;</span>
            </div>
            <div className="bg-emerald-500/10 text-emerald-300 px-1 py-0.5 rounded flex items-center gap-1">
              <span className="opacity-50">+</span>
              <span>boxShadow: &apos;none&apos;</span>
            </div>
          </div>
          <div className="bg-[#161b22] p-2 rounded border border-white/10 flex items-center justify-between font-sans">
            <span className="text-white/80 text-[10px]">1 change requested</span>
            <span className="bg-white text-black px-2 py-0.5 rounded-full text-[9px] font-bold">Submit</span>
          </div>
        </div>
      );

    case "ref-32": // Apple Fitness Activity Rings
      return (
        <div className="flex flex-col items-center justify-center p-2 text-white space-y-3">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Concentric rings simulator */}
            <div className="absolute inset-0 rounded-full border-4 border-[#FA114F] opacity-90" />
            <div className="absolute inset-2 rounded-full border-4 border-[#A1F93A] opacity-90" />
            <div className="absolute inset-4 rounded-full border-4 border-[#00FFF7] opacity-90" />
            <span className="text-xs font-bold font-mono">100%</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center w-full pt-1">
            <div className="bg-white/5 p-1.5 rounded">
              <p className="text-[9px] text-[#FA114F] font-bold">MOVE</p>
              <p className="text-xs font-mono font-bold">640</p>
            </div>
            <div className="bg-white/5 p-1.5 rounded">
              <p className="text-[9px] text-[#A1F93A] font-bold">EXERCISE</p>
              <p className="text-xs font-mono font-bold">45m</p>
            </div>
            <div className="bg-white/5 p-1.5 rounded">
              <p className="text-[9px] text-[#00FFF7] font-bold">STAND</p>
              <p className="text-xs font-mono font-bold">12h</p>
            </div>
          </div>
        </div>
      );

    default: // Clean fallback mockup for all other references
      return (
        <div className="space-y-3 text-white">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-squircle flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: s.appIconBg, color: s.appIconColor }}
            >
              {s.appName.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-semibold text-white/90">{s.title}</p>
              <p className="text-[10px] text-white/50">{s.category} • {s.pattern}</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-sm p-3 border border-white/10 space-y-2">
            <div className="h-2 w-3/4 bg-white/20 rounded-full" />
            <div className="h-2 w-1/2 bg-white/15 rounded-full" />
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="h-10 bg-white/10 rounded" />
              <div className="h-10 bg-white/10 rounded" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 text-[11px] text-white/60">
            <span className="bg-white/10 px-2 py-0.5 rounded-full font-mono">{s.tags[0] || "UI Reference"}</span>
            <span>{s.savedCount} saves</span>
          </div>
        </div>
      );
  }
}
