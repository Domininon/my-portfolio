import type { LucideIcon } from 'lucide-react';
import {
  Palette,
  Sparkles,
  Clapperboard,
  Printer,
  Compass,
  Layers,
  Send,
  PenTool,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// EDIT THIS FILE TO PERSONALIZE THE PORTFOLIO.
// Everything content-related lives here: name, contact details, social links,
// the project gallery, the services list, and the creative process.
// Image assets live in /public/images — see public/images/README.md.
// No other component needs to be touched to update the site.
// ---------------------------------------------------------------------------

export const profile = {
  // Replace "YOUR NAME" with your real name. Never invent a name here.
  name: "Daniel Dominion",
  role: "",
  disciplines: ["Brand Design", "AI Visuals", "Video", "Print"],
  footerBlurb:
    "Brand designer, AI visual creator, and print production specialist — turning ideas into identities, imagery, film, and print.",
  // Portrait + avatar. Replace these files in /public/images/profile/.
  portrait: {
    src: "/images/profile/profile-portrait.png",
    alt: "Portrait placeholder — replace /images/profile/profile-portrait.png with your own portrait",
  },
  avatar: {
    src: "/images/profile/website-icon.png",
    alt: "Avatar placeholder — replace /images/profile/website-icon.png with your own",
  },
};

export const contact = {
  email: null as string | null,
  phone: null as string | null,
  socials: [
    { label: 'Instagram', href: '' },
    { label: 'Behance', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'Dribbble', href: '' },
  ] as { label: string; href: string }[],
};

export type ProjectCategory =
  | 'Brand Identity'
  | 'Graphic Design'
  | 'AI Images'
  | 'AI Videos'
  | 'Print Production';

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  image: string;
  alt: string;
  description: string;
  brief?: string;
  process?: string;
  gallery?: string[];
  videoPoster?: string;
  videoSrc?: string;
  span?: 'sm' | 'md' | 'lg' | 'wide' | 'tall';
};

// Replace these placeholder entries with your own work. Each project supports
// a title, category, preview image, description, optional brief + process, and
// optional additional gallery images. Video projects accept a poster + mp4.
export const projects: Project[] = [
  {
    slug: "verdant-coffee",
    title: "Verdant Coffee",
    category: "Brand Identity",
    year: "2025",
    image: "/images/projects/brand-design/brand identity.jpg",
    alt: "Brand identity mockup for a coffee company — placeholder work",
    description:
      "A full visual identity for a small-batch coffee roaster: logo, wordmark, color system, and stationery.",
    brief:
      "Create a warm, contemporary identity for a specialty coffee roaster that feels crafted and approachable.",
    process:
      "Built around a forest-green and lime palette, a custom wordmark, and a flexible stationery system.",
    span: "wide",
  },
  {
    slug: "aura-skincare",
    title: "Aura — Product Visuals",
    category: "AI Images",
    year: "2025",
    image: "/images/projects/ai-images/ai image 001.jpg",
    alt: "AI-generated photorealistic skincare product visual — placeholder work",
    description:
      "Art-directed, photorealistic product imagery for a skincare campaign, generated and retouched for print and social.",
    brief:
      "Produce a set of hero product visuals with a clean, editorial art direction.",
    process:
      "Concept boards, prompt iteration, reference lighting, and final retouching for a consistent set.",
    span: "tall",
  },
  {
    slug: "noir-teaser",
    title: "Noir — Short Film Teaser",
    category: "AI Videos",
    year: "2025",
    image: "",
    alt: "AI-assisted short film teaser poster frame — placeholder work",
    description:
      "A mood-driven teaser sequence combining AI-generated visuals with editing and sound design.",
    brief:
      "Deliver a cinematic 20-second teaser for an independent short film.",
    process:
      "Storyboarded key frames, generated sequences, color graded, and cut to a custom sound bed.",
    videoPoster: "/images/projects/ai-videos/aivideo001.mp4",
    span: "lg",
  },
  {
    slug: "kinetic-poster",
    title: "Kinetic — Poster Series",
    category: "Graphic Design",
    year: "2024",
    image: "/images/projects/graphic-design/kinetic-poster.svg",
    alt: "Graphic design poster series — placeholder work",
    description:
      "A bold typographic poster series exploring motion, contrast, and grid systems.",
    brief:
      "Design a three-poster series around the theme of movement and energy.",
    process:
      "Typographic experiments, grid variations, and a restrained two-color print finish.",
    span: "md",
  },
  {
    slug: "press-run",
    title: "Press Run — Print Production",
    category: "Print Production",
    year: "2024",
    image: "/images/projects/printing/press-run.svg",
    alt: "Print production press run — placeholder work",
    description:
      "Pre-press and production supervision for a set of banners, flyers, and business cards.",
    brief: "Prepare and produce a mixed print run to a tight deadline.",
    process:
      "Color-managed pre-press, proofing, and on-press supervision for consistent output.",
    span: "md",
  },
  {
    slug: "bottle-campaign",
    title: "Pilsen — Campaign Visual",
    category: "AI Images",
    year: "2025",
    image: "/images/projects/ai-images/bottle-campaign.svg",
    alt: "AI-assisted beverage campaign visual — placeholder work",
    description:
      "A photorealistic campaign visual for a beverage launch, built from art direction and AI generation.",
    brief: "Create a hero campaign image with condensation and rich color.",
    process:
      "Reference lighting, generated base, and retouching for a clean, print-ready result.",
    span: "wide",
  },
];

