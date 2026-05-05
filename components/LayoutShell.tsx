"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

/**
 * Wraps all pages. Suppresses the public Navbar and removes the top
 * padding on /admin routes so the admin top-bar can sit flush.
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <>
      {!isAdmin && (
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-evergreen-800 focus:text-white focus:rounded focus:text-sm font-body"
        >
          Skip to main content
        </a>
      )}

      {!isAdmin && <Navbar />}

      <main id="main-content" className={isAdmin ? "" : "pt-12"}>
        {children}
      </main>
    </>
  );
}
