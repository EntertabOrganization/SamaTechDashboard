import type { Metadata } from "next";
import { Montserrat, Noto_Sans_Arabic, Quicksand } from "next/font/google";
import "./globals.css";

// The same fonts as the SAMATECHS website (SamaTech/app/layout.tsx).
const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SAMATECHS Dashboard",
  description: "SAMATECHS CMS dashboard for managing consultations, contact messages, availability and users.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${montserrat.variable} ${quicksand.variable} ${arabic.variable} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
