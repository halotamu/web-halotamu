# web-halotamu

Landing page Halotamu — channel utama untuk menjaring lead B2B dari property
manager, admin perumahan, dan operator gedung di Indonesia. Mengarahkan
prospek ke percakapan WhatsApp.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Bahasa: Indonesia (default) + English (toggle di header, disimpan di
  `localStorage`)
- Mobile-first, semua section responsif

## Mulai Development

```bash
npm install
npm run dev
```

Buka <http://localhost:3000>.

## Konfigurasi

Buat `.env.local` (opsional) untuk override default:

```
# Nomor WhatsApp tujuan CTA (format internasional, tanpa "+" atau spasi)
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890

# Email kontak yang muncul di footer
NEXT_PUBLIC_CONTACT_EMAIL=halo@halotamu.id

# URL canonical untuk metadata
NEXT_PUBLIC_SITE_URL=https://halotamu.id
```

## Struktur

```
app/             # App Router (layout.tsx + page.tsx + globals.css)
components/      # Section, layout, dan UI primitives
lib/i18n        # Provider dan hook untuk toggle bahasa
messages/       # Konten ID dan EN (id.json + en.json)
public/         # Aset statis
```

## Deploy

Direkomendasikan deploy ke Vercel. Set environment variable di dashboard
Vercel sebelum production deploy.
