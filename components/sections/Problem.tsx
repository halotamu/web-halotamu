"use client";

import {Container} from "@/components/ui/Container";
import {Icon, type IconName} from "@/components/ui/Icon";
import {SectionHeader} from "./SectionHeader";
import {useMessages} from "@/lib/i18n/provider";

export function Problem() {
    const m = useMessages().problem;
    return (
        <section id="problem" className="bg-white py-20 sm:py-24">
            <Container className="space-y-12">
                <SectionHeader eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle}/>
                <ul className="grid gap-5 md:grid-cols-3">
                    {m.items.map((item) => (
                        <li
                            key={item.title}
                            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-600">
                                <Icon name={item.icon as IconName} className="h-5 w-5"/>
                            </span>
                            <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                            <p className="text-sm text-slate-600">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
