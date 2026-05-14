"use client";

import {Container} from "@/components/ui/Container";
import {SectionHeader} from "./SectionHeader";
import {useMessages} from "@/lib/i18n/provider";

export function FAQ() {
    const m = useMessages().faq;

    return (
        <section id="faq" className="bg-white py-20 sm:py-24">
            <Container className="space-y-12">
                <SectionHeader eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle}/>
                <div className="mx-auto max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {m.items.map((item, index) => (
                        <details
                            key={item.question}
                            className="group p-5 [&_summary::-webkit-details-marker]:hidden"
                            {...(index === 0 ? {open: true} : {})}
                        >
                            <summary className="flex cursor-pointer items-start justify-between gap-4 text-left text-base font-semibold text-slate-900 list-none">
                                <span>{item.question}</span>
                                <span
                                    aria-hidden="true"
                                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-open:rotate-45 group-open:bg-emerald-600 group-open:text-white"
                                >
                                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
                                    </svg>
                                </span>
                            </summary>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </Container>
        </section>
    );
}
