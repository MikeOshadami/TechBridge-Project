"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { PUBLIC_LISTINGS, categoryOptions, getListingItems, type Listing } from "@/lib/data";

const cityOptions = ["Moncton", "Riverview", "Dieppe"];

function formatDate(dateStr: string, lang: Lang): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(lang === "en" ? "en-CA" : "fr-CA", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function getCategoryLabel(value: string, lang: Lang): string {
  return categoryOptions.find((c) => c.value === value)?.[lang] ?? value;
}

// ─── Category icon map ────────────────────────────────────────────────────────

const categoryIcons: Record<string, React.ReactNode> = {
  Laptop: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="2" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M0 11h15v1a1 1 0 01-1 1H1a1 1 0 01-1-1v-1z" fill="currentColor" opacity=".25"/>
      <rect x="5.5" y="11" width="4" height="1" rx=".5" fill="currentColor"/>
    </svg>
  ),
  Computer: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M5 11v2M10 11v2M3 13h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Monitor: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M5 10v3M10 10v3M3 13h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Keyboard: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M3.5 6.5h1M6.5 6.5h1M9.5 6.5h1M3.5 9h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Mouse: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="4" y="1" width="7" height="10" rx="3.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M7.5 1v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="7.5" cy="11" r="2.5" fill="currentColor" opacity=".2"/>
    </svg>
  ),
  Tablet: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <circle cx="7.5" cy="12" r=".8" fill="currentColor"/>
    </svg>
  ),
  Printer: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M4 5V2h7v3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <rect x="4" y="8" width="7" height="3" rx=".5" fill="currentColor" opacity=".2"/>
    </svg>
  ),
  Other: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M7.5 5v4M7.5 10.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
};

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    badge:          "Needs Board",
    h1:             "What organizations need",
    body:           "Browse approved technology requests from nonprofits and civic organizations in the Greater Moncton Area.",
    filterCity:     "City",
    filterCat:      "Category",
    allCities:      "All Cities",
    allCats:        "All Categories",
    showing:        (n: number, t: number) => `${n} of ${t} request${t !== 1 ? "s" : ""}`,
    requesting:     "Requesting",
    qty:            (n: number) => `×${n}`,
    specsLabel:     "Specs:",
    intendedUse:    "Purpose:",
    datePosted:     "Posted",
    badgeActive:    "Active",
    badgeFulfilled: "Fulfilled",
    contactBtn:     "View & Contact →",
    fulfilledNote:  "This request has been fulfilled — thank you to our donors.",
    empty:          "No requests match your filters. Try adjusting your search.",
    items:          (n: number) => n === 1 ? "1 item" : `${n} items`,
  },
  fr: {
    badge:          "Tableau des besoins",
    h1:             "Ce dont les organisations ont besoin",
    body:           "Parcourez les demandes de technologie approuvées des organismes sans but lucratif du Grand Moncton.",
    filterCity:     "Ville",
    filterCat:      "Catégorie",
    allCities:      "Toutes les villes",
    allCats:        "Toutes les catégories",
    showing:        (n: number, t: number) => `${n} sur ${t} demande${t !== 1 ? "s" : ""}`,
    requesting:     "Demande",
    qty:            (n: number) => `×${n}`,
    specsLabel:     "Specs:",
    intendedUse:    "Objectif:",
    datePosted:     "Publié",
    badgeActive:    "Actif",
    badgeFulfilled: "Comblé",
    contactBtn:     "Voir et contacter →",
    fulfilledNote:  "Cette demande a été satisfaite — merci à nos donateurs.",
    empty:          "Aucune demande ne correspond à vos filtres.",
    items:          (n: number) => n === 1 ? "1 article" : `${n} articles`,
  },
} as const;

// ─── SelectWrap ───────────────────────────────────────────────────────────────

const selectCls = "w-full appearance-none bg-white border border-evergreen-200 rounded-xl px-4 pr-10 font-body text-base text-evergreen-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0 cursor-pointer transition-colors hover:border-evergreen-400";

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="#5a8070" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── Listing Card ─────────────────────────────────────────────────────────────

