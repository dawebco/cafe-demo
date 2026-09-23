import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { SmoothScrollWrapper } from "@/components/ui/smooth-scroll-wrapper";
import { CursorFollower } from "@/components/ui/CursorFollower";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "TLC Cafe",
  description: "Specialty Coffee & Gourmet Pizzas",
  openGraph: {
    title: "TLC Cafe",
    description: "Specialty Coffee & Gourmet Pizzas",
    siteName: "TLC Cafe",
    type: "website",
    // TODO: Add og-image when available
    // images: [
    //   {
    //     url: "/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TLC Cafe",
    description: "Specialty Coffee & Gourmet Pizzas",
    // TODO: Add twitter image when available
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollWrapper>
          <NoiseOverlay />
          <CursorFollower />
          {children}
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
