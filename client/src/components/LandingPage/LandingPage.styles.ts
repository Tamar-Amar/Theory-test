import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

/* ============ מקטעים במלוא הרוחב + מיכל פנימי ממורכז ============ */

export const Section = styled.section`
  width: 100%;
`;

const inner = css`
  width: 100%;
  margin: 0 auto;
  padding-inline: 1.5rem;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding-inline: 1.1rem;
  }
`;

/* ============ כפתורים (רוחב אוטומטי, לפי מערכת העיצוב) ============ */

const btnBase = css`
  direction: rtl;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.radius.button};
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.1;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: filter 0.12s ease, background 0.12s ease, transform 0.12s ease;

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.85rem 1.5rem;
  }
`;

const btnPrimary = css`
  ${btnBase}
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    filter: brightness(0.96);
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const btnSecondary = css`
  ${btnBase}
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.blue};
  border-color: ${({ theme }) => theme.colors.blue};

  &:hover {
    background: ${({ theme }) => theme.colors.blueTint};
  }
`;

const btnGhost = css`
  ${btnBase}
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/* ============ Hero ============ */

export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

export const HeroInner = styled.div`
  ${inner}
  max-width: 820px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.375rem;
  text-align: center;
  padding-top: 6.5rem;
  padding-bottom: 7rem;

  @media (max-width: 900px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

export const HeroDeco = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;

  svg {
    position: absolute;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.375rem;
  width: 100%;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(2.1rem, 6vw, 4.25rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.ink};

  span {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

export const Lead = styled.p`
  margin: 0;
  max-width: 640px;
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const HeroActions = styled.div`
  direction: ltr;
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  justify-content: center;
  padding-top: 0.5rem;

  /* מובייל: הכפתורים אחד מעל השני ברוחב מלא, הראשי למעלה */
  @media (max-width: 700px) {
    flex-direction: column-reverse;
    align-items: stretch;
    width: 100%;
    padding-top: 0.25rem;
  }
`;

export const RatingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
`;

export const RatingCaption = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

/** 5 כוכבים עם מילוי זהב יחסי לדירוג (שכבה זהובה חתוכה מעל שכבה אפורה) */
export const RatingStars = styled.span`
  direction: rtl;
  position: relative;
  display: inline-block;
  padding-top: 0.25rem;
  font-size: 1.75rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.divider};
  user-select: none;
`;

export const RatingFill = styled.span<{ $pct: number }>`
  position: absolute;
  top: 0.25rem;
  right: 0;
  direction: rtl;
  width: ${({ $pct }) => $pct}%;
  overflow: hidden;
  white-space: nowrap;
  color: #f5b301;
`;

export const Stats = styled.div`
  direction: ltr;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
  padding-top: 1.5rem;

  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;
    width: 100%;
    padding-top: 0.75rem;

    & > * {
      padding: 1rem;
      min-width: 0;
    }
  }
`;

/* כפתורי ה‑Hero */
export const HeroPrimary = styled.button`
  ${btnPrimary}
`;

export const HeroSecondary = styled(Link)`
  ${btnSecondary}
`;

/* ============ מקטע מבחן הניסיון ============ */

export const DemoSection = styled.section`
  width: 100%;
  padding-block: 2rem 4rem;
`;

export const DemoInner = styled.div`
  ${inner}
  max-width: 932px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 700px) {
    align-items: stretch;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.ink};

  @media (max-width: 700px) {
    text-align: right;
  }
`;

export const SectionSub = styled.p`
  margin: 0 0 0.75rem;
  max-width: 560px;
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.inkMuted};

  @media (max-width: 700px) {
    display: none;
  }
`;

/* כרטיס השאלה */
export const QuizCard = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 2rem 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;

  @media (max-width: 600px) {
    padding: 1.25rem 1.1rem;
  }
`;

export const CardHeader = styled.div`
  direction: ltr;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 700px) {
    justify-content: flex-end;
  }
`;

export const QCount = styled.span`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.inkMuted};

  @media (max-width: 700px) {
    display: none;
  }
`;

export const TopicChip = styled.span`
  direction: rtl;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1.5px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  white-space: nowrap;
`;

/* פס התקדמות 30 מקטעים */
export const Progress = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const Seg = styled.div<{ $kind: "done" | "current" | "todo" }>`
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
`;

