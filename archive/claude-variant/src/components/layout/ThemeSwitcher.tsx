"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { themeLabels, schemeColors, type ThemeScheme } from "@/lib/themes";
import clsx from "clsx";

const schemes: ThemeScheme[] = ["bw", "warm", "cultural", "hybrid"];

export default function ThemeSwitcher() {
  const { scheme, mode, setScheme, toggleMode } = useTheme();
  const { locale } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="rounded-lg p-4 shadow-xl border border-[var(--color-border)]"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
            {locale === "ka" ? "თემა" : "Theme"}
          </p>

          <div className="flex gap-2 mb-4">
            {schemes.map((s) => (
              <button
                key={s}
                onClick={() => setScheme(s)}
                className={clsx(
                  "w-8 h-8 rounded-full border-2 transition-all duration-200",
                  scheme === s
                    ? "border-[var(--color-text-primary)] scale-110"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
                style={{ backgroundColor: schemeColors[s] }}
                title={themeLabels[s][locale]}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMode}
              className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {mode === "light" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              {mode === "light"
                ? locale === "ka" ? "ღამის რეჟიმი" : "Dark Mode"
                : locale === "ka" ? "დღის რეჟიმი" : "Light Mode"}
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
            <p className="text-[10px] text-[var(--color-text-muted)]">
              {themeLabels[scheme][locale]} — {mode === "light" ? "Light" : "Dark"}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center border border-[var(--color-border)] transition-transform hover:scale-105"
        style={{ backgroundColor: "var(--color-background)" }}
        aria-label="Theme settings"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-primary)"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    </div>
  );
}
