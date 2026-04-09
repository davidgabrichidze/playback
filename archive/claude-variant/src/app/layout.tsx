import type { Metadata } from "next";
import { Inter, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "ქართული ფლეიბექ თეატრის ცენტრი | Georgian Playback Theatre Center",
  description:
    "Playback Theatre is a space where real human stories come alive on stage. Join performances, courses, and workshops in Tbilisi, Georgia.",
  keywords: [
    "playback theatre",
    "ფლეიბექ თეატრი",
    "Georgia",
    "Tbilisi",
    "improvisation",
    "theatre",
    "იმპროვიზაცია",
    "თეატრი",
  ],
  openGraph: {
    title: "Georgian Playback Theatre Center",
    description: "We play your stories back to you.",
    siteName: "Georgian Playback Theatre",
    locale: "ka_GE",
    alternateLocale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={`${inter.variable} ${notoGeorgian.variable}`}>
      <body className="font-[var(--font-noto-georgian)] antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ThemeSwitcher />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
