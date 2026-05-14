import {cn} from "@/lib/utils/cn";

export function Logo({className}: {className?: string}) {
    return (
        <span className={cn("inline-flex items-center gap-2", className)}>
            <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
            >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 11.5L12 5l8 6.5"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 10v9h12v-9"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19v-4h4v4"/>
                </svg>
            </span>
            <span className="text-base font-semibold tracking-tight text-slate-900">
                halotamu
            </span>
        </span>
    );
}
