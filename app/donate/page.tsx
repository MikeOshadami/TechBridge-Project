"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    hero: {
      h1: "I Want to Donate Tech",
      body: "Thank you for supporting nonprofits and civic organizations in the Greater Moncton Area. Before you continue, please read the important notice below.",
    },
    warning: {
      h2: "Important: All Devices Must Be Formatted Before Donation",
      intro: "Before donating any technology through TechBridge, all devices must be completely wiped and formatted.",
      meansHeading: "This means:",
      items: [
        "All personal files deleted",
        "All accounts signed out and removed",
        "All hard drives and storage fully erased",
        "Operating system reinstalled or device reset to factory settings",
      ],
      outro: "This protects both your organization and the recipient. TechBridge does not accept unformatted devices and takes no responsibility for data left on donated equipment.",
    },
    checkboxLabel:
      "I understand that all donated devices must be fully formatted and wiped before donation.",
    cards: {
      browse: {
        h3: "Browse What's Needed",
        body: "See what technology local nonprofits and civic organizations are looking for.",
        cta: "View the Needs Board →",
      },
      post: {
        h3: "Post What You Have",
        body: "Let organizations know what technology you have available to donate.",
        cta: "Post a Donation →",
      },
    },
  },
  fr: {
    hero: {
      h1: "Je veux faire un don de technologie",
      body: "Merci de soutenir les organismes sans but lucratif et les entreprises civiques du Grand Moncton. Avant de continuer, veuillez lire l'avis important ci-dessous.",
    },
    warning: {
      h2: "Important: Tous les appareils doivent être formatés avant le don",
      intro:
        "Avant de faire don de toute technologie via TechBridge, tous les appareils doivent être complètement effacés et formatés.",
      meansHeading: "Cela signifie:",
      items: [
        "Tous les fichiers personnels supprimés",
        "Tous les comptes déconnectés et supprimés",
        "Tous les disques durs et espaces de stockage entièrement effacés",
        "Système d'exploitation réinstallé ou appareil réinitialisé aux paramètres d'usine",
      ],
      outro:
        "Cela protège votre organisation et le destinataire. TechBridge n'accepte pas les appareils non formatés et décline toute responsabilité pour les données laissées sur les équipements donnés.",
    },
    checkboxLabel:
      "Je comprends que tous les appareils donnés doivent être complètement formatés et effacés avant le don.",
    cards: {
      browse: {
        h3: "Parcourir les besoins",
        body: "Voyez quelles technologies les organismes locaux recherchent.",
        cta: "Voir le tableau des besoins →",
      },
      post: {
        h3: "Publier ce que vous avez",
        body: "Faites savoir aux organisations quelle technologie vous avez disponible à donner.",
        cta: "Publier un don →",
      },
    },
  },
} as const;

// ─── Computer icon ────────────────────────────────────────────────────────────

function ComputerIcon({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect x="4" y="8" width="40" height="26" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M16 40h16M24 34v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M24 4L44 14v20L24 44 4 34V14L24 4z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      <path d="M24 4v40M4 14l20 10 20-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DonatePage() {
  const { lang } = useLanguage();
  const tx = translations[lang];

  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="bg-evergreen-50 min-h-screen">

      {/* ── SECTION 1: Hero ────────────────────────────────────────────── */}
      <section
        className="bg-evergreen-800 w-full px-6 py-16 flex flex-col items-center text-center"
        aria-labelledby="donate-h1"
      >
        <h1
          id="donate-h1"
          className="font-display text-white mb-5 leading-tight"
          style={{ fontSize: "40px" }}
        >
          {tx.hero.h1}
        </h1>
        <p
          className="font-body text-white max-w-[560px] leading-relaxed"
          style={{ fontSize: "20px" }}
        >
          {tx.hero.body}
        </p>
      </section>

      {/* ── SECTION 2: Format Warning Gate ────────────────────────────── */}
      <section
        className="bg-white w-full px-6 py-16 flex flex-col items-center gap-8"
        aria-labelledby="warning-heading"
      >
        <div className="max-w-[700px] w-full flex flex-col gap-8">

          {/* Warning box */}
          <div
            className="rounded-xl p-8 flex flex-col gap-5"
            style={{
              background: "#FEF2F2",
              border: "2px solid #8B1A1A",
            }}
            role="note"
            aria-labelledby="warning-heading"
          >
            {/* ⚠ icon */}
            <div className="text-center" aria-hidden="true" style={{ fontSize: "48px", lineHeight: 1 }}>
              ⚠
            </div>

            <h2
              id="warning-heading"
              className="font-display text-center leading-snug"
              style={{ color: "#8B1A1A", fontSize: "28px" }}
            >
              {tx.warning.h2}
            </h2>

            <div
              className="font-body text-lg leading-relaxed flex flex-col gap-3"
              style={{ color: "#8B1A1A" }}
            >
              <p>{tx.warning.intro}</p>

              <p className="font-semibold">{tx.warning.meansHeading}</p>
              <ul className="list-disc list-inside flex flex-col gap-1 pl-2">
                {tx.warning.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <p>{tx.warning.outro}</p>
            </div>
          </div>

          {/* Acknowledgement checkbox */}
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              id="acknowledge"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="flex-shrink-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 accent-evergreen-800"
              style={{ width: "24px", height: "24px", marginTop: "2px" }}
            />
            <span className="font-body text-lg text-evergreen-800 leading-relaxed group-hover:text-evergreen-700">
              {tx.checkboxLabel}
            </span>
          </label>
        </div>
      </section>

      {/* ── SECTION 3: Two CTAs (only shown after acknowledgement) ─────── */}
      {acknowledged && (
        <section
          className="bg-white w-full px-6 pb-20 flex justify-center animate-fade-in-up"
          aria-label={lang === "en" ? "Donation options" : "Options de don"}
        >
          <div className="max-w-[700px] w-full grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1 — Browse Needs */}
            <div className="bg-evergreen-800 rounded-2xl p-8 flex flex-col gap-5">
              <ComputerIcon className="text-white" />
              <h3 className="font-display text-white" style={{ fontSize: "24px" }}>
                {tx.cards.browse.h3}
              </h3>
              <p className="font-body text-white text-lg leading-relaxed flex-1">
                {tx.cards.browse.body}
              </p>
              <Link
                href="/donate/needs"
                className="inline-flex items-center justify-center bg-white text-evergreen-800 font-body font-semibold text-lg rounded-full px-6 min-h-[56px] hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 mt-auto"
              >
                {tx.cards.browse.cta}
              </Link>
            </div>

            {/* Card 2 — Post Donation */}
            <div className="bg-evergreen-100 rounded-2xl p-8 flex flex-col gap-5">
              <BoxIcon className="text-evergreen-800" />
              <h3 className="font-display text-evergreen-800" style={{ fontSize: "24px" }}>
                {tx.cards.post.h3}
              </h3>
              <p className="font-body text-evergreen-800 text-lg leading-relaxed flex-1">
                {tx.cards.post.body}
              </p>
              <Link
                href="/donate/offer"
                className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-lg rounded-full px-6 min-h-[56px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 mt-auto"
              >
                {tx.cards.post.cta}
              </Link>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
