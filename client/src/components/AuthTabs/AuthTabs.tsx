import type { AuthMode } from "../../types/auth";
import * as S from "./AuthTabs.styles";

type Props = {
  mode: AuthMode;
  onMode: (m: AuthMode) => void;
};

export function AuthTabs({ mode, onMode }: Props) {
  return (
    <S.Tabs>
      <S.Tab
        type="button"
        $active={mode === "login"}
        onClick={() => onMode("login")}
      >
        התחברות
      </S.Tab>
      <S.Tab
        type="button"
        $active={mode === "register"}
        onClick={() => onMode("register")}
      >
        הרשמה
      </S.Tab>
    </S.Tabs>
  );
}
