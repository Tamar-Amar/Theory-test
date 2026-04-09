import type { ReactNode } from "react";
import * as S from "./AppHeader.styles";

type Props = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function AppHeader({ title, subtitle, children }: Props) {
  return (
    <S.Root>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
      {children}
    </S.Root>
  );
}
