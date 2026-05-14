"use client";

import {Container} from "@/components/ui/Container";
import {Icon, type IconName} from "@/components/ui/Icon";
import {SectionHeader} from "./SectionHeader";
import {useMessages} from "@/lib/i18n/provider";

export function Features() {
    const m = useMessages().features;

    return (
        <section id="features" className="bg-white py-20 sm:py-24">
            <Container className="space-y-12">
                <SectionHeader eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle}/>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {m.items.map((item) => (
                        <li
                            key={item.title}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                                <Icon name={item.icon as IconName} className="h-5 w-5"/>
                            </span>
                            <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                            <p className="mt-1.5 text-sm text-slate-600">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
