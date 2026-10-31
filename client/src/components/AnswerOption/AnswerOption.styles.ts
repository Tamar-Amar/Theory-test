import styled, { css } from "styled-components";

export type AnswerState = "default" | "selected" | "correct" | "wrong";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const borderByState = ({
  theme,
  $state,
}: {
  theme: import("styled-components").DefaultTheme;
  $state: AnswerState;
}) =>
  $state === "selected"
    ? theme.colors.blue
    : $state === "correct"
    ? theme.colors.successSolid
    : $state === "wrong"
    ? theme.colors.dangerSolid
    : theme.colors.divider;

const surfaceByState = css<{ $state: AnswerState }>`
  background: ${({ theme, $state }) =>
    $state === "selected"
      ? theme.colors.blueTint
      : $state === "correct"
      ? theme.colors.successTint
      : $state === "wrong"
      ? theme.colors.dangerTint
      : theme.colors.surface};
  border-color: ${borderByState};
`;

export const Label = styled.label<{ $state: AnswerState }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.answer};
  border: 1.5px solid ${({ theme }) => theme.colors.divider};
  cursor: pointer;
  text-align: right;
  transition: border-color 0.15s ease, background 0.15s ease;
  ${surfaceByState}

  &:hover {
    border-color: ${({ theme, $state }) =>
      $state === "default" ? theme.colors.blue : borderByState({ theme, $state })};
  }
`;

/** input נגיש אך נסתר ויזואלית — הבחירה והמקלדת ממשיכות לעבוד */
export const Radio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;

export const Badge = styled.span<{ $state: AnswerState }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  border: 1.5px solid
    ${({ theme, $state }) =>
      $state === "selected"
        ? theme.colors.blue
        : $state === "correct"
        ? theme.colors.successSolid
        : $state === "wrong"
        ? theme.colors.dangerSolid
        : theme.colors.divider};
  background: ${({ theme, $state }) =>
    $state === "selected"
      ? theme.colors.blue
      : $state === "correct"
      ? theme.colors.successSolid
      : $state === "wrong"
      ? theme.colors.dangerSolid
      : theme.colors.surface};
  color: ${({ theme, $state }) =>
    $state === "default" ? theme.colors.inkMuted : theme.colors.surface};
`;

export const OptionText = styled.span<{ $state: AnswerState }>`
  flex: 1;
  min-width: 0;
  font-size: 1.0625rem;
  line-height: 1.4;
  font-weight: ${({ $state }) => ($state === "default" ? 400 : 500)};
  color: ${({ theme, $state }) =>
    $state === "selected" ? theme.colors.blue : theme.colors.ink};
`;
