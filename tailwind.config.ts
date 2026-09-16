import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#141414",
          soft: "#262626",
        },
        canvas: {
          DEFAULT: "#ffffff",
          soft: "#f3f3f3",
        },
        field: {
          DEFAULT: "#f0f0f0",
        },
        hairline: {
          DEFAULT: "#e0e0e0",
          soft: "#f0f0f0",
        },
        muted: {
          DEFAULT: "#707070",
        },
        faint: {
          DEFAULT: "#adadad",
        },
        electric: {
          DEFAULT: "#0066ff",
        },
      },
      borderRadius: {
        none: "0px",
        sm: "16px",
        md: "24px",
        full: "9999px",
        squircle: "30%",
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        section: "80px",
        "section-lg": "120px",
      },
      fontFamily: {
        sans: [
          "Saans",
          "Inter",
          "-apple-system",
          '"Segoe UI"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      fontWeight: {
        light: "300",
        normal: "450",
        medium: "450",
        semibold: "600",
        bold: "650",
        display: "650",
      },
      boxShadow: {
        none: "none",
        "inset-ring": "inset 0 0 0 1px #f0f0f0",
      },
    },
  },
  plugins: [],
};

export default config;
