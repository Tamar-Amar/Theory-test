import { useState } from "react";
import { submitSupportTicket } from "../../api";
import { Card } from "../Card/Card";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FormField } from "../FormField/FormField";
import * as FF from "../FormField/FormField.styles";
import { PrimaryButton } from "../Button/Button";
import * as S from "./SupportTicketForm.styles";

export function SupportTicketForm() {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const submit = async () => {
    setErr(null);
    setOk(false);
    setBusy(true);
    try {
      await submitSupportTicket(body.trim());
      setOk(true);
      setBody("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <S.Title>פנייה למערכת</S.Title>
      <S.Intro>פנייתכם תישלח למנהל המערכת.</S.Intro>
      {err && <ErrorAlert compact>{err}</ErrorAlert>}
      {ok && <S.Success>הפנייה נשלחה. תודה.</S.Success>}
      <S.Fields>
        <FormField id="ticket-body" label="תוכן הפנייה">
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
    </Card>
  );
}
