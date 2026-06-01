"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Metadata } from "next";

const T = {
  en: {
    badge:   "Our Programs",
    h1:      "Technology access for every organization that needs it.",
    body:    "TechBridge runs focused programs that connect surplus technology with verified nonprofits and civic organizations in Greater Moncton. Here's how we do it.",
    programs: [
      {
        icon: "💻",
        title: "Device Donations",
        tag: "For Donors",
        body: "Businesses and organizations with surplus laptops, desktops, tablets, monitors, or accessories can donate through TechBridge. We verify receiving organizations so donors know their equipment goes where it's needed most.",
        bullets: [
          "All device types accepted (laptops, desktops, tablets, peripherals)",
          "Donors post available equipment or browse the Needs Board directly",
          "Format/wipe required before any transfer",
          "Direct connection to the receiving org — no middleman storage",
        ],
        cta: { label: "Donate a Device", href: "/donate" },
      },
      {
        icon: "🖥️",
        title: "Computer Access Program",
        tag: "For Nonprofits",
        body: "Registered nonprofits, civic enterprises, community groups, and social enterprises can submit tech requests. Once admin-approved, requests go live on the public Needs Board where donors can find and contact them.",
        bullets: [
          "Open to all registered orgs in Greater Moncton",
          "Request reviewed within 2–5 business days",
          "Listing goes live after admin approval",
          "Donor contacts org directly — no waiting queue",
        ],
        cta: { label: "Apply for a Device", href: "/receive" },
      },
      {
        icon: "🏢",
        title: "Bulk Business Donations",
        tag: "For Companies",
        body: "Upgrading your office hardware? Donate entire batches of equipment in one submission. Bulk donations help multiple organizations at once and make it easy for IT teams to clear out retired equipment responsibly.",
        bullets: [
          "Single form covers multiple devices",
          "Admin matches bulk donations to multiple orgs if needed",
          "Certificates of donation available on request",
          "Pickup coordination supported for large lots",
        ],
        cta: { label: "Post a Donation", href: "/donate" },
      },
      {
        icon: "🔧",
        title: "Device Assessment & Refurbishment",
        tag: "Quality Assurance",
        body: "All donated equipment is reviewed before being matched with receiving organizations. This ensures organizations receive equipment that actually meets their needs, and helps us maintain trust on both sides of the platform.",
        bullets: [
          "Category and condition verified at submission",
          "Minimum specs captured to match the right donor",
          "Condition self-reported by donor (Good / Fair / Refurbished)",
          "Misrepresented donations flagged and removed",
        ],
        cta: null,
      },
      {
        icon: "♻️",
        title: "Responsible Recycling",
        tag: "Environmental",
        body: "Not every donated device is usable. Devices that can't be matched with an organization are referred to certified electronics recyclers in the region, keeping them out of landfills and ensuring responsible disposal.",
        bullets: [
          "Non-functional devices accepted for recycling referral",
          "Partner with certified e-waste recyclers in New Brunswick",
          "No device ends up in general waste",
          "Contact us first to confirm your device qualifies",
        ],
        cta: { label: "Contact Us", href: "/contact" },
      },
      {
        icon: "🛡️",
        title: "Data Security Protocol",
        tag: "Security",
        body: "Data security is non-negotiable. Every donor must confirm that their device has been fully wiped and reset before donation. This is a hard gate in our platform — not advisory. We take this responsibility seriously.",
        bullets: [
          "Mandatory format confirmation before any donation can proceed",
          "Full wipe and factory reset required for all devices",
          "Platform does not accept unformatted equipment",
          "TechBridge takes no liability for data left on donated devices",
        ],
        cta: null,
      },
    ],
    bottomCTA: {
      h2:   "Ready to get involved?",
      body: "Whether you have surplus tech to donate or your organization needs equipment, TechBridge makes the process simple.",
      donate: "Donate a Device",
      apply:  "Apply for a Device",
    },
  },
  fr: {
    badge:   "Nos programmes",
    h1:      "L'accès à la technologie pour chaque organisation qui en a besoin.",
    body:    "TechBridge gère des programmes ciblés qui connectent la technologie excédentaire avec des organismes sans but lucratif vérifiés du Grand Moncton.",
    programs: [
      {
        icon: "💻",
        title: "Dons d'appareils",
        tag: "Pour les donateurs",
        body: "Les entreprises et organisations avec des ordinateurs portables, de bureau, tablettes, moniteurs ou accessoires excédentaires peuvent faire des dons via TechBridge.",
        bullets: [
          "Tous types d'appareils acceptés (portables, de bureau, tablettes, périphériques)",
          "Les donateurs publient l'équipement disponible ou parcourent directement le tableau des besoins",
          "Formatage/effacement requis avant tout transfert",
          "Connexion directe avec l'organisation réceptrice",
        ],
        cta: { label: "Donner un appareil", href: "/donate" },
      },
      {
        icon: "🖥️",
        title: "Programme d'accès informatique",
        tag: "Pour les organismes",
        body: "Les organismes sans but lucratif, entreprises civiques, groupes communautaires et entreprises sociales enregistrés peuvent soumettre des demandes de technologie.",
        bullets: [
          "Ouvert à tous les organismes enregistrés du Grand Moncton",
          "Demande examinée dans les 2 à 5 jours ouvrables",
          "Annonce publiée après approbation de l'administrateur",
          "Le donateur contacte directement l'organisation",
        ],
        cta: { label: "Demander un appareil", href: "/receive" },
      },
      {
        icon: "🏢",
        title: "Dons d'entreprises en vrac",
        tag: "Pour les entreprises",
        body: "Vous mettez à niveau votre matériel informatique? Donnez des lots entiers d'équipements en une seule soumission.",
        bullets: [
          "Un seul formulaire couvre plusieurs appareils",
          "L'administrateur associe les dons en vrac à plusieurs organismes si nécessaire",
          "Certificats de don disponibles sur demande",
          "Coordination de la collecte pour les grands lots",
        ],
        cta: { label: "Publier un don", href: "/donate" },
      },
      {
        icon: "🔧",
        title: "Évaluation et remise à neuf",
        tag: "Assurance qualité",
        body: "Tout l'équipement donné est examiné avant d'être associé aux organisations réceptrices.",
        bullets: [
          "Catégorie et état vérifiés à la soumission",
          "Spécifications minimales capturées pour associer le bon donateur",
          "État déclaré par le donateur (Bon / Acceptable / Remis à neuf)",
          "Dons inexacts signalés et retirés",
        ],
        cta: null,
      },
      {
        icon: "♻️",
        title: "Recyclage responsable",
        tag: "Environnement",
        body: "Les appareils qui ne peuvent pas être associés à une organisation sont référés à des recycleurs certifiés.",
        bullets: [
          "Appareils non fonctionnels acceptés pour référence au recyclage",
          "Partenariat avec des recycleurs certifiés de déchets électroniques",
          "Aucun appareil ne se retrouve dans les ordures générales",
          "Contactez-nous d'abord pour confirmer l'admissibilité",
        ],
        cta: { label: "Contactez-nous", href: "/contact" },
      },
      {
        icon: "🛡️",
        title: "Protocole de sécurité des données",
        tag: "Sécurité",
        body: "La sécurité des données est non négociable. Chaque donateur doit confirmer que son appareil a été entièrement effacé et réinitialisé avant le don.",
        bullets: [
          "Confirmation de formatage obligatoire avant tout don",
          "Effacement complet et réinitialisation aux paramètres d'usine requis",
          "La plateforme n'accepte pas les équipements non formatés",
          "TechBridge décline toute responsabilité pour les données laissées",
        ],
        cta: null,
      },
    ],
    bottomCTA: {
      h2:   "Prêt à vous impliquer?",
      body: "Que vous ayez de la technologie excédentaire à donner ou que votre organisation ait besoin d'équipements, TechBridge simplifie le processus.",
      donate: "Donner un appareil",
      apply:  "Demander un appareil",
    },
  },
} as const;

