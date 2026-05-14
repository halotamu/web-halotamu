"use client";

import {Container} from "@/components/ui/Container";
import {SectionHeader} from "./SectionHeader";
import {useMessages} from "@/lib/i18n/provider";

export function UseCases() {
    const m = useMessages().useCases;

    return (
        <section id="use-cases" className="bg-slate-50 py-20 sm:py-24">
            <Container className="space-y-12">
                <SectionHeader eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle}/>
                <ul className="grid gap-5 md:grid-cols-3">
                    {m.items.map((item) => (
                        <li
                            key={item.title}
                            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                        >
                            <span className="self-start rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                                {item.label}
                            </span>
                            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                            <p className="text-sm text-slate-600">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
