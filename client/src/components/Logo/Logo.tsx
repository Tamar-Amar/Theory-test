import * as S from "./Logo.styles";

type MarkProps = {
  /** גודל הסמל בפיקסלים (ברירת מחדל 40) */
  size?: number;
  /** שם נגיש לסמל; כשאינו מוגדר הסמל מוסתר מקוראי מסך (דקורטיבי) */
  label?: string;
  className?: string;
};

/** סמל הלוגו בלבד — טבעת כחולה עם קו אלכסוני (mark ב‑Figma) */
export function LogoMark({ size = 40, label, className }: MarkProps) {
  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true };
  return (
    <S.Mark $size={size} className={className}>
      <svg viewBox="0 0 40 40" fill="none" focusable="false" {...a11y}>
        <path
          d="M35 20C35 28.2843 28.2843 35 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5C28.2843 5 35 11.7157 35 20Z"
          stroke="currentColor"
          strokeWidth={5}
        />
        <path
          d="M12.5 27.5L27.5 12.5"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
        />
      </svg>
    </S.Mark>
  );
}

type LogoProps = {
  size?: number;
  /** הצגת שם המותג לצד הסמל (ברירת מחדל: כן) */
  showText?: boolean;
  className?: string;
};

/** לוגו מלא — סמל + שם המותג "תאוריה" (Logo ב‑Figma) */
export function Logo({ size = 40, showText = true, className }: LogoProps) {
  return (
    <S.Root $size={size} className={className}>
      {showText ? <S.Word $size={size}>תאוריה</S.Word> : null}
      <LogoMark size={size} label={showText ? undefined : "תאוריה"} />
    </S.Root>
  );
}
