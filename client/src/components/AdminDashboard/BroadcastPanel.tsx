import { useEffect, useState } from "react";
import {
  fetchAdminBroadcastStatus,
  startAdminBroadcast,
  type BroadcastStatus,
} from "../../api";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FieldInput, FormField } from "../FormField/FormField";
import * as S from "./AdminDashboard.styles";

const POLL_MS = 1500;
const MAX_SUBJECT = 200;
const MAX_BODY = 10_000;

/**
 * שליחת הודעת מייל אחת לכל המשתמשים הרשומים. השרת שולח ברקע, והלוח מציג
 * התקדמות. לפני השליחה נדרש אישור מפורש — לא ניתן לבטל שליחה שהתחילה.
 */
export function BroadcastPanel({ recipientCount }: { recipientCount: number }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<BroadcastStatus | null>(null);
  /** האם להציג את מצב/תוצאת השליחה (רק אם התחלנו אותה כאן או שהיא רצה כעת) */
  const [watching, setWatching] = useState(false);
  const [starting, setStarting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const running = status?.running === true;

  // בכניסה לטאב: אם כבר רצה שליחה (למשל אחרי רענון) — ממשיכים לעקוב אחריה
  useEffect(() => {
    let cancelled = false;
    fetchAdminBroadcastStatus()
      .then((s) => {
        if (cancelled) return;
        setStatus(s);
        if (s.running) setWatching(true);
      })
      .catch(() => {
        /* אין מידע על שליחה — הטופס פשוט פנוי */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // בזמן שליחה: בדיקת התקדמות קבועה
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      fetchAdminBroadcastStatus()
        .then(setStatus)
        .catch(() => {
          /* נשארים עם המצב האחרון ומנסים שוב */
        });
    }, POLL_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const submit = async () => {
    setErr(null);
    const s = subject.trim();
    const b = body.trim();
    if (!s || !b) {
      setErr("יש למלא נושא ותוכן להודעה");
      return;
    }
    const ok = window.confirm(
      `לשלוח את ההודעה "${s}" לכ-${recipientCount} משתמשים?\n\nלא ניתן לבטל או לעצור שליחה אחרי שהתחילה.`
    );
    if (!ok) return;

    setStarting(true);
    try {
      await startAdminBroadcast(s, b);
      setWatching(true);
      setStatus(await fetchAdminBroadcastStatus());
      setSubject("");
      setBody("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "השליחה נכשלה");
    } finally {
      setStarting(false);
    }
  };

  const pct =
    status && status.total > 0
      ? Math.round(((status.sent + status.failed) / status.total) * 100)
      : 0;
  const finished = watching && status && !status.running && status.finishedAt;
  const busy = running || starting;

  return (
    <S.Panel>
      <S.PanelTitle>שליחת מייל לכל המשתמשים</S.PanelTitle>
      <S.PanelText>
        ההודעה תישלח לכל המשתמשים הרשומים שיש להם כתובת אימייל (כ-
        {recipientCount} נמענים). כל משתמש מקבל מייל נפרד, בלי לחשוף את כתובות
        האחרים.
      </S.PanelText>

      {err ? <ErrorAlert>{err}</ErrorAlert> : null}

      <FormField id="broadcast-subject" label="נושא">
        <FieldInput
          id="broadcast-subject"
          value={subject}
          disabled={busy}
          maxLength={MAX_SUBJECT}
          onChange={(e) => setSubject(e.target.value)}
        />
      </FormField>

      <FormField id="broadcast-body" label="תוכן ההודעה">
        <FieldInput
          as="textarea"
          id="broadcast-body"
          data-multiline="true"
          rows={8}
          value={body}
          disabled={busy}
          maxLength={MAX_BODY}
          onChange={(e) => setBody(e.target.value)}
        />
      </FormField>

      <S.SendRow>
        <S.SendButton
          type="button"
          disabled={busy || !subject.trim() || !body.trim()}
          onClick={() => void submit()}
        >
          {busy ? "שולח…" : "שליחה לכל המשתמשים"}
        </S.SendButton>
      </S.SendRow>

      {running && status ? (
        <>
          <S.ProgressTrack
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="התקדמות השליחה"
          >
            <S.ProgressFill $pct={pct} />
          </S.ProgressTrack>
          <S.PanelText aria-live="polite">
            נשלחו {status.sent} מתוך {status.total}
            {status.failed > 0 ? ` · נכשלו ${status.failed}` : ""}
          </S.PanelText>
        </>
      ) : null}

      {finished && status ? (
        status.delivery === "logged" ? (
          <S.Notice $kind="warn" role="status">
            שירות המייל (SMTP) אינו מוגדר בשרת, ולכן ההודעה נרשמה ביומן השרת
            בלבד ולא נשלחה בפועל.
          </S.Notice>
        ) : status.failed > 0 ? (
          <S.Notice $kind="warn" role="status">
            ההודעה נשלחה ל-{status.sent} מתוך {status.total} משתמשים;{" "}
            {status.failed} נכשלו (פרטים ביומן השרת).
          </S.Notice>
        ) : (
          <S.Notice $kind="success" role="status">
            ההודעה נשלחה בהצלחה ל-{status.sent} משתמשים.
          </S.Notice>
        )
      ) : null}
    </S.Panel>
  );
}
