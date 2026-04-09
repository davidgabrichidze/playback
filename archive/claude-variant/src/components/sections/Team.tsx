"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import SectionWrapper from "@/components/ui/SectionWrapper";

const memberPhotos = [
  "/images/team/tsisia-cholokashvili.jpg",
  "/images/team/george-rusetsky.jpg",
  "/images/team/tea-chubinidze.jpg",
];

export default function Team() {
  const { locale } = useLanguage();
  const t = translations.team;

  return (
    <SectionWrapper id="team">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text-primary)] text-center mb-16">
        {t.sectionTitle[locale]}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
        {t.members.map((member, i) => (
          <div key={i} className="text-center">
            {/* Photo */}
            <div className="w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden">
              <img
                src={memberPhotos[i]}
                alt={member.name.en}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-1">
              {member.name[locale]}
            </h3>
            <p className="text-sm uppercase tracking-widest text-[var(--color-accent)] mb-4">
              {member.role[locale]}
            </p>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
              {member.bio[locale]}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
