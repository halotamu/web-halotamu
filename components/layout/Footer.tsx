"use client";

import Link from "next/link";
import {Container} from "@/components/ui/Container";
import {Logo} from "@/components/ui/Logo";
import {siteConfig} from "@/lib/config/site";
import {useMessages} from "@/lib/i18n/provider";

export function Footer() {
    const messages = useMessages();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
            <Container className="grid gap-10 py-12 md:grid-cols-3">
                <div className="space-y-3">
                    <Logo/>
                    <p className="max-w-xs text-sm text-slate-600">
                        {messages.footer.tagline}
                    </p>
                </div>
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {messages.footer.contactHeading}
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li>
                            <a
                                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-700 hover:text-emerald-700"
                            >
                                WhatsApp · +{siteConfig.whatsappNumber}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="text-slate-700 hover:text-emerald-700"
                            >
                                {siteConfig.email}
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {messages.footer.legalHeading}
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li>
                            <Link href="/privacy" className="text-slate-700 hover:text-emerald-700">
                                {messages.footer.links.privacy}
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="text-slate-700 hover:text-emerald-700">
                                {messages.footer.links.terms}
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container>
            <div className="border-t border-slate-200 bg-white">
                <Container
                    className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
                    <p>{messages.footer.copyright.replace("{year}", String(year))}</p>
                    <p className="text-slate-400">{siteConfig.domain}</p>
                </Container>
            </div>
        </footer>
    );
}
