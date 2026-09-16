"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Sparkles } from "lucide-react";
import { PRICING_PLANS, FAQ_ITEMS, PricingPlan } from "@/data/mock-data";
import { useLibrary } from "@/context/library-context";
import { PricingCard } from "@/components/pricing/pricing-card";
import { FAQAccordion } from "@/components/pricing/faq-accordion";
import { SegmentedControl } from "@/components/ui/segmented-control";

export default function PricingPage() {
  const router = useRouter();
  const { user, upgradeToPro } = useLibrary();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  const isYearly = billingPeriod === "yearly";

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === "plan-pro") {
      upgradeToPro();
      router.push("/account");
    } else {
      router.push("/explore");
    }
  };

  const comparisonFeatures = [
    { name: "Curated reference screenshots", free: "500+", pro: "10,000+ lossless" },
    { name: "Multi-facet filtering (Platform, Pattern, Industry)", free: "Basic", pro: "Advanced & Composable" },
    { name: "Custom research collections", free: "Up to 3", pro: "Unlimited" },
    { name: "Lossless asset download & Figma copy", free: "Watermarked", pro: "Lossless SVG & High-res" },
    { name: "App release history & version diffs", free: "—", pro: "Included" },
    { name: "New screens added every weekday", free: "Delayed", pro: "Real-time access" },
    { name: "Commercial license for team sprints", free: "—", pro: "Included" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-soft border border-hairline-soft text-caption font-semibold text-ink mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Membership Tiers</span>
        </div>
        <h1 className="text-h1 font-bold text-ink mb-4">
          Simple, transparent pricing.
        </h1>
        <p className="text-body-large text-muted font-light leading-relaxed">
          Level up your interface research with unlimited access to verified
          production flows, high-resolution screens, and team collections.
        </p>

        {/* Billing Period Segmented Control */}
        <div className="mt-8 flex justify-center">
          <SegmentedControl
            value={billingPeriod}
            onChange={(val) => setBillingPeriod(val as "monthly" | "yearly")}
            options={[
              { value: "monthly", label: "Monthly billing" },
              {
                value: "yearly",
                label: "Yearly billing",
                badge: (
                  <span className="text-[11px] font-semibold text-[#0066ff] bg-[#0066ff]/10 px-2 py-0.5 rounded-full ml-1">
                    Save 37%
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* 2-Column Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20 items-stretch">
        {PRICING_PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isYearly={isYearly}
            onSelect={handleSelectPlan}
            isCurrent={plan.id === "plan-pro" && user.plan === "pro"}
          />
        ))}
      </div>

      {/* Feature Comparison Table */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-h2 font-bold text-ink mb-2">
            Compare plan features.
          </h2>
          <p className="text-body text-muted font-light">
            Everything you need for independent creators and product teams.
          </p>
        </div>

        <div className="bg-canvas-soft rounded-md border border-hairline-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm border-collapse">
              <thead>
                <tr className="border-b border-hairline bg-field/60">
                  <th className="p-4 sm:p-5 font-bold text-ink">Feature</th>
                  <th className="p-4 sm:p-5 font-bold text-ink w-48 text-center">Free Library</th>
                  <th className="p-4 sm:p-5 font-bold text-ink w-48 text-center">Weblocks Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/60 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-ink-soft">
                      {row.name}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-muted font-mono">
                      {row.free}
                    </td>
                    <td className="p-4 sm:p-5 text-center font-bold text-ink font-mono">
                      {row.pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-h2 font-bold text-ink mb-2">
            Frequently asked questions.
          </h2>
          <p className="text-body text-muted font-light">
            Answers to common questions regarding subscriptions, billing, and references.
          </p>
        </div>

        <FAQAccordion items={FAQ_ITEMS} />
      </section>
    </div>
  );
}
