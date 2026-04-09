import * as S from "./ErrorAlert.styles";

type Props = { children: string; compact?: boolean };

export function ErrorAlert({ children, compact }: Props) {
  return (
    <S.Box role="alert" $compact={compact}>
      {children}
    </S.Box>
  );
}
