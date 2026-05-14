import type {Metadata, Viewport} from "next";
import Script from "next/script";
import {Geist, Geist_Mono} from "next/font/google";
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
import {I18nProvider} from "@/lib/i18n/provider";
import {siteConfig} from "@/lib/config/site";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    themeColor: "#059669",
    colorScheme: "light",
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
        default: "halotamu — Buku Tamu Digital untuk Perumahan & Gedung di Indonesia",
        template: "%s | halotamu",
    },
    description:
        "Warga setujui tamu langsung dari WhatsApp sebelum tamu masuk gerbang. Buku tamu digital untuk perumahan, apartemen, dan kantor.",
    applicationName: "halotamu",
    keywords: [
        "buku tamu digital",
        "halotamu",
        "keamanan perumahan",
        "manajemen tamu apartemen",
        "WhatsApp visitor management",
        "visitor management Indonesia",
    ],
    authors: [{name: "halotamu"}],
    alternates: {
        canonical: "/",
        languages: {
            "id-ID": "/",
            "en-US": "/",
        },
    },
    openGraph: {
        type: "website",
        locale: "id_ID",
        alternateLocale: ["en_US"],
        siteName: "halotamu",
        url: siteConfig.siteUrl,
        title: "halotamu — Buku Tamu Digital untuk Perumahan & Gedung di Indonesia",
        description:
            "Warga setujui tamu langsung dari WhatsApp sebelum tamu masuk gerbang.",
    },
    twitter: {
        card: "summary_large_image",
        title: "halotamu",
        description:
            "Warga setujui tamu langsung dari WhatsApp sebelum tamu masuk gerbang.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "halotamu",
    url: siteConfig.siteUrl,
    description:
        "Buku tamu digital untuk perumahan, apartemen, dan gedung kantor di Indonesia.",
    contactPoint: [
        {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: `+${siteConfig.whatsappNumber}`,
            email: siteConfig.email,
            availableLanguage: ["id", "en"],
        },
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="id"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full bg-white text-slate-900">
        <I18nProvider>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </I18nProvider>
        <Script
            id="halotamu-organization-schema"
            type="application/ld+json"
            strategy="afterInteractive"
        >
            {JSON.stringify(organizationSchema)}
        </Script>
        </body>
        </html>
    );
}
