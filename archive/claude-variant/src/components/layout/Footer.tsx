"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import Link from "next/link";

const sectionLinks = [
  { id: "what-is", label: translations.nav.playback },
  { id: "gallery", label: translations.nav.gallery },
  { id: "team", label: translations.nav.team },
  { id: "ethics", label: translations.nav.ethics },
];

const pageLinks = [
  { href: "/about", label: translations.nav.about },
  { href: "/performance", label: translations.nav.performance },
  { href: "/programs", label: translations.nav.programs },
  { href: "/crowdfunding", label: translations.nav.crowdfunding },
];

export default function Footer() {
  const { locale } = useLanguage();
  const t = translations.footer;

  return (
    <footer
      className="relative px-6 md:px-12 lg:px-20 py-16"
      style={{
        backgroundColor: "var(--color-footer-bg)",
        color: "var(--color-footer-text)",
      }}
    >
      {/* Background group photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
        style={{ backgroundImage: "url('/images/general/footer.jpg')" }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest opacity-50 mb-4">
              {t.contact[locale]}
            </h4>
            <div className="space-y-2 text-sm opacity-80">
              <a
                href={`mailto:${t.email}?subject=${encodeURIComponent(locale === "ka" ? "შეკითხვა — ფლეიბექ თეატრი" : "Inquiry — Playback Theatre")}`}
                className="block hover:opacity-100 transition-opacity"
              >
                {t.email}
              </a>
              <a
                href={`https://wa.me/${t.phone.replace(/\s|\+/g, "")}`}
                className="block hover:opacity-100 transition-opacity"
              >
                {t.phone}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest opacity-50 mb-4">
              {t.navigation[locale]}
            </h4>
            <div className="space-y-2 text-sm opacity-80">
              {sectionLinks.map((item) => (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className="block hover:opacity-100 transition-opacity"
                >
                  {item.label[locale]}
                </Link>
              ))}
              {pageLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block hover:opacity-100 transition-opacity"
                >
                  {item.label[locale]}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Community */}
          <div>
            <h4 className="text-xs uppercase tracking-widest opacity-50 mb-4">
              {t.social[locale]}
            </h4>
            <div className="space-y-2 text-sm opacity-80">
              <a
                href="https://www.facebook.com/groups/playbacktheatregeorgia"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-100 transition-opacity"
              >
                {t.facebook[locale]}
              </a>
              <a
                href="https://www.iptn.info"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-100 transition-opacity"
              >
                {t.iptn[locale]}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-current/10">
          <p className="text-xs opacity-40">{t.rights[locale]}</p>
        </div>
      </div>
    </footer>
  );
}
