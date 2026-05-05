import type { Metadata } from "next";
import { Bree_Serif, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LayoutShell } from "@/components/LayoutShell";

const breeSerif = Bree_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bree-serif",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TechBridge",
    template: "%s | TechBridge",
  },
  description: "Connecting people who need technology with people who have it to give.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${breeSerif.variable} ${sourceSans3.variable}`}>
      <body className="font-body antialiased bg-evergreen-50 text-evergreen-900">
        <LanguageProvider>
          <LayoutShell>{children}</LayoutShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
