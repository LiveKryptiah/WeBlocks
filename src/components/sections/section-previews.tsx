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
    <div className="w-full bg-[#02040a] text-white rounded-2xl p-5 sm:p-8 lg:p-10 border border-white/10 relative overflow-hidden shadow-2xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
      {/* Background Perspective Wireframe Grid */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
        }}
      />

      {/* Right Aurora Light Ray */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-[400px] bg-gradient-to-bl from-blue-600/25 via-blue-500/10 to-transparent blur-3xl pointer-events-none animate-[pulse_7s_ease-in-out_infinite]" />

      {/* Top Floating Navigation */}
      <div className="relative flex items-center justify-between pb-4 border-b border-white/10 z-10">
        <div className="flex items-center gap-2 font-bold tracking-tight text-white">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <div className="flex flex-col gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </div>
          <span className="text-sm pl-1">.weblocks</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-white/60 text-xs font-normal">
          <span className="text-white hover:text-white cursor-pointer font-medium">Platform</span>
          <span className="hover:text-white cursor-pointer transition-colors">How It Works</span>
          <span className="hover:text-white cursor-pointer transition-colors">Developers</span>
          <span className="hover:text-white cursor-pointer transition-colors">Community</span>
          <span className="hover:text-white cursor-pointer transition-colors">Docs</span>
        </nav>

        <button
          type="button"
          className="h-7 px-3.5 rounded-full bg-[#0055ff] hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(0,85,255,0.45)] hover:shadow-[0_0_20px_rgba(0,85,255,0.6)]"
        >
          Get Started
        </button>
      </div>

      {/* Main Centered Hero Content */}
      <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center py-8 sm:py-12 z-10">
        {/* Metallic Gradient Dual-Tone Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-4">
          <span className="bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent block">
            Decentralized Design,
          </span>
          <span className="bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent block">
            Owned by You.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-400 max-w-lg mx-auto leading-relaxed font-light mb-6">
          A Web3-native UI platform where design intelligence is transparent, permissionless, and user-owned — not locked inside centralized frameworks.
        </p>

        {/* Action CTAs */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            className="h-9 sm:h-10 px-6 rounded-full bg-[#0055ff] hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(0,85,255,0.5)] active:scale-95"
          >
            Launch App
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-9 sm:h-10 px-5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/15 backdrop-blur transition-all"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Celestial Horizon Curve & Atmosphere Glow with Automatic Animation */}
      <div className="absolute -bottom-36 sm:-bottom-48 left-1/2 -translate-x-1/2 w-[150%] sm:w-[125%] h-[280px] sm:h-[360px] rounded-[100%] bg-[#010204] border-t-2 border-blue-400/80 shadow-[0_-20px_60px_rgba(37,99,235,0.5),0_-40px_100px_rgba(59,130,246,0.25)] pointer-events-none animate-[pulse_5s_ease-in-out_infinite]">
        {/* Bright rim line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[1px]" />
      </div>

      {/* Floating Stardust Particles */}
      <div className="absolute bottom-20 left-[44%] w-1 h-1 bg-cyan-400 rounded-full animate-ping pointer-events-none" />
      <div className="absolute bottom-24 left-[47%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-16 left-[52%] w-1 h-1 bg-cyan-300 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-22 left-[55%] w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping pointer-events-none" />
      <div className="absolute bottom-14 left-[59%] w-1 h-1 bg-blue-300 rounded-full animate-pulse pointer-events-none" />
    </div>
  );
}

