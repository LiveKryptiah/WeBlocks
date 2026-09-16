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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <body>
        <LibraryProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LibraryProvider>
      </body>
    </html>
  );
}
