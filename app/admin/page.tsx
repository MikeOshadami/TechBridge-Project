"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { ALL_LISTINGS, ALL_DONATIONS, categoryOptions, conditionOptions, getListingItems, type Listing, type ListingStatus, type Donation, type DonationStatus } from "@/lib/data";

type View = "overview" | "pending" | "active" | "fulfilled" | "donations" | "organizations" | "settings";
type Tab  = "pending" | "active" | "fulfilled";
type DonationTab = "incoming" | "available" | "matched";
interface Toast { id: number; message: string; }

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr: string, lang: Lang): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(lang === "en" ? "en-CA" : "fr-CA", {
    year: "numeric", month: "short", day: "numeric",
  });
}
function getCategoryLabel(value: string, lang: Lang): string {
  return categoryOptions.find((c) => c.value === value)?.[lang] ?? value;
}

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  en: {
    adminBadge:      "Admin",
    signOut:         "Sign Out",
    navOverview:     "Overview",
    navPending:      "Pending Review",
    navActive:       "Active Listings",
    navFulfilled:    "Fulfilled",
    navDonations:    "Donations",
    navOrgs:         "Organizations",
    navSettings:     "Settings",
    sectionMain:     "Main",
    sectionRequests: "Requests",
    sectionManage:   "Manage",
    statPending:     "Pending Review",
    statActive:      "Active",
    statFulfilled:   "Fulfilled",
    statTotal:       "Total Listings",
    attentionTitle:  "Needs your attention",
    activeSnapshot:  "Active listings",
    recentActivity:  "Recent activity",
    showDetails:     "Show details",
    hideDetails:     "Hide details",
    labelContact:    "Contact",
    labelEmail:      "Email",
    labelPhone:      "Phone",
    labelUse:        "Intended Use",
    labelQty:        "Quantity",
    labelCategory:   "Category",
    approveBtn:      "Approve & Publish",
    rejectBtn:       "Reject",
    rejectReason:    "Reason for rejection (optional):",
    confirmReject:   "Confirm Rejection",
    cancelBtn:       "Cancel",
    fulfillBtn:      "Mark as Fulfilled",
    fulfilledNote:   "Fulfilled",
    dateLabel:       (d: string) => `Submitted ${d}`,
    toastApproved:   "✓ Listing approved and published.",
    toastFulfilled:  "✓ Listing marked as fulfilled.",
    emptyPending:    "No pending submissions.",
    emptyActive:     "No active listings.",
    emptyFulfilled:  "No fulfilled requests yet.",
    comingSoon:        "Coming soon",
    comingSoonSub:     "This section is under construction.",
    viewAll:           "View all →",
    noNewToday:        "No new submissions today",
    newToday:          (n: number) => `↑ ${n} new today`,
    langToggle:        "FR",
    langAriaSwitch:    "Switch to French",
    // donations
    donTabIncoming:    "Incoming",
    donTabAvailable:   "Available",
    donTabMatched:     "Matched",
    donApprove:        "Approve",
    donReject:         "Reject",
    donRejectReason:   "Reason for rejection (optional):",
    donConfirmReject:  "Confirm Rejection",
    donMarkMatched:    "Mark as Matched",
    donMatchLabel:     "Which organization received this donation?",
    donMatchPlaceholder: "e.g. Moncton Food Bank",
    donConfirmMatch:   "Confirm Match",
    donPickup:         "Pickup",
    donShipping:       "Shipping",
    donBoth:           "Pickup or Ship",
    donNotes:          "Donor notes",
    donContact:        "Contact",
    donItems:          "Items",
    donMatchedTo:      "Matched to",
    donMatchedOn:      "on",
    donToastApproved:  "✓ Donation approved — now available.",
    donToastMatched:   "✓ Donation marked as matched.",
    donEmptyIncoming:  "No incoming donations.",
    donEmptyAvailable: "No available donations.",
    donEmptyMatched:   "No matched donations yet.",
  },
  fr: {
    adminBadge:      "Admin",
    signOut:         "Déconnexion",
    navOverview:     "Aperçu",
    navPending:      "En attente",
    navActive:       "Annonces actives",
    navFulfilled:    "Satisfaites",
    navDonations:    "Dons",
    navOrgs:         "Organisations",
    navSettings:     "Paramètres",
    sectionMain:     "Principal",
    sectionRequests: "Demandes",
    sectionManage:   "Gestion",
    statPending:     "En attente",
    statActive:      "Actives",
    statFulfilled:   "Satisfaites",
    statTotal:       "Total",
    attentionTitle:  "Nécessite votre attention",
    activeSnapshot:  "Annonces actives",
    recentActivity:  "Activité récente",
    showDetails:     "Voir les détails",
    hideDetails:     "Masquer les détails",
    labelContact:    "Contact",
    labelEmail:      "Courriel",
    labelPhone:      "Téléphone",
    labelUse:        "Utilisation prévue",
    labelQty:        "Quantité",
    labelCategory:   "Catégorie",
    approveBtn:      "Approuver et publier",
    rejectBtn:       "Rejeter",
    rejectReason:    "Raison du rejet (facultatif):",
    confirmReject:   "Confirmer le rejet",
    cancelBtn:       "Annuler",
    fulfillBtn:      "Marquer comme satisfaite",
    fulfilledNote:   "Satisfaite",
    dateLabel:       (d: string) => `Soumis le ${d}`,
    toastApproved:   "✓ Annonce approuvée et publiée.",
    toastFulfilled:  "✓ Annonce marquée comme satisfaite.",
    emptyPending:    "Aucune soumission en attente.",
    emptyActive:     "Aucune annonce active.",
    emptyFulfilled:  "Aucune demande satisfaite pour l'instant.",
    comingSoon:        "Bientôt disponible",
    comingSoonSub:     "Cette section est en cours de construction.",
    viewAll:           "Voir tout →",
    noNewToday:        "Aucune nouvelle soumission aujourd'hui",
    newToday:          (n: number) => `↑ ${n} nouveau aujourd'hui`,
    langToggle:        "EN",
    langAriaSwitch:    "Passer en anglais",
    // donations
    donTabIncoming:    "Entrants",
    donTabAvailable:   "Disponibles",
    donTabMatched:     "Jumelés",
    donApprove:        "Approuver",
    donReject:         "Rejeter",
    donRejectReason:   "Raison du rejet (facultatif):",
    donConfirmReject:  "Confirmer le rejet",
    donMarkMatched:    "Marquer comme jumelé",
    donMatchLabel:     "Quelle organisation a reçu ce don?",
    donMatchPlaceholder: "ex. Banque alimentaire de Moncton",
    donConfirmMatch:   "Confirmer le jumelage",
    donPickup:         "Récupération",
    donShipping:       "Expédition",
    donBoth:           "Récupération ou expédition",
    donNotes:          "Notes du donateur",
    donContact:        "Contact",
    donItems:          "Articles",
    donMatchedTo:      "Jumelé à",
    donMatchedOn:      "le",
    donToastApproved:  "✓ Don approuvé — maintenant disponible.",
    donToastMatched:   "✓ Don marqué comme jumelé.",
    donEmptyIncoming:  "Aucun don entrant.",
    donEmptyAvailable: "Aucun don disponible.",
    donEmptyMatched:   "Aucun don jumelé pour l'instant.",
  },
} as const;
type Tx = (typeof translations)[Lang];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function IconGrid()   { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>; }
function IconClock()  { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IconHome()   { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 12V5l6-3 6 3v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><rect x="5" y="8" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>; }
function IconCheck()  { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8l4 4 8-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IconGift()   { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1" y="6" width="14" height="9" rx="1" stroke="currentColor" strokeWidth="1.4"/><path d="M1 6h14v3H1z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 6v9M5.5 6C5.5 4 8 2 8 6M10.5 6C10.5 4 8 2 8 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IconPeople() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1 13c0-2.8 2.2-4 5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M11 9c1.5 0 4 .8 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IconCog()    { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.41 1.41M11.36 11.36l1.41 1.41M3.22 12.78l1.41-1.41M11.36 4.64l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function IconSignOut(){ return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M9 1h3a1 1 0 011 1v10a1 1 0 01-1 1H9M6 10l3-3-3-3M9 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IconChevron({ open }: { open: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status, label }: { status: "pending" | "active" | "fulfilled"; label: string }) {
  const styles = {
    pending:   "bg-amber-100 text-amber-800 border-amber-200",
    active:    "bg-evergreen-100 text-evergreen-700 border-evergreen-200",
    fulfilled: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return <span className={`inline-flex items-center font-body font-semibold border rounded-full px-3 py-1 text-xs ${styles[status]}`}>{label}</span>;
}

function Tag({ label, color = "neutral" }: { label: string; color?: "amber" | "green" | "neutral" }) {
  const styles = { amber: "bg-amber-50 text-amber-700 border-amber-200", green: "bg-evergreen-50 text-evergreen-700 border-evergreen-200", neutral: "bg-gray-50 text-gray-600 border-gray-200" };
  return <span className={`inline-flex items-center font-body border rounded-lg px-2.5 py-1 text-xs font-medium ${styles[color]}`}>{label}</span>;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-body font-semibold text-evergreen-500 uppercase tracking-wider text-xs">{label}</dt>
      <dd className="font-body text-evergreen-800 text-base">{value}</dd>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-16 flex flex-col items-center gap-4">
      <div className="w-14 h-14 bg-evergreen-100 rounded-full flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true"><rect x="4" y="8" width="20" height="16" rx="2" stroke="#49836b" strokeWidth="2" fill="none"/><path d="M9 8V6a5 5 0 0110 0v2" stroke="#49836b" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <p className="font-body text-evergreen-600 text-base">{label}</p>
    </div>
  );
}

// ─── Pending Card (full, with expand + reject flow) ───────────────────────────
function PendingCard({
  listing, lang, tx, isExpanded, isRejecting, rejectNotes,
  onToggleExpand, onApprove, onRejectStart, onRejectConfirm, onRejectCancel, onRejectNotesChange,
}: {
  listing: Listing; lang: Lang; tx: Tx;
  isExpanded: boolean; isRejecting: boolean; rejectNotes: string;
  onToggleExpand: () => void; onApprove: () => void;
  onRejectStart: () => void; onRejectConfirm: () => void;
  onRejectCancel: () => void; onRejectNotesChange: (v: string) => void;
}) {
  const items = getListingItems(listing);
  const formattedDate = formatDate(listing.date, lang);
  return (
    <article className="bg-white rounded-2xl border border-evergreen-100 shadow-card overflow-hidden" aria-label={listing.org}>
      <div className="h-1 bg-amber-400 w-full" aria-hidden="true" />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-evergreen-800 leading-snug" style={{ fontSize: "20px" }}>{listing.org}</h3>
            <p className="font-body text-evergreen-500 text-sm mt-0.5">{listing.city} · {listing.orgType}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-body text-evergreen-400 text-xs">{tx.dateLabel(formattedDate)}</span>
            <StatusBadge status="pending" label={lang === "en" ? "Pending" : "En attente"} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <Tag key={i} label={`${getCategoryLabel(item.category, lang)} ×${item.quantity}`} color="amber" />
          ))}
        </div>
        <p className="font-body text-evergreen-700 leading-relaxed text-base">{listing.description}</p>
        <div>
          <button onClick={onToggleExpand} className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-evergreen-600 hover:text-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 rounded" aria-expanded={isExpanded}>
            <IconChevron open={isExpanded} />
            {isExpanded ? tx.hideDetails : tx.showDetails}
          </button>
          {isExpanded && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 border-t border-evergreen-100 pt-4">
              <DetailRow label={tx.labelContact}  value={listing.contactName} />
              <DetailRow label={tx.labelEmail}    value={listing.email} />
              <DetailRow label={tx.labelPhone}    value={listing.phone} />
              <DetailRow label={tx.labelUse}      value={listing.intendedUse} />
            </div>
          )}
        </div>
        {!isRejecting && (
          <div className="flex gap-3 justify-end flex-wrap pt-2 border-t border-evergreen-50">
            <button onClick={onRejectStart} className="inline-flex items-center justify-center font-body font-semibold text-sm border-2 rounded-xl px-5 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2" style={{ minHeight: "42px", borderColor: "#8B1A1A", color: "#8B1A1A" }}>{tx.rejectBtn}</button>
            <button onClick={onApprove} className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-sm rounded-xl px-5 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2" style={{ minHeight: "42px" }}>{tx.approveBtn}</button>
          </div>
        )}
        {isRejecting && (
          <div className="border-t border-evergreen-100 pt-4 flex flex-col gap-3">
            <label htmlFor={`reject-${listing.id}`} className="font-body text-evergreen-800 text-sm font-medium">{tx.rejectReason}</label>
            <textarea id={`reject-${listing.id}`} value={rejectNotes} onChange={(e) => onRejectNotesChange(e.target.value)} rows={3} className="w-full font-body text-base text-evergreen-800 bg-white border border-evergreen-200 rounded-xl px-4 py-3 resize-y focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800" placeholder={lang === "en" ? "Optional note for the organization." : "Note facultative pour l'organisation."} />
            <div className="flex gap-3 flex-wrap">
              <button onClick={onRejectConfirm} className="inline-flex items-center justify-center font-body font-semibold text-sm rounded-xl px-5 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2" style={{ minHeight: "42px", background: "#8B1A1A", color: "white" }}>{tx.confirmReject}</button>
              <button onClick={onRejectCancel} className="inline-flex items-center justify-center font-body font-semibold text-sm border border-evergreen-200 text-evergreen-700 rounded-xl px-5 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2" style={{ minHeight: "42px" }}>{tx.cancelBtn}</button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Active Card ──────────────────────────────────────────────────────────────
function ActiveCard({ listing, lang, tx, onFulfill }: { listing: Listing; lang: Lang; tx: Tx; onFulfill: () => void }) {
  const items = getListingItems(listing);
  const formattedDate = formatDate(listing.date, lang);
  return (
    <article className="bg-white rounded-2xl border border-evergreen-100 shadow-card overflow-hidden" aria-label={listing.org}>
      <div className="h-1 bg-evergreen-500 w-full" aria-hidden="true" />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-evergreen-800 leading-snug" style={{ fontSize: "20px" }}>{listing.org}</h3>
            <p className="font-body text-evergreen-500 text-sm mt-0.5">{listing.city} · {listing.orgType}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-body text-evergreen-400 text-xs">{tx.dateLabel(formattedDate)}</span>
            <StatusBadge status="active" label={lang === "en" ? "Active" : "Actif"} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <Tag key={i} label={`${getCategoryLabel(item.category, lang)} ×${item.quantity}`} color="green" />
          ))}
        </div>
        <p className="font-body text-evergreen-700 leading-relaxed text-base">{listing.description}</p>
        <div className="flex gap-3 flex-wrap justify-between items-center pt-2 border-t border-evergreen-50">
          <div className="text-sm font-body text-evergreen-500">
            <span className="font-semibold text-evergreen-700">{listing.contactName}</span> · {listing.email}
          </div>
          <button onClick={onFulfill} className="inline-flex items-center justify-center border-2 border-evergreen-300 text-evergreen-800 font-body font-semibold text-sm rounded-xl px-5 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2" style={{ minHeight: "42px" }}>{tx.fulfillBtn}</button>
        </div>
      </div>
    </article>
  );
}

// ─── Fulfilled Card ───────────────────────────────────────────────────────────
function FulfilledCard({ listing, lang, tx }: { listing: Listing; lang: Lang; tx: Tx }) {
  const items = getListingItems(listing);
  const formattedDate = formatDate(listing.date, lang);
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden opacity-70" aria-label={listing.org}>
      <div className="h-1 bg-gray-200 w-full" aria-hidden="true" />
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-gray-600 leading-snug" style={{ fontSize: "19px" }}>{listing.org}</h3>
            <p className="font-body text-gray-400 text-sm mt-0.5">{listing.city} · {listing.orgType}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-body text-gray-300 text-xs">{tx.dateLabel(formattedDate)}</span>
            <StatusBadge status="fulfilled" label={tx.fulfilledNote} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <Tag key={i} label={`${getCategoryLabel(item.category, lang)} ×${item.quantity}`} color="neutral" />
          ))}
        </div>
        <p className="font-body text-gray-400 italic text-sm">{listing.description}</p>
      </div>
    </article>
  );
}

