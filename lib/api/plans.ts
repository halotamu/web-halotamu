export type PlanBillingCycle = "monthly" | "yearly" | "lifetime";

export type PublicPlan = {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    price: number;
    billing_cycle: PlanBillingCycle;
    max_units: number;
    max_users: number;
    max_visitors_per_month: number;
    trial_days: number;
    features: string[];
    is_active: boolean;
    is_popular: boolean;
    color: string;
    sort_order: number;
};

type ApiEnvelope<T> = {data: T};

function apiBaseURL() {
    const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
    return raw && raw.length > 0 ? raw.replace(/\/$/, "") : "";
}

function adminToken() {
    return process.env.NEXT_PUBLIC_ADMIN_TOKEN?.trim() || "";
}

// fetchPublicPlans calls the halotamu API. Returns null on any failure so the
// caller can fall back to bundled defaults — the landing page must never break
// because the API is unreachable.
export async function fetchPublicPlans(): Promise<PublicPlan[] | null> {
    const base = apiBaseURL();
    const token = adminToken();
    if (!base || !token) return null;

    try {
        const res = await fetch(`${base}/api/v1/public/plans`, {
            headers: {
                "X-Admin-Token": token,
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (!res.ok) return null;
        const payload = (await res.json()) as ApiEnvelope<PublicPlan[]>;
        if (!Array.isArray(payload?.data)) return null;
        // Sort defensively by sort_order then price so server ordering wins.
        return [...payload.data].sort((a, b) => {
            if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
            return a.price - b.price;
        });
    } catch {
        return null;
    }
}
