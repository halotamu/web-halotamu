"use client";

import {Container} from "@/components/ui/Container";
import {WhatsAppButton} from "@/components/ui/WhatsAppButton";
import {SectionHeader} from "./SectionHeader";
import {useMessages} from "@/lib/i18n/provider";
import {cn} from "@/lib/utils/cn";

export function Pricing() {
    const messages = useMessages();
    const m = messages.pricing;

    const planMessages = [
        messages.whatsapp.pricingStarter,
        messages.whatsapp.pricingGrowth,
        messages.whatsapp.pricingPro,
    ];

    return (
        <section id="pricing" className="bg-slate-50 py-20 sm:py-24">
            <Container className="space-y-12">
                <SectionHeader eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle}/>

                <div className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center">
                    <div className="flex flex-col gap-1">
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 self-start">
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
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {m.subscriptionLabel}
                    </p>
                    <div className="mt-5 grid gap-5 md:grid-cols-3">
                        {m.plans.map((plan, index) => {
                            const popular = "popular" in plan && plan.popular === true;
                            return (
                                <article
                                    key={plan.id}
                                    className={cn(
                                        "relative flex flex-col gap-5 rounded-3xl border bg-white p-6 shadow-sm transition",
                                        popular
                                            ? "border-emerald-300 shadow-emerald-100/80 ring-1 ring-emerald-200 md:-translate-y-2"
                                            : "border-slate-200 hover:-translate-y-1 hover:shadow-md",
                                    )}
                                >
                                    {popular ? (
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow">
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
                                                {plan.amount}
                                            </span>
                                            <span className="text-sm font-medium text-slate-500">{m.perMonthSuffix}</span>
                                        </p>
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                                            {plan.limit}
                                        </p>
                                    </div>
                                    <ul className="space-y-2 text-sm text-slate-700">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex gap-2">
                                                <CheckIcon className={cn("mt-0.5 h-4 w-4 shrink-0", popular ? "text-emerald-600" : "text-emerald-500")}/>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-auto pt-2">
                                        <WhatsAppButton
                                            label={plan.cta}
                                            message={planMessages[index]}
                                            source="pricing"
                                            variant={popular ? "primary" : "secondary"}
                                            className="w-full"
                                        />
                                    </div>
                                </article>
                            );
                        })}
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

function CheckIcon({className}: {className?: string}) {
    return (
        <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth={2.4}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5l3.5 3.5L16 6"/>
        </svg>
    );
}
