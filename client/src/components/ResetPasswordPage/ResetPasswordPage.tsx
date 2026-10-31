import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { PrimaryButton } from "../Button/Button";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FieldPasswordInput, FormField } from "../FormField/FormField";
import { Logo } from "../Logo/Logo";
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
      <AuthLayout>
        <S.Panel>
          <S.Header>
            <Logo size={40} />
            <S.Heading>בחירת סיסמה חדשה</S.Heading>
          </S.Header>
          <ErrorAlert compact>
            קישור האיפוס חסר או לא תקין. בקשו קישור חדש מעמוד ההתחברות.
          </ErrorAlert>
          <S.BackLink to="/login">→ חזרה להתחברות</S.BackLink>
        </S.Panel>
      </AuthLayout>
    );
  }

  if (done) {
    return (
      <AuthLayout>
        <S.Panel>
          <S.Header>
            <Logo size={40} />
            <S.Heading>בחירת סיסמה חדשה</S.Heading>
          </S.Header>
          <S.ForgotSuccess>
            הסיסמה עודכנה בהצלחה. אפשר להתחבר עם הסיסמה החדשה.
          </S.ForgotSuccess>
          <S.PrimaryLink to="/login">להתחברות</S.PrimaryLink>
        </S.Panel>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <S.Panel>
        <S.Header>
          <Logo size={40} />
          <S.Heading>בחירת סיסמה חדשה</S.Heading>
          <S.Subtitle>בחרו סיסמה חדשה (לפחות 8 תווים).</S.Subtitle>
        </S.Header>

        {err && <ErrorAlert compact>{err}</ErrorAlert>}

        <S.FieldsBlock>
          <FormField id="reset-pass" label="סיסמה חדשה">
            <FieldPasswordInput
              id="reset-pass"
              placeholder="••••••••"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          <FormField id="reset-pass2" label="אימות סיסמה">
            <FieldPasswordInput
              id="reset-pass2"
              placeholder="••••••••"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </FormField>
        </S.FieldsBlock>

        <PrimaryButton type="button" disabled={busy} onClick={submit}>
          {busy ? "ממתין…" : "עדכון סיסמה"}
        </PrimaryButton>

        <S.BackLink to="/login">→ חזרה להתחברות</S.BackLink>
      </S.Panel>
    </AuthLayout>
  );
}