// --- HERO: Dark Perspective Dashboard Hero ---
export function DarkPerspectiveDashboardHeroPreview() {
  return (
    <div className="w-full bg-[#050608] text-white rounded-2xl p-5 sm:p-8 lg:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
      {/* Background ambient stars / glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Twinkling ambient star particles */}
      <div className="absolute top-6 left-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping pointer-events-none" />
      <div className="absolute top-16 left-12 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-12 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-8 w-1 h-1 bg-white/30 rounded-full animate-pulse pointer-events-none" />

      {/* Mini top nav */}
      <div className="flex items-center justify-between pb-4 mb-6 sm:mb-8 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 font-bold tracking-tight text-white">
          <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center border border-white/20 shadow-sm">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm">.weblocks</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-white/60 text-xs font-normal">
          <span className="text-white hover:text-white cursor-pointer font-medium">Product</span>
          <span className="hover:text-white cursor-pointer transition-colors">Customers</span>
          <span className="hover:text-white cursor-pointer transition-colors">Log</span>
          <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
          <span className="hover:text-white cursor-pointer transition-colors">Company</span>
          <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-7 px-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors"
          >
            Login
          </button>
          <button
            type="button"
            className="h-7 px-3.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-200 transition-colors shadow-sm"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="font-medium">Introducing V2.0</span>
          </div>

          {/* Dual-style Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12]">
            Upgrade your productivity to <br />
            <span className="font-serif italic font-normal text-white text-3xl sm:text-5xl lg:text-6xl block mt-1">
              the next level
            </span>
          </h1>

          {/* Body */}
          <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed font-light">
            Manage your tasks with zero overhead and keep your focus where it belongs — on the work itself.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              className="h-9 sm:h-10 px-6 rounded-full bg-white text-black text-xs sm:text-sm font-semibold shadow-md hover:bg-gray-100 transition-all active:scale-95"
            >
              Get Started
            </button>
            <button
              type="button"
              className="h-9 sm:h-10 px-5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>

          {/* Customer Logos Row */}
          <div className="pt-6 border-t border-white/10 space-y-2">
            <p className="text-xs text-gray-500 font-medium">Meet our customers</p>
            <div className="flex items-center gap-5 sm:gap-7 text-gray-400 text-xs">
              <span className="font-bold tracking-wider opacity-70">LOGOIPSUM</span>
              <span className="font-semibold opacity-70">◆ LOGOIPSUM</span>
              <span className="font-light tracking-widest uppercase opacity-70">Logoipsum</span>
              <span className="font-mono opacity-70">● logoipsum</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Perspective Floating Dashboard Mockup with Automatic Float Animation */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[260px] sm:min-h-[340px] py-2">
          <div
            className="w-full max-w-md lg:max-w-lg animate-[pulse_5s_ease-in-out_infinite]"
            style={{
              perspective: "900px",
            }}
          >
            <div
              className="w-full bg-[#111216] border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-transform duration-500 hover:rotate-0"
              style={{
                transform: "rotateY(-15deg) rotateX(10deg) rotateZ(2deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Header Bar */}
              <div className="h-7 bg-[#17181e] border-b border-white/10 px-3 flex items-center justify-between text-[10px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <div className="w-2 h-2 rounded-full bg-green-500/70" />
                </div>
                <span className="text-[10px] text-gray-400 font-mono truncate px-2">Projects &gt; Task Management - SaaS</span>
                <span className="text-[9px] text-gray-500 font-mono">⌘K</span>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-12 min-h-[200px]">
                {/* Rail */}
                <div className="col-span-2 bg-[#0c0d10] border-r border-white/10 p-2 flex flex-col items-center justify-between py-3">
                  <div className="space-y-3 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white">
                      <Users className="w-3 h-3" />
                    </div>
                    <div className="w-6 h-6 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400">
                      <Folder className="w-3 h-3" />
                    </div>
                    <div className="w-6 h-6 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400">
                      <Mail className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400">
                    <Settings className="w-3 h-3" />
                  </div>
                </div>

                {/* Subnav */}
                <div className="col-span-5 bg-[#131419] border-r border-white/10 p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Projects</span>
                    <span className="text-[10px] text-gray-500">&laquo;</span>
                  </div>
                  <div className="flex bg-[#0a0a0d] p-0.5 rounded text-[10px]">
                    <span className="flex-1 text-center py-0.5 rounded bg-white/10 text-white font-medium">Team</span>
                    <span className="flex-1 text-center py-0.5 text-gray-400">Personal</span>
                  </div>
                  <div className="relative">
                    <Search className="w-3 h-3 text-gray-500 absolute left-2 top-2" />
                    <input
                      readOnly
                      placeholder="Search..."
                      className="w-full bg-[#0a0a0d] border border-white/5 rounded px-2 pl-6 py-1 text-[10px] text-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-[9px] text-gray-500 font-medium">Recent</span>
                    <div className="p-1.5 rounded bg-white/10 border border-white/10 flex items-center justify-between text-[10px] text-white">
                      <span className="truncate">Dashboard Project - SaaS</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-[8px] flex items-center justify-center font-bold">8</span>
                    </div>
                    <div className="p-1.5 rounded hover:bg-white/5 flex items-center justify-between text-[10px] text-gray-400">
                      <span className="truncate">Landing Page - Redesign</span>
                    </div>
                    <div className="p-1.5 rounded hover:bg-white/5 flex items-center justify-between text-[10px] text-gray-400">
                      <span className="truncate">App Development</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-white/10 text-[8px] flex items-center justify-center font-bold">3</span>
                    </div>
                  </div>
                </div>

                {/* Canvas */}
                <div className="col-span-5 bg-[#0e0f13] p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                    <span>Dashboard Project</span>
                    <Plus className="w-3 h-3 text-gray-400 cursor-pointer" />
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] font-medium text-gray-400">To Do</div>
                    <div className="p-2 rounded-lg bg-[#181920] border border-white/10 space-y-1.5 shadow-sm">
                      <div className="h-2 w-16 bg-white/25 rounded" />
                      <div className="h-1.5 w-full bg-white/10 rounded" />
                      <div className="h-1.5 w-4/5 bg-white/10 rounded" />
                      <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>Today</span>
                        </div>
                        <span className="w-3 h-3 rounded-full bg-purple-500/40 text-[7px] flex items-center justify-center">●</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#181920] border border-white/10 space-y-1.5 shadow-sm">
                      <div className="h-2 w-12 bg-white/20 rounded" />
                      <div className="h-1.5 w-3/4 bg-white/10 rounded" />
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
    <div className="w-full bg-[#070707] text-white rounded-2xl p-5 sm:p-8 lg:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 left-1/4 w-60 h-60 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Mini top nav */}
      <div className="flex items-center justify-between pb-4 mb-6 sm:mb-8 border-b border-white/10 text-xs">
        <span className="font-bold tracking-tight text-white flex items-center gap-1.5 text-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          .weblocks
        </span>
        <div className="hidden md:flex items-center gap-6 text-white/60 text-xs font-normal">
          <span className="text-white hover:text-white cursor-pointer font-medium">Home</span>
          <span className="hover:text-white cursor-pointer transition-colors">Sections</span>
          <span className="hover:text-white cursor-pointer transition-colors">Inspirations</span>
          <span className="hover:text-white cursor-pointer transition-colors">About</span>
        </div>
        <button
          type="button"
          className="h-7 px-3.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-200 transition-colors shadow-sm"
        >
          Register
        </button>
      </div>

      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5 z-10">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <span className="px-1.5 py-0.5 rounded-full bg-white text-black text-[9px] font-bold leading-none">
              NEW
            </span>
            <span>Flat 40% off for all users</span>
          </div>

          {/* Dual-Tone Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
            <span className="text-gray-400 font-semibold block mb-1">Design basics with</span>
            <span className="text-white font-bold">principles and laws.</span>
          </h1>

          {/* Body */}
          <p className="text-xs sm:text-sm lg:text-base text-gray-400 max-w-lg leading-relaxed font-light">
            Production-ready interface sections, verified design references, and typography tokens crafted for craft-focused engineering teams.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              className="h-9 sm:h-10 px-6 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 text-black text-xs sm:text-sm font-semibold shadow-[0_2px_15px_rgba(255,255,255,0.15)] hover:from-white hover:to-gray-200 transition-all active:scale-95"
            >
              Visit Store
            </button>
            <span className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer font-medium">
              explore.
            </span>
          </div>

          {/* Stats & Social Proof */}
          <div className="flex items-center gap-5 pt-4 border-t border-white/10">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">500K</p>
              <p className="text-xs text-gray-400 leading-tight mt-0.5">worldwide users</p>
            </div>
            <div className="flex -space-x-2 overflow-hidden pl-2">
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gradient-to-br from-purple-400 to-indigo-600 text-xs font-bold flex items-center justify-center text-white shadow-sm">
                JD
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gradient-to-br from-pink-500 to-rose-400 text-xs font-bold flex items-center justify-center text-white shadow-sm">
                AK
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold flex items-center justify-center text-white shadow-sm">
                MR
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Automatic Animating 3D Iridescent Parametric Ribbon Sculpture */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[240px] sm:min-h-[300px]">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite]">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-[0_0_35px_rgba(168,85,247,0.4)] animate-[spin_25s_linear_infinite]"
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
    <div className="w-full text-center flex flex-col items-center py-3">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-field text-[11px] font-semibold text-ink mb-2.5">
        <Sparkles className="w-3 h-3 text-ink" />
        <span>Weblocks 2.0</span>
        <ArrowRight className="w-2.5 h-2.5 text-muted" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink mb-1.5 leading-tight max-w-sm">
        Craft interfaces that feel inevitable.
      </h3>
      <p className="text-[11px] text-muted max-w-xs mb-3 font-normal leading-relaxed">
        The ultimate component & reference library for product designers and frontend engineers.
      </p>
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          className="h-7 px-3.5 rounded-full bg-ink text-white text-[11px] font-semibold transition-colors hover:bg-ink-soft"
        >
          Start exploring
        </button>
        <button
          type="button"
          className="h-7 px-3.5 rounded-full bg-field hover:bg-canvas-soft text-ink text-[11px] font-semibold transition-colors"
        >
          View plans
        </button>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-muted">
        <div className="flex -space-x-1.5 overflow-hidden">
          <span className="inline-block h-5 w-5 rounded-full bg-slate-200 border border-white text-[8px] flex items-center justify-center font-bold text-slate-800">AK</span>
          <span className="inline-block h-5 w-5 rounded-full bg-slate-300 border border-white text-[8px] flex items-center justify-center font-bold text-slate-900">JR</span>
          <span className="inline-block h-5 w-5 rounded-full bg-slate-400 border border-white text-[8px] flex items-center justify-center font-bold text-white">LM</span>
        </div>
        <span>Trusted by 4,200+ designers</span>
      </div>
    </div>
  );
}

// --- HERO 2: Split Waitlist Hero ---
export function SplitWaitlistHeroPreview() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-2">
      <div className="sm:col-span-7 space-y-2">
        <span className="inline-block px-2 py-0.5 rounded-full bg-field text-[10px] font-semibold text-ink">
          Private Beta
        </span>
        <h4 className="text-sm sm:text-base font-bold tracking-tight text-ink leading-snug">
          Design faster with verified patterns.
        </h4>
        <p className="text-[11px] text-muted line-clamp-2">
          Inspect production flows, typography breakdowns, and UI tokens from disciplined products.
        </p>
        {submitted ? (
          <div className="flex items-center gap-1.5 text-[11px] text-ink font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Priority access confirmed!</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex items-center gap-1.5 pt-1"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="h-7 px-2.5 rounded-full bg-canvas-soft border border-hairline-soft text-[11px] text-ink w-36 focus:outline-none"
            />
            <button
              type="submit"
              className="h-7 px-3 rounded-full bg-ink text-white text-[11px] font-semibold shrink-0"
            >
              Join
            </button>
          </form>
        )}
      </div>

      <div className="sm:col-span-5 bg-canvas-soft rounded-lg p-3 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-semibold text-ink">
          <span>Token Spec</span>
          <span className="bg-white px-1.5 py-0.5 rounded text-muted">v2.4</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="bg-white p-1.5 rounded">
            <span className="text-muted block text-[9px]">Headlines</span>
            <span className="font-bold text-ink">652</span>
          </div>
          <div className="bg-white p-1.5 rounded">
            <span className="text-muted block text-[9px]">Body</span>
            <span className="font-bold text-ink">456</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- FOOTER 1: Multi-Column Modern Footer ---
export function MulticolumnModernFooterPreview() {
  return (
    <div className="w-full space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-ink text-white flex items-center justify-center text-[10px] font-bold">
              W
            </div>
            <span className="text-xs font-bold text-ink">Weblocks</span>
          </div>
          <p className="text-[11px] text-muted max-w-[170px] leading-tight">
            Curated reference system and UI blocks for makers.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-[10px]">
          <div className="space-y-1">
            <span className="font-bold text-ink">Product</span>
            <div className="text-muted flex flex-col space-y-0.5">
              <span className="hover:text-ink cursor-pointer">Sections</span>
              <span className="hover:text-ink cursor-pointer">Components</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-ink">Company</span>
            <div className="text-muted flex flex-col space-y-0.5">
              <span className="hover:text-ink cursor-pointer">Tokens</span>
              <span className="hover:text-ink cursor-pointer">Changelog</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-hairline-soft flex items-center justify-between text-[10px] text-muted">
        <span>© 2026 Weblocks</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          All operational
        </span>
      </div>
    </div>
  );
}

// --- FOOTER 2: Minimal Studio Footer ---
export function MinimalStudioFooterPreview() {
  return (
    <div className="w-full space-y-3 py-2.5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold tracking-tight text-ink mb-0.5">Weblocks.</h4>
          <p className="text-[11px] text-muted">Crafted with intention and discipline.</p>
        </div>
        <div className="flex items-center gap-2.5 text-[10px] font-semibold text-muted">
          <span className="hover:text-ink cursor-pointer">Twitter</span>
          <span className="hover:text-ink cursor-pointer">GitHub</span>
          <span className="hover:text-ink cursor-pointer">Discord</span>
        </div>
      </div>

      <div className="pt-2 border-t border-hairline-soft flex items-center justify-between text-[10px] text-muted">
        <span>M Saans & Inter Variable</span>
        <span>Tokyo & San Francisco</span>
      </div>
    </div>
  );
}

// --- CONTACT: Direct Inquiry Contact ---
export function DirectInquiryContactPreview() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center py-2">
      <div className="sm:col-span-5 space-y-2">
        <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Contact</span>
        <h4 className="text-sm font-bold text-ink leading-tight">Let's build together.</h4>
        <div className="space-y-1 text-[11px] text-muted">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-ink shrink-0" />
            <span>team@weblocks.design</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-ink shrink-0" />
            <span>&lt; 4 hr response time</span>
          </div>
        </div>
      </div>

      <div className="sm:col-span-7 bg-canvas-soft rounded-lg p-2.5 space-y-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-6 bg-white rounded px-2 text-[10px] flex items-center text-muted">Alex Chen</div>
          <div className="h-6 bg-white rounded px-2 text-[10px] flex items-center text-muted">alex@co.com</div>
        </div>
        <div className="h-8 bg-white rounded p-1.5 text-[10px] text-muted">Project scope & timeline...</div>
        <button
          type="button"
          className="w-full h-6 rounded-full bg-ink text-white text-[10px] font-semibold"
        >
          Send inquiry
        </button>
      </div>
    </div>
  );
}

