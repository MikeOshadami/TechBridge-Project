# TechBridge — Implementation Plan

> **Version:** 1.0 · **Stage:** MVP · **Timeline:** 6 Weeks  
> **Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Vercel  
> **Region:** Greater Moncton, NB · **Bilingual:** EN/FR throughout

---

## Overview

Three phases across 6 weeks. Each phase is independently testable and deployable. Phase 1 builds the full UI without a backend. Phase 2 connects the backend. Phase 3 is QA, polish, and launch.

| Phase | Timeline | Definition of Done |
|---|---|---|
| Phase 1: Foundation | Weeks 1–2 | All 9 pages on localhost, bilingual, WCAG baseline |
| Phase 2: Backend Integration | Weeks 3–4 | Forms submit to Supabase, admin actions persist, emails fire |
| Phase 3: QA & Launch | Weeks 5–6 | Deployed on Vercel, QA complete, pilot orgs onboarded |

---

## Phase 1 — Foundation (Weeks 1–2)

**Goal:** Working scaffold with all 9 pages built, styled, and bilingual. No backend yet. All forms `console.log` submissions.

### 1.1 Project Setup

- [ ] Confirm Next.js 14 App Router is scaffolded with TypeScript (already initialized)
- [ ] Configure `tailwind.config.ts` with custom evergreen colour palette tokens:
  - `evergreen-800: #254135`, `evergreen-700: #376250`, `evergreen-600: #49836b`
  - `evergreen-100: #deede7`, `evergreen-50: #eff6f3`
  - `harvest-gold: #C8892A`, `brick-red: #8B1A1A`
- [ ] Load Google Fonts: **Bree Serif** (headings) and **Source Sans 3** (body) via `app/layout.tsx`
- [ ] Set global CSS baseline: min `18px` body, `48px` button height, `3px` focus outline in `globals.css`
- [ ] Add `<html lang="en">` to `layout.tsx` (switches to `"fr"` with language toggle)
- [ ] Add invisible skip-to-content link in `layout.tsx`
- [ ] Create `.env.local` from `.env.example` (Supabase vars — empty for now)

### 1.2 Shared Components

- [ ] **`components/Navbar.tsx`** — shared across all pages
  - TechBridge logo/wordmark (left)
  - EN/FR language toggle button (right) using React `useState`
  - Language state stored in context or lifted to layout
  - WCAG: visible focus ring, `aria-label` on toggle
- [ ] **`contexts/LanguageContext.tsx`** — provides `lang` (`"en"` | `"fr"`) and `setLang` to all pages
- [ ] **`lib/i18n.ts`** — export a translation map with all EN/FR string pairs used across the app

### 1.3 Landing Page (`app/page.tsx`)

- [ ] Hero section: platform name, tagline, 2-sentence description
- [ ] Explicit org-only statement visible above the fold
- [ ] Two large CTA buttons: "I Need Tech" → `/receive` and "I Want to Donate" → `/donate`
- [ ] "How It Works" 3-column strip: Request → Review → Connect
- [ ] Split section: For Nonprofits (left) / For Donors (right)
- [ ] Footer: TechBridge name, org-only note, admin contact email placeholder, language toggle
- [ ] All text bilingual via `LanguageContext`
- [ ] WCAG: H1, logical heading order, 4.5:1 contrast on all text/bg pairs

### 1.4 Receiver Flow

**`app/receive/page.tsx`** — Receiver Intro

- [ ] Overview of the 3-step process with a visual timeline
- [ ] CTA button to `/receive/request`
- [ ] Bilingual

**`app/receive/request/page.tsx`** — Tech Request Form

- [ ] Step indicator component (1 of 3 / 2 of 3 / 3 of 3) — visible at top
- [ ] **Step 1 — Organization:**
  - org name (text, max 200), org type (dropdown), city (text, prefill Moncton), province (dropdown, default NB), contact name (max 100), email (valid format, not personal), phone (valid format), website (optional, valid URL)
