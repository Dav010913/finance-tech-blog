"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function LanguageSwitch() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentLang = searchParams.get("lang") === "en" ? "en" : "zh";

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === "zh") {
                params.delete(name); // Default is zh, so remove
            } else {
                params.set(name, value);
            }
            return params.toString();
        },
        [searchParams]
    );

    const switchLang = (lang: "zh" | "en") => {
        const queryString = createQueryString("lang", lang);
        router.push(pathname + (queryString ? "?" + queryString : ""));
    };

    return (
        <div className="flex items-center text-lg font-mono">
            <button
                onClick={() => switchLang("en")}
                className={`transition-colors duration-300 ${currentLang === "en"
                        ? "text-slate-900 font-semibold"
                        : "text-slate-400 hover:text-slate-900 font-normal"
                    }`}
            >
                EN
            </button>
            <span className="text-slate-200 mx-3">|</span>
            <button
                onClick={() => switchLang("zh")}
                className={`transition-colors duration-300 ${currentLang === "zh"
                        ? "text-slate-900 font-semibold"
                        : "text-slate-400 hover:text-slate-900 font-normal"
                    }`}
            >
                ZH
            </button>
        </div>
    );
}
