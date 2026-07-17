import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api";
import { PrimaryButton } from "../Button/Button";
import { Card } from "../Card/Card";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FieldPasswordInput, FormField } from "../FormField/FormField";
import * as S from "../AuthPanel/AuthPanel.styles";

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token")?.trim() || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async () => {
    setErr(null);
    if (!token) {
      setErr("חסר קישור איפוס תקין. בקשו קישור חדש מעמוד ההתחברות");
      return;
    }
    if (password !== confirm) {
      setErr("הסיסמאות אינן תואמות");
      return;
    }
    setBusy(true);
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <Card variant="narrow">
        <ErrorAlert compact>
          קישור האיפוס חסר או לא תקין. בקשו קישור חדש מעמוד ההתחברות.
        </ErrorAlert>
        <S.ForgotBackLink to="/login">חזרה להתחברות</S.ForgotBackLink>
      </Card>
    );
  }

  if (done) {
    return (
      <Card variant="narrow">
        <S.ForgotSuccess>
          הסיסמה עודכנה בהצלחה. אפשר להתחבר עם הסיסמה החדשה.
        </S.ForgotSuccess>
        <S.ForgotPrimaryLink to="/login">להתחברות</S.ForgotPrimaryLink>
      </Card>
    );
  }

  return (
    <Card variant="narrow">
      <S.ForgotTitle>בחירת סיסמה חדשה</S.ForgotTitle>
      <S.ForgotHint>בחרו סיסמה חדשה (לפחות 8 תווים).</S.ForgotHint>
      {err && <ErrorAlert compact>{err}</ErrorAlert>}
      <S.FieldsBlock>
        <FormField id="reset-pass" label="סיסמה חדשה">
          <FieldPasswordInput
            id="reset-pass"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <FormField id="reset-pass2" label="אימות סיסמה">
          <FieldPasswordInput
            id="reset-pass2"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </FormField>
      </S.FieldsBlock>
      <PrimaryButton type="button" disabled={busy} onClick={submit}>
        {busy ? "ממתין…" : "עדכון סיסמה"}
      </PrimaryButton>
      <S.ForgotBackLink to="/login">חזרה להתחברות</S.ForgotBackLink>
    </Card>
  );
}
