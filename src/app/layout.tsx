import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { LibraryProvider } from "@/context/library-context";
import { LayoutWrapper } from "@/components/layout-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weblocks — UI/UX Reference Library",
  description:
    "Discover real-world design inspiration. Browse, search, filter, and organize interface references from top production apps.",
};

const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('weblocks_theme');
      var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geist.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-canvas text-ink transition-colors duration-200">
        <LibraryProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LibraryProvider>
      </body>
    </html>
  );
}
