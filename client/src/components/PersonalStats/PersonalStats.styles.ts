import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

export const SubSectionTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  max-height: min(52vh, 420px);
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
  position: sticky;
  top: 0;
  z-index: 2;
  text-align: right;
  padding: 0.65rem 0.75rem;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: 0 1px 0 ${({ theme }) => theme.colors.borderSubtle};
`;

export const Td = styled.td`
  text-align: right;
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  color: ${({ theme }) => theme.colors.text};
`;

export const Tr = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }
`;

export const Empty = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 1.5rem 1rem;
`;

export const Muted = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

export const DetailButton = styled.button`
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.35rem 0.55rem;
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accentGlow};
  color: ${({ theme }) => theme.colors.accentDim};
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
`;

export const ExpandedCell = styled.td`
  padding: 0 !important;
  vertical-align: top;
  background: ${({ theme }) => theme.colors.bg};
`;

export const ExpandedInner = styled.div`
  padding: 0.85rem 0.75rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;
