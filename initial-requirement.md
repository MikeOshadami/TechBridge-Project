# TechBridge — Initial Requirements

> **Version:** 1.0 · **Stage:** MVP · **Status:** In Development  
> **Target Launch:** 1–3 months · **Region:** Greater Moncton, NB  
> **Source:** TechBridge PRD v1.0, May 2026

---

## 1. Overview

TechBridge is a free, bilingual (EN/FR), web-based civic tech platform that connects nonprofit organizations and civic enterprises in the Greater Moncton Area with corporate and organizational donors of surplus technology. It is exclusively for registered organizations — not accessible to the general public.

**Core problem it solves:**
- Nonprofits need computers/peripherals they cannot afford
- Companies retire usable technology with no easy, local donation channel
- TechBridge closes that gap with an admin-verified request-and-match system

---

## 2. User Types

### 2.1 Receiver (Nonprofit / Civic Organization)
- Registered nonprofits, civic enterprises, social enterprises, and community groups in Greater Moncton
- Submits a tech request form; once admin-approved, the listing goes live on the Needs Board
- No account required at MVP
- Key pages: `/receive`, `/receive/request`, `/listing/[id]`

### 2.2 Donor (Company / Organization)
- Corporate organizations and businesses with surplus technology
- Must acknowledge the mandatory data-wipe warning gate before accessing any donor features
- Can browse the Needs Board or post what they have available
- No account required at MVP
- Key pages: `/donate`, `/donate/needs`, `/donate/offer`, `/listing/[id]`

### 2.3 Admin (Platform Administrator)
- Single admin account at MVP — no public registration
- Reviews all submitted requests; approves or rejects with optional notes
- Manages live board; marks items as fulfilled
- Receives email notification on each new submission
- Key pages: `/admin/login`, `/admin`

---

## 3. Pages & Routes

