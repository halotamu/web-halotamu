"use client";

import {Container} from "@/components/ui/Container";
import {SectionHeader} from "./SectionHeader";
import {useMessages} from "@/lib/i18n/provider";

export function HowItWorks() {
    const m = useMessages().how;

    return (
        <section id="how" className="bg-slate-50 py-20 sm:py-24">
            <Container className="space-y-12">
                <SectionHeader eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle}/>
                <ol className="relative grid gap-6 md:grid-cols-3">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-12 top-12 hidden h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent md:block"
                    />
                    {m.steps.map((step) => (
                        <li
                            key={step.number}
                            className="relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold tracking-widest text-white">
                                    {step.number}
                                </span>
                                <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                            </div>
                            <p className="text-sm text-slate-600">{step.description}</p>
                        </li>
                    ))}
                </ol>
                <p className="rounded-2xl border border-emerald-200 bg-white px-5 py-4 text-center text-sm font-medium text-emerald-800 shadow-sm">
                    <span aria-hidden="true" className="mr-2">⚡</span>
                    {m.highlight}
                </p>
            </Container>
        </section>
    );
}
