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
        // If we are on home, simple push. If on article, stay on article (content won't change unless it is translated, but UI might).
        // Since content is not truly mirrored, staying on the same slug is fine (it will load the content if available, but slugs are unique... actually wait).
        // If slugs are unique, switching language on an article page might be tricky if versions have different slugs.
        // But for now, we just update the UI preference.
        router.push(pathname + (queryString ? "?" + queryString : ""));
    };

    return (
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <button
                onClick={() => switchLang("zh")}
                className={`hover:text-slate-900 transition-colors ${currentLang === "zh" ? "text-slate-900 font-bold" : ""
                    }`}
            >
                ZH
            </button>
            <span className="text-slate-300">|</span>
            <button
                onClick={() => switchLang("en")}
                className={`hover:text-slate-900 transition-colors ${currentLang === "en" ? "text-slate-900 font-bold" : ""
                    }`}
            >
                EN
            </button>
        </div>
    );
}
