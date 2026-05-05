"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1
  orgName: string;
  orgType: string;
  city: string;
  province: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  // Step 2
  techCategory: string;
  itemDescription: string;
  quantity: string;
  minSpecs: string;
  intendedUse: string;
  contactMethod: string;
  // Step 3
  confirmed: boolean;
}

const INITIAL_FORM: FormData = {
  orgName: "",
  orgType: "",
  city: "Moncton",
  province: "NB",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  techCategory: "",
  itemDescription: "",
  quantity: "1",
  minSpecs: "",
  intendedUse: "",
  contactMethod: "",
  confirmed: false,
};

// ─── Static option lists ──────────────────────────────────────────────────────

const provinces = [
  { value: "AB", en: "Alberta",                    fr: "Alberta" },
  { value: "BC", en: "British Columbia",            fr: "Colombie-Britannique" },
  { value: "MB", en: "Manitoba",                    fr: "Manitoba" },
  { value: "NB", en: "New Brunswick",               fr: "Nouveau-Brunswick" },
  { value: "NL", en: "Newfoundland and Labrador",   fr: "Terre-Neuve-et-Labrador" },
  { value: "NS", en: "Nova Scotia",                 fr: "Nouvelle-Écosse" },
  { value: "NT", en: "Northwest Territories",       fr: "Territoires du Nord-Ouest" },
  { value: "NU", en: "Nunavut",                     fr: "Nunavut" },
  { value: "ON", en: "Ontario",                     fr: "Ontario" },
  { value: "PE", en: "Prince Edward Island",        fr: "Île-du-Prince-Édouard" },
  { value: "QC", en: "Quebec",                      fr: "Québec" },
  { value: "SK", en: "Saskatchewan",                fr: "Saskatchewan" },
  { value: "YT", en: "Yukon",                       fr: "Yukon" },
];

const orgTypes = [
  { value: "nonprofit",  en: "Nonprofit",       fr: "Organisme sans but lucratif" },
  { value: "civic",      en: "Civic Enterprise", fr: "Entreprise civique" },
  { value: "social",     en: "Social Enterprise", fr: "Entreprise sociale" },
  { value: "community",  en: "Community Group",  fr: "Groupe communautaire" },
];

const techCategories = [
  { value: "computer",  en: "Computer",   fr: "Ordinateur" },
  { value: "laptop",    en: "Laptop",     fr: "Ordinateur portable" },
  { value: "monitor",   en: "Monitor",    fr: "Moniteur" },
  { value: "keyboard",  en: "Keyboard",   fr: "Clavier" },
  { value: "mouse",     en: "Mouse",      fr: "Souris" },
  { value: "printer",   en: "Printer",    fr: "Imprimante" },
  { value: "tablet",    en: "Tablet",     fr: "Tablette" },
  { value: "other",     en: "Other",      fr: "Autre" },
];