export const projectCategories: (ProjectCategory | 'All')[] = [
  'All',
  'Brand Identity',
  'Graphic Design',
  'AI Images',
  'AI Videos',
  'Print Production',
];

export type Service = {
  id: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  image: string;
  offerings: string[];
};

export const services: Service[] = [
  {
    id: 'brand-design',
    label: 'Brand Design',
    icon: Palette,
    tagline: '01 — Brand Design',
    description:
      'Visual identity, logo design, brand systems, typography, marketing graphics, and promotional materials.',
    image: '/images/services/service-brand-design.svg',
    offerings: [
      'Logo design',
      'Brand identity systems',
      'Typography and color systems',
      'Business cards and stationery',
      'Marketing flyers and posters',
      'Social media designs',
      'Brand presentation mockups',
    ],
  },
  {
    id: 'ai-images',
    label: 'AI Image Creation',
    icon: Sparkles,
    tagline: '02 — AI Image Creation',
    description:
      'Photorealistic AI imagery, product visuals, advertising concepts, campaign imagery, and art-directed visual compositions.',
    image: '/images/services/service-ai-images.svg',
    offerings: [
      'Photorealistic image generation',
      'Product and advertising visuals',
      'Campaign concepts',
      'Creative image compositions',
      'Visual storytelling',
      'AI-assisted art direction',
    ],
  },
  {
    id: 'ai-video',
    label: 'AI Video Creation',
    icon: Clapperboard,
    tagline: '03 — AI Video Creation',
    description:
      'AI-assisted video sequences, promotional visuals, concept-driven videos, and visual storytelling.',
    image: '/images/services/service-ai-video.svg',
    offerings: [
      'AI-generated video sequences',
      'Promotional visual content',
      'Concept-driven short videos',
      'Product and campaign visuals',
      'Experimental visual storytelling',
    ],
  },
  {
    id: 'printing',
    label: 'Printing & Production',
    icon: Printer,
    tagline: '04 — Printing & Production',
    description:
      'Banners, flyers, stickers, posters, business cards, brochures, and other printed materials.',
    image: '/images/services/service-printing.svg',
    offerings: [
      'Banners',
      'Flyers and posters',
      'Stickers and labels',
      'Business cards',
      'Brochures',
      'Invitations',
      'Other custom print materials',
    ],
  },
];

export type ProcessStage = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const process: ProcessStage[] = [
  {
    step: '01',
    title: 'Understand',
    description: 'Learn about the idea, the audience, and the intended outcome.',
    icon: Compass,
  },
  {
    step: '02',
    title: 'Develop',
    description: 'Explore concepts and determine the strongest visual direction.',
    icon: PenTool,
  },
  {
    step: '03',
    title: 'Create & Refine',
    description: 'Develop the work and improve the details through review.',
    icon: Layers,
  },
  {
    step: '04',
    title: 'Deliver',
    description:
      'Prepare the final files or outputs for their intended digital, video, or print use.',
    icon: Send,
  },
];

// Route-based navigation. These are real routes, not anchor scrolls.
export const nav: { label: string; href: string }[] = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book an Appointment', href: '/book-appointment' },
];

export const inquiryServiceChoices = [
  'Brand Design',
  'Graphic Design',
  'AI Images',
  'AI Videos',
  'Printing',
  'Other',
] as const;

export type AppointmentType = {
  id: string;
  label: string;
  description: string;
};

export const appointmentTypes: AppointmentType[] = [
  {
    id: 'brand-design',
    label: 'Brand Design Consultation',
    description:
      'Logo design, visual identity, brand systems, typography, and marketing graphics.',
  },
  {
    id: 'ai-images',
    label: 'AI Image Creation Consultation',
    description:
      'Photorealistic AI imagery, product visuals, campaign concepts, and art-directed compositions.',
  },
  {
    id: 'ai-video',
    label: 'AI Video Creation Consultation',
    description:
      'AI-assisted video sequences, promotional visuals, and concept-driven storytelling.',
  },
  {
    id: 'printing',
    label: 'Printing and Production Consultation',
    description:
      'Banners, flyers, stickers, posters, business cards, and custom print materials.',
  },
  {
    id: 'general',
    label: 'General Creative Consultation',
    description:
      'Not sure which service fits? Let\u2019s explore your idea and find the right direction together.',
  },
];

export const appointmentTimeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
] as const;

export const meetingFormats = [
  { id: 'online', label: 'Online consultation', description: 'Video call (details sent after confirmation).' },
  { id: 'in-person', label: 'In-person consultation', description: 'Available when arrangements are configured.' },
] as const;
