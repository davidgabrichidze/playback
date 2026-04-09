"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import LanguageToggle from "./LanguageToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const landingNavItems = [
  { id: "what-is", label: translations.nav.playback },
  { id: "how-it-works", label: translations.nav.howItWorks },
  { id: "gallery", label: translations.nav.gallery },
  { id: "team", label: translations.nav.team },
];

const pageNavItems = [
  { href: "/about", label: translations.nav.about },
  { href: "/performance", label: translations.nav.performance },
  { href: "/programs", label: translations.nav.programs },
  { href: "/crowdfunding", label: translations.nav.crowdfunding },
];

export default function Navbar() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = landingNavItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -50% 0px", threshold: 0.1 }
    );
    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const scrollTo = (id: string) => {
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileOpen(false);
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--color-nav-bg)] backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div
          className={clsx(
            "max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between h-16 md:h-20 transition-colors duration-300",
            isHome && !scrolled && "text-white"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className={clsx(
              "font-semibold text-base tracking-wide transition-colors duration-300",
              isHome && !scrolled
                ? "text-white"
                : "text-[var(--color-text-primary)]"
            )}
          >
            <span className="font-[var(--font-noto-georgian)]">ფლეიბექ</span>
            <span className={clsx("mx-1.5", isHome && !scrolled ? "text-white/50" : "text-[var(--color-text-muted)]")}>|</span>
            <span className="text-xs tracking-widest uppercase">PT</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            {landingNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={clsx(
                  "text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-200",
                  isHome && !scrolled
                    ? activeSection === item.id
                      ? "text-white font-medium"
                      : "text-white/60 hover:text-white/90"
                    : isHome && activeSection === item.id
                      ? "text-[var(--color-text-primary)] font-medium"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                )}
              >
                {item.label[locale]}
              </button>
            ))}
            <span className={clsx("w-px h-4 flex-shrink-0", isHome && !scrolled ? "bg-white/20" : "bg-[var(--color-border)]")} />
            {pageNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-200",
                  isHome && !scrolled
                    ? "text-white/60 hover:text-white/90"
                    : pathname === item.href
                      ? "text-[var(--color-text-primary)] font-medium"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                )}
              >
                {item.label[locale]}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle overHero={isHome && !scrolled} />

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <span
                className={clsx(
                  "w-5 h-[1.5px] transition-transform duration-200",
                  isHome && !scrolled ? "bg-white" : "bg-[var(--color-text-primary)]",
                  mobileOpen && "rotate-45 translate-y-[5px]"
                )}
              />
              <span
                className={clsx(
                  "w-5 h-[1.5px] transition-opacity duration-200",
                  isHome && !scrolled ? "bg-white" : "bg-[var(--color-text-primary)]",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={clsx(
                  "w-5 h-[1.5px] transition-transform duration-200",
                  isHome && !scrolled ? "bg-white" : "bg-[var(--color-text-primary)]",
                  mobileOpen && "-rotate-45 -translate-y-[5px]"
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--color-background)] pt-20 px-8 lg:hidden overflow-y-auto">
          <div className="flex flex-col gap-5 mt-8">
            {landingNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={clsx(
                  "text-left text-2xl font-light tracking-wide transition-colors",
                  isHome && activeSection === item.id
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-muted)]"
                )}
              >
                {item.label[locale]}
              </button>
            ))}
            <div className="h-px bg-[var(--color-border)] my-2" />
            {pageNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "text-left text-2xl font-light tracking-wide transition-colors",
                  pathname === item.href
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-muted)]"
                )}
              >
                {item.label[locale]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
