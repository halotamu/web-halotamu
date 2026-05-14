"use client";

import {Container} from "@/components/ui/Container";
import {PhoneMockup} from "@/components/ui/PhoneMockup";
import {SectionHeader} from "./SectionHeader";
import {useMessages} from "@/lib/i18n/provider";

export function Demo() {
    const m = useMessages().demo;

    return (
        <section id="demo" className="bg-white py-20 sm:py-24">
            <Container className="space-y-12">
                <SectionHeader eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle}/>
                <div className="grid gap-6 lg:grid-cols-3">
                    <FrontDeskCard title={m.items[0].title} description={m.items[0].description} badge={m.items[0].badge}/>
                    <DashboardCard title={m.items[1].title} description={m.items[1].description} badge={m.items[1].badge}/>
                    <WhatsAppCard title={m.items[2].title} description={m.items[2].description} badge={m.items[2].badge}/>
                </div>
                <p className="text-center text-sm text-slate-500">{m.footnote}</p>
            </Container>
        </section>
    );
}

type CardProps = {title: string; description: string; badge: string};

function CardShell({badge, title, description, children}: CardProps & {children: React.ReactNode}) {
    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
            <span className="self-start rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                {badge}
            </span>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{description}</p>
            <div className="mt-2">{children}</div>
        </div>
    );
}

function FrontDeskCard(props: CardProps) {
    return (
        <CardShell {...props}>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Form Check-In
                </p>
                <div className="mt-3 space-y-2">
                    {[
                        ["Nama Tamu", "Andi Saputra"],
                        ["Tujuan Warga", "Budi (B-12)"],
                        ["Keperluan", "Mengantar paket"],
                    ].map(([label, value]) => (
                        <div key={label} className="rounded-lg bg-slate-50 px-3 py-2">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{label}</p>
                            <p className="text-sm font-medium text-slate-800">{value}</p>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                    Simpan & Kirim Notifikasi
                </button>
            </div>
        </CardShell>
    );
}

function DashboardCard(props: CardProps) {
    return (
        <CardShell {...props}>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Logbook Aktif
                </p>
                <ul className="mt-3 space-y-2 text-xs">
                    {[
                        {name: "Andi Saputra", status: "Disetujui", tone: "bg-emerald-100 text-emerald-700"},
                        {name: "Rina Yuli", status: "Menunggu", tone: "bg-amber-100 text-amber-700"},
                        {name: "Kurir JNE", status: "Ditolak", tone: "bg-rose-100 text-rose-700"},
                    ].map((row) => (
                        <li
                            key={row.name}
                            className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
                        >
                            <span className="font-medium text-slate-800">{row.name}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.tone}`}>
                                {row.status}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="mt-3 text-[10px] text-slate-500">Update otomatis · 7 detik</p>
            </div>
        </CardShell>
    );
}

function WhatsAppCard(props: CardProps) {
    return (
        <CardShell {...props}>
            <div className="origin-top scale-[0.85]">
                <PhoneMockup/>
            </div>
        </CardShell>
    );
}
