"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";

export default function Join() {
  const { locale } = useLanguage();
  const t = translations.join;

  return (
    <section
      id="join"
      className="scroll-mt-20 py-20 md:py-28 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text-primary)] text-center mb-4">
          {t.title[locale]}
        </h2>
        <p className="text-center text-[var(--color-text-muted)] mb-14 text-sm">
          {t.subtitle[locale]}
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {/* Featured: Performance — clickable card */}
          <Link
            href="/performance"
            className="group block p-8 md:p-10 border-2 border-[var(--color-accent)] transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-2">
                  {t.items[0].text[locale]}
                </p>
                <h3 className="text-xl md:text-2xl font-light text-[var(--color-text-primary)]">
                  {t.items[0].title[locale]}
                </h3>
              </div>
              <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-2 shrink-0">
                {t.ctaPerformance[locale]}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </span>
            </div>
          </Link>

          {/* Secondary: Support & Facebook — clickable cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/crowdfunding"
              className="group block p-6 border border-[var(--color-border)] transition-all duration-200 hover:border-[var(--color-accent)]"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1.5">
                {t.items[1].text[locale]}
              </p>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-light text-[var(--color-text-primary)]">
                  {t.items[1].title[locale]}
                </h3>
                <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors shrink-0">&rarr;</span>
              </div>
            </Link>

            <a
              href="https://www.facebook.com/groups/playbacktheatregeorgia"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 border border-[var(--color-border)] transition-all duration-200 hover:border-[var(--color-accent)]"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1.5">
                {t.items[2].text[locale]}
              </p>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-light text-[var(--color-text-primary)]">
                  {t.items[2].title[locale]}
                </h3>
                <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors shrink-0">&rarr;</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
