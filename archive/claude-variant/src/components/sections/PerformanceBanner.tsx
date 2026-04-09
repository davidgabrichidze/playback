"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";

export default function PerformanceBanner() {
  const { locale } = useLanguage();
  const t = translations.performanceBanner;

  return (
    <section
      id="performance"
      className="scroll-mt-20 py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-button-bg)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-center mb-10 md:mb-14"
            style={{ color: "var(--color-button-text)" }}
          >
            {t.title[locale]}
          </h2>

          {/* Details row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6 md:gap-0 mb-10 md:mb-14">
            <div className="text-center md:px-8">
              <p
                className="text-xs tracking-widest uppercase mb-1.5 opacity-50"
                style={{ color: "var(--color-button-text)" }}
              >
                {locale === "ka" ? "როდის" : "When"}
              </p>
              <p
                className="text-base md:text-lg font-light"
                style={{ color: "var(--color-button-text)" }}
              >
                {t.date[locale]}
              </p>
            </div>

            <span
              className="hidden md:block w-px h-10 opacity-20"
              style={{ backgroundColor: "var(--color-button-text)" }}
            />

            <div className="text-center md:px-8">
              <p
                className="text-xs tracking-widest uppercase mb-1.5 opacity-50"
                style={{ color: "var(--color-button-text)" }}
              >
                {locale === "ka" ? "საათი" : "Time"}
              </p>
              <p
                className="text-base md:text-lg font-light"
                style={{ color: "var(--color-button-text)" }}
              >
                {t.time[locale]}
              </p>
            </div>

            <span
              className="hidden md:block w-px h-10 opacity-20"
              style={{ backgroundColor: "var(--color-button-text)" }}
            />

            <div className="text-center md:px-8">
              <p
                className="text-xs tracking-widest uppercase mb-1.5 opacity-50"
                style={{ color: "var(--color-button-text)" }}
              >
                {locale === "ka" ? "სად" : "Where"}
              </p>
              <p
                className="text-base md:text-lg font-light"
                style={{ color: "var(--color-button-text)" }}
              >
                {t.location[locale]}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/performance"
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-200"
              style={{
                backgroundColor: "var(--color-button-text)",
                color: "var(--color-button-bg)",
              }}
            >
              {t.cta[locale]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
