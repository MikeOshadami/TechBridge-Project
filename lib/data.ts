// ─── Types ────────────────────────────────────────────────────────────────────

export type ListingStatus = "active" | "fulfilled" | "pending";

export interface Listing {
  id: number;
  org: string;
  city: string;
  province: string;
  category: string;
  quantity: number;
  description: string;
  date: string;
  status: ListingStatus;
  email: string;
  phone: string;
  contactName: string;
  intendedUse: string;
  orgType: string;
  minSpecs?: string;
}

// ─── Shared category option list ──────────────────────────────────────────────

export const categoryOptions = [
  { value: "Computer",  en: "Computer",           fr: "Ordinateur" },
  { value: "Laptop",    en: "Laptop",              fr: "Ordinateur portable" },
  { value: "Monitor",   en: "Monitor",             fr: "Moniteur" },
  { value: "Keyboard",  en: "Keyboard",            fr: "Clavier" },
  { value: "Mouse",     en: "Mouse",               fr: "Souris" },
  { value: "Printer",   en: "Printer",             fr: "Imprimante" },
  { value: "Tablet",    en: "Tablet",              fr: "Tablette" },
  { value: "Other",     en: "Other",               fr: "Autre" },
] as const;

// ─── Public listings (Needs Board + Listing Detail) ───────────────────────────

export const PUBLIC_LISTINGS: Listing[] = [
  {
    id: 1,
    org: "Moncton Food Bank",
    city: "Moncton", province: "NB",
    category: "Laptop", quantity: 4,
    description: "Windows laptops for volunteer coordination. Minimum 8GB RAM.",
    date: "2026-04-10", status: "active",
    email: "info@monctonfoodbank.ca", phone: "506-857-3444",
    contactName: "Sarah Boudreau",
    intendedUse: "Used by volunteers to coordinate food hamper pickups and manage client data.",
    orgType: "Nonprofit",
    minSpecs: "Windows OS, minimum 8GB RAM, working webcam for video calls",
  },
  {
    id: 2,
    org: "Riverview Community Centre",
    city: "Riverview", province: "NB",
    category: "Computer", quantity: 2,
    description: "Desktop computers for public use station.",
    date: "2026-04-12", status: "active",
    email: "programs@riverviewcc.ca", phone: "506-387-5000",
    contactName: "Mark Chen",
    intendedUse: "Public access computers for residents to access government services and job searching.",
    orgType: "Civic Enterprise",
    minSpecs: undefined,
  },
  {
    id: 3,
    org: "Dieppe Arts Council",
    city: "Dieppe", province: "NB",
    category: "Monitor", quantity: 6,
    description: "External monitors minimum 22 inch for design workstations.",
    date: "2026-04-14", status: "active",
    email: "arts@dieppe.ca", phone: "506-877-7911",
    contactName: "Isabelle Léger",
    intendedUse: "External monitors for artists and designers using our shared workstation space.",
    orgType: "Nonprofit",
    minSpecs: "22 inch minimum, HDMI or DisplayPort connection",
  },
  {
    id: 4,
    org: "NB Literacy Council",
    city: "Moncton", province: "NB",
    category: "Tablet", quantity: 10,
    description: "Tablets for adult literacy program participants.",
    date: "2026-04-15", status: "active",
    email: "info@nblc.ca", phone: "506-459-7461",
    contactName: "Tom Williams",
    intendedUse: "Program participants use tablets to access literacy apps and practice reading exercises.",
    orgType: "Nonprofit",
    minSpecs: undefined,
  },
  {
    id: 5,
    org: "Moncton Headstart",
    city: "Moncton", province: "NB",
    category: "Printer", quantity: 1,
    description: "Colour laser printer for program materials.",
    date: "2026-04-18", status: "fulfilled",
    email: "admin@monctonheadstart.ca", phone: "506-857-1121",
    contactName: "Priya Sharma",
    intendedUse: "Printing program materials, forms, and parent communications.",
    orgType: "Community Group",
    minSpecs: "Colour laser, minimum 20 pages per minute",
  },
  {
    id: 6,
    org: "Greater Moncton YMCA",
    city: "Moncton", province: "NB",
    category: "Keyboard", quantity: 8,
    description: "Standard USB keyboards to replace worn equipment.",
    date: "2026-04-20", status: "active",
    email: "facilities@gmymca.ca", phone: "506-857-9622",
    contactName: "Daniel Brun",
    intendedUse: "Replacing worn keyboards at computer stations in the member resource centre.",
    orgType: "Nonprofit",
    minSpecs: undefined,
  },
];

// ─── Admin-only pending submissions ───────────────────────────────────────────

const PENDING_LISTINGS: Listing[] = [
  {
    id: 7,
    org: "Moncton Multicultural Association",
    city: "Moncton", province: "NB",
    category: "Computer", quantity: 3,
    description: "Desktop computers for newcomer settlement program.",
    date: "2026-04-25", status: "pending",
    email: "info@mmca.ca", phone: "506-555-0101",
    contactName: "Marie Leblanc",
    intendedUse: "Used by newcomers learning digital literacy skills.",
    orgType: "Nonprofit",
  },
  {
    id: 8,
    org: "Beauséjour Community Kitchen",
    city: "Shediac", province: "NB",
    category: "Tablet", quantity: 5,
    description: "Tablets for recipe management and volunteer scheduling.",
    date: "2026-04-26", status: "pending",
    email: "contact@bck.ca", phone: "506-555-0202",
    contactName: "Jean Cormier",
    intendedUse: "Kitchen volunteers use tablets to manage weekly meal prep.",
    orgType: "Community Group",
  },
  {
    id: 9,
    org: "Tantramar Seniors Centre",
    city: "Sackville", province: "NB",
    category: "Laptop", quantity: 2,
    description: "Laptops for seniors digital literacy drop-in program.",
    date: "2026-04-27", status: "pending",
    email: "admin@tantramar.ca", phone: "506-555-0303",
    contactName: "Dorothy Walsh",
    intendedUse: "Seniors learn basic computer skills in weekly drop-in sessions.",
    orgType: "Nonprofit",
  },
];

// ─── All listings (admin only) ────────────────────────────────────────────────

export const ALL_LISTINGS: Listing[] = [...PUBLIC_LISTINGS, ...PENDING_LISTINGS];
