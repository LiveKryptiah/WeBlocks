export type SectionCategory =
  | "hero"
  | "footers"
  | "contact"
  | "features"
  | "pricing"
  | "testimonials"
  | "faq"
  | "cta";

export interface SectionEntity {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: SectionCategory;
  tags: string[];
  code: string;
}

export const SECTION_CATEGORIES: { id: SectionCategory; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "footers", label: "Footers" },
  { id: "contact", label: "Contact" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "CTA & Banners" },
];

export const SECTIONS: SectionEntity[] = [
  // --- HERO SECTIONS ---
  {
    id: "sec-hero-horizon",
    slug: "celestial-horizon-hero",
    title: "Celestial Horizon Hero",
    description: "Futuristic dark cosmic hero featuring glowing celestial planet curvature, ambient aurora light rays, metallic gradient typography, and dual pill action buttons.",
    category: "hero",
    tags: ["hero", "dark", "cosmic", "celestial", "blue", "horizon", "futuristic"],
    code: `"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export function CelestialHorizonHero() {
  return (
    <section className="relative w-full bg-[#02040a] text-white overflow-hidden py-16 sm:py-28 px-6 sm:px-12 rounded-3xl border border-white/5">
      {/* Background Perspective Wireframe Grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
        }}
      />

      {/* Right Aurora Light Ray */}
      <div className="absolute top-0 right-0 w-[420px] h-[550px] bg-gradient-to-bl from-blue-600/25 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Floating Navigation */}
      <div className="relative flex items-center justify-between pb-16 max-w-6xl mx-auto z-10">
        <div className="flex items-center gap-2.5">
          {/* Braided Connected Node Logo */}
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
            <div className="flex flex-col gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            </div>
            <span className="w-2 h-2 rounded-full bg-blue-400" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white pl-1">.weblocks</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs text-gray-300 font-medium">
          <a href="#platform" className="hover:text-white transition-colors">Platform</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#developers" className="hover:text-white transition-colors">Developers</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
          <a href="#docs" className="hover:text-white transition-colors">Docs</a>
        </nav>

        <button
          type="button"
          className="h-9 px-5 rounded-full bg-[#0055ff] hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-[0_0_20px_rgba(0,85,255,0.4)] hover:shadow-[0_0_25px_rgba(0,85,255,0.6)]"
        >
          Get Started
        </button>
      </div>

      {/* Main Centered Content */}
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center pt-8 pb-32 z-10">
        {/* Metallic Gradient Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
          <span className="bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent block">
            Decentralized Design,
          </span>
          <span className="bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent block">
            Owned by You.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light mb-8">
          A Web3-native UI platform where design intelligence is transparent, permissionless, and user-owned — not locked inside centralized frameworks.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3.5">
          <button
            type="button"
            className="h-11 px-7 rounded-full bg-[#0055ff] hover:bg-blue-600 text-white text-sm font-semibold transition-all shadow-[0_0_25px_rgba(0,85,255,0.5)] active:scale-95"
          >
            Launch App
          </button>
          <a
            href="#explore"
            className="inline-flex items-center gap-1.5 h-11 px-6 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/15 backdrop-blur transition-all"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-4 h-4 text-gray-300" />
          </a>
        </div>
      </div>

      {/* Celestial Horizon Curve & Atmosphere Glow */}
      <div className="absolute -bottom-48 sm:-bottom-64 left-1/2 -translate-x-1/2 w-[160%] sm:w-[130%] h-[380px] sm:h-[480px] rounded-[100%] bg-[#010204] border-t-2 border-blue-400/80 shadow-[0_-25px_80px_rgba(37,99,235,0.45),0_-50px_140px_rgba(59,130,246,0.25)] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]">
        {/* Atmosphere Arc Rim */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[1px]" />
      </div>

      {/* Floating Stardust Particles */}
      <div className="absolute bottom-28 left-[45%] w-1 h-1 bg-cyan-400 rounded-full animate-ping pointer-events-none" />
      <div className="absolute bottom-36 left-[48%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-24 left-[53%] w-1 h-1 bg-cyan-300 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-32 left-[56%] w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping pointer-events-none" />
      <div className="absolute bottom-20 left-[60%] w-1 h-1 bg-blue-300 rounded-full animate-pulse pointer-events-none" />
    </section>
  );
}`,
  },
  {
    id: "sec-hero-perspective",
    slug: "dark-perspective-dashboard-hero",
    title: "Dark Perspective Dashboard Hero",
    description: "High-contrast dark studio hero featuring star badge, serif italic headline accent, pill action buttons, customer logo strip, and an automatically animated 3D perspective dashboard mockup.",
    category: "hero",
    tags: ["hero", "dark", "perspective", "dashboard", "isometric", "saas", "animated"],
    code: `"use client";

import React from "react";
import {
  Sparkles,
  Search,
  Users,
  Folder,
  Mail,
  Settings,
  LayoutGrid,
  Clock,
  Plus,
} from "lucide-react";

export function DarkPerspectiveDashboardHero() {
  return (
    <section className="relative w-full bg-[#050507] text-white overflow-hidden py-16 sm:py-24 px-6 sm:px-12 rounded-3xl border border-white/5">
      {/* Background ambient stars / radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-black to-black pointer-events-none" />
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Navigation */}
      <div className="relative flex items-center justify-between pb-10 border-b border-white/10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">.weblocks</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs text-gray-400 font-medium">
          <a href="#product" className="hover:text-white transition-colors">Product</a>
          <a href="#customers" className="hover:text-white transition-colors">Customers</a>
          <a href="#changelog" className="hover:text-white transition-colors">Log</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#company" className="hover:text-white transition-colors">Company</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="h-8 px-4 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors"
          >
            Login
          </button>
          <button
            type="button"
            className="h-8 px-4 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Content & Tilted Mockup Grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-6 space-y-6 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="font-medium">Introducing V2.0</span>
          </div>

          {/* Headline with serif italic accent */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
            Upgrade your <br />
            productivity to <br />
            <span className="font-serif italic font-normal text-white">the next level</span>
          </h1>

          {/* Body */}
          <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed font-light">
            Manage your design systems and tokens with zero overhead and keep your focus where it belongs — on the work itself.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              className="h-10 px-6 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
            >
              Get Started
            </button>
            <button
              type="button"
              className="h-10 px-6 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>

          {/* Social Proof Logo Row */}
          <div className="pt-10 border-t border-white/10 space-y-3">
            <p className="text-xs text-gray-500 font-medium">Meet our customers</p>
            <div className="flex items-center gap-6 text-gray-500 text-xs">
              <span className="font-bold tracking-wider opacity-70">LOGOIPSUM</span>
              <span className="font-semibold tracking-wide opacity-70">◆ LOGOIPSUM</span>
              <span className="font-light tracking-widest uppercase opacity-70">Logoipsum</span>
              <span className="font-mono text-xs opacity-70">● logoipsum</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Perspective Floating Dashboard Mockup */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
          <div
            className="w-full max-w-lg transition-transform duration-700 ease-out hover:scale-105"
            style={{
              perspective: "1200px",
            }}
          >
            <div
              className="w-full bg-[#101114] border border-white/15 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.03)] overflow-hidden animate-[pulse_6s_ease-in-out_infinite]"
              style={{
                transform: "rotateY(-16deg) rotateX(12deg) rotateZ(3deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Mockup Top Header */}
              <div className="h-8 bg-[#16171b] border-b border-white/10 px-4 flex items-center justify-between text-[10px] text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] text-gray-400 font-mono">Projects &gt; Task Management - SaaS</span>
                <span className="text-[10px] text-gray-500 font-mono">⌘K</span>
              </div>

              {/* Mockup Body Grid */}
              <div className="grid grid-cols-12 min-h-[300px]">
                {/* Left Mini Rail */}
                <div className="col-span-2 bg-[#0c0d0f] border-r border-white/10 p-2.5 flex flex-col items-center justify-between py-3">
                  <div className="space-y-3 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <div className="w-6 h-6 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400">
                      <LayoutGrid className="w-3 h-3" />
                    </div>
                    <div className="w-6 h-6 rounded-lg bg-white/15 text-white flex items-center justify-center">
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

                {/* Middle Sub-nav */}
                <div className="col-span-4 bg-[#121317] border-r border-white/10 p-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Projects</span>
                    <span className="text-[10px] text-gray-500">&laquo;</span>
                  </div>
                  <div className="flex bg-[#0a0a0c] p-0.5 rounded-md text-[10px]">
                    <span className="flex-1 text-center py-0.5 rounded bg-white/10 text-white font-medium">Team</span>
                    <span className="flex-1 text-center py-0.5 text-gray-400">Personal</span>
                  </div>
                  <div className="relative">
                    <Search className="w-2.5 h-2.5 text-gray-500 absolute left-2 top-2" />
                    <input
                      readOnly
                      placeholder="Search..."
                      className="w-full bg-[#0a0a0c] border border-white/5 rounded px-2 pl-6 py-1 text-[9px] text-gray-300"
                    />
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-[9px] text-gray-500 font-medium">Recent</span>
                    <div className="p-1.5 rounded bg-white/10 border border-white/10 flex items-center justify-between text-[10px] text-white">
                      <span className="truncate">Dashboard - SaaS</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-[8px] flex items-center justify-center">8</span>
                    </div>
                    <div className="p-1.5 rounded hover:bg-white/5 flex items-center justify-between text-[10px] text-gray-400">
                      <span className="truncate">Landing Page</span>
                    </div>
                    <div className="p-1.5 rounded hover:bg-white/5 flex items-center justify-between text-[10px] text-gray-400">
                      <span className="truncate">App Dev</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-white/10 text-[8px] flex items-center justify-center">3</span>
                    </div>
                  </div>
                </div>

                {/* Right Workspace / Kanban Canvas */}
                <div className="col-span-6 bg-[#0e0f12] p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white">Dashboard Project</span>
                    <Plus className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="text-[9px] font-medium text-gray-400">To Do</div>
                    <div className="p-2 rounded-lg bg-[#18191e] border border-white/10 space-y-1.5 shadow-sm">
                      <div className="h-2 w-16 bg-white/20 rounded" />
                      <div className="h-1.5 w-full bg-white/10 rounded" />
                      <div className="h-1.5 w-3/4 bg-white/10 rounded" />
                      <div className="flex items-center justify-between pt-1 text-[8px] text-gray-500">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Today</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#18191e] border border-white/10 space-y-1.5 shadow-sm">
                      <div className="h-2 w-12 bg-white/20 rounded" />
                      <div className="h-1.5 w-4/5 bg-white/10 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    id: "sec-hero-0",
    slug: "dark-parametric-hero",
    title: "Dark Parametric Studio Hero",
    description: "High-contrast dark studio hero featuring dual-tone typography, metallic pill button, 500K user social proof, and an automatically animated 3D iridescent parametric ribbon sculpture.",
    category: "hero",
    tags: ["hero", "dark", "parametric", "3d", "animated", "studio"],
    code: `"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function DarkParametricHero() {
  return (
    <section className="relative w-full bg-[#050505] text-white overflow-hidden py-16 sm:py-24 px-6 sm:px-12 rounded-3xl border border-white/5">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-900/20 via-indigo-900/30 to-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Navigation */}
      <div className="flex items-center justify-between pb-12 border-b border-white/10 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight text-white">.weblocks</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-normal">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Sections</a>
          <a href="#" className="hover:text-white transition-colors">Inspirations</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </nav>
        <button
          type="button"
          className="h-9 px-5 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-100 transition-colors"
        >
          Register
        </button>
      </div>

      {/* Main Hero Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 space-y-6 z-10">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <span className="px-1.5 py-0.5 rounded-full bg-white text-black text-[10px] font-bold">NEW</span>
            <span>Flat 40% off for all users</span>
          </div>

          {/* Dual-Tone Headline */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08]">
            <span className="text-gray-400 font-semibold block mb-1">Design basics with</span>
            <span className="text-white font-bold">principles and laws.</span>
          </h1>

          {/* Body Description */}
          <p className="text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed font-light">
            Production-ready interface sections, verified design references, and typography tokens crafted for engineering teams who care about craft.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              className="h-11 px-7 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 text-black text-sm font-semibold hover:from-white hover:to-gray-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Visit Store
            </button>
            <a
              href="#explore"
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium tracking-tight"
            >
              explore.
            </a>
          </div>

          {/* Stats & Social Proof */}
          <div className="pt-8 flex items-center gap-5">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">500K</p>
              <p className="text-xs text-gray-400 font-light">worldwide users</p>
            </div>
            <div className="flex -space-x-3 overflow-hidden pl-2">
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-black object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop" alt="" />
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-black object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop" alt="" />
              <img className="inline-block h-10 w-10 rounded-full ring-2 ring-black object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop" alt="" />
            </div>
          </div>
        </div>

        {/* Right Column: 3D Iridescent Parametric Sculpture with Automatic Animation */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px]">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite]">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-[0_0_50px_rgba(147,197,253,0.25)] animate-[spin_30s_linear_infinite]"
            >
              <defs>
                <linearGradient id="heroIridescent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="35%" stopColor="#818cf8" />
                  <stop offset="70%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>

              {Array.from({ length: 24 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="200"
                  cy="200"
                  rx={140 + Math.sin(i * 0.5) * 25}
                  ry={90 + Math.cos(i * 0.5) * 20}
                  fill="none"
                  stroke="url(#heroIridescent)"
                  strokeWidth={1.2}
                  strokeOpacity={0.25 + (i % 4) * 0.15}
                  transform={\`rotate(\${i * 15}, 200, 200)\`}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    id: "sec-hero-1",
    slug: "minimal-saas-hero",
    title: "Minimal SaaS Hero",
    description: "Centrally aligned high-impact hero with subtle release badge, dual pill action buttons, customer avatars, and clean browser mockup.",
    category: "hero",
    tags: ["hero", "saas", "centered", "minimal", "browser"],
    code: `"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function MinimalSaaSHero() {
  return (
    <section className="w-full bg-white text-ink py-20 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field border border-hairline-soft text-caption font-semibold text-ink mb-6">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Introducing Weblocks 2.0</span>
          <ArrowRight className="w-3 h-3 text-muted" />
        </div>

        {/* Display Headline */}
        <h1 className="text-display font-bold tracking-headline text-ink mb-6 max-w-3xl">
          Craft interfaces that feel inevitable.
        </h1>

        {/* Subtitle */}
        <p className="text-body-large text-muted max-w-2xl font-normal leading-relaxed mb-8">
          The ultimate component and reference library built for product designers and frontend engineers who refuse to compromise on craft.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <a
            href="#explore"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-ink text-white hover:bg-ink-soft text-body-sm font-semibold transition-colors"
          >
            Start exploring free
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-field hover:bg-canvas-soft text-ink text-body-sm font-semibold transition-colors"
          >
            View pricing plans
          </a>
        </div>

        {/* Social Proof Counter */}
        <div className="flex items-center gap-3 text-caption text-muted font-normal">
          <div className="flex -space-x-2 overflow-hidden">
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" alt="" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces" alt="" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces" alt="" />
          </div>
          <span>Trusted by 4,200+ designers & founders</span>
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    id: "sec-hero-2",
    slug: "split-waitlist-hero",
    title: "Split Waitlist & Product Hero",
    description: "Two-column conversion hero featuring instant email signup, feature highlights, and interactive preview card with zero drop shadows.",
    category: "hero",
    tags: ["hero", "split", "waitlist", "conversion", "bento"],
    code: `"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function SplitWaitlistHero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="w-full bg-canvas py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-field text-caption font-semibold text-ink">
            Private Beta Access
          </div>
          <h1 className="text-h2 sm:text-h1 font-bold tracking-tight text-ink leading-tight">
            Design faster with verified real-world patterns.
          </h1>
          <p className="text-body text-muted max-w-lg font-normal">
            Skip the guesswork. Inspect production flows, typography breakdowns, and UI tokens from the world's most disciplined products.
          </p>

          {submitted ? (
            <div className="p-4 rounded-xl bg-canvas-soft border border-hairline-soft flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-ink" />
              <span className="text-body-sm font-semibold text-ink">You're on the priority waitlist! Check your inbox soon.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex flex-col sm:flex-row items-center gap-2 max-w-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email..."
                className="w-full h-11 px-4 rounded-full bg-canvas-soft border border-hairline-soft text-body-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto h-11 px-6 rounded-full bg-ink text-white hover:bg-ink-soft text-body-sm font-semibold transition-colors shrink-0 inline-flex items-center justify-center gap-1.5"
              >
                <span>Request access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="flex items-center gap-6 pt-2 text-caption text-muted">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-ink" /> Free during beta</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-ink" /> No credit card</span>
          </div>
        </div>

        {/* Right Column: Visual Bento Preview */}
        <div className="lg:col-span-5 bg-canvas-soft rounded-2xl p-6 border border-hairline-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-hairline-soft">
            <span className="text-body-sm font-semibold text-ink">Active Tokens</span>
            <span className="text-caption text-muted bg-white px-2 py-0.5 rounded-full">v2.4</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white space-y-1">
              <span className="text-caption text-muted">Headline Weight</span>
              <p className="text-title font-bold text-ink">652</p>
            </div>
            <div className="p-4 rounded-xl bg-white space-y-1">
              <span className="text-caption text-muted">Body Weight</span>
              <p className="text-title font-bold text-ink">456</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white">
            <span className="text-caption text-muted block mb-1">Primary Typeface</span>
            <p className="text-body font-semibold text-ink">M Saans / Inter Variable</p>
          </div>
        </div>
      </div>
    </section>
  );
}`,
  },

  // --- FOOTER SECTIONS ---
  {
    id: "sec-footer-1",
    slug: "multicolumn-modern-footer",
    title: "Multi-Column Modern Footer",
    description: "Structured multi-column footer with newsletter signup, status indicator badge, categorized resource links, and copyright bar.",
    category: "footers",
    tags: ["footer", "navigation", "newsletter", "links", "status"],
    code: `"use client";

import React from "react";

export function MulticolumnModernFooter() {
  return (
    <footer className="w-full bg-white text-ink border-t border-hairline-soft py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Newsletter */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[6px] bg-ink text-white flex items-center justify-center font-bold text-xs">
                W
              </div>
              <span className="font-bold text-body-large text-ink">Weblocks</span>
            </div>
            <p className="text-body-sm text-muted max-w-sm">
              The design reference system and UI blocks for modern makers. Curated with precision.
            </p>
            <div className="pt-2">
              <form className="flex items-center gap-2 max-w-xs">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="h-9 px-3.5 rounded-full bg-canvas-soft border border-hairline-soft text-body-sm focus:outline-none focus:border-ink w-full"
                />
                <button
                  type="button"
                  className="h-9 px-4 rounded-full bg-ink text-white text-body-sm font-semibold shrink-0 hover:bg-ink-soft transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-caption font-semibold text-ink uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-body-sm text-muted">
                <li><a href="#" className="hover:text-ink transition-colors">Sections</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Components</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Patterns</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-caption font-semibold text-ink uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-body-sm text-muted">
                <li><a href="#" className="hover:text-ink transition-colors">Design Tokens</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Typography Guide</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Figma UI Kit</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-caption font-semibold text-ink uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-body-sm text-muted">
                <li><a href="#" className="hover:text-ink transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-hairline-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-muted">
          <p>© 2026 Weblocks Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}`,
  },
  {
    id: "sec-footer-2",
    slug: "minimal-studio-footer",
    title: "Minimal Studio Footer",
    description: "Ultra-clean, typographic footer with large branding signature, local time indicator, and streamlined horizontal link list.",
    category: "footers",
    tags: ["footer", "minimal", "studio", "clean", "typographic"],
    code: `"use client";

import React from "react";

export function MinimalStudioFooter() {
  return (
    <footer className="w-full bg-canvas text-ink py-16 px-6 sm:px-10 border-t border-hairline-soft">
      <div className="max-w-6xl mx-auto flex flex-col justify-between gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-3">
              Weblocks.
            </h2>
            <p className="text-body-sm text-muted max-w-sm">
              An independent reference catalog built with craft, intention, and clarity.
            </p>
          </div>
          <div className="flex items-center gap-6 text-body-sm font-semibold text-muted">
            <a href="#" className="hover:text-ink transition-colors">Twitter / X</a>
            <a href="#" className="hover:text-ink transition-colors">GitHub</a>
            <a href="#" className="hover:text-ink transition-colors">Discord</a>
            <a href="#" className="hover:text-ink transition-colors">Email</a>
          </div>
        </div>

        <div className="pt-8 border-t border-hairline-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-muted">
          <span>Designed with M Saans & Inter Variable</span>
          <span>Tokyo & San Francisco — 10:28 AM JST</span>
        </div>
      </div>
    </footer>
  );
}`,
  },

  // --- CONTACT SECTIONS ---
  {
    id: "sec-contact-1",
    slug: "direct-inquiry-contact",
    title: "Direct Inquiry & Project Form",
    description: "Comprehensive contact section with project scope pills, budget selector, direct team channels, and office location cards.",
    category: "contact",
    tags: ["contact", "form", "inquiry", "budget", "support"],
    code: `"use client";

import React, { useState } from "react";
import { Mail, Clock, MapPin, CheckCircle2 } from "lucide-react";

export function DirectInquiryContact() {
  const [budget, setBudget] = useState("$10k - $25k");
  const [submitted, setSubmitted] = useState(false);

  const budgets = ["<$10k", "$10k - $25k", "$25k - $50k", "$50k+"];

  return (
    <section className="w-full bg-white py-20 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-2">Get in touch</span>
            <h2 className="text-h2 font-bold text-ink mb-4">Let's build something exceptional.</h2>
            <p className="text-body text-muted font-normal">
              Have a question, custom design partnership, or team licensing inquiry? We reply within 24 hours.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-canvas-soft border border-hairline-soft">
              <Mail className="w-4 h-4 text-ink" />
              <div>
                <span className="text-caption text-muted block">Direct Email</span>
                <span className="text-body-sm font-semibold text-ink">team@weblocks.design</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-canvas-soft border border-hairline-soft">
              <Clock className="w-4 h-4 text-ink" />
              <div>
                <span className="text-caption text-muted block">Response Time</span>
                <span className="text-body-sm font-semibold text-ink">Under 4 business hours</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-canvas-soft border border-hairline-soft">
              <MapPin className="w-4 h-4 text-ink" />
              <div>
                <span className="text-caption text-muted block">Headquarters</span>
                <span className="text-body-sm font-semibold text-ink">San Francisco, CA & Remote</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Form */}
        <div className="lg:col-span-7 bg-canvas-soft rounded-2xl p-6 sm:p-8 border border-hairline-soft">
          {submitted ? (
            <div className="py-16 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-ink mx-auto" />
              <h3 className="text-title font-bold text-ink">Inquiry sent successfully.</h3>
              <p className="text-body-sm text-muted">We received your note and will reach out to you shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-caption font-semibold text-ink">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Chen"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-hairline-soft text-body-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-caption font-semibold text-ink">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    className="w-full h-10 px-3.5 rounded-xl bg-white border border-hairline-soft text-body-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-caption font-semibold text-ink">Project Budget</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={\`py-2 px-3 rounded-full text-caption font-semibold transition-colors \${
                        budget === b
                          ? "bg-ink text-white"
                          : "bg-white text-muted hover:text-ink border border-hairline-soft"
                      }\`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-caption font-semibold text-ink">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your goals, timeline, and questions..."
                  className="w-full p-3.5 rounded-xl bg-white border border-hairline-soft text-body-sm text-ink focus:outline-none focus:border-ink resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-full bg-ink text-white font-semibold text-body-sm hover:bg-ink-soft transition-colors"
              >
                Send inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}`,
  },

  // --- FEATURES & BENTO SECTIONS ---
  {
    id: "sec-features-1",
    slug: "bento-grid-features",
    title: "3-Column Minimal Bento Features",
    description: "Sophisticated bento feature grid with surface contrast, icon badges, and clean metric callouts without drop shadows.",
    category: "features",
    tags: ["features", "bento", "grid", "cards", "minimal"],
    code: `"use client";

import React from "react";
import { Layers, Zap, Eye, ShieldCheck } from "lucide-react";

export function BentoGridFeatures() {
  return (
    <section className="w-full bg-canvas py-20 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="max-w-2xl">
          <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-2">Capabilities</span>
          <h2 className="text-h2 font-bold text-ink mb-3">Engineered for pure fidelity.</h2>
          <p className="text-body text-muted font-normal">
            Every block and layout is vetted for accessibility, semantic precision, and visual discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white border border-hairline-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-field flex items-center justify-center text-ink">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-title font-bold text-ink">Pixel-Perfect Tokens</h3>
            <p className="text-body-sm text-muted leading-relaxed">
              Mapped optical weights 652 and 456 directly to Inter Variable and M Saans for identical Mobbin aesthetics.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white border border-hairline-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-field flex items-center justify-center text-ink">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-title font-bold text-ink">Instant Copy-Paste</h3>
            <p className="text-body-sm text-muted leading-relaxed">
              Pure React & Tailwind code with zero bloated runtime dependencies. Ready to drop into Next.js.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white border border-hairline-soft space-y-4">
            <div className="w-10 h-10 rounded-xl bg-field flex items-center justify-center text-ink">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-title font-bold text-ink">Zero Drop Shadows</h3>
            <p className="text-body-sm text-muted leading-relaxed">
              Depth achieved through subtle surface contrast and crisp 1px hairlines instead of dated blurry elevation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}`,
  },

  // --- PRICING SECTIONS ---
  {
    id: "sec-pricing-1",
    slug: "tiered-billing-pricing",
    title: "SaaS 3-Tier Pricing Table",
    description: "Conversion-optimized pricing grid with monthly and annual billing toggle, highlighted popular tier, and detailed feature lists.",
    category: "pricing",
    tags: ["pricing", "plans", "tier", "billing", "toggle"],
    code: `"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export function TieredBillingPricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="w-full bg-white py-20 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center max-w-xl mb-8">
          <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-2">Transparent Pricing</span>
          <h2 className="text-h2 font-bold text-ink mb-3">Simple plans for serious teams.</h2>
          <p className="text-body text-muted">Unlock unlimited access to the entire component ecosystem.</p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center gap-3 p-1 rounded-full bg-canvas-soft border border-hairline-soft mb-12">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={\`px-4 py-1.5 rounded-full text-body-sm font-semibold transition-colors \${!annual ? "bg-ink text-white" : "text-muted hover:text-ink"}\`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={\`px-4 py-1.5 rounded-full text-body-sm font-semibold transition-colors flex items-center gap-1.5 \${annual ? "bg-ink text-white" : "text-muted hover:text-ink"}\`}
          >
            <span>Annual</span>
            <span className="text-[11px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Free Tier */}
          <div className="p-8 rounded-2xl bg-canvas-soft border border-hairline-soft flex flex-col justify-between">
            <div>
              <h3 className="text-title font-bold text-ink mb-1">Starter</h3>
              <p className="text-body-sm text-muted mb-6">For individual designers exploring the basics.</p>
              <div className="text-3xl font-bold text-ink mb-6">$0 <span className="text-body-sm font-normal text-muted">/ forever</span></div>
              <ul className="space-y-3 text-body-sm text-ink mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ink" /> 50+ free UI components</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ink" /> Community access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ink" /> Standard export</li>
              </ul>
            </div>
            <button className="w-full h-11 rounded-full bg-field hover:bg-white text-ink text-body-sm font-semibold transition-colors">
              Get Started
            </button>
          </div>

          {/* Pro Tier (Featured) */}
          <div className="p-8 rounded-2xl bg-ink text-white relative flex flex-col justify-between">
            <span className="absolute -top-3 right-6 bg-white text-ink px-3 py-0.5 rounded-full text-caption font-bold">Most Popular</span>
            <div>
              <h3 className="text-title font-bold mb-1">Professional</h3>
              <p className="text-body-sm text-gray-400 mb-6">For power users and freelance design leads.</p>
              <div className="text-3xl font-bold mb-6">{annual ? "$19" : "$24"} <span className="text-body-sm font-normal text-gray-400">/ month</span></div>
              <ul className="space-y-3 text-body-sm mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> All 250+ full sections & blocks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> Figma tokens & file downloads</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> Weekly design drops</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-white" /> Priority feature requests</li>
              </ul>
            </div>
            <button className="w-full h-11 rounded-full bg-white text-ink text-body-sm font-semibold hover:bg-gray-100 transition-colors">
              Get Pro Access
            </button>
          </div>

          {/* Team Tier */}
          <div className="p-8 rounded-2xl bg-canvas-soft border border-hairline-soft flex flex-col justify-between">
            <div>
              <h3 className="text-title font-bold text-ink mb-1">Organization</h3>
              <p className="text-body-sm text-muted mb-6">For growing product teams and agencies.</p>
              <div className="text-3xl font-bold text-ink mb-6">{annual ? "$49" : "$59"} <span className="text-body-sm font-normal text-muted">/ month</span></div>
              <ul className="space-y-3 text-body-sm text-ink mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ink" /> Unlimited team seats</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ink" /> Private collection sharing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ink" /> Commercial license</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ink" /> Dedicated Slack channel</li>
              </ul>
            </div>
            <button className="w-full h-11 rounded-full bg-field hover:bg-white text-ink text-body-sm font-semibold transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}`,
  },

  // --- TESTIMONIALS & SOCIAL PROOF ---
  {
    id: "sec-testimonials-1",
    slug: "customer-quotes-grid",
    title: "Verified Social Proof & Quotes",
    description: "High-trust customer testimonials grid with user avatars, verified badges, and metrics callouts.",
    category: "testimonials",
    tags: ["testimonials", "quotes", "social proof", "reviews", "avatars"],
    code: `"use client";

import React from "react";
import { Star } from "lucide-react";

export function CustomerQuotesGrid() {
  const reviews = [
    {
      quote: "Weblocks cut our frontend prototyping time in half. The attention to typography weights and hairline contrast is second to none.",
      author: "Sarah Jenkins",
      role: "Head of Product, Vektor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
    },
    {
      quote: "Finally, a reference and section system that doesn't feel like another generic UI kit. Clean, sophisticated, and production-ready.",
      author: "Marcus Aurel",
      role: "Design Lead, Prism",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces",
    },
    {
      quote: "The 652 and 456 M Saans variable font stack alone makes every interface look 10x more polished and premium.",
      author: "Elena Rostova",
      role: "Founder, Studio Pulse",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces",
    },
  ];

  return (
    <section className="w-full bg-canvas py-20 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-2">Wall of Love</span>
          <h2 className="text-h2 font-bold text-ink mb-3">Loved by product craftsmen.</h2>
          <p className="text-body text-muted">See what design leaders are saying about our section system.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white border border-hairline-soft flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-body-sm text-ink leading-relaxed">\\"{r.quote}\\"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-hairline-soft">
                <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="text-body-sm font-bold text-ink">{r.author}</h4>
                  <span className="text-caption text-muted">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },

  // --- FAQ SECTIONS ---
  {
    id: "sec-faq-1",
    slug: "accordion-faq",
    title: "Interactive Accordion FAQ",
    description: "Collapsible questions list with smooth state transitions, category tags, and direct support assistance banner.",
    category: "faq",
    tags: ["faq", "accordion", "questions", "support", "help"],
    code: `"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function AccordionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can I use these sections in commercial client projects?",
      a: "Yes. All Weblocks sections and components come with a permissive commercial license. You can use them in client deliverables, internal apps, and commercial products without attribution.",
    },
    {
      q: "How do the typography weights work without installing Saans?",
      a: "We configure Inter Variable with optical weights (652 for headlines and 456 for body text) with tight letter spacing (-0.02em) to perfectly mirror M Saans without requiring font purchases.",
    },
    {
      q: "Do I need any external CSS library?",
      a: "No external dependencies are required. All sections are built with standard Tailwind CSS utility classes and modern React hooks.",
    },
    {
      q: "How frequently are new sections added to the showcase?",
      a: "We curate and release 10–15 new production-grade sections and patterns every Tuesday.",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-2">Common Inquiries</span>
          <h2 className="text-h2 font-bold text-ink mb-3">Frequently asked questions.</h2>
          <p className="text-body text-muted">Everything you need to know about integrating Weblocks sections.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-hairline-soft overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-canvas-soft hover:bg-field transition-colors"
                >
                  <span className="text-body font-semibold text-ink">{faq.q}</span>
                  <ChevronDown
                    className={\`w-4 h-4 text-muted transition-transform duration-200 shrink-0 \${isOpen ? "rotate-180" : ""}\`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 bg-white text-body-sm text-muted leading-relaxed border-t border-hairline-soft">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}`,
  },

  // --- CTA / BANNER SECTIONS ---
  {
    id: "sec-cta-1",
    slug: "high-impact-banner-cta",
    title: "High-Impact Dark Pill Banner CTA",
    description: "Standout call-to-action banner with dark canvas contrast, display headline, dual action buttons, and money-back guarantee badge.",
    category: "cta",
    tags: ["cta", "banner", "conversion", "dark", "pill"],
    code: `"use client";

import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function HighImpactBannerCTA() {
  return (
    <section className="w-full py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto bg-ink text-white rounded-3xl p-10 sm:p-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-caption font-semibold text-gray-300 mb-6">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>Full 30-day money-back guarantee</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 max-w-2xl leading-tight">
          Ready to elevate your interface design?
        </h2>

        <p className="text-body text-gray-300 max-w-xl font-normal leading-relaxed mb-8">
          Join thousands of modern founders and designers building cleaner, faster websites with Weblocks.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-white text-ink hover:bg-gray-100 text-body-sm font-semibold transition-colors gap-2"
          >
            <span>Get instant access</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#sections"
            className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-white/10 hover:bg-white/15 text-white text-body-sm font-semibold transition-colors"
          >
            Browse documentation
          </a>
        </div>
      </div>
    </section>
  );
}`,
  },
];

export function getSectionDesignMd(section: SectionEntity): string {
  const tagsStr = section.tags.map((t) => "#" + t).join(" ");
  return [
    `# ${section.title} — design.md`,
    "",
    "## 1. Overview",
    section.description,
    "",
    "## 2. Typography Tokens",
    "- **Headlines / Titles**: M Saans / Inter Variable • Weight: 652 • Tight tracking (-0.02em)",
    "- **Subheadings**: Weight 600 • Slight negative tracking (-0.005em)",
    "- **Body & Text**: Weight 456 • Line-height: 1.38",
    "- **Pill Buttons**: Weight 600 • Full rounded-full (9999px)",
    "",
    "## 3. Surface & Color System",
    "- Canvas: var(--color-canvas)",
    "- Surface 1 (Level 1 Elevation): var(--color-canvas-soft) (borderless contrast)",
    "- Ink: var(--color-ink)",
    "- Hairlines: var(--color-hairline-soft)",
    "- Shadows: None (strict zero drop shadow policy)",
    "",
    "## 4. Metadata",
    `- **Category**: ${section.category}`,
    `- **Slug**: ${section.slug}`,
    `- **Tags**: ${tagsStr}`,
    "",
    "## 5. React + Tailwind Implementation",
    "```tsx",
    section.code,
    "```",
  ].join("\n");
}
