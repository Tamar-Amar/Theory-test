import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { useMemo } from "react";
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

/**
 * שדות type="password" גורמים לעיתים (בעיקר iOS) למקלדת ASCII בלבד.
 * בדפדפנים שתומכים ב־-webkit-text-security משתמשים ב־type="text" ממוסך כנקודות.
 */
export function FieldPasswordInput({ style, ...rest }: FieldPasswordProps) {
  const useDiscMask = useMemo(() => {
    if (typeof CSS === "undefined" || !CSS.supports) return false;
    return CSS.supports("-webkit-text-security", "disc");
  }, []);

  const maskStyle: CSSProperties & { WebkitTextSecurity?: string } =
    useDiscMask ? { WebkitTextSecurity: "disc" } : {};

  return (
    <S.Input
      {...rest}
      type={useDiscMask ? "text" : "password"}
      dir="rtl"
      inputMode="text"
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      style={{ ...maskStyle, ...style }}
    />
  );
}
