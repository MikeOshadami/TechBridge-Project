"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DonationItem {
  id: string;
  category: string;
  condition: string;
  quantity: string;
  description: string;
}

interface DonorInfo {
  orgName: string;
  city: string;
  province: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  logistics: string;
  notes: string;
  formatConfirmed: boolean;
}

// ─── Static option lists ──────────────────────────────────────────────────────

const provinces = [
  { value: "AB", en: "Alberta",                   fr: "Alberta" },
  { value: "BC", en: "British Columbia",           fr: "Colombie-Britannique" },
  { value: "MB", en: "Manitoba",                   fr: "Manitoba" },
  { value: "NB", en: "New Brunswick",              fr: "Nouveau-Brunswick" },
  { value: "NL", en: "Newfoundland and Labrador",  fr: "Terre-Neuve-et-Labrador" },
  { value: "NS", en: "Nova Scotia",                fr: "Nouvelle-Écosse" },
  { value: "NT", en: "Northwest Territories",      fr: "Territoires du Nord-Ouest" },
  { value: "NU", en: "Nunavut",                    fr: "Nunavut" },
  { value: "ON", en: "Ontario",                    fr: "Ontario" },
  { value: "PE", en: "Prince Edward Island",       fr: "Île-du-Prince-Édouard" },
  { value: "QC", en: "Quebec",                     fr: "Québec" },
  { value: "SK", en: "Saskatchewan",               fr: "Saskatchewan" },
  { value: "YT", en: "Yukon",                      fr: "Yukon" },
];

const categories = [
  { value: "Computer",  en: "Computer",          fr: "Ordinateur" },
  { value: "Laptop",    en: "Laptop",            fr: "Ordinateur portable" },
  { value: "Monitor",   en: "Monitor",           fr: "Moniteur" },
  { value: "Keyboard",  en: "Keyboard",          fr: "Clavier" },
  { value: "Mouse",     en: "Mouse",             fr: "Souris" },
  { value: "Printer",   en: "Printer",           fr: "Imprimante" },
  { value: "Tablet",    en: "Tablet",            fr: "Tablette" },
  { value: "Phone",     en: "Phone / Smartphone", fr: "Téléphone / Cellulaire" },
  { value: "Cable",     en: "Cables / Accessories", fr: "Câbles / Accessoires" },
  { value: "Other",     en: "Other",             fr: "Autre" },
];

const conditions = [
  { value: "NEW",      en: "New",      fr: "Neuf" },
  { value: "LIKE_NEW", en: "Like New", fr: "Comme neuf" },
  { value: "GOOD",     en: "Good",     fr: "Bon" },
  { value: "FAIR",     en: "Fair",     fr: "Acceptable" },
  { value: "POOR",     en: "Poor",     fr: "Mauvais" },
  { value: "UNUSABLE", en: "Unusable", fr: "Inutilisable" },
];

