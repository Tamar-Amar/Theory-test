import { useState } from "react";
import { Link } from "react-router-dom";
import { submitSupportTicket } from "../../api";
import { Card } from "../Card/Card";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FormField, FieldInput } from "../FormField/FormField";
import * as FF from "../FormField/FormField.styles";
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
    <Card variant={guest ? "narrow" : undefined}>
      <S.Title>פנייה למערכת</S.Title>
      <S.Intro>
        {guest
          ? "אפשר לדבר איתנו גם בלי הרשמה או התחברות:)"
          : "פנייתכם תישלח למנהל המערכת."}
      </S.Intro>
      {err && <ErrorAlert compact>{err}</ErrorAlert>}
      {ok && <S.Success>הפנייה נשלחה. תודה.</S.Success>}
      <S.Fields>
        {guest && (
          <FormField id="ticket-name" label="שם">
            <FieldInput
              id="ticket-name"
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
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField id="ticket-body" label="איך נוכל לעזור?">
          <FF.Input
            as="textarea"
            id="ticket-body"
            data-multiline="true"
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={8000}
          />
        </FormField>
      </S.Fields>
      <PrimaryButton type="button" disabled={busy} onClick={submit}>
        {busy ? "שולח…" : "שליחת פנייה"}
      </PrimaryButton>
      {guest && (
        <S.BackRow>
          <Link to="/login">← חזרה להתחברות</Link>
        </S.BackRow>
      )}
    </Card>
  );
}
