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
  title: "研究文章博客",
  description: "发布研究文章的博客",
  // Google Search Console 验证码
  verification: {
    google: "nbu48i_MwgaVjs9YScEICXs9sInbU9Dy36T6twPHQQc",
  },
};

import Footer from "./components/Footer";
import LanguageSwitch from "./components/LanguageSwitch";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative`}
      >
        {/* Global Navigation / Language Switch */}
        <div className="absolute top-6 right-6 z-50">
          <React.Suspense fallback={null}>
            <LanguageSwitch />
          </React.Suspense>
        </div>

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
