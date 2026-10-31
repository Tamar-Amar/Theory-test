import { Link } from "react-router-dom";
import styled from "styled-components";

/** דף 404 (Figma 10:915): תוכן ממורכז + צורות רקע */
export const Root = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: clamp(3rem, 10vh, 7.5rem) 1.25rem clamp(4rem, 12vh, 8.75rem);
  box-sizing: border-box;
  text-align: center;
`;

export const Deco = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  svg {
    position: absolute;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const above = `
  position: relative;
  z-index: 1;
`;

export const Code = styled.p`
  ${above}
  margin: 0;
  font-size: clamp(5rem, 16vw, 7.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.blue};
`;

export const Title = styled.h1`
  ${above}
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Text = styled.p`
  ${above}
  margin: 0;
  max-width: 34rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkMuted};

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const HomeLink = styled(Link)`
  ${above}
  margin-top: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.radius.button};
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    filter: brightness(0.96);
  }
`;