- [ ] **Step 2 — What You Need:**
  - category (dropdown), item description (text, max 500), quantity (integer, min 1, max 9999), min specs (textarea, max 1000, optional), intended use (textarea, max 1000), contact preference (radio)
- [ ] **Step 3 — Confirm:**
  - read-only summary of all fields from steps 1 & 2
  - org confirmation checkbox (required)
  - Submit button (disabled until checkbox checked)
- [ ] On submit: `console.log(formData)` + show success screen
- [ ] Client-side validation on each step before "Next" advances
- [ ] All labels visible above inputs — no placeholder-only fields
- [ ] Bilingual — all field labels, errors, and helper text

### 1.5 Donor Flow

**`app/donate/page.tsx`** — Donor Entry + Format Gate

- [ ] Warning box: `brick-red` border, large ⚠ icon, full data-wipe requirement text in EN and FR
- [ ] Acknowledgement checkbox — **hard gate** (no skip, no dismiss without check)
- [ ] On check: two CTA cards fade in — "Browse Needs Board" (`/donate/needs`) and "Post a Donation" (`/donate/offer`)
- [ ] CTA cards hidden/disabled until checkbox is checked
- [ ] Bilingual

**`app/donate/needs/page.tsx`** — Needs Board

- [ ] Filter bar: City (Moncton / Riverview / Dieppe / All) and Category (all values)
- [ ] Filters apply instantly via React `useState` — no submit button
- [ ] Active request count label: "Showing X of Y requests"
- [ ] Listing cards: org name, city badge, category badge, description, quantity, date, "Contact Organization" button
- [ ] Status badges: Active (green) / Fulfilled (gray)
- [ ] Fulfilled cards at bottom, reduced opacity
- [ ] Empty state: helpful message when no results match filters
- [ ] Use dummy/seed data array for Phase 1
- [ ] Bilingual

**`app/donate/offer/page.tsx`** — Post a Donation

- [ ] Donor org name, city, province, contact name, email, phone, category, item description, quantity, condition (dropdown), logistics (radio), notes (optional)
- [ ] Format confirmation checkbox — submit button disabled until checked
- [ ] On submit: `console.log(formData)` + show success screen
- [ ] Client-side validation
- [ ] Bilingual

### 1.6 Listing Detail (`app/listing/[id]/page.tsx`)

- [ ] Dynamic route — renders from dummy data array keyed by `id`
- [ ] Displays: org name, city, category, description, quantity, intended use, contact name, email, phone
- [ ] "Contact Organization" CTA (mailto link or phone link)
- [ ] Status badge (Active / Fulfilled)
- [ ] Bilingual

### 1.7 Admin Flow

**`app/admin/login/page.tsx`** — Admin Login

- [ ] Username + password form
- [ ] On submit: check against hardcoded credentials (Phase 1 only)
- [ ] On success: set `localStorage` flag + redirect to `/admin`
- [ ] Show error on invalid credentials
- [ ] No public link to this page

**`app/admin/page.tsx`** — Admin Dashboard

- [ ] On load: check `localStorage` session — redirect to `/admin/login` if missing
- [ ] Stats bar: Pending / Active / Fulfilled / Total counts (computed from dummy data)
- [ ] Three tabs: Pending Review / Active Listings / Fulfilled
- [ ] **Pending tab:** expandable card showing full submission details, "Approve & Publish" button, "Reject" button with optional note textarea
- [ ] **Active tab:** listing cards with "Mark as Fulfilled" button
- [ ] **Fulfilled tab:** fulfilled listings
- [ ] Toast notifications on approve/reject — auto-dismiss after 3 seconds
- [ ] Sign Out button — clears `localStorage` session + redirects to `/admin/login`
- [ ] All state changes update dummy data in React state (no persistence in Phase 1)
- [ ] Bilingual