// --- FEATURES: Bento Grid Features ---
export function BentoGridFeaturesPreview() {
  return (
    <div className="w-full grid grid-cols-3 gap-2 py-2">
      <div className="p-2.5 rounded-lg bg-canvas-soft space-y-1.5">
        <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-ink">
          <Layers className="w-3 h-3" />
        </div>
        <h5 className="text-[11px] font-bold text-ink leading-tight">Tokens</h5>
        <p className="text-[10px] text-muted leading-tight">Weights 652 & 456</p>
      </div>

      <div className="p-2.5 rounded-lg bg-canvas-soft space-y-1.5">
        <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-ink">
          <Zap className="w-3 h-3" />
        </div>
        <h5 className="text-[11px] font-bold text-ink leading-tight">Copy-Paste</h5>
        <p className="text-[10px] text-muted leading-tight">Pure Tailwind</p>
      </div>

      <div className="p-2.5 rounded-lg bg-canvas-soft space-y-1.5">
        <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-ink">
          <Eye className="w-3 h-3" />
        </div>
        <h5 className="text-[11px] font-bold text-ink leading-tight">Zero Shadows</h5>
        <p className="text-[10px] text-muted leading-tight">Surface contrast</p>
      </div>
    </div>
  );
}

// --- PRICING: Tiered Billing Pricing ---
export function TieredBillingPricingPreview() {
  return (
    <div className="w-full grid grid-cols-3 gap-2 py-2 items-center">
      <div className="p-2.5 rounded-lg bg-canvas-soft space-y-1 text-center">
        <span className="text-[10px] font-semibold text-muted">Starter</span>
        <div className="text-xs font-bold text-ink">$0</div>
        <button
          type="button"
          className="w-full h-5 rounded-full bg-field text-[9px] font-semibold text-ink"
        >
          Free
        </button>
      </div>

      <div className="p-2.5 rounded-lg bg-ink text-white space-y-1 text-center relative">
        <span className="text-[10px] font-semibold text-gray-300">Pro</span>
        <div className="text-xs font-bold text-white">
          $19<span className="text-[8px] font-normal text-gray-400">/mo</span>
        </div>
        <button
          type="button"
          className="w-full h-5 rounded-full bg-white text-ink text-[9px] font-semibold"
        >
          Join Pro
        </button>
      </div>

      <div className="p-2.5 rounded-lg bg-canvas-soft space-y-1 text-center">
        <span className="text-[10px] font-semibold text-muted">Team</span>
        <div className="text-xs font-bold text-ink">$49</div>
        <button
          type="button"
          className="w-full h-5 rounded-full bg-field text-[9px] font-semibold text-ink"
        >
          Team
        </button>
      </div>
    </div>
  );
}

