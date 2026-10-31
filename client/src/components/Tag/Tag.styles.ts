import styled from "styled-components";

export type TagVariant = "success" | "danger" | "warm";

export const Root = styled.span<{ $variant: TagVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 0.3125rem 0.875rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  background: ${({ theme, $variant }) =>
    $variant === "success"
      ? theme.colors.successTint
      : $variant === "danger"
      ? theme.colors.dangerTint
      : theme.colors.orangeTint};
  color: ${({ theme, $variant }) =>
    $variant === "success"
      ? theme.colors.successSolid
      : $variant === "danger"
      ? theme.colors.dangerSolid
      : theme.colors.orangeInk};
`;
