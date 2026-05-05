"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { PUBLIC_LISTINGS, categoryOptions } from "@/lib/data";

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
    backLink:          "← Back to Needs Board",
    badgeActive:       "Active",
    badgeFulfilled:    "Fulfilled",
    whatTheyNeed:      "What They Need",
    labelCategory:     "Category",
    labelQty:          "Quantity Needed",
    labelSpecs:        "Minimum Specifications",
    labelUse:          "Intended Use",
    labelDate:         "Date Posted",
    noSpecs:           "None specified",
    contactHeading:    "Contact This Organization",
    contactBody:       "Reach out directly to discuss your donation.",
    emailBtn:          "Send an Email →",
    callBtn:           "Call Now →",
    fulfillSection:    "Are you the organization that posted this request? Mark it as fulfilled once you have received your donation.",
    fulfillBtn:        "Mark as Fulfilled",
    confirmQ:          "Are you sure you want to mark this as fulfilled? This will update the listing status.",
    confirmBtn:        "Confirm",
    cancelBtn:         "Cancel",
    notFoundH1:        "Listing Not Found",
    notFoundBody:      "This listing does not exist or may have been removed.",
    notFoundBack:      "← Back to Needs Board",
  },
  fr: {
    backLink:          "← Retour au tableau des besoins",
    badgeActive:       "Actif",
    badgeFulfilled:    "Comblé",
    whatTheyNeed:      "Ce dont ils ont besoin",
    labelCategory:     "Catégorie",
    labelQty:          "Quantité requise",
    labelSpecs:        "Spécifications minimales",
    labelUse:          "Utilisation prévue",
    labelDate:         "Date de publication",
    noSpecs:           "Non spécifiées",
    contactHeading:    "Contacter cette organisation",
    contactBody:       "Contactez directement pour discuter de votre don.",
    emailBtn:          "Envoyer un courriel →",
    callBtn:           "Appeler maintenant →",
    fulfillSection:    "Êtes-vous l'organisation qui a publié cette demande? Marquez-la comme satisfaite une fois votre don reçu.",
    fulfillBtn:        "Marquer comme satisfaite",
    confirmQ:          "Êtes-vous sûr de vouloir marquer ceci comme satisfait?",
    confirmBtn:        "Confirmer",
    cancelBtn:         "Annuler",
    notFoundH1:        "Annonce introuvable",
    notFoundBody:      "Cette annonce n'existe pas ou a peut-être été supprimée.",
    notFoundBack:      "← Retour au tableau des besoins",
  },
} as const;

// ─── Detail row ───────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-evergreen-100 last:border-b-0">
      <dt
        className="font-body font-semibold text-evergreen-600 uppercase tracking-wider"
        style={{ fontSize: "14px" }}
      >
        {label}
      </dt>
      <dd className="font-body text-evergreen-800 text-lg leading-relaxed">{value}</dd>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: { id: string };
}

