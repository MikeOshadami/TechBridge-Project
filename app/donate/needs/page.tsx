"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { PUBLIC_LISTINGS, categoryOptions, type Listing } from "@/lib/data";

// ─── Static filter options ────────────────────────────────────────────────────

const cityOptions = ["Moncton", "Riverview", "Dieppe"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string, lang: Lang): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(lang === "en" ? "en-CA" : "fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCategoryLabel(value: string, lang: Lang): string {
  return categoryOptions.find((c) => c.value === value)?.[lang] ?? value;
}

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    hero: {
      h1: "What Organizations Need",
      body: "Browse approved technology requests from nonprofits and civic organizations in the Greater Moncton Area.",
    },
    filterCity:     "Filter by City",
    filterCat:      "Filter by Category",
    allCities:      "All Cities",
    allCats:        "All Categories",
    showing:        (shown: number, total: number) =>
      `Showing ${shown} of ${total} request${total !== 1 ? "s" : ""}`,
    qtyLabel:       (n: number) => `Quantity needed: ${n}`,
    dateLabel:      (d: string) => `Posted: ${d}`,
    badgeActive:    "Active",
    badgeFulfilled: "Fulfilled",
    contactBtn:     "Contact Organization →",
    fulfilledNote:  "This request has been fulfilled.",
    empty:          "No requests match your filters. Try adjusting your search.",
  },
  fr: {
    hero: {
      h1: "Ce dont les organisations ont besoin",
      body: "Parcourez les demandes de technologie approuvées des organismes sans but lucratif du Grand Moncton.",
    },
    filterCity:     "Filtrer par ville",
    filterCat:      "Filtrer par catégorie",
    allCities:      "Toutes les villes",
    allCats:        "Toutes les catégories",
    showing:        (shown: number, total: number) =>
      `Affichage de ${shown} sur ${total} demande${total !== 1 ? "s" : ""}`,
    qtyLabel:       (n: number) => `Quantité requise: ${n}`,
    dateLabel:      (d: string) => `Publié le: ${d}`,
    badgeActive:    "Actif",
    badgeFulfilled: "Comblé",
    contactBtn:     "Contacter l'organisation →",
    fulfilledNote:  "Cette demande a été satisfaite.",
    empty:          "Aucune demande ne correspond à vos filtres.",
  },
} as const;

// ─── Shared styles ────────────────────────────────────────────────────────────

const selectClass =
  "bg-white border border-evergreen-200 rounded-lg px-3 py-2 font-body text-lg text-evergreen-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0 min-h-[48px]";

const filterLabelClass = "font-body text-base font-medium text-evergreen-800 mb-1 block";

// ─── Listing card ─────────────────────────────────────────────────────────────

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
  const formattedDate = formatDate(listing.date, lang);
  const categoryLabel = getCategoryLabel(listing.category, lang);

  return (
    <article
      className={`bg-white border border-evergreen-200 rounded-xl p-6 flex flex-col gap-4 transition-opacity ${
        isFulfilled ? "opacity-60 border-l-4 border-l-gray-300" : "border-l-4 border-l-evergreen-600"
      }`}
      aria-label={listing.org}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h2 className="font-display text-evergreen-800" style={{ fontSize: "22px" }}>
          {listing.org}
        </h2>
        <span
          className={`inline-flex items-center font-body font-medium rounded-full px-3 flex-shrink-0 ${
            isFulfilled ? "bg-gray-100 text-gray-500" : "bg-evergreen-100 text-evergreen-700"
          }`}
          style={{ fontSize: "14px", paddingTop: "4px", paddingBottom: "4px" }}
        >
          {isFulfilled ? tx.badgeFulfilled : tx.badgeActive}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {[listing.city, categoryLabel].map((label) => (
          <span
            key={label}
            className="inline-flex items-center font-body bg-evergreen-50 text-evergreen-700 border border-evergreen-200 rounded-md px-2.5"
            style={{ fontSize: "14px", paddingTop: "4px", paddingBottom: "4px" }}
          >
            {label}
          </span>
        ))}
      </div>

      <p className="font-body text-evergreen-800 text-lg leading-relaxed">
        {listing.description}
      </p>

      <p className="font-body text-evergreen-600" style={{ fontSize: "16px" }}>
        {tx.qtyLabel(listing.quantity)}
      </p>

      <p className="font-body text-gray-400" style={{ fontSize: "14px" }}>
        {tx.dateLabel(formattedDate)}
      </p>

      <div className="flex justify-end mt-1">
        {isFulfilled ? (
          <p className="font-body text-gray-400 italic text-lg">{tx.fulfilledNote}</p>
        ) : (
          <Link
            href={`/listing/${listing.id}`}
            className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-lg rounded-full px-6 min-h-[48px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
          >
            {tx.contactBtn}
          </Link>
        )}
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NeedsPage() {
  const { lang } = useLanguage();
  const tx = translations[lang];

  const [cityFilter, setCityFilter]         = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filtered = useMemo(() => {
    const result = PUBLIC_LISTINGS
      .filter((l) => !cityFilter || l.city === cityFilter)
      .filter((l) => !categoryFilter || l.category === categoryFilter);
    return [
      ...result.filter((l) => l.status === "active"),
      ...result.filter((l) => l.status === "fulfilled"),
    ];
  }, [cityFilter, categoryFilter]);

  return (
    <div className="bg-evergreen-50 min-h-screen">
      <section
        className="bg-evergreen-800 w-full px-6 py-12 flex flex-col items-center text-center"
        aria-labelledby="needs-h1"
      >
        <h1 id="needs-h1" className="font-display text-white mb-4 leading-tight" style={{ fontSize: "40px" }}>
          {tx.hero.h1}
        </h1>
        <p className="font-body text-white max-w-[600px] leading-relaxed" style={{ fontSize: "20px" }}>
          {tx.hero.body}
        </p>
      </section>

      <div className="bg-white w-full border-b border-evergreen-100 px-6 py-6">
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row gap-6 items-end">
          <div className="flex flex-col flex-1 min-w-0">
            <label htmlFor="cityFilter" className={filterLabelClass}>{tx.filterCity}</label>
            <select id="cityFilter" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className={`${selectClass} w-full`}>
              <option value="">{tx.allCities}</option>
              {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <label htmlFor="categoryFilter" className={filterLabelClass}>{tx.filterCat}</label>
            <select id="categoryFilter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={`${selectClass} w-full`}>
              <option value="">{tx.allCats}</option>
              {categoryOptions.map((c) => <option key={c.value} value={c.value}>{c[lang]}</option>)}
            </select>
          </div>
          <p className="font-body text-evergreen-600 flex-shrink-0 pb-2" style={{ fontSize: "16px" }} aria-live="polite" aria-atomic="true">
            {tx.showing(filtered.length, PUBLIC_LISTINGS.length)}
          </p>
        </div>
      </div>

      <section
        className="w-full px-6 py-8"
        aria-label={lang === "en" ? "Tech request listings" : "Annonces de demandes de technologie"}
        aria-live="polite"
      >
        <div className="max-w-[800px] mx-auto flex flex-col gap-4">
          {filtered.length === 0 ? (
            <p className="font-body text-evergreen-800 text-lg text-center py-16">{tx.empty}</p>
          ) : (
            filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} lang={lang} tx={tx} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
