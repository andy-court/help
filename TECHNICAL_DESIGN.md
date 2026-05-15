# Help -- Technical Design Document

**Version:** 1.0
**Date:** May 2026
**Status:** MVP Built, Pre-Launch

---

## 1. Executive Summary

**Help** is a multilingual therapist booking platform that connects people seeking mental health support with licensed therapists. Users browse therapist profiles, read about specialties and qualifications, and book video consultation sessions -- all in one flow that ends with a Google Calendar invite and Google Meet link delivered to both parties.

The platform targets the German-speaking European market initially (with full English support), where finding a therapist is notoriously difficult due to long wait times in the public insurance system. Many therapists offering private sessions lack a modern, trustworthy web presence. Help solves this by giving therapists a polished, GDPR-compliant online home and giving clients a frictionless path from discovery to booked session.

The application is designed with a "start small, scale up" philosophy: it currently operates in single-therapist mode for one practice, but the architecture supports flipping a configuration flag to run as a multi-therapist directory or marketplace with no structural changes.

**Key differentiators:**

- Zero booking friction -- Cal.com handles scheduling, calendar sync, and video link generation without requiring user accounts
- Bilingual from day one -- full German/English support at the URL level for SEO
- Privacy-first -- no tracking cookies, minimal data collection, GDPR-aligned by design
- Cost-efficient -- runs entirely on free tiers at launch, with a clear scaling path

---

## 2. Tech Stack Overview

| Layer | Technology | Version | Role | Why Chosen |
|---|---|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.6 | Full-stack React framework | Server components for SEO, file-based routing, API routes, React 19 support |
| **Language** | TypeScript | 5.x | Type-safe development | Catches bugs at compile time, better IDE support, self-documenting code |
| **Runtime** | React | 19.2.4 | UI rendering | Latest stable with server components, streaming, and Suspense |
| **UI Library** | Material UI (MUI) | 7.x | Component library + design system | Production-ready components, built-in accessibility, theming system |
| **Styling Engine** | Emotion | 11.x | CSS-in-JS (MUI dependency) | Required by MUI, supports server-side rendering |
| **Database** | Supabase (PostgreSQL) | Client 2.105 | Data storage + future auth | Free tier generous, built-in auth for therapist login later, real-time subscriptions, EU hosting |
| **Booking** | Cal.com (embedded) | Embed 1.5.3 | Scheduling + calendar sync | Free tier, handles Google Calendar + Meet integration, embeddable widget |
| **i18n** | next-intl | 4.11.2 | Internationalization | URL-based locale routing (/en, /de), SEO-friendly, tight Next.js integration |
| **Hosting** | Cloudflare Pages | -- | Static + edge hosting | Free tier with unlimited bandwidth, global CDN, auto-deploy from GitHub |
| **Package Manager** | Yarn | Classic | Dependency management | Faster installs than npm, deterministic lockfile |
| **Testing** | Jest + Testing Library | 29.x / 16.x | Unit + component testing | Industry standard, good TypeScript support via ts-jest |
| **Linting** | ESLint | 9.x | Code quality | Next.js-specific rules, enforced via `yarn lint` |
| **Version Control** | GitHub | -- | Source code + CI/CD trigger | Industry standard, integrates with Cloudflare Pages for auto-deploy |

---

## 3. Design Decisions & Alternatives

### 3.1 Framework: Next.js (App Router)

**Why chosen:** Next.js provides server-side rendering (critical for SEO on therapist profile pages), file-based routing that maps cleanly to our page structure, and built-in API routes for server actions like contact form submission. The App Router with React Server Components means therapist profiles and blog posts render on the server with zero client-side JavaScript for the content itself, improving load times and Core Web Vitals.

**Runner-up: Vite + React Router.** Would have been simpler and faster to develop initially. Not chosen because it produces a client-side SPA, which means search engines would need to execute JavaScript to index therapist profiles and blog posts. For a service business where organic search is the primary acquisition channel, SSR is non-negotiable.

**Tradeoffs:** Next.js has a steeper learning curve, a more complex mental model (server vs. client components, the "use client" boundary), and the App Router is still maturing. The build toolchain is heavier than Vite. Cloudflare Pages deployment requires the `@cloudflare/next-on-pages` adapter, which has some limitations compared to Vercel's native hosting.

### 3.2 UI Library: Material UI (MUI) v7

