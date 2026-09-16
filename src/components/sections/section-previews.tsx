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
} from "lucide-react";

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