function ListingCard({
  listing,
  lang,
  tx,
}: {
  listing: Listing;
  lang: Lang;
  tx: (typeof translations)[Lang];
}) {
  const isFulfilled = listing.status === "fulfilled";
  const items = getListingItems(listing);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
  const formattedDate = formatDate(listing.date, lang);

  return (
    <article
      className={`bg-white rounded-2xl border flex flex-col overflow-hidden transition-all duration-200 ${
        isFulfilled
          ? "opacity-70 border-gray-200 shadow-sm"
          : "border-evergreen-100 shadow-card hover:border-evergreen-300 hover:shadow-lg"
      }`}
      aria-label={listing.org}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full flex-shrink-0 ${isFulfilled ? "bg-gray-200" : "bg-harvest"}`} aria-hidden="true" />

      <div className="p-6 flex flex-col gap-5">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <h2 className="font-display text-evergreen-800 leading-snug text-xl">
              {listing.org}
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-body text-evergreen-500 text-sm">{listing.city}</span>
              <span className="text-evergreen-300 text-sm" aria-hidden="true">·</span>
              <span className="font-body text-evergreen-500 text-sm">{listing.orgType}</span>
              <span className="text-evergreen-300 text-sm" aria-hidden="true">·</span>
              <span className="font-body text-evergreen-400 text-sm">{tx.items(items.length)}{items.length > 1 ? "" : ""}, {totalQty} units</span>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 font-body font-semibold rounded-full px-3 py-1 text-xs flex-shrink-0 ${
              isFulfilled
                ? "bg-gray-100 text-gray-500"
                : "bg-evergreen-100 text-evergreen-700"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isFulfilled ? "bg-gray-400" : "bg-evergreen-500"}`}
              aria-hidden="true"
            />
            {isFulfilled ? tx.badgeFulfilled : tx.badgeActive}
          </span>
        </div>

        {/* ── Item rows ────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-1">
          <p className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider mb-1">
            {tx.requesting}
          </p>
          <div className={`rounded-xl border divide-y overflow-hidden ${isFulfilled ? "border-gray-100 divide-gray-100" : "border-evergreen-100 divide-evergreen-100"}`}>
            {items.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-3 ${isFulfilled ? "bg-gray-50" : "bg-evergreen-50/40"}`}>
                {/* Category icon + label */}
                <div className={`flex items-center gap-1.5 flex-shrink-0 ${isFulfilled ? "text-gray-400" : "text-evergreen-600"}`}>
                  {categoryIcons[item.category] ?? categoryIcons["Other"]}
                  <span className={`font-body text-sm font-semibold ${isFulfilled ? "text-gray-500" : "text-evergreen-700"}`}>
                    {getCategoryLabel(item.category, lang)}
                  </span>
                </div>
                {/* Qty badge */}
                <span className={`font-body text-xs font-bold rounded-full px-2 py-0.5 flex-shrink-0 mt-0.5 ${
                  isFulfilled ? "bg-gray-200 text-gray-500" : "bg-harvest/15 text-harvest-700"
                }`}
                  style={{ color: isFulfilled ? undefined : "#7d5216" }}
                >
                  {tx.qty(item.quantity)}
                </span>
                {/* Description + specs */}
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  {item.description && (
                    <p className="font-body text-sm text-evergreen-700 leading-snug">{item.description}</p>
                  )}
                  {item.minSpecs && (
                    <p className="font-body text-xs text-evergreen-500 leading-snug">
                      <span className="font-semibold">{tx.specsLabel}</span> {item.minSpecs}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Intended use ─────────────────────────────────────────────────── */}
        <p className="font-body text-sm text-evergreen-600 leading-relaxed line-clamp-2">
          <span className="font-semibold text-evergreen-700">{tx.intendedUse}</span>{" "}
          {listing.intendedUse}
        </p>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 pt-1 border-t border-evergreen-50 flex-wrap">
          <p className="font-body text-evergreen-400 text-xs">
            {tx.datePosted} {formattedDate}
          </p>

          {isFulfilled ? (
            <p className="font-body text-gray-400 italic text-sm">{tx.fulfilledNote}</p>
          ) : (
            <Link
              href={`/listing/${listing.id}`}
              className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-sm rounded-xl px-5 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 min-h-0"
              style={{ minHeight: "40px" }}
            >
              {tx.contactBtn}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NeedsPage() {
  const { lang } = useLanguage();
  const tx = translations[lang];
  const [cityFilter, setCityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filtered = useMemo(() => {
    const result = PUBLIC_LISTINGS
      .filter((l) => !cityFilter || l.city === cityFilter)
      .filter((l) => {
        if (!categoryFilter) return true;
        // Match against any item in the listing
        return getListingItems(l).some((item) => item.category === categoryFilter);
      });
    return [
      ...result.filter((l) => l.status === "active"),
      ...result.filter((l) => l.status === "fulfilled"),
    ];
  }, [cityFilter, categoryFilter]);

  return (
    <div className="bg-evergreen-50 min-h-screen">

      {/* Hero */}
      <section className="bg-evergreen-800 w-full px-6 py-14 text-center" aria-labelledby="needs-h1">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 font-body text-evergreen-300 font-medium text-sm bg-evergreen-700 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-harvest flex-shrink-0" aria-hidden="true" />
            {tx.badge}
          </span>
          <h1 id="needs-h1" className="font-display text-white leading-tight" style={{ fontSize: "clamp(28px, 5vw, 40px)" }}>
            {tx.h1}
          </h1>
          <p className="font-body text-evergreen-200 leading-relaxed max-w-[520px]" style={{ fontSize: "18px" }}>
            {tx.body}
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-white w-full border-b border-evergreen-100 px-6 py-5 shadow-sm sticky top-[72px] z-30">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex flex-col flex-1 min-w-0 gap-1">
            <label htmlFor="cityFilter" className="font-body text-xs font-semibold text-evergreen-600 uppercase tracking-wide">
              {tx.filterCity}
            </label>
            <SelectWrap>
              <select id="cityFilter" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className={selectCls} style={{ height: "44px" }}>
                <option value="">{tx.allCities}</option>
                {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </SelectWrap>
          </div>
          <div className="flex flex-col flex-1 min-w-0 gap-1">
            <label htmlFor="categoryFilter" className="font-body text-xs font-semibold text-evergreen-600 uppercase tracking-wide">
              {tx.filterCat}
            </label>
            <SelectWrap>
              <select id="categoryFilter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={selectCls} style={{ height: "44px" }}>
                <option value="">{tx.allCats}</option>
                {categoryOptions.map((c) => <option key={c.value} value={c.value}>{c[lang]}</option>)}
              </select>
            </SelectWrap>
          </div>
          <p
            className="font-body text-evergreen-500 font-medium text-sm flex-shrink-0 pb-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {tx.showing(filtered.length, PUBLIC_LISTINGS.length)}
          </p>
        </div>
      </div>

      {/* Listings */}
      <section
        className="w-full px-6 py-8"
        aria-label={lang === "en" ? "Tech request listings" : "Annonces de demandes de technologie"}
        aria-live="polite"
      >
        <div className="max-w-4xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-evergreen-100 rounded-full flex items-center justify-center" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="#49836b" strokeWidth="2" fill="none"/>
                  <path d="M18 18l6 6" stroke="#49836b" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="font-body text-evergreen-600 text-lg">{tx.empty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} lang={lang} tx={tx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
