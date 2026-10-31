import { useState } from "react";
import { submitSupportTicket } from "../../api";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FormField, FieldInput } from "../FormField/FormField";
import { PrimaryButton } from "../Button/Button";
import * as S from "./SupportTicketForm.styles";

type Props = {
  guest?: boolean;
  defaultEmail?: string;
};

export function SupportTicketForm({ guest = false, defaultEmail = "" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const submit = async () => {
    setErr(null);
    setOk(false);
    setBusy(true);
    try {
      await submitSupportTicket(body.trim(), {
        guestName: guest ? name.trim() : undefined,
        email: email.trim() || undefined,
      });
      setOk(true);
      setBody("");
      if (guest) {
        setName("");
        setEmail("");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
    }
  };

  return (
    <S.Card>
      <S.Title>פנייה למערכת</S.Title>
      {guest && (
        <S.Intro>אפשר לדבר איתנו גם בלי הרשמה או התחברות :)</S.Intro>
      )}
      {err && <ErrorAlert compact>{err}</ErrorAlert>}
      {ok && <S.Success>הפנייה נשלחה. תודה.</S.Success>}
      <S.Fields>
        {guest && (
          <FormField id="ticket-name" label="שם">
            <FieldInput
              id="ticket-name"
              placeholder="השם שלך"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={64}
            />
          </FormField>
        )}
        <FormField id="ticket-email" label="אימייל (אופציונלי- אם תרצו שנחזור אליכם)">
          <FieldInput
            id="ticket-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField id="ticket-body" label="איך נוכל לעזור?">
          <S.TextArea
            as="textarea"
            id="ticket-body"
            data-multiline="true"
            placeholder="איך נוכל לעזור?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={8000}
          />
        </FormField>
      </S.Fields>
      <S.Note>פנייתכם תישלח למנהל המערכת.</S.Note>
      <PrimaryButton type="button" disabled={busy} onClick={submit}>
        {busy ? "שולח…" : "שליחת פנייה"}
      </PrimaryButton>
    </S.Card>
  );
}
