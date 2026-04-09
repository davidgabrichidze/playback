"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function ProgramsPage() {
  const { locale } = useLanguage();
  const t = translations.programs;

  const programs = [
    {
      ...t.basic,
      featured: false,
      image: "/images/about_center/1.jpg",
    },
    {
      ...t.practitioner,
      featured: true,
      image: "/images/about_center/2.jpg",
    },
    {
      ...t.workshops,
      hours: undefined,
      items: undefined,
      featured: false,
      image: "/images/programs/1.jpg",
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-text-primary)] mb-4">
            {t.sectionTitle[locale]}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            {t.subtitle[locale]}
          </p>
        </div>

        {/* Programs */}
        <div className="space-y-20">
          {programs.map((program, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title[locale]}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                {/* Hours badge */}
                {program.hours && (
                  <div className="mb-4">
                    <span
                      className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-button-text)",
                        opacity: 0.9,
                      }}
                    >
                      {program.hours} {locale === "ka" ? "სთ" : "hrs"}
                    </span>
                  </div>
                )}

                <h2 className="text-2xl md:text-3xl font-light text-[var(--color-text-primary)] mb-4">
                  {program.title[locale]}
                </h2>

                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {program.description[locale]}
                </p>

                {/* Detailed description */}
                {"detailedDescription" in program && program.detailedDescription && (
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                    {(program.detailedDescription as { ka: string; en: string })[locale]}
                  </p>
                )}

                {/* Items */}
                {program.items && (
                  <ul className="space-y-2 mb-8">
                    {(program.items as readonly { ka: string; en: string }[]).map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: "var(--color-accent)" }}
                        />
                        {item[locale]}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Register CTA */}
                <div className="pt-2">
                  <p className="text-sm text-[var(--color-text-muted)] mb-3">
                    {t.registerForm[locale]}
                  </p>
                  <a
                    href={`mailto:tsisa.cholokashvili@gmail.com?subject=${encodeURIComponent(locale === "ka" ? `შეკითხვა — ${program.title.ka}` : `Inquiry — ${program.title.en}`)}`}
                    className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-200 bg-[var(--color-button-bg)] text-[var(--color-button-text)] hover:opacity-85"
                  >
                    {t.registerButton[locale]}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
