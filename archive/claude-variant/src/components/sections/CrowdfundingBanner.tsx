"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";

export default function CrowdfundingBanner() {
  const { locale } = useLanguage();
  const t = translations.crowdfundingBanner;

  return (
    <section className="py-16 md:py-20 relative overflow-hidden border-y border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light text-[var(--color-text-primary)] mb-4">
            {t.title[locale]}
          </h2>
          <p className="text-base text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            {t.text[locale]}
          </p>
          <Link
            href="/crowdfunding"
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-200 bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] border border-[var(--color-button-secondary-border)] hover:opacity-75"
          >
            {t.cta[locale]}
          </Link>
        </div>
      </div>
    </section>
  );
}