// ─── Compact Pending Card (overview) ─────────────────────────────────────────
function CompactPendingCard({ listing, lang, tx, isRejecting, rejectNotes, onApprove, onRejectStart, onRejectConfirm, onRejectCancel, onRejectNotesChange }: {
  listing: Listing; lang: Lang; tx: Tx;
  isRejecting: boolean; rejectNotes: string;
  onApprove: () => void; onRejectStart: () => void;
  onRejectConfirm: () => void; onRejectCancel: () => void;
  onRejectNotesChange: (v: string) => void;
}) {
  const items = getListingItems(listing);
  return (
    <article className="bg-white rounded-xl border border-evergreen-100 shadow-card overflow-hidden" aria-label={listing.org}>
      <div className="h-[3px] bg-amber-400 w-full" aria-hidden="true" />
      <div className="p-4 flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-display text-evergreen-800 leading-snug" style={{ fontSize: "16px" }}>{listing.org}</p>
          <p className="font-body text-evergreen-500 text-xs mt-0.5">{listing.city} · {listing.orgType}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center font-body border rounded-md px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 border-amber-200">
                {getCategoryLabel(item.category, lang)} ×{item.quantity}
              </span>
            ))}
          </div>
        </div>
        {!isRejecting && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={onRejectStart} className="font-body font-semibold text-xs border-2 rounded-lg px-3 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2" style={{ minHeight: "34px", borderColor: "#8B1A1A", color: "#8B1A1A" }}>{tx.rejectBtn}</button>
            <button onClick={onApprove} className="font-body font-semibold text-xs bg-evergreen-800 text-white rounded-lg px-3 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2" style={{ minHeight: "34px" }}>{tx.approveBtn}</button>
          </div>
        )}
      </div>
      {isRejecting && (
        <div className="px-4 pb-4 flex flex-col gap-2 border-t border-evergreen-100 pt-3">
          <label htmlFor={`ov-reject-${listing.id}`} className="font-body text-evergreen-700 text-xs font-medium">{tx.rejectReason}</label>
          <textarea id={`ov-reject-${listing.id}`} value={rejectNotes} onChange={(e) => onRejectNotesChange(e.target.value)} rows={2} className="w-full font-body text-sm text-evergreen-800 bg-white border border-evergreen-200 rounded-lg px-3 py-2 resize-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800" />
          <div className="flex gap-2">
            <button onClick={onRejectConfirm} className="font-body font-semibold text-xs rounded-lg px-3 transition-colors" style={{ minHeight: "32px", background: "#8B1A1A", color: "white" }}>{tx.confirmReject}</button>
            <button onClick={onRejectCancel} className="font-body font-semibold text-xs border border-evergreen-200 text-evergreen-700 rounded-lg px-3 hover:bg-evergreen-50 transition-colors" style={{ minHeight: "32px" }}>{tx.cancelBtn}</button>
          </div>
        </div>
      )}
    </article>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function OverviewView({ pending, active, fulfilled, listings, lang, tx, rejectingId, rejectNotes, onApprove, onRejectStart, onRejectConfirm, onRejectCancel, onRejectNotesChange, onNavigate }: {
  pending: Listing[]; active: Listing[]; fulfilled: Listing[]; listings: Listing[];
  lang: Lang; tx: Tx; rejectingId: number | null; rejectNotes: string;
  onApprove: (id: number) => void; onRejectStart: (id: number) => void;
  onRejectConfirm: (id: number) => void; onRejectCancel: () => void;
  onRejectNotesChange: (v: string) => void; onNavigate: (v: View) => void;
}) {
  const recentActivity = [
    { color: "#49836b", text: lang === "en" ? "Moncton Headstart marked fulfilled" : "Moncton Headstart marquée satisfaite", time: lang === "en" ? "2h ago" : "il y a 2h" },
    { color: "#c8892a", text: lang === "en" ? "NB Literacy Council submitted request" : "NB Literacy Council a soumis", time: lang === "en" ? "Yesterday" : "Hier" },
    { color: "#49836b", text: lang === "en" ? "YMCA listing approved & published" : "Annonce YMCA approuvée", time: "May 10" },
    { color: "#c8892a", text: lang === "en" ? "Dieppe Arts Council submitted" : "Dieppe Arts Council a soumis", time: "May 9" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: tx.statPending,   count: pending.length,   accent: "#c8892a", textColor: "#7d5216",  sub: pending.length > 0 ? tx.newToday(pending.length) : tx.noNewToday },
          { label: tx.statActive,    count: active.length,    accent: "#49836b", textColor: "#254135",  sub: lang === "en" ? "Visible on board" : "Visible sur le tableau" },
          { label: tx.statFulfilled, count: fulfilled.length, accent: "#9ca3af", textColor: "#6b7280",  sub: lang === "en" ? "Connections made" : "Connexions établies" },
          { label: tx.statTotal,     count: listings.length,  accent: "#254135", textColor: "#254135",  sub: lang === "en" ? "All time" : "Depuis le début" },
        ].map(({ label, count, accent, textColor, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="h-[3px]" style={{ background: accent }} />
            <div className="p-5">
              <p className="font-display leading-none mb-1" style={{ fontSize: "36px", color: textColor }}>{count}</p>
              <p className="font-body font-semibold text-evergreen-700" style={{ fontSize: "13px" }}>{label}</p>
              <p className="font-body text-evergreen-400 mt-1" style={{ fontSize: "11px" }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pending attention */}
      {pending.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-evergreen-800" style={{ fontSize: "18px" }}>{tx.attentionTitle}</h2>
              <span className="inline-flex items-center font-body font-bold border rounded-full px-2.5 py-0.5 text-xs bg-amber-100 text-amber-800 border-amber-200">{pending.length}</span>
            </div>
            <button onClick={() => onNavigate("pending")} className="font-body text-sm text-evergreen-600 hover:text-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 rounded">{tx.viewAll}</button>
          </div>
          <div className="flex flex-col gap-3">
            {pending.map((l) => (
              <CompactPendingCard
                key={l.id} listing={l} lang={lang} tx={tx}
                isRejecting={rejectingId === l.id}
                rejectNotes={rejectingId === l.id ? rejectNotes : ""}
                onApprove={() => onApprove(l.id)}
                onRejectStart={() => onRejectStart(l.id)}
                onRejectConfirm={() => onRejectConfirm(l.id)}
                onRejectCancel={onRejectCancel}
                onRejectNotesChange={onRejectNotesChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Two-column: active snapshot + recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active snapshot */}
        <div className="bg-white rounded-2xl border border-evergreen-100 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-evergreen-800" style={{ fontSize: "16px" }}>{tx.activeSnapshot}</h2>
            <button onClick={() => onNavigate("active")} className="font-body text-xs text-evergreen-600 hover:text-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 rounded">{tx.viewAll}</button>
          </div>
          {active.length === 0
            ? <p className="font-body text-evergreen-400 text-sm">{tx.emptyActive}</p>
            : <ul className="flex flex-col divide-y divide-evergreen-50">
                {active.map((l) => (
                  <li key={l.id} className="flex items-center gap-3 py-3">
                    <span className="w-2 h-2 rounded-full bg-evergreen-400 flex-shrink-0" aria-hidden="true" />
                    <span className="flex-1 font-body text-evergreen-800 text-sm truncate">{l.org}</span>
                    <span className="inline-flex items-center font-body font-semibold border rounded-full px-2.5 py-0.5 text-xs bg-evergreen-100 text-evergreen-700 border-evergreen-200 flex-shrink-0">
                      {lang === "en" ? "Active" : "Actif"}
                    </span>
                  </li>
                ))}
              </ul>
          }
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-evergreen-100 shadow-card p-5">
          <h2 className="font-display text-evergreen-800 mb-4" style={{ fontSize: "16px" }}>{tx.recentActivity}</h2>
          <ul className="flex flex-col divide-y divide-evergreen-50">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} aria-hidden="true" />
                <span className="flex-1 font-body text-evergreen-700 text-sm">{item.text}</span>
                <span className="font-body text-evergreen-400 text-xs flex-shrink-0">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Condition chip ───────────────────────────────────────────────────────────
function ConditionChip({ value, lang }: { value: string; lang: Lang }) {
  const opt = conditionOptions.find((c) => c.value === value);
  const label = opt ? opt[lang] : value;
  const styles: Record<string, string> = {
    green:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    teal:   "bg-evergreen-50 text-evergreen-700 border-evergreen-200",
    amber:  "bg-amber-50 text-amber-700 border-amber-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    red:    "bg-red-50 text-red-700 border-red-200",
  };
  const cls = styles[opt?.color ?? "teal"] ?? styles.teal;
  return (
    <span className={`inline-flex items-center font-body border rounded-md px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}

// ─── Logistics badge ──────────────────────────────────────────────────────────
function LogisticsBadge({ value, tx }: { value: string; tx: Tx }) {
  const icon = value === "pickup" ? "📍" : value === "shipping" ? "📦" : "📍📦";
  const label = value === "pickup" ? tx.donPickup : value === "shipping" ? tx.donShipping : tx.donBoth;
  return (
    <span className="inline-flex items-center gap-1 font-body text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 rounded-full px-2.5 py-1">
      <span aria-hidden="true">{icon}</span> {label}
    </span>
  );
}

// ─── Donation card ────────────────────────────────────────────────────────────
function DonationCard({
  donation, lang, tx,
  isRejecting, rejectNotes, isMatching, matchOrg,
  onApprove, onRejectStart, onRejectConfirm, onRejectCancel, onRejectNotesChange,
  onMatchStart, onMatchConfirm, onMatchCancel, onMatchOrgChange,
}: {
  donation: Donation; lang: Lang; tx: Tx;
  isRejecting: boolean; rejectNotes: string;
  isMatching: boolean; matchOrg: string;
  onApprove: () => void; onRejectStart: () => void;
  onRejectConfirm: () => void; onRejectCancel: () => void;
  onRejectNotesChange: (v: string) => void;
  onMatchStart: () => void; onMatchConfirm: () => void;
  onMatchCancel: () => void; onMatchOrgChange: (v: string) => void;
}) {
  const accentColor =
    donation.status === "incoming"  ? "#f59e0b" :
    donation.status === "available" ? "#49836b" : "#9ca3af";

  const totalItems = donation.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden" aria-label={donation.orgName}>
      <div className="h-1 w-full" style={{ background: accentColor }} aria-hidden="true" />
      <div className="p-6 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-evergreen-800 leading-snug" style={{ fontSize: "19px" }}>{donation.orgName}</h3>
            <p className="font-body text-evergreen-500 text-sm mt-0.5">{donation.city}, {donation.province}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
            <LogisticsBadge value={donation.logistics} tx={tx} />
            <span className="font-body text-evergreen-400 text-xs">
              {formatDate(donation.date, lang)}
            </span>
            {donation.status === "matched" && (
              <span className="inline-flex items-center font-body font-semibold border rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-500 border-gray-200">
                {tx.donTabMatched}
              </span>
            )}
          </div>
        </div>

        {/* Items */}
        <div>
          <p className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider mb-2">
            {tx.donItems} · {totalItems} {lang === "en" ? "units" : "unités"}
          </p>
          <div className="flex flex-col divide-y divide-evergreen-50 border border-evergreen-100 rounded-xl overflow-hidden">
            {donation.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-body font-semibold text-evergreen-800 text-sm">
                      {categoryOptions.find(c => c.value === item.category)?.[lang] ?? item.category}
                    </span>
                    <ConditionChip value={item.condition} lang={lang} />
                    <span className="font-body font-bold text-xs bg-evergreen-100 text-evergreen-700 rounded-full px-2 py-0.5">
                      ×{item.quantity}
                    </span>
                  </div>
                  <p className="font-body text-evergreen-500 text-xs mt-0.5 truncate">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact + Notes row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-evergreen-50 rounded-xl px-4 py-3">
            <p className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider mb-1">{tx.donContact}</p>
            <p className="font-body text-evergreen-800 text-sm font-medium">{donation.contactName}</p>
            <a href={`mailto:${donation.contactEmail}`} className="font-body text-evergreen-600 text-xs hover:text-evergreen-800 transition-colors">{donation.contactEmail}</a>
            <p className="font-body text-evergreen-500 text-xs mt-0.5">{donation.contactPhone}</p>
          </div>
          {donation.notes && (
            <div className="bg-evergreen-50 rounded-xl px-4 py-3">
              <p className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider mb-1">{tx.donNotes}</p>
              <p className="font-body text-evergreen-700 text-sm leading-relaxed line-clamp-3">{donation.notes}</p>
            </div>
          )}
        </div>

        {/* Matched info */}
        {donation.status === "matched" && donation.matchedTo && (
          <div className="flex items-center gap-2 bg-evergreen-800 text-white rounded-xl px-4 py-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8l4 4 8-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <p className="font-body text-sm">
              <span className="opacity-70">{tx.donMatchedTo}</span>{" "}
              <strong className="font-semibold">{donation.matchedTo}</strong>
              {donation.matchedDate && (
                <span className="opacity-70"> {tx.donMatchedOn} {formatDate(donation.matchedDate, lang)}</span>
              )}
            </p>
          </div>
        )}

        {/* Actions — incoming */}
        {donation.status === "incoming" && !isRejecting && (
          <div className="flex gap-3 justify-end flex-wrap pt-2 border-t border-evergreen-50">
            <button onClick={onRejectStart} className="inline-flex items-center justify-center font-body font-semibold text-sm border-2 rounded-xl px-5 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2" style={{ minHeight: "42px", borderColor: "#8B1A1A", color: "#8B1A1A" }}>{tx.donReject}</button>
            <button onClick={onApprove} className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-sm rounded-xl px-5 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2" style={{ minHeight: "42px" }}>{tx.donApprove}</button>
          </div>
        )}

        {/* Reject flow */}
        {isRejecting && (
          <div className="border-t border-evergreen-100 pt-4 flex flex-col gap-3">
            <label htmlFor={`don-reject-${donation.id}`} className="font-body text-evergreen-800 text-sm font-medium">{tx.donRejectReason}</label>
            <textarea id={`don-reject-${donation.id}`} value={rejectNotes} onChange={(e) => onRejectNotesChange(e.target.value)} rows={2} className="w-full font-body text-sm text-evergreen-800 bg-white border border-evergreen-200 rounded-xl px-4 py-3 resize-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800" />
            <div className="flex gap-3">
              <button onClick={onRejectConfirm} className="inline-flex items-center justify-center font-body font-semibold text-sm rounded-xl px-5" style={{ minHeight: "42px", background: "#8B1A1A", color: "white" }}>{tx.donConfirmReject}</button>
              <button onClick={onRejectCancel} className="inline-flex items-center justify-center font-body font-semibold text-sm border border-evergreen-200 text-evergreen-700 rounded-xl px-5 hover:bg-evergreen-50 transition-colors" style={{ minHeight: "42px" }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Actions — available */}
        {donation.status === "available" && !isMatching && (
          <div className="flex gap-3 justify-end flex-wrap pt-2 border-t border-evergreen-50">
            <button onClick={onMatchStart} className="inline-flex items-center gap-2 justify-center bg-harvest text-white font-body font-semibold text-sm rounded-xl px-5 hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2" style={{ minHeight: "42px" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {tx.donMarkMatched}
            </button>
          </div>
        )}

        {/* Match flow */}
        {isMatching && (
          <div className="border-t border-evergreen-100 pt-4 flex flex-col gap-3">
            <label htmlFor={`don-match-${donation.id}`} className="font-body text-evergreen-800 text-sm font-medium">{tx.donMatchLabel}</label>
            <input id={`don-match-${donation.id}`} type="text" value={matchOrg} onChange={(e) => onMatchOrgChange(e.target.value)} placeholder={tx.donMatchPlaceholder} className="w-full font-body text-sm text-evergreen-800 bg-white border border-evergreen-200 rounded-xl px-4 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800" style={{ height: "44px" }} />
            <div className="flex gap-3">
              <button onClick={onMatchConfirm} disabled={!matchOrg.trim()} className="inline-flex items-center justify-center bg-harvest text-white font-body font-semibold text-sm rounded-xl px-5 hover:bg-harvest-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed" style={{ minHeight: "42px" }}>{tx.donConfirmMatch}</button>
              <button onClick={onMatchCancel} className="inline-flex items-center justify-center font-body font-semibold text-sm border border-evergreen-200 text-evergreen-700 rounded-xl px-5 hover:bg-evergreen-50 transition-colors" style={{ minHeight: "42px" }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Donations view ───────────────────────────────────────────────────────────
function DonationsView({ lang, tx, donations, setDonations, addToast }: {
  lang: Lang; tx: Tx;
  donations: Donation[];
  setDonations: React.Dispatch<React.SetStateAction<Donation[]>>;
  addToast: (msg: string) => void;
}) {
  const [tab, setTab]               = useState<DonationTab>("incoming");
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectNotes, setRejectNotes] = useState("");
  const [matchingId, setMatchingId]   = useState<number | null>(null);
  const [matchOrg, setMatchOrg]       = useState("");

  const incoming  = donations.filter((d) => d.status === "incoming");
  const available = donations.filter((d) => d.status === "available");
  const matched   = donations.filter((d) => d.status === "matched");

  function handleApprove(id: number) {
    setDonations((prev) => prev.map((d) => d.id === id ? { ...d, status: "available" as DonationStatus } : d));
    addToast(tx.donToastApproved);
  }
  function handleRejectConfirm(id: number) {
    setDonations((prev) => prev.filter((d) => d.id !== id));
    setRejectingId(null); setRejectNotes("");
  }
  function handleMatchConfirm(id: number) {
    if (!matchOrg.trim()) return;
    setDonations((prev) => prev.map((d) => d.id === id ? {
      ...d, status: "matched" as DonationStatus,
      matchedTo: matchOrg.trim(),
      matchedDate: new Date().toISOString().split("T")[0],
    } : d));
    addToast(tx.donToastMatched);
    setMatchingId(null); setMatchOrg("");
  }

  const tabs: { id: DonationTab; label: string; count: number }[] = [
    { id: "incoming",  label: tx.donTabIncoming,  count: incoming.length },
    { id: "available", label: tx.donTabAvailable, count: available.length },
    { id: "matched",   label: tx.donTabMatched,   count: matched.length },
  ];

  const visibleDonations = tab === "incoming" ? incoming : tab === "available" ? available : matched;
  const emptyLabel       = tab === "incoming" ? tx.donEmptyIncoming : tab === "available" ? tx.donEmptyAvailable : tx.donEmptyMatched;

  return (
    <div className="flex flex-col gap-5">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: tx.donTabIncoming,  count: incoming.length,  accent: "#f59e0b", textColor: "#92400e" },
          { label: tx.donTabAvailable, count: available.length, accent: "#49836b", textColor: "#254135" },
          { label: tx.donTabMatched,   count: matched.length,   accent: "#9ca3af", textColor: "#4b5563" },
        ].map(({ label, count, accent, textColor }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="h-[3px]" style={{ background: accent }} />
            <div className="p-4">
              <p className="font-display leading-none mb-1" style={{ fontSize: "32px", color: textColor }}>{count}</p>
              <p className="font-body font-semibold text-evergreen-600 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="flex border-b border-gray-100" role="tablist">
          {tabs.map(({ id, label, count }) => {
            const isSel = tab === id;
            return (
              <button key={id} role="tab" aria-selected={isSel} onClick={() => setTab(id)}
                className="flex items-center gap-2 font-body font-semibold text-sm px-6 py-4 border-b-2 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-[-3px]"
                style={{ borderColor: isSel ? "#254135" : "transparent", color: isSel ? "#254135" : "#9ca3af" }}
              >
                {label}
                {count > 0 && (
                  <span className="font-bold text-xs rounded-full px-1.5 py-0.5 leading-none"
                    style={{ background: isSel ? "#254135" : "#f3f4f6", color: isSel ? "white" : "#6b7280" }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="p-5 flex flex-col gap-4">
          {visibleDonations.length === 0
            ? <EmptyState label={emptyLabel} />
            : visibleDonations.map((d) => (
              <DonationCard
                key={d.id} donation={d} lang={lang} tx={tx}
                isRejecting={rejectingId === d.id}
                rejectNotes={rejectingId === d.id ? rejectNotes : ""}
                isMatching={matchingId === d.id}
                matchOrg={matchingId === d.id ? matchOrg : ""}
                onApprove={() => handleApprove(d.id)}
                onRejectStart={() => { setRejectingId(d.id); setRejectNotes(""); }}
                onRejectConfirm={() => handleRejectConfirm(d.id)}
                onRejectCancel={() => { setRejectingId(null); setRejectNotes(""); }}
                onRejectNotesChange={setRejectNotes}
                onMatchStart={() => { setMatchingId(d.id); setMatchOrg(""); }}
                onMatchConfirm={() => handleMatchConfirm(d.id)}
                onMatchCancel={() => { setMatchingId(null); setMatchOrg(""); }}
                onMatchOrgChange={setMatchOrg}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder view ─────────────────────────────────────────────────────────
function PlaceholderView({ tx }: { tx: Tx }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-16 h-16 bg-evergreen-100 rounded-2xl flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 4v10m0 0l-4-4m4 4l4-4" stroke="#49836b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="18" width="20" height="6" rx="2" stroke="#49836b" strokeWidth="2" fill="none"/></svg>
      </div>
      <p className="font-display text-evergreen-800 text-xl">{tx.comingSoon}</p>
      <p className="font-body text-evergreen-500 text-base">{tx.comingSoonSub}</p>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function AdminSidebar({ view, setView, pendingCount, activeCount, fulfilledCount, incomingDonations, tx, onSignOut }: {
  view: View; setView: (v: View) => void;
  pendingCount: number; activeCount: number; fulfilledCount: number;
  incomingDonations: number;
  tx: Tx; onSignOut: () => void;
}) {
  function NavItem({ id, icon, label, badge }: { id: View; icon: React.ReactNode; label: string; badge?: number | null }) {
    const isActive = view === id;
    return (
      <button
        onClick={() => setView(id)}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[-2px]"
        style={{
          background: isActive ? "rgba(200,137,42,0.15)" : "transparent",
          color: isActive ? "#e8b566" : "rgba(255,255,255,0.55)",
          fontSize: "13px",
        }}
        onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; } }}
        onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; } }}
        aria-current={isActive ? "page" : undefined}
      >
        <span style={{ opacity: isActive ? 1 : 0.55, flexShrink: 0 }}>{icon}</span>
        <span className="font-body flex-1">{label}</span>
        {badge != null && (
          <span className="font-body font-bold text-xs rounded-full px-1.5 leading-none flex-shrink-0"
            style={{ paddingTop: "3px", paddingBottom: "3px",
              background: badge > 0 ? "#c8892a" : "rgba(255,255,255,0.1)",
              color: badge > 0 ? "#12211b" : "rgba(255,255,255,0.45)",
            }}>
            {badge}
          </span>
        )}
      </button>
    );
  }

  function SectionLabel({ label }: { label: string }) {
    return <p className="font-body px-3 pt-4 pb-1 text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>{label}</p>;
  }

  return (
    <aside className="flex flex-col flex-shrink-0 h-full" style={{ width: "220px", background: "#12211b" }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <svg width="28" height="22" viewBox="0 0 34 26" fill="none" aria-hidden="true">
          <path d="M4 21 C4 5 30 5 30 21" stroke="rgba(255,255,255,0.82)" strokeWidth="2.25" fill="none" strokeLinecap="round"/>
          <path d="M11 14.5V21" stroke="rgba(255,255,255,0.82)" strokeWidth="1.25" strokeLinecap="round" opacity="0.42"/>
          <path d="M17 11V21"   stroke="rgba(255,255,255,0.82)" strokeWidth="1.25" strokeLinecap="round" opacity="0.42"/>
          <path d="M23 14.5V21" stroke="rgba(255,255,255,0.82)" strokeWidth="1.25" strokeLinecap="round" opacity="0.42"/>
          <rect x="0" y="20.5" width="34" height="3" rx="1.5" fill="#c8892a"/>
          <circle cx="4"  cy="21" r="3" fill="#c8892a"/>
          <circle cx="30" cy="21" r="3" fill="#c8892a"/>
          <circle cx="17" cy="11" r="2.5" fill="rgba(255,255,255,0.88)"/>
        </svg>
        <span className="font-display leading-none" style={{ fontSize: "18px", letterSpacing: "-0.01em" }}>
          <span style={{ color: "rgba(255,255,255,0.9)" }}>Tech</span><span style={{ color: "#c8892a" }}>Bridge</span>
        </span>
        <span className="font-body font-bold rounded text-xs ml-1 px-1.5 py-0.5 flex-shrink-0" style={{ background: "#c8892a", color: "#12211b", fontSize: "9px", letterSpacing: "0.05em" }}>
          {tx.adminBadge.toUpperCase()}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2" aria-label="Admin navigation">
        <SectionLabel label={tx.sectionMain} />
        <NavItem id="overview"       icon={<IconGrid />}   label={tx.navOverview} />

        <SectionLabel label={tx.sectionRequests} />
        <NavItem id="pending"        icon={<IconClock />}  label={tx.navPending}   badge={pendingCount} />
        <NavItem id="active"         icon={<IconHome />}   label={tx.navActive}    badge={activeCount} />
        <NavItem id="fulfilled"      icon={<IconCheck />}  label={tx.navFulfilled} badge={fulfilledCount} />

        <SectionLabel label={tx.sectionManage} />
        <NavItem id="donations"      icon={<IconGift />}   label={tx.navDonations} badge={incomingDonations} />
        <NavItem id="organizations"  icon={<IconPeople />} label={tx.navOrgs} />
        <NavItem id="settings"       icon={<IconCog />}    label={tx.navSettings} />
      </nav>

      {/* User + sign out */}
      <div className="px-2 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-body font-semibold text-xs flex-shrink-0" style={{ background: "#254135", border: "1.5px solid #c8892a", color: "#c8892a" }}>A</div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-xs font-medium truncate" style={{ color: "rgba(255,255,255,0.82)" }}>Administrator</p>
            <p className="font-body text-xs truncate" style={{ color: "rgba(255,255,255,0.3)" }}>admin@techbridge.ca</p>
          </div>
          <button onClick={onSignOut} className="p-1.5 rounded-md transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white" style={{ color: "rgba(255,255,255,0.3)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")} aria-label={tx.signOut}>
            <IconSignOut />
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── Slim top bar ─────────────────────────────────────────────────────────────
function AdminTopBar({ view, tx, lang, onToggleLang }: { view: View; tx: Tx; lang: Lang; onToggleLang: () => void }) {
  const breadcrumbs: Record<View, string> = {
    overview:      tx.navOverview,
    pending:       tx.navPending,
    active:        tx.navActive,
    fulfilled:     tx.navFulfilled,
    donations:     tx.navDonations,
    organizations: tx.navOrgs,
    settings:      tx.navSettings,
  };
  return (
    <header className="flex items-center justify-between px-6 border-b border-gray-200 bg-white flex-shrink-0" style={{ height: "52px" }}>
      <div className="flex items-center gap-2 font-body text-sm" style={{ color: "var(--color-text-secondary)" }}>
        <span style={{ color: "#9ca3af" }}>Admin</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
        <strong className="font-semibold text-evergreen-800">{breadcrumbs[view]}</strong>
      </div>
      <button onClick={onToggleLang} aria-label={tx.langAriaSwitch} className="font-body text-xs font-semibold text-evergreen-700 border border-evergreen-200 rounded-lg px-3 hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 flex items-center" style={{ minHeight: "34px" }}>
        {tx.langToggle}
      </button>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const router               = useRouter();
  const { lang, toggleLang } = useLanguage();
  const tx                   = translations[lang];

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [listings, setListings]           = useState<Listing[]>(ALL_LISTINGS);
  const [donations, setDonations]         = useState<Donation[]>(ALL_DONATIONS);
  const [view, setView]                   = useState<View>("overview");
  const [toasts, setToasts]               = useState<Toast[]>([]);
  const [expandedIds, setExpandedIds]     = useState<Set<number>>(new Set());
  const [rejectingId, setRejectingId]     = useState<number | null>(null);
  const [rejectNotes, setRejectNotes]     = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("techbridge_admin_auth");
    if (!auth) { router.push("/admin/login"); } else { setAuthenticated(true); }
  }, [router]);

  const addToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  function handleApprove(id: number) {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status: "active" as ListingStatus } : l)));
    addToast(tx.toastApproved);
  }
  function handleRejectConfirm(id: number) {
    setListings((prev) => prev.filter((l) => l.id !== id));
    setRejectingId(null); setRejectNotes("");
  }
  function handleFulfill(id: number) {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status: "fulfilled" as ListingStatus } : l)));
    addToast(tx.toastFulfilled);
  }
  function toggleExpand(id: number) {
    setExpandedIds((prev) => { const next = new Set(prev); if (next.has(id)) { next.delete(id); } else { next.add(id); } return next; });
  }
  function handleSignOut() {
    localStorage.removeItem("techbridge_admin_auth");
    router.push("/admin/login");
  }

  const pending   = listings.filter((l) => l.status === "pending");
  const active    = listings.filter((l) => l.status === "active");
  const fulfilled = listings.filter((l) => l.status === "fulfilled");

  if (!authenticated) return null;

  const rejectProps = {
    rejectingId, rejectNotes,
    onApprove: handleApprove,
    onRejectStart: (id: number) => { setRejectingId(id); setRejectNotes(""); },
    onRejectConfirm: handleRejectConfirm,
    onRejectCancel: () => { setRejectingId(null); setRejectNotes(""); },
    onRejectNotesChange: setRejectNotes,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar */}
      <AdminSidebar
        view={view} setView={setView}
        pendingCount={pending.length}
        activeCount={active.length}
        fulfilledCount={fulfilled.length}
        incomingDonations={donations.filter(d => d.status === "incoming").length}
        tx={tx} onSignOut={handleSignOut}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminTopBar view={view} tx={tx} lang={lang} onToggleLang={toggleLang} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-7">
          <div className="max-w-4xl mx-auto">

            {view === "overview" && (
              <OverviewView
                pending={pending} active={active} fulfilled={fulfilled} listings={listings}
                lang={lang} tx={tx}
                {...rejectProps}
                onNavigate={setView}
              />
            )}

            {view === "pending" && (
              <div className="flex flex-col gap-4">
                {pending.length === 0
                  ? <EmptyState label={tx.emptyPending} />
                  : pending.map((l) => (
                    <PendingCard
                      key={l.id} listing={l} lang={lang} tx={tx}
                      isExpanded={expandedIds.has(l.id)}
                      isRejecting={rejectingId === l.id}
                      rejectNotes={rejectingId === l.id ? rejectNotes : ""}
                      onToggleExpand={() => toggleExpand(l.id)}
                      onApprove={() => handleApprove(l.id)}
                      onRejectStart={() => { setRejectingId(l.id); setRejectNotes(""); }}
                      onRejectConfirm={() => handleRejectConfirm(l.id)}
                      onRejectCancel={() => { setRejectingId(null); setRejectNotes(""); }}
                      onRejectNotesChange={setRejectNotes}
                    />
                  ))
                }
              </div>
            )}

            {view === "active" && (
              <div className="flex flex-col gap-4">
                {active.length === 0
                  ? <EmptyState label={tx.emptyActive} />
                  : active.map((l) => (
                    <ActiveCard key={l.id} listing={l} lang={lang} tx={tx} onFulfill={() => handleFulfill(l.id)} />
                  ))
                }
              </div>
            )}

            {view === "fulfilled" && (
              <div className="flex flex-col gap-4">
                {fulfilled.length === 0
                  ? <EmptyState label={tx.emptyFulfilled} />
                  : fulfilled.map((l) => (
                    <FulfilledCard key={l.id} listing={l} lang={lang} tx={tx} />
                  ))
                }
              </div>
            )}

            {view === "donations" && (
              <DonationsView
                lang={lang} tx={tx}
                donations={donations}
                setDonations={setDonations}
                addToast={addToast}
              />
            )}

            {(view === "organizations" || view === "settings") && (
              <PlaceholderView tx={tx} />
            )}

          </div>
        </main>
      </div>

      {/* Toast notifications */}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2" aria-live="polite" aria-atomic="false">
          {toasts.map((toast) => (
            <div key={toast.id} className="bg-evergreen-800 text-white font-body font-medium rounded-xl px-5 py-3 shadow-lg" style={{ fontSize: "15px" }} role="status">
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
