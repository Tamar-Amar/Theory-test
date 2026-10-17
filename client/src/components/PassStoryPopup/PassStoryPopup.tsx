import { useCallback, useEffect, useId, useRef, useState } from "react";
import { submitSupportTicket } from "../../api";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FormField } from "../FormField/FormField";
import * as FF from "../FormField/FormField.styles";
import { PrimaryButton } from "../Button/Button";
import * as S from "./PassStoryPopup.styles";

type Props = {
  onClose: () => void;
};

const MIN_STORY = 10;

function MedalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M12 2.2a5.2 5.2 0 1 0 .1 10.4A5.2 5.2 0 0 0 12 2.2zm0 1.8a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8z"
      />
      <path
        fill="currentColor"
        d="M8.2 12.6 6.4 21l5.6-2.6L17.6 21l-1.8-8.4a6.3 6.3 0 0 1-7.6 0z"
      />
    </svg>
  );
}

export function PassStoryPopup({ onClose }: Props) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const [story, setStory] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [thanks, setThanks] = useState<"sent" | "later" | null>(null);

  const close = useCallback(() => {
    if (busy && !thanks) return;
    onClose();
  }, [busy, thanks, onClose]);

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
          'button:not([disabled]), textarea, [href], [tabindex]:not([tabindex="-1"])'
        )
      );
    node.querySelector<HTMLElement>("[data-pass-story]")?.focus() ??
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
  }, [thanks]);

  const submit = async () => {
    const text = story.trim();
    if (text.length < MIN_STORY) {
      setErr("ספרו עוד כמה מילים, לפחות משפט קצר");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await submitSupportTicket(`סיפור הצלחה — עברתי את מבחן התאוריה:\n${text}`);
      setThanks("sent");
      setBusy(false);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
      setBusy(false);
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
        <S.Close
          type="button"
          aria-label="סגירה"
          disabled={busy && !thanks}
          onClick={close}
        >
          ✕
        </S.Close>
        <S.Badge>
          <MedalIcon />
        </S.Badge>
        {thanks ? (
          <S.Thanks id={titleId} role="status">
            {thanks === "sent"
              ? "תודה שסיפרתם! כיף לשמוע שעברתם."
              : "בהצלחה במבחן!"}
          </S.Thanks>
        ) : (
          <>
            <S.Title id={titleId}>עברתם את מבחן התאוריה?</S.Title>
            <S.Intro>
              עזרנו לכם? ספרו לנו איך היה — נשמח לשמוע שעברתם בהצלחה.
            </S.Intro>
            {err && <ErrorAlert compact>{err}</ErrorAlert>}
            <S.FieldWrap>
              <FormField id="pass-story" label="הסיפור שלכם">
                <FF.Input
                  as="textarea"
                  id="pass-story"
                  data-multiline="true"
                  data-pass-story
                  rows={4}
                  maxLength={2000}
                  value={story}
                  placeholder="עברתי! התרגול על הטעויות עזר לי להגיע מוכנה..."
                  onChange={(e) => {
                    setStory(e.target.value);
                    if (err) setErr(null);
                  }}
                />
              </FormField>
            </S.FieldWrap>
            <PrimaryButton
              type="button"
              disabled={busy}
              onClick={() => void submit()}
            >
              {busy ? "שולחים…" : "ספרו לנו"}
            </PrimaryButton>
            <S.Skip
              type="button"
              disabled={busy}
              onClick={() => setThanks("later")}
            >
              עדיין לא עברתי
            </S.Skip>
            <S.Skip type="button" disabled={busy} onClick={close}>
              לא עכשיו
            </S.Skip>
          </>
        )}
        {thanks && (
          <S.Skip type="button" onClick={close}>
            סגירה
          </S.Skip>
        )}
      </S.Modal>
    </S.Overlay>
  );
}
