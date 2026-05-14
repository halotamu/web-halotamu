function trimNumber(value: string) {
    return value.replace(/[^0-9]/g, "");
}

const fallbackWhatsAppNumber = "6285157578726";
const fallbackEmail = "halo@halotamu.my.id";
const fallbackSiteUrl = "https://halotamu.my.id";

export const siteConfig = {
    name: "halotamu",
    domain: "halotamu.my.id",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl,
    whatsappNumber:
        trimNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "") || fallbackWhatsAppNumber,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || fallbackEmail,
};

export type WhatsAppCtaSource = "hero" | "header" | "pricing" | "final_cta";

export function buildWhatsAppLink(message: string, source?: WhatsAppCtaSource) {
    const base = `https://wa.me/${siteConfig.whatsappNumber}`;
    const text = encodeURIComponent(message.trim());
    const params = new URLSearchParams();
    params.set("text", text);
    if (source) {
        params.set("utm_source", "landing");
        params.set("utm_medium", "whatsapp");
        params.set("utm_campaign", source);
    }
    // wa.me requires query string but pre-encodes text on its own; we pass plain query.
    return `${base}?${params.toString().replace(/\+/g, "%20")}`;
}
