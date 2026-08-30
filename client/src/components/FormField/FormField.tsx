import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { useMemo, useState } from "react";
import * as S from "./FormField.styles";

type Props = {
  id: string;
  label: string;
  children: ReactNode;
};

export function FormField({ id, label, children }: Props) {
  return (
    <S.Row>
      <S.Label htmlFor={id}>{label}</S.Label>
      {children}
    </S.Row>
  );
}

export const FieldInput = S.Input;
export const FieldSelect = S.Select;

type FieldPasswordProps = Omit<ComponentProps<typeof S.Input>, "type">;

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path
        d="M2.04 12.32a1 1 0 0 1 0-.64C3.42 7.51 7.36 4.5 12 4.5c4.64 0 8.57 3.01 9.96 7.18a1 1 0 0 1 0 .64C20.58 16.49 16.64 19.5 12 19.5c-4.64 0-8.57-3.01-9.96-7.18Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path
        d="M3.98 8.22A10.48 10.48 0 0 0 1.93 12C3.23 16.34 7.24 19.5 12 19.5c.99 0 1.95-.14 2.86-.4M6.23 6.23A10.45 10.45 0 0 1 12 4.5c4.76 0 8.77 3.16 10.07 7.5a10.52 10.52 0 0 1-4.3 5.77M6.23 6.23 3 3m3.23 3.23 3.65 3.65m7.89 7.89L21 21m-3.23-3.23-3.65-3.65m0 0a3 3 0 1 0-4.24-4.24m4.24 4.24L9.88 9.88"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * שדות type="password" גורמים לעיתים (בעיקר iOS) למקלדת ASCII בלבד.
 * בדפדפנים שתומכים ב־-webkit-text-security משתמשים ב־type="text" ממוסך כנקודות.
 */
export function FieldPasswordInput({ style, ...rest }: FieldPasswordProps) {
  const [visible, setVisible] = useState(false);
  const useDiscMask = useMemo(() => {
    if (typeof CSS === "undefined" || !CSS.supports) return false;
    return CSS.supports("-webkit-text-security", "disc");
  }, []);

  const maskStyle: CSSProperties & { WebkitTextSecurity?: string } =
    !visible && useDiscMask ? { WebkitTextSecurity: "disc" } : { WebkitTextSecurity: "none" };

  return (
    <S.PasswordWrap>
      <S.PasswordInput
        key={visible ? "shown" : "masked"}
        {...rest}
        type={visible || useDiscMask ? "text" : "password"}
        dir="rtl"
        inputMode="text"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        style={{ ...maskStyle, ...style }}
      />
      <S.ToggleVisibility
        type="button"
        disabled={rest.disabled}
        aria-label={visible ? "הסתרת סיסמה" : "הצגת סיסמה"}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </S.ToggleVisibility>
    </S.PasswordWrap>
  );
}
