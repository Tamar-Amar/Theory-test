import { useEffect, useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../PopupShell/PopupShell.styles";

/**
 * חלון "יש לבחור סוג רישיון לפני תרגול" (Popup / נדרש סוג רישיון ב‑Figma).
 * אי אפשר להמשיך בלי רישיון, ולכן גם סגירה (✕ / Escape) מובילה לאזור האישי.
 */
export function LicenseRequiredNotice() {
  const navigate = useNavigate();
  const titleId = useId();
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        navigate("/profile");
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    linkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [navigate]);

  return (
    <S.Overlay role="presentation">
      <S.Modal role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <S.Close
          type="button"
          aria-label="סגירה"
          onClick={() => navigate("/profile")}
        >
          ✕
        </S.Close>
        <S.Badge aria-hidden>🚗</S.Badge>
        <S.Title id={titleId}>יש לבחור סוג רישיון לפני תרגול</S.Title>
        <S.Intro>
          בחרו באזור האישי את סוג הרישיון שעליו אתם נבחנים (B, אופנוע, משאית
          וכו׳). לאחר השמירה, המבחנים והתרגול יותאמו אוטומטית לבחירה שלכם.
        </S.Intro>
        <S.Actions>
          <S.PrimaryLink ref={linkRef} to="/profile">
            מעבר לאזור האישי
          </S.PrimaryLink>
        </S.Actions>
      </S.Modal>
    </S.Overlay>
  );
}
