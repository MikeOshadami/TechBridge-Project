"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Translations ────────────────────────────────────────────────────────────

const translations = {
  en: {
    hero: {
      h1: "Connecting donated technology to the organizations that need it most.",
      body: "TechBridge is a free platform for nonprofits, civic enterprises, and corporate donors in the Greater Moncton Area. This platform is for registered organizations only — not for individual use.",
      btnNeed: "I Need Tech",
      btnDonate: "I Want to Donate",
    },
    howItWorks: {
      h2: "How It Works",
      cards: [
        {
          num: "1",
          heading: "Request",
          text: "Your organization submits what tech you need. Takes less than 5 minutes.",
        },
        {
          num: "2",
          heading: "Review",
          text: "Our team reviews your request within 2 to 5 business days.",
        },
        {
          num: "3",
          heading: "Connect",
          text: "Your listing goes live and donors can contact you directly.",
        },
      ],
    },
    paths: {
      left: {
        h2: "For Nonprofits & Civic Organizations",
        body: "Post what technology your organization needs and get connected with donors who can help.",
        cta: "Submit a Request",
      },
      right: {
        h2: "For Corporate Donors",
        body: "Browse what local organizations need and donate your surplus technology to a good cause.",
        cta: "See What's Needed",
      },
    },
    footer: {
      tagline: "A civic tech initiative for the Greater Moncton Area.",
      orgOnly: "For registered organizations only.",
      contactPrefix: "Questions? Contact us at",
      copyright: "© 2026 TechBridge. All rights reserved.",
    },
  },
  fr: {
    hero: {
      h1: "Connecter la technologie donnée aux organisations qui en ont le plus besoin.",
      body: "TechBridge est une plateforme gratuite pour les organismes sans but lucratif, les entreprises civiques et les donateurs corporatifs du Grand Moncton. Cette plateforme est réservée aux organisations enregistrées — pas au grand public.",
      btnNeed: "J'ai besoin de tech",
      btnDonate: "Je veux faire un don",
    },
    howItWorks: {
      h2: "Comment ça fonctionne",
      cards: [
        {
          num: "1",
          heading: "Demander",
          text: "Votre organisation soumet ses besoins en technologie. Moins de 5 minutes.",
        },
        {
          num: "2",
          heading: "Révision",
          text: "Notre équipe examine votre demande dans un délai de 2 à 5 jours ouvrables.",
        },
        {
          num: "3",
          heading: "Connexion",
          text: "Votre annonce est publiée et les donateurs peuvent vous contacter directement.",
        },
      ],
    },
    paths: {
      left: {
        h2: "Pour les organismes sans but lucratif",
        body: "Publiez vos besoins en technologie et entrez en contact avec des donateurs.",
        cta: "Soumettre une demande",
      },
      right: {
        h2: "Pour les donateurs corporatifs",
        body: "Parcourez les besoins des organisations locales et donnez votre technologie excédentaire.",
        cta: "Voir les besoins",
      },
    },
    footer: {
      tagline: "Une initiative technologique civique pour le Grand Moncton.",
      orgOnly: "Pour les organisations enregistrées seulement.",
      contactPrefix: "Questions? Contactez-nous à",
      copyright: "© 2026 TechBridge. Tous droits réservés.",
    },
  },
} as const;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { lang } = useLanguage();
  const tx = translations[lang];

  return (
    <>
      {/* ── SECTION 1: Hero ─────────────────────────────────────────────── */}
      <section
        className="bg-evergreen-800 w-full px-6 py-20 flex flex-col items-center text-center"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-3xl w-full flex flex-col items-center gap-6">
          <h1
            id="hero-heading"
            className="font-display text-white leading-tight"
            style={{ fontSize: "48px" }}
          >
            {tx.hero.h1}
          </h1>

          <p
            className="font-body text-white max-w-[600px]"
            style={{ fontSize: "20px" }}
          >
            {tx.hero.body}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center">
            <Link
              href="/receive"
              className="inline-flex items-center justify-center bg-white text-evergreen-800 font-body font-semibold text-lg rounded-full px-8 min-h-[48px] hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2"
            >
              {tx.hero.btnNeed}
            </Link>

            <Link
              href="/donate"
              className="inline-flex items-center justify-center bg-evergreen-600 text-white border-2 border-white font-body font-semibold text-lg rounded-full px-8 min-h-[48px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2"
            >
              {tx.hero.btnDonate}
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: How It Works ─────────────────────────────────────── */}
      <section
        className="bg-white w-full px-6 py-20"
        aria-labelledby="how-it-works-heading"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
          <h2
            id="how-it-works-heading"
            className="font-display text-evergreen-800 text-4xl text-center"
          >
            {tx.howItWorks.h2}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {tx.howItWorks.cards.map((card) => (
              <div
                key={card.num}
                className="bg-evergreen-50 border border-evergreen-100 rounded-2xl p-8 flex flex-col gap-4"
              >
                <span
                  className="font-display text-evergreen-500 leading-none"
                  style={{ fontSize: "48px" }}
                  aria-hidden="true"
                >
                  {card.num}
                </span>
                <h3 className="font-display text-evergreen-800 text-2xl">
                  {card.heading}
                </h3>
                <p className="font-body text-evergreen-900 text-lg leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Two Paths ────────────────────────────────────────── */}
      <section
        className="bg-evergreen-100 w-full px-6 py-6"
        aria-label={lang === "en" ? "Ways to use TechBridge" : "Façons d'utiliser TechBridge"}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left panel — Nonprofits */}
          <div
            className="bg-evergreen-800 rounded-2xl p-10 flex flex-col gap-6"
            aria-labelledby="path-nonprofits-heading"
          >
            <h2
              id="path-nonprofits-heading"
              className="font-display text-white text-3xl leading-snug"
            >
              {tx.paths.left.h2}
            </h2>
            <p className="font-body text-white text-lg leading-relaxed">
              {tx.paths.left.body}
            </p>
            <Link
              href="/receive"
              className="self-start inline-flex items-center justify-center bg-white text-evergreen-800 font-body font-semibold text-lg rounded-full px-8 min-h-[48px] hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 mt-auto"
            >
              {tx.paths.left.cta}
            </Link>
          </div>

          {/* Right panel — Donors */}
          <div
            className="bg-white rounded-2xl p-10 flex flex-col gap-6"
            aria-labelledby="path-donors-heading"
          >
            <h2
              id="path-donors-heading"
              className="font-display text-evergreen-800 text-3xl leading-snug"
            >
              {tx.paths.right.h2}
            </h2>
            <p className="font-body text-evergreen-900 text-lg leading-relaxed">
              {tx.paths.right.body}
            </p>
            <Link
              href="/donate"
              className="self-start inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-lg rounded-full px-8 min-h-[48px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 mt-auto"
            >
              {tx.paths.right.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Footer ───────────────────────────────────────────── */}
      <footer className="bg-evergreen-900 w-full">
        {/* Main footer content */}
        <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
          {/* Left — Brand */}
          <div className="flex flex-col gap-2">
            <span className="font-display text-white" style={{ fontSize: "20px" }}>
              TechBridge
            </span>
            <p className="font-body text-evergreen-200" style={{ fontSize: "16px" }}>
              {tx.footer.tagline}
            </p>
          </div>

          {/* Centre — Notice */}
          <div className="flex items-start md:justify-center">
            <p
              className="font-body text-evergreen-200"
              style={{ fontSize: "16px" }}
            >
              {tx.footer.orgOnly}
            </p>
          </div>

          {/* Right — Contact */}
          <div className="flex flex-col gap-1 md:items-end">
            <p
              className="font-body text-evergreen-200"
              style={{ fontSize: "16px" }}
            >
              {tx.footer.contactPrefix}
            </p>
            <a
              href="mailto:admin@techbridge.ca"
              className="font-body text-white underline hover:text-evergreen-200 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 rounded"
              style={{ fontSize: "16px" }}
            >
              admin@techbridge.ca
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-evergreen-950 py-4 px-6">
          <p
            className="font-body text-white text-center"
            style={{ fontSize: "14px" }}
          >
            {tx.footer.copyright}
          </p>
        </div>
      </footer>
    </>
  );
}
