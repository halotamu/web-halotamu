import type {Metadata} from "next";
import {LegalPage} from "@/components/legal/LegalPage";

export const metadata: Metadata = {
    title: "Syarat Layanan",
    description:
        "Syarat Layanan halotamu — lisensi penggunaan, tanggung jawab, pembayaran, dan pemutusan layanan.",
    alternates: {canonical: "/terms"},
};

export default function TermsPage() {
    return <LegalPage variant="terms"/>;
}
