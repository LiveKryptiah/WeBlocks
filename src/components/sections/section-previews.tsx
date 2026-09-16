"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Check,
  Mail,
  Clock,
  MapPin,
  Layers,
  Zap,
  Eye,
  Star,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

// --- HERO 1: Minimal SaaS Hero ---
export function MinimalSaaSHeroPreview() {
  return (
    <div className="w-full bg-white text-ink py-12 sm:py-16 px-4 sm:px-8 border border-hairline-soft rounded-xl">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field border border-hairline-soft text-caption font-semibold text-ink mb-5">
          <Sparkles className="w-3.5 h-3.5 text-ink" />
          <span>Introducing Weblocks 2.0</span>
          <ArrowRight className="w-3 h-3 text-muted" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink mb-5 leading-tight">
          Craft interfaces that feel inevitable.
        </h1>

        <p className="text-body text-muted max-w-xl font-normal leading-relaxed mb-8">
          The ultimate component and section library built for product designers and frontend engineers who refuse to compromise on craft.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            type="button"
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-ink text-white hover:bg-ink-soft text-body-sm font-semibold transition-colors"
          >
            Start exploring free
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-field hover:bg-canvas-soft text-ink text-body-sm font-semibold transition-colors"
          >
            View pricing plans
          </button>
        </div>

        <div className="flex items-center gap-3 text-caption text-muted font-normal">
          <div className="flex -space-x-2 overflow-hidden">
            <span className="inline-block h-6 w-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-700">AK</span>
            <span className="inline-block h-6 w-6 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-800">JR</span>
            <span className="inline-block h-6 w-6 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">LM</span>
          </div>
          <span>Trusted by 4,200+ designers & engineering leads</span>
        </div>
      </div>
    </div>
  );
}

