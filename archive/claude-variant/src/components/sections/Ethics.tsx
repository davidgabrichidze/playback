"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function Ethics() {
  const { locale } = useLanguage();
  const t = translations.ethics;

  return (
    <section
      id="ethics"
      className="scroll-mt-20 py-20 md:py-28"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text-primary)] text-center mb-4">
          {t.sectionTitle[locale]}
        </h2>
        <p className="text-center text-[var(--color-text-muted)] mb-4 text-sm">
          {t.subtitle[locale]}
        </p>
        <p className="text-center text-[var(--color-text-secondary)] mb-16 text-sm max-w-2xl mx-auto">
          {t.intro[locale]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.principles.map((principle, i) => (
            <div
              key={i}
              className="p-6 border border-[var(--color-border)] bg-[var(--color-background)]"
            >
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
                {principle.title[locale]}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {principle.text[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
