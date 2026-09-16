import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-ink text-white rounded-t-md mt-section pt-16 sm:pt-20 pb-12 px-6 sm:px-12 selection:bg-white selection:text-ink">
      <div className="max-w-6xl mx-auto">
        {/* Top brand lockup */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-[10px] bg-white text-ink flex items-center justify-center font-bold text-base">
                W
              </div>
              <span className="text-3xl font-bold tracking-tight text-white">
                Weblocks.
              </span>
            </div>
            <p className="text-body-large text-faint max-w-md font-light">
              Discover real-world design inspiration.
            </p>
          </div>

          <div className="text-body-sm text-faint">
            Curated daily for product designers, engineers, and founders.
          </div>
        </div>

        {/* 4-column link directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-body-sm">
          <div>
            <h4 className="text-label text-white uppercase tracking-wider font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-faint">
              <li>
                <Link href="/explore" className="hover:text-white transition-colors">
                  All References
                </Link>
              </li>
              <li>
                <Link href="/patterns" className="hover:text-white transition-colors">
                  UI Patterns
                </Link>
              </li>
              <li>
                <Link href="/components" className="hover:text-white transition-colors">
                  Component Blocks
                </Link>
              </li>
              <li>
                <Link href="/apps" className="hover:text-white transition-colors">
                  Apps & Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Curated Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-label text-white uppercase tracking-wider font-semibold mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-faint">
              <li>
                <Link href="/explore?industry=Fintech" className="hover:text-white transition-colors">
                  Fintech & Banking
                </Link>
              </li>
              <li>
                <Link href="/explore?industry=Developer+Tools" className="hover:text-white transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="/explore?industry=Productivity" className="hover:text-white transition-colors">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="/explore?industry=Travel+%26+Hospitality" className="hover:text-white transition-colors">
                  Travel & Stays
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-label text-white uppercase tracking-wider font-semibold mb-4">
              Platforms
            </h4>
            <ul className="space-y-2.5 text-faint">
              <li>
                <Link href="/explore?platform=iOS" className="hover:text-white transition-colors">
                  iOS References
                </Link>
              </li>
              <li>
                <Link href="/explore?platform=Android" className="hover:text-white transition-colors">
                  Android References
                </Link>
              </li>
              <li>
                <Link href="/explore?platform=Web" className="hover:text-white transition-colors">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link href="/explore?platform=macOS" className="hover:text-white transition-colors">
                  macOS Native
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-label text-white uppercase tracking-wider font-semibold mb-4">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-faint">
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pro Membership
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Account Settings
                </Link>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-faint">
          <p>© {new Date().getFullYear()} Weblocks Reference Library. All rights reserved.</p>
          <p>Strictly adhering to clean design principles. Built without drop shadows.</p>
        </div>
      </div>
    </footer>
  );
};
