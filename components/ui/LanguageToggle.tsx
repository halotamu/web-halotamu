"use client";

import {useI18n} from "@/lib/i18n/provider";
import {cn} from "@/lib/utils/cn";

type LanguageToggleProps = {
    className?: string;
    align?: "start" | "end";
};

export function LanguageToggle({className, align = "end"}: LanguageToggleProps) {
    const {locale, setLocale, messages} = useI18n();
    const labels = messages.languageToggle;

    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold text-slate-500 shadow-sm",
                align === "start" ? "self-start" : "self-end",
                className,
            )}
            role="group"
            aria-label={labels.label}
        >
            <button
                type="button"
                onClick={() => setLocale("id")}
                aria-pressed={locale === "id"}
                className={cn(
                    "rounded-full px-3 py-1 transition",
                    locale === "id"
                        ? "bg-slate-900 text-white"
                        : "hover:text-slate-700",
                )}
            >
                {labels.id}
            </button>
            <button
                type="button"
                onClick={() => setLocale("en")}
                aria-pressed={locale === "en"}
                className={cn(
                    "rounded-full px-3 py-1 transition",
                    locale === "en"
                        ? "bg-slate-900 text-white"
                        : "hover:text-slate-700",
                )}
            >
                {labels.en}
            </button>
        </div>
    );
}
