"use client";

import {buildWhatsAppLink, type WhatsAppCtaSource} from "@/lib/config/site";
import {cn} from "@/lib/utils/cn";

type WhatsAppButtonProps = {
    label: string;
    message: string;
    source: WhatsAppCtaSource;
    variant?: "primary" | "secondary" | "ghost" | "white";
    size?: "md" | "lg";
    className?: string;
};

const variantClasses: Record<NonNullable<WhatsAppButtonProps["variant"]>, string> = {
    primary:
        "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 focus-visible:outline-emerald-600",
    secondary:
        "bg-white text-emerald-700 ring-1 ring-emerald-600/20 hover:bg-emerald-50 focus-visible:outline-emerald-600",
    ghost:
        "text-emerald-700 hover:bg-emerald-50 focus-visible:outline-emerald-600",
    white:
        "bg-white text-emerald-700 shadow-md shadow-emerald-900/10 hover:bg-emerald-50 focus-visible:outline-white",
};

const sizeClasses: Record<NonNullable<WhatsAppButtonProps["size"]>, string> = {
    md: "h-11 px-5 text-sm",
    lg: "h-13 px-7 text-base",
};

export function WhatsAppButton({
                                   label,
                                   message,
                                   source,
                                   variant = "primary",
                                   size = "md",
                                   className,
                               }: WhatsAppButtonProps) {
    const href = buildWhatsAppLink(message, source);

    function handleClick() {
        if (typeof window === "undefined") return;
        type AnalyticsWindow = typeof window & {
            plausible?: (event: string, options?: {props?: Record<string, string>}) => void;
            gtag?: (...args: unknown[]) => void;
        };
        const w = window as AnalyticsWindow;
        w.plausible?.("whatsapp_cta", {props: {source}});
        w.gtag?.("event", "whatsapp_cta", {source});
    }

    return (
        <a
            href={href}
            onClick={handleClick}
            target="_blank"
            rel="noreferrer"
            data-cta-source={source}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]",
                variantClasses[variant],
                sizeClasses[size],
                className,
            )}
        >
            <WhatsAppIcon className="h-5 w-5"/>
            <span>{label}</span>
        </a>
    );
}

function WhatsAppIcon({className}: {className?: string}) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="currentColor"
        >
            <path
                d="M19.077 4.928A9.953 9.953 0 0 0 12.05 2c-5.495 0-9.96 4.46-9.96 9.948 0 1.755.46 3.46 1.336 4.97L2 22l5.21-1.367a9.949 9.949 0 0 0 4.84 1.232h.004c5.494 0 9.95-4.46 9.95-9.949a9.876 9.876 0 0 0-2.927-7.988Zm-7.027 15.31a8.255 8.255 0 0 1-4.21-1.153l-.302-.18-3.093.812.825-3.014-.197-.31a8.232 8.232 0 0 1-1.262-4.395c0-4.566 3.717-8.281 8.282-8.281 2.21 0 4.288.86 5.852 2.422a8.21 8.21 0 0 1 2.43 5.86c0 4.566-3.717 8.282-8.325 8.239Zm4.532-6.197c-.246-.124-1.46-.72-1.685-.802-.226-.082-.39-.123-.554.123-.165.247-.638.802-.782.967-.144.165-.288.185-.534.062-.247-.124-1.041-.384-1.984-1.224-.733-.654-1.227-1.46-1.371-1.706-.144-.247-.015-.38.108-.504.111-.11.247-.288.37-.432.124-.144.165-.247.247-.412.082-.165.041-.309-.02-.432-.062-.123-.555-1.337-.76-1.83-.2-.48-.404-.412-.555-.418l-.473-.009c-.165 0-.432.062-.658.309-.226.247-.864.844-.864 2.057s.885 2.385 1.008 2.55c.124.165 1.74 2.66 4.221 3.73.59.255 1.05.408 1.41.523.592.188 1.13.162 1.557.099.475-.072 1.46-.597 1.667-1.173.205-.577.205-1.071.144-1.173-.062-.103-.227-.165-.473-.288Z"/>
        </svg>
    );
}
