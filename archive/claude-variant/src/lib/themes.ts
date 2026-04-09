export type ThemeScheme = "bw" | "warm" | "cultural" | "hybrid";
export type ThemeMode = "light" | "dark";
export type ThemeId = `${ThemeScheme}-${ThemeMode}`;

export interface ThemeTokens {
  "--color-primary": string;
  "--color-background": string;
  "--color-surface": string;
  "--color-accent": string;
  "--color-text-primary": string;
  "--color-text-secondary": string;
  "--color-text-muted": string;
  "--color-border": string;
  "--color-overlay": string;
  "--color-button-bg": string;
  "--color-button-text": string;
  "--color-button-secondary-bg": string;
  "--color-button-secondary-text": string;
  "--color-button-secondary-border": string;
  "--color-nav-bg": string;
  "--color-footer-bg": string;
  "--color-footer-text": string;
  "--color-quote-bg": string;
}

export const themeLabels: Record<ThemeScheme, { ka: string; en: string }> = {
  bw: { ka: "შავი & თეთრი", en: "Black & White" },
  warm: { ka: "თბილი", en: "Warm" },
  cultural: { ka: "კულტურული", en: "Cultural" },
  hybrid: { ka: "ჰიბრიდი", en: "Hybrid" },
};

export const themes: Record<ThemeId, ThemeTokens> = {
  // ──────────────────────────────────────
  // Option 1: Black & White (Editorial Theatre)
  // ──────────────────────────────────────
  "bw-light": {
    "--color-primary": "#000000",
    "--color-background": "#FFFFFF",
    "--color-surface": "#F5F5F5",
    "--color-accent": "#666666",
    "--color-text-primary": "#000000",
    "--color-text-secondary": "#333333",
    "--color-text-muted": "#999999",
    "--color-border": "#E0E0E0",
    "--color-overlay": "rgba(0, 0, 0, 0.55)",
    "--color-button-bg": "#000000",
    "--color-button-text": "#FFFFFF",
    "--color-button-secondary-bg": "transparent",
    "--color-button-secondary-text": "#000000",
    "--color-button-secondary-border": "#000000",
    "--color-nav-bg": "rgba(255, 255, 255, 0.92)",
    "--color-footer-bg": "#0A0A0A",
    "--color-footer-text": "#FFFFFF",
    "--color-quote-bg": "rgba(0, 0, 0, 0.03)",
  },
  "bw-dark": {
    "--color-primary": "#FFFFFF",
    "--color-background": "#0A0A0A",
    "--color-surface": "#161616",
    "--color-accent": "#999999",
    "--color-text-primary": "#FFFFFF",
    "--color-text-secondary": "#CCCCCC",
    "--color-text-muted": "#666666",
    "--color-border": "#2A2A2A",
    "--color-overlay": "rgba(0, 0, 0, 0.7)",
    "--color-button-bg": "#FFFFFF",
    "--color-button-text": "#000000",
    "--color-button-secondary-bg": "transparent",
    "--color-button-secondary-text": "#FFFFFF",
    "--color-button-secondary-border": "#FFFFFF",
    "--color-nav-bg": "rgba(10, 10, 10, 0.92)",
    "--color-footer-bg": "#161616",
    "--color-footer-text": "#FFFFFF",
    "--color-quote-bg": "rgba(255, 255, 255, 0.04)",
  },

  // ──────────────────────────────────────
  // Option 2: Warm Minimalism
  // ──────────────────────────────────────
  "warm-light": {
    "--color-primary": "#2B2B2B",
    "--color-background": "#F5F3EF",
    "--color-surface": "#EBE8E2",
    "--color-accent": "#B67C52",
    "--color-text-primary": "#2B2B2B",
    "--color-text-secondary": "#4A4A4A",
    "--color-text-muted": "#8A8A8A",
    "--color-border": "#D9D5CD",
    "--color-overlay": "rgba(43, 43, 43, 0.55)",
    "--color-button-bg": "#2B2B2B",
    "--color-button-text": "#F5F3EF",
    "--color-button-secondary-bg": "transparent",
    "--color-button-secondary-text": "#2B2B2B",
    "--color-button-secondary-border": "#2B2B2B",
    "--color-nav-bg": "rgba(245, 243, 239, 0.92)",
    "--color-footer-bg": "#2B2B2B",
    "--color-footer-text": "#F5F3EF",
    "--color-quote-bg": "rgba(43, 43, 43, 0.04)",
  },
  "warm-dark": {
    "--color-primary": "#F5F3EF",
    "--color-background": "#1C1A17",
    "--color-surface": "#262320",
    "--color-accent": "#D4956A",
    "--color-text-primary": "#F5F3EF",
    "--color-text-secondary": "#C8C4BC",
    "--color-text-muted": "#7A756D",
    "--color-border": "#3A3632",
    "--color-overlay": "rgba(28, 26, 23, 0.7)",
    "--color-button-bg": "#F5F3EF",
    "--color-button-text": "#1C1A17",
    "--color-button-secondary-bg": "transparent",
    "--color-button-secondary-text": "#F5F3EF",
    "--color-button-secondary-border": "#F5F3EF",
    "--color-nav-bg": "rgba(28, 26, 23, 0.92)",
    "--color-footer-bg": "#262320",
    "--color-footer-text": "#F5F3EF",
    "--color-quote-bg": "rgba(245, 243, 239, 0.04)",
  },

  // ──────────────────────────────────────
  // Option 3: Cultural Modern
  // ──────────────────────────────────────
  "cultural-light": {
    "--color-primary": "#1F2A44",
    "--color-background": "#F7F8FA",
    "--color-surface": "#EDEEF2",
    "--color-accent": "#8A6A55",
    "--color-text-primary": "#1F2A44",
    "--color-text-secondary": "#3D4A63",
    "--color-text-muted": "#8891A3",
    "--color-border": "#D6D9E0",
    "--color-overlay": "rgba(31, 42, 68, 0.55)",
    "--color-button-bg": "#1F2A44",
    "--color-button-text": "#F7F8FA",
    "--color-button-secondary-bg": "transparent",
    "--color-button-secondary-text": "#1F2A44",
    "--color-button-secondary-border": "#1F2A44",
    "--color-nav-bg": "rgba(247, 248, 250, 0.92)",
    "--color-footer-bg": "#1F2A44",
    "--color-footer-text": "#F7F8FA",
    "--color-quote-bg": "rgba(31, 42, 68, 0.04)",
  },
  "cultural-dark": {
    "--color-primary": "#E8EAF0",
    "--color-background": "#0F1520",
    "--color-surface": "#1A2030",
    "--color-accent": "#B68A6D",
    "--color-text-primary": "#E8EAF0",
    "--color-text-secondary": "#B0B6C4",
    "--color-text-muted": "#5E6678",
    "--color-border": "#2A3248",
    "--color-overlay": "rgba(15, 21, 32, 0.7)",
    "--color-button-bg": "#E8EAF0",
    "--color-button-text": "#0F1520",
    "--color-button-secondary-bg": "transparent",
    "--color-button-secondary-text": "#E8EAF0",
    "--color-button-secondary-border": "#E8EAF0",
    "--color-nav-bg": "rgba(15, 21, 32, 0.92)",
    "--color-footer-bg": "#1A2030",
    "--color-footer-text": "#E8EAF0",
    "--color-quote-bg": "rgba(232, 234, 240, 0.04)",
  },

  // ──────────────────────────────────────
  // Option 4: Hybrid (Cultural Warmth)
  // ──────────────────────────────────────
  "hybrid-light": {
    "--color-primary": "#1F2A44",
    "--color-background": "#F5F3EF",
    "--color-surface": "#EBE8E2",
    "--color-accent": "#B67C52",
    "--color-text-primary": "#1F2A44",
    "--color-text-secondary": "#3D4A63",
    "--color-text-muted": "#8891A3",
    "--color-border": "#D9D5CD",
    "--color-overlay": "rgba(31, 42, 68, 0.55)",
    "--color-button-bg": "#1F2A44",
    "--color-button-text": "#F5F3EF",
    "--color-button-secondary-bg": "transparent",
    "--color-button-secondary-text": "#1F2A44",
    "--color-button-secondary-border": "#1F2A44",
    "--color-nav-bg": "rgba(245, 243, 239, 0.92)",
    "--color-footer-bg": "#1F2A44",
    "--color-footer-text": "#F5F3EF",
    "--color-quote-bg": "rgba(31, 42, 68, 0.04)",
  },
  "hybrid-dark": {
    "--color-primary": "#E8EAF0",
    "--color-background": "#1A1714",
    "--color-surface": "#252220",
    "--color-accent": "#D4956A",
    "--color-text-primary": "#E8EAF0",
    "--color-text-secondary": "#B0B6C4",
    "--color-text-muted": "#6E7585",
    "--color-border": "#3A3632",
    "--color-overlay": "rgba(26, 23, 20, 0.7)",
    "--color-button-bg": "#E8EAF0",
    "--color-button-text": "#1A1714",
    "--color-button-secondary-bg": "transparent",
    "--color-button-secondary-text": "#E8EAF0",
    "--color-button-secondary-border": "#E8EAF0",
    "--color-nav-bg": "rgba(26, 23, 20, 0.92)",
    "--color-footer-bg": "#252220",
    "--color-footer-text": "#E8EAF0",
    "--color-quote-bg": "rgba(232, 234, 240, 0.04)",
  },
};

export const schemeColors: Record<ThemeScheme, string> = {
  bw: "#000000",
  warm: "#B67C52",
  cultural: "#1F2A44",
  hybrid: "#6B5A4E",
};
