"use client";

import {createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore} from "react";
import {
    DEFAULT_LOCALE,
    isLocale,
    type Locale,
    type Messages,
    messagesByLocale,
} from "./messages";

type I18nContextValue = {
    locale: Locale;
    messages: Messages;
    setLocale: (next: Locale) => void;
};

const STORAGE_KEY = "halotamu.locale";
const STORAGE_EVENT = "halotamu:locale-change";

const I18nContext = createContext<I18nContextValue | null>(null);

function readStoredLocale(): Locale {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
    const browser = window.navigator.language?.slice(0, 2).toLowerCase();
    if (isLocale(browser)) return browser;
    return DEFAULT_LOCALE;
}

function subscribeToLocale(callback: () => void) {
    if (typeof window === "undefined") return () => {};
    window.addEventListener(STORAGE_EVENT, callback);
    window.addEventListener("storage", callback);
    return () => {
        window.removeEventListener(STORAGE_EVENT, callback);
        window.removeEventListener("storage", callback);
    };
}

export function I18nProvider({children}: {children: React.ReactNode}) {
    const locale = useSyncExternalStore(
        subscribeToLocale,
        readStoredLocale,
        () => DEFAULT_LOCALE,
    );

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.lang = locale;
        }
    }, [locale]);

    const setLocale = useCallback((next: Locale) => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(STORAGE_KEY, next);
        window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
    }, []);

    const value = useMemo<I18nContextValue>(
        () => ({locale, messages: messagesByLocale[locale], setLocale}),
        [locale, setLocale],
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) {
        throw new Error("useI18n must be used inside <I18nProvider>");
    }
    return ctx;
}

export function useMessages(): Messages {
    return useI18n().messages;
}
