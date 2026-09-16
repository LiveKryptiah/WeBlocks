"use client";

import React from "react";
import { Check } from "lucide-react";
import { PricingPlan } from "@/data/mock-data";
import { BadgePopular } from "@/components/ui/badge";
import { ButtonPrimary, ButtonOutline } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
  onSelect: (plan: PricingPlan) => void;
  isCurrent?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isYearly,
  onSelect,
  isCurrent = false,
}) => {
  const price = isYearly ? plan.yearlyPriceMonthly : plan.monthlyPrice;

  return (
    <div
      className={cn(
        "relative rounded-md p-8 flex flex-col justify-between transition-all",
        plan.isFeatured
          ? "bg-canvas-soft border border-transparent dark:border-[#23252a]"
          : "bg-white dark:bg-[#0f1011] border border-hairline-soft dark:border-[#23252a]"
      )}
    >
      <div>
        {/* Top Featured Pill */}
        <div className="flex items-center justify-between gap-2 mb-4 min-h-[28px]">
          <h3 className="text-h4 font-bold text-ink">{plan.name}</h3>
          {plan.isFeatured && <BadgePopular />}
        </div>

        <p className="text-body-sm text-muted mb-6">{plan.description}</p>

        {/* Pricing display */}
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-display font-bold text-ink">${price}</span>
          <span className="text-body text-muted">/ month</span>
        </div>

        <div className="min-h-[24px] mb-8">
          {isYearly && plan.monthlyPrice > 0 ? (
            <span className="inline-block text-caption font-semibold px-2.5 py-0.5 rounded-full bg-[#0066ff]/10 text-[#0066ff]">
              Billed annually ($144/yr) • Save 37%
            </span>
          ) : (
            <span className="text-caption text-muted">
              {plan.monthlyPrice === 0 ? "Free forever" : "Billed monthly"}
            </span>
          )}
        </div>

        {/* Features List */}
        <div className="space-y-3.5 pt-6 border-t border-hairline">
          <span className="text-label text-muted uppercase tracking-wider font-semibold">
            Included features
          </span>
          <ul className="space-y-3 text-body-sm text-ink-soft">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-field flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-ink" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action CTA */}
      <div className="pt-8 mt-8 border-t border-hairline">
        {plan.isFeatured ? (
          <ButtonPrimary
            onClick={() => onSelect(plan)}
            className="w-full text-base"
          >
            {isCurrent ? "Current Plan" : plan.ctaLabel}
          </ButtonPrimary>
        ) : (
          <ButtonOutline
            onClick={() => onSelect(plan)}
            className="w-full text-base"
          >
            {isCurrent ? "Current Plan" : plan.ctaLabel}
          </ButtonOutline>
        )}
      </div>
    </div>
  );
};
