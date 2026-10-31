import type { ReactNode } from "react";
import { Ring, TrafficLight } from "../Deco/Deco";
import * as S from "./AuthLayout.styles";

type Props = {
  children: ReactNode;
  /** רוחב מקסימלי של הכרטיס בפיקסלים (ברירת מחדל 460) */
  maxWidth?: number;
};

/** מעטפת למסכי הזדהות/פנייה — כרטיס ממורכז על רקע paper עם צורות רקע (Figma) */
export function AuthLayout({ children, maxWidth = 460 }: Props) {
  return (
    <S.Screen>
      <S.Deco aria-hidden>
        <Ring style={{ top: "48px", right: "11%", opacity: 0.16 }} width={92} height={92} />
        <TrafficLight style={{ top: "46%", left: "13%", opacity: 0.5 }} width={40} height={106} />
      </S.Deco>
      <S.Content $maxWidth={maxWidth}>{children}</S.Content>
    </S.Screen>
  );
}
