"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function LaptopIcon({ cls = "" }: { cls?: string }) {
  return (
    <svg className={cls} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="26" height="17" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M1 24h30M11 27h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function UsersIcon({ cls = "" }: { cls?: string }) {
  return (
    <svg className={cls} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M4 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M28 26c0-3.3-2-6-4.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function RecycleIcon({ cls = "" }: { cls?: string }) {
  return (
    <svg className={cls} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4l-4 7h8l-4-7z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M6 28h8l-2-3.5L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M26 28l-5-8.5L15 24l3 4h8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function MonitorIcon({ cls = "" }: { cls?: string }) {
  return (
    <svg className={cls} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 28h8M16 22v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function BuildingIcon({ cls = "" }: { cls?: string }) {
  return (
    <svg className={cls} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="24" height="20" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M4 8l12-4 12 4M12 28v-8h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function ShieldIcon({ cls = "" }: { cls?: string }) {
  return (
    <svg className={cls} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3L4 8v8c0 7 5.3 13.5 12 15 6.7-1.5 12-8 12-15V8L16 3z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M11 16l3.5 3.5L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
      style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckCircleIcon({ cls = "" }: { cls?: string }) {
  return (
    <svg className={cls} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M6 9l2.5 2.5L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
  en: {
    hero: {
      eyebrow: "Helping communities access technology",
      h1:      "Give unused technology a second life.",
      body:    "Donate laptops, desktops, and accessories to help nonprofits, civic organizations, and communities across Greater Moncton get the tools they need — free.",
      donate:  "Donate a Device",
      apply:   "Apply for a Device",
      trust:   "Admin-verified  •  Bilingual  •  WCAG accessible  •  Greater Moncton",
    },
    stats: {
      heading: "Our impact so far",
      items: [
        { number: "250+",  label: "Devices donated" },
        { number: "45+",   label: "Organizations supported" },
        { number: "180+",  label: "Devices recycled" },
        { number: "12+",   label: "Partner organizations" },
      ],
    },
    how: {
      heading: "How it works",
      sub:     "Whether you're donating or applying, the process is simple.",
      tabs:    { donors: "For Donors", applicants: "For Applicants" },
      donors: [
        { num: "1", title: "Tell us what you have",       body: "Submit a quick form with device details. Takes less than 5 minutes." },
        { num: "2", title: "Format your device",          body: "Wipe all data and reset to factory settings before handing it over." },
        { num: "3", title: "Match with a need",           body: "Browse our Needs Board and connect with a local organization." },
        { num: "4", title: "Drop off or arrange pickup",  body: "Coordinate logistics directly with the receiving organization." },
      ],
      applicants: [
        { num: "1", title: "Submit your request",     body: "Fill out a short form about your org and the tech you need. Under 5 minutes." },
        { num: "2", title: "Admin review",            body: "Our team reviews every submission within 2–5 business days." },
        { num: "3", title: "Go live on the board",    body: "Once approved, your request is published so donors can find you." },
        { num: "4", title: "Connect with a donor",    body: "Donors reach out directly. Coordinate pickup or delivery and receive your equipment." },
      ],
    },
    programs: {
      heading: "Our programs",
      sub:     "TechBridge connects technology with those who need it through several focused programs.",
      cards: [
        { icon: "laptop",   title: "Device Donations",            body: "Businesses donate surplus laptops, desktops, tablets, and accessories to verified nonprofits." },
        { icon: "users",    title: "Computer Access Program",     body: "Nonprofits apply for refurbished devices to support digital inclusion in their communities." },
        { icon: "building", title: "Bulk Business Donations",     body: "Companies upgrading hardware can donate entire batches in a single, simple process." },
        { icon: "monitor",  title: "Device Refurbishment",        body: "All donated equipment is assessed and cleaned before being matched with a receiving org." },
        { icon: "recycle",  title: "Responsible Recycling",       body: "Devices that can't be reused are recycled responsibly — keeping electronics out of landfills." },
        { icon: "shield",   title: "Data Security First",         body: "Every donor must wipe their device. We enforce this with a mandatory confirmation step." },
      ],
      more: "Learn more about our programs →",
    },
    donateBanner: {
      eyebrow: "Have surplus tech?",
      heading: "Your old laptop could change someone's world.",
      body:    "Laptops, desktops, tablets, monitors, accessories — if it works, someone in Greater Moncton needs it. Starting a donation takes 5 minutes.",
      cta:     "Donate a Device",
    },
    applyBanner: {
      eyebrow: "Need tech equipment?",
      heading: "Get the tools your organization needs.",
      body:    "Nonprofits, civic enterprises, community groups, and social enterprises in Greater Moncton can apply for donated technology. Reviewed within 2–5 business days.",
      cta:     "Apply for a Device",
      items:   ["Nonprofits", "Civic enterprises", "Community groups", "Social enterprises"],
    },
    testimonials: {
      heading: "Stories of impact",
      sub:     "Real organizations. Real outcomes.",
      items: [
        {
          quote: "TechBridge connected us with a company donating 8 laptops we desperately needed for our literacy program. Our clients can now access digital learning tools for the first time.",
          name:  "Sarah Boudreau",
          role:  "Program Director, NB Literacy Council",
        },
        {
          quote: "We had 12 old workstations in storage after our office upgrade. TechBridge made the donation process painless — matched us with a local nonprofit the same week.",
          name:  "Mark Leblanc",
          role:  "IT Manager, Riverview Tech Solutions",
        },
        {
          quote: "As a newcomer settlement organization, volunteers were using personal phones for everything. Now we have dedicated devices thanks to TechBridge. Incredible service.",
          name:  "Isabelle Léger",
          role:  "Executive Director, Moncton Multicultural Association",
        },
      ],
    },
    faq: {
      heading: "Frequently asked questions",
      more:    "Still have questions?",
      contact: "Contact us →",
      items: [
        { q: "What devices can I donate?",            a: "We accept laptops, desktops, monitors, tablets, keyboards, mice, printers, and accessories. Devices should be in working or near-working condition." },
        { q: "Do you accept broken devices?",         a: "We prioritize working devices. Non-working devices may be accepted for responsible recycling — contact us first to confirm." },
        { q: "Is pickup available?",                  a: "TechBridge facilitates the connection. Logistics (pickup, drop-off, shipping) are coordinated directly between donors and receiving organizations." },
        { q: "Who can apply for devices?",            a: "Registered nonprofits, civic enterprises, social enterprises, and community groups in the Greater Moncton Area. Organizations only — not individuals." },
        { q: "How long does the review take?",        a: "Admin reviews all requests within 2–5 business days. You'll receive an email when your request is approved or if more info is needed." },
        { q: "Is my data wiped securely?",            a: "All donors must fully format and wipe devices before donation. This is mandatory — devices must be reset to factory settings with all data removed." },
      ],
    },
  },
  fr: {
    hero: {
      eyebrow: "Aidons les communautés à accéder à la technologie",
      h1:      "Donnez une deuxième vie à la technologie inutilisée.",
      body:    "Faites don d'ordinateurs portables, de bureaux et d'accessoires pour aider les organismes sans but lucratif et les communautés du Grand Moncton à obtenir les outils dont ils ont besoin — gratuitement.",
      donate:  "Donner un appareil",
      apply:   "Demander un appareil",
      trust:   "Vérifié par un admin  •  Bilingue  •  Accessible WCAG  •  Grand Moncton",
    },
    stats: {
      heading: "Notre impact jusqu'à présent",
      items: [
        { number: "250+",  label: "Appareils donnés" },
        { number: "45+",   label: "Organisations soutenues" },
        { number: "180+",  label: "Appareils recyclés" },
        { number: "12+",   label: "Organisations partenaires" },
      ],
    },
    how: {
      heading: "Comment ça fonctionne",
      sub:     "Que vous donniez ou demandiez, le processus est simple.",
      tabs:    { donors: "Pour les donateurs", applicants: "Pour les demandeurs" },
      donors: [
        { num: "1", title: "Dites-nous ce que vous avez",      body: "Remplissez un formulaire rapide avec les détails de l'appareil. Moins de 5 minutes." },
        { num: "2", title: "Formatez votre appareil",          body: "Effacez toutes les données et réinitialisez l'appareil aux paramètres d'usine." },
        { num: "3", title: "Correspondance avec un besoin",    body: "Parcourez notre tableau des besoins et contactez une organisation locale." },
        { num: "4", title: "Déposez ou organisez la collecte", body: "Coordonnez la logistique directement avec l'organisation réceptrice." },
      ],
      applicants: [
        { num: "1", title: "Soumettez votre demande",          body: "Remplissez un court formulaire sur votre org et la technologie dont vous avez besoin." },
        { num: "2", title: "Révision administrative",          body: "Notre équipe examine chaque soumission dans les 2 à 5 jours ouvrables." },
        { num: "3", title: "Publication sur le tableau",       body: "Une fois approuvée, votre demande est publiée sur le tableau des besoins." },
        { num: "4", title: "Connectez-vous avec un donateur",  body: "Les donateurs vous contactent directement pour coordonner la remise." },
      ],
    },
    programs: {
      heading: "Nos programmes",
      sub:     "TechBridge connecte la technologie avec ceux qui en ont besoin grâce à plusieurs programmes ciblés.",
      cards: [
        { icon: "laptop",   title: "Dons d'appareils",              body: "Les entreprises donnent des ordinateurs portables, de bureau, tablettes et accessoires à des organismes vérifiés." },
        { icon: "users",    title: "Programme d'accès informatique", body: "Les organismes demandent des appareils remis à neuf pour soutenir l'inclusion numérique." },
        { icon: "building", title: "Dons d'entreprises en vrac",    body: "Les entreprises mettant à jour leur matériel peuvent donner des lots entiers en une seule démarche." },
        { icon: "monitor",  title: "Remise à neuf des appareils",   body: "Tout l'équipement donné est évalué et nettoyé avant d'être associé à une organisation." },
        { icon: "recycle",  title: "Recyclage responsable",         body: "Les appareils qui ne peuvent pas être réutilisés sont recyclés de manière responsable." },
        { icon: "shield",   title: "Sécurité des données",          body: "Chaque donateur doit effacer son appareil avant le don. Étape de confirmation obligatoire." },
      ],
      more: "En savoir plus sur nos programmes →",
    },
    donateBanner: {
      eyebrow: "Vous avez de la technologie excédentaire?",
      heading: "Votre vieux portable pourrait changer la vie de quelqu'un.",
      body:    "Portables, bureaux, tablettes, moniteurs, accessoires — si ça fonctionne, quelqu'un en a besoin. Le don commence en 5 minutes.",
      cta:     "Donner un appareil",
    },
    applyBanner: {
      eyebrow: "Besoin d'équipements technologiques?",
      heading: "Obtenez les outils dont votre organisation a besoin.",
      body:    "Les organismes à but non lucratif, entreprises civiques, groupes communautaires et entreprises sociales du Grand Moncton peuvent demander de la technologie donnée.",
      cta:     "Demander un appareil",
      items:   ["Organismes sans but lucratif", "Entreprises civiques", "Groupes communautaires", "Entreprises sociales"],
    },
    testimonials: {
      heading: "Histoires d'impact",
      sub:     "De vraies organisations. De vrais résultats.",
      items: [
        {
          quote: "TechBridge nous a mis en contact avec une entreprise qui donnait 8 ordinateurs dont nous avions désespérément besoin pour notre programme d'alphabétisation.",
          name:  "Sarah Boudreau",
          role:  "Directrice de programme, Conseil en alphabétisation du N.-B.",
        },
        {
          quote: "Nous avions 12 vieux postes de travail en entrepôt. TechBridge a rendu le processus de don sans douleur — mis en relation avec un organisme la même semaine.",
          name:  "Marc Leblanc",
          role:  "Gestionnaire TI, Riverview Tech Solutions",
        },
        {
          quote: "En tant qu'organisation pour nouveaux arrivants, nos bénévoles utilisaient leurs téléphones personnels. Maintenant nous avons des appareils dédiés grâce à TechBridge.",
          name:  "Isabelle Léger",
          role:  "Directrice générale, Association multiculturelle de Moncton",
        },
      ],
    },
    faq: {
      heading: "Questions fréquentes",
      more:    "D'autres questions?",
      contact: "Contactez-nous →",
      items: [
        { q: "Quels appareils puis-je donner?",                    a: "Nous acceptons les ordinateurs portables, de bureau, moniteurs, tablettes, claviers, souris, imprimantes et accessoires en état de marche." },
        { q: "Acceptez-vous les appareils défectueux?",            a: "Nous priorisons les appareils fonctionnels. Les appareils non fonctionnels peuvent être acceptés pour recyclage — contactez-nous d'abord." },
        { q: "La collecte est-elle disponible?",                   a: "TechBridge facilite la connexion. La logistique est coordonnée directement entre donateurs et organisations réceptrices." },
        { q: "Qui peut demander des appareils?",                   a: "Les organismes sans but lucratif, entreprises civiques, sociales et groupes communautaires enregistrés du Grand Moncton. Organisations seulement." },
        { q: "Combien de temps dure l'examen?",                   a: "Les administrateurs examinent toutes les demandes dans les 2 à 5 jours ouvrables. Notification par courriel." },
        { q: "Mes données sont-elles effacées de façon sécurisée?", a: "Tous les donateurs doivent formater et effacer entièrement leurs appareils avant le don. Étape obligatoire." },
      ],
    },
  },
} as const;

// ─── Program icon map ─────────────────────────────────────────────────────────

const iconMap: Record<string, (props: { cls?: string }) => JSX.Element> = {
  laptop:   LaptopIcon,
  users:    UsersIcon,
  recycle:  RecycleIcon,
  building: BuildingIcon,
  monitor:  MonitorIcon,
  shield:   ShieldIcon,
};

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-evergreen-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-body font-semibold text-evergreen-800 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-[-3px] min-h-0 min-w-0"
        aria-expanded={open}
        style={{ fontSize: "18px" }}
      >
        <span className="pr-4">{q}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="px-6 pb-6 animate-fade-in-up">
          <p className="font-body text-evergreen-700 leading-relaxed" style={{ fontSize: "17px" }}>
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { lang } = useLanguage();
  const tx = T[lang];
  const [howTab, setHowTab] = useState<"donors" | "applicants">("donors");

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════════════════════ */}
      <section
        className="bg-evergreen-800 w-full px-6 py-20 lg:py-28"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <div className="flex flex-col items-start gap-6 lg:flex-1">
            <span className="inline-flex items-center gap-2 font-body text-evergreen-300 font-medium text-sm bg-evergreen-700 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-harvest flex-shrink-0" aria-hidden="true" />
              {tx.hero.eyebrow}
            </span>
            <h1
              id="hero-heading"
              className="font-display text-white leading-tight"
              style={{ fontSize: "clamp(36px, 5vw, 54px)" }}
            >
              {tx.hero.h1}
            </h1>
            <p className="font-body text-evergreen-200 leading-relaxed max-w-[540px]" style={{ fontSize: "19px" }}>
              {tx.hero.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center bg-harvest text-white font-body font-bold rounded-xl px-7 hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2"
                style={{ minHeight: "52px", fontSize: "17px" }}
              >
                {tx.hero.donate}
              </Link>
              <Link
                href="/receive"
                className="inline-flex items-center justify-center border-2 border-evergreen-500 text-white font-body font-semibold rounded-xl px-7 hover:bg-evergreen-700 hover:border-evergreen-400 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2"
                style={{ minHeight: "52px", fontSize: "17px" }}
              >
                {tx.hero.apply}
              </Link>
            </div>
            <p className="font-body text-evergreen-500 text-sm">{tx.hero.trust}</p>
          </div>

          {/* Visual block */}
          <div className="hidden lg:flex flex-col items-center justify-center flex-shrink-0" aria-hidden="true">
            <div className="relative">
              <div className="w-72 h-52 bg-evergreen-700 rounded-2xl flex items-center justify-center border border-evergreen-600">
                <div className="w-52 h-36 bg-evergreen-600 rounded-xl flex items-center justify-center">
                  <LaptopIcon cls="text-evergreen-300 w-20 h-20" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-harvest text-white rounded-xl px-4 py-3 shadow-lg">
                <p className="font-display text-2xl leading-none font-bold">250+</p>
                <p className="font-body text-sm text-amber-100">Devices donated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2 — IMPACT STATS
      ════════════════════════════════════════════════════════════ */}
      <section
        className="bg-white border-b border-evergreen-100 w-full"
        aria-labelledby="stats-heading"
      >
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2
            id="stats-heading"
            className="font-display text-evergreen-800 text-center mb-10"
            style={{ fontSize: "28px" }}
          >
            {tx.stats.heading}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {tx.stats.items.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <span
                  className="font-display text-harvest leading-none"
                  style={{ fontSize: "clamp(38px, 5vw, 54px)" }}
                  aria-label={`${stat.number} ${stat.label}`}
                >
                  {stat.number}
                </span>
                <span className="font-body text-evergreen-600 font-medium text-base">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — HOW IT WORKS
      ════════════════════════════════════════════════════════════ */}
      <section
        className="bg-evergreen-50 w-full px-6 py-20"
        aria-labelledby="how-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 id="how-heading" className="font-display text-evergreen-800 mb-3" style={{ fontSize: "36px" }}>
              {tx.how.heading}
            </h2>
            <p className="font-body text-evergreen-600 text-lg">{tx.how.sub}</p>
          </div>

          {/* Tab switcher */}
          <div
            className="flex bg-white rounded-xl p-1 gap-1 border border-evergreen-100 shadow-card max-w-sm mx-auto mb-10"
            role="tablist"
          >
            {(["donors", "applicants"] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={howTab === tab}
                onClick={() => setHowTab(tab)}
                className={`flex-1 font-body font-semibold text-base rounded-lg px-3 py-2.5 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 min-h-0 min-w-0 ${
                  howTab === tab
                    ? "bg-evergreen-800 text-white"
                    : "text-evergreen-600 hover:text-evergreen-800 hover:bg-evergreen-50"
                }`}
              >
                {tx.how.tabs[tab]}
              </button>
            ))}
          </div>

          {/* Steps grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            role="tabpanel"
          >
            {tx.how[howTab].map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-card border border-evergreen-100"
              >
                <span
                  className="font-display text-white bg-harvest rounded-full w-10 h-10 flex items-center justify-center text-lg flex-shrink-0"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <h3 className="font-display text-evergreen-800 leading-snug" style={{ fontSize: "19px" }}>
                  {step.title}
                </h3>
                <p className="font-body text-evergreen-600 leading-relaxed" style={{ fontSize: "16px" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4 — PROGRAMS
      ════════════════════════════════════════════════════════════ */}
      <section
        className="bg-white w-full px-6 py-20"
        aria-labelledby="programs-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="programs-heading" className="font-display text-evergreen-800 mb-3" style={{ fontSize: "36px" }}>
              {tx.programs.heading}
            </h2>
            <p className="font-body text-evergreen-600 text-lg max-w-[600px] mx-auto">{tx.programs.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tx.programs.cards.map((card) => {
              const Icon = iconMap[card.icon] ?? LaptopIcon;
              return (
                <div
                  key={card.title}
                  className="bg-evergreen-50 border border-evergreen-100 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-card hover:border-evergreen-200 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-white border border-evergreen-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon cls="text-evergreen-700" />
                  </div>
                  <h3 className="font-display text-evergreen-800 leading-snug" style={{ fontSize: "19px" }}>
                    {card.title}
                  </h3>
                  <p className="font-body text-evergreen-600 leading-relaxed" style={{ fontSize: "15px" }}>
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center font-body font-semibold text-evergreen-800 border-2 border-evergreen-200 rounded-xl px-8 hover:bg-evergreen-50 hover:border-evergreen-300 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-0 min-w-0"
              style={{ minHeight: "50px", fontSize: "17px" }}
            >
              {tx.programs.more}
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 5 — DONATE CTA BANNER
      ════════════════════════════════════════════════════════════ */}
      <section
        className="bg-harvest w-full px-6 py-16"
        aria-labelledby="donate-banner-heading"
      >
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-body text-amber-200 font-semibold text-sm uppercase tracking-wider">
              {tx.donateBanner.eyebrow}
            </span>
            <h2
              id="donate-banner-heading"
              className="font-display text-white leading-tight"
              style={{ fontSize: "clamp(26px, 4vw, 40px)" }}
            >
              {tx.donateBanner.heading}
            </h2>
            <p className="font-body text-amber-100 leading-relaxed max-w-[500px]" style={{ fontSize: "18px" }}>
              {tx.donateBanner.body}
            </p>
          </div>
          <Link
            href="/donate"
            className="flex-shrink-0 inline-flex items-center justify-center bg-white text-harvest font-body font-bold rounded-xl px-8 hover:bg-amber-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 whitespace-nowrap"
            style={{ minHeight: "54px", fontSize: "17px" }}
          >
            {tx.donateBanner.cta}
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 6 — APPLY CTA BANNER
      ════════════════════════════════════════════════════════════ */}
      <section
        className="bg-evergreen-800 w-full px-6 py-16"
        aria-labelledby="apply-banner-heading"
      >
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-body text-evergreen-400 font-semibold text-sm uppercase tracking-wider">
              {tx.applyBanner.eyebrow}
            </span>
            <h2
              id="apply-banner-heading"
              className="font-display text-white leading-tight"
              style={{ fontSize: "clamp(26px, 4vw, 40px)" }}
            >
              {tx.applyBanner.heading}
            </h2>
            <p className="font-body text-evergreen-200 leading-relaxed max-w-[480px]" style={{ fontSize: "18px" }}>
              {tx.applyBanner.body}
            </p>
            <ul className="flex flex-wrap gap-2">
              {tx.applyBanner.items.map((item) => (
                <li key={item}>
                  <span className="inline-flex items-center gap-1.5 bg-evergreen-700 text-evergreen-200 rounded-full px-3 py-1.5 font-body text-sm">
                    <CheckCircleIcon cls="text-evergreen-400 flex-shrink-0" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/receive"
            className="flex-shrink-0 inline-flex items-center justify-center bg-white text-evergreen-800 font-body font-bold rounded-xl px-8 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 whitespace-nowrap"
            style={{ minHeight: "54px", fontSize: "17px" }}
          >
            {tx.applyBanner.cta}
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 7 — TESTIMONIALS
      ════════════════════════════════════════════════════════════ */}
      <section
        className="bg-evergreen-50 w-full px-6 py-20"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="font-display text-evergreen-800 mb-2" style={{ fontSize: "36px" }}>
              {tx.testimonials.heading}
            </h2>
            <p className="font-body text-evergreen-600 text-lg">{tx.testimonials.sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tx.testimonials.items.map((t) => (
              <figure
                key={t.name}
                className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-card border border-evergreen-100"
              >
                <span className="font-display text-harvest leading-none select-none" style={{ fontSize: "52px" }} aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>
                  <p className="font-body text-evergreen-800 leading-relaxed" style={{ fontSize: "16px" }}>
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-auto pt-4 border-t border-evergreen-100">
                  <p className="font-body font-semibold text-evergreen-800 text-base">{t.name}</p>
                  <p className="font-body text-evergreen-500 text-sm">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 8 — FAQ
      ════════════════════════════════════════════════════════════ */}
      <section
        className="bg-white w-full px-6 py-20"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto">
          <h2
            id="faq-heading"
            className="font-display text-evergreen-800 text-center mb-10"
            style={{ fontSize: "36px" }}
          >
            {tx.faq.heading}
          </h2>
          <div className="flex flex-col gap-2">
            {tx.faq.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
          <p className="text-center font-body text-evergreen-600 text-base mt-8">
            {tx.faq.more}{" "}
            <Link
              href="/contact"
              className="text-harvest font-semibold underline hover:text-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-1 rounded min-h-0 min-w-0 inline"
            >
              {tx.faq.contact}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