export default function ProgramsPage() {
  const { lang } = useLanguage();
  const tx = T[lang];

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-evergreen-800 w-full px-6 py-16 lg:py-20 text-center" aria-labelledby="programs-h1">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <span className="inline-flex items-center gap-2 font-body text-evergreen-300 font-medium text-sm bg-evergreen-700 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-harvest flex-shrink-0" aria-hidden="true" />
            {tx.badge}
          </span>
          <h1 id="programs-h1" className="font-display text-white leading-tight" style={{ fontSize: "clamp(30px, 5vw, 46px)" }}>
            {tx.h1}
          </h1>
          <p className="font-body text-evergreen-200 leading-relaxed max-w-[560px]" style={{ fontSize: "18px" }}>
            {tx.body}
          </p>
        </div>
      </section>

      {/* Programs list */}
      <section className="bg-evergreen-50 w-full px-6 py-16" aria-label={lang === "en" ? "Program details" : "Détails des programmes"}>
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {tx.programs.map((prog) => (
            <article
              key={prog.title}
              className="bg-white rounded-2xl shadow-card border border-evergreen-100 overflow-hidden"
            >
              <div className="h-1 bg-evergreen-600 w-full" aria-hidden="true" />
              <div className="p-8 flex flex-col gap-5">
                <div className="flex items-start gap-4 flex-wrap">
                  <span className="text-4xl flex-shrink-0" aria-hidden="true">{prog.icon}</span>
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider">{prog.tag}</span>
                    <h2 className="font-display text-evergreen-800 leading-snug" style={{ fontSize: "26px" }}>{prog.title}</h2>
                  </div>
                </div>
                <p className="font-body text-evergreen-700 leading-relaxed" style={{ fontSize: "17px" }}>{prog.body}</p>
                <ul className="flex flex-col gap-2">
                  {prog.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 font-body text-evergreen-700" style={{ fontSize: "16px" }}>
                      <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <circle cx="9" cy="9" r="8" fill="#deede7" />
                        <path d="M5.5 9l2.5 2.5L12.5 6.5" stroke="#254135" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
                {prog.cta && (
                  <div>
                    <Link
                      href={prog.cta.href}
                      className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold rounded-xl px-6 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-0 min-w-0"
                      style={{ minHeight: "46px", fontSize: "16px" }}
                    >
                      {prog.cta.label} →
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-evergreen-800 w-full px-6 py-16 text-center" aria-labelledby="programs-bottom-cta">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h2 id="programs-bottom-cta" className="font-display text-white" style={{ fontSize: "34px" }}>
            {tx.bottomCTA.h2}
          </h2>
          <p className="font-body text-evergreen-200 text-lg leading-relaxed">{tx.bottomCTA.body}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/donate"
              className="inline-flex items-center justify-center bg-harvest text-white font-body font-bold rounded-xl px-8 hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2"
              style={{ minHeight: "52px", fontSize: "17px" }}>
              {tx.bottomCTA.donate}
            </Link>
            <Link href="/receive"
              className="inline-flex items-center justify-center border-2 border-evergreen-500 text-white font-body font-semibold rounded-xl px-8 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2"
              style={{ minHeight: "52px", fontSize: "17px" }}>
              {tx.bottomCTA.apply}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