**Why chosen:** MUI provides a complete design system out of the box -- buttons, cards, dialogs, form inputs, navigation, icons, responsive grid -- all with built-in accessibility (ARIA attributes, keyboard navigation, screen reader support). For a solo developer building a production-quality site, this eliminates hundreds of hours of UI work. The theming system allowed us to define the warm sage green (#6B8F71) and beige (#C9A96E) palette once and have it propagate everywhere.

**Runner-up: Tailwind CSS + shadcn/ui.** Would have produced a more unique visual design and smaller CSS bundles. Not chosen because it requires significantly more manual work for accessibility, responsive behavior, and component composition. Every component would need to be assembled from primitives rather than configured from a complete library.

**Tradeoffs:** MUI adds approximately 80-120KB to the JavaScript bundle (tree-shaken). The Emotion CSS-in-JS runtime has a performance cost compared to static CSS extraction (Tailwind). Sites built with MUI can look "Material-ish" without significant theming effort -- though the custom palette and border-radius settings help differentiate. MUI also requires special handling for server-side rendering with Next.js (the `@mui/material-nextjs` adapter with Emotion cache).

### 3.3 Database: Supabase (PostgreSQL)

**Why chosen:** Supabase provides a hosted PostgreSQL database with a generous free tier (500MB storage, 50K monthly active users for auth), a clean JavaScript SDK, built-in Row Level Security for future multi-tenant auth, and EU region hosting (Frankfurt) for GDPR compliance. The built-in auth system means we can add therapist login later without integrating a separate auth provider.

**Runner-up: Markdown files in the repository.** For a single-therapist site, storing bios and blog posts as Markdown files in the repo would have been simpler (no external dependency, version-controlled content). Not chosen because it does not scale: adding a therapist means a code deploy, there is no admin UI for content editing, and it eliminates the possibility of real-time features or user-generated content.

**Also considered: Headless CMS (Sanity, Strapi, Contentful).** Would have provided a polished content editing experience. Not chosen because the free tiers are more restrictive, it adds another service to manage, and the data model is simple enough that Supabase's table editor works fine for now.

**Tradeoffs:** Supabase is an external dependency -- if the service goes down, the site cannot load therapist data. The anon key is exposed to the client (by design, protected by Row Level Security), which requires careful RLS policy configuration. The free tier limits to 2 projects and has a 1-week inactivity pause for the database.

### 3.4 Booking System: Cal.com (Embedded)

**Why chosen:** Cal.com is open-source scheduling software that handles the entire booking flow: availability display, timezone detection, booking confirmation, Google Calendar event creation with Google Meet links, and email notifications to both parties. The embeddable React widget (`@calcom/embed-react`) drops into our booking page as a component. The free tier supports one user with unlimited bookings.

**Runner-up: Direct Google Calendar API integration.** Would have given full control over the booking experience and UI. Not chosen because it requires building availability logic, conflict detection, timezone handling, email notifications, and Meet link generation from scratch -- weeks of work that Cal.com handles out of the box.

**Also considered:** Calendly (no free embed, limited customization), TidyCal (simpler but less feature-rich), Acuity/Squarespace Scheduling (no free tier).

**Tradeoffs:** The Cal.com embed introduces an iframe, which limits visual customization and adds a dependency on Cal.com's uptime. The embed loads its own JavaScript bundle, increasing page weight on the booking page. Each therapist needs their own Cal.com account, which means onboarding friction. The free tier is limited to one user -- multi-therapist mode requires paid plans or self-hosting.

### 3.5 i18n: next-intl with URL-Based Routing

**Why chosen:** next-intl provides URL-based locale routing (`/en/therapists`, `/de/therapeuten`), which is the SEO-optimal approach -- search engines see each language version as a distinct, indexable page with proper `hreflang` tags. It integrates deeply with Next.js App Router, supporting both server and client component translation patterns.

**Runner-up: Simple toggle (same URL, client-side language switch).** Would have been simpler to implement. Not chosen because Google treats same-URL content swaps as a single page, so the German version would not rank independently in German search results. For a German-market therapy site, ranking in German Google is essential.

**Tradeoffs:** URL-based i18n doubles the page count (every page exists at both `/en/` and `/de/`), which adds complexity to sitemap generation, canonical URLs, and internal linking. The middleware that detects locale and redirects adds a small latency cost to every request. Content stored in Supabase needs locale-specific columns (e.g., `bio_en`, `bio_de`) rather than a single field.

### 3.6 Hosting: Cloudflare Pages

**Why chosen:** Cloudflare Pages offers free hosting with unlimited bandwidth, a global CDN with edge nodes close to European users, automatic HTTPS, and auto-deploy from GitHub on push. For a site targeting German users, Cloudflare's Frankfurt edge node provides excellent latency.

**Runner-up: Vercel.** Vercel is the creator of Next.js and provides the best developer experience for Next.js apps (zero-config deployment, preview deployments, analytics). Not chosen because the free tier has bandwidth limits (100GB/month), and Cloudflare's unlimited bandwidth is more predictable for cost planning. Vercel also charges for commercial use on the free tier.

**Also considered:** Netlify (similar to Vercel, bandwidth-limited free tier).

**Tradeoffs:** Next.js on Cloudflare Pages requires the `@cloudflare/next-on-pages` adapter, which does not support all Next.js features (notably, ISR/revalidation has limitations). Some Next.js features work best on Vercel. Debugging build issues can be harder on Cloudflare than on Vercel.

### 3.7 Package Manager: Yarn

**Why chosen:** Yarn Classic provides faster installs than npm (parallel downloads), a deterministic lockfile, and shorter CLI commands (`yarn` vs. `npm install`, `yarn dev` vs. `npm run dev`).

**Runner-up: npm.** Comes bundled with Node.js, zero setup required. Not chosen purely for developer preference -- the performance and ergonomic differences are marginal in a project this size.

**Tradeoffs:** Adds a lockfile format (`yarn.lock`) that differs from npm's `package-lock.json`. Contributors need Yarn installed. The ecosystem is slowly consolidating around npm for simplicity.

---

## 4. Architecture

### 4.1 High-Level Architecture

```
Client (Browser)
    |
    v
Cloudflare Pages CDN (Global Edge Network)
    |
    v
Next.js App Router (Server-Side Rendering)
    |
    +---> Supabase (PostgreSQL, EU Frankfurt)
    |       - Therapist profiles
    |       - Blog posts
    |       - Contact form submissions
    |
    +---> Cal.com (Embedded iframe)
            - Scheduling UI
            - Google Calendar sync
            - Google Meet link generation
```

### 4.2 Component Architecture

The application uses Next.js App Router conventions with a clear server/client component boundary:

**Server Components (default):** Pages, layouts, and data-fetching components. These run on the server at request time, fetch data from Supabase, and stream rendered HTML to the client. Examples: therapist profile pages, blog post pages, the therapists listing.

**Client Components ("use client"):** Interactive elements that need browser APIs or React state. These are kept as small leaf components to minimize the client JavaScript bundle. Examples: the language switcher, the contact form, the Cal.com booking embed, the mobile navigation menu, the MUI theme provider.

**Key pattern -- NavLink wrapper:** MUI's component system and next-intl's `Link` component conflict at the server/client boundary (MUI expects a client component for the `component` prop, but next-intl's Link is a server component). This is solved with a `NavLink` wrapper component that bridges the two, used consistently for all internal navigation to ensure SPA-style client-side transitions.

### 4.3 Routing Structure

```
src/app/
  layout.tsx                    # Root layout (metadata, global CSS)
  globals.css                   # Minimal reset styles
  [locale]/                     # Dynamic locale segment (/en, /de)
    layout.tsx                  # Locale layout (MUI ThemeProvider, Header, next-intl)
    page.tsx                    # Home page
    about/page.tsx              # About page
    faq/page.tsx                # FAQ page
    contact/page.tsx            # Contact form
    therapists/page.tsx         # Therapist listing
    therapists/[slug]/page.tsx  # Individual therapist profile
    booking/[slug]/page.tsx     # Cal.com embed for therapist
    blog/page.tsx               # Blog listing
    blog/[slug]/page.tsx        # Individual blog post
    impressum/page.tsx          # Legal: Impressum (German law)
    datenschutz/page.tsx        # Legal: Privacy Policy (GDPR)
```

### 4.4 Data Flow

1. **Page request:** User visits `/de/therapists/livia-malkus`
2. **Locale resolution:** next-intl middleware reads the `/de` segment, loads German translations
3. **Server rendering:** The page server component calls Supabase to fetch the therapist row by slug
4. **Content localization:** The component reads `bio_de` and `title_de` fields (locale-specific columns)
5. **HTML streaming:** Rendered HTML streams to the client; MUI styles are extracted server-side via Emotion cache
6. **Client hydration:** Minimal JavaScript hydrates interactive elements (navigation, language switcher)
7. **Booking flow:** User clicks "Book Session," navigates to `/de/booking/livia-malkus`, where the Cal.com embed loads in an iframe with the therapist's `cal_username`

### 4.5 Configuration: Single vs. Multi-Therapist Mode

The `siteConfig.ts` file controls the site's operating mode:

```typescript
export const siteConfig = {
  mode: "single" as "single" | "multi",
  singleTherapistSlug: "livia-malkus",
};
```

- **Single mode:** The "About" page shows the therapist's profile directly. The "Book Session" CTA links to that therapist's booking page. The therapist listing page is hidden from navigation.
- **Multi mode:** The navigation shows a "Therapists" link. The "Book Session" CTA links to the therapist listing. Each therapist card links to their profile, which links to their booking page.

This is a compile-time configuration -- changing it requires a redeploy, which is intentional (the site owner decides the mode, not the user).

---

## 5. Integrations

### 5.1 Cal.com -- Booking & Scheduling

**How it works:**

1. Each therapist creates a Cal.com account and connects their Google Calendar
2. In Cal.com, they enable Google Meet as the video conferencing provider
3. Their Cal.com username (e.g., `livia-malkus`) is stored in the Supabase `therapists` table as `cal_username`
4. On the booking page, the `@calcom/embed-react` package renders Cal.com's scheduling interface inside an iframe
5. The embed automatically shows the therapist's available time slots based on their Google Calendar
6. When a client books, Cal.com creates a Google Calendar event on both the therapist's and client's calendars, with a Google Meet link attached

**Data flow:** Help (our app) never touches calendar data directly. Cal.com acts as the intermediary between our booking page and Google Calendar/Meet APIs. This means we do not need to handle OAuth tokens, calendar permissions, or video link generation.

**Limitations:** The embed is an iframe, so styling is limited to Cal.com's theming options. The client must interact with Cal.com's UI, which may differ visually from the rest of the site.

### 5.2 Supabase -- Data Layer

**How it works:**

- The Supabase client is initialized once in `src/lib/supabase.ts` using the public URL and anonymous key
- Data is read using Supabase's query builder (e.g., `supabase.from('therapists').select('*').eq('slug', slug)`)
- Contact form submissions use Next.js server actions to write to the `contact_submissions` table server-side (the anon key has insert permission on that table via RLS)
- The Supabase instance is hosted in EU Frankfurt for GDPR compliance

**Tables:**
- `therapists` -- profiles with locale-specific bio/title columns, photo URL, specialties array, Cal.com username
- `blog_posts` -- articles with locale column, author FK to therapists, published flag
- `contact_submissions` -- name, email, message from contact form

### 5.3 Google Meet -- Video Sessions

Google Meet is not directly integrated with our application. The integration path is:

```
Therapist connects Google Calendar to Cal.com
    --> Cal.com enables "Add Google Meet" for event types
        --> Client books via Cal.com embed on our site
            --> Cal.com creates Google Calendar event with Meet link
                --> Both parties receive calendar invite with Meet link via email
```

Our application never interacts with Google APIs. This keeps the integration simple and avoids the need for Google OAuth scopes or API keys.

---

## 6. Scaling Strategy

### 6.1 Database Scaling (Supabase)

| Scale | Users | Strategy |
|---|---|---|
| **Solo** (current) | <1K monthly | Free tier: 500MB storage, shared compute, 50K auth users |
| **Small practice** (5-10 therapists) | 1K-10K monthly | Free tier likely still sufficient; monitor API request volume |
| **Medium** (50+ therapists) | 10K-100K monthly | **Pro plan ($25/month):** 8GB storage, dedicated compute, daily backups, 7-day log retention, no pause on inactivity |
| **Platform** (1000+ therapists) | 100K-1M monthly | **Team/Enterprise ($599+/month):** SOC2 compliance, read replicas for geographic distribution, connection pooling via PgBouncer (built-in), point-in-time recovery, priority support |

**Key scaling actions:**
- Enable connection pooling (PgBouncer, built into Supabase) when concurrent connections exceed 20
- Add database indexes on `therapists.slug`, `blog_posts.slug`, and `blog_posts.locale` as query volume grows
- Implement read replicas for geographically distributed users (e.g., EU + US)
- Move from locale-specific columns (`bio_en`, `bio_de`) to a separate `therapist_translations` table with a locale FK for cleaner multi-locale support

### 6.2 Hosting Scaling (Cloudflare)

| Scale | Strategy |
|---|---|
| **Solo** (current) | Cloudflare Pages free tier: unlimited bandwidth, 500 builds/month |
| **Small practice** | Same free tier; add Cloudflare Web Analytics (free, cookie-less) |
| **Medium** | **Cloudflare Pages Pro ($20/month):** 5000 builds/month, more concurrent builds. Consider migrating to **Cloudflare Workers** for full SSR at the edge with streaming |
| **Platform** | Cloudflare Workers + KV/D1 for edge caching. Consider **Vercel Enterprise** if full Next.js feature parity becomes critical. Implement ISR (Incremental Static Regeneration) for therapist profiles -- regenerate on edit, serve static at edge |

**Edge caching strategy:**
- Therapist profile pages change infrequently -- cache at the edge with a 1-hour TTL, revalidate on Supabase webhook
- Blog posts are nearly static -- cache aggressively with a 24-hour TTL
- Booking pages must always be fresh (Cal.com embed fetches availability in real-time from within the iframe, so the host page itself can be cached)

### 6.3 Booking System Scaling (Cal.com)

| Scale | Plan | Cost | Limitations |
|---|---|---|---|
| **Solo** (1 therapist) | Free | $0 | 1 user, unlimited bookings, 1 event type |
| **Small practice** (5-10) | Team plan | ~$12/user/month | Multiple event types, team scheduling, round-robin |
| **Medium** (50+) | Organization plan | Custom pricing | Sub-teams, SAML SSO, admin management |
| **Platform** (1000+) | Self-hosted Cal.com | Server costs only | Full control, no per-user fees, requires DevOps |

**Self-hosting consideration:** Cal.com is open source (AGPL license). At scale, self-hosting eliminates per-user fees and provides full API access. The tradeoff is operational complexity: hosting, updating, monitoring, and maintaining the Cal.com instance. This becomes viable at approximately 50+ therapists, where per-user Cal.com fees exceed hosting costs.

### 6.4 i18n Scaling

Adding a new locale requires:
1. Create a new translation file (`messages/fr.json`, etc.)
2. Add the locale to the `routing.ts` configuration
3. Add locale-specific columns to Supabase tables (or migrate to a translations table)
4. Update the language switcher component

**Effort estimate:** 2-3 days per new locale for the UI translations; content translation (bios, blog posts) is an ongoing cost. At 5+ locales, migrating from per-column to per-row locale storage in Supabase becomes important to avoid column proliferation.

### 6.5 Content Scaling

**Blog:** Currently stored in Supabase as Markdown. At 100+ posts, add full-text search (Supabase supports PostgreSQL `tsvector` search), pagination, and category/tag filtering. At 1000+ posts, consider a dedicated search service (Algolia, Meilisearch) for faster, typo-tolerant search.

**Therapist profiles:** At 50+ therapists, add search and filter by specialty, location, language, and availability. At 500+, add geographic search (PostGIS extension in Supabase) and a matching quiz to help clients find the right therapist.

---

## 7. Cost Analysis

### 7.1 Solo Therapist (Current State)

| Service | Plan | Monthly Cost |
|---|---|---|
| Cloudflare Pages | Free | $0 |
| Supabase | Free | $0 |
| Cal.com | Free (1 user) | $0 |
| GitHub | Free | $0 |
| Domain | Cloudflare .pages.dev subdomain | $0 |
| **Total** | | **$0/month** |

A custom domain (e.g., `help-therapy.de`) adds approximately $10-15/year through Cloudflare Registrar.

### 7.2 Small Practice (5-10 Therapists)

| Service | Plan | Monthly Cost |
|---|---|---|
| Cloudflare Pages | Free | $0 |
| Supabase | Free (likely still sufficient) | $0 |
| Cal.com | Team ($12/user/month x 7 users avg) | ~$84 |
| GitHub | Free | $0 |
| Domain | Custom .de domain | ~$1 |
| Email (optional) | Google Workspace or Zoho | ~$7 |
| **Total** | | **~$92/month** |

Cal.com is the first thing that costs money at this tier. The primary cost driver is per-therapist scheduling.

### 7.3 Medium Practice (50+ Therapists)

| Service | Plan | Monthly Cost |
|---|---|---|
| Cloudflare Pages | Pro (5000 builds/month) | $20 |
| Supabase | Pro (8GB, dedicated compute) | $25 |
| Cal.com (self-hosted) | VPS hosting (e.g., Hetzner) | ~$40 |
| GitHub | Team (if needed for org features) | $4/user or Free |
| Domain + DNS | Cloudflare | ~$1 |
| Email | Google Workspace (admin accounts) | ~$14 |
| Monitoring | Sentry free tier or Cloudflare analytics | $0 |
| **Total** | | **~$100-120/month** |

Self-hosting Cal.com at this tier saves significant money: 50 users x $12/month = $600/month on Cal.com hosted vs. ~$40/month for a VPS. The breakeven point for self-hosting is approximately 4-5 therapists.

### 7.4 Platform (1000+ Therapists, Marketplace Model)

| Service | Plan | Monthly Cost |
|---|---|---|
| Cloudflare Workers + Pages | Pro/Business | $50-200 |
| Supabase | Team/Enterprise | $599-1,500 |
| Cal.com (self-hosted, HA) | Multi-server cluster | $200-500 |
| CDN / Media storage | Cloudflare R2 for therapist photos, blog images | $15-50 |
| Search | Algolia or Meilisearch (self-hosted) | $0-100 |
| Email transactional | Resend or Postmark | $20-80 |
| Monitoring | Sentry, Datadog, or Grafana Cloud | $50-200 |
| Support infrastructure | Help desk, status page | $50-100 |
| **Total** | | **~$1,000-2,700/month** |

At platform scale, infrastructure costs are modest relative to revenue. The primary costs shift to personnel (customer support, sales, engineering) and marketing.

### 7.5 Cost Summary Table

| Scale | Therapists | Monthly Infra Cost | Cost per Therapist |
|---|---|---|---|
| Solo | 1 | $0 | $0 |
| Small Practice | 5-10 | ~$92 | ~$9-18 |
| Medium | 50 | ~$110 | ~$2.20 |
| Platform | 1,000 | ~$2,000 | ~$2.00 |

The economics improve dramatically at scale -- cost per therapist drops from $18 to $2 as fixed infrastructure costs are amortized.

---

## 8. Monetization Strategies

### 8.1 SaaS Subscription (Monthly Fee per Therapist)

**Model:** Therapists pay a monthly fee for their profile listing, booking page, and admin dashboard.

| Tier | Price | Features |
|---|---|---|
| Basic | $19/month | Profile listing, booking page, basic analytics |
| Professional | $39/month | Blog posts, SEO optimization, priority support |
| Premium | $69/month | Custom subdomain, advanced analytics, AI-powered bio optimization |

**Implementation complexity:** Medium. Requires building a therapist onboarding flow, Stripe integration for billing, and a self-service dashboard. Estimated 4-6 weeks of development.

**Revenue potential:** High. At 100 therapists averaging $30/month, this generates $3,000/month ($36K/year). At 1,000 therapists, $30K/month ($360K/year). The SaaS model provides predictable recurring revenue.

### 8.2 Commission per Booking

**Model:** Take a percentage (5-15%) of each session fee, or a flat fee ($2-5) per booking.

**Implementation complexity:** High. Requires knowing the session price (which Cal.com does not natively report back to us), implementing payment processing (Stripe Connect or similar), and managing payouts. Alternatively, therapists self-report session prices and we bill monthly based on booking count from Cal.com webhooks. Estimated 6-8 weeks.

**Revenue potential:** Medium-High. A therapist seeing 20 clients/week at $100/session generates $2,000/week. At 10% commission, that is $200/week per therapist. However, therapists may resist commission models, and tracking/verification is complex.

### 8.3 Freemium Model

**Model:** Basic listing is free. Premium features require a paid subscription.

| Free | Premium ($29/month) |
|---|---|
| Profile with name, photo, specialties | Rich profile with bio, credentials, blog |
| Basic booking link | Embedded Cal.com scheduling |
| Listed on directory | Featured placement in search results |
| -- | Analytics dashboard |
| -- | SEO-optimized profile page |

**Implementation complexity:** Low-Medium. The free tier is essentially the current product with limited fields. Premium unlocks additional database columns and features behind a flag. Estimated 3-4 weeks.

**Revenue potential:** Medium. Freemium works well for marketplaces -- the free tier attracts supply (therapists), and premium features convert a percentage (typical 2-5% conversion). At 5,000 free listings and 3% conversion, that is 150 paying users at $29/month = $4,350/month.

### 8.4 White-Label Licensing

**Model:** License the platform to therapy practices, clinics, or mental health organizations who deploy it under their own brand.

| License Tier | Price | Includes |
|---|---|---|
| Single Practice | $199/month | Hosted instance, custom domain, up to 20 therapists |
| Clinic | $499/month | Up to 100 therapists, custom branding, API access |
| Enterprise | $999+/month | Unlimited therapists, SSO, dedicated support, SLA |

**Implementation complexity:** Medium-High. Requires multi-tenancy (each client gets isolated data), theming/branding configuration, and a deployment pipeline for new instances. Estimated 8-12 weeks.

**Revenue potential:** High. White-label SaaS commands premium pricing because it replaces custom development. A clinic paying a developer $10K+ to build a booking site would gladly pay $500/month for a maintained, updated platform. 20 clinic clients at $500/month = $10K/month.

### 8.5 Premium Features (Add-Ons)

| Feature | Price | Implementation | Revenue Potential |
|---|---|---|---|
| **AI-Powered Therapist Matching** | $5/match or included in premium | Build a questionnaire, use an LLM to match client needs to therapist specialties | Medium -- high perceived value, differentiator |
| **Video Content Library** | $9.99/month (client-facing) | Host educational videos, meditation guides, worksheets behind a paywall | Medium -- recurring revenue from clients, not just therapists |
| **Analytics Dashboard** | Included in premium tiers | Booking rates, profile views, popular times, client demographics | Low direct revenue, but drives premium upgrades |
| **Group Sessions** | $5/booking surcharge | Integrate Cal.com team events, support multi-participant Meet links | Low-Medium -- niche but growing market |
| **AI Chatbot (Triage)** | $99/month per practice | Pre-session intake chatbot that collects symptoms and suggests therapist matches | Medium-High -- reduces therapist admin time, high willingness to pay |
| **Insurance Verification** | $2/verification | Integrate with insurance APIs to verify coverage before booking | High -- solves a major pain point in the German market |

### 8.6 Advertising & Featured Listings

**Model:** Therapists pay for enhanced visibility -- featured placement on the homepage, "sponsored" badges in search results, or geographic targeting.

| Ad Product | Price |
|---|---|
| Featured on homepage (1 week) | $49/week |
| Top of search results (per locale) | $29/month |
| "Accepting new clients" badge | $9/month |

**Implementation complexity:** Low. Add a `featured` boolean and `featured_until` timestamp to the therapists table. Sort featured therapists first. Estimated 1-2 weeks.

**Revenue potential:** Low-Medium. Requires significant traffic to make advertising valuable to therapists. At 10K monthly visitors and 50 therapists, featured listings could generate $500-1,000/month. Works best as a supplement to subscription revenue, not a primary model.

### 8.7 Recommended Strategy

**Phase 1 (0-50 therapists):** Free for all. Focus on building supply and demand. No monetization.

**Phase 2 (50-200 therapists):** Introduce freemium model. Basic listing free, premium features at $29/month. Target 5-10% conversion.

**Phase 3 (200-1000 therapists):** Add white-label licensing for practices. Launch AI therapist matching. Introduce featured listings.

**Phase 4 (1000+ therapists):** Full SaaS pricing tiers. Commission model for high-volume practices. Enterprise deals with clinics and hospital networks.

---

## 9. Security Posture

### 9.1 Current Security Measures (Implemented)

| Measure | Status | Details |
|---|---|---|
| **Content Security Policy (CSP)** | Implemented | Restricts script sources to self + Cal.com, blocks object embeds, prevents framing, upgrades insecure requests. Defined in `next.config.ts`. |
| **X-Content-Type-Options** | Implemented | `nosniff` -- prevents MIME-type sniffing attacks |
| **X-Frame-Options** | Implemented | `DENY` -- prevents the site from being embedded in iframes (clickjacking protection) |
| **Referrer-Policy** | Implemented | `strict-origin-when-cross-origin` -- limits referrer information leaked to third parties |
| **Permissions-Policy** | Implemented | Disables geolocation, microphone, and camera access (not needed) |
| **HTTPS** | Enforced | Cloudflare Pages enforces HTTPS with auto-provisioned TLS certificates; CSP includes `upgrade-insecure-requests` |
| **Environment variables** | Secured | Supabase credentials stored in `.env.local` (gitignored), not committed to source |
| **Honeypot spam protection** | Implemented | Contact form includes a hidden field; submissions with this field filled are silently rejected (bot trap) |
| **Input validation** | Partial | Server actions validate required fields; TypeScript provides type-level safety |
| **Dependency management** | Lockfile | `yarn.lock` ensures deterministic installs; dependencies should be audited regularly with `yarn audit` |

### 9.2 Planned Security Measures (Pre-Launch)

| Measure | Priority | Details |
|---|---|---|
| **Cloudflare Turnstile CAPTCHA** | High | Replace honeypot-only protection with Cloudflare's privacy-preserving CAPTCHA on the contact form. Free, no user-facing challenge in most cases. |
| **Security audit** | High | Review all inputs, API routes, and headers. Check for SQL injection (Supabase SDK parameterizes queries, but verify), XSS (React escapes by default, but verify `dangerouslySetInnerHTML` usage in blog rendering), and CSRF (server actions include built-in CSRF tokens in Next.js). |
| **Rate limiting** | Medium | Add rate limiting to the contact form server action to prevent abuse. Cloudflare offers free rate limiting rules. |
| **Cookie consent** | High (Legal) | EU law requires consent for non-essential cookies. Currently no cookies are set (Supabase anon key is not cookie-based, Cloudflare Analytics is cookie-free), but a consent banner should be present for compliance. |
| **Supabase Row Level Security (RLS)** | Medium | Currently, RLS policies should be reviewed to ensure the anon key can only SELECT from `therapists` and `blog_posts`, and only INSERT into `contact_submissions`. No UPDATE or DELETE via anon key. |
| **Dependency auditing** | Ongoing | Run `yarn audit` regularly. Set up GitHub Dependabot alerts for known vulnerabilities. |
| **CSP nonce migration** | Low | Current CSP uses `'unsafe-inline'` for styles (required by MUI/Emotion). Migrating to nonce-based CSP would be more secure but requires Emotion configuration changes. |

### 9.3 GDPR Compliance

| Requirement | Status |
|---|---|
| Privacy policy (Datenschutz) | Page exists, placeholder content needs real details |
| Legal notice (Impressum) | Page exists, placeholder content needs real details |
| Data minimization | Only name, email, message collected via contact form |
| Right to deletion | Manual via Supabase dashboard; automated flow needed at scale |
| Data location | Supabase hosted in EU Frankfurt |
| Cookie consent | Planned (currently no non-essential cookies set) |
| Third-party data processors | Cal.com (booking data), Cloudflare (hosting/CDN), Google (Meet links via Cal.com) -- must be listed in privacy policy |

### 9.4 Security Architecture Diagram

```
Client Browser
    |
    | HTTPS (TLS 1.3, Cloudflare-managed)
    v
Cloudflare Edge (DDoS protection, WAF rules, rate limiting)
    |
    | CSP headers applied
    v
Next.js Application
    |
    +---> Supabase (RLS policies, parameterized queries)
    |       Connection: HTTPS + anon key (public, read-only by policy)
    |       Server actions: HTTPS + anon key (insert to contact_submissions only)
    |
    +---> Cal.com iframe (sandboxed, CSP frame-src restricted)
            No direct data exchange with our backend
```

---

## Appendix A: File Structure

```
help/
  .env.local                  # Supabase credentials (gitignored)
  next.config.ts              # Next.js config with CSP headers + next-intl plugin
  package.json                # Dependencies and scripts
  yarn.lock                   # Deterministic dependency lockfile
  jest.config.ts              # Test configuration
  jest.setup.ts               # Test setup (Testing Library matchers)
  messages/
    en.json                   # English translations
    de.json                   # German translations
  public/
    images/                   # Static assets (therapist photos, etc.)
  src/
    siteConfig.ts             # Single/multi therapist mode toggle
    theme.ts                  # MUI theme (sage green + warm beige palette)
    middleware.ts              # next-intl locale detection and routing
    i18n/
      request.ts              # next-intl server config (message loading)
      routing.ts              # Locale definitions (en, de) and default locale
    lib/
      supabase.ts             # Supabase client initialization
    components/               # Shared React components (NavLink, Header, etc.)
    app/
      layout.tsx              # Root layout (metadata, globals)
      globals.css             # Minimal CSS reset
      [locale]/               # All locale-prefixed pages
        layout.tsx            # MUI ThemeProvider, Header, next-intl provider
        page.tsx              # Home
        about/page.tsx
        faq/page.tsx
        contact/page.tsx
        therapists/page.tsx
        therapists/[slug]/page.tsx
        booking/[slug]/page.tsx
        blog/page.tsx
        blog/[slug]/page.tsx
        impressum/page.tsx
        datenschutz/page.tsx
```

## Appendix B: Environment Variables

| Variable | Purpose | Where Set |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (EU Frankfurt) | `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public API key | `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO metadata | `.env.local` or Cloudflare Pages env |

## Appendix C: Key Commands

| Command | Purpose |
|---|---|
| `yarn dev` | Start dev server with Turbopack |
| `yarn build` | Production build |
| `yarn start` | Serve production build locally |
| `yarn lint` | Run ESLint |
| `yarn tsc` | Type-check without emitting |
| `yarn test` | Run Jest tests |
| `yarn test:watch` | Run Jest in watch mode |

---

*This document reflects the state of the Help platform as of May 2026. It should be updated as architectural decisions evolve.*
