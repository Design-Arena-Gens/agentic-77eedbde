import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const sans = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "غلاف أسرار الثراء والكون",
  description:
    "صمم غلاف كتاب غامض يستلهم أسرار الثراء والكون مع خيارات تخصيص فنية قابلة للتحميل بصيغة صورة."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-twilight-900 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
