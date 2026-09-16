"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Mail,
  Clock,
  Layers,
  Zap,
  Eye,
  Star,
  ChevronDown,
  Search,
  Users,
  Folder,
  Settings,
  Plus,
  ArrowUpRight,
} from "lucide-react";

// --- HERO: Celestial Horizon Hero ---
export function CelestialHorizonHeroPreview() {
  return (
    <div className="w-full h-full bg-[#02040a] text-white p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between select-none">
      {/* Background Perspective Wireframe Grid */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
        }}
      />

      {/* Right Aurora Light Ray */}
      <div className="absolute top-0 right-0 w-[550px] h-[480px] bg-gradient-to-bl from-blue-600/30 via-blue-500/15 to-transparent blur-3xl pointer-events-none animate-[pulse_7s_ease-in-out_infinite]" />

      {/* Top Floating Navigation */}
      <div className="relative flex items-center justify-between pb-6 border-b border-white/10 z-10 text-sm px-6">
        <div className="flex items-center gap-2 font-bold tracking-tight text-white">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
            <div className="flex flex-col gap-0.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            </div>
            <span className="w-2 h-2 rounded-full bg-blue-400" />
          </div>
          <span className="text-base pl-1 font-mono tracking-tight">.weblocks</span>
        </div>

        <nav className="flex items-center gap-8 text-white/70 text-sm font-normal">
          <span className="text-white hover:text-white cursor-pointer font-medium">Platform</span>
          <span className="hover:text-white cursor-pointer transition-colors">How It Works</span>
          <span className="hover:text-white cursor-pointer transition-colors">Developers</span>
          <span className="hover:text-white cursor-pointer transition-colors">Community</span>
          <span className="hover:text-white cursor-pointer transition-colors">Docs</span>
        </nav>

        <button
          type="button"
          className="h-9 px-5 rounded-full bg-[#0055ff] hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-[0_0_20px_rgba(0,85,255,0.5)]"
        >
          Get Started
        </button>
      </div>

      {/* Main Centered Hero Content */}
      <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center my-auto py-6 z-10">
        {/* Metallic Gradient Dual-Tone Headline */}
        <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-4">
          <span className="bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent block">
            Decentralized Design,
          </span>
          <span className="bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent block">
            Owned by You.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base text-gray-300 max-w-lg mx-auto leading-relaxed font-light mb-8">
          A Web3-native UI platform where design intelligence is transparent, permissionless, and user-owned — not locked inside centralized frameworks.
        </p>

        {/* Action CTAs */}
        <div className="flex items-center justify-center gap-3.5">
          <button
            type="button"
            className="h-11 px-7 rounded-full bg-[#0055ff] hover:bg-blue-600 text-white text-sm font-semibold transition-all shadow-[0_0_25px_rgba(0,85,255,0.6)] active:scale-95"
          >
            Launch App
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-11 px-6 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/15 backdrop-blur transition-all"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Celestial Horizon Curve & Atmosphere Glow with Automatic Animation */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[140%] h-[380px] rounded-[100%] bg-[#010204] border-t-2 border-blue-400/80 shadow-[0_-25px_70px_rgba(37,99,235,0.6),0_-50px_120px_rgba(59,130,246,0.3)] pointer-events-none animate-[pulse_5s_ease-in-out_infinite]">
        {/* Bright rim line */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[1px]" />
      </div>

      {/* Floating Stardust Particles */}
      <div className="absolute bottom-24 left-[43%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping pointer-events-none" />
      <div className="absolute bottom-32 left-[48%] w-2 h-2 bg-blue-400 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-[53%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-28 left-[58%] w-2 h-2 bg-blue-500 rounded-full animate-ping pointer-events-none" />
      <div className="absolute bottom-16 left-[62%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse pointer-events-none" />
    </div>
  );
}

