"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";

export default function PerformancePage() {
  const { locale } = useLanguage();
  const t = translations.performancePage;

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-28">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Hero area */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-text-primary)] mb-4">
            {t.title[locale]}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] font-light italic">
            {t.subtitle[locale]}
          </p>
        </div>

        {/* Intro */}
        <div className="mb-12">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed text-center max-w-2xl mx-auto">
            {t.intro[locale]}
          </p>
        </div>

        {/* Schedule & Location card */}
        <div
          className="p-8 md:p-12 mb-12 border border-[var(--color-border)]"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1.5">
                {locale === "ka" ? "როდის" : "When"}
              </p>
              <p className="text-lg text-[var(--color-text-primary)] font-light">
                {t.schedule[locale]}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1.5">
                {locale === "ka" ? "საათი" : "Time"}
              </p>
              <p className="text-lg text-[var(--color-text-primary)] font-light">
                {t.time[locale]}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1.5">
                {locale === "ka" ? "ადგილი" : "Location"}
              </p>
              <p className="text-lg text-[var(--color-text-primary)] font-light">
                {t.location[locale]}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1.5">
                {locale === "ka" ? "შესასვლელი" : "Entrance"}
              </p>
              <p className="text-lg text-[var(--color-text-primary)] font-light">
                {t.entrance[locale]}
              </p>
            </div>
          </div>

          {/* Age restriction */}
          <div className="flex items-center gap-3 pt-6 border-t border-[var(--color-border)]">
            <span className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 bg-[var(--color-accent)] text-[var(--color-button-text)] opacity-90 shrink-0">
              16+
            </span>
            <p className="text-sm text-[var(--color-text-muted)]">
              {t.ageRestriction[locale]}
            </p>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center">
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              {t.contactCta[locale]}
            </p>
            <a
              href={t.contactUrl}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-200 bg-[var(--color-button-bg)] text-[var(--color-button-text)] hover:opacity-85"
            >
              {t.contactButton[locale]}
            </a>
          </div>
        </div>

        {/* Donation section (replaces ticket pricing) */}
        <div
          className="p-8 md:p-12 mb-12 border-2 border-[var(--color-accent)]"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <h2 className="text-2xl md:text-3xl font-light text-[var(--color-text-primary)] text-center mb-4">
            {t.donationTitle[locale]}
          </h2>
          <p className="text-center text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
            {t.donationText[locale]}
          </p>
          <div className="text-center">
            <Link
              href="/crowdfunding"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-200 bg-[var(--color-accent)] text-[var(--color-button-text)] hover:opacity-85"
            >
              {t.donationCta[locale]}
            </Link>
          </div>
        </div>

        {/* Payment Information */}
        <div
          className="p-8 md:p-12 mb-12 border border-[var(--color-border)]"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <h2 className="text-2xl font-light text-[var(--color-text-primary)] text-center mb-6">
            {t.paymentTitle[locale]}
          </h2>

          <p className="text-sm text-[var(--color-text-secondary)] text-center mb-8">
            {t.paymentIntro[locale]}
          </p>

          {/* Bank accounts */}
          <div className="space-y-4 mb-6">
            {t.bankAccounts.map((account, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 border border-[var(--color-border)]"
                style={{ backgroundColor: "var(--color-background)" }}
              >
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {account.bank[locale]}
                </span>
                <code className="text-sm tracking-wide text-[var(--color-text-secondary)] font-mono">
                  {account.iban}
                </code>
              </div>
            ))}
          </div>

          {/* Recipient */}
          <p className="text-center text-sm font-medium text-[var(--color-text-primary)] mb-6">
            {t.recipient[locale]}
          </p>

          {/* Payment note */}
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed text-center">
            {t.paymentNote[locale]}
          </p>
        </div>

        {/* Google Maps embed */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-[var(--color-text-primary)] text-center mb-6">
            {t.mapTitle[locale]}
          </h2>
          <div className="aspect-[16/9] border border-[var(--color-border)] overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=41.706488728978535,44.78173440856228&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Akaki Khorava Street 14, Tbilisi"
            />
          </div>
          <p className="text-center text-sm text-[var(--color-text-muted)] mt-3">
            აკაკი ხორავას ქუჩა N14, თბილისი / 14 Akaki Khorava St, Tbilisi
          </p>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-1 opacity-70">
            {t.entrance[locale]}
          </p>
        </div>

        {/* Photo */}
        <div className="mb-12 overflow-hidden">
          <img
            src="/images/programs/1.jpg"
            alt="Playback Theatre performance"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Closing note */}
        <p className="text-center text-xl text-[var(--color-text-primary)] font-light italic">
          {t.closingNote[locale]}
        </p>
      </div>
    </div>
  );
}
