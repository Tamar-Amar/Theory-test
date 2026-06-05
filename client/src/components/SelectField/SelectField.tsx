import { useEffect, useId, useRef, useState } from "react";
import * as S from "./SelectField.styles";

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  id?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  /** טקסט כשאין ערך נבחר */
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** רכיב בחירה מותאם (מחליף את ה־select הנייטיב) עם שליטה מלאה בעיצוב */
export function SelectField({
  id,
  value,
  options,
  onChange,
  placeholder = "בחירה…",
  disabled = false,
  ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const reactId = useId();
  const listId = `${id ?? reactId}-listbox`;

  const selected = options.find((o) => o.value === value) ?? null;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === value);
      setActiveIndex(idx);
    }
  }, [open, options, value]);

  const commit = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) commit(opt.value);
    }
  };

  return (
    <S.Wrap ref={wrapRef}>
      <S.Trigger
        type="button"
        id={id}
        $open={open}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <S.Value>{selected ? selected.label : placeholder}</S.Value>
        <S.Chevron $open={open}>
          <ChevronIcon />
        </S.Chevron>
      </S.Trigger>

      {open && (
        <S.Popup role="listbox" id={listId} ref={listRef}>
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            return (
              <S.Option
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                $selected={isSelected}
                $active={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(opt.value)}
              >
                <span>{opt.label}</span>
                {isSelected ? <CheckIcon /> : null}
              </S.Option>
            );
          })}
        </S.Popup>
      )}
    </S.Wrap>
  );
}
