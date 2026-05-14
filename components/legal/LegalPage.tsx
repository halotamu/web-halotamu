"use client";

import Link from "next/link";
import {Container} from "@/components/ui/Container";
import {useMessages} from "@/lib/i18n/provider";

type LegalSection = {
    title: string;
    body: string[];
};

type LegalPageProps = {
    variant: "privacy" | "terms";
};

export function LegalPage({variant}: LegalPageProps) {
    const messages = useMessages();
    const m = messages.legal;
    const doc = m[variant];

    return (
        <article className="bg-white">
            <header className="border-b border-slate-200 bg-gradient-to-b from-emerald-50 via-white to-white py-14 sm:py-16">
                <Container className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                    >
                        <span aria-hidden="true">←</span>
                        {m.backToHome}
                    </Link>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        {doc.title}
                    </h1>
                    <p className="max-w-3xl text-base text-slate-600">{doc.intro}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {m.lastUpdatedLabel}: {m.lastUpdated}
                    </p>
                </Container>
            </header>

            <div className="py-14 sm:py-16">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[18rem_1fr]">
                        <nav
                            aria-label={doc.title}
                            className="lg:sticky lg:top-24 lg:self-start"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                {doc.title}
                            </p>
                            <ol className="mt-3 space-y-2 text-sm">
                                {(doc.sections as LegalSection[]).map((section, index) => (
                                    <li key={section.title}>
                                        <a
                                            href={`#section-${index + 1}`}
                                            className="block rounded-lg px-3 py-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                                        >
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <div className="space-y-10 text-base leading-relaxed text-slate-700">
                            {(doc.sections as LegalSection[]).map((section, index) => (
                                <section
                                    key={section.title}
                                    id={`section-${index + 1}`}
                                    className="scroll-mt-24"
                                >
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        {section.title}
                                    </h2>
                                    <div className="mt-3 space-y-3">
                                        {section.body.map((paragraph, paragraphIndex) => (
                                            <p key={paragraphIndex}>{paragraph}</p>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </article>
    );
}
