"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    badge:     "Apply for a Device",
    h1:        "Get the technology your organization needs.",
    body:      "TechBridge connects registered nonprofits and civic organizations in Greater Moncton with donated technology. Admin-reviewed. Free. Simple.",
    trust:     ["Reviewed within 2–5 business days", "For registered organizations only", "No cost to apply"],
    eligible: {
      h2:    "Who can apply?",
      sub:   "This platform is for registered organizations in the Greater Moncton Area — not for individual use.",
      items: [
        { icon: "🏢", title: "Nonprofits",          body: "Registered nonprofit organizations serving the community." },
        { icon: "🤝", title: "Civic Enterprises",   body: "Mission-driven civic organizations and social enterprises." },
        { icon: "👥", title: "Community Groups",    body: "Registered community groups with a clear program need." },
        { icon: "🌱", title: "Social Enterprises",  body: "Organizations combining business and social impact." },
      ],
    },
    steps: {
      h2:    "What happens after you apply?",
      items: [
        { num: "1", title: "Submit your request",       body: "Fill out the 3-step form with your organization details and what technology you need." },
        { num: "2", title: "Admin review (2–5 days)",   body: "Our team reviews your submission. We may reach out if we have questions." },
        { num: "3", title: "Listing goes live",         body: "Once approved, your request appears on the public Needs Board for donors to find." },
        { num: "4", title: "Donor reaches out",         body: "Interested donors contact you directly. You coordinate logistics together." },
      ],
    },
    note:  "This platform is exclusively for registered organizations. Individual requests are not accepted.",
    cta:   "Start My Request",
  },
  fr: {
    badge:     "Demander un appareil",
    h1:        "Obtenez la technologie dont votre organisation a besoin.",
    body:      "TechBridge connecte les organismes sans but lucratif et les organisations civiques enregistrés du Grand Moncton avec de la technologie donnée. Examiné par un admin. Gratuit. Simple.",
    trust:     ["Examiné dans les 2 à 5 jours ouvrables", "Pour les organisations enregistrées seulement", "Aucun frais pour postuler"],
    eligible: {
      h2:    "Qui peut postuler?",
      sub:   "Cette plateforme est réservée aux organisations enregistrées du Grand Moncton — pas au grand public.",
      items: [
        { icon: "🏢", title: "Organismes sans but lucratif", body: "Organismes à but non lucratif enregistrés servant la communauté." },
        { icon: "🤝", title: "Entreprises civiques",          body: "Organisations civiques axées sur une mission et entreprises sociales." },
        { icon: "👥", title: "Groupes communautaires",       body: "Groupes communautaires enregistrés avec un besoin de programme clair." },
        { icon: "🌱", title: "Entreprises sociales",          body: "Organisations combinant affaires et impact social." },
      ],
    },
    steps: {
      h2:    "Que se passe-t-il après votre demande?",
      items: [
        { num: "1", title: "Soumettez votre demande",        body: "Remplissez le formulaire en 3 étapes avec les détails de votre organisation et vos besoins en technologie." },
        { num: "2", title: "Examen admin (2 à 5 jours)",    body: "Notre équipe examine votre soumission. Nous pourrions vous contacter si nous avons des questions." },
        { num: "3", title: "Annonce publiée",                body: "Une fois approuvée, votre demande apparaît sur le tableau des besoins pour que les donateurs la trouvent." },
        { num: "4", title: "Un donateur vous contacte",     body: "Les donateurs intéressés vous contactent directement. Vous coordonnez la logistique ensemble." },
      ],
    },
    note:  "Cette plateforme est exclusivement réservée aux organisations enregistrées. Les demandes individuelles ne sont pas acceptées.",
    cta:   "Commencer ma demande",
  },
} as const;

export default function ReceivePage() {
  const { lang } = useLanguage();
  const tx = translations[lang];

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-evergreen-800 w-full px-6 py-16 lg:py-20" aria-labelledby="receive-h1">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 font-body text-evergreen-300 font-medium text-sm bg-evergreen-700 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-harvest flex-shrink-0" aria-hidden="true" />
            {tx.badge}
          </span>
          <h1 id="receive-h1" className="font-display text-white leading-tight" style={{ fontSize: "clamp(30px, 5vw, 46px)" }}>
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
          <Link
            href="/receive/request"
            className="mt-2 inline-flex items-center justify-center bg-harvest text-white font-body font-bold rounded-xl px-8 hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2"
            style={{ minHeight: "52px", fontSize: "17px" }}
          >
            {tx.cta}
          </Link>
        </div>
      </section>

      {/* Who can apply */}
      <section className="bg-evergreen-50 w-full px-6 py-16" aria-labelledby="eligible-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 id="eligible-heading" className="font-display text-evergreen-800 mb-3" style={{ fontSize: "32px" }}>
              {tx.eligible.h2}
            </h2>
            <p className="font-body text-evergreen-600 text-lg max-w-[520px] mx-auto">{tx.eligible.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tx.eligible.items.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 flex gap-4 items-start shadow-card border border-evergreen-100">
                <span className="text-3xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="font-display text-evergreen-800 mb-1" style={{ fontSize: "19px" }}>{item.title}</h3>
                  <p className="font-body text-evergreen-600 leading-relaxed" style={{ fontSize: "16px" }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-white w-full px-6 py-16" aria-labelledby="steps-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="steps-heading" className="font-display text-evergreen-800 text-center mb-10" style={{ fontSize: "32px" }}>
            {tx.steps.h2}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tx.steps.items.map((step) => (
              <div key={step.num} className="flex flex-col gap-4">
                <span
                  className="font-display text-white bg-harvest rounded-full w-10 h-10 flex items-center justify-center text-lg flex-shrink-0"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <h3 className="font-display text-evergreen-800 leading-snug" style={{ fontSize: "18px" }}>{step.title}</h3>
                <p className="font-body text-evergreen-600 leading-relaxed" style={{ fontSize: "15px" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important note + CTA */}
      <section className="bg-evergreen-50 w-full px-6 py-12">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 text-center">
          <div className="bg-white border-l-4 border-evergreen-600 rounded-lg p-5 text-left w-full shadow-sm" role="note">
            <p className="font-body text-evergreen-800 leading-relaxed" style={{ fontSize: "17px" }}>{tx.note}</p>
          </div>
          <Link
            href="/receive/request"
            className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-bold rounded-xl px-10 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
            style={{ minHeight: "54px", fontSize: "18px" }}
          >
            {tx.cta}
          </Link>
        </div>
      </section>

    </div>
  );
}
