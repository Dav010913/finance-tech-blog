"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function FooterContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") === "en" ? "en" : "zh";

    const disclaimer =
        lang === "en"
            ? "Disclaimer: For research and informational purposes only. Not financial advice."
            : "免责声明：内容仅供研究参考，不构成投资建议。";

    return (
        <footer className="w-full max-w-3xl mx-auto px-6 py-12 border-t border-slate-100 flex flex-col items-start space-y-3 text-xs text-slate-500 font-mono leading-relaxed">
            {/* Row 1: Disclaimer */}
            <div className="text-left whitespace-nowrap">
                {disclaimer}
            </div>

            {/* Row 2: Identity & Social */}
            <div className="flex items-center space-x-8">
                <span>&copy; 2026 Alpha Research Lab</span>
                <a
                    href="https://x.com/AlphaResLab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 transition-colors"
                >
                    X
                </a>
                <a
                    href="https://www.linkedin.com/in/alpha-research-lab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 transition-colors"
                >
                    LinkedIn
                </a>
            </div>

            {/* Row 3: Contact */}
            <div className="text-left">
                alpha.research.lab.2026@gmail.com
            </div>
        </footer>
    );
}

export default function Footer() {
    return (
        <Suspense fallback={null}>
            <FooterContent />
        </Suspense>
    );
}
