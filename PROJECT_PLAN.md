# Help — Therapist Booking Website

## Project Overview

A multilingual (English/German) website where users can browse therapists, view profiles, and book consultation sessions. Bookings create Google Calendar invites with Google Meet links for both the user and therapist.

**Status:** Core features built, polish and deploy remaining.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js (App Router) | SSR for SEO, file-based routing, API routes |
| Language | TypeScript | Type safety, better DX |
| UI Library | Material UI (MUI) | Pre-built components, fast to build |
| Database | Supabase (PostgreSQL) | Free tier, built-in auth (for future therapist login), real-time |
| Booking | Cal.com (embedded) | Free tier, handles Google Calendar + Meet, availability, emails |
| i18n | next-intl | URL-based routing (/en/..., /de/...), SEO-friendly |
| Hosting | Cloudflare Pages | Free tier, unlimited bandwidth, auto-deploy from GitHub |
| Package Manager | Yarn | Shorter commands, slightly faster installs |
| Testing | Jest | Unit tests for business logic |
| Linting | ESLint + TypeScript strict | `yarn lint` and `yarn tsc` for code quality |
| Version Control | GitHub | Source code + CI/CD trigger for Cloudflare |

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/[locale]/` | Hero section, intro text, featured therapist, CTA to book |
| Therapists | `/[locale]/therapists` | List/grid of therapist cards with photo, name, specialties |
| Therapist Profile | `/[locale]/therapists/[slug]` | Full bio, qualifications, specialties, photo, link to book |
| Booking | `/[locale]/booking/[therapist-slug]` | Cal.com embed for selected therapist's availability |
| Blog | `/[locale]/blog` | List of blog posts (stored in Supabase) |
| Blog Post | `/[locale]/blog/[slug]` | Individual blog article |
| About | `/[locale]/about` | About the practice, mission, approach |
| FAQ | `/[locale]/faq` | Expandable Q&A sections (therapy process, pricing, insurance, cancellation) |
| Contact | `/[locale]/contact` | Contact form (name, email, message) — submissions stored in Supabase |

## Architecture

```
Browser
  |
  v
Cloudflare Pages (hosts Next.js app)
  |
  ├── Next.js App Router
  |     ├── /[locale]/ — all pages under locale prefix
  |     ├── next-intl — handles locale detection, routing, translations
  |     └── MUI — component styling
  |
  ├── Supabase (database)
  |     ├── therapists table — profiles, bios, specialties, photos
  |     ├── blog_posts table — title, content, slug, date, locale
  |     ├── contact_submissions table — form submissions
  |     └── (future) auth — therapist Google login
  |
  └── Cal.com (embedded)
        ├── Scheduling UI embedded in booking page
        ├── Google Calendar sync — creates events on both calendars
        └── Google Meet — auto-generates meet link on booking
