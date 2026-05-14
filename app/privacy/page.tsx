import type {Metadata} from "next";
import {LegalPage} from "@/components/legal/LegalPage";

export const metadata: Metadata = {
    title: "Kebijakan Privasi",
    description:
        "Kebijakan Privasi halotamu — data apa yang kami kumpulkan, untuk apa data digunakan, dan bagaimana kami melindunginya.",
    alternates: {canonical: "/privacy"},
};

export default function PrivacyPage() {
    return <LegalPage variant="privacy"/>;
}
