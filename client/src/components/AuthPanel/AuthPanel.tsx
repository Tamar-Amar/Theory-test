import { useState } from "react";
import {
  login,
  register,
  setStoredToken,
  type AuthUser,
} from "../../api";
import type { AuthMode } from "../../types/auth";
import { AuthTabs } from "../AuthTabs/AuthTabs";
import { Card } from "../Card/Card";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import {
  FieldInput,
  FieldPasswordInput,
  FormField,
} from "../FormField/FormField";
import { PrimaryButton } from "../Button/Button";
import * as S from "./AuthPanel.styles";

type Props = {
  mode: AuthMode;
  onMode: (m: AuthMode) => void;
  onLoggedIn: (u: AuthUser) => void;
};

export function AuthPanel({ mode, onMode, onLoggedIn }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    setErr(null);
    if (mode === "register" && !agreed) {
      setErr("יש לאשר את תנאי השימוש ומדיניות הפרטיות");
      return;
    }
    setBusy(true);
    try {
      if (mode === "register") {
        if (password !== confirm) {
          setErr("הסיסמאות אינן תואמות");
          return;
        }
        const r = await register(username.trim(), email.trim(), password);
        setStoredToken(r.token);
        onLoggedIn(r.user);
      } else {
        const r = await login(username.trim(), password);
        setStoredToken(r.token);
        onLoggedIn(r.user);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card variant="narrow">
      <AuthTabs mode={mode} onMode={onMode} />
      {err && <ErrorAlert compact>{err}</ErrorAlert>}
      <S.FieldsBlock>
        <FormField id="auth-user" label="שם משתמש">
          <FieldInput
            id="auth-user"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
        {mode === "register" && (
          <FormField id="auth-email" label="אימייל">
            <FieldInput
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
        )}
        <FormField id="auth-pass" label="סיסמה">
          <FieldPasswordInput
            id="auth-pass"
            autoComplete={
              mode === "register" ? "new-password" : "current-password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        {mode === "register" && (
          <FormField id="auth-pass2" label="אימות סיסמה">
            <FieldPasswordInput
              id="auth-pass2"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </FormField>
        )}
      </S.FieldsBlock>
      {mode === "register" && (
        <S.ConsentRow>
          <S.ConsentCheckbox
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            קראתי ואני מסכים/ה ל
            <S.ConsentLink to="/terms" target="_blank">
              תנאי השימוש
            </S.ConsentLink>{" "}
            ול
            <S.ConsentLink to="/privacy" target="_blank">
              מדיניות הפרטיות
            </S.ConsentLink>
          </span>
        </S.ConsentRow>
      )}
      <PrimaryButton
        type="button"
        disabled={busy || (mode === "register" && !agreed)}
        onClick={submit}
      >
        {busy ? "ממתין…" : mode === "login" ? "כניסה" : "הרשמה"}
      </PrimaryButton>
    </Card>
  );
}
