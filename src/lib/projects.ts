export interface Project {
  slug:        string;
  num:         string;
  titleFirst:  string;
  titleLast:   string;
  subtitle:    string;
  year:        string;
  surface:     string;
  scope:       string;
  status:      string;
  location:    string;
  quote:       string;
  materials:   string[];
  gallery:     { label: string; sub: string }[];
  nextSlug:    string;
  gradient:    string;
}

export const PROJECTS: Project[] = [
  {
    slug:       "villa-noura",
    num:        "01",
    titleFirst: "Villa",
    titleLast:  "Noura",
    subtitle:   "— where the light arrives first.",
    year:       "2026",
    surface:    "480 m²",
    scope:      "Full Studio",
    status:     "In Works",
    location:   "Marbella · ES",
    quote:      "A private villa on the hills above Marbella, built around silence and the afternoon light.",
    materials:  ["Travertine", "Plaster", "Linen", "Matt Brass"],
    gallery: [
      { label: "01 / Living room · Natural light", sub: "West facade" },
      { label: "02 / Kitchen · Travertine island",  sub: "Morning"    },
      { label: "03 / Master suite · Linen panels",  sub: "South wing" },
    ],
    nextSlug:  "villa-chiara",
    gradient: `
      radial-gradient(45% 35% at 76% 30%, rgba(232,196,148,.55) 0%, transparent 70%),
      radial-gradient(60% 50% at 22% 70%, rgba(120,82,55,.55)   0%, transparent 65%),
      linear-gradient(165deg, #3a322b 0%, #5a4536 45%, #7b5a40 70%, #2a2520 100%)
    `,
  },
  {
    slug:       "villa-chiara",
    num:        "02",
    titleFirst: "Villa",
    titleLast:  "Chiara",
    subtitle:   "— matter over ornament.",
    year:       "2025",
    surface:    "340 m²",
    scope:      "Full Studio",
    status:     "Completed",
    location:   "Marbella · ES",
    quote:      "An exercise in restraint. Every surface chosen to recede until the light takes over.",
    materials:  ["Limestone", "Light Oak", "Natural Textile", "Blown Glass"],
    gallery: [
      { label: "01 / Entrance hall · Limestone floor", sub: "Morning light"  },
      { label: "02 / Living · Oak volumes",            sub: "North facade"   },
      { label: "03 / Study · Quiet corner",            sub: "East wing"      },
    ],
    nextSlug:  "jardines-de-andalucia",
    gradient: `
      radial-gradient(50% 60% at 60% 40%, rgba(210,185,155,.55) 0%, transparent 70%),
      radial-gradient(40% 50% at 30% 70%, rgba(100,75,50,.45)   0%, transparent 60%),
      linear-gradient(150deg, #2e2a26 0%, #4a3b2e 50%, #6a5040 70%, #252220 100%)
    `,
  },
  {
    slug:       "jardines-de-andalucia",
    num:        "03",
    titleFirst: "Jardines de",
    titleLast:  "Andalucía",
    subtitle:   "— a garden that breathes inside.",
    year:       "2024",
    surface:    "290 m²",
    scope:      "Concept & Supply",
    status:     "Completed",
    location:   "Marbella · ES",
    quote:      "Interior and exterior dissolve. Patios, arcades and the scent of jasmine become the fourth wall.",
    materials:  ["Terracotta Tile", "Textured Plaster", "Cane", "Wrought Iron"],
    gallery: [
      { label: "01 / Central patio · Morning",          sub: "South courtyard"  },
      { label: "02 / Living · Arched openings",         sub: "Garden façade"    },
      { label: "03 / Dining · Handmade tiles",          sub: "Ground floor"     },
    ],
    nextSlug:  "villa-noura",
    gradient: `
      radial-gradient(55% 45% at 40% 30%, rgba(195,170,130,.45) 0%, transparent 65%),
      radial-gradient(65% 55% at 75% 75%, rgba(140,95,60,.50)   0%, transparent 65%),
      linear-gradient(170deg, #3c3428 0%, #564232 45%, #7a5e45 65%, #282420 100%)
    `,
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const current = getProject(slug);
  return current ? getProject(current.nextSlug) : undefined;
}