const logisticsOptions = [
  { value: "pickup",   en: "Pickup only",   fr: "Récupération seulement" },
  { value: "shipping", en: "Shipping only", fr: "Expédition seulement" },
  { value: "both",     en: "Both",          fr: "Les deux" },
];

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    eyebrow:  "Donate Technology",
    heroH1:   "Post a Donation",
    heroBody: "Tell us what you have available. Local nonprofits will contact you directly to arrange collection.",
    reminderHeading: "Before you post",
    reminder:        "All donated devices must be fully formatted and wiped before transfer.",
    // Steps
    steps: ["Item Details", "Your Info", "Review & Submit"],
    // Step 1
    step1Heading:    "What would you like to donate?",
    item:            "Item",
    category:        "Category",
    categoryPlaceholder: "Select a category",
    condition:       "Condition",
    conditionPlaceholder: "Select condition",
    quantity:        "Quantity",
    description:     "Description (optional)",
    descPlaceholder: "e.g. Dell Latitude, Windows 11, 16GB RAM",
    addItem:         "+ Add another item",
    removeItem:      "Remove",
    nextBtn:         (n: number) => n === 1 ? "Continue (1 item)" : `Continue (${n} items)`,
    // Step 2
    step2Heading:    "Your contact details",
    orgName:         "Organization or Donor Name",
    city:            "City",
    province:        "Province",
    provincePlaceholder: "Select a province",
    contactName:     "Contact Name",
    contactEmail:    "Contact Email",
    contactPhone:    "Contact Phone",
    logistics:       "Pickup / Shipping preference",
    notes:           "Additional notes (optional)",
    notesPlaceholder: "Any other details that would help an organization.",
    // Step 3
    step3Heading:    "Review your donation",
    sectionItems:    "Items to donate",
    sectionDonor:    "Your details",
    formatConfirmLabel: "I confirm that all devices being donated have been fully formatted and all personal data wiped.",
    submitBtn:       "Submit Donation Offer",
    // Nav
    back: "← Back",
    // Validation
    errorItems:    "Please complete all required item fields before continuing.",
    errorDonor:    "Please fill in all required fields before continuing.",
    errorConfirm:  "Please confirm that all devices have been formatted before submitting.",
    // Summary labels
    sumCategory:   "Category",
    sumCondition:  "Condition",
    sumQty:        "Quantity",
    sumDesc:       "Description",
    sumOrgName:    "Donor / Organization",
    sumCity:       "City",
    sumProvince:   "Province",
    sumContact:    "Contact",
    sumEmail:      "Email",
    sumPhone:      "Phone",
    sumLogistics:  "Logistics",
    sumNotes:      "Notes",
    none:          "None",
    // Success
    successH1:   "Donation Posted!",
    successBody: "Thank you. Local organizations can now see your offer and will contact you directly using the information you provided.",
    successBtn:  "Back to Home",
  },
  fr: {
    eyebrow:  "Donner de la technologie",
    heroH1:   "Publier un don",
    heroBody: "Dites-nous ce que vous avez disponible. Les organismes locaux vous contacteront directement pour organiser la collecte.",
    reminderHeading: "Avant de publier",
    reminder:        "Tous les appareils donnés doivent être complètement formatés et effacés avant le transfert.",
    // Steps
    steps: ["Détails des articles", "Vos coordonnées", "Réviser et soumettre"],
    // Step 1
    step1Heading:    "Que souhaitez-vous donner?",
    item:            "Article",
    category:        "Catégorie",
    categoryPlaceholder: "Choisir une catégorie",
    condition:       "État",
    conditionPlaceholder: "Choisir l'état",
    quantity:        "Quantité",
    description:     "Description (facultatif)",
    descPlaceholder: "ex. Dell Latitude, Windows 11, 16 Go RAM",
    addItem:         "+ Ajouter un autre article",
    removeItem:      "Supprimer",
    nextBtn:         (n: number) => n === 1 ? "Continuer (1 article)" : `Continuer (${n} articles)`,
    // Step 2
    step2Heading:    "Vos coordonnées",
    orgName:         "Nom de l'organisation ou du donateur",
    city:            "Ville",
    province:        "Province",
    provincePlaceholder: "Choisir une province",
    contactName:     "Nom du contact",
    contactEmail:    "Courriel de contact",
    contactPhone:    "Téléphone de contact",
    logistics:       "Préférence récupération / expédition",
    notes:           "Notes supplémentaires (facultatif)",
    notesPlaceholder: "Tout autre détail qui aiderait une organisation.",
    // Step 3
    step3Heading:    "Vérifiez votre don",
    sectionItems:    "Articles à donner",
    sectionDonor:    "Vos coordonnées",
    formatConfirmLabel: "Je confirme que tous les appareils donnés ont été complètement formatés et toutes les données personnelles effacées.",
    submitBtn:       "Soumettre l'offre de don",
    // Nav
    back: "← Retour",
    // Validation
    errorItems:   "Veuillez compléter tous les champs obligatoires avant de continuer.",
    errorDonor:   "Veuillez remplir tous les champs obligatoires avant de continuer.",
    errorConfirm: "Veuillez confirmer que tous les appareils ont été formatés avant de soumettre.",
    // Summary labels
    sumCategory:   "Catégorie",
    sumCondition:  "État",
    sumQty:        "Quantité",
    sumDesc:       "Description",
    sumOrgName:    "Donateur / Organisation",
    sumCity:       "Ville",
    sumProvince:   "Province",
    sumContact:    "Contact",
    sumEmail:      "Courriel",
    sumPhone:      "Téléphone",
    sumLogistics:  "Logistique",
    sumNotes:      "Notes",
    none:          "Aucun",
    // Success
    successH1:   "Don publié!",
    successBody: "Merci. Les organisations locales peuvent maintenant voir votre offre et vous contacteront directement.",
    successBtn:  "Retour à l'accueil",
  },
} as const;

