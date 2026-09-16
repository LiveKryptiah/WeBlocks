import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--color-ink, #141414)",
          soft: "var(--color-ink-soft, #262626)",
        },
        canvas: {
          DEFAULT: "var(--color-canvas, #ffffff)",
          soft: "var(--color-canvas-soft, #f3f3f3)",
        },
        field: {
          DEFAULT: "var(--color-field, #f0f0f0)",
        },
        hairline: {
          DEFAULT: "var(--color-hairline, #e0e0e0)",
          soft: "var(--color-hairline-soft, #f0f0f0)",
        },
        muted: {
          DEFAULT: "var(--color-muted, #707070)",
        },
        faint: {
          DEFAULT: "var(--color-faint, #adadad)",
        },
        electric: {
          DEFAULT: "var(--color-accent, #0066ff)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #0066ff)",
        },
      },
      borderColor: {
        DEFAULT: "var(--color-hairline-soft, #f0f0f0)",
      },
      borderRadius: {
        none: "0px",
        sm: "var(--radius-sm, 16px)",
        md: "var(--radius-md, 24px)",
        full: "var(--radius-full, 9999px)",
        squircle: "30%",
      },
      spacing: {
        xxs: "var(--space-xxs, 4px)",
        xs: "var(--space-xs, 8px)",
        sm: "var(--space-sm, 12px)",
        md: "var(--space-md, 16px)",
        lg: "var(--space-lg, 24px)",
        xl: "var(--space-xl, 32px)",
        xxl: "var(--space-xxl, 48px)",
        section: "var(--space-section, 80px)",
        "section-lg": "var(--space-section-lg, 120px)",
      },
      fontFamily: {
        sans: [
          '"M Saans"',
          '"Saans"',
          "var(--font-inter)",
          "var(--font-geist)",
          '"Inter"',
          '"Geist"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      fontWeight: {
        light: "300",
        normal: "456",
        medium: "456",
        semibold: "600",
        bold: "652",
        display: "652",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.015em",
        headline: "-0.02em",
        normal: "0",
      },
      boxShadow: {
        none: "none",
        "inset-ring": "inset 0 0 0 1px var(--color-hairline-soft, #f0f0f0)",
      },
    },
  },
  plugins: [],
};

export default config;
