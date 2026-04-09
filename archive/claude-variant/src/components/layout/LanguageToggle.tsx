"use client";

import { useLanguage } from "@/context/LanguageContext";
import clsx from "clsx";

export default function LanguageToggle({ overHero = false }: { overHero?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm font-medium font-[var(--font-inter)]">
      <button
        onClick={() => setLocale("ka")}
        className={clsx(
          "px-2 py-1 transition-opacity",
          overHero
            ? locale === "ka"
              ? "text-white opacity-100"
              : "text-white/40 hover:text-white/70"
            : locale === "ka"
              ? "opacity-100 text-[var(--color-text-primary)]"
              : "opacity-40 hover:opacity-70 text-[var(--color-text-muted)]"
        )}
      >
        GEO
      </button>
      <span className={overHero ? "text-white/40" : "text-[var(--color-text-muted)]"}>|</span>
      <button
        onClick={() => setLocale("en")}
        className={clsx(
          "px-2 py-1 transition-opacity",
          overHero
            ? locale === "en"
              ? "text-white opacity-100"
              : "text-white/40 hover:text-white/70"
            : locale === "en"
              ? "opacity-100 text-[var(--color-text-primary)]"
              : "opacity-40 hover:opacity-70 text-[var(--color-text-muted)]"
        )}
      >
        ENG
      </button>
    </div>
  );
}