type Tx = (typeof translations)[Lang];

function getLabel<T extends { value: string; en: string; fr: string }>(
  list: T[],
  value: string,
  lang: Lang
): string {
  return list.find((o) => o.value === value)?.[lang] ?? value;
}

function makeItem(): DonationItem {
  return { id: Math.random().toString(36).slice(2), category: "", condition: "", quantity: "1", description: "" };
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputClass =
  "w-full bg-white border border-evergreen-200 rounded-xl px-4 font-body text-evergreen-900 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0 placeholder:text-evergreen-400 transition-colors hover:border-evergreen-400";

const selectClass =
  "w-full appearance-none bg-white border border-evergreen-200 rounded-xl px-4 font-body text-evergreen-900 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0 transition-colors hover:border-evergreen-400 cursor-pointer pr-10";

const labelClass = "font-body text-xs font-semibold text-evergreen-600 mb-1.5 block tracking-wide uppercase";

/** Wraps a <select> to give it a consistent height and custom chevron arrow */
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

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-harvest ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, tx }: { current: number; tx: Tx }) {
  return (
    <div className="w-full max-w-lg mx-auto mb-10" aria-label="Form progress">
      <div className="relative flex items-center w-full mb-3">
        <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 h-0.5 bg-evergreen-100" aria-hidden="true" />
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 h-0.5 bg-harvest transition-all duration-500"
          style={{ width: `${((current - 1) / 2) * 84}%` }}
          aria-hidden="true"
        />
        {[1, 2, 3].map((n) => {
          const active = n === current;
          const done   = n < current;
          return (
            <div key={n} className="flex-1 flex justify-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  done  ? "bg-harvest border-harvest"
                  : active ? "bg-white border-harvest shadow-md"
                  : "bg-white border-evergreen-200"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {done ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 9.5L7.5 13L14 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className={`font-display text-base leading-none ${active ? "text-harvest" : "text-evergreen-300"}`}>
                    {n}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        {tx.steps.map((label, i) => (
          <span
            key={i}
            className={`font-body text-xs text-center leading-tight flex-1 ${
              i + 1 === current ? "text-harvest font-semibold"
              : i + 1 < current ? "text-evergreen-600"
              : "text-evergreen-300"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Step 1 — Item list ───────────────────────────────────────────────────────

function ItemCard({
  item,
  index,
  total,
  onChange,
  onRemove,
  tx,
  lang,
}: {
  item: DonationItem;
  index: number;
  total: number;
  onChange: (id: string, field: keyof DonationItem, value: string) => void;
  onRemove: (id: string) => void;
  tx: Tx;
  lang: Lang;
}) {
  return (
    <div className="relative bg-evergreen-50/50 rounded-2xl border border-evergreen-100 px-5 pt-5 pb-6">
      {/* Item header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-harvest text-white flex items-center justify-center flex-shrink-0">
            <span className="font-display text-sm leading-none">{index + 1}</span>
          </div>
          <span className="font-display text-evergreen-700 text-base">
            {tx.item} {index + 1}
          </span>
        </div>
        {total > 1 && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`${tx.removeItem} item ${index + 1}`}
            className="flex items-center gap-1 text-sm font-body text-evergreen-400 hover:text-red-500 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 rounded px-1 min-h-0 min-w-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            {tx.removeItem}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {/* Category */}
        <Field id={`cat-${item.id}`} label={tx.category} required>
          <SelectWrap>
            <select
              id={`cat-${item.id}`}
              required
              aria-required="true"
              value={item.category}
              onChange={(e) => onChange(item.id, "category", e.target.value)}
              className={selectClass}
              style={{ height: "48px" }}
            >
              <option value="">{tx.categoryPlaceholder}</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c[lang]}</option>
              ))}
            </select>
          </SelectWrap>
        </Field>

        {/* Condition + Quantity side by side */}
        <div className="grid grid-cols-2 gap-4">
          <Field id={`cond-${item.id}`} label={tx.condition} required>
            <SelectWrap>
            <select
              id={`cond-${item.id}`}
              required
              aria-required="true"
              value={item.condition}
              onChange={(e) => onChange(item.id, "condition", e.target.value)}
              className={selectClass}
              style={{ height: "48px" }}
            >
              <option value="">{tx.conditionPlaceholder}</option>
              {conditions.map((c) => (
                <option key={c.value} value={c.value}>{c[lang]}</option>
              ))}
            </select>
            </SelectWrap>
          </Field>

          <Field id={`qty-${item.id}`} label={tx.quantity} required>
            <input
              id={`qty-${item.id}`}
              type="number"
              required
              aria-required="true"
              min={1}
              value={item.quantity}
              onChange={(e) => onChange(item.id, "quantity", e.target.value)}
              className={inputClass}
              style={{ height: "48px" }}
            />
          </Field>
        </div>

        {/* Description */}
        <Field id={`desc-${item.id}`} label={tx.description}>
          <input
            id={`desc-${item.id}`}
            type="text"
            placeholder={tx.descPlaceholder}
            value={item.description}
            onChange={(e) => onChange(item.id, "description", e.target.value)}
            className={inputClass}
            style={{ height: "48px" }}
          />
        </Field>
      </div>
    </div>
  );
}

function StepOne({
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
  tx,
  lang,
}: {
  items: DonationItem[];
  onItemChange: (id: string, field: keyof DonationItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  tx: Tx;
  lang: Lang;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="pb-4 mb-1 border-b border-evergreen-100">
        <h2 className="font-display text-evergreen-800 text-xl">{tx.step1Heading}</h2>
      </div>

      {items.map((item, i) => (
        <ItemCard
          key={item.id}
          item={item}
          index={i}
          total={items.length}
          onChange={onItemChange}
          onRemove={onRemoveItem}
          tx={tx}
          lang={lang}
        />
      ))}

      {/* Add item button */}
      <button
        type="button"
        onClick={onAddItem}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-evergreen-200 rounded-2xl py-4 font-body text-sm font-semibold text-evergreen-600 hover:border-harvest hover:text-harvest hover:bg-harvest/5 transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 min-h-0"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {tx.addItem}
      </button>
    </div>
  );
}

// ─── Step 2 — Donor info ──────────────────────────────────────────────────────

function StepTwo({
  donor,
  onChange,
  tx,
  lang,
}: {
  donor: DonorInfo;
  onChange: (field: keyof DonorInfo, value: string | boolean) => void;
  tx: Tx;
  lang: Lang;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="pb-4 mb-1 border-b border-evergreen-100">
        <h2 className="font-display text-evergreen-800 text-xl">{tx.step2Heading}</h2>
      </div>

      <Field id="orgName" label={tx.orgName} required>
        <input
          id="orgName" type="text" required aria-required="true"
          value={donor.orgName}
          onChange={(e) => onChange("orgName", e.target.value)}
          className={inputClass}
          style={{ height: "48px" }}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="city" label={tx.city} required>
          <input
            id="city" type="text" required aria-required="true"
            value={donor.city}
            onChange={(e) => onChange("city", e.target.value)}
            className={inputClass}
            style={{ height: "48px" }}
          />
        </Field>
        <Field id="province" label={tx.province} required>
          <SelectWrap>
            <select
              id="province" required aria-required="true"
              value={donor.province}
              onChange={(e) => onChange("province", e.target.value)}
              className={selectClass}
              style={{ height: "48px" }}
            >
              <option value="">{tx.provincePlaceholder}</option>
              {provinces.map((p) => (
                <option key={p.value} value={p.value}>{p[lang]}</option>
              ))}
            </select>
          </SelectWrap>
        </Field>
      </div>

      <Field id="contactName" label={tx.contactName} required>
        <input
          id="contactName" type="text" required aria-required="true"
          value={donor.contactName}
          onChange={(e) => onChange("contactName", e.target.value)}
          className={inputClass}
          style={{ height: "48px" }}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="contactEmail" label={tx.contactEmail} required>
          <input
            id="contactEmail" type="email" required aria-required="true"
            value={donor.contactEmail}
            onChange={(e) => onChange("contactEmail", e.target.value)}
            className={inputClass}
            style={{ height: "48px" }}
          />
        </Field>
        <Field id="contactPhone" label={tx.contactPhone} required>
          <input
            id="contactPhone" type="tel" required aria-required="true"
            value={donor.contactPhone}
            onChange={(e) => onChange("contactPhone", e.target.value)}
            className={inputClass}
            style={{ height: "48px" }}
          />
        </Field>
      </div>

      {/* Logistics */}
      <fieldset className="flex flex-col gap-1">
        <legend className={labelClass}>
          {tx.logistics}
          <span className="text-harvest ml-1" aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-col gap-2 mt-1">
          {logisticsOptions.map((o) => (
            <label
              key={o.value}
              className={`flex items-center gap-3 cursor-pointer font-body text-sm text-evergreen-900 rounded-xl px-4 py-3 border-2 transition-all ${
                donor.logistics === o.value
                  ? "border-harvest bg-harvest/5"
                  : "border-evergreen-100 hover:border-evergreen-300"
              }`}
            >
              <input
                type="radio" name="logistics" value={o.value} required
                checked={donor.logistics === o.value}
                onChange={() => onChange("logistics", o.value)}
                className="w-4 h-4 accent-harvest flex-shrink-0"
              />
              {o[lang]}
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="notes" label={tx.notes}>
        <textarea
          id="notes" rows={3}
          placeholder={tx.notesPlaceholder}
          value={donor.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          className={`${inputClass} py-3`}
        />
      </Field>
    </div>
  );
}

// ─── Step 3 — Review & Confirm ────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-2.5 border-b border-evergreen-50 last:border-b-0">
      <dt className="font-body text-xs font-semibold uppercase tracking-wide text-evergreen-400 sm:w-36 flex-shrink-0 mb-0.5 sm:mb-0">
        {label}
      </dt>
      <dd className="font-body text-sm text-evergreen-900">{value}</dd>
    </div>
  );
}

function StepThree({
  items,
  donor,
  onConfirmChange,
  tx,
  lang,
}: {
  items: DonationItem[];
  donor: DonorInfo;
  onConfirmChange: (v: boolean) => void;
  tx: Tx;
  lang: Lang;
}) {
  return (
    <div className="flex flex-col gap-7">
      <div className="pb-4 mb-1 border-b border-evergreen-100">
        <h2 className="font-display text-evergreen-800 text-xl">{tx.step3Heading}</h2>
      </div>

      {/* Items */}
      <div>
        <p className="font-display text-evergreen-600 text-sm mb-3">{tx.sectionItems}</p>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={item.id} className="rounded-xl border border-evergreen-100 overflow-hidden">
              <div className="flex items-center gap-2.5 px-4 py-2.5 bg-evergreen-50 border-b border-evergreen-100">
                <div className="w-5 h-5 rounded-full bg-harvest text-white flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xs leading-none">{i + 1}</span>
                </div>
                <span className="font-display text-evergreen-700 text-sm">{tx.item} {i + 1}</span>
              </div>
              <div className="px-4 py-2">
                <dl>
                  <SummaryRow label={tx.sumCategory}  value={getLabel(categories, item.category, lang)} />
                  <SummaryRow label={tx.sumCondition}  value={getLabel(conditions, item.condition, lang)} />
                  <SummaryRow label={tx.sumQty}        value={item.quantity} />
                  <SummaryRow label={tx.sumDesc}       value={item.description || tx.none} />
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donor info */}
      <div>
        <p className="font-display text-evergreen-600 text-sm mb-3">{tx.sectionDonor}</p>
        <div className="rounded-xl border border-evergreen-100 px-4 py-2">
          <dl>
            <SummaryRow label={tx.sumOrgName}   value={donor.orgName} />
            <SummaryRow label={tx.sumCity}       value={donor.city} />
            <SummaryRow label={tx.sumProvince}   value={getLabel(provinces, donor.province, lang)} />
            <SummaryRow label={tx.sumContact}    value={donor.contactName} />
            <SummaryRow label={tx.sumEmail}      value={donor.contactEmail} />
            <SummaryRow label={tx.sumPhone}      value={donor.contactPhone} />
            <SummaryRow label={tx.sumLogistics}  value={getLabel(logisticsOptions, donor.logistics, lang)} />
            <SummaryRow label={tx.sumNotes}      value={donor.notes || tx.none} />
          </dl>
        </div>
      </div>

      {/* Format confirmation */}
      <label className="flex items-start gap-4 cursor-pointer group rounded-xl border-2 border-evergreen-100 hover:border-harvest/40 p-4 transition-all">
        <input
          type="checkbox"
          id="formatConfirmed"
          required
          aria-required="true"
          checked={donor.formatConfirmed}
          onChange={(e) => onConfirmChange(e.target.checked)}
          className="flex-shrink-0 accent-harvest focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800"
          style={{ width: "20px", height: "20px", marginTop: "2px" }}
        />
        <span className="font-body text-base text-evergreen-900 leading-relaxed">
          {tx.formatConfirmLabel}
        </span>
      </label>
    </div>
  );
}

// ─── Success ──────────────────────────────────────────────────────────────────

function SuccessScreen({ tx }: { tx: Tx }) {
  return (
    <div className="bg-evergreen-50 min-h-screen flex flex-col items-center justify-center text-center gap-8 py-20 px-6">
      <div className="w-24 h-24 rounded-full bg-harvest/10 flex items-center justify-center" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" stroke="#c8892a" strokeWidth="2" strokeOpacity="0.3" />
          <path d="M14 24.5L21 31.5L34 16" stroke="#c8892a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <h1 className="font-display text-evergreen-800 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)" }}>
          {tx.successH1}
        </h1>
        <p className="font-body text-evergreen-700 text-lg max-w-[520px] leading-relaxed">
          {tx.successBody}
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-harvest text-white font-body font-semibold text-base rounded-full px-8 min-h-[52px] hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2"
      >
        {tx.successBtn}
      </Link>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const INITIAL_DONOR: DonorInfo = {
  orgName: "", city: "", province: "NB",
  contactName: "", contactEmail: "", contactPhone: "",
  logistics: "", notes: "", formatConfirmed: false,
};

export default function OfferPage() {
  const { lang } = useLanguage();
  const tx = translations[lang];

  const [step,      setStep]      = useState(1);
  const [items,     setItems]     = useState<DonationItem[]>([makeItem()]);
  const [donor,     setDonor]     = useState<DonorInfo>(INITIAL_DONOR);
  const [error,     setError]     = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // ── Item handlers ─────────────────────────────────────────────────────────

  function handleItemChange(id: string, field: keyof DonationItem, value: string) {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, [field]: value } : item));
    setError(null);
  }

  function handleAddItem() {
    setItems((prev) => [...prev, makeItem()]);
  }

  function handleRemoveItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  // ── Donor handlers ────────────────────────────────────────────────────────

  function handleDonorChange(field: keyof DonorInfo, value: string | boolean) {
    setDonor((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  // ── Validation ────────────────────────────────────────────────────────────

  function validateItems(): boolean {
    return items.every((item) => item.category && item.condition && Number(item.quantity) >= 1);
  }

  function validateDonor(): boolean {
    const { orgName, city, province, contactName, contactEmail, contactPhone, logistics } = donor;
    return !!(orgName && city && province && contactName && contactEmail && contactPhone && logistics);
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  function handleNext() {
    if (step === 1) {
      if (!validateItems()) { setError(tx.errorItems); return; }
    } else if (step === 2) {
      if (!validateDonor()) { setError(tx.errorDonor); return; }
    }
    setError(null);
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setError(null);
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit() {
    if (!donor.formatConfirmed) { setError(tx.errorConfirm); return; }
    console.log("TechBridge donation offer:", { items, donor });
    setSubmitted(true);
  }

  if (submitted) return <SuccessScreen tx={tx} />;

  return (
    <div className="bg-evergreen-50 min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-evergreen-800 w-full px-6 py-14 flex flex-col items-center text-center" aria-labelledby="offer-h1">
        <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 font-body text-sm font-medium px-4 py-1.5 rounded-full mb-5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1.5L8.5 5H12L9.25 7.25L10.25 11L7 9L3.75 11L4.75 7.25L2 5H5.5L7 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          {tx.eyebrow}
        </span>
        <h1 id="offer-h1" className="font-display text-white mb-4 leading-tight" style={{ fontSize: "clamp(1.875rem, 5vw, 2.5rem)" }}>
          {tx.heroH1}
        </h1>
        <p className="font-body text-evergreen-200 max-w-[540px] leading-relaxed text-lg">
          {tx.heroBody}
        </p>
      </section>

      {/* ── Format reminder ───────────────────────────────────────────────── */}
      <div className="w-full px-6 py-4 flex justify-center" style={{ background: "#FEF7ED", borderBottom: "2px solid #c8892a" }} role="note">
        <div className="flex items-start gap-3 max-w-[700px] w-full">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
            <path d="M10 2L18 16H2L10 2Z" stroke="#c8892a" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M10 8v4M10 14.5v.5" stroke="#c8892a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div>
            <p className="font-body font-semibold text-sm" style={{ color: "#7d5216" }}>{tx.reminderHeading}</p>
            <p className="font-body text-sm" style={{ color: "#a06e1c" }}>{tx.reminder}</p>
          </div>
        </div>
      </div>

      {/* ── Form area ─────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        <StepIndicator current={step} tx={tx} />

        {/* Error banner */}
        {error && (
          <div role="alert" className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 font-body text-sm rounded-xl px-4 py-3 mb-8">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="9" cy="9" r="8" stroke="#b91c1c" strokeWidth="1.5"/>
              <path d="M9 5v5M9 12.5v.5" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-evergreen-100 shadow-card px-6 py-8 md:px-10 md:py-10">
          {step === 1 && (
            <StepOne
              items={items}
              onItemChange={handleItemChange}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              tx={tx}
              lang={lang}
            />
          )}
          {step === 2 && (
            <StepTwo donor={donor} onChange={handleDonorChange} tx={tx} lang={lang} />
          )}
          {step === 3 && (
            <StepThree
              items={items}
              donor={donor}
              onConfirmChange={(v) => handleDonorChange("formatConfirmed", v)}
              tx={tx}
              lang={lang}
            />
          )}
        </div>

        {/* Navigation */}
        <div className={`flex mt-6 gap-3 ${step > 1 ? "justify-between" : "justify-end"}`}>
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center bg-white border-2 border-evergreen-200 text-evergreen-800 font-body font-semibold text-base rounded-full px-7 min-h-[48px] hover:bg-evergreen-50 hover:border-evergreen-300 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
            >
              {tx.back}
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center bg-harvest text-white font-body font-semibold text-base rounded-full px-8 min-h-[48px] hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2"
            >
              {step === 1 ? tx.nextBtn(items.length) : "Continue →"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!donor.formatConfirmed}
              aria-disabled={!donor.formatConfirmed}
              className={`inline-flex items-center justify-center font-body font-semibold text-base rounded-full px-8 min-h-[52px] transition-all ${
                donor.formatConfirmed
                  ? "bg-harvest text-white hover:bg-harvest-600 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2"
                  : "bg-evergreen-200 text-evergreen-400 cursor-not-allowed"
              }`}
            >
              {tx.submitBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
