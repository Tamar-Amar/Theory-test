import * as S from "./LoadingState.styles";

export function LoadingState({ label = "טוען…" }: { label?: string }) {
  return <S.Text>{label}</S.Text>;
}