```

## Database Schema (Supabase)

### therapists
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| slug | text | URL-friendly name (e.g., "anna-mueller") |
| name | text | Display name |
| photo_url | text | Profile photo URL |
| specialties | text[] | Array of specialties |
| bio_en | text | Bio in English |
| bio_de | text | Bio in German |
| title_en | text | Professional title in English |
| title_de | text | Professional title in German |
| cal_username | text | Cal.com username for embed |
| email | text | Contact email |
| active | boolean | Whether to show on site |
| created_at | timestamptz | Record created |

### blog_posts
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| slug | text | URL-friendly title |
| title | text | Post title |
| content | text | Post body (markdown) |
| excerpt | text | Short preview text |
| locale | text | 'en' or 'de' |
| author_id | uuid | FK to therapists |
| published | boolean | Draft vs published |
| published_at | timestamptz | Publication date |
| created_at | timestamptz | Record created |

### contact_submissions
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Sender name |
| email | text | Sender email |
| message | text | Message body |
| created_at | timestamptz | Submitted at |

## i18n Strategy

- URL-based: `/en/therapists`, `/de/therapeuten`
- Translation files: `messages/en.json`, `messages/de.json`
- Content (bios, blog posts) stored with locale variants in Supabase
- next-intl middleware handles locale detection and redirects
- Default locale: German (de) — can be changed
- Language switcher in header/nav

## Cal.com Integration

- Each therapist has a Cal.com account/username
- Booking page embeds Cal.com scheduling widget via `@calcom/embed-react`
- Cal.com handles:
  - Availability display based on therapist's Google Calendar
  - Timezone detection for the user
  - Booking confirmation emails to both parties
  - Google Calendar event creation with Google Meet link
- Setup required: therapist creates Cal.com account, connects Google Calendar, enables Google Meet

## Social Media

- Instagram and LinkedIn icon links in the header
- Links configurable per-therapist or site-wide
- Simple external links (no feed integration for MVP)

---

## Implementation Phases

### Phase 1: Project Setup
- [x] Initialize Next.js project with TypeScript
- [x] Switch to Yarn as package manager
- [x] Configure MUI theme and basic layout
- [x] Set up next-intl with English and German
- [x] Set up ESLint + TypeScript checking (`yarn lint`, `yarn tsc`)
- [x] Set up Jest for unit testing (`yarn test`)
- [x] Set up Supabase project and create tables
- [x] Set up GitHub repo (SSH, pushed to andy-court/help)
- [ ] Connect to Cloudflare Pages for auto-deploy
- [x] Warm color palette (sage green #6B8F71, warm beige #C9A96E)

**i18n status:** COMPLETE — all pages use translations, language switcher works, NavLink provides fast SPA-style client-side navigation.

### Phase 2: Core Pages
- [x] Layout: Header with nav + language switcher + "Book Session" CTA button
- [x] Home page — hero, intro, CTA
- [x] About page (shows therapist profile in single mode)
- [x] FAQ page with expandable sections
- [x] Crisis/emergency resources banner (Telefonseelsorge hotline numbers, labelled as Germany)
- [x] Legal links bar (Impressum + Datenschutz links, replaces old Footer)
- [x] Mobile CTA "Book A Session" button in header toolbar
- [x] Loading spinner for page transitions

### Phase 3: Therapist Features
- [x] Therapists listing page (wired to Supabase)
- [x] Therapist profile page (dynamic route with [slug], wired to Supabase)
- [x] Seed database with first therapist (Livia Malkus)
- [x] Single/multi therapist mode config (`siteConfig.ts`)

### Phase 4: Booking
- [x] Set up Cal.com account (dev account: andrew-court-urezal)
- [ ] Connect Livia's Google Calendar + enable Google Meet in Cal.com
- [x] Booking page with Cal.com embed widget (`@calcom/embed-react`)
- [x] Cal.com username stored in Supabase, fetched dynamically
- [ ] Test full flow: browse → select therapist → book → both get calendar invite with Meet link

### Phase 5: Blog
- [x] Blog listing page (wired to Supabase, filtered by locale)
- [x] Blog post page (wired to Supabase, joins author name)
- [x] Seed with blog posts (2 posts × 2 locales)

### Phase 6: Contact
- [x] Contact form page (UI complete)
- [x] Form submission via server action → Supabase
- [x] Honeypot field for bot protection
- [ ] (Optional) Email notification on submission
- [ ] Cloudflare Turnstile CAPTCHA (add after Cloudflare setup)

### Phase 7: Polish & Deploy
- [x] Responsive design check (mobile, tablet, desktop)
- [x] SEO: per-page metadata, Open Graph, dynamic sitemap.xml, robots.txt
- [x] All inline styles extracted to styles.ts files
- [ ] Test both languages end-to-end
- [ ] Final deploy to Cloudflare Pages
- [ ] Test with real Cal.com booking (Livia's calendar)

---

## Pre-Launch Required (Legal/Compliance/Security)

- [x] Impressum page — shell with placeholder legal text, needs real details
- [x] Datenschutz (Privacy Policy) page — shell with GDPR text, needs real contact details
- [x] Crisis/emergency resources banner — Telefonseelsorge hotline numbers
- [ ] Security audit — review all inputs, API routes, headers, dependencies for vulnerabilities
- [ ] Content Security Policy (CSP) — configure nonce-based CSP headers (MUI/Emotion needs style nonce, allowlist Cal.com iframe, Supabase API, Google Fonts)
- [ ] Analytics setup — Cloudflare Web Analytics (cookie-free) or similar
- [ ] Next.js middleware → proxy migration (build warns middleware convention is deprecated)

## Pre-Launch Recommended (Trust/Polish)

- [ ] Professional headshot photos for therapists
- [ ] Hero image on home page (calming nature/abstract, matching sage green/warm beige palette — user to source)
- [x] Warmer color palette (sage green #6B8F71, warm beige #C9A96E — was indigo #5C6BC0)
- [ ] Credentials/licensing info on therapist profiles
- [ ] Transparent pricing or insurance/Krankenkasse information

## Future Features (Post-MVP)

- [x] Multi/single therapist config flag — `siteConfig.ts` with `mode: "single" | "multi"`
- [ ] Therapist dashboard (Google login via Supabase Auth)
- [ ] Admin panel for managing content
- [ ] Testimonials/reviews section
- [ ] Therapist matching quiz
- [ ] Email notifications for contact form
- [ ] Custom domain
- [ ] Blog categories/tags
- [ ] Therapist search/filter by specialty

---

## Decisions Log

| # | Decision | Choice | Alternatives Considered |
|---|----------|--------|------------------------|
| 1 | Booking system | Cal.com (embedded) | Google Calendar API directly, Calendly, Acuity, TidyCal, SavvyCal |
| 2 | Content storage | Supabase (PostgreSQL) | Markdown files in repo, Headless CMS |
| 3 | Hosting | Cloudflare Pages | Vercel, Netlify |
| 4 | Styling | Material UI (MUI) | Tailwind + shadcn/ui, Tailwind custom, CSS Modules |
| 5 | Framework | Next.js (App Router) | Vite + React Router |
| 6 | i18n approach | URL-based (/en, /de) via next-intl | Toggle button (same URL) |
| 7 | Domain | Free .pages.dev subdomain | Custom domain, Cloudflare Registrar |
| 8 | Social media | Icon links in header | Feed integration, widget embeds |
| 9 | Extra pages | FAQ + Contact form | FAQ only, Contact only, none |
| 10 | Package manager | Yarn | npm |
| 11 | Testing framework | Jest | Vitest |
| 12 | Code quality | ESLint + `tsc --noEmit` | ESLint only |
| 13 | Bot protection | Honeypot + server action (Turnstile later) | reCAPTCHA, hCaptcha |

---

*Last updated: 2026-05-15 (session 5)*

## Resume Notes

**Where we left off:** All core features built and wired up. Supabase connected with therapists, blog posts, and contact submissions. Cal.com embed working with dev account. SEO metadata on all pages. Single therapist mode enabled. Styles fully extracted to styles.ts files. Responsive breakpoints added.

**Known pattern:** Can't pass next-intl `Link` as `component` prop to MUI (server/client boundary). Solved with `NavLink` wrapper (`src/components/NavLink.tsx`) — use this for all internal links. Use `getTranslations` (async) in server components, `useTranslations` in client components.

**Action required from user:**
1. Fill in real details in Impressum and Datenschutz pages (translations have `[placeholder]` markers)
2. Connect Livia's real Google Calendar to Cal.com (replace dev account)
3. Set up Cloudflare Pages account and connect to GitHub repo

**Next steps in order:**
1. Connect Cloudflare Pages for auto-deploy
2. Cookie consent banner (EU legal requirement)
3. Test both languages end-to-end
4. Migrate middleware.ts to proxy convention (Next.js 16 deprecation)
5. Security audit + CSP headers

**Environment:**
- GitHub: `git@github.com:andy-court/help.git` (SSH)
- Supabase: `https://oouqobdjlkpfohcrhpom.supabase.co` (EU Frankfurt)
- Cal.com dev account: `andrew-court-urezal`
- Env vars in `.env.local` (gitignored): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
