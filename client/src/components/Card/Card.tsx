import type { ReactNode } from "react";
import * as S from "./Card.styles";

type Props = { children: ReactNode; variant?: "default" | "narrow" };

export function Card({ children, variant = "default" }: Props) {
  if (variant === "narrow") {
    return <S.Narrow>{children}</S.Narrow>;
  }
  return <S.Root>{children}</S.Root>;
}
