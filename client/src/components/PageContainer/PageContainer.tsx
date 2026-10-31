import type { ReactNode } from "react";
import { APP_VERSION } from "../../version";
import { LINKEDIN_PROFILE_URL } from "../../constants/links";
import { LEGAL_DOCS } from "../Legal/legalContent";
import { Logo } from "../Logo/Logo";
import { SiteHeader } from "../SiteHeader/SiteHeader";
import * as S from "./PageContainer.styles";

/** תוויות מקוצרות לקישורי הפוטר, בהתאמה לעיצוב ב‑Figma */
const FOOTER_LINK_LABELS: Record<string, ReactNode> = {
  privacy: "פרטיות",
  terms: "תנאי שימוש",
  // במובייל התווית מקוצרת ל"נגישות" (Footer/Mobile)
  accessibility: (
    <>
      <S.OnlyWide>הצהרת </S.OnlyWide>נגישות
    </>
  ),
};

type Props = {
  children: ReactNode;
  /** רוחב מורחב (למשל אזור אישי עם גרפים) */
  wide?: boolean;
  /** רוחב מקסימלי למסך מנהל — טבלאות רחבות */
  admin?: boolean;
  /** עמוד ברוחב מלא (ללא מגביל רוחב) — לדף הנחיתה עם מקטעים במלוא הרוחב */
  fluid?: boolean;
  /** כשמועבר — המשתמש מחובר וה־header מציג התנתקות */
  onLogout?: () => void;
};

export function PageContainer({
  children,
  wide = false,
  admin = false,
  fluid = false,
  onLogout,
}: Props) {
  return (
    <S.Shell>
      <a className="skip-link" href="#main-content">
        דלג לתוכן המרכזי
      </a>
      <SiteHeader onLogout={onLogout} admin={admin} />
      {fluid ? (
        <S.FluidMain id="main-content" as="main" tabIndex={-1}>
          {children}
        </S.FluidMain>
      ) : (
        <S.Wrapper $wide={wide} $admin={admin}>
          <S.Main id="main-content" as="main" tabIndex={-1}>
            {children}
          </S.Main>
        </S.Wrapper>
      )}
      <S.Footer role="contentinfo">
        <S.FooterInner dir="rtl">
          <S.FooterBrand>
            <S.LogoSlot>
              <Logo size={28} />
            </S.LogoSlot>
            <S.OnlyNarrow>
              <Logo size={24} />
            </S.OnlyNarrow>
            <S.FooterTagline>
כלי לימוד עצמאי, על בסיס מאגר השאלות של משרד התחבורה.
            </S.FooterTagline>
          </S.FooterBrand>

          <S.FooterMeta>
            <S.FooterLinks>
              {LEGAL_DOCS.map((doc) => (
                <S.FooterLink key={doc.slug} to={`/${doc.slug}`}>
                  {FOOTER_LINK_LABELS[doc.slug] ?? doc.navLabel}
                </S.FooterLink>
              ))}
              <S.FooterLink to="/contact">צור קשר</S.FooterLink>
            </S.FooterLinks>

            <S.FooterSep aria-hidden />

            <S.FooterLegal>
              <span>כל הזכויות שמורות © 2026</span>
              <S.FooterExternalLink
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                tamar
              </S.FooterExternalLink>
              <S.FooterDot aria-hidden>·</S.FooterDot>
              <S.FooterVersion>גרסה {APP_VERSION}</S.FooterVersion>
            </S.FooterLegal>
          </S.FooterMeta>
        </S.FooterInner>
      </S.Footer>
    </S.Shell>
  );
}
