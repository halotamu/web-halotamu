import idMessages from "@/messages/id.json";
import enMessages from "@/messages/en.json";

export type Locale = "id" | "en";

export type Messages = typeof idMessages;

export const DEFAULT_LOCALE: Locale = "id";

export const SUPPORTED_LOCALES: Locale[] = ["id", "en"];

export const messagesByLocale: Record<Locale, Messages> = {
    id: idMessages as Messages,
    en: enMessages as Messages,
};

export function isLocale(value: string | null | undefined): value is Locale {
    return value === "id" || value === "en";
}
