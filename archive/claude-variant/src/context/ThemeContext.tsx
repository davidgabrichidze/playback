"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { themes, type ThemeScheme, type ThemeMode, type ThemeId } from "@/lib/themes";

interface ThemeContextType {
  scheme: ThemeScheme;
  mode: ThemeMode;
  themeId: ThemeId;
  setScheme: (s: ThemeScheme) => void;
  setMode: (m: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setSchemeState] = useState<ThemeScheme>("bw");
  const [mode, setModeState] = useState<ThemeMode>("light");

  const themeId: ThemeId = `${scheme}-${mode}`;

  const applyTheme = useCallback((id: ThemeId) => {
    const tokens = themes[id];
    if (!tokens) return;
    const root = document.documentElement;
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("pt-theme");
    if (saved) {
      try {
        const { scheme: s, mode: m } = JSON.parse(saved);
        if (s) setSchemeState(s);
        if (m) setModeState(m);
      } catch {}
    }
  }, []);

  useEffect(() => {
    applyTheme(themeId);
    localStorage.setItem("pt-theme", JSON.stringify({ scheme, mode }));
  }, [themeId, scheme, mode, applyTheme]);

  const setScheme = (s: ThemeScheme) => setSchemeState(s);
  const setMode = (m: ThemeMode) => setModeState(m);
  const toggleMode = () => setModeState((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ scheme, mode, themeId, setScheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