### 1.8 Phase 1 Acceptance Criteria

- [ ] All 9 routes render on `localhost:3000` without console errors
- [ ] Language toggle switches all visible text between EN and FR on every page
- [ ] All form validations prevent submission of invalid data
- [ ] Admin dashboard tab switching, approve/reject, and sign-out work correctly
- [ ] axe DevTools or Lighthouse accessibility audit: zero critical WCAG violations
- [ ] All pages pass 4.5:1 contrast check
- [ ] All interactive elements have visible focus rings

---

## Phase 2 — Backend Integration (Weeks 3–4)

**Goal:** Real data. Forms submit to Supabase. Admin actions persist. Emails fire.

### 2.1 Supabase Setup

- [ ] Create Supabase project (if not already done)
- [ ] Add Supabase credentials to `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ADMIN_EMAIL`
- [ ] Create `lib/supabase.ts` — export Supabase client (anon key for client, service role for server actions)

### 2.2 Database Schema

- [ ] Create `tech_requests` table in Supabase with all fields from the data model (see `initial-requirement.md` §5.1)
  - Enable Row Level Security (RLS): anon users can INSERT only; admin reads and updates via service role
- [ ] Create `donor_offers` table with all fields from §5.2
  - RLS: anon users can INSERT only
- [ ] Add index on `status` field in `tech_requests` for fast board queries

### 2.3 Tech Request Form — Backend

- [ ] Replace `console.log` in `/receive/request` with a Server Action or API route that:
  - Inserts into `tech_requests` with `status: "pending"` and `submitted_at: now()`
  - Sends email notification to `ADMIN_EMAIL` with submission summary
- [ ] Handle insert errors gracefully — show user-facing error message on failure

### 2.4 Donor Offer Form — Backend

- [ ] Replace `console.log` in `/donate/offer` with a Server Action that:
  - Inserts into `donor_offers` with `submitted_at: now()`
  - Confirms `format_confirmed: true` server-side before insert
- [ ] Handle insert errors gracefully

### 2.5 Needs Board — Live Data

- [ ] Replace dummy data in `/donate/needs` with a Supabase query:
  - `SELECT * FROM tech_requests WHERE status = 'active' ORDER BY approved_at DESC`
- [ ] Apply city and category filters server-side or client-side (React state filters on fetched data)
- [ ] Fulfilled cards: fetch `status = 'fulfilled'` where `fulfilled_at` is within last 7 days

### 2.6 Listing Detail — Live Data

- [ ] Replace dummy data lookup with `SELECT * FROM tech_requests WHERE id = [id]`
- [ ] Return 404 if listing not found or status is not `active` or `fulfilled`

### 2.7 Admin Dashboard — Live Data & Actions

- [ ] Replace localStorage auth with Supabase Auth:
  - Admin signs in via Supabase Auth (email + password)
  - Session managed via Supabase cookies — no localStorage workaround
  - Protected route checks session server-side via `createServerComponentClient`
- [ ] Fetch real data for each tab:
  - Pending: `status = 'pending'`
  - Active: `status = 'active'`
  - Fulfilled: `status = 'fulfilled'`
- [ ] **Approve action** (server action):
  - Update `status → 'active'`, set `approved_at: now()`
  - Send confirmation email to submitting org with unique fulfilled link
  - Unique fulfilled link: `/listing/[id]/fulfill?token=[uuid]` — token stored in `admin_note` or separate column
- [ ] **Reject action** (server action):
  - Update `status → 'rejected'`, store `admin_note`
  - Send rejection email to org with optional note
- [ ] **Mark as Fulfilled** (server action):
  - Update `status → 'fulfilled'`, set `fulfilled_at: now()`

### 2.8 Fulfilled Link Handler

- [ ] Create route `app/listing/[id]/fulfill/page.tsx` (or API route)
- [ ] Validates token parameter matches record
- [ ] Updates `status → 'fulfilled'` on valid token
- [ ] Shows success confirmation to org
- [ ] Handles invalid/expired tokens gracefully

