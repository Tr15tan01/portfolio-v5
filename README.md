# Tristan Varamashvili — Portfolio

Next.js 15 + Tailwind v4 portfolio, built to bring in client work.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

## Edit content

Almost everything lives in **`data/portfolio.json`**: hero text, services, projects, process,
FAQ, testimonials, stats, contact options. No code changes needed.

- **Projects:** put screenshots in `public/projects/` (webp, ~1200px wide) and set `"image"`.
  Leave `"image": ""` to show the emoji tile. Leave `"live": ""` to hide the demo button.
- **Testimonials:** the section appears automatically once you add at least one:
  `{ "quote": "...", "name": "Nino B.", "role": "Owner, Café X", "url": "https://..." }`
- **Social links:** bare domains like `https://linkedin.com` are hidden automatically.
  Put your real profile URL to show them.
- **WhatsApp / Telegram / booking:** fill `contact.whatsapp` (e.g. `"+995 5xx xxx xxx"`),
  `contact.telegram` (`"@handle"`) or `contact.bookingUrl` (Calendly/Cal.com link) to show
  those buttons. WhatsApp also adds a floating chat button.
- **Availability:** set `site.availability.available` to `false` when you are fully booked.

## Contact form email

The form posts to `/api/contact`, which sends through [Resend](https://resend.com) (free tier).

1. Create a Resend account and an API key.
2. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in Vercel → Project → Settings → Environment Variables.
3. Optional: verify your domain in Resend and set `CONTACT_FROM_EMAIL`.

Until configured, the form falls back to opening the visitor's email app with the message pre-filled,
so no inquiry is lost. Spam protection: honeypot field + per-IP rate limit.

## Deploy (Vercel)

Import the repo, set `NEXT_PUBLIC_SITE_URL` to your domain (used for SEO, sitemap and link previews),
and deploy. Then submit `https://your-domain.com/sitemap.xml` in Google Search Console.

## Scripts

`npm run dev` · `npm run build` · `npm start` · `npm run lint` · `npm run typecheck`
