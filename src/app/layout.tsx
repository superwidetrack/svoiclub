import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Свои Club — Закрытое сообщество для встреч среди своих",
  description:
    "Премиальный сервис знакомств для русскоязычных эмигрантов. Психологический подбор, личное собеседование, глубокие совпадения.",
  keywords: [
    "знакомства для эмигрантов",
    "русскоязычные знакомства",
    "премиум знакомства",
    "эмигранты знакомства",
    "серьёзные отношения",
  ],
  openGraph: {
    title: "Свои Club — Закрытое сообщество для встреч среди своих",
    description:
      "Премиальный сервис знакомств для русскоязычных эмигрантов за рубежом.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
