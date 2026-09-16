# Weblocks — UI/UX Reference Library Platform

A production-quality web application for a UI/UX reference library platform inspired by the functionality of products like Mobbin and Skiper UI, driven entirely by a strict, minimalist design system.

## Features

- **Search & Discovery**: Composable multi-facet filtering across platforms (iOS, Android, Web, macOS), industries, UI patterns, and cataloged applications.
- **Visual Screenshot Gallery**: Responsive 4-column desktop gallery preserving native aspect ratios without distortion or arbitrary drop shadows.
- **Reference Detail & Lightbox**: High-resolution screen inspection with rich metadata, tags, and related screen carousels.
- **Product & Pattern Directories**: Deep-dive into 12+ real-world applications (Linear, Wise, Stripe, Raycast, Notion Calendar, Revolut, etc.) and 14 core UI patterns (Onboarding, Authentication, Navigation, Checkout, Settings, etc.).
- **Curated Collections**: Editorial moodboards with 3-item visual preview collages, custom creation, and reference organization.
- **Saved Archive**: Personal bookmarked library with search and platform filtering.
- **Pricing & FAQ**: Multi-tier pricing with monthly/annual billing toggles and interactive FAQ accordion.
- **Authentication & Profile**: Clean, minimal account management.

## Design System

- **Ink Black (`#141414`)**: Primary CTAs, typography, and inverse footer.
- **Electric Blue (`#0066ff`)**: Exclusively reserved for commercial emphasis (Most Popular pricing badge & yearly savings callout).
- **Elevation**: Shadow-free; depth is established using surface shifts (`#ffffff`, `#f3f3f3`, `#f0f0f0`) and hairlines.
- **Pill Geometry**: Full pill (`rounded-full`) for all buttons, badges, toggles, and navigation containers.
- **App Icons**: ~30% squircle curvature across 32px, 48px, 64px, and 96px sizes.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