// --- TESTIMONIALS: Customer Quotes Grid ---
export function CustomerQuotesGridPreview() {
  return (
    <div className="w-full grid grid-cols-2 gap-2.5 py-2">
      <div className="p-2.5 rounded-lg bg-canvas-soft space-y-1.5">
        <div className="flex gap-0.5 text-amber-400">
          <Star className="w-2.5 h-2.5 fill-current" />
          <Star className="w-2.5 h-2.5 fill-current" />
          <Star className="w-2.5 h-2.5 fill-current" />
          <Star className="w-2.5 h-2.5 fill-current" />
          <Star className="w-2.5 h-2.5 fill-current" />
        </div>
        <p className="text-[11px] text-ink leading-tight font-normal">
          &quot;Weblocks cut frontend prototyping time in half.&quot;
        </p>
        <span className="text-[10px] text-muted block font-semibold">— Sarah J., Vektor</span>
      </div>

      <div className="p-2.5 rounded-lg bg-canvas-soft space-y-1.5">
        <div className="flex gap-0.5 text-amber-400">
          <Star className="w-2.5 h-2.5 fill-current" />
          <Star className="w-2.5 h-2.5 fill-current" />
          <Star className="w-2.5 h-2.5 fill-current" />
          <Star className="w-2.5 h-2.5 fill-current" />
          <Star className="w-2.5 h-2.5 fill-current" />
        </div>
        <p className="text-[11px] text-ink leading-tight font-normal">
          &quot;Clean, disciplined, and production-ready.&quot;
        </p>
        <span className="text-[10px] text-muted block font-semibold">— Marcus A., Prism</span>
      </div>
    </div>
  );
}

