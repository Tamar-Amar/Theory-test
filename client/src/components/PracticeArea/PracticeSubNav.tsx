import { NARROW_SCREEN_QUERY, useMediaQuery } from "../../hooks/useMediaQuery";
import * as S from "./PracticeSubNav.styles";

export function PracticeSubNav() {
  const narrow = useMediaQuery(NARROW_SCREEN_QUERY);

  return (
    <S.Header>
      <S.Title>תרגול</S.Title>
      {!narrow && (
        <S.SubNav role="tablist" aria-label="תת-תפריט תרגול">
          <S.SubNavLink to="/practice" end role="tab">
            מבחן
          </S.SubNavLink>
          <S.SubNavLink to="/practice/game" end role="tab">
            משחק התאמות
          </S.SubNavLink>
        </S.SubNav>
      )}
    </S.Header>
  );
}
