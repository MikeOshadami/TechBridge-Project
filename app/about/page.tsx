"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const T = {
  en: {
    badge:  "About TechBridge",
    h1:     "Built for Greater Moncton. Built for community.",
    body:   "TechBridge is a free, bilingual civic tech platform created to solve a local problem: organizations that need technology can't find it, and companies with surplus tech don't know who needs it.",
    mission: {
      h2:   "Our mission",
      body: "To build a trusted, accessible bridge between technology donors and the nonprofits and civic organizations that need it most — starting in Greater Moncton, New Brunswick.",
    },
    story: {
      h2:   "The problem we're solving",
      p1:   "Nonprofits in Greater Moncton regularly tell us they need computers, laptops, and basic peripherals to run their programs — but they can't afford them at market prices, and they don't have an easy way to connect with companies that are retiring equipment.",
      p2:   "At the same time, companies routinely retire functional technology with no efficient, local channel to donate it responsibly. Devices that could support a family literacy program or a newcomer settlement service end up in storage — or worse, landfill.",
      p3:   "TechBridge closes that gap. It's a simple, admin-verified request-and-match system that makes donating and requesting technology as frictionless as possible.",
    },
    values: {
      h2:   "What we stand for",
      items: [
        { icon: "🤝", title: "Trust",        body: "Every request is admin-reviewed before going live. No unverified listings. No noise." },
        { icon: "🔒", title: "Security",     body: "Data wipe is mandatory, not advisory. We enforce it as a hard gate, not a suggestion." },
        { icon: "🌍", title: "Accessibility", body: "Fully bilingual EN/FR. WCAG 2.1 AA compliant. Designed for users of all tech levels." },
        { icon: "🏘️", title: "Community",   body: "Serving the Greater Moncton Area — Moncton, Riverview, Dieppe, and surrounding communities." },
      ],
    },
    built: {
      h2:   "Built by CivicTech Moncton",
      body: "TechBridge is a project of CivicTech Moncton — a volunteer-driven civic technology community working to use technology to solve local problems. We build tools that serve our community.",
    },
    cta: {
      h2:    "Want to get involved?",
      body:  "Whether you're donating, applying, or want to partner with us — we'd love to hear from you.",
      donate:  "Donate a Device",
      apply:   "Apply for a Device",
      contact: "Contact Us",
    },
  },
  fr: {
    badge:  "À propos de TechBridge",
    h1:     "Construit pour le Grand Moncton. Construit pour la communauté.",
    body:   "TechBridge est une plateforme technologique civique gratuite et bilingue créée pour résoudre un problème local: les organisations qui ont besoin de technologie ne peuvent pas la trouver, et les entreprises avec de la technologie excédentaire ne savent pas qui en a besoin.",
    mission: {
      h2:   "Notre mission",
      body: "Construire un pont de confiance et accessible entre les donateurs de technologie et les organismes sans but lucratif et les organisations civiques qui en ont le plus besoin — en commençant par le Grand Moncton, Nouveau-Brunswick.",
    },
    story: {
      h2:   "Le problème que nous résolvons",
      p1:   "Les organismes sans but lucratif du Grand Moncton nous disent régulièrement qu'ils ont besoin d'ordinateurs et de périphériques de base, mais ils ne peuvent pas se les offrir aux prix du marché.",
      p2:   "En même temps, les entreprises retirent régulièrement de la technologie fonctionnelle sans canal local efficace pour la donner de manière responsable.",
      p3:   "TechBridge comble cet écart avec un système simple de demande et d'association, vérifié par un administrateur.",
    },
    values: {
      h2:   "Ce que nous défendons",
      items: [
        { icon: "🤝", title: "Confiance",      body: "Chaque demande est examinée par un administrateur avant d'être publiée. Pas d'annonces non vérifiées." },
        { icon: "🔒", title: "Sécurité",       body: "L'effacement des données est obligatoire, pas optionnel. Nous l'appliquons comme condition préalable." },
        { icon: "🌍", title: "Accessibilité",  body: "Entièrement bilingue EN/FR. Conforme WCAG 2.1 AA. Conçu pour les utilisateurs de tous niveaux." },
        { icon: "🏘️", title: "Communauté",    body: "Service du Grand Moncton — Moncton, Riverview, Dieppe et les communautés environnantes." },
      ],
    },
    built: {
      h2:   "Construit par CivicTech Moncton",
      body: "TechBridge est un projet de CivicTech Moncton — une communauté bénévole de technologie civique qui utilise la technologie pour résoudre des problèmes locaux.",
    },
    cta: {
      h2:    "Vous souhaitez vous impliquer?",
      body:  "Que vous donniez, demandiez ou souhaitiez un partenariat — nous serions ravis d'avoir de vos nouvelles.",
      donate:  "Donner un appareil",
      apply:   "Demander un appareil",
      contact: "Contactez-nous",
    },
  },
} as const;

