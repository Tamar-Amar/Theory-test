import type { HTMLAttributes } from "react";
import * as S from "./AnswerOption.styles";
import type { AnswerState } from "./AnswerOption.styles";

/** אותיות התשובות (א׳, ב׳, ג׳ ...) לפי מיקום */
const OPTION_LETTERS = ["א", "ב", "ג", "ד", "ה", "ו"];

type Props = {
  name: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  /** מיקום התשובה — קובע את האות בתג (א/ב/ג/ד) */
  index?: number;
  /** מצב תשובה לאחר מענה — לסימון נכון/שגוי במסכי סיכום */
  status?: "correct" | "wrong";
  /** חסימת בחירה (למשל במצב סקירה) */
  disabled?: boolean;
};

export function AnswerOption({
  name,
  label,
  selected,
  onSelect,
  index,
  status,
  disabled,
}: Props) {
  const state: AnswerState = status ? status : selected ? "selected" : "default";
  const letter =
    typeof index === "number"
      ? OPTION_LETTERS[index] ?? String(index + 1)
      : "";

  return (
    <S.Label $state={state}>
      <S.Radio
        type="radio"
        name={name}
        checked={selected}
        onChange={() => onSelect()}
        disabled={disabled}
      />
      <S.Badge $state={state} aria-hidden>
        {letter}
      </S.Badge>
      <S.OptionText $state={state}>{label}</S.OptionText>
    </S.Label>
  );
}

export function AnswerList(props: HTMLAttributes<HTMLDivElement>) {
  return <S.List {...props} />;
}
