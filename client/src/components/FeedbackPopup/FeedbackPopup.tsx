import { useCallback, useEffect, useId, useRef, useState } from "react";
import { dismissUxFeedback, submitUxFeedback } from "../../api";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FormField } from "../FormField/FormField";
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
    <svg viewBox="0 0 30 30" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M15 3.125L18.625 10.625L26.875 11.75L20.875 17.5L22.375 25.625L15 21.75L7.625 25.625L9.125 17.5L3.125 11.75L11.375 10.625L15 3.125Z"
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
  const labelId = useId();
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <S.RatingRow>
      <S.RatingLabel id={labelId}>{label}</S.RatingLabel>
      <S.Stars
        role="radiogroup"
        aria-labelledby={labelId}
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
    </S.RatingRow>
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

        <S.Badge aria-hidden>⭐</S.Badge>
        {thanks ? (
          <S.Thanks id={titleId}>תודה רבה! המשוב שלכם עוזר לנו.</S.Thanks>
        ) : (
          <>
            <S.Title id={titleId}>איך היה לכם? הדעה שלכם משנה</S.Title>
            <S.Intro>
              האתר חינמי לגמרי ונבנה בשבילכם. חצי דקה של דירוג עוזרת לנו להשתפר,
              ועוזרת לנבחנים אחרים להגיע אל התרגול הנכון. אפשר גם להוסיף כמה
              מילים.
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
            <S.FieldWrap>
              <FormField id="ux-feedback-comment" label="משוב חופשי (אופציונלי)">
                <S.TextArea
                  as="textarea"
                  $height={110}
                  id="ux-feedback-comment"
                  data-multiline="true"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={2000}
                  placeholder="מה עבד טוב? מה כדאי לשפר?"
                />
              </FormField>
            </S.FieldWrap>
            <S.Actions>
              <S.PrimaryBtn type="button" disabled={busy} onClick={submit}>
                {busy ? "שולח…" : "שליחת הדירוג"}
              </S.PrimaryBtn>
              <S.GhostBtn
                type="button"
                disabled={busy}
                onClick={() => void closeAndDismiss()}
              >
                לא עכשיו
              </S.GhostBtn>
            </S.Actions>
          </>
        )}
      </S.Modal>
    </S.Overlay>
  );
}
