import { NARROW_SCREEN_QUERY, useMediaQuery } from "../../hooks/useMediaQuery";
import * as S from "./PracticeSubNav.styles";

export function PracticeSubNav() {
  const narrow = useMediaQuery(NARROW_SCREEN_QUERY);

  return (
    <S.SubNav role="tablist" aria-label="תת-תפריט תרגול">
      <S.SubNavLink to="/practice" end role="tab">
        תרגול מבחנים
      </S.SubNavLink>
      {!narrow && (
        <S.SubNavLink to="/practice/game" end role="tab">
          משחק
        </S.SubNavLink>
      )}
    </S.SubNav>
  );
}
