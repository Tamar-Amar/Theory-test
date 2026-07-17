export const A11Y_STORAGE_KEY = "theory_a11y";

export type FontScale = 100 | 112 | 125 | 150;

export type A11ySettings = {
  fontScale: FontScale;
  highContrast: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  reduceMotion: boolean;
  underlineHeadings: boolean;
};

export const DEFAULT_A11Y: A11ySettings = {
  fontScale: 100,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
  reduceMotion: false,
  underlineHeadings: false,
};

const FONT_SCALES: FontScale[] = [100, 112, 125, 150];

function isFontScale(v: unknown): v is FontScale {
  return typeof v === "number" && FONT_SCALES.includes(v as FontScale);
}

export function loadA11ySettings(): A11ySettings {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_A11Y };
    const parsed = JSON.parse(raw) as Partial<A11ySettings>;
    return {
      fontScale: isFontScale(parsed.fontScale)
        ? parsed.fontScale
        : DEFAULT_A11Y.fontScale,
      highContrast: Boolean(parsed.highContrast),
      highlightLinks: Boolean(parsed.highlightLinks),
      readableFont: Boolean(parsed.readableFont),
      reduceMotion: Boolean(parsed.reduceMotion),
      underlineHeadings: Boolean(parsed.underlineHeadings),
    };
  } catch {
    return { ...DEFAULT_A11Y };
  }
}

export function saveA11ySettings(settings: A11ySettings) {
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
}

/** מחיל את ההגדרות על ‎<html‎ באמצעות data-attributes ל־CSS גלובלי */
export function applyA11yToDocument(settings: A11ySettings) {
  const root = document.documentElement;
  root.dataset.a11yFont = String(settings.fontScale);
  root.dataset.a11yContrast = settings.highContrast ? "1" : "0";
  root.dataset.a11yLinks = settings.highlightLinks ? "1" : "0";
  root.dataset.a11yReadable = settings.readableFont ? "1" : "0";
  root.dataset.a11yMotion = settings.reduceMotion ? "1" : "0";
  root.dataset.a11yHeadings = settings.underlineHeadings ? "1" : "0";
}

export function nextFontScale(current: FontScale, dir: 1 | -1): FontScale {
  const i = FONT_SCALES.indexOf(current);
  const next = FONT_SCALES[Math.min(FONT_SCALES.length - 1, Math.max(0, i + dir))];
  return next ?? DEFAULT_A11Y.fontScale;
}

export function hasActiveA11y(settings: A11ySettings): boolean {
  return (
    settings.fontScale !== DEFAULT_A11Y.fontScale ||
    settings.highContrast ||
    settings.highlightLinks ||
    settings.readableFont ||
    settings.reduceMotion ||
    settings.underlineHeadings
  );
}