export default function AboutPage() {
  const { lang } = useLanguage();
  const tx = T[lang];

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-evergreen-800 w-full px-6 py-16 lg:py-20 text-center" aria-labelledby="about-h1">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <span className="inline-flex items-center gap-2 font-body text-evergreen-300 font-medium text-sm bg-evergreen-700 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-harvest flex-shrink-0" aria-hidden="true" />
            {tx.badge}
          </span>
          <h1 id="about-h1" className="font-display text-white leading-tight" style={{ fontSize: "clamp(30px, 5vw, 46px)" }}>
            {tx.h1}
          </h1>
          <p className="font-body text-evergreen-200 leading-relaxed max-w-[580px]" style={{ fontSize: "18px" }}>
            {tx.body}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-evergreen-50 w-full px-6 py-16" aria-labelledby="mission-heading">
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 bg-harvest rounded-full flex-shrink-0" aria-hidden="true" />
            <h2 id="mission-heading" className="font-display text-evergreen-800" style={{ fontSize: "32px" }}>{tx.mission.h2}</h2>
          </div>
          <p className="font-body text-evergreen-700 leading-relaxed text-xl font-medium border-l-4 border-evergreen-200 pl-6">
            {tx.mission.body}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white w-full px-6 py-16" aria-labelledby="story-heading">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <h2 id="story-heading" className="font-display text-evergreen-800" style={{ fontSize: "32px" }}>{tx.story.h2}</h2>
          <div className="prose-techbridge flex flex-col gap-5">
            {[tx.story.p1, tx.story.p2, tx.story.p3].map((p, i) => (
              <p key={i} className="font-body text-evergreen-700 leading-relaxed" style={{ fontSize: "18px" }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-evergreen-50 w-full px-6 py-16" aria-labelledby="values-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="values-heading" className="font-display text-evergreen-800 mb-10 text-center" style={{ fontSize: "32px" }}>{tx.values.h2}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tx.values.items.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 flex gap-4 shadow-card border border-evergreen-100">
                <span className="text-3xl flex-shrink-0" aria-hidden="true">{v.icon}</span>
                <div>
                  <h3 className="font-display text-evergreen-800 mb-1" style={{ fontSize: "20px" }}>{v.title}</h3>
                  <p className="font-body text-evergreen-600 leading-relaxed" style={{ fontSize: "16px" }}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built by */}
      <section className="bg-white w-full px-6 py-14" aria-labelledby="built-heading">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <h2 id="built-heading" className="font-display text-evergreen-800" style={{ fontSize: "28px" }}>{tx.built.h2}</h2>
          <p className="font-body text-evergreen-700 leading-relaxed" style={{ fontSize: "18px" }}>{tx.built.body}</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-evergreen-800 w-full px-6 py-16 text-center" aria-labelledby="about-cta">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h2 id="about-cta" className="font-display text-white" style={{ fontSize: "32px" }}>{tx.cta.h2}</h2>
          <p className="font-body text-evergreen-200 text-lg">{tx.cta.body}</p>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap justify-center">
            <Link href="/donate"
              className="inline-flex items-center justify-center bg-harvest text-white font-body font-bold rounded-xl px-7 hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2"
              style={{ minHeight: "50px", fontSize: "16px" }}>
              {tx.cta.donate}
            </Link>
            <Link href="/receive"
              className="inline-flex items-center justify-center border-2 border-evergreen-500 text-white font-body font-semibold rounded-xl px-7 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2"
              style={{ minHeight: "50px", fontSize: "16px" }}>
              {tx.cta.apply}
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center bg-white text-evergreen-800 font-body font-semibold rounded-xl px-7 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2"
              style={{ minHeight: "50px", fontSize: "16px" }}>
              {tx.cta.contact}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
