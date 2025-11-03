import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdSenseScript from "@/components/ads/AdSenseScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devtools-hub.vercel.app'),
  title: {
    default: "DevTools Hub - Free Online Developer Tools",
    template: "%s | DevTools Hub",
  },
  description: "Free online developer tools with the best UX/DX. JSON formatter, RegExp tester, Base64 encoder/decoder, JWT debugger, and more. No login required.",
  keywords: [
    "developer tools",
    "json formatter online",
    "regex tester online",
    "base64 encode decode",
    "jwt debugger",
    "unix timestamp converter",
    "url encoder",
    "uuid generator",
    "hash generator",
    "color converter",
    "qr code generator",
    "online tools",
    "free tools",
    "web developer tools",
  ],
  authors: [{ name: "DevTools Hub" }],
  creator: "DevTools Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devtools-hub.vercel.app",
    title: "DevTools Hub - Free Online Developer Tools",
    description: "Free online developer tools with the best UX/DX. JSON formatter, RegExp tester, Base64 encoder/decoder, and more.",
    siteName: "DevTools Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub - Free Online Developer Tools",
    description: "Free online developer tools with the best UX/DX. JSON formatter, RegExp tester, Base64 encoder/decoder, and more.",
    creator: "@devtoolshub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
