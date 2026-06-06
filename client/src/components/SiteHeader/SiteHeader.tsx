import * as S from "./SiteHeader.styles";

function Logo() {
  return (
    <svg viewBox="0 0 32 32" role="img" aria-hidden focusable="false">
      <rect width="32" height="32" rx="8" fill="#2563eb" />
      <path
        fill="#ffffff"
        d="M9 9.5h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1zm1 2v9h12v-9H10zm2 2h8v1.5h-8V13.5zm0 3h6v1.5h-6V16.5z"
      />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

type Props = {
  wide?: boolean;
  /** הצגת אייקון התחברות (לאורחים) */
  showLogin?: boolean;
  /** תפריט אזור אישי / תרגול / למידה — למשתמש מחובר */
  showAppNav?: boolean;
  /** קיים רק כשהמשתמש מחובר — מציג התנתקות במקום התחברות */
  onLogout?: () => void;
};

function AppNav() {
  return (
    <S.Nav role="tablist" aria-label="אזור אפליקציה">
      <S.HeaderNavLink to="/profile" end role="tab">
        אזור אישי
      </S.HeaderNavLink>
      <S.HeaderNavLink to="/learning" end role="tab">
        אזור למידה
      </S.HeaderNavLink>
      <S.HeaderNavLink to="/practice" role="tab">
        תרגול
      </S.HeaderNavLink>
    </S.Nav>
  );
}

/** כותרת עליונה קבועה — לוגו לדף הבית, פנייה למערכת, והתחברות/התנתקות */
export function SiteHeader({
  wide = false,
  showLogin = false,
  showAppNav = false,
  onLogout,
}: Props) {
  const loggedIn = Boolean(onLogout);

  return (
    <S.Bar>
      <S.Inner $wide={wide}>
        <S.Brand to={loggedIn ? "/profile" : "/"} aria-label="תרגול תאוריה — דף הבית">
          <S.LogoMark>
            <Logo />
          </S.LogoMark>
          <S.BrandName>תרגול תאוריה</S.BrandName>
        </S.Brand>

        {showAppNav && <AppNav />}

        <S.Actions>
          <S.IconLink
            to="/contact"
            aria-label="פנייה למערכת"
            title="פנייה למערכת"
          >
            <MailIcon />
          </S.IconLink>

          {loggedIn ? (
            <S.AuthButton type="button" onClick={onLogout} aria-label="התנתקות">
              <LogoutIcon />
              <S.AuthButtonLabel>התנתקות</S.AuthButtonLabel>
            </S.AuthButton>
          ) : showLogin ? (
            <S.LoginLink to="/login">
              <LoginIcon />
              התחברות
            </S.LoginLink>
          ) : null}
        </S.Actions>
      </S.Inner>
    </S.Bar>
  );
}
