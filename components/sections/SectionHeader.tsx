import {cn} from "@/lib/utils/cn";

type SectionHeaderProps = {
    eyebrow: string;
    title: string;
    subtitle?: string;
    align?: "center" | "start";
    className?: string;
};

export function SectionHeader({
                                  eyebrow,
                                  title,
                                  subtitle,
                                  align = "center",
                                  className,
                              }: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-3",
                align === "center" ? "items-center text-center" : "items-start text-left",
                className,
            )}
        >
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {eyebrow}
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[2rem]">
                {title}
            </h2>
            {subtitle ? (
                <p className={cn("max-w-2xl text-base text-slate-600", align === "center" && "mx-auto")}>{subtitle}</p>
            ) : null}
        </div>
    );
}