### 2.9 Email Notifications

- [ ] Choose email provider: Supabase built-in SMTP / Resend / SendGrid (resolve open question)
- [ ] Email templates:
  - **New submission (to admin):** org name, category, city, quantity, link to admin dashboard
  - **Approved (to org):** confirmation, unique fulfilled link, next steps
  - **Rejected (to org):** rejection note (if provided), encouragement to resubmit
- [ ] Trigger emails from Server Actions — never from client side

### 2.10 Phase 2 Acceptance Criteria

- [ ] Tech request form submits to Supabase and record appears in dashboard as Pending
- [ ] Donor offer form submits to Supabase
- [ ] Needs Board shows only `active` records from database
- [ ] Admin approve → record appears on live Needs Board; org receives email with fulfilled link
- [ ] Admin reject → org receives rejection email with note
- [ ] Fulfilled link marks listing as fulfilled; card greyed out on Needs Board
- [ ] Admin can manually mark any active listing as fulfilled
- [ ] Admin login via Supabase Auth; session persists on refresh; Sign Out clears session
- [ ] All emails send correctly in staging environment

---

## Phase 3 — QA, Polish & Launch (Weeks 5–6)

**Goal:** Production-ready. Deployed on Vercel. Tested end-to-end on desktop and mobile.

### 3.1 End-to-End Testing

- [ ] **Flow A — Receiver:** land on `/` → `/receive` → `/receive/request` → submit → admin notified → approve → listing live on board
- [ ] **Flow B — Donor Browse:** `/` → `/donate` gate → `/donate/needs` → filter → `/listing/[id]` → contact org
- [ ] **Flow C — Donor Offer:** `/donate` gate → `/donate/offer` → submit → admin sees in dashboard
- [ ] **Flow D — Admin:** login → review pending → approve/reject → mark fulfilled → sign out
- [ ] **Fulfilled link:** org clicks link from email → listing marked fulfilled → card greyed out → auto-archived after 7 days

### 3.2 WCAG 2.1 AA Audit

- [ ] Run axe DevTools (or Lighthouse) on all 9 pages in both EN and FR
- [ ] Verify all 9 pages pass: colour contrast, focus management, heading hierarchy, label association, skip link
- [ ] Verify keyboard-only navigation works on all forms and interactive elements
- [ ] Verify screen reader announces form errors and success states correctly

### 3.3 Mobile & Device Testing

- [ ] iOS Safari (iPhone) — all 9 pages
- [ ] Android Chrome — all 9 pages
- [ ] Tablet (iPad or similar) — layout integrity
- [ ] Verify 48px touch targets on all buttons
- [ ] Verify forms are usable with mobile keyboards (input types, autocomplete hints)

### 3.4 Bilingual QA

- [ ] Switch to FR on every page — verify all visible strings are translated (no EN leaking through)
- [ ] Native French speaker reviews all FR strings for accuracy and tone
- [ ] Verify `<html lang="fr">` is set when FR mode is active
- [ ] Verify EN/FR toggle is accessible and labelled in both languages

### 3.5 Edge Cases

- [ ] **Empty Needs Board:** show helpful "No active requests" state in both languages
- [ ] **All filters applied, no results:** show "No matching requests" message
- [ ] **Rejected submission:** org receives clear email; can they resubmit? (confirm flow)
- [ ] **Fulfilled listing aging:** confirm card disappears exactly 7 days after `fulfilled_at`
- [ ] **Duplicate submission:** what happens if org submits the same form twice?
- [ ] **Invalid fulfilled link:** show error, do not crash
- [ ] **Admin session expired:** redirect to login gracefully, not a blank page

### 3.6 Performance

