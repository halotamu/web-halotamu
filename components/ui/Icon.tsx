import {cn} from "@/lib/utils/cn";

export type IconName =
    | "clock"
    | "shield"
    | "phone-off"
    | "bell"
    | "tap"
    | "log"
    | "chart"
    | "buildings"
    | "lock";

const paths: Record<IconName, React.ReactNode> = {
    clock: (
        <>
            <circle cx="12" cy="12" r="9"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2"/>
        </>
    ),
    shield: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 4.5-3.4 8.6-8 9-4.6-.4-8-4.5-8-9V6l8-3z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/>
        </>
    ),
    "phone-off": (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.4 5.6A11.5 11.5 0 0 1 19 12.5a11.6 11.6 0 0 1-.5 3.4M5.5 9.4A11.6 11.6 0 0 0 5 12.5c0 1.6.3 3.2.9 4.6A2 2 0 0 0 7.7 18.5l1.6-.4a2 2 0 0 0 1.4-1.5l.4-1.6"/>
        </>
    ),
    bell: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 21a2 2 0 0 0 4 0"/>
        </>
    ),
    tap: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 11V7a3 3 0 1 1 6 0v4"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 11v3a5 5 0 0 0 10 0v-3a2 2 0 0 0-2-2"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 21l2-3"/>
        </>
    ),
    log: (
        <>
            <rect x="4" y="4" width="16" height="16" rx="3"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h8M8 13h8M8 17h5"/>
        </>
    ),
    chart: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V8M10 20V4M16 20v-8M22 20H2"/>
        </>
    ),
    buildings: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V7l6-3v17"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 21V11l8-3v13"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 12h0M14 16h0"/>
        </>
    ),
    lock: (
        <>
            <rect x="5" y="11" width="14" height="9" rx="2"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V8a4 4 0 1 1 8 0v3"/>
        </>
    ),
};

type IconProps = {
    name: IconName;
    className?: string;
};

export function Icon({name, className}: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className={cn("h-6 w-6", className)}
        >
            {paths[name]}
        </svg>
    );
}
