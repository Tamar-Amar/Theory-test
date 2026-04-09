export const theme = {
  colors: {
    bg: "#eef2f7",
    surface: "#ffffff",
    surface2: "#e2e8f0",
    text: "#1e293b",
    muted: "#64748b",
    accent: "#2563eb",
    accentDim: "#1d4ed8",
    success: "#059669",
    danger: "#dc2626",
    mint: "#0d9488",
    white: "#ffffff",
    borderSubtle: "rgba(15, 23, 42, 0.08)",
    accentGlow: "rgba(37, 99, 235, 0.1)",
    accentBorder: "rgba(37, 99, 235, 0.35)",
    dangerBg: "rgba(220, 38, 38, 0.1)",
    /** לגרדיאנטים על רקע בהיר */
    gradientStart: "#0f172a",
  },
  radius: {
    card: "14px",
    control: "10px",
    option: "12px",
    pill: "99px",
  },
  fonts: {
    main: '"Heebo", system-ui, sans-serif',
  },
  shadow: {
    card: "0 4px 24px rgba(15, 23, 42, 0.08)",
  },
} as const;

export type AppTheme = typeof theme;
