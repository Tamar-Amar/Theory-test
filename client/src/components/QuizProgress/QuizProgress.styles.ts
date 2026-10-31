import styled from "styled-components";

export type SegKind = "done" | "current" | "todo";

export const Wrap = styled.div`
  margin-bottom: 1.25rem;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: 0.35rem;
`;

export const Timer = styled.span`
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue};
`;

export const Segments = styled.div`
  display: flex;
  gap: 5px;
  align-items: stretch;
  width: 100%;
`;

export const Seg = styled.div<{ $kind: SegKind }>`
  flex: 1 1 0;
  min-width: 0;
  height: 5px;
  border-radius: 3px;
  background: ${({ theme, $kind }) =>
    $kind === "done"
      ? theme.colors.blue
      : $kind === "current"
      ? theme.colors.orange
      : theme.colors.divider};
  transition: background 0.3s ease;
`;
