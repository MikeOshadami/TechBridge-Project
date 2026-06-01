"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Wraps all pages.
 * - Public pages: sticky Navbar (no padding-top needed) + rich Footer
 * - Admin pages: neither Navbar nor Footer — admin has its own top-bar
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <>
      {/* Skip to content — appears on first Tab key press */}
      {!isAdmin && (
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-evergreen-800 focus:text-white focus:rounded-lg focus:text-sm font-body focus:shadow-lg"
        >
          Skip to main content
        </a>
      )}

      {/* Sticky navbar — sticky top-0 is inside Navbar, so no pt-* needed */}
      {!isAdmin && <Navbar />}

      {/* Page content */}
      <main id="main-content">
        {children}
      </main>

      {/* Footer on all non-admin pages */}
      {!isAdmin && <Footer />}
    </>
  );
}
