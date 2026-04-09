"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function AboutCenter() {
  const { locale } = useLanguage();
  const t = translations.aboutCenter;

  return (
    <SectionWrapper id="about">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text-primary)] text-center mb-12">
          {t.sectionTitle[locale]}
        </h2>

        <div className="space-y-6">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {t.founded[locale]}
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed font-medium">
            {t.mission[locale]}
          </p>

          <div className="pt-4">
            <h3 className="text-sm uppercase tracking-widest text-[var(--color-accent)] mb-6">
              {t.offersTitle[locale]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.offers.map((offer, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                  <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {offer[locale]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            {/* Photo from about_center */}
            <div className="aspect-[16/7] overflow-hidden">
              <img
                src="/images/about_center/1.jpg"
                alt="Georgian Playback Theatre Center"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <p className="text-center text-lg text-[var(--color-text-primary)] font-medium pt-4 italic">
            {t.welcome[locale]}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
