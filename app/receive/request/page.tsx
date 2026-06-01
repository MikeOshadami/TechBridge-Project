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
  { value: "nonprofit",  en: "Nonprofit",        fr: "Organisme sans but lucratif" },
  { value: "civic",      en: "Civic Enterprise",  fr: "Entreprise civique" },
  { value: "social",     en: "Social Enterprise", fr: "Entreprise sociale" },
  { value: "community",  en: "Community Group",   fr: "Groupe communautaire" },
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
    eyebrow:   "For Registered Organizations",
    pageTitle: "Submit a Tech Request",
    subtitle:  "Tell us what your organization needs. We'll match you with available donations in the Greater Moncton area.",
    steps: ["Your Organization", "What You Need", "Review & Confirm"],
    back: "← Back",
    next: "Continue →",
    // Step 1
    step1Heading: "Tell us about your organization",
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
    // Step 2
    step2Heading: "What technology do you need?",
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
    required:       "Required",
  },
  fr: {
    eyebrow:   "Pour les organisations enregistrées",
    pageTitle: "Soumettre une demande de technologie",
    subtitle:  "Dites-nous ce dont votre organisation a besoin. Nous vous mettrons en contact avec les dons disponibles dans le Grand Moncton.",
    steps: ["Votre organisation", "Ce dont vous avez besoin", "Réviser et confirmer"],
    back: "← Retour",
    next: "Continuer →",
    // Step 1
    step1Heading: "Parlez-nous de votre organisation",
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
    // Step 2
    step2Heading: "De quelle technologie avez-vous besoin?",
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
    required:       "Obligatoire",
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
  "w-full bg-white border border-evergreen-200 rounded-xl px-4 font-body text-evergreen-900 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0 placeholder:text-evergreen-400 transition-colors hover:border-evergreen-400";

const selectClass =
  "w-full appearance-none bg-white border border-evergreen-200 rounded-xl px-4 font-body text-evergreen-900 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0 transition-colors hover:border-evergreen-400 cursor-pointer pr-10";

const labelClass = "font-body text-sm font-semibold text-evergreen-700 mb-1.5 block tracking-wide uppercase";

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
        {required && (
          <span className="text-harvest ml-1" aria-hidden="true">*</span>
        )}
      </label>
      {children}
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, tx }: { current: number; tx: Tx }) {
  return (
    <div className="w-full max-w-lg mx-auto mb-10" aria-label="Form progress">
      {/* Progress bar */}
      <div className="relative flex items-center w-full mb-3">
        {/* Background track */}
        <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 h-0.5 bg-evergreen-100" aria-hidden="true" />
        {/* Filled track */}
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 h-0.5 bg-harvest transition-all duration-500"
          style={{ width: `${((current - 1) / 2) * (100 - (40 / 3))}%` }}
          aria-hidden="true"
        />
        {[1, 2, 3].map((n) => {
          const active = n === current;
          const done = n < current;
          return (
            <div key={n} className="flex-1 flex justify-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                  done
                    ? "bg-harvest border-harvest"
                    : active
                    ? "bg-white border-harvest shadow-md"
                    : "bg-white border-evergreen-200"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {done ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 9.5L7.5 13L14 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span
                    className={`font-display text-base leading-none ${
                      active ? "text-harvest" : "text-evergreen-300"
                    }`}
                  >
                    {n}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between">
        {tx.steps.map((label, i) => (
          <span
            key={i}
            className={`font-body text-xs text-center leading-tight flex-1 ${
              i + 1 === current
                ? "text-harvest font-semibold"
                : i + 1 < current
                ? "text-evergreen-600"
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
      <div className="pb-4 mb-2 border-b border-evergreen-100">
        <h2 className="font-display text-evergreen-800 text-xl">{tx.step1Heading}</h2>
      </div>

      <Field id="orgName" label={tx.orgName} required>
        <input
          id="orgName" type="text" required aria-required="true"
          value={data.orgName}
          onChange={(e) => onChange("orgName", e.target.value)}
          className={inputClass} style={{ height: "48px" }}
        />
      </Field>

      <Field id="orgType" label={tx.orgType} required>
        <SelectWrap>
          <select
            id="orgType" required aria-required="true"
            value={data.orgType}
            onChange={(e) => onChange("orgType", e.target.value)}
            className={selectClass} style={{ height: "48px" }}
          >
            <option value="">{tx.orgTypePlaceholder}</option>
            {orgTypes.map((o) => (
              <option key={o.value} value={o.value}>{o[lang]}</option>
            ))}
          </select>
        </SelectWrap>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="city" label={tx.city} required>
          <input
            id="city" type="text" required aria-required="true"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            className={inputClass} style={{ height: "48px" }}
          />
        </Field>

        <Field id="province" label={tx.province} required>
          <SelectWrap>
            <select
              id="province" required aria-required="true"
              value={data.province}
              onChange={(e) => onChange("province", e.target.value)}
              className={selectClass} style={{ height: "48px" }}
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
          value={data.contactName}
          onChange={(e) => onChange("contactName", e.target.value)}
          className={inputClass} style={{ height: "48px" }}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="email" label={tx.email} required>
          <input
            id="email" type="email" required aria-required="true"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputClass} style={{ height: "48px" }}
          />
        </Field>

        <Field id="phone" label={tx.phone} required>
          <input
            id="phone" type="tel" required aria-required="true"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={inputClass} style={{ height: "48px" }}
          />
        </Field>
      </div>

      <Field id="website" label={tx.website}>
        <input
          id="website" type="url"
          value={data.website}
          onChange={(e) => onChange("website", e.target.value)}
          className={inputClass} style={{ height: "48px" }}
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
      <div className="pb-4 mb-2 border-b border-evergreen-100">
        <h2 className="font-display text-evergreen-800 text-xl">{tx.step2Heading}</h2>
      </div>

      <Field id="techCategory" label={tx.techCategory} required>
        <SelectWrap>
          <select
            id="techCategory" required aria-required="true"
            value={data.techCategory}
            onChange={(e) => onChange("techCategory", e.target.value)}
            className={selectClass} style={{ height: "48px" }}
          >
            <option value="">{tx.techCatPlaceholder}</option>
            {techCategories.map((c) => (
              <option key={c.value} value={c.value}>{c[lang]}</option>
            ))}
          </select>
        </SelectWrap>
      </Field>

      <Field id="itemDescription" label={tx.itemDescription} required>
        <input
          id="itemDescription" type="text" required aria-required="true"
          placeholder={tx.itemDescPlaceholder}
          value={data.itemDescription}
          onChange={(e) => onChange("itemDescription", e.target.value)}
          className={inputClass} style={{ height: "48px" }}
        />
      </Field>

      <Field id="quantity" label={tx.quantity} required>
        <input
          id="quantity" type="number" required aria-required="true" min={1}
          value={data.quantity}
          onChange={(e) => onChange("quantity", e.target.value)}
          className={`${inputClass} max-w-[140px]`} style={{ height: "48px" }}
        />
      </Field>

      <Field id="minSpecs" label={tx.minSpecs}>
        <textarea
          id="minSpecs" rows={3}
          placeholder={tx.minSpecsPlaceholder}
          value={data.minSpecs}
          onChange={(e) => onChange("minSpecs", e.target.value)}
          className={`${inputClass} py-3`}
        />
      </Field>

      <Field id="intendedUse" label={tx.intendedUse} required>
        <textarea
          id="intendedUse" rows={4} required aria-required="true"
          value={data.intendedUse}
          onChange={(e) => onChange("intendedUse", e.target.value)}
          className={`${inputClass} py-3`}
        />
      </Field>

      {/* Contact method radio group */}
      <fieldset className="flex flex-col gap-1">
        <legend className={labelClass}>
          {tx.contactMethod}
          <span className="text-harvest ml-1" aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-col gap-2 mt-1">
          {contactMethods.map((m) => (
            <label
              key={m.value}
              className={`flex items-center gap-3 cursor-pointer font-body text-base text-evergreen-900 rounded-xl px-4 py-3 border-2 transition-all ${
                data.contactMethod === m.value
                  ? "border-harvest bg-harvest/5"
                  : "border-evergreen-100 hover:border-evergreen-300"
              }`}
            >
              <input
                type="radio"
                name="contactMethod"
                value={m.value}
                required
                checked={data.contactMethod === m.value}
                onChange={() => onChange("contactMethod", m.value)}
                className="w-4 h-4 accent-harvest flex-shrink-0"
              />
              {m[lang]}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

// ─── Step 3 — Confirm ─────────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-3 border-b border-evergreen-50 last:border-b-0">
      <dt className="font-body text-xs font-semibold uppercase tracking-wide text-evergreen-500 sm:w-44 flex-shrink-0 mb-0.5 sm:mb-0">
        {label}
      </dt>
      <dd className="font-body text-base text-evergreen-900">
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
      <div className="pb-4 mb-2 border-b border-evergreen-100">
        <h2 className="font-display text-evergreen-800 text-xl">{tx.summaryTitle}</h2>
      </div>

      {/* Organization summary */}
      <div className="rounded-xl border border-evergreen-100 overflow-hidden">
        <div className="h-1 bg-harvest" />
        <div className="px-5 py-4">
          <p className="font-display text-evergreen-700 text-base font-semibold mb-2">
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
      </div>

      {/* Tech need summary */}
      <div className="rounded-xl border border-evergreen-100 overflow-hidden">
        <div className="h-1 bg-evergreen-600" />
        <div className="px-5 py-4">
          <p className="font-display text-evergreen-700 text-base font-semibold mb-2">
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
      </div>

      {/* Confirmation checkbox */}
      <label className="flex items-start gap-4 cursor-pointer group rounded-xl border-2 border-evergreen-100 hover:border-harvest/40 p-4 transition-all">
        <input
          type="checkbox"
          id="confirmed"
          required
          aria-required="true"
          checked={data.confirmed}
          onChange={(e) => onChange("confirmed", e.target.checked)}
          className="mt-0.5 w-5 h-5 flex-shrink-0 accent-harvest focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800"
        />
        <span className="font-body text-base text-evergreen-900 leading-relaxed">
          {tx.confirmLabel}
        </span>
      </label>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ tx }: { tx: Tx }) {
  return (
    <div className="bg-evergreen-50 min-h-screen flex flex-col items-center justify-center text-center gap-8 py-20 px-6">
      {/* Animated checkmark */}
      <div
        className="w-24 h-24 rounded-full bg-harvest/10 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="22" stroke="#c8892a" strokeWidth="2" strokeOpacity="0.3" />
          <path
            d="M14 24.5L21 31.5L34 16"
            stroke="#c8892a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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

export default function RequestPage() {
  const { lang } = useLanguage();
  const tx = translations[lang];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const formTopRef = useRef<HTMLDivElement>(null);

  // Scroll to top of form on step change
  useEffect(() => {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  if (submitted) return <SuccessScreen tx={tx} />;

  return (
    <div className="bg-evergreen-50 min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="bg-evergreen-800 w-full px-6 py-14 flex flex-col items-center text-center"
        aria-labelledby="request-h1"
      >
        <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 font-body text-sm font-medium px-4 py-1.5 rounded-full mb-5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 10v2M9 10v2M3 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {tx.eyebrow}
        </span>
        <h1
          id="request-h1"
          className="font-display text-white mb-4 leading-tight"
          style={{ fontSize: "clamp(1.875rem, 5vw, 2.5rem)" }}
        >
          {tx.pageTitle}
        </h1>
        <p className="font-body text-evergreen-200 max-w-[540px] leading-relaxed text-lg">
          {tx.subtitle}
        </p>
      </section>

      {/* ── Form area ─────────────────────────────────────────────────────── */}
      <div ref={formTopRef} className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        {/* Step indicator */}
        <StepIndicator current={step} tx={tx} />

        {/* Error banner */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 font-body text-sm rounded-xl px-4 py-3 mb-8"
          >
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
              {tx.next}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center justify-center bg-harvest text-white font-body font-semibold text-base rounded-full px-8 min-h-[52px] hover:bg-harvest-600 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest focus-visible:outline-offset-2"
            >
              {tx.submitBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
