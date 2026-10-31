import { useCallback, useEffect, useId, useRef, useState } from "react";
import { submitSupportTicket } from "../../api";
import { PASS_STORY_PREFIX } from "../../constants/stories";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FormField } from "../FormField/FormField";
import * as S from "./PassStoryPopup.styles";

type Props = {
  onClose: () => void;
};

const MIN_STORY = 10;

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
      await submitSupportTicket(`${PASS_STORY_PREFIX}\n${text}`);
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
        <S.Badge aria-hidden>🎉</S.Badge>
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
                <S.TextArea
                  as="textarea"
                  $height={120}
                  id="pass-story"
                  data-multiline="true"
                  data-pass-story
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
            <S.Actions>
              <S.PrimaryBtn
                type="button"
                disabled={busy}
                onClick={() => void submit()}
              >
                {busy ? "שולחים…" : "ספרו לנו"}
              </S.PrimaryBtn>
              <S.GhostBtn
                type="button"
                disabled={busy}
                onClick={() => setThanks("later")}
              >
                עדיין לא עברתי
              </S.GhostBtn>
            </S.Actions>
          </>
        )}
        {thanks && (
          <S.Actions>
            <S.GhostBtn type="button" onClick={close}>
              סגירה
            </S.GhostBtn>
          </S.Actions>
        )}
      </S.Modal>
    </S.Overlay>
  );
}
