# Help — Therapist Booking Website

## Project Overview

A multilingual (English/German) website where users can browse therapists, view profiles, and book consultation sessions. Bookings create Google Calendar invites with Google Meet links for both the user and therapist.

**Status:** Planning complete, ready to start building.

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

- Instagram and LinkedIn icon links in the footer
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
- [ ] Set up Supabase project and create tables
- [ ] Set up GitHub repo
- [ ] Connect to Cloudflare Pages for auto-deploy
- [x] Warm color palette (sage green #6B8F71, warm beige #C9A96E)

**i18n status:** COMPLETE — all pages use translations, language switcher works, NavLink provides fast SPA-style client-side navigation.

### Phase 2: Core Pages
- [x] Layout: Header with nav + language switcher + "Book Session" CTA button
- [x] Home page — hero, intro, CTA
- [x] About page
- [x] FAQ page with expandable sections
- [x] Crisis/emergency resources banner (Telefonseelsorge hotline numbers)
- [x] Legal links bar (Impressum + Datenschutz links, replaces old Footer)

### Phase 3: Therapist Features
- [x] Therapists listing page (placeholder data, needs Supabase)
- [x] Therapist profile page (dynamic route with [slug], needs Supabase)
- [ ] Seed database with first therapist

### Phase 4: Booking
- [ ] Set up Cal.com account for therapist
- [ ] Connect Google Calendar + enable Google Meet in Cal.com
- [x] Booking page (placeholder for Cal.com embed, needs integration)
- [ ] Test full flow: browse → select therapist → book → both get calendar invite with Meet link

### Phase 5: Blog
- [x] Blog listing page (placeholder data, needs Supabase)
- [x] Blog post page (placeholder, needs Supabase + markdown rendering)
- [ ] Seed with first blog post

### Phase 6: Contact
- [x] Contact form page (UI done, needs Supabase submission)
- [ ] Form submission → Supabase
- [ ] (Optional) Email notification on submission

### Phase 7: Polish & Deploy
- [ ] Responsive design check (mobile, tablet, desktop)
- [ ] SEO: meta tags, Open Graph, sitemap
- [ ] Test both languages end-to-end
- [ ] Final deploy to Cloudflare Pages
- [ ] Test with real Cal.com booking

---

## Pre-Launch Required (Legal/Compliance/Security)

- [x] Impressum page — shell with placeholder legal text, needs real details
- [x] Datenschutz (Privacy Policy) page — shell with GDPR text, needs real contact details
- [ ] Cookie consent banner — EU required
- [x] Crisis/emergency resources banner — Telefonseelsorge hotline numbers
- [ ] Security audit — review all inputs, API routes, headers, dependencies for vulnerabilities
- [ ] Content Security Policy (CSP) — configure nonce-based CSP headers (MUI/Emotion needs style nonce, allowlist Cal.com iframe, Supabase API, Google Fonts)
- [ ] Cookie policy + analytics setup — Cloudflare Web Analytics (cookie-free) or similar, document what cookies the site sets (locale, auth, Cal.com embed)

## Pre-Launch Recommended (Trust/Polish)

- [ ] Professional headshot photos for therapists
- [ ] Hero image on home page (calming nature/illustration, not stock photos)
- [x] Warmer color palette (sage green #6B8F71, warm beige #C9A96E — was indigo #5C6BC0)
- [ ] Credentials/licensing info on therapist profiles
- [ ] Transparent pricing or insurance/Krankenkasse information
- [ ] Responsive design check (mobile, tablet, desktop)

## Future Features (Post-MVP)

- [ ] Multi/single therapist config flag — `siteConfig.ts` with `mode: "single" | "multi"` to control nav, CTA destination, homepage content, and whether therapists listing page is shown
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
| 1 | Booking system | Cal.com (embedded) | Google Calendar API directly, Calendly |
| 2 | Content storage | Supabase (PostgreSQL) | Markdown files in repo, Headless CMS |
| 3 | Hosting | Cloudflare Pages | Vercel, Netlify |
| 4 | Styling | Material UI (MUI) | Tailwind + shadcn/ui, Tailwind custom, CSS Modules |
| 5 | Framework | Next.js (App Router) | Vite + React Router |
| 6 | i18n approach | URL-based (/en, /de) via next-intl | Toggle button (same URL) |
| 7 | Domain | Free .pages.dev subdomain | Custom domain, Cloudflare Registrar |
| 8 | Social media | Icon links in footer | Feed integration, widget embeds |
| 9 | Extra pages | FAQ + Contact form | FAQ only, Contact only, none |
| 10 | Package manager | Yarn | npm |
| 11 | Testing framework | Jest | Vitest |
| 12 | Code quality | ESLint + `tsc --noEmit` | ESLint only |

---

*Last updated: 2026-05-14 (end of session 3)*

## Resume Notes

**Where we left off:** All frontend pages built and polished. New additions: "Book Session" CTA in header, Impressum page, Datenschutz page, crisis resources banner, legal links bar, warmer color palette (sage green/warm beige). Therapist renamed to Livia Malkus with photo slot at `public/images/therapists/livia-malkus.jpg` (user needs to place the actual file). Footer component removed. `yarn tsc`, `yarn lint`, and `yarn build` all pass clean.

**Known pattern:** Can't pass next-intl `Link` as `component` prop to MUI (server/client boundary). Solved with `NavLink` wrapper (`src/components/NavLink.tsx`) — use this for all internal links. Use `getTranslations` (async) in server components, `useTranslations` in client components.

**Action required from user:**
1. Place therapist photo at `public/images/therapists/livia-malkus.jpg`
2. Fill in real details in Impressum and Datenschutz pages (translations have `[placeholder]` markers)
3. Create Supabase project (supabase.com, EU Frankfurt region, project name "help")

**To resume, next steps in order:**
1. User places therapist photo and fills in legal page details
2. Wire up Supabase client + create tables (therapists, blog_posts, contact_submissions)
3. Replace placeholder data with Supabase queries
4. Set up Cal.com and embed booking widget
5. Wire contact form to Supabase
6. Set up GitHub repo
7. Connect Cloudflare Pages for auto-deploy
8. Cookie consent banner (last remaining pre-launch legal item)

**Next.js 16 deprecation note:** Build warns "middleware" file convention is deprecated, use "proxy" instead. Current middleware.ts works but should be migrated before production.

**Single-therapist mode:** The site could easily be converted to a personal site for one therapist — change names/content, hide therapists listing page, point CTA directly to booking. Architecture already supports this.
