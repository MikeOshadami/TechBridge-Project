"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    adminOnly:    "Admin Access Only",
    h1:           "Sign In",
    emailLabel:   "Email Address",
    passLabel:    "Password",
    submitBtn:    "Sign In",
    helpText:     "Having trouble? Contact your administrator.",
    langToggle:   "FR",
    langAriaSwitch: "Switch to French",
  },
  fr: {
    adminOnly:    "Accès administrateur uniquement",
    h1:           "Se connecter",
    emailLabel:   "Adresse courriel",
    passLabel:    "Mot de passe",
    submitBtn:    "Se connecter",
    helpText:     "Des problèmes? Contactez votre administrateur.",
    langToggle:   "EN",
    langAriaSwitch: "Switch to English",
  },
} as const;

const inputClass =
  "w-full bg-white border border-evergreen-800 rounded-lg px-3 py-3 font-body text-evergreen-900 text-lg focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0";

const labelClass = "font-body text-base font-medium text-evergreen-800 mb-1 block";

export default function AdminLoginPage() {
  const router       = useRouter();
  const { lang, toggleLang } = useLanguage();
  const tx           = translations[lang];

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Admin login attempt:", { email, password });
    localStorage.setItem("techbridge_admin_auth", "true");
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-evergreen-800 flex flex-col items-center justify-center px-4 py-12 relative">

      {/* Language toggle — top right */}
      <button
        onClick={toggleLang}
        aria-label={tx.langAriaSwitch}
        className="absolute top-4 right-4 text-white font-body text-sm font-medium px-4 rounded hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
      >
        {tx.langToggle}
      </button>

      {/* Logo */}
      <div className="text-center mb-8">
        <p
          className="font-display text-white"
          style={{ fontSize: "32px" }}
          aria-label="TechBridge"
        >
          TechBridge
        </p>
        <p className="font-body text-white mt-2" style={{ fontSize: "16px" }}>
          {tx.adminOnly}
        </p>
      </div>

      {/* Login card */}
      <div className="bg-white rounded-2xl p-10 w-full max-w-[420px] shadow-xl">
        <h1
          className="font-display text-evergreen-800 mb-8"
          style={{ fontSize: "28px" }}
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
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center bg-evergreen-800 text-white font-display rounded-full min-h-[56px] hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 mt-2"
            style={{ fontSize: "20px" }}
          >
            {tx.submitBtn}
          </button>
        </form>

        <p
          className="font-body text-gray-400 text-center mt-6"
          style={{ fontSize: "14px" }}
        >
          {tx.helpText}
        </p>
      </div>
    </div>
  );
}