- [ ] Page load under 3 seconds on mobile (Lighthouse Performance score ≥ 80)
- [ ] Images (if any) use `next/image` with correct `width`, `height`, and `alt`
- [ ] No unnecessary client-side JS bundles — use Server Components where no interactivity needed

### 3.7 Vercel Deployment

- [ ] Connect GitHub repo to Vercel project
- [ ] Set all environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ADMIN_EMAIL`
- [ ] Confirm preview deployments work on every PR
- [ ] Configure custom domain (e.g., `techbridge.ca`) if registered — resolve open question
- [ ] Verify Vercel deployment passes all pages without build errors

### 3.8 Repository Cleanup

- [ ] Remove all `console.log` statements left from Phase 1
- [ ] Remove hardcoded dummy data
- [ ] Remove Phase 1 localStorage auth workaround (fully replaced by Supabase Auth)
- [ ] Update `README.md` with setup instructions, env var list, and local dev steps
- [ ] Add `.env.example` with all variable names and placeholder values

### 3.9 Soft Launch

- [ ] Onboard 2–3 pilot nonprofit organizations in Greater Moncton
- [ ] Walk pilot orgs through the receiver flow
- [ ] Admin reviews and approves their first submissions
- [ ] Confirm end-to-end flow works in production with real orgs
- [ ] Gather initial feedback before broader promotion

### 3.10 Phase 3 Acceptance Criteria

- [ ] All four user flows complete end-to-end in production without errors
- [ ] WCAG 2.1 AA: zero critical violations on all 9 pages (both languages)
- [ ] Mobile test: all pages usable on iOS Safari and Android Chrome
- [ ] Bilingual QA: 100% of user-facing strings translated and reviewed
- [ ] Vercel deployment live and stable
- [ ] At least 2 pilot orgs onboarded and first real listing approved

---

## Open Questions (Must Resolve Before Phase 2)

| # | Question | Owner | Needed By |
|---|---|---|---|
| 1 | Email provider: Supabase built-in / Resend / SendGrid? | TechBridge Team | Start of Week 3 |
| 2 | Admin email address for notifications and footer? | TechBridge Team | Start of Week 3 |
| 3 | Domain name (`techbridge.ca` or similar) registered? | TechBridge Team | Start of Week 5 |
| 4 | Who reviews all French-language strings? | TechBridge Team | End of Week 4 |
| 5 | Is manual admin verification of orgs sufficient at MVP? | TechBridge Team | Before Phase 1 launch |
| 6 | Is the unguessable fulfilled link sufficient, or does it need a PIN? | TechBridge Team | Start of Week 3 |
| 7 | Any exceptions to 90-day listing prompt and 7-day post-fulfillment visibility? | TechBridge Team | Before Phase 2 |
| 8 | Are donor offer posts visible to admin only, or also to receiving orgs? | TechBridge Team | Before Phase 2 |

---

## Risk Register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Low org adoption at launch | Medium | Soft launch with 2–3 known Moncton orgs as pilots |
| Admin bottleneck on reviews | Medium | Clear 2–5 day SLA; single admin is sufficient at MVP scale |
| Donors not formatting devices | High | Hard gate on `/donate`; format confirmation checkbox on offer form |
| Data left on donated devices | High | Mandatory warning at every donor entry point; platform disclaimer in footer |
| Stale listings on board | Medium | 90-day email prompt; fulfilled listings auto-archive after 7 days |
| Bilingual content errors | Low | Native French speaker review before launch (Phase 3) |
| Supabase integration delay | Low | Phase 1 uses React state — all UI testable without backend |

---

## Key Dependencies

- Supabase project created and credentials available → required to start Phase 2
- Email provider chosen and configured → required to complete Phase 2
- French reviewer available → required to complete Phase 3 bilingual QA
- Domain registered (optional) → required to configure custom domain in Phase 3
- 2–3 pilot orgs committed → required for Phase 3 soft launch

---

*TechBridge · Implementation Plan · v1.0 · May 2026*
