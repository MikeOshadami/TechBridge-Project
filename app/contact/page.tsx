"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const T = {
  en: {
    badge:   "Contact Us",
    h1:      "Get in touch with TechBridge.",
    body:    "Have a question about donating, applying, or partnering with us? We'd love to hear from you. We'll respond within 2 business days.",
    info: {
      h2:      "Contact information",
      email:   "admin@techbridge.ca",
      region:  "Greater Moncton, New Brunswick",
      hours:   "Response time: within 2 business days",
      faq:     "Common questions",
      faqLink: "View our FAQ on the homepage",
    },
    quickLinks: {
      h2:     "Quick links",
      items: [
        { label: "Donate a Device",   href: "/donate",   desc: "Post a donation or browse the Needs Board." },
        { label: "Apply for a Device", href: "/receive",  desc: "Submit a tech request for your organization." },
        { label: "Our Programs",       href: "/programs", desc: "Learn about all our programs and how they work." },
        { label: "Admin Login",        href: "/admin/login", desc: "Platform administrators only." },
      ],
    },
    form: {
      h2:           "Send us a message",
      name:         "Your Name",
      namePh:       "Full name",
      org:          "Organization",
      orgPh:        "Organization name (optional)",
      email:        "Email Address",
      emailPh:      "your@email.com",
      subject:      "Subject",
      subjects:     ["General question", "Donation inquiry", "Application support", "Partnership opportunity", "Technical issue", "Other"],
      message:      "Message",
      messagePh:    "How can we help?",
      consent:      "I consent to TechBridge storing this message to respond to my inquiry.",
      submit:       "Send Message",
      successH2:    "Message sent!",
      successBody:  "Thank you for reaching out. We'll get back to you within 2 business days.",
      successBack:  "Back to home",
    },
  },
  fr: {
    badge:   "Contactez-nous",
    h1:      "Prenez contact avec TechBridge.",
    body:    "Vous avez une question sur les dons, les demandes ou un partenariat? Nous serions ravis de vous entendre. Nous répondrons dans les 2 jours ouvrables.",
    info: {
      h2:      "Coordonnées",
      email:   "admin@techbridge.ca",
      region:  "Grand Moncton, Nouveau-Brunswick",
      hours:   "Délai de réponse: dans les 2 jours ouvrables",
      faq:     "Questions fréquentes",
      faqLink: "Voir notre FAQ sur la page d'accueil",
    },
    quickLinks: {
      h2:     "Liens rapides",
      items: [
        { label: "Donner un appareil",   href: "/donate",      desc: "Publiez un don ou parcourez le tableau des besoins." },
        { label: "Demander un appareil", href: "/receive",     desc: "Soumettez une demande de technologie pour votre organisation." },
        { label: "Nos programmes",       href: "/programs",    desc: "Découvrez tous nos programmes et leur fonctionnement." },
        { label: "Connexion admin",       href: "/admin/login", desc: "Administrateurs de la plateforme uniquement." },
      ],
    },
    form: {
      h2:           "Envoyez-nous un message",
      name:         "Votre nom",
      namePh:       "Nom complet",
      org:          "Organisation",
      orgPh:        "Nom de l'organisation (facultatif)",
      email:        "Adresse courriel",
      emailPh:      "votre@courriel.com",
      subject:      "Sujet",
      subjects:     ["Question générale", "Demande de don", "Aide à la demande", "Opportunité de partenariat", "Problème technique", "Autre"],
      message:      "Message",
      messagePh:    "Comment pouvons-nous vous aider?",
      consent:      "Je consens à ce que TechBridge conserve ce message pour répondre à ma demande.",
      submit:       "Envoyer le message",
      successH2:    "Message envoyé!",
      successBody:  "Merci de nous avoir contactés. Nous vous répondrons dans les 2 jours ouvrables.",
      successBack:  "Retour à l'accueil",
    },
  },
} as const;

const inputCls = "w-full font-body text-base text-evergreen-800 bg-white border border-evergreen-200 rounded-xl px-4 py-3 placeholder-evergreen-400 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-0 hover:border-evergreen-300 transition-colors";
const labelCls = "font-body text-sm font-semibold text-evergreen-700 mb-1 block";

