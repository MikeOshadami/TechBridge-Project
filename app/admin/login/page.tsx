"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    adminOnly:      "Admin Access Only",
    h1:             "Sign In",
    emailLabel:     "Email Address",
    passLabel:      "Password",
    submitBtn:      "Sign In",
    helpText:       "Having trouble? Contact your administrator.",
    langToggle:     "FR",
    langAriaSwitch: "Switch to French",
    backToSite:     "← Back to site",
  },
  fr: {
    adminOnly:      "Accès administrateur uniquement",
    h1:             "Se connecter",
    emailLabel:     "Adresse courriel",
    passLabel:      "Mot de passe",
    submitBtn:      "Se connecter",
    helpText:       "Des problèmes? Contactez votre administrateur.",
    langToggle:     "EN",
    langAriaSwitch: "Passer en anglais",
    backToSite:     "← Retour au site",
  },
} as const;

const inputClass =
  "w-full bg-white border border-evergreen-200 rounded-xl px-4 font-body text-evergreen-900 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0 placeholder:text-evergreen-400 transition-colors hover:border-evergreen-400";

const labelClass = "font-body text-xs font-semibold text-evergreen-600 mb-1.5 block tracking-wide uppercase";

export default function AdminLoginPage() {
  const router              = useRouter();
  const { lang, toggleLang } = useLanguage();
  const tx                  = translations[lang];

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Admin login attempt:", { email, password });
    localStorage.setItem("techbridge_admin_auth", "true");
    router.push("/admin");
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative"
      style={{
        background: "linear-gradient(135deg, #1a3028 0%, #254135 60%, #1e3830 100%)",
      }}
    >
      {/* Subtle decorative rings */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
          style={{ width: "600px", height: "600px" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
          style={{ width: "900px", height: "900px" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
          style={{ width: "1200px", height: "1200px" }}
        />
      </div>

      {/* Language toggle — top right */}
      <button
        onClick={toggleLang}
        aria-label={tx.langAriaSwitch}
        className="absolute top-5 right-5 text-white/70 font-body text-sm font-medium border border-white/20 rounded-lg px-4 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 min-h-[40px] min-w-[48px] flex items-center justify-center"
      >
        {tx.langToggle}
      </button>

      {/* Back to site — top left */}
      <a
        href="/"
        className="absolute top-5 left-5 text-white/60 font-body text-sm hover:text-white/90 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 rounded flex items-center min-h-[40px] px-1"
      >
        {tx.backToSite}
      </a>

      {/* Branding */}
      <div className="text-center mb-8 relative z-10">
        {/* Shield / lock icon */}
        <div
          className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5 border border-white/10"
          aria-hidden="true"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M16 3L5 7.5V15.5C5 21.3 9.8 26.8 16 29C22.2 26.8 27 21.3 27 15.5V7.5L16 3Z"
              stroke="#c8892a"
              strokeWidth="1.75"
              strokeLinejoin="round"
              fill="none"
            />
            <rect x="11" y="13.5" width="10" height="8" rx="1.5" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M16 16.5v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 13.5v-2a3 3 0 016 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <p
          className="font-display text-white"
          style={{ fontSize: "26px" }}
          aria-label="TechBridge"
        >
          TechBridge
        </p>
        <span className="inline-flex items-center gap-1.5 mt-2 bg-harvest/20 border border-harvest/30 text-harvest font-body text-xs font-semibold px-3 py-1 rounded-full tracking-wide uppercase">
          {tx.adminOnly}
        </span>
      </div>

      {/* Login card */}
      <div className="bg-white rounded-2xl w-full max-w-[400px] shadow-2xl overflow-hidden relative z-10">
        {/* Harvest accent top bar */}
        <div className="h-1 bg-harvest" />

        <div className="p-8 sm:p-10">
          <h1
            className="font-display text-evergreen-800 mb-7"
            style={{ fontSize: "26px" }}
          >
            {tx.h1}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className={labelClass}>
                {tx.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                required
                aria-required="true"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                style={{ height: "48px" }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className={labelClass}>
                {tx.passLabel}
              </label>
              <input
                id="password"
                type="password"
                required
                aria-required="true"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                style={{ height: "48px" }}
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold text-base rounded-full min-h-[52px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 mt-2"
            >
              {tx.submitBtn}
            </button>
          </form>

          <p className="font-body text-evergreen-400 text-center mt-6 text-sm">
            {tx.helpText}
          </p>
        </div>
      </div>
    </div>
  );
}
