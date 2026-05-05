"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OfferFormData {
  orgName: string;
  city: string;
  province: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  itemDescription: string;
  quantity: string;
  condition: string;
  logistics: string;
  notes: string;
  formatConfirmed: boolean;
}

const INITIAL_FORM: OfferFormData = {
  orgName: "",
  city: "",
  province: "NB",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  category: "",
  itemDescription: "",
  quantity: "1",
  condition: "",
  logistics: "",
  notes: "",
  formatConfirmed: false,
};

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
  { value: "Computer",  en: "Computer",   fr: "Ordinateur" },
  { value: "Laptop",    en: "Laptop",     fr: "Ordinateur portable" },
  { value: "Monitor",   en: "Monitor",    fr: "Moniteur" },
  { value: "Keyboard",  en: "Keyboard",   fr: "Clavier" },
  { value: "Mouse",     en: "Mouse",      fr: "Souris" },
  { value: "Printer",   en: "Printer",    fr: "Imprimante" },
  { value: "Tablet",    en: "Tablet",     fr: "Tablette" },
  { value: "Other",     en: "Other",      fr: "Autre" },
];

const conditions = [
  { value: "good",        en: "Good",        fr: "Bon" },
  { value: "fair",        en: "Fair",        fr: "Acceptable" },
  { value: "refurbished", en: "Refurbished", fr: "Remis à neuf" },
];

const logisticsOptions = [
  { value: "pickup",   en: "Pickup only",      fr: "Récupération seulement" },
  { value: "shipping", en: "Shipping only",    fr: "Expédition seulement" },
  { value: "both",     en: "Both",             fr: "Les deux" },
];

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    hero: {
      h1: "Post a Donation",
      body: "Let local nonprofits and civic organizations know what technology you have available to donate.",
    },
    reminder: "⚠ Reminder: All donated devices must be fully formatted and wiped before transfer.",
    // Donor org fields
    orgName:      "Your Organization Name",
    city:         "City",
    province:     "Province",
    provincePlaceholder: "Select a province",
    contactName:  "Contact Name",
    contactEmail: "Contact Email",
    contactPhone: "Contact Phone",
    // Tech fields
    techSectionHeading: "About the Technology",
    category:           "Category",
    categoryPlaceholder: "Select a category",
    itemDescription:    "Describe what you are donating",
    itemDescPlaceholder: "e.g. 5 Dell laptops, Windows 11, 16GB RAM, fully formatted",
    quantity:           "Quantity Available",
    condition:          "Condition",
    conditionPlaceholder: "Select condition",
    logistics:          "Can you offer pickup, shipping, or both?",
    notes:              "Additional notes (optional)",
    // Confirmation
    formatConfirmLabel: "I confirm that all devices being donated have been fully formatted and wiped of all data.",
    submitBtn:          "Submit Donation Offer",
    // Success
    successH1:   "Donation Posted!",
    successBody: "Thank you. Local organizations can now see what you have available. They will contact you directly using the information you provided.",
    successBtn:  "Back to Home",
    // Validation
    errorRequired: "Please fill in all required fields before submitting.",
    errorConfirm:  "Please confirm that all devices have been formatted before submitting.",
  },
  fr: {
    hero: {
      h1: "Publier un don",
      body: "Faites savoir aux organismes locaux quelle technologie vous avez disponible à donner.",
    },
    reminder: "⚠ Rappel: Tous les appareils donnés doivent être complètement formatés et effacés avant le transfert.",
    // Donor org fields
    orgName:      "Nom de votre organisation",
    city:         "Ville",
    province:     "Province",
    provincePlaceholder: "Choisir une province",
    contactName:  "Nom du contact",
    contactEmail: "Courriel de contact",
    contactPhone: "Téléphone de contact",
    // Tech fields
    techSectionHeading: "À propos de la technologie",
    category:           "Catégorie",
    categoryPlaceholder: "Choisir une catégorie",
    itemDescription:    "Décrivez ce que vous donnez",
    itemDescPlaceholder: "ex. 5 ordinateurs portables Dell, Windows 11, 16 Go RAM, entièrement formatés",
    quantity:           "Quantité disponible",
    condition:          "État",
    conditionPlaceholder: "Choisir l'état",
    logistics:          "Pouvez-vous offrir la récupération, l'expédition ou les deux?",
    notes:              "Notes supplémentaires (facultatif)",
    // Confirmation
    formatConfirmLabel: "Je confirme que tous les appareils donnés ont été complètement formatés et effacés de toutes les données.",
    submitBtn:          "Soumettre l'offre de don",
    // Success
    successH1:   "Don publié!",
    successBody: "Merci. Les organisations locales peuvent maintenant voir ce que vous avez disponible. Elles vous contacteront directement.",
    successBtn:  "Retour à l'accueil",
    // Validation
    errorRequired: "Veuillez remplir tous les champs obligatoires avant de soumettre.",
    errorConfirm:  "Veuillez confirmer que tous les appareils ont été formatés avant de soumettre.",
  },
} as const;

