"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { PUBLIC_LISTINGS, categoryOptions, getListingItems } from "@/lib/data";

function formatDate(dateStr: string, lang: Lang): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(lang === "en" ? "en-CA" : "fr-CA", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function getCategoryLabel(value: string, lang: Lang): string {
  return categoryOptions.find((c) => c.value === value)?.[lang] ?? value;
}

// ─── Category icons ───────────────────────────────────────────────────────────

const categoryIcons: Record<string, React.ReactNode> = {
  Laptop: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="2" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M0 11h15v1a1 1 0 01-1 1H1a1 1 0 01-1-1v-1z" fill="currentColor" opacity=".25"/>
      <rect x="5.5" y="11" width="4" height="1" rx=".5" fill="currentColor"/>
    </svg>
  ),
  Computer: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M5 11v2M10 11v2M3 13h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Monitor: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M5 10v3M10 10v3M3 13h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Keyboard: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M3.5 6.5h1M6.5 6.5h1M9.5 6.5h1M3.5 9h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Mouse: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="4" y="1" width="7" height="10" rx="3.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M7.5 1v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Tablet: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <circle cx="7.5" cy="12" r=".8" fill="currentColor"/>
    </svg>
  ),
  Printer: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M4 5V2h7v3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <rect x="4" y="8" width="7" height="3" rx=".5" fill="currentColor" opacity=".2"/>
    </svg>
  ),
  Other: (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M7.5 5v4M7.5 10.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
};

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    backLink:       "← Back to Needs Board",
    badgeActive:    "Active",
    badgeFulfilled: "Fulfilled",
    whatTheyNeed:   "What they need",
    itemHeading:    (n: number) => n === 1 ? "1 item requested" : `${n} items requested`,
    labelSpecs:     "Min. specs",
    labelNoSpecs:   "None specified",
    labelUse:       "Intended use",
    labelDate:      "Date posted",
    labelOrgType:   "Organization type",
    labelCity:      "Location",
    contactHeading: "Contact this organization",
    contactBody:    "Reach out directly to discuss your donation. Please introduce yourself and the device you'd like to donate.",
    emailBtn:       "Send an Email",
    callBtn:        "Call Now",
    fulfillSection: "Are you this organization? Mark as fulfilled once you have received your donation.",
    fulfillBtn:     "Mark as Fulfilled",
    confirmQ:       "Are you sure you want to mark this as fulfilled?",
    confirmBtn:     "Yes, mark as fulfilled",
    cancelBtn:      "Cancel",
    notFoundH1:     "Listing Not Found",
    notFoundBody:   "This listing does not exist or may have been removed.",
    notFoundBack:   "← Back to Needs Board",
    totalUnits:     (n: number) => `${n} unit${n !== 1 ? "s" : ""} total`,
  },
  fr: {
    backLink:       "← Retour au tableau des besoins",
    badgeActive:    "Actif",
    badgeFulfilled: "Comblé",
    whatTheyNeed:   "Ce dont ils ont besoin",
    itemHeading:    (n: number) => n === 1 ? "1 article demandé" : `${n} articles demandés`,
    labelSpecs:     "Spéc. min.",
    labelNoSpecs:   "Non spécifiées",
    labelUse:       "Utilisation prévue",
    labelDate:      "Date de publication",
    labelOrgType:   "Type d'organisation",
    labelCity:      "Localisation",
    contactHeading: "Contacter cette organisation",
    contactBody:    "Contactez directement pour discuter de votre don. Présentez-vous et décrivez l'appareil que vous souhaitez donner.",
    emailBtn:       "Envoyer un courriel",
    callBtn:        "Appeler maintenant",
    fulfillSection: "Êtes-vous cette organisation? Marquez comme satisfaite une fois votre don reçu.",
    fulfillBtn:     "Marquer comme satisfaite",
    confirmQ:       "Êtes-vous sûr de vouloir marquer ceci comme satisfait?",
    confirmBtn:     "Oui, marquer comme satisfaite",
    cancelBtn:      "Annuler",
    notFoundH1:     "Annonce introuvable",
    notFoundBody:   "Cette annonce n'existe pas ou a peut-être été supprimée.",
    notFoundBack:   "← Retour au tableau des besoins",
    totalUnits:     (n: number) => `${n} unité${n !== 1 ? "s" : ""} au total`,
  },
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-4 border-b border-evergreen-100 last:border-0">
      <dt className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider">{label}</dt>
      <dd className="font-body text-evergreen-800 leading-relaxed" style={{ fontSize: "16px" }}>{children}</dd>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ListingPage({ params }: { params: { id: string } }) {
  const { lang } = useLanguage();
  const tx = translations[lang];
  const [fulfilled, setFulfilled] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const listing = PUBLIC_LISTINGS.find((l) => l.id === Number(params.id));

  if (!listing) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center flex flex-col gap-6">
          <div className="w-16 h-16 bg-evergreen-100 rounded-full flex items-center justify-center mx-auto">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="12" stroke="#49836b" strokeWidth="2" fill="none" />
              <path d="M14 8v7M14 18v2" stroke="#49836b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-display text-evergreen-800" style={{ fontSize: "32px" }}>{tx.notFoundH1}</h1>
          <p className="font-body text-evergreen-600 text-lg">{tx.notFoundBody}</p>
          <Link
            href="/donate/needs"
            className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold rounded-xl px-8 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
            style={{ minHeight: "50px", fontSize: "17px" }}
          >
            {tx.notFoundBack}
          </Link>
        </div>
      </div>
    );
  }

  const isFulfilled = fulfilled || listing.status === "fulfilled";
  const items = getListingItems(listing);
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  const formattedDate = formatDate(listing.date, lang);

  return (
    <div className="bg-evergreen-50 min-h-screen">

      {/* Back nav */}
      <div className="bg-white border-b border-evergreen-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/donate/needs"
            className="inline-flex items-center gap-2 font-body text-evergreen-600 hover:text-evergreen-800 transition-colors text-sm focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 rounded min-h-0 min-w-0"
          >
            {tx.backLink}
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* ── Main — left 2 cols ──────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Header card */}
          <div className="bg-white rounded-2xl shadow-card border border-evergreen-100 overflow-hidden">
            <div className={`h-1.5 w-full ${isFulfilled ? "bg-gray-200" : "bg-harvest"}`} aria-hidden="true" />
            <div className="px-7 py-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="font-display text-evergreen-800 leading-tight mb-1" style={{ fontSize: "clamp(22px, 4vw, 30px)" }}>
                    {listing.org}
                  </h1>
                  <p className="font-body text-evergreen-500 text-sm">
                    {listing.city}, {listing.province} · {listing.orgType}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 font-body font-semibold rounded-full px-4 py-1.5 text-sm flex-shrink-0 ${
                  isFulfilled ? "bg-gray-100 text-gray-500" : "bg-evergreen-100 text-evergreen-700"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isFulfilled ? "bg-gray-400" : "bg-evergreen-500"}`} aria-hidden="true" />
                  {isFulfilled ? tx.badgeFulfilled : tx.badgeActive}
                </span>
              </div>
            </div>
          </div>

          {/* Items card */}
          <div className="bg-white rounded-2xl shadow-card border border-evergreen-100 overflow-hidden">
            <div className="px-7 py-5 border-b border-evergreen-100 flex items-center justify-between">
              <h2 className="font-display text-evergreen-800" style={{ fontSize: "20px" }}>
                {tx.whatTheyNeed}
              </h2>
              <div className="flex items-center gap-3">
                <span className="font-body text-sm text-evergreen-500">{tx.itemHeading(items.length)}</span>
                <span className="font-body text-xs font-semibold bg-harvest/10 text-harvest-700 rounded-full px-2.5 py-1" style={{ color: "#7d5216" }}>
                  {tx.totalUnits(totalQty)}
                </span>
              </div>
            </div>

            <div className="divide-y divide-evergreen-100">
              {items.map((item, i) => (
                <div key={i} className="px-7 py-5 flex flex-col gap-3">
                  {/* Item header */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-evergreen-100 text-evergreen-700 flex items-center justify-center flex-shrink-0">
                      {categoryIcons[item.category] ?? categoryIcons["Other"]}
                    </div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-display text-evergreen-800 text-base">
                        {getCategoryLabel(item.category, lang)}
                      </span>
                      <span className="inline-flex items-center font-body text-xs font-bold bg-harvest/10 rounded-full px-2.5 py-0.5" style={{ color: "#7d5216" }}>
                        ×{item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="font-body text-evergreen-700 leading-relaxed" style={{ fontSize: "15px" }}>
                      {item.description}
                    </p>
                  )}

                  {/* Specs */}
                  {item.minSpecs ? (
                    <div className="flex items-start gap-2 bg-evergreen-50 rounded-xl px-4 py-3">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5 text-evergreen-500" aria-hidden="true">
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                        <path d="M7 5v4M7 10.5v.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      <p className="font-body text-sm text-evergreen-600 leading-relaxed">
                        <span className="font-semibold text-evergreen-700">{tx.labelSpecs}:</span>{" "}
                        {item.minSpecs}
                      </p>
                    </div>
                  ) : (
                    <p className="font-body text-sm text-evergreen-400 italic">{tx.labelNoSpecs}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Intended use + meta card */}
          <div className="bg-white rounded-2xl shadow-card border border-evergreen-100 px-7 py-6">
            <dl>
              <MetaRow label={tx.labelUse}>{listing.intendedUse}</MetaRow>
              <MetaRow label={tx.labelOrgType}>{listing.orgType}</MetaRow>
              <MetaRow label={tx.labelCity}>{listing.city}, {listing.province}</MetaRow>
              <MetaRow label={tx.labelDate}>{formattedDate}</MetaRow>
            </dl>
          </div>

          {/* Fulfill section */}
          {!isFulfilled && (
            <div className="bg-white border border-evergreen-200 rounded-2xl px-7 py-6 flex flex-col gap-4">
              <p className="font-body text-evergreen-600 leading-relaxed text-sm">{tx.fulfillSection}</p>
              {!confirming ? (
                <button
                  onClick={() => setConfirming(true)}
                  className="self-start inline-flex items-center justify-center border-2 border-evergreen-200 text-evergreen-700 font-body font-semibold rounded-xl px-6 hover:bg-evergreen-50 hover:border-evergreen-300 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-0 min-w-0 text-sm"
                  style={{ minHeight: "42px" }}
                >
                  {tx.fulfillBtn}
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="font-body text-evergreen-800 font-semibold text-sm">{tx.confirmQ}</p>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => { setFulfilled(true); setConfirming(false); }}
                      className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold rounded-xl px-5 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-0 min-w-0 text-sm"
                      style={{ minHeight: "42px" }}
                    >
                      {tx.confirmBtn}
                    </button>
                    <button
                      onClick={() => setConfirming(false)}
                      className="inline-flex items-center justify-center border border-evergreen-200 text-evergreen-600 font-body font-semibold rounded-xl px-5 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-0 min-w-0 text-sm"
                      style={{ minHeight: "42px" }}
                    >
                      {tx.cancelBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Contact card — sticky right col ─────────────────────────────── */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-4">
          <div className="bg-evergreen-800 rounded-2xl shadow-card p-7 flex flex-col gap-5">
            <h2 className="font-display text-white leading-snug" style={{ fontSize: "20px" }}>
              {tx.contactHeading}
            </h2>
            <p className="font-body text-evergreen-300 leading-relaxed text-sm">
              {tx.contactBody}
            </p>

            <div className="flex flex-col gap-4 pt-4 border-t border-evergreen-700">
              <div>
                <p className="font-body text-evergreen-500 text-xs font-semibold uppercase tracking-wider mb-0.5">
                  Contact
                </p>
                <p className="font-body text-white font-semibold text-base">{listing.contactName}</p>
              </div>

              <a
                href={`mailto:${listing.email}`}
                className="inline-flex items-center justify-center bg-harvest text-white font-body font-bold rounded-xl px-5 hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 gap-2 text-sm"
                style={{ minHeight: "48px" }}
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <rect x="2" y="4" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M2 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {tx.emailBtn}
              </a>

              <a
                href={`tel:${listing.phone}`}
                className="inline-flex items-center justify-center bg-evergreen-700 text-white font-body font-semibold rounded-xl px-5 hover:bg-evergreen-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 gap-2 text-sm"
                style={{ minHeight: "48px" }}
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 3h3.5l1.5 4-2 1.5c.9 1.8 2.2 3.1 4 4l1.5-2 4 1.5V15c0 .6-.4 1-1 1C5 16 2 10 2 4c0-.6.4-1 1-1z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                </svg>
                {tx.callBtn}
              </a>
            </div>
          </div>

          {/* Item summary chip list */}
          <div className="bg-white rounded-2xl border border-evergreen-100 shadow-card p-5 flex flex-col gap-3">
            <p className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider">
              {tx.itemHeading(items.length)}
            </p>
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-evergreen-50 text-evergreen-600 flex items-center justify-center flex-shrink-0">
                    {categoryIcons[item.category] ?? categoryIcons["Other"]}
                  </div>
                  <span className="font-body text-sm text-evergreen-800 flex-1 leading-snug">
                    {getCategoryLabel(item.category, lang)}
                  </span>
                  <span className="font-body text-xs font-bold text-harvest-700 flex-shrink-0" style={{ color: "#7d5216" }}>
                    ×{item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
