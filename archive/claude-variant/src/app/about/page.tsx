"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function AboutPage() {
  const { locale } = useLanguage();
  const t = translations.aboutCenter;

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-28">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-text-primary)] mb-4">
            {t.sectionTitle[locale]}
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed text-center">
            {t.founded[locale]}
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed font-medium text-center">
            {t.mission[locale]}
          </p>

          {/* Offers */}
          <div className="pt-4">
            <h2 className="text-sm uppercase tracking-widest text-[var(--color-accent)] mb-6 text-center">
              {t.offersTitle[locale]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.offers.map((offer, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 border border-[var(--color-border)]"
                  style={{ backgroundColor: "var(--color-surface)" }}
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

          {/* Photo */}
          <div className="pt-6">
            <div className="aspect-[16/7] overflow-hidden">
              <img
                src="/images/about_center/1.jpg"
                alt="Georgian Playback Theatre Center"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Welcome */}
          <p className="text-center text-xl text-[var(--color-text-primary)] font-light italic pt-4">
            {t.welcome[locale]}
          </p>
        </div>
      </div>
    </div>
  );
}
