"use client";

import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const galleryImages = Array.from({ length: 25 }, (_, i) => ({
  src: `/images/gallery/${i + 1}.jpg`,
}));

const INITIAL_COUNT = 8;

export default function Gallery() {
  const { locale } = useLanguage();
  const t = translations.gallery;
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, INITIAL_COUNT);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
      );
    }
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <>
      <section
        id="gallery"
        className="scroll-mt-20 py-20 md:py-28"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[var(--color-text-primary)] text-center mb-4">
            {t.sectionTitle[locale]}
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-16 text-sm">
            {t.description[locale]}
          </p>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {visibleImages.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <div className="overflow-hidden">
                  <img
                    src={img.src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Show more / less toggle */}
          {galleryImages.length > INITIAL_COUNT && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide uppercase border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-all duration-200"
                style={{ backgroundColor: "transparent" }}
              >
                {showAll ? t.showLess[locale] : t.showMore[locale]}
                <span
                  className={`inline-block transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
                >
                  &#8595;
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors text-3xl"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-6 text-white/50 text-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors text-4xl"
            aria-label="Previous"
          >
            &#8249;
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex].src}
              alt={`Gallery ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors text-4xl"
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
