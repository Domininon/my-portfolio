import type { PopupConfig, PopupFrequency } from '@/config/popupConfig';

const DISMISS_KEY = 'popup_dismissed';

type DismissedRecord = {
  campaignId: string;
  dismissedAt: number;
};

// Determines whether the visitor should see the popup based on the
// configured frequency mode, schedule, route, and browser storage state.
export function shouldShowPopup(
  config: PopupConfig,
  pathname: string,
): boolean {
  if (!config.enabled) return false;

  // Route restriction
  if (config.showOnRoutes.length > 0 && !routeMatches(config.showOnRoutes, pathname)) {
    return false;
  }

  // Schedule window
  const now = new Date();
  if (config.startDate) {
    const start = new Date(config.startDate + 'T00:00:00');
    if (now < start) return false;
  }
  if (config.endDate) {
    const end = new Date(config.endDate + 'T23:59:59');
    if (now > end) return false;
  }

  // Preview mode bypasses dismissal check
  if (config.preview) return true;

  const freq: PopupFrequency = config.frequency;
  if (freq === 'every-visit') return true;

  if (freq === 'once-per-session') {
    try {
      return sessionStorage.getItem(`${DISMISS_KEY}:${config.campaignId}`) === null;
    } catch {
      return true;
    }
  }

  // once-per-campaign
  try {
    const raw = localStorage.getItem(`${DISMISS_KEY}:${config.campaignId}`);
    if (!raw) return true;
    const record = JSON.parse(raw) as DismissedRecord;
    if (record.campaignId !== config.campaignId) return true;

    const expiryMs = config.dismissDays * 24 * 60 * 60 * 1000;
    const elapsed = Date.now() - record.dismissedAt;
    if (elapsed > expiryMs) return true;

    return false;
  } catch {
    return true;
  }
}

export function markPopupDismissed(config: PopupConfig): void {
  const freq: PopupFrequency = config.frequency;
  if (freq === 'every-visit') return;

  if (freq === 'once-per-session') {
    try {
      sessionStorage.setItem(`${DISMISS_KEY}:${config.campaignId}`, '1');
    } catch {
      // Ignore — storage unavailable.
    }
    return;
  }

  try {
    const record: DismissedRecord = {
      campaignId: config.campaignId,
      dismissedAt: Date.now(),
    };
    localStorage.setItem(
      `${DISMISS_KEY}:${config.campaignId}`,
      JSON.stringify(record),
    );
  } catch {
    // Ignore — storage unavailable.
  }
}

// Match a route pattern that may be a prefix.
// "/" matches only the homepage; "/work" matches "/work" and "/work/...".
function routeMatches(routes: string[], pathname: string): boolean {
  return routes.some((r) =>
    r === '/' ? pathname === '/' : pathname === r || pathname.startsWith(r + '/'),
  );
}
