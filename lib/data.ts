// ─── Types ────────────────────────────────────────────────────────────────────

export type ListingStatus = "active" | "fulfilled" | "pending";

export interface RequestItem {
  category: string;
  quantity: number;
  description?: string;
  minSpecs?: string;
}

export interface Listing {
  id: number;
  org: string;
  city: string;
  province: string;
  // Single-item fields kept for backward compat; use `items` for multi-item
  category: string;
  quantity: number;
  description: string;
  minSpecs?: string;
  // Multi-item support — if present, takes precedence over single-item fields
  items?: RequestItem[];
  date: string;
  status: ListingStatus;
  email: string;
  phone: string;
  contactName: string;
  intendedUse: string;
  orgType: string;
}

// ─── Shared category option list ──────────────────────────────────────────────

export const categoryOptions = [
  { value: "Computer",  en: "Computer",             fr: "Ordinateur" },
  { value: "Laptop",    en: "Laptop",                fr: "Ordinateur portable" },
  { value: "Monitor",   en: "Monitor",               fr: "Moniteur" },
  { value: "Keyboard",  en: "Keyboard",              fr: "Clavier" },
  { value: "Mouse",     en: "Mouse",                 fr: "Souris" },
  { value: "Printer",   en: "Printer",               fr: "Imprimante" },
  { value: "Tablet",    en: "Tablet",                fr: "Tablette" },
  { value: "Other",     en: "Other",                 fr: "Autre" },
] as const;

/** Helper: returns the items array for a listing, normalising single-item listings */
export function getListingItems(listing: Listing): RequestItem[] {
  if (listing.items && listing.items.length > 0) return listing.items;
  return [{
    category: listing.category,
    quantity: listing.quantity,
    description: listing.description,
    minSpecs: listing.minSpecs,
  }];
}

// ─── Public listings (Needs Board + Listing Detail) ───────────────────────────

