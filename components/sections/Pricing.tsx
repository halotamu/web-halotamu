"use client";

import {useEffect, useMemo, useState} from "react";
import {Container} from "@/components/ui/Container";
import {WhatsAppButton} from "@/components/ui/WhatsAppButton";
import {SectionHeader} from "./SectionHeader";
import {useMessages} from "@/lib/i18n/provider";
import {cn} from "@/lib/utils/cn";
import {fetchPublicPlans, type PlanBillingCycle, type PublicPlan} from "@/lib/api/plans";

// Display-model that decouples the JSX below from either data source (API or
// i18n fallback). Keeps the existing visual language intact.
type DisplayPlan = {
    key: string;
    name: string;
    tagline: string;
    priceLabel: string;
    cycleSuffix: string;
    limit: string;
    features: string[];
    cta: string;
    waMessage: string;
    popular: boolean;
    trialLabel?: string;
    color?: string;
};

const fallbackWaTemplate = (planName: string) =>
    `Halo halotamu, saya tertarik dengan paket ${planName}. Boleh dibantu konsultasi?`;

export function Pricing() {
    const messages = useMessages();
    const m = messages.pricing;

    const planMessages = [
        messages.whatsapp.pricingStarter,
        messages.whatsapp.pricingGrowth,
        messages.whatsapp.pricingPro,
    ];

    const [livePlans, setLivePlans] = useState<PublicPlan[] | null>(null);
    const [loadFailed, setLoadFailed] = useState(false);
    const [cycle, setCycle] = useState<PlanBillingCycle>("monthly");

    useEffect(() => {
        let cancelled = false;
        fetchPublicPlans()
            .then((plans) => {
                if (cancelled) return;
                if (plans && plans.length > 0) {
                    setLivePlans(plans);
                    setLoadFailed(false);
                } else {
                    setLoadFailed(true);
                }
            })
            .catch(() => {
                if (cancelled) return;
                setLoadFailed(true);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const availableCycles = useMemo(() => {
        if (!livePlans) return [] as PlanBillingCycle[];
        const seen = new Set<PlanBillingCycle>();
        for (const plan of livePlans) {
            // Lifetime plans show up alongside whichever toggle is active — they
            // don't need their own "lifetime" toggle.
            if (plan.billing_cycle === "lifetime") continue;
            seen.add(plan.billing_cycle);
        }
        return Array.from(seen);
    }, [livePlans]);

    const showToggle = availableCycles.includes("monthly") && availableCycles.includes("yearly");

    // Reset toggle if the currently selected cycle isn't offered.
    useEffect(() => {
        if (livePlans && !availableCycles.includes(cycle) && availableCycles.length > 0) {
            setCycle(availableCycles[0]);
        }
    }, [availableCycles, cycle, livePlans]);

    const visiblePlans: DisplayPlan[] = useMemo(() => {
        if (livePlans && livePlans.length > 0) {
            return livePlans
                .filter((p) => p.billing_cycle === cycle || p.billing_cycle === "lifetime")
                .map((p) => apiPlanToDisplay(p, m, cycle));
        }
        // Fallback: bundled i18n plans
        return m.plans.map((plan, index): DisplayPlan => ({
            key: plan.id,
            name: plan.name,
            tagline: plan.tagline,
            priceLabel: plan.amount,
            cycleSuffix: m.perMonthSuffix,
            limit: plan.limit,
            features: plan.features,
            cta: plan.cta,
            waMessage: planMessages[index] || fallbackWaTemplate(plan.name),
            popular: "popular" in plan && plan.popular === true,
        }));
    }, [livePlans, m, cycle, planMessages]);

    return (
        <section id="pricing" className="bg-slate-50 py-20 sm:py-24">
            <Container className="space-y-12">
                <SectionHeader eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle}/>

                <div
                    className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center">
                    <div className="flex flex-col gap-1">
                        <span
                            className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 self-start">
                            {m.setup.label}
                        </span>
                        <p className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.6rem]">
                            {m.setup.amount}{" "}
                            <span className="text-sm font-medium text-slate-500">{m.setup.frequency}</span>
                        </p>
                    </div>
                    <p className="text-sm text-slate-600 lg:text-right">{m.setup.description}</p>
                </div>

                <div>
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {m.subscriptionLabel}
                        </p>
                        {showToggle ? (
                            <div
                                role="tablist"
                                aria-label={m.subscriptionLabel}
                                className="inline-flex rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold shadow-sm"
                            >
                                {(["monthly", "yearly"] as const).map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        role="tab"
                                        aria-selected={cycle === c}
                                        onClick={() => setCycle(c)}
                                        className={cn(
                                            "rounded-full px-3 py-1 transition",
                                            cycle === c
                                                ? "bg-emerald-600 text-white shadow"
                                                : "text-slate-600 hover:text-slate-900",
                                        )}
                                    >
                                        {c === "monthly" ? m.billingMonthly : m.billingYearly}
                                    </button>
                                ))}
                            </div>
                        ) : null}
                        {loadFailed ? (
                            <p className="text-xs text-amber-600">{m.loadError}</p>
                        ) : null}
                    </div>

                    <div className="mt-5 grid gap-5 md:grid-cols-3">
                        {visiblePlans.map((plan) => (
                            <article
                                key={plan.key}
                                className={cn(
                                    "relative flex flex-col gap-5 rounded-3xl border bg-white p-6 shadow-sm transition",
                                    plan.popular
                                        ? "border-emerald-300 shadow-emerald-100/80 ring-1 ring-emerald-200 md:-translate-y-2"
                                        : "border-slate-200 hover:-translate-y-1 hover:shadow-md",
                                )}
                            >
                                {plan.popular ? (
                                    <span
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow">
                                        {m.popularBadge}
                                    </span>
                                ) : null}
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                                    <p className="text-sm text-slate-600">{plan.tagline}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="flex items-baseline gap-1 text-slate-900">
                                        <span className="text-base font-medium text-slate-500">{m.currency}</span>
                                        <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                            {plan.priceLabel}
                                        </span>
                                        <span className="text-sm font-medium text-slate-500">{plan.cycleSuffix}</span>
                                    </p>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                                        {plan.limit}
                                    </p>
                                    {plan.trialLabel ? (
                                        <p className="text-xs text-amber-700">{plan.trialLabel}</p>
                                    ) : null}
                                </div>
                                <ul className="space-y-2 text-sm text-slate-700">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex gap-2">
                                            <CheckIcon
                                                className={cn(
                                                    "mt-0.5 h-4 w-4 shrink-0",
                                                    plan.popular ? "text-emerald-600" : "text-emerald-500",
                                                )}
                                            />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto pt-2">
                                    <WhatsAppButton
                                        label={plan.cta}
                                        message={plan.waMessage}
                                        source="pricing"
                                        variant={plan.popular ? "primary" : "secondary"}
                                        className="w-full"
                                    />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 text-center">
                    <p className="max-w-2xl text-sm text-slate-500">{m.footnote}</p>
                    <WhatsAppButton
                        label={m.consultCta}
                        message={messages.whatsapp.pricing}
                        source="pricing"
                        variant="ghost"
                    />
                </div>
            </Container>
        </section>
    );
}

type PricingMessages = ReturnType<typeof useMessages>["pricing"];

function apiPlanToDisplay(
    plan: PublicPlan,
    m: PricingMessages,
    activeCycle: PlanBillingCycle,
): DisplayPlan {
    const isCustom = plan.slug === "enterprise" || (plan.price === 0 && plan.billing_cycle !== "lifetime");
    const priceLabel = formatPriceLabel(plan, m, isCustom);
    const cycleSuffix = formatCycleSuffix(plan, m, isCustom, activeCycle);
    const limit = formatLimitLabel(plan, m);
    const cta = isCustom
        ? m.consultCta
        : formatCtaLabel(plan.title);
    const waMessage = fallbackWaTemplate(plan.title);
    const trialLabel =
        plan.trial_days > 0 ? m.trialLabel.replace("{days}", String(plan.trial_days)) : undefined;

    return {
        key: plan.id,
        name: plan.title,
        tagline: plan.subtitle || "",
        priceLabel,
        cycleSuffix,
        limit,
        features: plan.features || [],
        cta,
        waMessage,
        popular: plan.is_popular,
        trialLabel,
        color: plan.color,
    };
}

function formatPriceLabel(plan: PublicPlan, m: PricingMessages, isCustom: boolean): string {
    if (isCustom) return m.customPriceLabel;
    if (plan.price === 0) return m.freeLabel;
    return new Intl.NumberFormat("id-ID").format(plan.price);
}

function formatCycleSuffix(
    plan: PublicPlan,
    m: PricingMessages,
    isCustom: boolean,
    activeCycle: PlanBillingCycle,
): string {
    if (isCustom || plan.price === 0) return "";
    if (plan.billing_cycle === "yearly") return m.perYearSuffix;
    if (plan.billing_cycle === "lifetime") return m.lifetimeSuffix;
    // monthly (default) — also covers the case where activeCycle is monthly
    void activeCycle;
    return m.perMonthSuffix;
}

function formatLimitLabel(plan: PublicPlan, m: PricingMessages): string {
    if (plan.max_units === 0) return m.limitUnlimitedUnits;
    return m.limitTemplateUnits.replace("{units}", String(plan.max_units));
}

function formatCtaLabel(planTitle: string): string {
    return `Konsultasi paket ${planTitle}`;
}

function CheckIcon({className}: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth={2.4}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5l3.5 3.5L16 6"/>
        </svg>
    );
}
