"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/data/mock-data";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-sm bg-canvas-soft overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              aria-expanded={isOpen}
            >
              <span className="text-body font-semibold text-ink">
                {item.question}
              </span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full bg-field flex items-center justify-center text-muted shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180 text-ink"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-1 text-body-sm text-muted leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
