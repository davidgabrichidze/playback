"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Impressions() {
  const { locale } = useLanguage();
  const t = translations.impressions;

  return (
    <SectionWrapper id="impressions">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text-primary)] text-center mb-4">
        {t.sectionTitle[locale]}
      </h2>
      <p className="text-center text-[var(--color-text-muted)] mb-16 text-sm">
        {t.subtitle[locale]}
      </p>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.entries.map((entry, i) => (
          <div
            key={i}
            className="p-6 border border-[var(--color-border)] transition-colors duration-200"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed italic mb-4">
              &bdquo;{entry.text[locale]}&ldquo;
            </p>
            <p className="text-xs text-[var(--color-text-muted)] tracking-wide">
              {locale === "ka" ? "— ანონიმური მაყურებელი" : "— Anonymous audience member"}
            </p>
          </div>
        ))}
      </div>

      {/* Share CTA */}
      <div className="text-center mt-12">
        <a
          href="mailto:tsisa.cholokashvili@gmail.com?subject=შთაბეჭდილება"
          className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-200 border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
        >
          {t.shareCta[locale]}
        </a>
      </div>
    </SectionWrapper>
  );
}
