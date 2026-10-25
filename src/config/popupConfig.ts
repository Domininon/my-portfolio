// ---------------------------------------------------------------------------
// WELCOME / CELEBRATION POPUP CONFIGURATION
//
// Edit this file to change the popup campaign. To switch from a monthly
// greeting to Easter, New Year, Christmas, etc., you only need to:
//
//   1. Add the new artwork to public/images/popups/
//   2. Change the `image` path below
//   3. Change `heading`, `message`, `eyebrow`
//   4. Update `campaignId` (a new ID re-shows the popup to returning visitors)
//   5. Update `buttonText` / `buttonLink` if needed
//   6. Set `enabled` to true
//
// No other component needs to change.
// ---------------------------------------------------------------------------

export type PopupFrequency = 'every-visit' | 'once-per-session' | 'once-per-campaign';
export type PopupLayout = 'image-first' | 'text-first' | 'image-only' | 'text-only';
export type PopupTheme = 'brand' | 'forest' | 'ink' | 'paper';

export type PopupConfig = {
  /** Master switch. When false the popup never renders. */
  enabled: boolean;
  /** Unique ID per campaign. Changing it re-shows the popup to dismissed visitors. */
  campaignId: string;
  /** Campaign artwork. Store files in public/images/popups/. */
  image: string;
  imageAlt: string;
  /** Small label above the heading. */
  eyebrow: string;
  /** Main bold heading. */
  heading: string;
  /** Body message. */
  message: string;
  /** CTA button text. */
  buttonText: string;
  /** CTA destination — internal path like /work or external URL. */
  buttonLink: string;
  /** Show or hide the CTA button entirely. */
  showButton: boolean;
  /** Show or hide the close button (keep true unless forced). */
  showCloseButton: boolean;
  /** How often to show the popup. See PopupFrequency type. */
  frequency: PopupFrequency;
  /** When `once-per-campaign`: days to keep a dismissal in localStorage. Default 30. */
  dismissDays: number;
  /** Optional scheduling. Null means always eligible (while enabled). ISO date strings (YYYY-MM-DD). */
  startDate: string | null;
  endDate: string | null;
  /** Layout direction. */
  layout: PopupLayout;
  /** Color theme for the text/content panel. */
  theme: PopupTheme;
  /** Routes where the popup may appear. Empty array = all routes. */
  showOnRoutes: string[];
  /** Delay before showing after the page loads, in milliseconds. */
  delayMs: number;
  /** Development preview: forces the popup to show regardless of dismissal state. */
  preview: boolean;
};

export const popupConfig: PopupConfig = {
  enabled: true,

  campaignId: 'happy-new-month-november-2026',

  image: '/images/popups/happy-new-month-november.svg',
  imageAlt: 'Happy New Month celebration artwork — placeholder, replace with your own',

  eyebrow: 'A NEW MONTH. NEW POSSIBILITIES.',
  heading: 'Happy New Month!',
  message:
    'May this month bring fresh ideas, meaningful progress, and beautiful opportunities. Let\u2019s create something memorable together.',

  buttonText: 'Explore My Work',
  buttonLink: '/work',
  showButton: true,
  showCloseButton: true,

  frequency: 'once-per-campaign',
  dismissDays: 30,

  startDate: null,
  endDate: null,

  layout: 'image-first',
  theme: 'forest',

  showOnRoutes: ['/'],

  delayMs: 600,

  preview: false,
};
