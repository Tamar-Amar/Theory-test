import { useCallback, useEffect, useId, useRef, useState } from "react";
import { dismissUxFeedback, submitUxFeedback } from "../../api";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FormField } from "../FormField/FormField";
import * as FF from "../FormField/FormField.styles";
import { PrimaryButton } from "../Button/Button";
import * as S from "./FeedbackPopup.styles";

type Props = {
  onDone: () => void;
};

const STAR_LABELS = [
  "כוכב אחד",
  "שני כוכבים",
  "שלושה כוכבים",
  "ארבעה כוכבים",
  "חמישה כוכבים",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M12 2.6 14.7 8.3l6.3.9-4.5 4.4 1.1 6.2L12 16.9 6.4 19.8l1.1-6.2-4.5-4.4 6.3-.9L12 2.6z"
      />
    </svg>
  );
}

function StarRating({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <S.RatingBlock>
      <S.RatingLegend>{label}</S.RatingLegend>
      <S.Stars
        role="radiogroup"
        aria-label={label}
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <S.StarButton
            key={n}
            type="button"
            role="radio"
            aria-label={STAR_LABELS[n - 1]}
            aria-checked={value === n}
            $filled={shown >= n}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
          >
            <StarIcon />
          </S.StarButton>
        ))}
      </S.Stars>
    </S.RatingBlock>
  );
}

export function FeedbackPopup({ onDone }: Props) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const [appearance, setAppearance] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [thanks, setThanks] = useState(false);

  const finish = () => {
    setThanks(true);
    window.setTimeout(onDone, 900);
  };

  const closeAndDismiss = useCallback(async () => {
    if (busy || thanks) return;
    setBusy(true);
    setErr(null);
    try {
      await dismissUxFeedback();
      onDone();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
      setBusy(false);
    }
  }, [busy, thanks, onDone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        void closeAndDismiss();
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
  }, [closeAndDismiss]);

  useEffect(() => {
    const node = modalRef.current;
    if (!node) return;
    const getFocusable = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'button:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
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
    setErr(null);
    if (appearance < 1 || efficiency < 1) {
      setErr("נא לדרג נראות ויעילות בכוכבים");
      return;
    }
    setBusy(true);
    try {
      await submitUxFeedback({
        appearanceRating: appearance,
        efficiencyRating: efficiency,
        comment: comment.trim(),
      });
      finish();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
      setBusy(false);
    }
  };

  return (
    <S.Overlay role="presentation">
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
          disabled={busy || thanks}
          onClick={() => void closeAndDismiss()}
        >
          ✕
        </S.Close>

        {thanks ? (
          <S.Thanks id={titleId}>תודה על המשוב!</S.Thanks>
        ) : (
          <>
            <S.Title id={titleId}>נשמח למשוב</S.Title>
            <S.Intro>
              עזרו לנו לשפר את האתר — דירוג קצר על הנראות והיעילות, ואפשר גם
              לכתוב כמה מילים.
            </S.Intro>
            {err && <ErrorAlert compact>{err}</ErrorAlert>}
            <StarRating
              label="נראות"
              value={appearance}
              onChange={setAppearance}
            />
            <StarRating
              label="יעילות"
              value={efficiency}
              onChange={setEfficiency}
            />
            <S.CommentWrap>
              <FormField id="ux-feedback-comment" label="משוב חופשי (אופציונלי)">
                <FF.Input
                  as="textarea"
                  id="ux-feedback-comment"
                  data-multiline="true"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={2000}
                  placeholder="מה עבד טוב? מה כדאי לשפר?"
                />
              </FormField>
            </S.CommentWrap>
            <S.Actions>
              <PrimaryButton type="button" disabled={busy} onClick={submit}>
                {busy ? "שולח…" : "שליחת משוב"}
              </PrimaryButton>
              <S.Skip
                type="button"
                disabled={busy}
                onClick={() => void closeAndDismiss()}
              >
                לא עכשיו
              </S.Skip>
            </S.Actions>
          </>
        )}
      </S.Modal>
    </S.Overlay>
  );
}
