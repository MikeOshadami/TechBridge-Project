"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  en: {
    tagline:    "Connecting surplus technology with the organizations that need it most. Serving the Greater Moncton Area.",
    orgOnly:    "For registered organizations only.",
    quickLinks: "Quick Links",
    support:    "Support",
    contactUs:  "Contact Us",
    links: {
      home:     "Home",
      donate:   "Donate a Device",
      apply:    "Apply for a Device",
      programs: "Programs",
      about:    "About Us",
    },
    supportLinks: {
      contact: "Contact Us",
      faq:     "FAQ",
      admin:   "Admin Login",
    },
    contact: {
      email:    "admin@techbridge.ca",
      location: "Greater Moncton, NB",
    },
    newsletter: {
      heading:     "Stay Updated",
      sub:         "Get news about programs and donation opportunities.",
      placeholder: "Your email address",
      btn:         "Subscribe",
    },
    copyright: "© 2026 TechBridge. All rights reserved.",
    built:     "Built by CivicTech Moncton.",
  },
  fr: {
    tagline:    "Connecter la technologie excédentaire aux organisations qui en ont le plus besoin. Service dans le Grand Moncton.",
    orgOnly:    "Pour les organisations enregistrées seulement.",
    quickLinks: "Liens rapides",
    support:    "Support",
    contactUs:  "Contactez-nous",
    links: {
      home:     "Accueil",
      donate:   "Donner un appareil",
      apply:    "Demander un appareil",
      programs: "Programmes",
      about:    "À propos",
    },
    supportLinks: {
      contact: "Contactez-nous",
      faq:     "FAQ",
      admin:   "Connexion admin",
    },
    contact: {
      email:    "admin@techbridge.ca",
      location: "Grand Moncton, N.-B.",
    },
    newsletter: {
      heading:     "Restez informé",
      sub:         "Recevez des nouvelles sur les programmes et opportunités.",
      placeholder: "Votre adresse courriel",
      btn:         "S'abonner",
    },
    copyright: "© 2026 TechBridge. Tous droits réservés.",
    built:     "Créé par CivicTech Moncton.",
  },
} as const;

export default function Footer() {
  const { lang } = useLanguage();
  const tx = t[lang];

  return (
    <footer className="bg-evergreen-900 text-white">
      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2.5 w-fit focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 rounded" aria-label="TechBridge — home">
            {/* Bridge icon — light version for dark footer */}
            <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
              <path d="M4 21 C4 5 30 5 30 21" stroke="rgba(255,255,255,0.82)" strokeWidth="2.25" fill="none" strokeLinecap="round"/>
              <path d="M11 14.5V21" stroke="rgba(255,255,255,0.82)" strokeWidth="1.25" strokeLinecap="round" opacity="0.45"/>
              <path d="M17 11V21" stroke="rgba(255,255,255,0.82)" strokeWidth="1.25" strokeLinecap="round" opacity="0.45"/>
              <path d="M23 14.5V21" stroke="rgba(255,255,255,0.82)" strokeWidth="1.25" strokeLinecap="round" opacity="0.45"/>
              <rect x="0" y="20.5" width="34" height="3" rx="1.5" fill="#c8892a"/>
              <circle cx="4" cy="21" r="3" fill="#c8892a"/>
              <circle cx="30" cy="21" r="3" fill="#c8892a"/>
              <circle cx="17" cy="11" r="2.5" fill="rgba(255,255,255,0.88)"/>
            </svg>
            <span className="font-display leading-none" style={{ fontSize: "22px", letterSpacing: "-0.01em" }}>
              <span className="text-white">Tech</span><span style={{ color: "#c8892a" }}>Bridge</span>
            </span>
          </Link>
          <p className="font-body text-evergreen-300 text-base leading-relaxed">
            {tx.tagline}
          </p>
          <p className="font-body text-evergreen-500 text-sm">{tx.orgOnly}</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-white text-lg">{tx.quickLinks}</h3>
          <ul className="flex flex-col gap-2.5">
            {(
              [
                ["/",         tx.links.home],
                ["/donate",   tx.links.donate],
                ["/receive",  tx.links.apply],
                ["/programs", tx.links.programs],
                ["/about",    tx.links.about],
              ] as [string, string][]
            ).map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body text-evergreen-300 text-base hover:text-white transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-1 rounded min-h-0 min-w-0 inline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-white text-lg">{tx.support}</h3>
          <ul className="flex flex-col gap-2.5">
            {(
              [
                ["/contact",     tx.supportLinks.contact],
                ["/contact",     tx.supportLinks.faq],
                ["/admin/login", tx.supportLinks.admin],
              ] as [string, string][]
            ).map(([href, label]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="font-body text-evergreen-300 text-base hover:text-white transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-1 rounded min-h-0 min-w-0 inline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Newsletter */}
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="font-display text-white text-lg mb-3">{tx.contactUs}</h3>
            <a
              href="mailto:admin@techbridge.ca"
              className="font-body text-evergreen-300 text-base hover:text-white transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-1 rounded min-h-0 min-w-0 inline block mb-1"
            >
              {tx.contact.email}
            </a>
            <p className="font-body text-evergreen-500 text-sm">{tx.contact.location}</p>
          </div>

          {/* Newsletter signup */}
          <div>
            <p className="font-body text-white font-semibold text-base mb-1">
              {tx.newsletter.heading}
            </p>
            <p className="font-body text-evergreen-400 text-sm mb-3">
              {tx.newsletter.sub}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
              aria-label={tx.newsletter.heading}
            >
              <input
                type="email"
                placeholder={tx.newsletter.placeholder}
                aria-label={tx.newsletter.placeholder}
                className="flex-1 font-body text-sm bg-evergreen-800 text-white placeholder-evergreen-500 border border-evergreen-700 rounded-lg px-3 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white min-w-0"
                style={{ minHeight: "40px" }}
              />
              <button
                type="submit"
                className="font-body font-semibold text-sm bg-harvest text-white rounded-lg px-4 hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 flex-shrink-0 min-h-0 min-w-0"
                style={{ minHeight: "40px" }}
              >
                {tx.newsletter.btn}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <div className="border-t border-evergreen-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-evergreen-500 text-sm">{tx.copyright}</p>
          <p className="font-body text-evergreen-600 text-sm">{tx.built}</p>
        </div>
      </div>
    </footer>
  );
}
