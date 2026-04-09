import type { ReactNode } from "react";
import { Fragment } from "react";
import { APP_VERSION } from "../../version";
import { LINKEDIN_PROFILE_URL } from "../../constants/links";
import * as S from "./PageContainer.styles";

type Props = {
  children: ReactNode;
  /** רוחב מורחב (למשל אזור אישי עם גרפים) */
  wide?: boolean;
};

export function PageContainer({ children, wide = false }: Props) {
  return (
    <Fragment>
      <S.Wrapper $wide={wide}>
        <S.Main>{children}</S.Main>
      </S.Wrapper>
      <S.Footer role="contentinfo">
        <S.FooterInner dir="rtl" $wide={wide}>
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
        </S.FooterInner>
      </S.Footer>
    </Fragment>
  );
}
