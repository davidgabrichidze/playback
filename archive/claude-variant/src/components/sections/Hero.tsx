"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";

export default function Hero() {
  const { locale } = useLanguage();
  const t = translations.hero;
  const perf = translations.performanceBanner;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/general/hero.jpg')",
        }}
      />
      {/* Stronger dark overlay for readability */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4 tracking-tight">
          {t.title[locale]}
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-6 tracking-wide">
          {t.subtitle[locale]}
        </p>
        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.description[locale]}
        </p>

        {/* Upcoming performance card */}
        <div className="max-w-xl mx-auto mb-10 border border-white/20 bg-white/5 backdrop-blur-sm p-6 md:p-8">
          <p className="text-xs tracking-widest uppercase text-white/50 mb-3">
            {t.nextPerformanceLabel[locale]}
          </p>
          <p className="text-lg md:text-xl font-light text-white mb-1">
            {perf.date[locale]}
          </p>
          <p className="text-sm text-white/60 mb-1">
            {perf.time[locale]} &middot; {perf.location[locale]}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/performance"
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide uppercase rounded-none transition-all duration-200 bg-white text-black hover:opacity-90"
          >
            {t.ctaPrimary[locale]}
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide uppercase rounded-none transition-all duration-200 border border-white text-white hover:bg-white/10"
          >
            {t.ctaSecondary[locale]}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-12 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
