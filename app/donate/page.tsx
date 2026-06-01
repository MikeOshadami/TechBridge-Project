"use client";

import Link from "next/link";
// import { useState } from "react"; // re-enable with warning gate
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    badge:   "Donate a Device",
    h1:      "Help local organizations access the technology they need.",
    body:    "By donating your surplus tech to TechBridge, you connect companies with verified nonprofits and civic organizations in Greater Moncton. Secure, simple, and impactful.",
    trust:   ["Admin-verified recipients", "Data security required", "Direct org connection"],
    warning: {
      h2:     "Important: All devices must be formatted first",
      intro:  "Before donating any technology through TechBridge, all devices must be completely wiped and formatted.",
      means:  "This means:",
      items: [
        "All personal files deleted",
        "All accounts signed out and removed",
        "All storage fully erased",
        "Operating system reinstalled or device reset to factory settings",
      ],
      outro: "This protects both your organization and the recipient. TechBridge does not accept unformatted devices and takes no responsibility for data left on donated equipment.",
    },
    checkboxLabel: "I understand that all donated devices must be fully formatted and wiped before donation.",
    chooseH2: "How would you like to help?",
    cards: {
      browse: {
        eyebrow: "See what's needed",
        h3:      "Browse the Needs Board",
        body:    "See exactly what technology local nonprofits are looking for and contact them directly.",
        cta:     "View Needs Board",
      },
      post: {
        eyebrow: "Have something to give?",
        h3:      "Post a Donation",
        body:    "Let organizations know what technology you have available. We'll help match you.",
        cta:     "Post a Donation",
      },
    },
  },
  fr: {
    badge:   "Donner un appareil",
    h1:      "Aidez les organismes locaux à accéder à la technologie dont ils ont besoin.",
    body:    "En donnant votre technologie excédentaire à TechBridge, vous connectez les entreprises avec des organismes vérifiés du Grand Moncton.",
    trust:   ["Bénéficiaires vérifiés", "Sécurité des données requise", "Connexion directe"],
    warning: {
      h2:     "Important: Tous les appareils doivent être formatés",
      intro:  "Avant de faire don de toute technologie via TechBridge, tous les appareils doivent être effacés et formatés.",
      means:  "Cela signifie:",
      items: [
        "Tous les fichiers personnels supprimés",
        "Tous les comptes déconnectés et supprimés",
        "Tout le stockage entièrement effacé",
        "Système d'exploitation réinstallé ou appareil réinitialisé aux paramètres d'usine",
      ],
      outro: "Cela protège votre organisation et le destinataire. TechBridge n'accepte pas les appareils non formatés.",
    },
    checkboxLabel: "Je comprends que tous les appareils donnés doivent être entièrement formatés avant le don.",
    chooseH2: "Comment souhaitez-vous aider?",
    cards: {
      browse: {
        eyebrow: "Voyez ce qui est nécessaire",
        h3:      "Parcourir le tableau des besoins",
        body:    "Voyez exactement quelles technologies les organismes recherchent et contactez-les directement.",
        cta:     "Voir le tableau des besoins",
      },
      post: {
        eyebrow: "Avez-vous quelque chose à donner?",
        h3:      "Publier un don",
        body:    "Faites savoir aux organisations quelle technologie vous avez disponible.",
        cta:     "Publier un don",
      },
    },
  },
} as const;