// --- HERO: Dark Perspective Dashboard Hero ---
export function DarkPerspectiveDashboardHeroPreview() {
  return (
    <div className="w-full h-full bg-[#050608] text-white p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between select-none">
      {/* Background ambient stars / glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Twinkling ambient star particles */}
      <div className="absolute top-8 left-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping pointer-events-none" />
      <div className="absolute top-20 left-16 w-2 h-2 bg-white/20 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-16 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-pulse pointer-events-none" />

      {/* Mini top nav */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10 text-sm px-6">
        <div className="flex items-center gap-2 font-bold tracking-tight text-white">
          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center border border-white/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-mono">.weblocks</span>
        </div>
        <div className="flex items-center gap-8 text-white/70 text-sm font-normal">
          <span className="text-white hover:text-white cursor-pointer font-medium">Product</span>
          <span className="hover:text-white cursor-pointer transition-colors">Customers</span>
          <span className="hover:text-white cursor-pointer transition-colors">Log</span>
          <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
          <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="h-8 px-4 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors"
          >
            Login
          </button>
          <button
            type="button"
            className="h-8 px-5 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-200 transition-colors shadow-sm"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-10 items-center my-auto z-10 px-8 py-2">
        {/* Left Column: Copy & Actions */}
        <div className="col-span-6 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="font-medium">Introducing V2.0</span>
          </div>

          {/* Dual-style Headline */}
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12]">
            Upgrade your productivity to <br />
            <span className="font-serif italic font-normal text-white text-5xl lg:text-6xl block mt-1">
              the next level
            </span>
          </h1>

          {/* Body */}
          <p className="text-base text-gray-300 max-w-md leading-relaxed font-light">
            Manage your tasks with zero overhead and keep your focus where it belongs — on the work itself.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3.5 pt-2">
            <button
              type="button"
              className="h-11 px-7 rounded-full bg-white text-black text-sm font-semibold shadow-md hover:bg-gray-100 transition-all active:scale-95"
            >
              Get Started
            </button>
            <button
              type="button"
              className="h-11 px-6 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>

          {/* Customer Logos Row */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-gray-400 text-xs font-mono">
            <span className="font-bold tracking-wider opacity-70">LOGOIPSUM</span>
            <span className="font-semibold opacity-70">◆ LOGOIPSUM</span>
            <span className="opacity-70">● logoipsum</span>
          </div>
        </div>

        {/* Right Column: 3D Perspective Floating Dashboard Mockup */}
        <div className="col-span-6 relative flex items-center justify-center py-2">
          <div
            className="w-full max-w-[500px] animate-[pulse_5s_ease-in-out_infinite]"
            style={{
              perspective: "1000px",
            }}
          >
            <div
              className="w-full bg-[#111216] border border-white/15 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] overflow-hidden transition-transform duration-500 hover:rotate-0"
              style={{
                transform: "rotateY(-14deg) rotateX(10deg) rotateZ(2deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Header Bar */}
              <div className="h-8 bg-[#17181e] border-b border-white/10 px-3 flex items-center justify-between text-[11px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-gray-300">Projects &gt; SaaS</span>
                <span className="text-[10px] text-gray-500 font-mono">⌘K</span>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-12 min-h-[260px]">
                {/* Rail */}
                <div className="col-span-2 bg-[#0c0d10] border-r border-white/10 p-3 flex flex-col items-center justify-between py-4">
                  <div className="space-y-4 flex flex-col items-center">
                    <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400">
                      <Folder className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400">
                    <Settings className="w-4 h-4" />
                  </div>
                </div>

                {/* Subnav */}
                <div className="col-span-5 bg-[#131419] border-r border-white/10 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Projects</span>
                    <span className="text-gray-500">&laquo;</span>
                  </div>
                  <div className="flex bg-[#0a0a0d] p-1 rounded-md text-[11px]">
                    <span className="flex-1 text-center py-1 rounded bg-white/10 text-white font-medium">Team</span>
                    <span className="flex-1 text-center py-1 text-gray-400">Personal</span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="p-2 rounded-lg bg-white/10 border border-white/10 flex items-center justify-between text-xs text-white">
                      <span className="truncate">Dashboard V2</span>
                      <span className="w-4 h-4 rounded-full bg-white/20 text-[9px] flex items-center justify-center font-bold">8</span>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-white/5 flex items-center justify-between text-xs text-gray-400">
                      <span className="truncate">Landing Page</span>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-white/5 flex items-center justify-between text-xs text-gray-400">
                      <span className="truncate">Mobile App</span>
                      <span className="w-4 h-4 rounded-full bg-white/10 text-[9px] flex items-center justify-center font-bold">3</span>
                    </div>
                  </div>
                </div>

                {/* Canvas */}
                <div className="col-span-5 bg-[#0e0f13] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Task List</span>
                    <Plus className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="p-3 rounded-lg bg-[#181920] border border-white/10 space-y-2 shadow-sm">
                      <div className="h-2 w-20 bg-white/30 rounded" />
                      <div className="h-1.5 w-full bg-white/10 rounded" />
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>Due Today</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#181920] border border-white/10 space-y-2 shadow-sm">
                      <div className="h-2 w-16 bg-white/20 rounded" />
                      <div className="h-1.5 w-4/5 bg-white/10 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HERO 0: Dark Parametric Studio Hero ---
export function DarkParametricHeroPreview() {
  return (
    <div className="w-full h-full bg-[#070707] text-white p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between select-none">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 left-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Mini top nav */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10 text-sm px-6">
        <span className="font-bold tracking-tight text-white flex items-center gap-2 text-base font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          .weblocks
        </span>
        <div className="flex items-center gap-8 text-white/70 text-sm font-normal">
          <span className="text-white hover:text-white cursor-pointer font-medium">Home</span>
          <span className="hover:text-white cursor-pointer transition-colors">Sections</span>
          <span className="hover:text-white cursor-pointer transition-colors">Inspirations</span>
          <span className="hover:text-white cursor-pointer transition-colors">About</span>
        </div>
        <button
          type="button"
          className="h-9 px-5 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-200 transition-colors shadow-sm"
        >
          Register
        </button>
      </div>

      {/* Hero Content Grid */}
      <div className="grid grid-cols-12 gap-10 items-center my-auto z-10 px-8 py-2">
        {/* Left Column: Copy & Actions */}
        <div className="col-span-7 space-y-4">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <span className="px-2 py-0.5 rounded-full bg-white text-black text-[9px] font-bold leading-none">
              NEW
            </span>
            <span>Flat 40% off for all users</span>
          </div>

          {/* Dual-Tone Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="text-gray-400 font-semibold block mb-1">Design basics with</span>
            <span className="text-white font-extrabold">principles and laws.</span>
          </h1>

          {/* Body */}
          <p className="text-base text-gray-300 max-w-lg leading-relaxed font-light">
            Production-ready interface sections, verified design references, and typography tokens crafted for craft-focused engineering teams.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center gap-3.5 pt-2">
            <button
              type="button"
              className="h-11 px-7 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 text-black text-sm font-semibold shadow-[0_2px_15px_rgba(255,255,255,0.15)] hover:from-white hover:to-gray-200 transition-all active:scale-95"
            >
              Visit Store
            </button>
            <span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer font-medium pl-2">
              explore.
            </span>
          </div>

          {/* Stats & Social Proof */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-2xl font-bold text-white tracking-tight leading-none">500K</p>
              <p className="text-xs text-gray-400 leading-tight mt-0.5">worldwide users</p>
            </div>
            <div className="flex -space-x-2 overflow-hidden pl-2">
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gradient-to-br from-purple-400 to-indigo-600 text-xs font-bold flex items-center justify-center text-white">
                JD
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gradient-to-br from-pink-500 to-rose-400 text-xs font-bold flex items-center justify-center text-white">
                AK
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold flex items-center justify-center text-white">
                MR
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Automatic Animating 3D Iridescent Parametric Ribbon Sculpture */}
        <div className="col-span-5 relative flex items-center justify-center py-2">
          <div className="relative w-72 h-72 lg:w-80 lg:h-80 flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite]">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-[0_0_35px_rgba(168,85,247,0.45)] animate-[spin_25s_linear_infinite]"
            >
              <defs>
                <linearGradient id="previewIridescent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="30%" stopColor="#818cf8" />
                  <stop offset="60%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = i * 15;
                const rx = 140 + Math.sin(i * 0.5) * 22;
                const ry = 85 + Math.cos(i * 0.5) * 18;
                return (
                  <ellipse
                    key={i}
                    cx="200"
                    cy="200"
                    rx={rx}
                    ry={ry}
                    fill="none"
                    stroke="url(#previewIridescent)"
                    strokeWidth={1.4}
                    strokeOpacity={0.25 + (i % 4) * 0.15}
                    transform={`rotate(${angle}, 200, 200)`}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HERO 1: Minimal SaaS Hero ---
export function MinimalSaaSHeroPreview() {
  return (
    <div className="w-full h-full bg-canvas text-ink p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between select-none">
      {/* Top mini nav */}
      <div className="flex items-center justify-between pb-6 border-b border-hairline-soft text-sm px-6">
        <span className="font-bold tracking-tight text-ink text-base font-mono">
          .weblocks
        </span>
        <div className="flex items-center gap-8 text-muted text-sm font-normal">
          <span className="text-ink font-medium">Overview</span>
          <span className="hover:text-ink cursor-pointer">Components</span>
          <span className="hover:text-ink cursor-pointer">Sections</span>
          <span className="hover:text-ink cursor-pointer">Pricing</span>
        </div>
        <button
          type="button"
          className="h-9 px-5 rounded-full bg-ink text-white text-xs font-semibold hover:bg-ink-soft transition-colors"
        >
          Sign In
        </button>
      </div>

      {/* Center Hero */}
      <div className="w-full text-center flex flex-col items-center my-auto py-4 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field text-xs font-semibold text-ink mb-4">
          <Sparkles className="w-3.5 h-3.5 text-ink" />
          <span>Weblocks 2.0</span>
          <ArrowRight className="w-3 h-3 text-muted" />
        </div>
        <h3 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mb-4 leading-tight max-w-2xl">
          Craft interfaces that feel inevitable.
        </h3>
        <p className="text-base text-muted max-w-lg mb-8 font-normal leading-relaxed">
          The ultimate component & reference library for product designers and frontend engineers.
        </p>
        <div className="flex items-center gap-3.5 mb-8">
          <button
            type="button"
            className="h-11 px-7 rounded-full bg-ink text-white text-sm font-semibold transition-colors hover:bg-ink-soft active:scale-95"
          >
            Start exploring
          </button>
          <button
            type="button"
            className="h-11 px-6 rounded-full bg-field hover:bg-canvas-soft text-ink text-sm font-semibold transition-colors"
          >
            View plans
          </button>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <div className="flex -space-x-2 overflow-hidden">
            <span className="inline-block h-7 w-7 rounded-full bg-slate-200 border-2 border-white text-[9px] flex items-center justify-center font-bold text-slate-800">AK</span>
            <span className="inline-block h-7 w-7 rounded-full bg-slate-300 border-2 border-white text-[9px] flex items-center justify-center font-bold text-slate-900">JR</span>
            <span className="inline-block h-7 w-7 rounded-full bg-slate-400 border-2 border-white text-[9px] flex items-center justify-center font-bold text-white">LM</span>
          </div>
          <span>Trusted by 4,200+ designers and engineers</span>
        </div>
      </div>

      {/* Bottom faint border */}
      <div className="h-2 w-full border-t border-hairline-soft" />
    </div>
  );
}

// --- HERO 2: Split Waitlist Hero ---
export function SplitWaitlistHeroPreview() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full h-full bg-canvas text-ink p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between select-none">
      {/* Mini top nav */}
      <div className="flex items-center justify-between pb-6 border-b border-hairline-soft text-sm px-6">
        <span className="font-bold tracking-tight text-ink text-base font-mono">
          .weblocks <span className="text-xs text-muted font-normal">/ beta</span>
        </span>
        <span className="text-xs text-muted font-mono">INVITE ONLY</span>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-12 gap-12 items-center my-auto z-10 px-8 py-4">
        <div className="col-span-7 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-field text-xs font-semibold text-ink">
            Private Beta
          </span>
          <h4 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Design faster with verified patterns.
          </h4>
          <p className="text-base text-muted max-w-lg leading-relaxed">
            Inspect production flows, typography breakdowns, and UI tokens from disciplined products.
          </p>
          {submitted ? (
            <div className="flex items-center gap-2 text-sm text-ink font-semibold pt-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Priority access confirmed! Check your inbox soon.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex items-center gap-2 pt-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="h-11 px-4 rounded-full bg-canvas-soft border border-hairline text-sm text-ink w-72 focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-full bg-ink text-white text-sm font-semibold shrink-0"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>

        <div className="col-span-5 bg-canvas-soft rounded-2xl p-6 space-y-4 border border-hairline-soft">
          <div className="flex items-center justify-between text-xs font-semibold text-ink">
            <span>Token Specification</span>
            <span className="bg-white px-2 py-0.5 rounded text-muted font-mono">v2.4</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-hairline-soft">
              <span className="text-muted block text-xs">Headlines Weight</span>
              <span className="font-bold text-ink text-lg">652</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-hairline-soft">
              <span className="text-muted block text-xs">Body Weight</span>
              <span className="font-bold text-ink text-lg">456</span>
            </div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-hairline-soft flex items-center justify-between text-xs text-muted">
            <span>Zero Shadows Surface Contrast</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>

      <div className="h-2 w-full border-t border-hairline-soft" />
    </div>
  );
}

// --- FOOTER 1: Multi-Column Modern Footer ---
export function MulticolumnModernFooterPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-8 border-b border-white/10">
        <div>
          <h4 className="text-2xl font-bold tracking-tight text-white mb-1">Stay updated with Weblocks.</h4>
          <p className="text-sm text-gray-400">Get weekly curated interface patterns directly to your inbox.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-10 px-4 rounded-full bg-white/5 border border-white/15 text-xs text-white w-64 focus:outline-none"
          />
          <button type="button" className="h-10 px-5 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-200 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Multi-column Grid */}
      <div className="grid grid-cols-5 gap-8 py-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center text-xs font-bold">
              W
            </div>
            <span className="text-base font-bold text-white">Weblocks</span>
          </div>
          <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">
            Curated reference system and UI blocks for makers and engineering teams.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Product</span>
          <div className="text-xs text-gray-400 flex flex-col space-y-1.5">
            <span className="hover:text-white cursor-pointer">Sections</span>
            <span className="hover:text-white cursor-pointer">Components</span>
            <span className="hover:text-white cursor-pointer">Templates</span>
            <span className="hover:text-white cursor-pointer">Tokens</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Resources</span>
          <div className="text-xs text-gray-400 flex flex-col space-y-1.5">
            <span className="hover:text-white cursor-pointer">Design System</span>
            <span className="hover:text-white cursor-pointer">Typography Specs</span>
            <span className="hover:text-white cursor-pointer">Documentation</span>
            <span className="hover:text-white cursor-pointer">Inspirations</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Developers</span>
          <div className="text-xs text-gray-400 flex flex-col space-y-1.5">
            <span className="hover:text-white cursor-pointer">React SDK</span>
            <span className="hover:text-white cursor-pointer">Tailwind Config</span>
            <span className="hover:text-white cursor-pointer">GitHub Repo</span>
            <span className="hover:text-white cursor-pointer">API Keys</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Company</span>
          <div className="text-xs text-gray-400 flex flex-col space-y-1.5">
            <span className="hover:text-white cursor-pointer">About Us</span>
            <span className="hover:text-white cursor-pointer">Changelog</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
        <span>© 2026 Weblocks Inc. All rights reserved.</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          All systems operational
        </span>
      </div>
    </div>
  );
}

// --- FOOTER 2: Minimal Studio Footer ---
export function MinimalStudioFooterPreview() {
  return (
    <div className="w-full h-full bg-canvas text-ink p-12 lg:p-16 relative overflow-hidden flex flex-col justify-between select-none">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs text-muted font-mono uppercase tracking-widest">Weblocks Studio</span>
          <h4 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mt-2 mb-3">Weblocks.</h4>
          <p className="text-base text-muted max-w-md font-light leading-relaxed">
            Crafted with intention, discipline, and zero drop shadows.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold text-muted pt-4">
          <span className="hover:text-ink cursor-pointer">Twitter / X</span>
          <span className="hover:text-ink cursor-pointer">GitHub</span>
          <span className="hover:text-ink cursor-pointer">Discord</span>
          <span className="hover:text-ink cursor-pointer">Substack</span>
        </div>
      </div>

      <div className="pt-8 border-t border-hairline-soft flex items-center justify-between text-xs text-muted font-mono">
        <span>M Saans 652 / Inter Variable 456</span>
        <span>Tokyo & San Francisco</span>
      </div>
    </div>
  );
}

// --- CONTACT: Direct Inquiry Contact ---
export function DirectInquiryContactPreview() {
  return (
    <div className="w-full h-full bg-canvas text-ink p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center select-none">
      <div className="grid grid-cols-12 gap-12 items-center max-w-5xl mx-auto w-full">
        <div className="col-span-5 space-y-4">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Contact</span>
          <h4 className="text-4xl lg:text-5xl font-extrabold text-ink leading-tight">Let&apos;s build together.</h4>
          <p className="text-sm text-muted leading-relaxed">
            Have questions about custom component integration or high-volume teams? Drop us a line.
          </p>
          <div className="space-y-2 pt-2 text-sm text-muted">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-ink shrink-0" />
              <span className="font-mono">team@weblocks.design</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-ink shrink-0" />
              <span>&lt; 4 hr standard response time</span>
            </div>
          </div>
        </div>

        <div className="col-span-7 bg-canvas-soft rounded-2xl p-6 space-y-3.5 border border-hairline-soft">
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 bg-white rounded-lg px-3 text-xs flex items-center text-muted border border-hairline-soft">Alex Chen</div>
            <div className="h-10 bg-white rounded-lg px-3 text-xs flex items-center text-muted border border-hairline-soft">alex@company.com</div>
          </div>
          <div className="h-20 bg-white rounded-lg p-3 text-xs text-muted border border-hairline-soft">
            Tell us about your project scope, timeline, or token requirements...
          </div>
          <button
            type="button"
            className="w-full h-11 rounded-full bg-ink text-white text-xs font-semibold hover:bg-ink-soft transition-colors"
          >
            Send inquiry
          </button>
        </div>
      </div>
    </div>
  );
}

// --- FEATURES: Bento Grid Features ---
export function BentoGridFeaturesPreview() {
  return (
    <div className="w-full h-full bg-canvas text-ink p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center select-none">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">Architecture</span>
        <h4 className="text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mt-1">
          Built for speed and precision.
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        <div className="p-6 rounded-2xl bg-canvas-soft border border-hairline-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-ink shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <h5 className="text-lg font-bold text-ink">Token Architecture</h5>
          <p className="text-xs text-muted leading-relaxed">
            Strict optical weights: 652 for headlines and 456 for body text. Perfect optical balance.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-canvas-soft border border-hairline-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-ink shadow-xs">
            <Zap className="w-5 h-5" />
          </div>
          <h5 className="text-lg font-bold text-ink">Zero Extra Dependencies</h5>
          <p className="text-xs text-muted leading-relaxed">
            Copy and paste clean Tailwind CSS and TypeScript components straight into Next.js 15.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-canvas-soft border border-hairline-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-ink shadow-xs">
            <Eye className="w-5 h-5" />
          </div>
          <h5 className="text-lg font-bold text-ink">Zero Drop Shadows</h5>
          <p className="text-xs text-muted leading-relaxed">
            Disciplined surfaces relying exclusively on 1px hairline borders and deliberate surface contrasts.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- PRICING: Tiered Billing Pricing ---
export function TieredBillingPricingPreview() {
  return (
    <div className="w-full h-full bg-canvas text-ink p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center select-none">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">Plans</span>
        <h4 className="text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mt-1">
          Simple, transparent pricing.
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto w-full items-center">
        <div className="p-6 rounded-2xl bg-canvas-soft border border-hairline-soft space-y-4 text-center">
          <span className="text-xs font-semibold text-muted uppercase">Starter</span>
          <div className="text-3xl font-extrabold text-ink">$0</div>
          <p className="text-xs text-muted">Free forever for personal prototyping.</p>
          <button
            type="button"
            className="w-full h-9 rounded-full bg-field text-xs font-semibold text-ink hover:bg-canvas-soft transition-colors"
          >
            Get Started
          </button>
        </div>

        <div className="p-7 rounded-2xl bg-ink text-white space-y-4 text-center relative shadow-xl scale-105">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold text-white uppercase tracking-wider">
            Most Popular
          </span>
          <span className="text-xs font-semibold text-gray-300 uppercase">Pro</span>
          <div className="text-4xl font-extrabold text-white">
            $19<span className="text-sm font-normal text-gray-400">/mo</span>
          </div>
          <p className="text-xs text-gray-300">Full access to 100+ production sections & tokens.</p>
          <button
            type="button"
            className="w-full h-10 rounded-full bg-white text-ink text-xs font-semibold hover:bg-gray-100 transition-colors"
          >
            Join Pro
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-canvas-soft border border-hairline-soft space-y-4 text-center">
          <span className="text-xs font-semibold text-muted uppercase">Team</span>
          <div className="text-3xl font-extrabold text-ink">$49<span className="text-xs font-normal text-muted">/mo</span></div>
          <p className="text-xs text-muted">Collaborative licenses for design and dev teams.</p>
          <button
            type="button"
            className="w-full h-9 rounded-full bg-field text-xs font-semibold text-ink hover:bg-canvas-soft transition-colors"
          >
            Upgrade Team
          </button>
        </div>
      </div>
    </div>
  );
}

// --- TESTIMONIALS: Customer Quotes Grid ---
export function CustomerQuotesGridPreview() {
  return (
    <div className="w-full h-full bg-canvas text-ink p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center select-none">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">Testimonials</span>
        <h4 className="text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mt-1">
          Loved by craft-obsessed builders.
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
        <div className="p-6 rounded-2xl bg-canvas-soft border border-hairline-soft space-y-3">
          <div className="flex gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <p className="text-base text-ink leading-relaxed font-normal">
            &quot;Weblocks cut our team&apos;s frontend prototyping time in half. The zero-shadow aesthetic fits our brand perfectly.&quot;
          </p>
          <span className="text-xs text-muted block font-semibold">— Sarah J., Head of Product at Vektor</span>
        </div>

        <div className="p-6 rounded-2xl bg-canvas-soft border border-hairline-soft space-y-3">
          <div className="flex gap-1 text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <p className="text-base text-ink leading-relaxed font-normal">
            &quot;Clean, disciplined, and genuinely production-ready. The optical font weights give our app an instant editorial feel.&quot;
          </p>
          <span className="text-xs text-muted block font-semibold">— Marcus A., Design Technologist at Prism</span>
        </div>
      </div>
    </div>
  );
}

// --- FAQ: Accordion FAQ ---
export function AccordionFAQPreview() {
  return (
    <div className="w-full h-full bg-canvas text-ink p-10 lg:p-14 relative overflow-hidden flex flex-col justify-center select-none">
      <div className="max-w-3xl mx-auto w-full space-y-4">
        <div className="text-center mb-6">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">FAQ</span>
          <h4 className="text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mt-1">
            Frequently Asked Questions
          </h4>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl bg-canvas-soft border border-hairline-soft p-4 flex items-center justify-between text-sm font-semibold text-ink">
            <span>Can I use these sections in commercial client projects?</span>
            <ChevronDown className="w-4 h-4 text-muted" />
          </div>
          <div className="rounded-xl bg-canvas-soft border border-hairline-soft p-4 flex items-center justify-between text-sm font-semibold text-ink">
            <span>How do optical font weights (652 headline / 456 body) work?</span>
            <ChevronDown className="w-4 h-4 text-muted" />
          </div>
          <div className="rounded-xl bg-canvas-soft border border-hairline-soft p-4 flex items-center justify-between text-sm font-semibold text-ink">
            <span>Do I need any external CSS framework or component library?</span>
            <ChevronDown className="w-4 h-4 text-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- CTA: High Impact Banner CTA ---
export function HighImpactBannerCTAPreview() {
  return (
    <div className="w-full h-full bg-canvas text-ink p-10 lg:p-14 relative overflow-hidden flex items-center justify-center select-none">
      <div className="w-full max-w-4xl bg-ink text-white rounded-3xl p-10 lg:p-12 text-center flex flex-col items-center justify-center space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_70%)] pointer-events-none" />
        <span className="text-xs font-semibold text-gray-300 bg-white/10 px-3 py-1 rounded-full">
          30-day money-back guarantee
        </span>
        <h4 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight max-w-xl">
          Ready to elevate your product interface design?
        </h4>
        <p className="text-sm text-gray-300 max-w-md font-light">
          Join thousands of designers and frontend engineers shipping faster with Weblocks.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            className="h-11 px-7 rounded-full bg-white text-ink text-xs font-semibold hover:bg-gray-100 transition-all active:scale-95"
          >
            Get full access
          </button>
          <button
            type="button"
            className="h-11 px-6 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
          >
            Read documentation
          </button>
        </div>
      </div>
    </div>
  );
}

// Master Dispatcher
export function RenderSectionPreview({ slug }: { slug: string }) {
  switch (slug) {
    case "celestial-horizon-hero":
      return <CelestialHorizonHeroPreview />;
    case "dark-perspective-dashboard-hero":
      return <DarkPerspectiveDashboardHeroPreview />;
    case "dark-parametric-hero":
      return <DarkParametricHeroPreview />;
    case "minimal-saas-hero":
      return <MinimalSaaSHeroPreview />;
    case "split-waitlist-hero":
      return <SplitWaitlistHeroPreview />;
    case "multicolumn-modern-footer":
      return <MulticolumnModernFooterPreview />;
    case "minimal-studio-footer":
      return <MinimalStudioFooterPreview />;
    case "direct-inquiry-contact":
      return <DirectInquiryContactPreview />;
    case "bento-grid-features":
      return <BentoGridFeaturesPreview />;
    case "tiered-billing-pricing":
      return <TieredBillingPricingPreview />;
    case "customer-quotes-grid":
      return <CustomerQuotesGridPreview />;
    case "accordion-faq":
      return <AccordionFAQPreview />;
    case "high-impact-banner-cta":
      return <HighImpactBannerCTAPreview />;
    default:
      return (
        <div className="p-4 text-center text-muted text-caption">
          Preview unavailable
        </div>
      );
  }
}
