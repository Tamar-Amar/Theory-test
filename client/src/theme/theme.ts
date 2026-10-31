export const theme = {
  colors: {
    /* ── פלטת Figma redesign — ערכי הליבה הותאמו למערכת העיצוב ── */
    bg: "#fbfaf7",
    surface: "#ffffff",
    surface2: "#ebe8e1",
    text: "#1a1d29",
    muted: "#5b6070",
    accent: "#1f4fd6",
    accentDim: "#1a44bd",
    success: "#30a46c",
    danger: "#e5484d",
    mint: "#0d9488",
    white: "#ffffff",
    borderSubtle: "rgba(26, 29, 41, 0.08)",
    accentGlow: "rgba(31, 79, 214, 0.1)",
    accentBorder: "rgba(31, 79, 214, 0.35)",
    dangerBg: "rgba(229, 72, 77, 0.12)",
    /** לגרדיאנטים על רקע בהיר */
    gradientStart: "#0f172a",

    /* ── שמות טוקנים מפורשים ממערכת העיצוב (Figma) ── */
    ink: "#1a1d29",
    inkMuted: "#5b6070",
    blue: "#1f4fd6",
    blueTint: "#e8eefc",
    divider: "#ebe8e1",
    successSolid: "#30a46c",
    successTint: "#e6f6ed",
    dangerSolid: "#e5484d",
    dangerTint: "#fdecec",
    orange: "#e8833a",
    orangeInk: "#c4622a",
    orangeTint: "#fff1e6",
    star: "#f2b33d",
  },
  radius: {
    card: "14px",
    control: "10px",
    option: "12px",
    pill: "99px",

    /* ── רדיוסים של מערכת העיצוב החדשה (Figma redesign) ── */
    button: "12px",
    field: "12px",
    answer: "14px",
    image: "16px",
    stat: "18px",
  },
  fonts: {
    main: '"Heebo", system-ui, sans-serif',
  },
  shadow: {
    card: "0 4px 24px rgba(15, 23, 42, 0.08)",
  },
} as const;

export type AppTheme = typeof theme;
