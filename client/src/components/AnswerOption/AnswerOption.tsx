import type { HTMLAttributes } from "react";
import * as S from "./AnswerOption.styles";

type Props = {
  name: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function AnswerOption({ name, label, selected, onSelect }: Props) {
  return (
    <S.Label $selected={selected}>
      <S.Radio
        type="radio"
        name={name}
        checked={selected}
        onChange={() => onSelect()}
      />
      <S.OptionText>{label}</S.OptionText>
    </S.Label>
  );
}

export function AnswerList(props: HTMLAttributes<HTMLDivElement>) {
  return <S.List {...props} />;
}
