"use client";

import {useMessages} from "@/lib/i18n/provider";

export function PhoneMockup() {
    const m = useMessages().hero.mockup;

    return (
        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px]">
            <div className="absolute inset-0 -z-10 translate-x-6 translate-y-8 rounded-[3rem] bg-emerald-100 blur-2xl"/>
            <div className="relative rounded-[2.5rem] bg-slate-900 p-2 shadow-2xl shadow-emerald-900/20 ring-1 ring-slate-800">
                <div className="rounded-[2rem] bg-white">
                    {/* status bar */}
                    <div className="flex items-center justify-between rounded-t-[2rem] bg-emerald-600 px-5 py-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-50">
                        <span>9:41</span>
                        <span className="text-emerald-100/90">{m.appLabel}</span>
                        <span className="flex items-center gap-1">
                            <span className="inline-block h-1.5 w-3 rounded-sm bg-emerald-100"/>
                            <span className="inline-block h-2 w-2 rounded-sm bg-emerald-100"/>
                        </span>
                    </div>
                    {/* contact */}
                    <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                            HT
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">{m.contactName}</p>
                            <p className="text-xs text-emerald-600">{m.contactStatus}</p>
                        </div>
                    </div>
                    {/* chat */}
                    <div className="space-y-3 bg-[#e9efe6] px-4 py-5">
                        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-emerald-100 p-3 text-[13px] leading-snug text-slate-800 shadow-sm">
                            <p className="font-semibold text-slate-900">{m.messageHeading}</p>
                            <p className="mt-1 text-slate-700">{m.messageBody}</p>
                            <dl className="mt-2 space-y-1 text-[12px]">
                                <div className="flex justify-between gap-3">
                                    <dt className="text-slate-500">{m.guestNameLabel}</dt>
                                    <dd className="font-semibold text-slate-800">{m.guestName}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-slate-500">{m.purposeLabel}</dt>
                                    <dd className="font-semibold text-slate-800">{m.purpose}</dd>
                                </div>
                            </dl>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    className="rounded-full bg-emerald-600 py-1.5 text-[12px] font-semibold text-white shadow-sm"
                                >
                                    {m.approve}
                                </button>
                                <button
                                    type="button"
                                    className="rounded-full bg-white py-1.5 text-[12px] font-semibold text-rose-600 ring-1 ring-rose-200"
                                >
                                    {m.reject}
                                </button>
                            </div>
                            <p className="mt-2 text-[10px] text-slate-500">{m.footnote}</p>
                            <p className="mt-1 text-right text-[9px] text-slate-400">09:42 · ✓✓</p>
                        </div>
                    </div>
                    {/* input bar (decorative) */}
                    <div className="flex items-center gap-2 rounded-b-[2rem] border-t border-slate-100 bg-white px-3 py-2">
                        <div className="h-8 flex-1 rounded-full bg-slate-100"/>
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-white">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M3 11l18-7-7 18-2.5-7L3 11Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
