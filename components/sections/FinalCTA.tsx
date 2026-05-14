"use client";

import {Container} from "@/components/ui/Container";
import {WhatsAppButton} from "@/components/ui/WhatsAppButton";
import {useMessages} from "@/lib/i18n/provider";

export function FinalCTA() {
    const messages = useMessages();
    const m = messages.finalCta;

    return (
        <section className="relative overflow-hidden bg-emerald-700 py-20 text-white sm:py-24">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.12),transparent_45%)]"
            />
            <Container>
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-50">
                        {m.eyebrow}
                    </span>
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{m.title}</h2>
                    <p className="max-w-xl text-base text-emerald-50/90">{m.subtitle}</p>
                    <WhatsAppButton
                        label={m.cta}
                        message={messages.whatsapp.finalCta}
                        source="final_cta"
                        variant="white"
                        size="lg"
                    />
                </div>
            </Container>
        </section>
    );
}