export default function DonatePage() {
  const { lang } = useLanguage();
  const tx = translations[lang];
  // const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-evergreen-800 w-full px-6 py-16 lg:py-20" aria-labelledby="donate-h1">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 font-body text-evergreen-300 font-medium text-sm bg-evergreen-700 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-harvest flex-shrink-0" aria-hidden="true" />
            {tx.badge}
          </span>
          <h1 id="donate-h1" className="font-display text-white leading-tight" style={{ fontSize: "clamp(30px, 5vw, 46px)" }}>
            {tx.h1}
          </h1>
          <p className="font-body text-evergreen-200 leading-relaxed max-w-[540px]" style={{ fontSize: "18px" }}>
            {tx.body}
          </p>
          <ul className="flex flex-wrap justify-center gap-4 mt-1">
            {tx.trust.map((item) => (
              <li key={item} className="flex items-center gap-1.5 font-body text-evergreen-300 text-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" fill="#49836b" />
                  <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TODO: Format Warning Gate + acknowledgement checkbox — commented out for now */}
      {/*
      <section className="bg-white w-full px-6 py-14" aria-labelledby="warning-heading">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div className="rounded-2xl p-8 flex flex-col gap-5"
            style={{ background: "#FEF2F2", border: "2px solid #8B1A1A" }}
            role="note" aria-labelledby="warning-heading">
            <div className="flex items-center gap-3">
              <span style={{ fontSize: "32px", lineHeight: 1 }} aria-hidden="true">⚠</span>
              <h2 id="warning-heading" className="font-display leading-snug" style={{ color: "#8B1A1A", fontSize: "22px" }}>
                {tx.warning.h2}
              </h2>
            </div>
            <div className="font-body leading-relaxed flex flex-col gap-3" style={{ color: "#8B1A1A", fontSize: "17px" }}>
              <p>{tx.warning.intro}</p>
              <p className="font-semibold">{tx.warning.means}</p>
              <ul className="flex flex-col gap-1.5">
                {tx.warning.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p>{tx.warning.outro}</p>
            </div>
          </div>

          <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl border border-evergreen-100 hover:bg-evergreen-50 transition-colors">
            <input
              type="checkbox"
              id="acknowledge"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="flex-shrink-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 accent-evergreen-800"
              style={{ width: "22px", height: "22px", marginTop: "2px" }}
            />
            <span className="font-body text-lg text-evergreen-800 leading-relaxed">
              {tx.checkboxLabel}
            </span>
          </label>
        </div>
      </section>
      */}

      {/* Two CTA cards */}
      {true && (
        <section className="bg-evergreen-50 w-full px-6 py-20" aria-labelledby="choose-heading">
          <div className="max-w-2xl mx-auto flex flex-col gap-8">
            <h2 id="choose-heading" className="font-display text-evergreen-800 text-center" style={{ fontSize: "26px" }}>
              {tx.chooseH2}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Browse needs */}
              <div className="bg-white border-2 border-evergreen-200 rounded-2xl p-7 flex flex-col gap-4 hover:border-evergreen-400 transition-colors shadow-card">
                <div className="w-12 h-12 bg-evergreen-100 rounded-xl flex items-center justify-center text-evergreen-700">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M16.5 16.5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="font-body text-evergreen-500 text-xs font-semibold uppercase tracking-wider">{tx.cards.browse.eyebrow}</span>
                <h3 className="font-display text-evergreen-800 leading-snug" style={{ fontSize: "21px" }}>{tx.cards.browse.h3}</h3>
                <p className="font-body text-evergreen-600 leading-relaxed flex-1" style={{ fontSize: "16px" }}>{tx.cards.browse.body}</p>
                <Link
                  href="/donate/needs"
                  className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-base rounded-xl px-5 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 mt-auto"
                  style={{ minHeight: "48px" }}
                >
                  {tx.cards.browse.cta}
                </Link>
              </div>

              {/* Post donation */}
              <div className="bg-evergreen-800 rounded-2xl p-7 flex flex-col gap-4 shadow-card">
                <div className="w-12 h-12 bg-evergreen-700 rounded-xl flex items-center justify-center text-white">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                    <rect x="3" y="11" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M3 11h20v4H3z" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M13 11v12M8 11c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="font-body text-evergreen-400 text-xs font-semibold uppercase tracking-wider">{tx.cards.post.eyebrow}</span>
                <h3 className="font-display text-white leading-snug" style={{ fontSize: "21px" }}>{tx.cards.post.h3}</h3>
                <p className="font-body text-evergreen-200 leading-relaxed flex-1" style={{ fontSize: "16px" }}>{tx.cards.post.body}</p>
                <Link
                  href="/donate/offer"
                  className="inline-flex items-center justify-center bg-harvest text-white font-body font-semibold text-base rounded-xl px-5 hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 mt-auto"
                  style={{ minHeight: "48px" }}
                >
                  {tx.cards.post.cta}
                </Link>
              </div>

            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// TODO: Re-enable format warning gate + acknowledgement checkbox when ready.
// Controlled by the `acknowledged` state and the commented-out section above.
