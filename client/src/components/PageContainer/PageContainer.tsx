import type { ReactNode } from "react";
import { Fragment } from "react";
import { APP_VERSION } from "../../version";
import { LINKEDIN_PROFILE_URL } from "../../constants/links";
import { LEGAL_DOCS } from "../Legal/legalContent";
import { SiteHeader } from "../SiteHeader/SiteHeader";
import * as S from "./PageContainer.styles";

type Props = {
  children: ReactNode;
  /** רוחב מורחב (למשל אזור אישי עם גרפים) */
  wide?: boolean;
  /** רוחב מקסימלי למסך מנהל — טבלאות רחבות */
  admin?: boolean;
  /** הצגת אייקון התחברות בכותרת (לאורחים) */
  showLogin?: boolean;
  /** כשמועבר — המשתמש מחובר וה־header מציג התנתקות */
  onLogout?: () => void;
  /** תפריט ניווט ראשי — אזור אישי / תרגול / למידה */
  showAppNav?: boolean;
};

export function PageContainer({
  children,
  wide = false,
  admin = false,
  showLogin = false,
  onLogout,
  showAppNav = false,
}: Props) {
  return (
    <Fragment>
      <a className="skip-link" href="#main-content">
        דלג לתוכן המרכזי
      </a>
      <SiteHeader
        wide={wide || admin}
        showLogin={showLogin}
        onLogout={onLogout}
        showAppNav={showAppNav}
        admin={admin}
      />
      <S.Wrapper $wide={wide} $admin={admin}>
        <S.Main id="main-content" as="main" tabIndex={-1}>
          {children}
        </S.Main>
      </S.Wrapper>
      <S.Footer role="contentinfo">
        <S.FooterInner dir="rtl" $wide={wide}>
          <S.FooterMeta>
            <span>כל הזכויות שמורות © 2026</span>
            <S.FooterSep aria-hidden>·</S.FooterSep>
            <S.FooterExternalLink
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              tamar
            </S.FooterExternalLink>
            <S.FooterSep aria-hidden>·</S.FooterSep>
            <S.FooterVersion>{APP_VERSION}</S.FooterVersion>
          </S.FooterMeta>
          <S.FooterLinks>
            {LEGAL_DOCS.map((doc) => (
              <S.FooterLink key={doc.slug} to={`/${doc.slug}`}>
                {doc.navLabel}
              </S.FooterLink>
            ))}
          </S.FooterLinks>
        </S.FooterInner>
      </S.Footer>
    </Fragment>
  );
}