type Tx = (typeof translations)[Lang];

// ─── Shared field components ──────────────────────────────────────────────────

const inputClass =
  "w-full bg-white border border-evergreen-800 rounded-lg px-3 py-3 font-body text-evergreen-900 text-lg focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0 placeholder:text-evergreen-400";

const labelClass = "font-body text-base font-medium text-evergreen-800 mb-1 block";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ tx }: { tx: Tx }) {
  return (
    <div className="flex flex-col items-center text-center gap-8 py-20 px-6">
      <div
        className="w-24 h-24 rounded-full bg-evergreen-100 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10 25L20 35L38 13" stroke="#49836b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="font-display text-evergreen-800" style={{ fontSize: "40px" }}>
        {tx.successH1}
      </h1>
      <p className="font-body text-evergreen-900 text-lg max-w-[520px] leading-relaxed">
        {tx.successBody}
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-evergreen-800 text-white font-display rounded-full px-8 min-h-[56px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
        style={{ fontSize: "20px" }}
      >
        {tx.successBtn}
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OfferPage() {
  const { lang } = useLanguage();
  const tx = translations[lang];

  const [formData, setFormData] = useState<OfferFormData>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof OfferFormData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  function validate(): boolean {
    const required: (keyof OfferFormData)[] = [
      "orgName", "city", "province", "contactName", "contactEmail",
      "contactPhone", "category", "itemDescription", "quantity",
      "condition", "logistics",
    ];
    return required.every((k) => String(formData[k]).trim() !== "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      setError(tx.errorRequired);
      return;
    }
    if (!formData.formatConfirmed) {
      setError(tx.errorConfirm);
      return;
    }
    console.log("TechBridge donation offer:", formData);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-evergreen-50 min-h-screen">
        <SuccessScreen tx={tx} />
      </div>
    );
  }

  const canSubmit = formData.formatConfirmed;

  return (
    <div className="bg-evergreen-50 min-h-screen">

      {/* ── SECTION 1: Hero ──────────────────────────────────────────────── */}
      <section
        className="bg-evergreen-800 w-full px-6 py-16 flex flex-col items-center text-center"
        aria-labelledby="offer-h1"
      >
        <h1
          id="offer-h1"
          className="font-display text-white mb-5 leading-tight"
          style={{ fontSize: "40px" }}
        >
          {tx.hero.h1}
        </h1>
        <p
          className="font-body text-white max-w-[560px] leading-relaxed"
          style={{ fontSize: "20px" }}
        >
          {tx.hero.body}
        </p>
      </section>

      {/* ── SECTION 2: Format reminder bar ───────────────────────────────── */}
      <div
        className="w-full px-6 py-4 flex justify-center"
        style={{
          background: "#FEF2F2",
          borderBottom: "2px solid #8B1A1A",
        }}
        role="note"
        aria-label={lang === "en" ? "Format reminder" : "Rappel de formatage"}
      >
        <p
          className="font-body text-center max-w-[700px]"
          style={{ color: "#8B1A1A", fontSize: "16px" }}
        >
          {tx.reminder}
        </p>
      </div>

      {/* ── SECTION 3: Donation form ──────────────────────────────────────── */}
      <section className="w-full px-6 py-14 flex justify-center">
        <div className="max-w-[700px] w-full bg-white rounded-2xl border border-evergreen-100 shadow-sm px-8 py-12 md:px-12">

          {/* Error banner */}
          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-300 text-red-800 font-body text-base rounded-lg px-4 py-3 mb-8"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

            {/* ── Donor organization ──────────────────────────────────── */}
            <Field id="orgName" label={`${tx.orgName} *`}>
              <input
                id="orgName"
                type="text"
                required
                aria-required="true"
                value={formData.orgName}
                onChange={(e) => handleChange("orgName", e.target.value)}
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field id="city" label={`${tx.city} *`}>
                <input
                  id="city"
                  type="text"
                  required
                  aria-required="true"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field id="province" label={`${tx.province} *`}>
                <select
                  id="province"
                  required
                  aria-required="true"
                  value={formData.province}
                  onChange={(e) => handleChange("province", e.target.value)}
                  className={inputClass}
                >
                  <option value="">{tx.provincePlaceholder}</option>
                  {provinces.map((p) => (
                    <option key={p.value} value={p.value}>{p[lang]}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field id="contactName" label={`${tx.contactName} *`}>
              <input
                id="contactName"
                type="text"
                required
                aria-required="true"
                value={formData.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field id="contactEmail" label={`${tx.contactEmail} *`}>
                <input
                  id="contactEmail"
                  type="email"
                  required
                  aria-required="true"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field id="contactPhone" label={`${tx.contactPhone} *`}>
                <input
                  id="contactPhone"
                  type="tel"
                  required
                  aria-required="true"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            {/* ── About the technology ─────────────────────────────────── */}
            <div className="border-t border-evergreen-100 pt-6 mt-2">
              <h2
                className="font-display text-evergreen-800 mb-6"
                style={{ fontSize: "22px" }}
              >
                {tx.techSectionHeading}
              </h2>

              <div className="flex flex-col gap-6">
                <Field id="category" label={`${tx.category} *`}>
                  <select
                    id="category"
                    required
                    aria-required="true"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">{tx.categoryPlaceholder}</option>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c[lang]}</option>
                    ))}
                  </select>
                </Field>

                <Field id="itemDescription" label={`${tx.itemDescription} *`}>
                  <textarea
                    id="itemDescription"
                    rows={3}
                    required
                    aria-required="true"
                    placeholder={tx.itemDescPlaceholder}
                    value={formData.itemDescription}
                    onChange={(e) => handleChange("itemDescription", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field id="quantity" label={`${tx.quantity} *`}>
                    <input
                      id="quantity"
                      type="number"
                      required
                      aria-required="true"
                      min={1}
                      value={formData.quantity}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field id="condition" label={`${tx.condition} *`}>
                    <select
                      id="condition"
                      required
                      aria-required="true"
                      value={formData.condition}
                      onChange={(e) => handleChange("condition", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">{tx.conditionPlaceholder}</option>
                      {conditions.map((c) => (
                        <option key={c.value} value={c.value}>{c[lang]}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Logistics radio group */}
                <fieldset className="flex flex-col gap-3">
                  <legend className={`${labelClass} mb-0`}>
                    {tx.logistics} *
                  </legend>
                  {logisticsOptions.map((o) => (
                    <label
                      key={o.value}
                      className="flex items-center gap-3 cursor-pointer font-body text-lg text-evergreen-900 min-h-[48px]"
                    >
                      <input
                        type="radio"
                        name="logistics"
                        value={o.value}
                        required
                        checked={formData.logistics === o.value}
                        onChange={() => handleChange("logistics", o.value)}
                        className="w-5 h-5 accent-evergreen-800 flex-shrink-0"
                      />
                      {o[lang]}
                    </label>
                  ))}
                </fieldset>

                <Field id="notes" label={tx.notes}>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

            {/* ── Format confirmation checkbox ─────────────────────────── */}
            <div className="border-t border-evergreen-100 pt-6 mt-2">
              <label className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  id="formatConfirmed"
                  checked={formData.formatConfirmed}
                  onChange={(e) => handleChange("formatConfirmed", e.target.checked)}
                  className="flex-shrink-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 accent-evergreen-800"
                  style={{ width: "24px", height: "24px", marginTop: "2px" }}
                />
                <span className="font-body text-lg text-evergreen-800 leading-relaxed group-hover:text-evergreen-700">
                  {tx.formatConfirmLabel}
                </span>
              </label>
            </div>

            {/* ── Submit button ────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
              className={`w-full inline-flex items-center justify-center text-white font-display rounded-full min-h-[56px] transition-all ${
                canSubmit
                  ? "bg-evergreen-800 hover:bg-evergreen-700 cursor-pointer focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
                  : "bg-evergreen-800 opacity-40 cursor-not-allowed"
              }`}
              style={{ fontSize: "20px" }}
            >
              {tx.submitBtn}
            </button>

          </form>
        </div>
      </section>

    </div>
  );
}
