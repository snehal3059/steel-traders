import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OMKARA COMMERCIAL PVT. LTD. - Premium MS Steel Products | Iron & Steel Trading | Howrah",
  description:
    "OMKARA COMMERCIAL PVT. LTD. - Howrah-based iron and steel traders. We supply high-quality MS Sheet, MS Plate, MS Beam, MS Channel, MS Angle, MS Round, and MS Hollow Pipes for construction and industrial use across India.",
  keywords:
    "OMKARA COMMERCIAL, steel traders Howrah, iron and steel West Bengal, ms sheet, ms plate, ms beam, ms channel, ms angle, ms round, ms hollow pipes, steel suppliers, steel trading, SAIL, TATA Steel",
  icons: {
    icon: "/mini.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}