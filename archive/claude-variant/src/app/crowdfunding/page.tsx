"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const tierLabels = ["I", "II", "III", "IV"];

export default function CrowdfundingPage() {
  const { locale } = useLanguage();
  const t = translations.crowdfunding;

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-text-primary)] mb-4">
            {t.title[locale]}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {t.subtitle[locale]}
          </p>
        </div>

        {/* Intro */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed text-center">
            {t.intro[locale]}
          </p>
        </div>

        {/* Tiers */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-[var(--color-text-primary)] text-center mb-12">
            {t.tiersTitle[locale]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.tiers.map((tier, i) => (
              <div
                key={i}
                className={`p-8 border flex flex-col ${
                  i === 3
                    ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                    : "border-[var(--color-border)]"
                }`}
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                {/* Tier label + name + price */}
                <div className="mb-6">
                  <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
                    {locale === "ka" ? "საფეხური" : "Tier"} {tierLabels[i]}
                  </p>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-medium text-[var(--color-text-primary)]">
                      {tier.name[locale]}
                    </h3>
                    <span
                      className="text-2xl font-light shrink-0"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {tier.price[locale]}
                    </span>
                  </div>
                </div>

                {/* Perks */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.perks.map((perk, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="text-[var(--color-accent)] mt-0.5 shrink-0">
                        &#x2713;
                      </span>
                      {perk[locale]}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`mailto:tsisa.cholokashvili@gmail.com?subject=${encodeURIComponent(locale === "ka" ? "მხარდაჭერა — " + tier.name.ka.replace(/[^\u10A0-\u10FF\s]/g, "").trim() : "Support — " + tier.name.en.replace(/[^\w\s]/g, "").trim())}`}
                  className={`inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
                    i === 3
                      ? "bg-[var(--color-button-bg)] text-[var(--color-button-text)] hover:opacity-85"
                      : "bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] border border-[var(--color-button-secondary-border)] hover:opacity-75"
                  }`}
                >
                  {t.cta[locale]}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-[var(--color-text-muted)] opacity-60 mt-8">
          {t.note[locale]}
        </p>
      </div>
    </div>
  );
}
