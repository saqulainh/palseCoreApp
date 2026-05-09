import type { Metadata } from "next";
import { Lexend, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Pulse Core — Your Intelligent Fitness OS",
  description:
    "Pulse Core is an AI-powered smart fitness companion that helps you build consistency, optimize recovery, and improve performance.",
  keywords: ["fitness", "AI coach", "workout tracker", "recovery", "health", "metrics", "gym", "bodybuilding"],
  authors: [{ name: "Pulse Core" }],
  openGraph: {
    title: "Pulse Core — Your Intelligent Fitness OS",
    description: "Pulse Core is an AI-powered smart fitness companion that helps you build consistency, optimize recovery, and improve performance.",
    url: "https://pulsecore.app",
    siteName: "Pulse Core",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pulse Core App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse Core — Your Intelligent Fitness OS",
    description: "Pulse Core is an AI-powered smart fitness companion that helps you build consistency, optimize recovery, and improve performance.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
      className={`dark ${lexend.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <head>
        {/* Material Symbols Outlined icon font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0A0A0F] text-[#F9FAFB] antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