export const PUBLIC_LISTINGS: Listing[] = [
  {
    id: 1,
    org: "Moncton Food Bank",
    city: "Moncton", province: "NB",
    category: "Laptop", quantity: 4,
    description: "Windows laptops for volunteer coordination.",
    date: "2026-04-10", status: "active",
    email: "info@monctonfoodbank.ca", phone: "506-857-3444",
    contactName: "Sarah Boudreau",
    intendedUse: "Used by volunteers to coordinate food hamper pickups and manage client data.",
    orgType: "Nonprofit",
    items: [
      { category: "Laptop",   quantity: 4, description: "Windows laptops for volunteer coordination", minSpecs: "Windows OS, min 8GB RAM, working webcam" },
      { category: "Mouse",    quantity: 4, description: "Standard USB mice to pair with laptops" },
      { category: "Keyboard", quantity: 4, description: "USB keyboards, full-size preferred" },
    ],
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
    items: [
      { category: "Computer",  quantity: 2, description: "Desktop towers for public access station", minSpecs: "Windows 10/11, min 8GB RAM, min 256GB storage" },
      { category: "Monitor",   quantity: 2, description: "Monitors to pair with desktop towers", minSpecs: "22 inch minimum, HDMI or VGA" },
      { category: "Keyboard",  quantity: 2, description: "USB keyboards" },
      { category: "Mouse",     quantity: 2, description: "USB mice" },
    ],
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
    items: [
      { category: "Tablet",   quantity: 10, description: "Tablets for adult literacy program participants", minSpecs: "Android or iPad, min 32GB storage, working screen" },
      { category: "Keyboard", quantity: 5,  description: "Bluetooth keyboards for participants with limited mobility" },
    ],
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
    items: [
      { category: "Computer",  quantity: 3, description: "Desktop computers for newcomer settlement program" },
      { category: "Monitor",   quantity: 3, description: "Monitors to pair with desktops", minSpecs: "19 inch minimum" },
    ],
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

// ─── Donations ────────────────────────────────────────────────────────────────

export type DonationStatus = "incoming" | "available" | "matched" | "rejected";
export type LogisticsOption = "pickup" | "shipping" | "both";

export interface DonationItem {
  category:    string;
  condition:   string;  // NEW | LIKE_NEW | GOOD | FAIR | POOR | UNUSABLE
  quantity:    number;
  description: string;
}

export interface Donation {
  id:           number;
  orgName:      string;
  city:         string;
  province:     string;
  contactName:  string;
  contactEmail: string;
  contactPhone: string;
  logistics:    LogisticsOption;
  notes:        string;
  items:        DonationItem[];
  date:         string;
  status:       DonationStatus;
  matchedTo?:   string;   // org name when status === "matched"
  matchedDate?: string;
}

export const conditionOptions = [
  { value: "NEW",      en: "New",      fr: "Neuf",        color: "green"  },
  { value: "LIKE_NEW", en: "Like New", fr: "Comme neuf",  color: "green"  },
  { value: "GOOD",     en: "Good",     fr: "Bon",         color: "teal"   },
  { value: "FAIR",     en: "Fair",     fr: "Acceptable",  color: "amber"  },
  { value: "POOR",     en: "Poor",     fr: "Mauvais",     color: "orange" },
  { value: "UNUSABLE", en: "Unusable", fr: "Inutilisable",color: "red"    },
] as const;

export const ALL_DONATIONS: Donation[] = [
  // ── Incoming (pending review) ──────────────────────────────────────────────
  {
    id: 101,
    orgName:      "Petitcodiac Valley Credit Union",
    city:         "Moncton", province: "NB",
    contactName:  "Stéphane Gaudet",
    contactEmail: "sgaudet@pvcu.ca",
    contactPhone: "506-855-4400",
    logistics:    "pickup",
    notes:        "All devices have been factory reset. Available for pickup weekdays 9am–4pm.",
    date:         "2026-05-10",
    status:       "incoming",
    items: [
      { category: "Laptop",   condition: "LIKE_NEW", quantity: 5, description: "Dell Latitude 5420, i5, 16GB RAM, 256GB SSD, Windows 11 Pro" },
      { category: "Mouse",    condition: "GOOD",     quantity: 5, description: "Standard USB optical mice, all tested and working" },
      { category: "Keyboard", condition: "GOOD",     quantity: 5, description: "USB keyboards, full-size, English layout" },
    ],
  },
  {
    id: 102,
    orgName:      "Nortek Innovation Solutions",
    city:         "Dieppe", province: "NB",
    contactName:  "Michelle Roy",
    contactEmail: "mroy@nortek.ca",
    contactPhone: "506-872-1100",
    logistics:    "both",
    notes:        "Office downsize. Monitors are dual-cable (HDMI + VGA). Can arrange shipping within NB.",
    date:         "2026-05-11",
    status:       "incoming",
    items: [
      { category: "Monitor",  condition: "GOOD", quantity: 10, description: "24\" Dell UltraSharp, HDMI + VGA, 1080p, good condition" },
      { category: "Printer",  condition: "FAIR", quantity: 2,  description: "HP LaserJet Pro M404n, some wear but fully functional" },
    ],
  },
  // ── Available (approved, ready to match) ───────────────────────────────────
  {
    id: 103,
    orgName:      "Atlantic Immigration Council",
    city:         "Moncton", province: "NB",
    contactName:  "Patricia Hogan",
    contactEmail: "phogan@aic.ca",
    contactPhone: "506-857-0065",
    logistics:    "shipping",
    notes:        "Brand new, still in boxes — surplus from a cancelled contract.",
    date:         "2026-04-22",
    status:       "available",
    items: [
      { category: "Keyboard", condition: "NEW", quantity: 8, description: "Logitech MK550 wireless keyboard — unopened box" },
      { category: "Mouse",    condition: "NEW", quantity: 8, description: "Logitech M510 wireless mouse — unopened box" },
    ],
  },
  {
    id: 104,
    orgName:      "Moncton Industrial Supply",
    city:         "Moncton", province: "NB",
    contactName:  "Roger Landry",
    contactEmail: "r.landry@monctonis.ca",
    contactPhone: "506-855-8822",
    logistics:    "pickup",
    notes:        "Equipment from retiring staff. Ready for pickup any time during business hours.",
    date:         "2026-04-24",
    status:       "available",
    items: [
      { category: "Computer", condition: "GOOD", quantity: 3, description: "HP ProDesk 600 G4, i5-8500, 8GB RAM, 256GB SSD, Win 10 Pro" },
      { category: "Monitor",  condition: "GOOD", quantity: 3, description: "22\" HP monitors, VGA + DisplayPort" },
    ],
  },
  // ── Matched (completed) ────────────────────────────────────────────────────
  {
    id: 105,
    orgName:      "Atlantic Robotics Inc.",
    city:         "Moncton", province: "NB",
    contactName:  "James MacKay",
    contactEmail: "jmackay@atlanticrobotics.ca",
    contactPhone: "506-860-0012",
    logistics:    "pickup",
    notes:        "Great condition — used only in boardroom.",
    date:         "2026-04-15",
    status:       "matched",
    matchedTo:    "Moncton Headstart",
    matchedDate:  "2026-04-18",
    items: [
      { category: "Laptop",  condition: "GOOD", quantity: 2, description: "MacBook Air 2021, M1, 8GB, 256GB — wiped and reset" },
    ],
  },
  {
    id: 106,
    orgName:      "Codiac Transit",
    city:         "Moncton", province: "NB",
    contactName:  "Lisa Chantal",
    contactEmail: "lchantal@codiactransit.ca",
    contactPhone: "506-857-2008",
    logistics:    "pickup",
    notes:        "All tablets fully wiped. Chargers included.",
    date:         "2026-04-08",
    status:       "matched",
    matchedTo:    "NB Literacy Council",
    matchedDate:  "2026-04-12",
    items: [
      { category: "Tablet", condition: "GOOD",     quantity: 6, description: "iPad 7th gen, 32GB, WiFi — all wiped and charged" },
      { category: "Tablet", condition: "LIKE_NEW",  quantity: 4, description: "Samsung Galaxy Tab A8, 64GB — near-mint condition" },
    ],
  },
];
