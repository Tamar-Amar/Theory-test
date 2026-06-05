import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: ${({ theme }) => theme.fonts.main};
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bg};
  }

  #root {
    min-height: 100vh;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* חיווי פוקוס ברור לניווט במקלדת (נגישות) */
  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* קישור "דלג לתוכן" — מוסתר עד שמקבל פוקוס */
  .skip-link {
    position: fixed;
    top: 0;
    inset-inline-start: 0;
    z-index: 200;
    transform: translateY(-130%);
    margin: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: ${({ theme }) => theme.radius.control};
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.15s ease;
  }

  .skip-link:focus {
    transform: translateY(0);
  }
`;
