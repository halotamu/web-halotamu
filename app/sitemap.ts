import type {MetadataRoute} from "next";
import {siteConfig} from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    return [
        {
            url: siteConfig.siteUrl,
            lastModified,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteConfig.siteUrl}/privacy`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.4,
        },
        {
            url: `${siteConfig.siteUrl}/terms`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.4,
        },
    ];
}