export const QuestionText = styled.p`
  margin: 0;
  font-size: clamp(1.375rem, 2.6vw, 1.75rem);
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const DemoOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

type OptState = "idle" | "correct" | "wrong" | "missed";

const isPositive = (s: OptState) => s === "correct" || s === "missed";

export const DemoOption = styled.button<{ $state: OptState }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  text-align: right;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.answer};
  font-size: 1.0625rem;
  line-height: 1.4;
  font-weight: ${({ $state }) => ($state === "idle" ? 400 : 500)};
  background: ${({ theme, $state }) =>
    isPositive($state)
      ? theme.colors.successTint
      : $state === "wrong"
        ? theme.colors.dangerTint
        : theme.colors.surface};
  border: 1.5px solid
    ${({ theme, $state }) =>
      isPositive($state)
        ? theme.colors.successSolid
        : $state === "wrong"
          ? theme.colors.dangerSolid
          : theme.colors.divider};
  color: ${({ theme }) => theme.colors.ink};
  transition: border-color 0.15s ease, background 0.15s ease;

  &:disabled {
    cursor: default;
  }
  &:not(:disabled):hover {
    border-color: ${({ theme }) => theme.colors.blue};
  }
`;

export const OptMark = styled.span<{ $state: OptState }>`
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
      isPositive($state)
        ? theme.colors.successSolid
        : $state === "wrong"
          ? theme.colors.dangerSolid
          : theme.colors.divider};
  background: ${({ theme, $state }) =>
    isPositive($state)
      ? theme.colors.successSolid
      : $state === "wrong"
        ? theme.colors.dangerSolid
        : theme.colors.surface};
  color: ${({ theme, $state }) =>
    $state === "idle" ? theme.colors.inkMuted : theme.colors.surface};
`;

/* תיבת ההסבר לאחר מענה */
export const Explain = styled.div<{ $correct: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.answer};
  text-align: right;
  background: ${({ theme, $correct }) =>
    $correct ? theme.colors.successTint : theme.colors.dangerTint};
`;

export const ExplainTitle = styled.p<{ $correct: boolean }>`
  margin: 0;
  width: 100%;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme, $correct }) =>
    $correct ? theme.colors.successSolid : theme.colors.dangerSolid};
`;

export const ExplainText = styled.p`
  margin: 0;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.ink};
`;

export const CardNav = styled.div`
  direction: ltr;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

export const DemoNext = styled.button`
  ${btnPrimary}
  white-space: nowrap;

  @media (max-width: 700px) {
    padding-inline: 1.1rem;
  }
`;

export const DemoPrev = styled.button`
  ${btnGhost}
  white-space: nowrap;

  @media (max-width: 700px) {
    padding-inline: 0.75rem;
  }
`;

/* מסך תוצאות הדמו */
export const ResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 0;
  text-align: center;
`;

export const ResultScore = styled.div`
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.blue};
`;

export const ResultLabel = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const ResultActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;

export const ResultPrimary = styled(Link)`
  ${btnPrimary}
`;

export const ResultRetry = styled.button`
  ${btnSecondary}
`;

/* ============ למה לתרגל כאן? ============ */

export const FeaturesSection = styled.section`
  width: 100%;
  padding-block: 1.25rem 5rem;
`;

export const FeaturesInner = styled.div`
  ${inner}
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
`;

export const FeaturesTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.7rem, 3.5vw, 2.25rem);
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.ink};
`;

export const FeaturesRow = styled.div`
  direction: ltr;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  direction: rtl;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 2rem 1.75rem;
  text-align: right;
`;

export const FeatureTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

export const FeatureText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

/* ============ שאלות נפוצות ============ */

export const FaqSection = styled.section`
  width: 100%;
  padding-block: 0 5rem;
`;

export const FaqInner = styled.div`
  ${inner}
  max-width: 920px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
`;

export const FaqTitle = styled.h2`
  margin: 0 0 0.25rem;
  font-size: clamp(1.6rem, 3.5vw, 2rem);
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.ink};
`;

export const FaqItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.125rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  text-align: right;
`;

export const FaqQ = styled.h3`
  margin: 0;
  font-size: 1.1875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;

export const FaqA = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

/* ============ רצועת CTA ============ */

export const CtaSection = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
  background: ${({ theme }) => theme.colors.blueTint};
`;

export const CtaDeco = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  svg {
    position: absolute;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

export const CtaInner = styled.div`
  ${inner}
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-block: 4rem;
  text-align: center;
`;

export const CtaTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.7rem, 3.5vw, 2.25rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

export const CtaButton = styled.button`
  ${btnPrimary}
`;

