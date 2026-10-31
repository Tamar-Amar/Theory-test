import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as S from "./Chip.styles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** מצב פעיל (נושא נבחר) */
  active?: boolean;
  /** אייקון בעיגול לצד הטקסט (למשל סוג רכב) */
  icon?: ReactNode;
};

/** צ'יפ נושא — מצב רגיל/פעיל (Chip/Default, Chip/Active ב‑Figma), עם אייקון אופציונלי */
export function Chip({
  children,
  active = false,
  icon,
  type = "button",
  ...rest
}: Props) {
  return (
    <S.Root $active={active} type={type} aria-pressed={active} {...rest}>
      {icon ? (
        <S.IconBubble $active={active} aria-hidden>
          {icon}
        </S.IconBubble>
      ) : null}
      {children}
    </S.Root>
  );
}