| Route | Page Name | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/receive` | Receiver Intro | Public (Receiver path) |
| `/receive/request` | Tech Request Form | Public (Receiver path) |
| `/donate` | Donor Entry + Format Gate | Public (Donor path) |
| `/donate/needs` | Needs Board | Public (after gate) |
| `/donate/offer` | Post a Donation | Public (after gate) |
| `/listing/[id]` | Listing Detail | Public (semi) |
| `/admin/login` | Admin Login | Admin only |
| `/admin` | Admin Dashboard | Admin only |

---

## 4. Functional Requirements

### 4.1 Landing Page (`/`)
- Hero with platform name, tagline, and 2-sentence description
- Explicit org-only statement visible above the fold
- Two large CTA buttons: "I Need Tech" and "I Want to Donate"
- "How It Works" 3-column strip: Request → Review → Connect
- Split section: For Nonprofits / For Donors
- Footer with admin contact email, org-only note, and language toggle

### 4.2 Tech Request Form (`/receive/request`)
- Multi-step form with 3 steps — one step visible at a time
- Step indicator at top (1 of 3, 2 of 3, 3 of 3)
- **Step 1 — Organization:** name, type, city, province, contact name, email, phone, website
- **Step 2 — What You Need:** category, item description, quantity, specs, intended use, contact preference
- **Step 3 — Confirm:** read-only summary + org confirmation checkbox
- On submit: success screen shown, admin notified by email, data written to Supabase

### 4.3 Donor Format Warning Gate (`/donate`)
- **Hard gate** — donors cannot access any donor features without checking the acknowledgement box
- Warning box: red border, large ⚠ icon, full data-wipe requirement text in EN and FR
- Two CTA cards fade in after confirmation: "Browse Needs Board" and "Post a Donation"

### 4.4 Needs Board (`/donate/needs`)
- Filter bar: by City (Moncton / Riverview / Dieppe / All) and Category
- Filters apply instantly via React state — no submit button
- Active request count shown (e.g., "Showing 4 of 6 requests")
- Card layout: org name, city badge, category badge, description, quantity, date, Contact button
- Status badges: Active (green) or Fulfilled (gray)
- Fulfilled cards shown at bottom with reduced opacity, removed after 7 days

### 4.5 Donor Offer Form (`/donate/offer`)
- Org info, item details, condition, pickup/shipping option
- Format/wipe confirmation checkbox required before submitting

### 4.6 Listing Detail (`/listing/[id]`)
- Full listing details visible
- Contact information for the receiving org (email, phone, contact name)

### 4.7 Admin Dashboard (`/admin`)
- Protected route — redirects to `/admin/login` if no session
- Stats bar: Pending / Active / Fulfilled / Total counts
- Three tabs: Pending Review / Active Listings / Fulfilled
- Pending cards: expandable detail, Approve & Publish button, Reject with optional note
- Toast notifications on approve/reject (auto-dismiss after 3 seconds)
- Active tab: Mark as Fulfilled button per card
- Sign Out button — clears session and redirects to login

### 4.8 Admin Approval / Rejection Flow
- New submission → email notification to admin
- Admin approves → listing status changes to `active`, goes live on Needs Board; org receives confirmation email with unique fulfilled link
- Admin rejects → optional rejection reason entered; email sent to submitting org

### 4.9 Fulfilled Listing Flow
- Org clicks unique fulfilled link OR contacts admin manually
- Listing status updates to `fulfilled`
- Fulfilled listings shown greyed out for 7 days, then archived
- Admin can also manually mark any listing as fulfilled from the dashboard

---

## 5. Data Model

### 5.1 `tech_requests` Table

| Field | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | Auto-generated |
| `org_name` | text NOT NULL | Organization name |
| `org_type` | text NOT NULL | Nonprofit / Civic Enterprise / Social Enterprise / Community Group |
| `city` | text NOT NULL | City of the receiving org |
| `province` | text NOT NULL | Province |
| `contact_name` | text NOT NULL | Primary contact |
| `email` | text NOT NULL | Official org email |
| `phone` | text NOT NULL | Contact phone |
| `website` | text | Optional, for admin verification |
| `category` | text NOT NULL | Computer / Laptop / Monitor / Keyboard / Mouse / Printer / Tablet / Other |
| `item_description` | text NOT NULL | Plain language description |
| `quantity` | integer NOT NULL | Min 1 |
| `min_specs` | text | Optional technical specs |
| `intended_use` | text NOT NULL | How the tech will be used |
| `contact_preference` | text NOT NULL | Email / Phone / Either |
| `status` | text NOT NULL | `pending` / `active` / `fulfilled` (default: `pending`) |
| `submitted_at` | timestamptz | Auto-set on insert |
| `approved_at` | timestamptz | Set when admin approves |
| `fulfilled_at` | timestamptz | Set when marked as fulfilled |
| `admin_note` | text | Optional rejection reason |

### 5.2 `donor_offers` Table

| Field | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | Auto-generated |
| `org_name` | text NOT NULL | Donor organization name |
| `city` | text NOT NULL | Donor city |
| `province` | text NOT NULL | Donor province |
| `contact_name` | text NOT NULL | Primary contact |
| `email` | text NOT NULL | Contact email |
| `phone` | text NOT NULL | Contact phone |
| `category` | text NOT NULL | Same categories as tech_requests |
| `item_description` | text NOT NULL | What is being donated |
| `quantity` | integer NOT NULL | Available quantity |
| `condition` | text NOT NULL | Good / Fair / Refurbished |
| `logistics` | text NOT NULL | Pickup only / Shipping only / Both |
| `notes` | text | Optional additional notes |
| `format_confirmed` | boolean NOT NULL | Must be `true` — enforced at form level |
| `submitted_at` | timestamptz | Auto-set on insert |

---

## 6. Form Field Specifications

### 6.1 Tech Request Form

| Field | Required | Validation |
|---|---|---|
| Organization Name | Yes | Text, max 200 chars |
| Organization Type | Yes | Dropdown: Nonprofit / Civic Enterprise / Social Enterprise / Community Group |
| City | Yes | Text, default prefill: Moncton |
| Province | Yes | Dropdown: all Canadian provinces, default: New Brunswick |
| Contact Name | Yes | Text, max 100 chars |
| Organization Email | Yes | Valid email format — not personal Gmail/Hotmail |
| Phone Number | Yes | Valid phone format |
| Website | No | Valid URL if provided |
| Tech Category | Yes | Dropdown: Computer / Laptop / Monitor / Keyboard / Mouse / Printer / Tablet / Other |
| Item Description | Yes | Text, max 500 chars |
| Quantity Needed | Yes | Integer, min 1, max 9999 |
| Minimum Specs | No | Textarea, max 1000 chars |
| Intended Use | Yes | Textarea, max 1000 chars |
| Contact Preference | Yes | Radio: Email / Phone / Either |
| Org Confirmation | Yes | Checkbox — form cannot submit without this |

### 6.2 Donor Offer Form

| Field | Required | Validation |
|---|---|---|
| Donor Org Name | Yes | Text, max 200 chars |
| City | Yes | Text |
| Province | Yes | Dropdown, default: New Brunswick |
| Contact Name | Yes | Text, max 100 chars |
| Contact Email | Yes | Valid email format |
| Contact Phone | Yes | Valid phone format |
| Category | Yes | Same dropdown as request form |
| Item Description | Yes | Textarea, max 500 chars |
| Quantity Available | Yes | Integer, min 1 |
| Condition | Yes | Dropdown: Good / Fair / Refurbished |
| Logistics | Yes | Radio: Pickup only / Shipping only / Both |
| Additional Notes | No | Textarea, max 500 chars |
| Format Confirmation | Yes | Checkbox — submit disabled until checked |

---

## 7. Design System

### 7.1 Design Principles
- Minimum 18px body text, 48px+ headings
- Maximum two choices per page — one clear primary action
- Plain language ("I Need Tech" not "Submit a hardware request")
- Warm co-op visual tone — trustworthy, not corporate
- Mobile-first — all pages stack cleanly on phone and tablet
- Phone numbers always visible

### 7.2 Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `evergreen-800` | `#254135` | Primary: nav, headings, CTA buttons, hero backgrounds |
| `evergreen-700` | `#376250` | Hover states, section accents |
| `evergreen-600` | `#49836b` | Active states, icon circles, left border accents |
| `evergreen-100` | `#deede7` | Card backgrounds, subtle fills |
| `evergreen-50` | `#eff6f3` | Page background |
| White | `#FFFFFF` | Form surfaces, cards, text on dark backgrounds |
| Harvest Gold | `#C8892A` | CTA highlights, step number circles, warning accents |
| Brick Red | `#8B1A1A` | Warnings only — never decorative |

