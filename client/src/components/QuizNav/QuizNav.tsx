import type { ReactNode } from "react";
import * as S from "./QuizNav.styles";

export function QuizNavRow({ children }: { children: ReactNode }) {
  return <S.Row>{children}</S.Row>;
}
