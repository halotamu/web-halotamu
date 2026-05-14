"use client";

import {Container} from "@/components/ui/Container";
import {PhoneMockup} from "@/components/ui/PhoneMockup";
import {WhatsAppButton} from "@/components/ui/WhatsAppButton";
import {useMessages} from "@/lib/i18n/provider";

export function Hero() {
    const messages = useMessages();
    const m = messages.hero;

    return (
        <section
            id="top"
            className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white pt-12 pb-20 sm:pt-16 lg:pt-20 lg:pb-24"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 right-1/2 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl"
            />
            <Container>
                <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <div className="text-center lg:text-left">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 shadow-sm">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"/>
                            {m.tag}
                        </span>
                        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] lg:text-5xl">
                            {m.title}
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-base text-slate-600 sm:text-lg lg:mx-0">
                            {m.subtitle}
                        </p>
                        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                            <WhatsAppButton
                                label={m.primaryCta}
                                message={messages.whatsapp.hero}
                                source="hero"
                                size="lg"
                            />
                            <a
                                href="#demo"
                                className="inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold text-slate-700 transition hover:text-slate-900"
                            >
                                {m.secondaryCta}
                                <span aria-hidden="true">↓</span>
                            </a>
                        </div>
                        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500 lg:justify-start">
                            {m.trustBadges.map((badge) => (
                                <li key={badge} className="inline-flex items-center gap-2">
                                    <span aria-hidden="true" className="text-emerald-600">✓</span>
                                    {badge}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <PhoneMockup/>
                    </div>
                </div>
            </Container>
        </section>
    );
}