export default function ListingPage({ params }: PageProps) {
  const { lang } = useLanguage();
  const tx = translations[lang];

  const listing = PUBLIC_LISTINGS.find((l) => l.id === parseInt(params.id, 10));

  const [status, setStatus]           = useState(listing?.status ?? "active");
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Not found ────────────────────────────────────────────────────────────

  if (!listing) {
    return (
      <div className="bg-evergreen-50 min-h-screen px-6 py-16 flex flex-col items-center gap-6">
        <h1 className="font-display text-evergreen-800 text-4xl">{tx.notFoundH1}</h1>
        <p className="font-body text-evergreen-900 text-lg">{tx.notFoundBody}</p>
        <Link href="/donate/needs" className="font-body text-evergreen-700 text-lg underline hover:text-evergreen-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 rounded">
          {tx.notFoundBack}
        </Link>
      </div>
    );
  }

  const categoryLabel = getCategoryLabel(listing.category, lang);
  const formattedDate = formatDate(listing.date, lang);
  const isFulfilled   = status === "fulfilled";

  function handleConfirmFulfill() {
    console.log("Marking listing as fulfilled:", listing!.id);
    setStatus("fulfilled");
    setShowConfirm(false);
  }

  return (
    <div className="bg-evergreen-50 min-h-screen">

      {/* ── Back link ─────────────────────────────────────────────────────── */}
      <div className="px-8 py-4">
        <Link
          href="/donate/needs"
          className="font-body text-evergreen-700 hover:text-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 rounded"
          style={{ fontSize: "16px" }}
        >
          {tx.backLink}
        </Link>
      </div>

      {/* ── Listing header ────────────────────────────────────────────────── */}
      <section
        className="bg-evergreen-800 w-full px-8 py-12 relative"
        aria-labelledby="listing-h1"
      >
        {/* Status badge */}
        <span
          className={`absolute top-8 right-8 inline-flex items-center font-body font-medium rounded-full px-3 ${
            isFulfilled ? "bg-gray-400 text-white" : "bg-evergreen-600 text-white"
          }`}
          style={{ fontSize: "14px", paddingTop: "6px", paddingBottom: "6px" }}
        >
          {isFulfilled ? tx.badgeFulfilled : tx.badgeActive}
        </span>

        <div className="max-w-[800px]">
          <h1
            id="listing-h1"
            className="font-display text-white mb-4 leading-tight"
            style={{ fontSize: "40px" }}
          >
            {listing.org}
          </h1>

          {/* City + category badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[listing.city, categoryLabel].map((label) => (
              <span
                key={label}
                className="inline-flex items-center font-body text-white border border-white border-opacity-60 rounded-md px-2.5"
                style={{ fontSize: "14px", paddingTop: "4px", paddingBottom: "4px" }}
              >
                {label}
              </span>
            ))}
          </div>

          <p className="font-body text-white leading-relaxed" style={{ fontSize: "20px" }}>
            {listing.description}
          </p>
        </div>
      </section>

      {/* ── Detail + Contact grid ─────────────────────────────────────────── */}
      <div className="max-w-[800px] mx-auto px-6 my-8">
        <div className="bg-white rounded-xl shadow-sm border border-evergreen-100 p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left: What They Need */}
          <div>
            <h2
              className="font-display text-evergreen-800 mb-2"
              style={{ fontSize: "22px" }}
            >
              {tx.whatTheyNeed}
            </h2>
            <dl>
              <DetailRow label={tx.labelCategory} value={categoryLabel} />
              <DetailRow label={tx.labelQty}      value={String(listing.quantity)} />
              <DetailRow label={tx.labelSpecs}    value={listing.minSpecs ?? tx.noSpecs} />
              <DetailRow label={tx.labelUse}      value={listing.intendedUse} />
              <DetailRow label={tx.labelDate}     value={formattedDate} />
            </dl>
          </div>

          {/* Right: Contact card */}
          <div
            className="bg-evergreen-50 border border-evergreen-200 rounded-xl p-6 flex flex-col gap-4"
            aria-labelledby="contact-heading"
          >
            <h2
              id="contact-heading"
              className="font-display text-evergreen-800"
              style={{ fontSize: "22px" }}
            >
              {tx.contactHeading}
            </h2>
            <p className="font-body text-evergreen-700 leading-relaxed" style={{ fontSize: "16px" }}>
              {tx.contactBody}
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-2">
              <p className="font-body text-evergreen-800 text-lg font-medium">
                {listing.org}
              </p>
              <a
                href={`mailto:${listing.email}`}
                className="font-body text-evergreen-600 text-lg underline hover:text-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 rounded"
              >
                {listing.email}
              </a>
              <a
                href={`tel:${listing.phone}`}
                className="font-body text-evergreen-600 text-lg underline hover:text-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 rounded"
              >
                {listing.phone}
              </a>
            </div>

            {/* CTA buttons */}
            <a
              href={`mailto:${listing.email}`}
              className="w-full inline-flex items-center justify-center bg-evergreen-800 text-white font-display rounded-full min-h-[56px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 mt-2"
              style={{ fontSize: "20px" }}
            >
              {tx.emailBtn}
            </a>
            <a
              href={`tel:${listing.phone}`}
              className="w-full inline-flex items-center justify-center bg-white border-2 border-evergreen-800 text-evergreen-800 font-display rounded-full min-h-[56px] hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
              style={{ fontSize: "20px" }}
            >
              {tx.callBtn}
            </a>
          </div>
        </div>
      </div>

      {/* ── Mark as Fulfilled (active listings only) ──────────────────────── */}
      {!isFulfilled && (
        <div className="max-w-[800px] mx-auto px-6 mb-16">
          <div className="bg-evergreen-100 rounded-xl p-6 min-h-[100px]">
            {!showConfirm ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-body text-evergreen-800 leading-relaxed" style={{ fontSize: "16px" }}>
                  {tx.fulfillSection}
                </p>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex-shrink-0 inline-flex items-center justify-center bg-white border-2 border-evergreen-700 text-evergreen-700 font-body font-semibold text-lg rounded-full px-6 min-h-[48px] hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
                >
                  {tx.fulfillBtn}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5 min-h-[200px] justify-center">
                <p className="font-body text-evergreen-800 text-lg leading-relaxed">
                  {tx.confirmQ}
                </p>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleConfirmFulfill}
                    className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-lg rounded-full px-8 min-h-[48px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
                  >
                    {tx.confirmBtn}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="inline-flex items-center justify-center bg-white border-2 border-evergreen-800 text-evergreen-800 font-body font-semibold text-lg rounded-full px-8 min-h-[48px] hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
                  >
                    {tx.cancelBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
