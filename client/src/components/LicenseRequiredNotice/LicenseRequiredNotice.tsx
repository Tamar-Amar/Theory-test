import { Link } from "react-router-dom";
import { Card } from "../Card/Card";
import * as S from "./LicenseRequiredNotice.styles";

type Props = {
  /** כותרת קצרה לפי ההקשר (מבחן / משחק וכו׳) */
  context?: string;
};

export function LicenseRequiredNotice({ context = "תרגול" }: Props) {
  return (
    <Card>
      <S.Root>
        <S.Title>יש לבחור סוג רישיון לפני {context}</S.Title>
        <S.Text>
          בחרו באזור האישי את סוג הרישיון שעליו אתם נבחנים (B, אופנוע, משאית
          וכו׳). לאחר השמירה, המבחנים והתרגול יותאמו אוטומטית לבחירה שלכם.
        </S.Text>
        <S.Actions>
          <S.ProfileLink to="/profile">מעבר לאזור האישי</S.ProfileLink>
        </S.Actions>
      </S.Root>
    </Card>
  );
}
