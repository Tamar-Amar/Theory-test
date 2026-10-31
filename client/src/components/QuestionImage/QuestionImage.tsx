import { useEffect, useState } from "react";
import * as S from "./QuestionImage.styles";

type Props = {
  src: string;
  alt?: string;
};

/** אייקון זכוכית מגדלת (מתוך מערכת העיצוב ב‑Figma) */
function ZoomIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden focusable="false">
      <path
        d="M14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.46243 5.46243 3 8.5 3C11.5376 3 14 5.46243 14 8.5Z"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M13 13L17 17M8.5 6V11M6 8.5H11"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function QuestionImage({ src, alt = "איור לשאלה" }: Props) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <S.Figure>
      <S.FrameButton
        type="button"
        onClick={() => setZoomed(true)}
        aria-label="הגדלת התמונה"
      >
        <S.Img src={src} alt={alt} loading="lazy" decoding="async" />
        <S.ZoomBadge>
          <ZoomIcon />
        </S.ZoomBadge>
      </S.FrameButton>
      <S.Caption>תמונה להמחשה · לחצו להגדלה</S.Caption>

      {zoomed ? (
        <S.Overlay
          role="dialog"
          aria-modal="true"
          aria-label="תצוגה מוגדלת של האיור"
          onClick={() => setZoomed(false)}
        >
          <S.CloseButton
            type="button"
            aria-label="סגירת התצוגה המוגדלת"
            onClick={() => setZoomed(false)}
          >
            <CloseIcon />
          </S.CloseButton>
          <S.OverlayImg
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
          />
        </S.Overlay>
      ) : null}
    </S.Figure>
  );
}
