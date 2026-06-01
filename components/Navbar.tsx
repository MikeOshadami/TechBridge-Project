"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Nav link definitions ─────────────────────────────────────────────────────

const navLinks = {
  en: [
    { href: "/",         label: "Home" },
    { href: "/donate",   label: "Donate" },
    { href: "/receive",  label: "Apply" },
    { href: "/programs", label: "Programs" },
    { href: "/about",    label: "About" },
    { href: "/contact",  label: "Contact" },
  ],
  fr: [
    { href: "/",         label: "Accueil" },
    { href: "/donate",   label: "Faire un don" },
    { href: "/receive",  label: "Demander" },
    { href: "/programs", label: "Programmes" },
    { href: "/about",    label: "À propos" },
    { href: "/contact",  label: "Contact" },
  ],
};

const cta = {
  en: { donate: "Donate a Device", apply: "Apply for a Device" },
  fr: { donate: "Donner un appareil", apply: "Demander un appareil" },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M17 5L5 17M5 5l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = navLinks[lang];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-nav">
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* ── Desktop bar ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between" style={{ height: "72px" }}>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 rounded flex-shrink-0"
            aria-label="TechBridge — home"
          >
            {/* Bridge icon mark */}
            <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
              {/* Main arch */}
              <path d="M4 21 C4 5 30 5 30 21" stroke="#254135" strokeWidth="2.25" fill="none" strokeLinecap="round"/>
              {/* Vertical hangers */}
              <path d="M11 14.5V21" stroke="#254135" strokeWidth="1.25" strokeLinecap="round" opacity="0.45"/>
              <path d="M17 11V21" stroke="#254135" strokeWidth="1.25" strokeLinecap="round" opacity="0.45"/>
              <path d="M23 14.5V21" stroke="#254135" strokeWidth="1.25" strokeLinecap="round" opacity="0.45"/>
              {/* Deck / road */}
              <rect x="0" y="20.5" width="34" height="3" rx="1.5" fill="#c8892a"/>
              {/* Anchor nodes */}
              <circle cx="4" cy="21" r="3" fill="#c8892a"/>
              <circle cx="30" cy="21" r="3" fill="#c8892a"/>
              {/* Crown node */}
              <circle cx="17" cy="11" r="2.5" fill="#254135"/>
            </svg>
            {/* Wordmark */}
            <span
              className="font-display leading-none select-none"
              style={{ fontSize: "22px", letterSpacing: "-0.01em" }}
            >
              <span className="text-evergreen-800">Tech</span><span style={{ color: "#c8892a" }}>Bridge</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5" role="list">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="listitem"
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`font-body font-medium text-base px-3 py-2 rounded-lg transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-0 min-w-0 ${
                  isActive(link.href)
                    ? "text-evergreen-800 bg-evergreen-50"
                    : "text-evergreen-700 hover:text-evergreen-800 hover:bg-evergreen-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label={lang === "en" ? "Switch to French" : "Passer en anglais"}
              className="font-body text-sm font-medium text-evergreen-700 border border-evergreen-200 rounded-lg px-3 hover:bg-evergreen-50 hover:text-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-0 min-w-0 flex items-center"
              style={{ minHeight: "38px" }}
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
            <Link
              href="/receive"
              className="font-body font-semibold text-sm border border-evergreen-200 text-evergreen-800 rounded-lg px-4 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-0 min-w-0 flex items-center justify-center"
              style={{ minHeight: "38px" }}
            >
              {cta[lang].apply}
            </Link>
            <Link
              href="/donate"
              className="font-body font-semibold text-sm bg-harvest text-white rounded-lg px-4 hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2 min-h-0 min-w-0 flex items-center justify-center"
              style={{ minHeight: "38px" }}
            >
              {cta[lang].donate}
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label={lang === "en" ? "Switch to French" : "Passer en anglais"}
              className="font-body text-sm font-medium text-evergreen-700 border border-evergreen-200 rounded-lg px-3 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 min-h-0 min-w-0 flex items-center"
              style={{ minHeight: "38px" }}
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={
                menuOpen
                  ? lang === "en" ? "Close menu" : "Fermer le menu"
                  : lang === "en" ? "Open menu"  : "Ouvrir le menu"
              }
              className="p-2 rounded-lg text-evergreen-800 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 min-h-0 min-w-0"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-evergreen-100 py-4 animate-fade-in-up"
          >
            <ul className="flex flex-col gap-0.5" role="list">
              {links.map((link) => (
                <li key={link.href} role="listitem">
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`font-body font-medium text-base px-4 rounded-lg transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 min-h-[48px] flex items-center ${
                      isActive(link.href)
                        ? "text-evergreen-800 bg-evergreen-50"
                        : "text-evergreen-700 hover:text-evergreen-800 hover:bg-evergreen-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-evergreen-100 flex flex-col gap-2">
              <Link
                href="/donate"
                onClick={closeMenu}
                className="font-body font-semibold text-base bg-harvest text-white rounded-lg px-4 hover:bg-harvest-600 transition-colors text-center focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2 min-h-[48px] flex items-center justify-center"
              >
                {cta[lang].donate}
              </Link>
              <Link
                href="/receive"
                onClick={closeMenu}
                className="font-body font-semibold text-base text-evergreen-800 border border-evergreen-200 rounded-lg px-4 hover:bg-evergreen-50 transition-colors text-center focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-[48px] flex items-center justify-center"
              >
                {cta[lang].apply}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
