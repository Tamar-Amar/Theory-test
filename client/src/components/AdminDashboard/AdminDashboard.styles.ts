import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const StatValue = styled.div`
  font-size: 1.45rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 0.25rem;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
`;

export const Th = styled.th`
  text-align: right;
  padding: 0.65rem 0.75rem;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const Td = styled.td`
  text-align: right;
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  color: ${({ theme }) => theme.colors.text};
  vertical-align: top;
`;

export const TdDate = styled(Td)`
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

export const Tr = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }
`;

export const TicketBody = styled.div`
  max-width: 28rem;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.4;
`;

export const Empty = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`;

export const DeleteButton = styled.button`
  font: inherit;
  font-size: 0.82rem;
  padding: 0.35rem 0.65rem;
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  background: transparent;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.dangerBg};
  }
`;
