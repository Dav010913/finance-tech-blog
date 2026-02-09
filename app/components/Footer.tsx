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
        <footer className="w-full max-w-[65ch] mx-auto px-6 py-12 border-t border-slate-100 flex flex-col gap-6 text-slate-400 font-mono">
            {/* Disclaimer */}
            <div className="text-[11px] text-center sm:text-left">
                {disclaimer}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center text-xs gap-4">
                {/* Copyright */}
                <div>&copy; 2026 Alpha Research Lab</div>

                {/* Social Links */}
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-baseline">
                    <span className="hover:text-slate-900 transition-colors cursor-default">
                        alpha.research.lab.2026@gmail.com
                    </span>
                    <a
                        href="https://x.com/AlphaResLab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-slate-900 transition-colors"
                    >
                        X (Twitter)
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
