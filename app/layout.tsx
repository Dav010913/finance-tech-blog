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

        {/* Minimalist Footer */}
        <footer className="w-full max-w-[65ch] mx-auto px-6 py-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 font-mono gap-4">
          <div>
            &copy; 2026 Research & Insights
          </div>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">LinkedIn</a>
            <a href="mailto:contact@example.com" className="hover:text-slate-900 transition-colors">Email</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
