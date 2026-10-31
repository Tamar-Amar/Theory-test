import type { ReactNode } from "react";
import * as S from "./Tag.styles";
import type { TagVariant } from "./Tag.styles";

type Props = {
  variant?: TagVariant;
  children: ReactNode;
  className?: string;
};

/** תג סטטוס קטן — נכון/שגוי/הדגשה (Tag/Success, Tag/Danger, Tag/Warm ב‑Figma) */
export function Tag({ variant = "success", children, className }: Props) {
  return (
    <S.Root $variant={variant} className={className}>
      {children}
    </S.Root>
  );
}

export function SuccessTag({ children, className }: Omit<Props, "variant">) {
  return (
    <Tag variant="success" className={className}>
      {children}
    </Tag>
  );
}

export function DangerTag({ children, className }: Omit<Props, "variant">) {
  return (
    <Tag variant="danger" className={className}>
      {children}
    </Tag>
  );
}
