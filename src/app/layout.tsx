import type { Metadata } from "next";
import "./globals.css";
import { LibraryProvider } from "@/context/library-context";
import { LayoutWrapper } from "@/components/layout-wrapper";

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
    <html lang="en">
      <body>
        <LibraryProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </LibraryProvider>
      </body>
    </html>
  );
}