const contactMethods = [
  { value: "email",  en: "Email",  fr: "Courriel" },
  { value: "phone",  en: "Phone",  fr: "Téléphone" },
  { value: "either", en: "Either", fr: "Les deux" },
];

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    pageTitle: "Submit a Tech Request",
    steps: ["Your Organization", "What You Need", "Confirm"],
    back: "← Back",
    next: "Next →",
    // Step 1 labels
    orgName:     "Organization Name",
    orgType:     "Organization Type",
    orgTypePlaceholder: "Select a type",
    city:        "City",
    province:    "Province",
    provincePlaceholder: "Select a province",
    contactName: "Contact Name",
    email:       "Organization Email",
    phone:       "Phone Number",
    website:     "Website (optional)",
    // Step 2 labels
    techCategory:       "Category of Technology Needed",
    techCatPlaceholder: "Select a category",
    itemDescription:    "Describe the item you need",
    itemDescPlaceholder: "e.g. Windows laptop with at least 8GB RAM",
    quantity:           "How many do you need?",
    minSpecs:           "Minimum specifications (optional)",
    minSpecsPlaceholder: "Any specific technical requirements such as operating system, memory, or ports.",
    intendedUse:        "How will this technology be used?",
    contactMethod:      "Preferred contact method",
    // Step 3
    summaryTitle:   "Review your submission",
    sectionOrg:     "Your Organization",
    sectionNeed:    "What You Need",
    confirmLabel:   "I confirm this request is submitted on behalf of a registered nonprofit or civic organization.",
    submitBtn:      "Submit Request",
    // Validation
    errorRequired:  "Please fill in all required fields before continuing.",
    errorConfirm:   "Please check the confirmation box before submitting.",
    // Summary field labels
    sumOrgName:     "Organization Name",
    sumOrgType:     "Organization Type",
    sumCity:        "City",
    sumProvince:    "Province",
    sumContact:     "Contact Name",
    sumEmail:       "Email",
    sumPhone:       "Phone",
    sumWebsite:     "Website",
    sumCategory:    "Technology Category",
    sumItem:        "Item Description",
    sumQty:         "Quantity",
    sumSpecs:       "Minimum Specs",
    sumUse:         "Intended Use",
    sumContactMethod: "Contact Method",
    // Success
    successH1:      "Request Submitted!",
    successBody:    "Thank you. Our team will review your request within 2 to 5 business days. You will be contacted at the email address you provided.",
    successBtn:     "Back to Home",
    none:           "None provided",
  },
  fr: {
    pageTitle: "Soumettre une demande de technologie",
    steps: ["Votre organisation", "Ce dont vous avez besoin", "Confirmer"],
    back: "← Retour",
    next: "Suivant →",
    // Step 1 labels
    orgName:     "Nom de l'organisation",
    orgType:     "Type d'organisation",
    orgTypePlaceholder: "Choisir un type",
    city:        "Ville",
    province:    "Province",
    provincePlaceholder: "Choisir une province",
    contactName: "Nom du contact",
    email:       "Courriel de l'organisation",
    phone:       "Numéro de téléphone",
    website:     "Site web (facultatif)",
    // Step 2 labels
    techCategory:       "Catégorie de technologie requise",
    techCatPlaceholder: "Choisir une catégorie",
    itemDescription:    "Décrivez l'article dont vous avez besoin",
    itemDescPlaceholder: "ex. Ordinateur portable Windows avec au moins 8 Go de RAM",
    quantity:           "Combien en avez-vous besoin?",
    minSpecs:           "Spécifications minimales (facultatif)",
    minSpecsPlaceholder: "Exigences techniques spécifiques telles que le système d'exploitation, la mémoire ou les ports.",
    intendedUse:        "Comment cette technologie sera-t-elle utilisée?",
    contactMethod:      "Méthode de contact préférée",
    // Step 3
    summaryTitle:   "Vérifiez votre soumission",
    sectionOrg:     "Votre organisation",
    sectionNeed:    "Ce dont vous avez besoin",
    confirmLabel:   "Je confirme que cette demande est soumise au nom d'un organisme sans but lucratif ou d'une entreprise civique enregistrée.",
    submitBtn:      "Soumettre la demande",
    // Validation
    errorRequired:  "Veuillez remplir tous les champs obligatoires avant de continuer.",
    errorConfirm:   "Veuillez cocher la case de confirmation avant de soumettre.",
    // Summary field labels
    sumOrgName:     "Nom de l'organisation",
    sumOrgType:     "Type d'organisation",
    sumCity:        "Ville",
    sumProvince:    "Province",
    sumContact:     "Nom du contact",
    sumEmail:       "Courriel",
    sumPhone:       "Téléphone",
    sumWebsite:     "Site web",
    sumCategory:    "Catégorie de technologie",
    sumItem:        "Description de l'article",
    sumQty:         "Quantité",
    sumSpecs:       "Spécifications minimales",
    sumUse:         "Utilisation prévue",
    sumContactMethod: "Méthode de contact",
    // Success
    successH1:      "Demande soumise!",
    successBody:    "Merci. Notre équipe examinera votre demande dans 2 à 5 jours ouvrables. Vous serez contacté à l'adresse courriel fournie.",
    successBtn:     "Retour à l'accueil",
    none:           "Non fourni",
  },
} as const;