### 7.3 Typography

| Role | Font | Size |
|---|---|---|
| Display / Headings | Bree Serif | H1: 36–48px · H2: 24–30px |
| Body | Source Sans 3 | Min 18px (non-negotiable) |
| Buttons | — | Min height 48px (WCAG touch target) |

### 7.4 WCAG 2.1 AA Requirements
- All text/background combinations must pass 4.5:1 contrast ratio minimum
- Visible 3px `evergreen-800` focus outline on all interactive elements — no `focus-visible: none`
- Every input must have a visible `<label>` element above it — no placeholder-only fields
- Error messages conveyed in text, never colour alone
- One H1 per page; logical H2 → H3 hierarchy — never skip levels
- All buttons minimum 48×48px touch targets
- `<html lang="en">` switches to `"fr"` when FR mode is active
- Invisible skip link appears on first tab press
- All images have descriptive alt text; decorative images use `alt=""`

---

## 8. Technical Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 — App Router, TypeScript, file-based routing |
| Language | TypeScript (`.tsx` throughout) |
| Styling | Tailwind CSS with custom evergreen palette |
| Database | Supabase — Postgres, real-time, built-in email triggers |
| Auth | Supabase Auth — admin only; no public registration |
| Deployment | Vercel — connected to GitHub, auto preview on every push |
| i18n | React `useState` — EN/FR toggle, no page reload |
| Repo | GitHub |

### 8.1 Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`

### 8.2 Folder Structure

| Path | Description |
|---|---|
| `app/page.tsx` | Landing page |
| `app/receive/page.tsx` | Receiver intro |
| `app/receive/request/page.tsx` | Tech request form |
| `app/donate/page.tsx` | Donor entry + format gate |
| `app/donate/needs/page.tsx` | Needs board |
| `app/donate/offer/page.tsx` | Post donation form |
| `app/listing/[id]/page.tsx` | Listing detail |
| `app/admin/login/page.tsx` | Admin login |
| `app/admin/page.tsx` | Admin dashboard |
| `components/Navbar.tsx` | Shared nav with EN/FR toggle |
| `lib/supabase.ts` | Supabase client config |
| `tailwind.config.js` | Evergreen palette + font families |

---

## 9. MVP Scope

### In Scope
- Landing page with dual receiver/donor path (bilingual)
- Tech request form — multi-step, 15 fields, validation
- Admin review queue with approve/reject and email notifications
- Live Needs Board with city and category filters
- Donor offer posting form with format confirmation
- Listing detail pages with contact information
- Mark as Fulfilled functionality (org link + admin manual)
- Mandatory donor format/data warning gate — hard block, not advisory
- Admin dashboard — password protected, stats, tabs, toast notifications
- Email notifications on submission, approval, and rejection
- Full bilingual EN/FR on all pages via React state toggle
- WCAG 2.1 AA compliance throughout
- Vercel deployment via GitHub

### Out of Scope (V1)
- User accounts or login for receivers or donors
- In-platform messaging between orgs and donors
- Payment, tax receipts, or donation acknowledgement processing
- Org identity verification API integration
- Mobile app (iOS or Android)
- Analytics or reporting dashboard
- Multi-admin roles or permissions
- Map view of listings
- Advanced inventory tracking
- Search functionality (filters only at MVP)
- Social sharing or embed features

---

## 10. Open Questions

1. **Email provider:** Supabase built-in, Resend, or SendGrid for transactional emails?
2. **Admin email address:** What is the official TechBridge admin email for notifications and footer display?
3. **Domain name:** Will `techbridge.ca` or similar be registered before launch?
4. **French review:** Who is responsible for reviewing all French-language strings before launch?
5. **Org verification:** Is admin manual verification via website/name lookup sufficient, or is a registration number field required?
6. **Fulfilled link security:** Is the unguessable-but-unauthenticated fulfilled link acceptable at MVP, or does it need a PIN?
7. **Listing lifespan:** Any exceptions to the 90-day prompt and 7-day post-fulfillment visibility?
8. **Donor offers visibility:** Visible to admin only, or also to receiving orgs browsing the site?

---

## 11. Success Metrics (MVP)

| Metric | Target | Timeframe |
|---|---|---|
| Approved listings live | 10+ | Within 60 days of launch |
| Confirmed fulfilled donations | 3+ | Within 90 days of launch |
| Admin review turnaround | 2–5 business days | Per submission |
| Form completion rate | >70% | Measured from step 1 start |
| Page accessibility score | WCAG 2.1 AA pass | All 9 pages |
| Bilingual coverage | 100% | All user-facing text |

---

*TechBridge · Initial Requirements · Derived from PRD v1.0 · May 2026*
