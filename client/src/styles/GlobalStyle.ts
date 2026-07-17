import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  html[data-a11y-font="112"] {
    font-size: 112%;
  }

  html[data-a11y-font="125"] {
    font-size: 125%;
  }

  html[data-a11y-font="150"] {
    font-size: 150%;
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

  /* —— ממשק נגישות: ניגודיות גבוהה —— */
  html[data-a11y-contrast="1"] {
    filter: invert(1) hue-rotate(180deg);
  }

  html[data-a11y-contrast="1"] img,
  html[data-a11y-contrast="1"] video,
  html[data-a11y-contrast="1"] picture,
  html[data-a11y-contrast="1"] canvas {
    filter: invert(1) hue-rotate(180deg);
  }

  html[data-a11y-contrast="1"] :focus-visible {
    outline-color: #00f;
    outline-width: 4px;
  }

  /* מסגרת קבועה לכפתורים, קישורים ושדות קלט — בלי זה הם נבלעים ברקע אחרי ה-invert */
  html[data-a11y-contrast="1"] button,
  html[data-a11y-contrast="1"] a,
  html[data-a11y-contrast="1"] [role="button"],
  html[data-a11y-contrast="1"] input,
  html[data-a11y-contrast="1"] textarea,
  html[data-a11y-contrast="1"] select,
  html[data-a11y-contrast="1"] [role="textbox"],
  html[data-a11y-contrast="1"] [role="combobox"],
  html[data-a11y-contrast="1"] [role="listbox"] {
    border: 2px solid currentColor !important;
  }

  html[data-a11y-contrast="1"] input,
  html[data-a11y-contrast="1"] textarea,
  html[data-a11y-contrast="1"] select {
    background-color: #fff !important;
    color: #000 !important;
    caret-color: #000;
  }

  html[data-a11y-contrast="1"] input::placeholder,
  html[data-a11y-contrast="1"] textarea::placeholder {
    color: #444 !important;
    opacity: 1;
  }

  html[data-a11y-contrast="1"] header a,
  html[data-a11y-contrast="1"] header button {
    background: transparent !important;
  }

  /* —— הדגשת קישורים —— */
  html[data-a11y-links="1"] a {
    text-decoration: underline !important;
    text-underline-offset: 3px;
    font-weight: 700;
  }

  /* —— גופן קריא יותר —— */
  html[data-a11y-readable="1"] body {
    letter-spacing: 0.04em;
    word-spacing: 0.08em;
    line-height: 1.75;
  }

  html[data-a11y-readable="1"] p,
  html[data-a11y-readable="1"] li,
  html[data-a11y-readable="1"] label,
  html[data-a11y-readable="1"] button,
  html[data-a11y-readable="1"] input,
  html[data-a11y-readable="1"] textarea,
  html[data-a11y-readable="1"] select {
    line-height: 1.75;
  }

  /* —— קו תחתון לכותרות —— */
  html[data-a11y-headings="1"] h1,
  html[data-a11y-headings="1"] h2,
  html[data-a11y-headings="1"] h3,
  html[data-a11y-headings="1"] h4 {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  /* —— הפחתת אנימציות —— */
  html[data-a11y-motion="1"] *,
  html[data-a11y-motion="1"] *::before,
  html[data-a11y-motion="1"] *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
`;
