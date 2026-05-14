"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {Container} from "@/components/ui/Container";
import {LanguageToggle} from "@/components/ui/LanguageToggle";
import {Logo} from "@/components/ui/Logo";
import {WhatsAppButton} from "@/components/ui/WhatsAppButton";
import {useMessages} from "@/lib/i18n/provider";
import {cn} from "@/lib/utils/cn";

export function Header() {
    const messages = useMessages();
    const navLinks = [
        {href: "/#problem", label: messages.header.links.problem},
        {href: "/#how", label: messages.header.links.how},
        {href: "/#features", label: messages.header.links.features},
        {href: "/#use-cases", label: messages.header.links.useCases},
        {href: "/#demo", label: messages.header.links.demo},
        {href: "/#pricing", label: messages.header.links.pricing},
        {href: "/#faq", label: messages.header.links.faq},
    ];

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <header
            className={cn(
                "sticky top-0 z-40 transition",
                scrolled
                    ? "bg-white/85 shadow-sm shadow-slate-900/5 backdrop-blur"
                    : "bg-white/60 backdrop-blur",
            )}
        >
            <Container className="flex h-16 items-center justify-between gap-4">
                <Link href="/" className="flex items-center" aria-label="halotamu">
                    <Logo/>
                </Link>
                <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <div className="hidden md:block">
                        <LanguageToggle/>
                    </div>
                    <div className="hidden md:block">
                        <WhatsAppButton
                            label={messages.header.cta}
                            message={messages.whatsapp.header}
                            source="header"
                        />
                    </div>
                    <button
                        type="button"
                        aria-label={open ? messages.header.close : messages.header.menu}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 md:hidden"
                    >
                        <span className="sr-only">{open ? messages.header.close : messages.header.menu}</span>
                        {open ? (
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6"/>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16"/>
                            </svg>
                        )}
                    </button>
                </div>
            </Container>

            {open ? (
                <div className="border-t border-slate-200 bg-white md:hidden">
                    <Container className="space-y-4 py-5">
                        <nav className="flex flex-col gap-1" aria-label="Mobile">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="flex items-center justify-between gap-3">
                            <LanguageToggle align="start"/>
                            <WhatsAppButton
                                label={messages.header.cta}
                                message={messages.whatsapp.header}
                                source="header"
                            />
                        </div>
                    </Container>
                </div>
            ) : null}
        </header>
    );
}
