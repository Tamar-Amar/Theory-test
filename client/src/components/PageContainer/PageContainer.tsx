import type { ReactNode } from "react";
import * as S from "./PageContainer.styles";

const CONTACT_EMAIL = "amtamar747@gmail.com";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <S.Wrapper>
      <S.Main>{children}</S.Main>
      <S.Footer dir="rtl">
        כל הזכויות שמורות © 2026 ·{" "}
        <S.FooterLink href={`mailto:${CONTACT_EMAIL}`}>tamar</S.FooterLink>
      </S.Footer>
    </S.Wrapper>
  );
}
