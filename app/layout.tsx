import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevTools Hub - Developer Tools Collection",
  description: "Free online developer tools with the best UX/DX. JSON formatter, RegExp tester, Base64 encoder/decoder, and more.",
  keywords: ["developer tools", "json formatter", "regex tester", "base64", "online tools"],
  openGraph: {
    title: "DevTools Hub - Developer Tools Collection",
    description: "Free online developer tools with the best UX/DX",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
