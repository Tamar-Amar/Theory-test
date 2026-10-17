import styled, { keyframes } from "styled-components";

const statPulse = keyframes`
  0%,
  100% {
    opacity: 0.48;
  }
  50% {
    opacity: 0.88;
  }
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.45rem;
  width: 100%;
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.control};
  padding: 0.55rem 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadow.card};
  min-width: 0;
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: clamp(0.82rem, 2.1vw, 1.05rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
`;

export const StatLabel = styled.div`
  font-size: clamp(0.58rem, 1.45vw, 0.72rem);
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 0.25rem;
  line-height: 1.25;
  hyphens: auto;
  overflow-wrap: anywhere;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.15rem;
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
  max-height: min(62vh, 560px);
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 2;
  text-align: right;
  padding: 0.75rem 0.85rem;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: 0 1px 0 ${({ theme }) => theme.colors.borderSubtle};
`;

export const Td = styled.td`
  text-align: right;
  padding: 0.65rem 0.85rem;
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

export const StatCardSkeleton = styled.div`
  min-height: 3.4rem;
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surface2};
  animation: ${statPulse} 1.15s ease-in-out infinite;
`;

export const TableLoadingPlaceholder = styled.div`
  min-height: 160px;
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px dashed ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
  font-weight: 600;
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

export const LicenseCard = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.25rem 1.35rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  box-shadow: ${({ theme }) => theme.shadow.card},
    0 0 0 1px ${({ theme }) => theme.colors.accentGlow};
`;

export const LicenseIntro = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.55;
  font-size: 0.95rem;
`;

export const LicenseCurrentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  && button {
    flex: 0 0 auto;
    width: auto;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    gap: 0.45rem;

    & > div {
      padding: 0.6rem 0.65rem;
    }

    && button {
      padding: 0.55rem 0.6rem;
      font-size: 0.86rem;
    }
  }
`;

export const LicenseCurrent = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  white-space: nowrap;
`;

export const LicenseHint = styled.p`
  margin: 0.75rem 0 0;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.accentDim};
  font-weight: 600;
`;

export const LicenseWarning = styled.p`
  margin: 0 0 1rem;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9rem;
  line-height: 1.45;
`;

export const LicenseActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
`;

export const SaveOk = styled.span`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.accentDim};
  font-weight: 600;
`;
