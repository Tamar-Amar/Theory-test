import styled from "styled-components";

/** נקודת השבירה של "מובייל" לתוכן הדפים (מסכי המובייל ב‑Figma רחבים 390px) */
export const MOBILE_MAX = "(max-width: 700px)";

/** טקסט שמוצג רק בדסקטופ — במובייל הוא מקוצר (ראו Figma: מסכי מובייל) */
export const WideOnly = styled.span`
  @media ${MOBILE_MAX} {
    display: none;
  }
`;

/** הגרסה המקוצרת של אותו טקסט — מוצגת רק במובייל */
export const NarrowOnly = styled.span`
  display: none;

  @media ${MOBILE_MAX} {
    display: inline;
  }
`;
