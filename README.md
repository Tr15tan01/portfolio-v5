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

## Admin panel (edit projects online)

Go to **`/admin`** to add, edit, reorder and delete projects (title, tagline, description, category,
live link, technologies, icon, screenshot, featured) without touching code. There is no database:
`data/portfolio.json` stays the single source of truth.

**How saving works:** on Netlify (and Vercel) files written at runtime don't survive, so the admin
commits the updated `portfolio.json` (plus any new screenshot in `public/projects/`) to GitHub in a
single commit. Netlify sees the push and redeploys, so changes are live in a minute or two. Only the `projects`
section is changed; everything else in the file is kept as it is in the repo. If the file changed
somewhere else since you opened the editor, the save is refused instead of overwriting it.

### Setup (Netlify → Site configuration → Environment variables)

Keep each variable's scope as **All scopes** (the login check runs in an edge function).
Each save triggers a normal Netlify build, so it counts towards your build minutes.

| Variable | Value |
|---|---|
| `ADMIN_USERNAME` | Your login name |
| `ADMIN_PASSWORD` | A long, unique password |
| `ADMIN_SESSION_SECRET` | Random string, 32+ characters (e.g. `openssl rand -hex 32`) |
| `GITHUB_TOKEN` | Fine-grained token, see below |
| `GITHUB_REPO` | `Tr15tan01/portfolio-v5` |
| `GITHUB_BRANCH` | Optional, defaults to `main` |

**GitHub token:** GitHub → Settings → Developer settings → Fine-grained tokens → Generate.
Repository access: *Only select repositories* → this repo. Permissions: **Contents: Read and write**
(nothing else). Set an expiry and renew it when it runs out.

Redeploy after adding the variables. Changing `ADMIN_PASSWORD` or `ADMIN_SESSION_SECRET` logs out
every open session. Sessions last 7 days.

**Locally:** put the three `ADMIN_*` variables in `.env.local` and run `npm run dev`. Without
`GITHUB_TOKEN`, the admin writes straight to `data/portfolio.json` on disk (handy for testing;
commit the result yourself). On your own server, `ADMIN_STORAGE=local` enables the same mode.

**Icons:** the picker shows the icons registered in `lib/icons.ts`. To offer another
[Lucide](https://lucide.dev/icons) icon, add it to that file.

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
