"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    hero: {
      h1: "I Need Tech",
      body: "This page is for registered nonprofits and civic organizations in the Greater Moncton Area who need donated technology.",
    },
    next: {
      h2: "What happens after you submit?",
      steps: [
        {
          heading: "We review your request",
          body: "Our admin team checks your submission within 2 to 5 business days.",
        },
        {
          heading: "Your listing goes live",
          body: "Once approved, your request appears on the donor board for companies to see.",
        },
        {
          heading: "A donor contacts you",
          body: "Interested donors will reach out to you directly using the contact information you provide.",
        },
      ],
    },
    noteLabel: "Important note",
    note: "This platform is for registered organizations only. If you are an individual and not representing a nonprofit or civic enterprise, please do not submit a request.",
    cta: "Submit a Tech Request →",
  },
  fr: {
    hero: {
      h1: "J'ai besoin de technologie",
      body: "Cette page est destinée aux organismes sans but lucratif et aux entreprises civiques enregistrés du Grand Moncton qui ont besoin de technologie donnée.",
    },
    next: {
      h2: "Que se passe-t-il après votre soumission?",
      steps: [
        {
          heading: "Nous examinons votre demande",
          body: "Notre équipe vérifie votre soumission dans 2 à 5 jours ouvrables.",
        },
        {
          heading: "Votre annonce est publiée",
          body: "Une fois approuvée, votre demande apparaît sur le tableau des donateurs.",
        },
        {
          heading: "Un donateur vous contacte",
          body: "Les donateurs intéressés vous contacteront directement.",
        },
      ],
    },
    noteLabel: "Note importante",
    note: "Cette plateforme est réservée aux organisations enregistrées. Si vous êtes un particulier et ne représentez pas un organisme sans but lucratif, veuillez ne pas soumettre de demande.",
    cta: "Soumettre une demande →",
  },
} as const;

export default function ReceivePage() {
  const { lang } = useLanguage();
  const tx = translations[lang];

  return (
    <div className="bg-evergreen-50 min-h-screen">

      {/* ── SECTION 1: Hero ──────────────────────────────────────────────── */}
      <section
        className="bg-evergreen-800 w-full px-6 py-16 flex flex-col items-center text-center"
        aria-labelledby="receive-h1"
      >
        <h1
          id="receive-h1"
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

      {/* ── SECTION 2: What Happens Next ─────────────────────────────────── */}
      <section
        className="bg-white w-full px-6 py-20"
        aria-labelledby="next-steps-heading"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-14">
          <h2
            id="next-steps-heading"
            className="font-display text-evergreen-800 text-4xl text-center"
          >
            {tx.next.h2}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            {tx.next.steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* Number circle */}
                <div
                  className="w-12 h-12 rounded-full bg-evergreen-800 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-display text-white text-xl leading-none">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-display text-evergreen-800 text-2xl leading-snug">
                  {step.heading}
                </h3>
                <p className="font-body text-evergreen-900 text-lg leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Important Note ────────────────────────────────────── */}
      <section
        className="w-full px-6 py-12 flex justify-center"
        aria-label={tx.noteLabel}
      >
        <div
          className="bg-evergreen-100 border-l-4 border-evergreen-600 rounded-lg p-6 max-w-[700px] w-full"
          role="note"
        >
          <p className="font-body text-evergreen-800 text-lg leading-relaxed">
            {tx.note}
          </p>
        </div>
      </section>

      {/* ── SECTION 4: CTA ───────────────────────────────────────────────── */}
      <section className="w-full px-6 py-16 flex justify-center">
        <Link
          href="/receive/request"
          className="inline-flex items-center justify-center bg-evergreen-800 text-white font-display rounded-full px-8 min-h-[56px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
          style={{ fontSize: "20px" }}
        >
          {tx.cta}
        </Link>
      </section>

    </div>
  );
}
