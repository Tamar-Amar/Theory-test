import { Link } from "react-router-dom";
import styled from "styled-components";

export const Hero = styled.section`
  text-align: center;
  padding: 1.5rem 0 0.5rem;
`;

export const Title = styled.h1`
  margin: 0 0 0.75rem;
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;

  @media (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

export const Lead = styled.p`
  margin: 0 auto;
  max-width: 540px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.05rem;
`;

export const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const CtaPrimary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.6rem;
  border-radius: ${({ theme }) => theme.radius.control};
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.accentDim}
  );
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: filter 0.12s ease, transform 0.12s ease;

  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const CtaGhost = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.6rem;
  border-radius: ${({ theme }) => theme.radius.control};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: border-color 0.12s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentBorder};
  }
`;

export const Section = styled.section`
  margin-top: 2.75rem;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
`;

export const SectionIntro = styled.p`
  margin: -0.5rem auto 1.25rem;
  max-width: 540px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;

export const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Disclaimer = styled.p`
  margin: 2.5rem auto 0;
  max-width: 620px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.82rem;
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const Feature = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 1.25rem;
  text-align: center;
`;

export const FeatureIcon = styled.div`
  width: 44px;
  height: 44px;
  margin: 0 auto 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentGlow};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.4rem;
`;

export const FeatureTitle = styled.h3`
  margin: 0 0 0.4rem;
  font-size: 1.05rem;
  font-weight: 700;
`;

export const FeatureText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.92rem;
`;

/* ----- כרטיס פתיחת הדמו ----- */

export const DemoLaunch = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 1.75rem 1.5rem;
  text-align: center;
`;

export const DemoLaunchTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const DemoLaunchText = styled.p`
  margin: 0 auto 1.25rem;
  max-width: 460px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;

export const DemoLaunchButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.accentDim}
  );
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 1.05rem;
  transition: filter 0.12s ease, transform 0.12s ease;

  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    transform: scale(0.98);
  }
`;

/* ----- מודאל מבחן הניסיון ----- */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1.25rem;
  overflow-y: auto;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
`;

export const Modal = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  margin: auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.35);
  padding: 1.5rem 1.35rem 1.6rem;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 0.85rem;
  inset-inline-end: 0.85rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  line-height: 1;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const QuestionCount = styled.p`
  margin: 0.25rem 0 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
`;

export const DemoQuestionText = styled.p`
  margin: 0 0 1rem;
  font-weight: 600;
  font-size: 1.08rem;
  line-height: 1.45;
`;

export const DemoOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

type OptState = "idle" | "correct" | "wrong" | "missed";

export const DemoOption = styled.button<{ $state: OptState }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  text-align: right;
  padding: 0.85rem 1rem;
  border-radius: ${({ theme }) => theme.radius.option};
  font-size: 0.98rem;
  background: ${({ theme, $state }) =>
    $state === "correct"
      ? "rgba(5, 150, 105, 0.12)"
      : $state === "wrong"
        ? theme.colors.dangerBg
        : theme.colors.bg};
  border: 2px solid
    ${({ theme, $state }) =>
      $state === "correct"
        ? theme.colors.success
        : $state === "wrong"
          ? theme.colors.danger
          : $state === "missed"
            ? theme.colors.success
            : theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.15s ease, background 0.15s ease;

  &:disabled {
    cursor: default;
  }

  &:not(:disabled):hover {
    border-color: ${({ theme }) => theme.colors.accentBorder};
  }
`;

export const OptMark = styled.span<{ $state: OptState }>`
  font-weight: 700;
  font-size: 1.05rem;
  min-width: 1.1rem;
  color: ${({ theme, $state }) =>
    $state === "wrong" ? theme.colors.danger : theme.colors.success};
`;

export const ModalActions = styled.div`
  margin-top: 1.35rem;
`;

export const NextButton = styled.button`
  width: 100%;
  padding: 0.8rem 1.25rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.accentDim}
  );
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 1rem;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

/* ----- מסך תוצאות הדמו ----- */

export const ResultWrap = styled.div`
  text-align: center;
  padding: 0.5rem 0;
`;

export const ResultScore = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1.1;
`;

export const ResultLabel = styled.p`
  margin: 0.35rem 0 1.25rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ResultActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.5rem;
`;

export const ResultRetry = styled.button`
  width: 100%;
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.control};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.98rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentBorder};
  }
`;

/* ----- FAQ ----- */

export const FaqItem = styled.details`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 0.9rem 1.1rem;

  & + & {
    margin-top: 0.75rem;
  }

  &[open] summary {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const FaqQuestion = styled.summary`
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }
`;

export const FaqAnswer = styled.p`
  margin: 0.7rem 0 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;
