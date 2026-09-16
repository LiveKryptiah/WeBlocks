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
              <span className="text-white/80">AWS Cloud</span>
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

    default: // Generic High-Fidelity UI Layout
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