export default function ContactPage() {
  const { lang } = useLanguage();
  const tx = T[lang];
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", email: "", subject: "", message: "", consent: false });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Contact form:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-evergreen-100 rounded-full flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <circle cx="18" cy="18" r="16" fill="#deede7" />
              <path d="M11 18l5 5 9-9" stroke="#254135" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-display text-evergreen-800" style={{ fontSize: "32px" }}>{tx.form.successH2}</h1>
          <p className="font-body text-evergreen-600 text-lg leading-relaxed">{tx.form.successBody}</p>
          <Link href="/"
            className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-semibold rounded-xl px-8 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2"
            style={{ minHeight: "50px", fontSize: "17px" }}>
            {tx.form.successBack}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-evergreen-800 w-full px-6 py-14 lg:py-18 text-center" aria-labelledby="contact-h1">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 font-body text-evergreen-300 font-medium text-sm bg-evergreen-700 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-harvest flex-shrink-0" aria-hidden="true" />
            {tx.badge}
          </span>
          <h1 id="contact-h1" className="font-display text-white leading-tight" style={{ fontSize: "clamp(28px, 5vw, 42px)" }}>
            {tx.h1}
          </h1>
          <p className="font-body text-evergreen-200 leading-relaxed max-w-[500px]" style={{ fontSize: "18px" }}>
            {tx.body}
          </p>
        </div>
      </section>

      {/* Main grid */}
      <div className="bg-evergreen-50 w-full px-6 py-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Left sidebar — info + quick links */}
          <div className="flex flex-col gap-6">

            {/* Contact info card */}
            <div className="bg-white rounded-2xl shadow-card border border-evergreen-100 p-6 flex flex-col gap-5">
              <h2 className="font-display text-evergreen-800" style={{ fontSize: "22px" }}>{tx.info.h2}</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-evergreen-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="1" y="3" width="14" height="10" rx="1" stroke="#254135" strokeWidth="1.5" fill="none" />
                      <path d="M1 4l7 5 7-5" stroke="#254135" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider mb-0.5">Email</p>
                    <a href="mailto:admin@techbridge.ca"
                      className="font-body text-evergreen-800 font-medium hover:text-harvest transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 rounded min-h-0 min-w-0 inline text-base">
                      {tx.info.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-evergreen-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.5-2-4.5-4.5-4.5z" stroke="#254135" strokeWidth="1.5" fill="none" />
                      <circle cx="8" cy="6" r="1.5" fill="#254135" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider mb-0.5">Location</p>
                    <p className="font-body text-evergreen-800 text-base">{tx.info.region}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-evergreen-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="8" r="6.5" stroke="#254135" strokeWidth="1.5" fill="none" />
                      <path d="M8 4.5v4l2.5 1.5" stroke="#254135" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-evergreen-500 uppercase tracking-wider mb-0.5">Hours</p>
                    <p className="font-body text-evergreen-800 text-base">{tx.info.hours}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-evergreen-100">
                <p className="font-body text-sm font-semibold text-evergreen-500 uppercase tracking-wider mb-2">{tx.info.faq}</p>
                <Link href="/#faq-heading"
                  className="font-body text-harvest font-semibold hover:text-harvest-600 transition-colors text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-harvest rounded min-h-0 min-w-0 inline">
                  {tx.info.faqLink} →
                </Link>
              </div>
            </div>

            {/* Quick links card */}
            <div className="bg-white rounded-2xl shadow-card border border-evergreen-100 p-6 flex flex-col gap-4">
              <h2 className="font-display text-evergreen-800" style={{ fontSize: "20px" }}>{tx.quickLinks.h2}</h2>
              <ul className="flex flex-col gap-3">
                {tx.quickLinks.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="group flex flex-col gap-0.5 hover:text-harvest transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 rounded min-h-0 min-w-0">
                      <span className="font-body font-semibold text-evergreen-800 group-hover:text-harvest text-base transition-colors">{item.label} →</span>
                      <span className="font-body text-evergreen-500 text-sm">{item.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact form — right 2 cols */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card border border-evergreen-100 p-8">
              <h2 className="font-display text-evergreen-800 mb-6" style={{ fontSize: "24px" }}>{tx.form.h2}</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-name" className={labelCls}>{tx.form.name} *</label>
                    <input id="cf-name" type="text" required placeholder={tx.form.namePh}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputCls} style={{ minHeight: "48px" }} />
                  </div>
                  <div>
                    <label htmlFor="cf-org" className={labelCls}>{tx.form.org}</label>
                    <input id="cf-org" type="text" placeholder={tx.form.orgPh}
                      value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })}
                      className={inputCls} style={{ minHeight: "48px" }} />
                  </div>
                </div>

                <div>
                  <label htmlFor="cf-email" className={labelCls}>{tx.form.email} *</label>
                  <input id="cf-email" type="email" required placeholder={tx.form.emailPh}
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls} style={{ minHeight: "48px" }} />
                </div>

                <div>
                  <label htmlFor="cf-subject" className={labelCls}>{tx.form.subject} *</label>
                  <select id="cf-subject" required
                    value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`${inputCls} cursor-pointer`} style={{ minHeight: "48px" }}>
                    <option value="">{lang === "en" ? "Select a subject" : "Choisir un sujet"}</option>
                    {tx.form.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="cf-message" className={labelCls}>{tx.form.message} *</label>
                  <textarea id="cf-message" required rows={5} placeholder={tx.form.messagePh}
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputCls} resize-y`} style={{ minHeight: "120px" }} />
                </div>

                <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl hover:bg-evergreen-50 transition-colors border border-evergreen-100">
                  <input type="checkbox" required
                    checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="flex-shrink-0 accent-evergreen-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 mt-0.5"
                    style={{ width: "20px", height: "20px" }} />
                  <span className="font-body text-evergreen-700 text-base leading-relaxed">{tx.form.consent}</span>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-evergreen-800 text-white font-body font-bold rounded-xl px-8 hover:bg-evergreen-700 transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-evergreen-800 focus-visible:outline-offset-2 self-start min-h-0 min-w-0"
                  style={{ minHeight: "52px", fontSize: "17px" }}
                >
                  {tx.form.submit}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
