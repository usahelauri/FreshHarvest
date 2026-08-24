import type { Metadata, Viewport } from "next";
import { Black_Ops_One, Golos_Text, Onest, Russo_One } from "next/font/google";
import "./globals.css";

const display = Russo_One({ variable: "--font-display", subsets: ["latin", "cyrillic"], weight: "400" });
const body = Onest({ variable: "--font-body", subsets: ["latin", "cyrillic"] });
const sub = Golos_Text({ variable: "--font-sub", subsets: ["latin", "cyrillic"] });
const accent = Black_Ops_One({ variable: "--font-accent", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Fresh Harvest — коммерческое предложение",
  description: "Пюре и сиропы для ресторанов, баров и кофеен. Бесплатные образцы и поставки по всей России.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#191A19" },
    { media: "(prefers-color-scheme: light)", color: "#F5F4EE" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body data-theme="dark" className={`${display.variable} ${body.variable} ${sub.variable} ${accent.variable}`}>{children}</body></html>;
}
