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
        <footer className="w-full max-w-[65ch] mx-auto px-6 py-12 border-t border-slate-100 flex flex-col items-start space-y-4 text-xs text-slate-400 font-mono leading-relaxed">
            {/* Row 1: Disclaimer */}
            <div className="text-left">
                {disclaimer}
            </div>

            {/* Row 2: Identity & Social */}
            <div className="flex flex-wrap items-center gap-4">
                <span>&copy; 2026 Alpha Research Lab</span>
                <div className="flex gap-4">
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
