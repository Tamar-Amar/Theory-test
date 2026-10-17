import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PrimaryButton } from "../Button/Button";
import * as S from "./ShareInvitePopup.styles";

type Props = {
  onClose: () => void;
};

const PUBLIC_SITE_URL = "https://theory-test.vercel.app";

function shareUrl(): string {
  const origin = window.location.origin;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    return PUBLIC_SITE_URL;
  }
  return origin;
}

function shareMessage(): string {
  return `היי, אני מתרגל/ת למבחן התאוריה כאן — חינם, וממוקד בטעויות. שווה לנסות:\n${shareUrl()}`;
}

function copyWithField(text: string) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "0";
  field.style.insetInlineStart = "0";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.focus();
  field.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(field);
  if (!ok) throw new Error("copy failed");
}

async function copyToClipboard(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    /* ננסה העתקה ישירה */
  }
  copyWithField(text);
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M18 16.1a2.9 2.9 0 0 0-2.2 1l-6.1-3.5a2.8 2.8 0 0 0 0-1.2l6.1-3.5a2.9 2.9 0 1 0-.8-1.4L8.7 11a2.9 2.9 0 1 0 0 2l6.3 3.5a2.9 2.9 0 1 0 3-1.4z"
      />
    </svg>
  );
}

export function ShareInvitePopup({ onClose }: Props) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [copyErr, setCopyErr] = useState(false);
  const message = shareMessage();

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const prevFocused = document.activeElement as HTMLElement | null;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocused?.focus?.();
    };
  }, [close]);

  useEffect(() => {
    const node = modalRef.current;
    if (!node) return;
    const getFocusable = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
      );
    node.querySelector<HTMLElement>("[data-share-copy]")?.focus() ??
      getFocusable()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, []);

  const copy = async () => {
    setCopyErr(false);
    try {
      await copyToClipboard(message);
      setCopied(true);
    } catch {
      setCopied(false);
      setCopyErr(true);
    }
  };

  return (
    <S.Overlay role="presentation" onClick={close}>
      <S.Modal
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <S.Close type="button" aria-label="סגירה" onClick={close}>
          ✕
        </S.Close>
        <S.Badge>
          <ShareIcon />
        </S.Badge>
        <S.Title id={titleId}>ממליצים לחברים?</S.Title>
        <S.Intro>לחצו להעתיק את הלינק ושלחו לחברים שגם מתכוננים לתאוריה.</S.Intro>
        <S.LinkChip>{message}</S.LinkChip>
        <PrimaryButton type="button" data-share-copy onClick={() => void copy()}>
          {copied ? "ההודעה הועתקה" : "העתיקו את ההודעה"}
        </PrimaryButton>
        {copied && (
          <S.CopiedNote role="status">עכשיו שלחו אותה לחברים.</S.CopiedNote>
        )}
        {copyErr && (
          <S.CopyError role="alert">
            לא הצלחנו להעתיק. סמנו את ההודעה והעתיקו אותה ידנית.
          </S.CopyError>
        )}
        <S.Skip type="button" onClick={close}>
          לא עכשיו
        </S.Skip>
      </S.Modal>
    </S.Overlay>
  );
}
