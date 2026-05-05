"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-evergreen-800">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between px-6 min-h-[48px] w-full"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-white hover:text-evergreen-200 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 rounded"
          style={{ fontSize: "24px" }}
          aria-label="TechBridge — home"
        >
          TechBridge
        </Link>

        {/* Language toggle */}
        <button
          onClick={toggleLang}
          aria-label={lang === "en" ? "Switch to French" : "Passer en anglais"}
          className="text-white font-body text-sm font-medium px-4 rounded transition-colors hover:bg-evergreen-700 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          {lang === "en" ? "EN | FR" : "FR | EN"}
        </button>
      </nav>
    </header>
  );
}
