"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function WhatIsPlayback() {
  const { locale } = useLanguage();
  const t = translations.whatIs;

  return (
    <SectionWrapper id="what-is">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <div className="lg:col-span-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text-primary)] mb-8 leading-tight">
            {t.sectionTitle[locale]}
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
            {t.paragraph1[locale]}
          </p>
          <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
            {t.paragraph2[locale]}
          </p>

          {/* Values */}
          <div className="flex flex-wrap gap-6">
            {Object.values(t.values).map((value, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
                <span className="text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                  {value[locale]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="lg:col-span-2">
          <div className="aspect-[3/4] rounded-sm overflow-hidden">
            <img
              src="/images/about_center/2.jpg"
              alt="Playback Theatre performers on stage"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
