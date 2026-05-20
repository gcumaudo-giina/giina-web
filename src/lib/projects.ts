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
  gallery:     { label: string; sub: string; src?: string }[];
  nextSlug:    string;
  gradient:    string;
  spread?: {
    primary:   string;
    secondary: string;
    quote:     string;
  };
  drawings?: {
    src:   string;
    label: string;
    type:  "plan" | "axo" | "section" | "concept";
  }[];
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
      { label: "01 / Living room · Natural light",  sub: "West facade",   src: "/projects/villa-noura/md/130.webp"  },
      { label: "02 / Kitchen · Travertine island",  sub: "Morning",        src: "/projects/villa-noura/md/150.webp"  },
      { label: "03 / Master suite · Linen panels",  sub: "South wing",     src: "/projects/villa-noura/md/160.webp"  },
      { label: "04 / Corridor · Stone detail",      sub: "Ground floor",   src: "/projects/villa-noura/md/01-1.webp" },
      { label: "05 / Terrace · Garden view",        sub: "Exterior",       src: "/projects/villa-noura/md/02-1.webp" },
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
      { label: "01 / Entrance hall · Limestone floor", sub: "Morning light",  src: "/projects/villa-chiara/md/A7V06008.webp" },
      { label: "02 / Living · Oak volumes",            sub: "North facade",   src: "/projects/villa-chiara/md/A7V06013.webp" },
      { label: "03 / Study · Quiet corner",            sub: "East wing",      src: "/projects/villa-chiara/md/A7V06016.webp" },
      { label: "04 / Kitchen · Mineral surfaces",      sub: "Ground floor",   src: "/projects/villa-chiara/md/A7V06020.webp" },
      { label: "05 / Master bedroom · Linen",          sub: "First floor",    src: "/projects/villa-chiara/md/A7V06023.webp" },
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
      { label: "01 / Central patio · Morning",       sub: "South courtyard", src: "/projects/jardines-de-andalucia/p05.jpg" },
      { label: "02 / Living · Arched openings",      sub: "Garden façade",   src: "/projects/jardines-de-andalucia/p10.jpg" },
      { label: "03 / Dining · Handmade tiles",       sub: "Ground floor",    src: "/projects/jardines-de-andalucia/p13.jpg" },
      { label: "04 / Bedroom · Woven textiles",      sub: "First floor",     src: "/projects/jardines-de-andalucia/p15.jpg" },
      { label: "05 / Exterior · Pergola detail",     sub: "Garden",          src: "/projects/jardines-de-andalucia/p18.jpg" },
    ],
    spread: {
      primary:   "/projects/jardines-de-andalucia/p02.jpg",
      secondary: "/projects/jardines-de-andalucia/p10.jpg",
      quote:     "A house that never ends — it dissolves into its garden.",
    },
    nextSlug:  "epure",
    gradient: `
      radial-gradient(55% 45% at 40% 30%, rgba(195,170,130,.45) 0%, transparent 65%),
      radial-gradient(65% 55% at 75% 75%, rgba(140,95,60,.50)   0%, transparent 65%),
      linear-gradient(170deg, #3c3428 0%, #564232 45%, #7a5e45 65%, #282420 100%)
    `,
  },
  {
    slug:       "epure",
    num:        "04",
    titleFirst: "Épure",
    titleLast:  "",
    subtitle:   "— the essence of what remains.",
    year:       "2024",
    surface:    "210 m²",
    scope:      "Full Studio",
    status:     "Completed",
    location:   "Paris · FR",
    quote:      "Everything removed until nothing can be taken away. The apartment speaks through its proportions alone.",
    materials:  ["Honed Limestone", "Raw Plaster", "Smoked Oak", "Aged Bronze"],
    gallery: [
      { label: "01 / Salon · Grey volume",           sub: "West elevation",  src: "/projects/epure/p07.jpg"  },
      { label: "02 / Kitchen · Stone monolith",      sub: "Morning light",   src: "/projects/epure/p08.jpg"  },
      { label: "03 / Master · Linen canopy",         sub: "North wing",      src: "/projects/epure/p09.jpg"  },
      { label: "04 / Study · Oak shelving",          sub: "Mezzanine",       src: "/projects/epure/p10.jpg"  },
      { label: "05 / Bathroom · Travertine",         sub: "En-suite",        src: "/projects/epure/p11.jpg"  },
    ],
    spread: {
      primary:   "/projects/epure/p02.jpg",
      secondary: "/projects/epure/p12.jpg",
      quote:     "Restraint is not absence — it is the most deliberate form of presence.",
    },
    nextSlug:  "tortugas-811",
    gradient: `
      radial-gradient(50% 40% at 55% 25%, rgba(200,195,185,.45) 0%, transparent 65%),
      radial-gradient(55% 50% at 25% 70%, rgba(90,80,68,.50)    0%, transparent 60%),
      linear-gradient(155deg, #2a2825 0%, #403c36 45%, #5a5448 70%, #201f1d 100%)
    `,
  },
  {
    slug:       "tortugas-811",
    num:        "05",
    titleFirst: "Tortugas",
    titleLast:  "811",
    subtitle:   "— warmth pressed into stone.",
    year:       "2024",
    surface:    "320 m²",
    scope:      "Full Studio",
    status:     "Completed",
    location:   "Marbella · ES",
    quote:      "A coastal residence where terracotta, clay and Mediterranean light shape every moment of the day.",
    materials:  ["Terracotta", "Rammed Earth", "Brushed Steel", "Natural Linen"],
    gallery: [
      { label: "01 / Living · Terracotta floor",     sub: "South terrace",   src: "/projects/tortugas-811/p05.jpg"  },
      { label: "02 / Kitchen · Clay volumes",        sub: "Ground floor",    src: "/projects/tortugas-811/p10.jpg"  },
      { label: "03 / Pool · Exterior",               sub: "Garden",          src: "/projects/tortugas-811/p12.jpg"  },
      { label: "04 / Master · Earth plaster",        sub: "First floor",     src: "/projects/tortugas-811/p15.jpg"  },
      { label: "05 / Terrace · Pergola",             sub: "West elevation",  src: "/projects/tortugas-811/p18.jpg"  },
    ],
    spread: {
      primary:   "/projects/tortugas-811/p02.jpg",
      secondary: "/projects/tortugas-811/p10.jpg",
      quote:     "The sun sets the rhythm. The house simply follows.",
    },
    nextSlug:  "villa-omoi",
    gradient: `
      radial-gradient(55% 45% at 70% 35%, rgba(210,140,90,.50)  0%, transparent 65%),
      radial-gradient(60% 55% at 20% 65%, rgba(150,90,55,.55)   0%, transparent 65%),
      linear-gradient(160deg, #3d2e22 0%, #5f4232 45%, #7d5a3e 65%, #261e18 100%)
    `,
  },
  {
    slug:       "villa-omoi",
    num:        "06",
    titleFirst: "Villa",
    titleLast:  "Omoi",
    subtitle:   "— stillness as architecture.",
    year:       "2023",
    surface:    "560 m²",
    scope:      "Full Studio",
    status:     "Completed",
    location:   "Marbella · ES",
    quote:      "Omoi — the Japanese idea of feeling without speaking. A villa built around the pauses between rooms.",
    materials:  ["Polished Concrete", "Black Steel", "Washi Paper", "Dark Teak"],
    gallery: [
      { label: "01 / Entry · Concrete monolith",    sub: "Main approach",    src: "/projects/villa-omoi/p05.jpg"  },
      { label: "02 / Living · Double height",       sub: "Central volume",   src: "/projects/villa-omoi/p08.jpg"  },
      { label: "03 / Garden · Zen water feature",   sub: "East garden",      src: "/projects/villa-omoi/p10.jpg"  },
      { label: "04 / Kitchen · Dark steel",         sub: "Ground floor",     src: "/projects/villa-omoi/p12.jpg"  },
      { label: "05 / Master · Washi panels",        sub: "First floor",      src: "/projects/villa-omoi/p15.jpg"  },
    ],
    spread: {
      primary:   "/projects/villa-omoi/p02.jpg",
      secondary: "/projects/villa-omoi/p10.jpg",
      quote:     "The void is the room. The room is the silence between objects.",
    },
    drawings: [
      { src: "/projects/villa-omoi/p13.jpg", label: "Ground Floor Plan", type: "plan"    },
      { src: "/projects/villa-omoi/p15.jpg", label: "First Floor Plan",  type: "plan"    },
    ],
    nextSlug:  "villa-boris",
    gradient: `
      radial-gradient(45% 40% at 60% 30%, rgba(160,155,145,.40) 0%, transparent 60%),
      radial-gradient(55% 50% at 25% 70%, rgba(60,55,50,.55)    0%, transparent 65%),
      linear-gradient(160deg, #1e1e1c 0%, #302e2a 45%, #3e3c36 70%, #151514 100%)
    `,
  },
  {
    slug:       "villa-boris",
    num:        "07",
    titleFirst: "Villa",
    titleLast:  "Boris",
    subtitle:   "— raw material, refined eye.",
    year:       "2023",
    surface:    "420 m²",
    scope:      "Full Studio",
    status:     "Completed",
    location:   "Marbella · ES",
    quote:      "A house of layered textures — raw concrete beside aged brass, dark timber beside pale linen.",
    materials:  ["Exposed Concrete", "Aged Brass", "Dark Walnut", "Pale Linen"],
    gallery: [
      { label: "01 / Entry · Concrete staircase",   sub: "Main hall",       src: "/projects/villa-boris/p05.jpg"  },
      { label: "02 / Living · Double volume",        sub: "South wing",      src: "/projects/villa-boris/p15.jpg"  },
      { label: "03 / Kitchen · Walnut island",       sub: "Ground floor",    src: "/projects/villa-boris/p17.jpg"  },
      { label: "04 / Library · Brass shelving",      sub: "First floor",     src: "/projects/villa-boris/p18.jpg"  },
      { label: "05 / Pool · Night light",            sub: "Exterior",        src: "/projects/villa-boris/p20.jpg"  },
    ],
    spread: {
      primary:   "/projects/villa-boris/p02.jpg",
      secondary: "/projects/villa-boris/p15.jpg",
      quote:     "Luxury is not polish — it is the courage to leave things honest.",
    },
    nextSlug:  "villa-noura",
    gradient: `
      radial-gradient(50% 45% at 65% 30%, rgba(180,145,95,.50)  0%, transparent 65%),
      radial-gradient(55% 50% at 20% 70%, rgba(70,55,40,.55)    0%, transparent 60%),
      linear-gradient(155deg, #282420 0%, #3e342a 45%, #564838 70%, #1e1a16 100%)
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