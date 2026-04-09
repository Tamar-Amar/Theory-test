import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as S from "./Button.styles";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function PrimaryButton({ children, ...rest }: BtnProps) {
  return <S.Primary {...rest}>{children}</S.Primary>;
}

export function PrimaryInlineButton({ children, ...rest }: BtnProps) {
  return <S.PrimaryInline {...rest}>{children}</S.PrimaryInline>;
}

export function GhostButton({ children, ...rest }: BtnProps) {
  return <S.Ghost {...rest}>{children}</S.Ghost>;
}

export function SecondaryButton({ children, ...rest }: BtnProps) {
  return <S.Secondary {...rest}>{children}</S.Secondary>;
}

export function ResultsPrimaryButton({ children, ...rest }: BtnProps) {
  return <S.ResultsPrimary {...rest}>{children}</S.ResultsPrimary>;
}
