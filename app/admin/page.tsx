"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { ALL_LISTINGS, categoryOptions, type Listing, type ListingStatus } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "pending" | "active" | "fulfilled";
interface Toast { id: number; message: string; }

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    adminBadge:     "Admin",
    signOut:        "Sign Out",
    langAriaEn:     "Switch to French",
    langAriaFr:     "Switch to English",
    statPending:    "Pending Review",
    statActive:     "Active Listings",
    statFulfilled:  "Fulfilled",
    statTotal:      "Total Requests",
    tabPending:     "Pending Review",
    tabActive:      "Active Listings",
    tabFulfilled:   "Fulfilled",
    showDetails:    "Show full details ▾",
    hideDetails:    "Hide details ▴",
    labelContact:   "Contact",
    labelEmail:     "Email",
    labelPhone:     "Phone",
    labelUse:       "Intended Use",
    labelQty:       "Quantity",
    labelCategory:  "Category",
    approveBtn:     "Approve & Publish",
    rejectBtn:      "Reject",
    rejectReason:   "Reason for rejection (optional — will be sent to the organization):",
    confirmReject:  "Confirm Reject",
    cancelBtn:      "Cancel",
    fulfillBtn:     "Mark as Fulfilled",
    fulfilledNote:  "This request has been fulfilled.",
    dateLabel:      (d: string) => `Submitted: ${d}`,
    toastApproved:  "Listing approved and published.",
    emptyPending:   "No pending submissions.",
    emptyActive:    "No active listings.",
    emptyFulfilled: "No fulfilled requests yet.",
  },
  fr: {
    adminBadge:     "Admin",
    signOut:        "Déconnexion",
    langAriaEn:     "Passer en français",
    langAriaFr:     "Passer en anglais",
    statPending:    "En attente",
    statActive:     "Annonces actives",
    statFulfilled:  "Satisfaites",
    statTotal:      "Total des demandes",
    tabPending:     "En attente",
    tabActive:      "Annonces actives",
    tabFulfilled:   "Satisfaites",
    showDetails:    "Voir les détails ▾",
    hideDetails:    "Masquer les détails ▴",
    labelContact:   "Contact",
    labelEmail:     "Courriel",
    labelPhone:     "Téléphone",
    labelUse:       "Utilisation prévue",
    labelQty:       "Quantité",
    labelCategory:  "Catégorie",
    approveBtn:     "Approuver et publier",
    rejectBtn:      "Rejeter",
    rejectReason:   "Raison du rejet (facultatif — sera envoyée à l'organisation):",
    confirmReject:  "Confirmer le rejet",
    cancelBtn:      "Annuler",
    fulfillBtn:     "Marquer comme satisfaite",
    fulfilledNote:  "Cette demande a été satisfaite.",
    dateLabel:      (d: string) => `Soumis le: ${d}`,
    toastApproved:  "Annonce approuvée et publiée.",
    emptyPending:   "Aucune soumission en attente.",
    emptyActive:    "Aucune annonce active.",
    emptyFulfilled: "Aucune demande satisfaite pour l'instant.",
  },
} as const;

type Tx = (typeof translations)[Lang];

// ─── Shared card badge ────────────────────────────────────────────────────────

function Badge({ label, color }: { label: string; color: "gold" | "green" | "gray" }) {
  const styles = {
    gold:  "bg-amber-100 text-amber-800 border-amber-200",
    green: "bg-evergreen-100 text-evergreen-700 border-evergreen-200",
    gray:  "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center font-body border rounded-md px-2.5 ${styles[color]}`}
      style={{ fontSize: "13px", paddingTop: "3px", paddingBottom: "3px" }}
    >
      {label}
    </span>
  );
}

// ─── Pending card ─────────────────────────────────────────────────────────────