// --- HERO 2: Split Waitlist Hero ---
export function SplitWaitlistHeroPreview() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full bg-canvas py-12 px-6 sm:px-8 border border-hairline-soft rounded-xl">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-block px-3 py-1 rounded-full bg-field text-caption font-semibold text-ink">
            Private Beta Access
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
            Design faster with verified real-world patterns.
          </h2>
          <p className="text-body-sm text-muted max-w-md font-normal">
            Skip the guesswork. Inspect production flows, typography breakdowns, and UI tokens from the world's most disciplined products.
          </p>

          {submitted ? (
            <div className="p-3.5 rounded-xl bg-canvas-soft border border-hairline-soft flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-ink shrink-0" />
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
                placeholder="Enter work email..."
                className="w-full h-10 px-3.5 rounded-full bg-white border border-hairline-soft text-body-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto h-10 px-5 rounded-full bg-ink text-white hover:bg-ink-soft text-body-sm font-semibold transition-colors shrink-0 inline-flex items-center justify-center gap-1.5"
              >
                <span>Request access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="flex items-center gap-5 pt-1 text-caption text-muted">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-ink" /> Free during beta</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-ink" /> No credit card required</span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-hairline-soft space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-hairline-soft">
            <span className="text-body-sm font-semibold text-ink">Active Tokens</span>
            <span className="text-caption text-muted bg-field px-2 py-0.5 rounded-full">v2.4</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-lg bg-canvas-soft space-y-0.5">
              <span className="text-caption text-muted">Headline Weight</span>
              <p className="text-title font-bold text-ink">652</p>
            </div>
            <div className="p-3 rounded-lg bg-canvas-soft space-y-0.5">
              <span className="text-caption text-muted">Body Weight</span>
              <p className="text-title font-bold text-ink">456</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-canvas-soft">
            <span className="text-caption text-muted block mb-0.5">Primary Typeface</span>
            <p className="text-body-sm font-semibold text-ink">M Saans / Inter Variable</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- FOOTER 1: Multi-Column Modern Footer ---
export function MulticolumnModernFooterPreview() {
  return (
    <div className="w-full bg-white text-ink border border-hairline-soft rounded-xl p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[6px] bg-ink text-white flex items-center justify-center font-bold text-xs">
                W
              </div>
              <span className="font-bold text-body font-semibold text-ink">Weblocks</span>
            </div>
            <p className="text-body-sm text-muted max-w-xs">
              The design reference system and UI blocks for modern makers. Curated with discipline.
            </p>
            <div className="pt-1">
              <form className="flex items-center gap-2 max-w-xs" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="h-8 px-3 rounded-full bg-canvas-soft border border-hairline-soft text-caption focus:outline-none focus:border-ink w-full"
                />
                <button
                  type="button"
                  className="h-8 px-3.5 rounded-full bg-ink text-white text-caption font-semibold shrink-0 hover:bg-ink-soft transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold text-ink uppercase tracking-wider">Product</h4>
              <ul className="space-y-1.5 text-caption text-muted">
                <li><span className="hover:text-ink cursor-pointer">Sections</span></li>
                <li><span className="hover:text-ink cursor-pointer">Components</span></li>
                <li><span className="hover:text-ink cursor-pointer">Patterns</span></li>
                <li><span className="hover:text-ink cursor-pointer">Pricing</span></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold text-ink uppercase tracking-wider">Resources</h4>
              <ul className="space-y-1.5 text-caption text-muted">
                <li><span className="hover:text-ink cursor-pointer">Design Tokens</span></li>
                <li><span className="hover:text-ink cursor-pointer">Typography Guide</span></li>
                <li><span className="hover:text-ink cursor-pointer">Figma UI Kit</span></li>
                <li><span className="hover:text-ink cursor-pointer">Changelog</span></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold text-ink uppercase tracking-wider">Company</h4>
              <ul className="space-y-1.5 text-caption text-muted">
                <li><span className="hover:text-ink cursor-pointer">About Us</span></li>
                <li><span className="hover:text-ink cursor-pointer">Careers</span></li>
                <li><span className="hover:text-ink cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-ink cursor-pointer">Terms of Service</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-hairline-soft flex flex-col sm:flex-row items-center justify-between gap-3 text-caption text-muted">
          <p>© 2026 Weblocks Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- FOOTER 2: Minimal Studio Footer ---
export function MinimalStudioFooterPreview() {
  return (
    <div className="w-full bg-canvas text-ink p-6 sm:p-10 border border-hairline-soft rounded-xl">
      <div className="max-w-5xl mx-auto flex flex-col justify-between gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-2">
              Weblocks.
            </h3>
            <p className="text-body-sm text-muted max-w-sm">
              An independent reference catalog built with craft, intention, and clarity.
            </p>
          </div>
          <div className="flex items-center gap-5 text-body-sm font-semibold text-muted">
            <span className="hover:text-ink cursor-pointer">Twitter / X</span>
            <span className="hover:text-ink cursor-pointer">GitHub</span>
            <span className="hover:text-ink cursor-pointer">Discord</span>
            <span className="hover:text-ink cursor-pointer">Email</span>
          </div>
        </div>

        <div className="pt-6 border-t border-hairline-soft flex flex-col sm:flex-row items-center justify-between gap-3 text-caption text-muted">
          <span>Designed with M Saans & Inter Variable</span>
          <span>Tokyo & San Francisco — 10:28 AM JST</span>
        </div>
      </div>
    </div>
  );
}

// --- CONTACT: Direct Inquiry Contact ---
export function DirectInquiryContactPreview() {
  const [budget, setBudget] = useState("$10k - $25k");
  const [submitted, setSubmitted] = useState(false);
  const budgets = ["<$10k", "$10k - $25k", "$25k - $50k", "$50k+"];

  return (
    <div className="w-full bg-white p-6 sm:p-10 border border-hairline-soft rounded-xl">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-1.5">Get in touch</span>
            <h3 className="text-2xl font-bold text-ink mb-3">Let's build something exceptional.</h3>
            <p className="text-body-sm text-muted font-normal">
              Have a question, custom design partnership, or team licensing inquiry? We reply within 24 hours.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-canvas-soft border border-hairline-soft">
              <Mail className="w-4 h-4 text-ink shrink-0" />
              <div>
                <span className="text-caption text-muted block">Direct Email</span>
                <span className="text-body-sm font-semibold text-ink">team@weblocks.design</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-canvas-soft border border-hairline-soft">
              <Clock className="w-4 h-4 text-ink shrink-0" />
              <div>
                <span className="text-caption text-muted block">Response Time</span>
                <span className="text-body-sm font-semibold text-ink">Under 4 business hours</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-canvas-soft border border-hairline-soft">
              <MapPin className="w-4 h-4 text-ink shrink-0" />
              <div>
                <span className="text-caption text-muted block">Headquarters</span>
                <span className="text-body-sm font-semibold text-ink">San Francisco, CA & Remote</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-canvas-soft rounded-xl p-5 sm:p-6 border border-hairline-soft">
          {submitted ? (
            <div className="py-12 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-ink mx-auto" />
              <h4 className="text-title font-bold text-ink">Inquiry sent successfully.</h4>
              <p className="text-body-sm text-muted">We received your note and will reach out shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-caption font-semibold text-ink">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Chen"
                    className="w-full h-9 px-3 rounded-lg bg-white border border-hairline-soft text-body-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-caption font-semibold text-ink">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    className="w-full h-9 px-3 rounded-lg bg-white border border-hairline-soft text-body-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-caption font-semibold text-ink">Project Budget</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {budgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`py-1.5 px-2 rounded-full text-caption font-semibold transition-colors ${
                        budget === b
                          ? "bg-ink text-white"
                          : "bg-white text-muted hover:text-ink border border-hairline-soft"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-caption font-semibold text-ink">Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your goals, timeline, and questions..."
                  className="w-full p-3 rounded-lg bg-white border border-hairline-soft text-body-sm text-ink focus:outline-none focus:border-ink resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-full bg-ink text-white font-semibold text-body-sm hover:bg-ink-soft transition-colors"
              >
                Send inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// --- FEATURES: Bento Grid Features ---
export function BentoGridFeaturesPreview() {
  return (
    <div className="w-full bg-canvas p-6 sm:p-10 border border-hairline-soft rounded-xl">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="max-w-xl">
          <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-1.5">Capabilities</span>
          <h3 className="text-2xl font-bold text-ink mb-2">Engineered for pure fidelity.</h3>
          <p className="text-body-sm text-muted font-normal">
            Every block and layout is vetted for accessibility, semantic precision, and visual discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-xl bg-white border border-hairline-soft space-y-3">
            <div className="w-9 h-9 rounded-lg bg-field flex items-center justify-center text-ink">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-body font-bold text-ink">Pixel-Perfect Tokens</h4>
            <p className="text-caption text-muted leading-relaxed">
              Mapped optical weights 652 and 456 directly to Inter Variable and M Saans for identical Mobbin aesthetics.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-hairline-soft space-y-3">
            <div className="w-9 h-9 rounded-lg bg-field flex items-center justify-center text-ink">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-body font-bold text-ink">Instant Copy-Paste</h4>
            <p className="text-caption text-muted leading-relaxed">
              Pure React & Tailwind code with zero bloated runtime dependencies. Ready to drop into Next.js.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-hairline-soft space-y-3">
            <div className="w-9 h-9 rounded-lg bg-field flex items-center justify-center text-ink">
              <Eye className="w-4 h-4" />
            </div>
            <h4 className="text-body font-bold text-ink">Zero Drop Shadows</h4>
            <p className="text-caption text-muted leading-relaxed">
              Depth achieved through subtle surface contrast and crisp 1px hairlines instead of dated blurry elevation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PRICING: Tiered Billing Pricing ---
export function TieredBillingPricingPreview() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="w-full bg-white p-6 sm:p-10 border border-hairline-soft rounded-xl">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="text-center max-w-lg mb-6">
          <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-1.5">Transparent Pricing</span>
          <h3 className="text-2xl font-bold text-ink mb-2">Simple plans for serious teams.</h3>
          <p className="text-body-sm text-muted">Unlock unlimited access to the entire component ecosystem.</p>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-full bg-canvas-soft border border-hairline-soft mb-8">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`px-3.5 py-1 rounded-full text-caption font-semibold transition-colors ${!annual ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`px-3.5 py-1 rounded-full text-caption font-semibold transition-colors flex items-center gap-1.5 ${annual ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
          >
            <span>Annual</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.2 rounded-full">Save 20%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="p-6 rounded-xl bg-canvas-soft border border-hairline-soft flex flex-col justify-between">
            <div>
              <h4 className="text-body font-bold text-ink mb-1">Starter</h4>
              <p className="text-caption text-muted mb-4">For individual designers exploring basics.</p>
              <div className="text-2xl font-bold text-ink mb-4">$0 <span className="text-caption font-normal text-muted">/ forever</span></div>
              <ul className="space-y-2 text-caption text-ink mb-6">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-ink" /> 50+ free UI components</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-ink" /> Community access</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-ink" /> Standard export</li>
              </ul>
            </div>
            <button className="w-full h-9 rounded-full bg-field hover:bg-white text-ink text-caption font-semibold transition-colors">
              Get Started
            </button>
          </div>

          <div className="p-6 rounded-xl bg-ink text-white relative flex flex-col justify-between">
            <span className="absolute -top-2.5 right-4 bg-white text-ink px-2.5 py-0.5 rounded-full text-[10px] font-bold">Most Popular</span>
            <div>
              <h4 className="text-body font-bold mb-1">Professional</h4>
              <p className="text-caption text-gray-400 mb-4">For power users and freelance design leads.</p>
              <div className="text-2xl font-bold mb-4">{annual ? "$19" : "$24"} <span className="text-caption font-normal text-gray-400">/ month</span></div>
              <ul className="space-y-2 text-caption mb-6">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white" /> All 250+ full sections & blocks</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white" /> Figma tokens & file downloads</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-white" /> Weekly design drops</li>
              </ul>
            </div>
            <button className="w-full h-9 rounded-full bg-white text-ink text-caption font-semibold hover:bg-gray-100 transition-colors">
              Get Pro Access
            </button>
          </div>

          <div className="p-6 rounded-xl bg-canvas-soft border border-hairline-soft flex flex-col justify-between">
            <div>
              <h4 className="text-body font-bold text-ink mb-1">Organization</h4>
              <p className="text-caption text-muted mb-4">For growing product teams and agencies.</p>
              <div className="text-2xl font-bold text-ink mb-4">{annual ? "$49" : "$59"} <span className="text-caption font-normal text-muted">/ month</span></div>
              <ul className="space-y-2 text-caption text-ink mb-6">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-ink" /> Unlimited team seats</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-ink" /> Private collection sharing</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-ink" /> Commercial license</li>
              </ul>
            </div>
            <button className="w-full h-9 rounded-full bg-field hover:bg-white text-ink text-caption font-semibold transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- TESTIMONIALS: Customer Quotes Grid ---
export function CustomerQuotesGridPreview() {
  const reviews = [
    {
      quote: "Weblocks cut our frontend prototyping time in half. The attention to typography weights and hairline contrast is second to none.",
      author: "Sarah Jenkins",
      role: "Head of Product, Vektor",
    },
    {
      quote: "Finally, a reference and section system that doesn't feel like another generic UI kit. Clean, sophisticated, and production-ready.",
      author: "Marcus Aurel",
      role: "Design Lead, Prism",
    },
    {
      quote: "The 652 and 456 M Saans variable font stack alone makes every interface look 10x more polished and premium.",
      author: "Elena Rostova",
      role: "Founder, Studio Pulse",
    },
  ];

  return (
    <div className="w-full bg-canvas p-6 sm:p-10 border border-hairline-soft rounded-xl">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-1.5">Wall of Love</span>
          <h3 className="text-2xl font-bold text-ink mb-2">Loved by product craftsmen.</h3>
          <p className="text-body-sm text-muted">See what design leaders are saying about our section system.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="p-6 rounded-xl bg-white border border-hairline-soft flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-caption text-ink leading-relaxed font-normal">"{r.quote}"</p>
              </div>
              <div className="pt-3 border-t border-hairline-soft">
                <h5 className="text-caption font-bold text-ink">{r.author}</h5>
                <span className="text-[11px] text-muted">{r.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- FAQ: Accordion FAQ ---
export function AccordionFAQPreview() {
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
    <div className="w-full bg-white p-6 sm:p-10 border border-hairline-soft rounded-xl">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center max-w-md mx-auto">
          <span className="text-caption font-semibold uppercase tracking-wider text-muted block mb-1.5">Common Inquiries</span>
          <h3 className="text-2xl font-bold text-ink mb-2">Frequently asked questions.</h3>
          <p className="text-body-sm text-muted">Everything you need to know about integrating Weblocks sections.</p>
        </div>

        <div className="space-y-2.5">
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
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-canvas-soft hover:bg-field transition-colors"
                >
                  <span className="text-body-sm font-semibold text-ink">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-caption text-muted leading-relaxed border-t border-hairline-soft">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- CTA: High Impact Banner CTA ---
export function HighImpactBannerCTAPreview() {
  return (
    <div className="w-full py-8 px-2 sm:px-6">
      <div className="max-w-5xl mx-auto bg-ink text-white rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-caption font-semibold text-gray-300 mb-5">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>Full 30-day money-back guarantee</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4 max-w-xl leading-tight">
          Ready to elevate your interface design?
        </h3>

        <p className="text-body-sm text-gray-300 max-w-md font-normal leading-relaxed mb-6">
          Join thousands of modern founders and designers building cleaner, faster websites with Weblocks.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white text-ink hover:bg-gray-100 text-caption font-semibold transition-colors gap-1.5"
          >
            <span>Get instant access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white/10 hover:bg-white/15 text-white text-caption font-semibold transition-colors"
          >
            Browse documentation
          </button>
        </div>
      </div>
    </div>
  );
}

// Master Dispatcher
export function RenderSectionPreview({ slug }: { slug: string }) {
  switch (slug) {
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
        <div className="p-8 text-center text-muted text-body-sm">
          Preview unavailable for this section.
        </div>
      );
  }
}
