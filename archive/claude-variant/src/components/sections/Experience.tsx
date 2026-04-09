"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Experience() {
  const { locale } = useLanguage();
  const t = translations.experience;

  return (
    <SectionWrapper id="experience">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text-primary)] text-center mb-16">
        {t.sectionTitle[locale]}
      </h2>

      <div className="max-w-3xl mx-auto space-y-16">
        {t.quotes.map((quote, i) => (
          <blockquote
            key={i}
            className="relative text-center px-4"
          >
            {/* Decorative quote mark */}
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl font-serif leading-none opacity-[0.08]"
              style={{ color: "var(--color-text-primary)" }}
            >
              &ldquo;
            </div>

            <p className="text-xl md:text-2xl lg:text-3xl font-light text-[var(--color-text-primary)] leading-relaxed italic">
              &bdquo;{quote.text[locale]}&ldquo;
            </p>

            <div
              className="w-12 h-[1px] mx-auto mt-8"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
          </blockquote>
        ))}
      </div>
    </SectionWrapper>
  );
}