// --- FAQ: Accordion FAQ ---
export function AccordionFAQPreview() {
  return (
    <div className="w-full space-y-1.5 py-2">
      <div className="rounded-lg bg-canvas-soft p-2.5 flex items-center justify-between text-[11px] font-semibold text-ink">
        <span>Can I use these in commercial projects?</span>
        <ChevronDown className="w-3 h-3 text-muted" />
      </div>
      <div className="rounded-lg bg-canvas-soft p-2.5 flex items-center justify-between text-[11px] font-semibold text-ink">
        <span>How do optical weights (652/456) work?</span>
        <ChevronDown className="w-3 h-3 text-muted" />
      </div>
      <div className="rounded-lg bg-canvas-soft p-2.5 flex items-center justify-between text-[11px] font-semibold text-ink">
        <span>Do I need any external CSS library?</span>
        <ChevronDown className="w-3 h-3 text-muted" />
      </div>
    </div>
  );
}

// --- CTA: High Impact Banner CTA ---
export function HighImpactBannerCTAPreview() {
  return (
    <div className="w-full bg-ink text-white rounded-xl p-4 text-center flex flex-col items-center justify-center space-y-2 py-3">
      <span className="text-[9px] font-semibold text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
        30-day guarantee
      </span>
      <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white leading-tight">
        Ready to elevate your interface design?
      </h4>
      <div className="flex items-center gap-1.5 pt-0.5">
        <button
          type="button"
          className="h-6 px-3 rounded-full bg-white text-ink text-[10px] font-semibold"
        >
          Get access
        </button>
        <button
          type="button"
          className="h-6 px-3 rounded-full bg-white/10 text-white text-[10px] font-semibold"
        >
          Documentation
        </button>
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