type Tx = (typeof translations)[Lang];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLabel<T extends { value: string; en: string; fr: string }>(
  list: T[],
  value: string,
  lang: Lang
): string {
  return list.find((o) => o.value === value)?.[lang] ?? value;
}

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

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, tx }: { current: number; tx: Tx }) {
  return (
    <div className="w-full max-w-lg mx-auto mb-10" aria-label="Form progress">
      {/* Circles + connecting lines */}
      <div className="flex items-center w-full">
        {[1, 2, 3].map((n, i) => {
          const active = n === current;
          const done = n < current;
          return (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                  active || done
                    ? "bg-evergreen-800 border-evergreen-800"
                    : "bg-white border-evergreen-800"
                }`}
                aria-current={active ? "step" : undefined}
              >
                <span
                  className={`font-display text-lg leading-none ${
                    active || done ? "text-white" : "text-evergreen-800"
                  }`}
                >
                  {n}
                </span>
              </div>
              {i < 2 && (
                <div className="flex-1 h-0.5 mx-2 bg-evergreen-200" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2">
        {tx.steps.map((label, i) => (
          <span
            key={i}
            className={`font-body text-sm text-center leading-tight max-w-[80px] ${
              i + 1 === current ? "text-evergreen-800 font-semibold" : "text-evergreen-500"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function StepOne({
  data,
  onChange,
  tx,
  lang,
}: {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  tx: Tx;
  lang: Lang;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Field id="orgName" label={`${tx.orgName} *`}>
        <input
          id="orgName"
          type="text"
          required
          aria-required="true"
          value={data.orgName}
          onChange={(e) => onChange("orgName", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field id="orgType" label={`${tx.orgType} *`}>
        <select
          id="orgType"
          required
          aria-required="true"
          value={data.orgType}
          onChange={(e) => onChange("orgType", e.target.value)}
          className={inputClass}
        >
          <option value="">{tx.orgTypePlaceholder}</option>
          {orgTypes.map((o) => (
            <option key={o.value} value={o.value}>
              {o[lang]}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field id="city" label={`${tx.city} *`}>
          <input
            id="city"
            type="text"
            required
            aria-required="true"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="province" label={`${tx.province} *`}>
          <select
            id="province"
            required
            aria-required="true"
            value={data.province}
            onChange={(e) => onChange("province", e.target.value)}
            className={inputClass}
          >
            <option value="">{tx.provincePlaceholder}</option>
            {provinces.map((p) => (
              <option key={p.value} value={p.value}>
                {p[lang]}
              </option>
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
          value={data.contactName}
          onChange={(e) => onChange("contactName", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field id="email" label={`${tx.email} *`}>
          <input
            id="email"
            type="email"
            required
            aria-required="true"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="phone" label={`${tx.phone} *`}>
          <input
            id="phone"
            type="tel"
            required
            aria-required="true"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="website" label={tx.website}>
        <input
          id="website"
          type="url"
          value={data.website}
          onChange={(e) => onChange("website", e.target.value)}
          className={inputClass}
          placeholder="https://"
        />
      </Field>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function StepTwo({
  data,
  onChange,
  tx,
  lang,
}: {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  tx: Tx;
  lang: Lang;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Field id="techCategory" label={`${tx.techCategory} *`}>
        <select
          id="techCategory"
          required
          aria-required="true"
          value={data.techCategory}
          onChange={(e) => onChange("techCategory", e.target.value)}
          className={inputClass}
        >
          <option value="">{tx.techCatPlaceholder}</option>
          {techCategories.map((c) => (
            <option key={c.value} value={c.value}>
              {c[lang]}
            </option>
          ))}
        </select>
      </Field>

      <Field id="itemDescription" label={`${tx.itemDescription} *`}>
        <input
          id="itemDescription"
          type="text"
          required
          aria-required="true"
          placeholder={tx.itemDescPlaceholder}
          value={data.itemDescription}
          onChange={(e) => onChange("itemDescription", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field id="quantity" label={`${tx.quantity} *`}>
        <input
          id="quantity"
          type="number"
          required
          aria-required="true"
          min={1}
          value={data.quantity}
          onChange={(e) => onChange("quantity", e.target.value)}
          className={`${inputClass} max-w-[160px]`}
        />
      </Field>

      <Field id="minSpecs" label={tx.minSpecs}>
        <textarea
          id="minSpecs"
          rows={4}
          placeholder={tx.minSpecsPlaceholder}
          value={data.minSpecs}
          onChange={(e) => onChange("minSpecs", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field id="intendedUse" label={`${tx.intendedUse} *`}>
        <textarea
          id="intendedUse"
          rows={4}
          required
          aria-required="true"
          value={data.intendedUse}
          onChange={(e) => onChange("intendedUse", e.target.value)}
          className={inputClass}
        />
      </Field>

      {/* Radio group */}
      <fieldset className="flex flex-col gap-3">
        <legend className={`${labelClass} mb-0`}>
          {tx.contactMethod} *
        </legend>
        {contactMethods.map((m) => (
          <label
            key={m.value}
            className="flex items-center gap-3 cursor-pointer font-body text-lg text-evergreen-900 min-h-[48px]"
          >
            <input
              type="radio"
              name="contactMethod"
              value={m.value}
              required
              checked={data.contactMethod === m.value}
              onChange={() => onChange("contactMethod", m.value)}
              className="w-5 h-5 accent-evergreen-800 flex-shrink-0"
            />
            {m[lang]}
          </label>
        ))}
      </fieldset>
    </div>
  );
}

// ─── Step 3 — Confirm ─────────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-3 border-b border-evergreen-100 last:border-b-0">
      <dt className="font-body text-sm font-medium text-evergreen-600 sm:w-48 flex-shrink-0">
        {label}
      </dt>
      <dd className="font-body text-lg text-evergreen-900 mt-0.5 sm:mt-0">
        {value}
      </dd>
    </div>
  );
}

function StepThree({
  data,
  onChange,
  tx,
  lang,
}: {
  data: FormData;
  onChange: (field: keyof FormData, value: string | boolean) => void;
  tx: Tx;
  lang: Lang;
}) {
  const none = tx.none;

  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-display text-evergreen-800 text-2xl">{tx.summaryTitle}</h3>

      {/* Organization summary */}
      <div className="bg-white rounded-xl border border-evergreen-100 px-6 py-2">
        <p className="font-display text-evergreen-700 text-lg py-3 border-b border-evergreen-100">
          {tx.sectionOrg}
        </p>
        <dl>
          <SummaryRow label={tx.sumOrgName} value={data.orgName || none} />
          <SummaryRow label={tx.sumOrgType}  value={getLabel(orgTypes, data.orgType, lang) || none} />
          <SummaryRow label={tx.sumCity}     value={data.city || none} />
          <SummaryRow label={tx.sumProvince} value={getLabel(provinces, data.province, lang) || none} />
          <SummaryRow label={tx.sumContact}  value={data.contactName || none} />
          <SummaryRow label={tx.sumEmail}    value={data.email || none} />
          <SummaryRow label={tx.sumPhone}    value={data.phone || none} />
          <SummaryRow label={tx.sumWebsite}  value={data.website || none} />
        </dl>
      </div>

      {/* Tech need summary */}
      <div className="bg-white rounded-xl border border-evergreen-100 px-6 py-2">
        <p className="font-display text-evergreen-700 text-lg py-3 border-b border-evergreen-100">
          {tx.sectionNeed}
        </p>
        <dl>
          <SummaryRow label={tx.sumCategory} value={getLabel(techCategories, data.techCategory, lang) || none} />
          <SummaryRow label={tx.sumItem}     value={data.itemDescription || none} />
          <SummaryRow label={tx.sumQty}      value={data.quantity} />
          <SummaryRow label={tx.sumSpecs}    value={data.minSpecs || none} />
          <SummaryRow label={tx.sumUse}      value={data.intendedUse || none} />
          <SummaryRow label={tx.sumContactMethod} value={getLabel(contactMethods, data.contactMethod, lang) || none} />
        </dl>
      </div>

      {/* Confirmation checkbox */}
      <label className="flex items-start gap-4 cursor-pointer group">
        <input
          type="checkbox"
          id="confirmed"
          required
          aria-required="true"
          checked={data.confirmed}
          onChange={(e) => onChange("confirmed", e.target.checked)}
          className="mt-1 w-5 h-5 flex-shrink-0 accent-evergreen-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800"
        />
        <span className="font-body text-lg text-evergreen-900 leading-relaxed group-hover:text-evergreen-800">
          {tx.confirmLabel}
        </span>
      </label>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ tx }: { tx: Tx }) {
  return (
    <div className="flex flex-col items-center text-center gap-8 py-20 px-6">
      {/* Checkmark icon */}
      <div
        className="w-24 h-24 rounded-full bg-evergreen-100 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10 25L20 35L38 13"
            stroke="#49836b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RequestPage() {
  const { lang } = useLanguage();
  const tx = translations[lang];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top of form on step change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  function handleChange(field: keyof FormData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  // ── Validation ────────────────────────────────────────────────────────────

  function validateStep1(): boolean {
    const { orgName, orgType, city, province, contactName, email, phone } = formData;
    return !!(orgName && orgType && city && province && contactName && email && phone);
  }

  function validateStep2(): boolean {
    const { techCategory, itemDescription, quantity, intendedUse, contactMethod } = formData;
    return !!(techCategory && itemDescription && quantity && Number(quantity) >= 1 && intendedUse && contactMethod);
  }

  function validateStep3(): boolean {
    return formData.confirmed;
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  function handleNext() {
    const valid = step === 1 ? validateStep1() : validateStep2();
    if (!valid) {
      setError(tx.errorRequired);
      return;
    }
    setError(null);
    setStep((s) => s + 1);
  }

  function handleBack() {
    setError(null);
    setStep((s) => s - 1);
  }

  function handleSubmit() {
    if (!validateStep3()) {
      setError(tx.errorConfirm);
      return;
    }
    console.log("TechBridge form submission:", formData);
    setSubmitted(true);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="bg-evergreen-50 min-h-screen">
        <SuccessScreen tx={tx} />
      </div>
    );
  }

  return (
    <div className="bg-evergreen-50 min-h-screen">
      <div ref={topRef} className="max-w-2xl mx-auto px-6 py-14">

        {/* Page heading */}
        <h1 className="font-display text-evergreen-800 text-4xl mb-10 text-center">
          {tx.pageTitle}
        </h1>

        {/* Step indicator */}
        <StepIndicator current={step} tx={tx} />

        {/* Error banner */}
        {error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-300 text-red-800 font-body text-base rounded-lg px-4 py-3 mb-8"
          >
            {error}
          </div>
        )}

        {/* Form steps */}
        <div className="bg-white rounded-2xl border border-evergreen-100 shadow-sm px-6 py-10 md:px-10">
          {step === 1 && (
            <StepOne data={formData} onChange={handleChange} tx={tx} lang={lang} />
          )}
          {step === 2 && (
            <StepTwo data={formData} onChange={handleChange} tx={tx} lang={lang} />
          )}
          {step === 3 && (
            <StepThree data={formData} onChange={handleChange} tx={tx} lang={lang} />
          )}
        </div>

        {/* Navigation buttons */}
        <div
          className={`flex mt-8 gap-4 ${step > 1 ? "justify-between" : "justify-end"}`}
        >
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center bg-white border-2 border-evergreen-800 text-evergreen-800 font-body font-semibold text-lg rounded-full px-8 min-h-[48px] hover:bg-evergreen-50 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
            >
              {tx.back}
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-lg rounded-full px-8 min-h-[48px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
            >
              {tx.next}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center justify-center bg-evergreen-800 text-white font-display rounded-full px-8 min-h-[56px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
              style={{ fontSize: "20px" }}
            >
              {tx.submitBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
