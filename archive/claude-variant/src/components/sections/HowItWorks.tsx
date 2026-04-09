"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";


const stepIcons = [
  // Person speaking
  <svg key="1" viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <circle cx="32" cy="18" r="10" fill="var(--color-text-primary)" opacity="0.15" />
    <path d="M18 52c0-8 6-14 14-14s14 6 14 14" stroke="var(--color-text-primary)" strokeWidth="2" fill="none" />
    <circle cx="32" cy="18" r="10" stroke="var(--color-text-primary)" strokeWidth="2" />
    <path d="M44 12c2-2 6-2 8 0s2 6 0 8M48 8c2-2 6-2 8 0s2 6 0 8" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Group listening
  <svg key="2" viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <circle cx="22" cy="22" r="8" fill="var(--color-text-primary)" opacity="0.15" />
    <circle cx="42" cy="22" r="8" fill="var(--color-text-primary)" opacity="0.15" />
    <circle cx="22" cy="22" r="8" stroke="var(--color-text-primary)" strokeWidth="2" />
    <circle cx="42" cy="22" r="8" stroke="var(--color-text-primary)" strokeWidth="2" />
    <path d="M10 52c0-7 5-12 12-12s12 5 12 12M30 52c0-7 5-12 12-12s12 5 12 12" stroke="var(--color-text-primary)" strokeWidth="2" fill="none" />
  </svg>,
  // Stage performance
  <svg key="3" viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <rect x="8" y="36" width="48" height="4" rx="2" fill="var(--color-text-primary)" opacity="0.15" />
    <circle cx="24" cy="22" r="6" stroke="var(--color-text-primary)" strokeWidth="2" />
    <circle cx="40" cy="22" r="6" stroke="var(--color-text-primary)" strokeWidth="2" />
    <path d="M24 28v8M40 28v8M20 28l-4 8M44 28l4 8" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 4l3 8-3 4-3-4z" fill="var(--color-accent)" opacity="0.6" />
  </svg>,
  // Audience witnessing
  <svg key="4" viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <ellipse cx="32" cy="34" rx="24" ry="16" stroke="var(--color-text-primary)" strokeWidth="2" fill="var(--color-text-primary)" opacity="0.05" />
    <circle cx="20" cy="30" r="4" fill="var(--color-text-primary)" opacity="0.3" />
    <circle cx="32" cy="28" r="4" fill="var(--color-text-primary)" opacity="0.3" />
    <circle cx="44" cy="30" r="4" fill="var(--color-text-primary)" opacity="0.3" />
    <circle cx="26" cy="38" r="3" fill="var(--color-text-primary)" opacity="0.2" />
    <circle cx="38" cy="38" r="3" fill="var(--color-text-primary)" opacity="0.2" />
    <path d="M32 8v8" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
    <path d="M28 10l4-4 4 4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function HowItWorks() {
  const { locale } = useLanguage();
  const t = translations.howItWorks;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 py-20 md:py-28"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text-primary)] text-center mb-16">
          {t.sectionTitle[locale]}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {t.steps.map((step, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6">{stepIcons[i]}</div>
              <div className="text-xs font-medium tracking-widest uppercase text-[var(--color-accent)] mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
                {step.title[locale]}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {step.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