function PendingCard({
  listing, lang, tx, isExpanded, isRejecting, rejectNotes,
  onToggleExpand, onApprove, onRejectStart, onRejectConfirm, onRejectCancel,
  onRejectNotesChange,
}: {
  listing: Listing; lang: Lang; tx: Tx;
  isExpanded: boolean; isRejecting: boolean; rejectNotes: string;
  onToggleExpand: () => void; onApprove: () => void;
  onRejectStart: () => void; onRejectConfirm: () => void;
  onRejectCancel: () => void; onRejectNotesChange: (v: string) => void;
}) {
  const categoryLabel = getCategoryLabel(listing.category, lang);
  const formattedDate = formatDate(listing.date, lang);

  return (
    <article
      className="bg-white border border-evergreen-200 rounded-xl p-6 flex flex-col gap-4"
      style={{ borderLeft: "4px solid #C8892A" }}
      aria-label={listing.org}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h3 className="font-display text-evergreen-800" style={{ fontSize: "20px" }}>
          {listing.org}
        </h3>
        <span className="font-body text-gray-400 flex-shrink-0" style={{ fontSize: "14px" }}>
          {tx.dateLabel(formattedDate)}
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge label={listing.city}   color="gold" />
        <Badge label={categoryLabel}  color="gold" />
        <Badge label={listing.orgType} color="gold" />
      </div>

      {/* Description */}
      <p className="font-body text-evergreen-700 leading-relaxed" style={{ fontSize: "16px" }}>
        {listing.description}
      </p>

      {/* Expandable details */}
      <div>
        <button
          onClick={onToggleExpand}
          className="font-body text-evergreen-600 hover:text-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 rounded"
          style={{ fontSize: "16px" }}
          aria-expanded={isExpanded}
        >
          {isExpanded ? tx.hideDetails : tx.showDetails}
        </button>

        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-evergreen-100 pt-4">
            {[
              { label: tx.labelContact,  value: listing.contactName },
              { label: tx.labelEmail,    value: listing.email },
              { label: tx.labelPhone,    value: listing.phone },
              { label: tx.labelQty,      value: String(listing.quantity) },
              { label: tx.labelCategory, value: categoryLabel },
              { label: tx.labelUse,      value: listing.intendedUse },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="font-body font-semibold text-evergreen-500 uppercase tracking-wider" style={{ fontSize: "12px" }}>
                  {label}
                </dt>
                <dd className="font-body text-evergreen-800" style={{ fontSize: "16px" }}>
                  {value}
                </dd>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      {!isRejecting && (
        <div className="flex gap-3 justify-end flex-wrap">
          <button
            onClick={onRejectStart}
            className="inline-flex items-center justify-center border-2 font-display rounded-full px-6 min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2"
            style={{ fontSize: "16px", borderColor: "#8B1A1A", color: "#8B1A1A", backgroundColor: "white" }}
          >
            {tx.rejectBtn}
          </button>
          <button
            onClick={onApprove}
            className="inline-flex items-center justify-center bg-evergreen-800 text-white font-display rounded-full px-6 min-h-[48px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
            style={{ fontSize: "16px" }}
          >
            {tx.approveBtn}
          </button>
        </div>
      )}

      {/* Rejection confirmation */}
      {isRejecting && (
        <div className="border-t border-evergreen-100 pt-4 flex flex-col gap-4">
          <label htmlFor={`reject-notes-${listing.id}`} className="font-body text-evergreen-800 leading-relaxed" style={{ fontSize: "16px" }}>
            {tx.rejectReason}
          </label>
          <textarea
            id={`reject-notes-${listing.id}`}
            rows={3}
            value={rejectNotes}
            onChange={(e) => onRejectNotesChange(e.target.value)}
            className="w-full bg-white border border-evergreen-300 rounded-lg px-3 py-3 font-body text-evergreen-900 text-lg focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800"
            placeholder="Optional..."
          />
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={onRejectConfirm}
              className="inline-flex items-center justify-center font-display rounded-full px-6 min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2"
              style={{ fontSize: "16px", backgroundColor: "#8B1A1A", color: "white", border: "none" }}
            >
              {tx.confirmReject}
            </button>
            <button
              onClick={onRejectCancel}
              className="inline-flex items-center justify-center bg-white border-2 border-evergreen-800 text-evergreen-800 font-display rounded-full px-6 min-h-[48px] hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
              style={{ fontSize: "16px" }}
            >
              {tx.cancelBtn}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

// ─── Active card ──────────────────────────────────────────────────────────────

function ActiveCard({
  listing, lang, tx, onFulfill,
}: {
  listing: Listing; lang: Lang; tx: Tx; onFulfill: () => void;
}) {
  const categoryLabel = getCategoryLabel(listing.category, lang);
  const formattedDate = formatDate(listing.date, lang);

  return (
    <article
      className="bg-white border border-evergreen-200 rounded-xl p-6 flex flex-col gap-4 border-l-4 border-l-evergreen-600"
      aria-label={listing.org}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h3 className="font-display text-evergreen-800" style={{ fontSize: "20px" }}>
          {listing.org}
        </h3>
        <span className="font-body text-gray-400 flex-shrink-0" style={{ fontSize: "14px" }}>
          {tx.dateLabel(formattedDate)}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge label={listing.city}    color="green" />
        <Badge label={categoryLabel}   color="green" />
        <Badge label={`×${listing.quantity}`} color="green" />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onFulfill}
          className="inline-flex items-center justify-center bg-evergreen-800 text-white font-display rounded-full px-6 min-h-[48px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
          style={{ fontSize: "16px" }}
        >
          {tx.fulfillBtn}
        </button>
      </div>
    </article>
  );
}

// ─── Fulfilled card ───────────────────────────────────────────────────────────

function FulfilledCard({ listing, lang, tx }: { listing: Listing; lang: Lang; tx: Tx }) {
  const categoryLabel = getCategoryLabel(listing.category, lang);
  const formattedDate = formatDate(listing.date, lang);

  return (
    <article
      className="bg-white border border-evergreen-200 rounded-xl p-6 flex flex-col gap-4 border-l-4 border-l-gray-300 opacity-70"
      aria-label={listing.org}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h3 className="font-display text-evergreen-800" style={{ fontSize: "20px" }}>
          {listing.org}
        </h3>
        <span className="font-body text-gray-400 flex-shrink-0" style={{ fontSize: "14px" }}>
          {tx.dateLabel(formattedDate)}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge label={listing.city}  color="gray" />
        <Badge label={categoryLabel} color="gray" />
        <Badge label={`×${listing.quantity}`} color="gray" />
      </div>
      <p className="font-body text-gray-400 italic" style={{ fontSize: "14px" }}>
        {tx.fulfilledNote}
      </p>
    </article>
  );
}

// ─── Admin top bar ────────────────────────────────────────────────────────────

function AdminTopBar({ tx, lang, onToggleLang, onSignOut }: {
  tx: Tx; lang: Lang; onToggleLang: () => void; onSignOut: () => void;
}) {
  return (
    <header className="w-full bg-evergreen-950 px-8 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="font-display text-white" style={{ fontSize: "20px" }}>TechBridge</span>
        <span
          className="font-body font-semibold text-white bg-evergreen-600 rounded px-2 py-0.5"
          style={{ fontSize: "12px" }}
        >
          {tx.adminBadge}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleLang}
          aria-label={lang === "en" ? tx.langAriaEn : tx.langAriaFr}
          className="text-white font-body text-sm font-medium px-3 rounded hover:bg-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          {lang === "en" ? "EN | FR" : "FR | EN"}
        </button>
        <button
          onClick={onSignOut}
          className="text-white font-body text-sm font-medium px-3 rounded hover:bg-evergreen-800 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 min-h-[48px] flex items-center justify-center"
        >
          {tx.signOut}
        </button>
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const router                = useRouter();
  const { lang, toggleLang }  = useLanguage();
  const tx                    = translations[lang];

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [listings, setListings]           = useState<Listing[]>(ALL_LISTINGS);
  const [activeTab, setActiveTab]         = useState<Tab>("pending");
  const [toasts, setToasts]               = useState<Toast[]>([]);
  const [expandedIds, setExpandedIds]     = useState<Set<number>>(new Set());
  const [rejectingId, setRejectingId]     = useState<number | null>(null);
  const [rejectNotes, setRejectNotes]     = useState("");

  // Auth check
  useEffect(() => {
    const auth = localStorage.getItem("techbridge_admin_auth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  const addToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  function updateStatus(id: number, status: ListingStatus) {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  function handleApprove(id: number) {
    updateStatus(id, "active");
    addToast(tx.toastApproved);
    console.log("Approved listing:", id);
  }

  function handleRejectConfirm(id: number) {
    console.log("Rejected listing:", id, "Reason:", rejectNotes);
    setListings((prev) => prev.filter((l) => l.id !== id));
    setRejectingId(null);
    setRejectNotes("");
  }

  function handleFulfill(id: number) {
    updateStatus(id, "fulfilled");
    console.log("Fulfilled listing:", id);
  }

  function toggleExpand(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  function handleSignOut() {
    localStorage.removeItem("techbridge_admin_auth");
    router.push("/admin/login");
  }

  // Compute tab lists
  const pending   = listings.filter((l) => l.status === "pending");
  const active    = listings.filter((l) => l.status === "active");
  const fulfilled = listings.filter((l) => l.status === "fulfilled");

  // Guard
  if (!authenticated) return null;

  return (
    <div className="bg-evergreen-50 min-h-screen flex flex-col">

      {/* ── Admin top bar ──────────────────────────────────────────────────── */}
      <AdminTopBar
        tx={tx} lang={lang}
        onToggleLang={toggleLang}
        onSignOut={handleSignOut}
      />

      {/* ── Toast notifications ────────────────────────────────────────────── */}
      {toasts.length > 0 && (
        <div className="flex flex-col gap-2 px-8 pt-4" aria-live="polite" aria-atomic="false">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="self-start bg-evergreen-700 text-white font-body rounded-lg px-5 py-3 animate-fade-in-up shadow-sm"
              style={{ fontSize: "16px" }}
              role="status"
            >
              {toast.message}
            </div>
          ))}
        </div>
      )}

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-evergreen-100 px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: tx.statPending,   count: pending.length,               highlight: true },
            { label: tx.statActive,    count: active.length,                highlight: false },
            { label: tx.statFulfilled, count: fulfilled.length,             highlight: false },
            { label: tx.statTotal,     count: listings.length,              highlight: false },
          ].map(({ label, count, highlight }) => (
            <div
              key={label}
              className="bg-evergreen-50 border border-evergreen-100 rounded-lg px-6 py-4 text-center"
            >
              <p
                className={`font-display ${highlight ? "text-amber-700" : "text-evergreen-800"}`}
                style={{ fontSize: "36px", lineHeight: 1 }}
              >
                {count}
              </p>
              <p className="font-body text-evergreen-600 mt-1" style={{ fontSize: "14px" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-evergreen-100 px-8 flex gap-0" role="tablist">
        {(["pending", "active", "fulfilled"] as Tab[]).map((tab) => {
          const labels: Record<Tab, string> = {
            pending:   tx.tabPending,
            active:    tx.tabActive,
            fulfilled: tx.tabFulfilled,
          };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 font-body font-medium px-6 py-4 border-b-[3px] transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-[-3px] ${
                isActive
                  ? "border-evergreen-800 text-evergreen-800"
                  : "border-transparent text-evergreen-500 hover:text-evergreen-700"
              }`}
              style={{ fontSize: "16px" }}
            >
              {labels[tab]}
              {tab === "pending" && pending.length > 0 && (
                <span className="bg-evergreen-600 text-white font-body rounded-full px-2 font-semibold" style={{ fontSize: "12px" }}>
                  {pending.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ────────────────────────────────────────────────────── */}
      <div className="flex-1 px-8 py-6" role="tabpanel">
        <div className="max-w-[860px] mx-auto flex flex-col gap-4">

          {/* Pending */}
          {activeTab === "pending" && (
            pending.length === 0
              ? <p className="font-body text-evergreen-600 text-lg text-center py-12">{tx.emptyPending}</p>
              : pending.map((listing) => (
                <PendingCard
                  key={listing.id}
                  listing={listing}
                  lang={lang}
                  tx={tx}
                  isExpanded={expandedIds.has(listing.id)}
                  isRejecting={rejectingId === listing.id}
                  rejectNotes={rejectingId === listing.id ? rejectNotes : ""}
                  onToggleExpand={() => toggleExpand(listing.id)}
                  onApprove={() => handleApprove(listing.id)}
                  onRejectStart={() => { setRejectingId(listing.id); setRejectNotes(""); }}
                  onRejectConfirm={() => handleRejectConfirm(listing.id)}
                  onRejectCancel={() => { setRejectingId(null); setRejectNotes(""); }}
                  onRejectNotesChange={setRejectNotes}
                />
              ))
          )}

          {/* Active */}
          {activeTab === "active" && (
            active.length === 0
              ? <p className="font-body text-evergreen-600 text-lg text-center py-12">{tx.emptyActive}</p>
              : active.map((listing) => (
                <ActiveCard
                  key={listing.id}
                  listing={listing}
                  lang={lang}
                  tx={tx}
                  onFulfill={() => handleFulfill(listing.id)}
                />
              ))
          )}

          {/* Fulfilled */}
          {activeTab === "fulfilled" && (
            fulfilled.length === 0
              ? <p className="font-body text-evergreen-600 text-lg text-center py-12">{tx.emptyFulfilled}</p>
              : fulfilled.map((listing) => (
                <FulfilledCard key={listing.id} listing={listing} lang={lang} tx={tx} />
              ))
          )}

        </div>
      </div>

    </div>
  );
}
