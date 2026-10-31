import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import * as S from "./SiteHeader.styles";

type Props = {
  /** קיים רק כשהמשתמש מחובר — מציג התנתקות */
  onLogout?: () => void;
  /** מסך מנהל — הלוגו חוזר ללוח הבקרה והניווט מצטמצם */
  admin?: boolean;
};

type Role = "guest" | "user" | "admin";

type NavDef = { to: string; label: string; guestToLogin: boolean };

/** הסדר כאן הוא מימין לשמאל (RTL) — כמו ב‑Header/Desktop */
function navFor(role: Role): NavDef[] {
  if (role === "admin") {
    return [{ to: "/contact", label: "צור קשר", guestToLogin: false }];
  }
  return [
    { to: "/practice", label: "תרגול", guestToLogin: true },
    { to: "/learning", label: "לימוד לפי נושא", guestToLogin: true },
    { to: "/profile", label: "הסטטיסטיקה שלי", guestToLogin: true },
    { to: "/contact", label: "צור קשר", guestToLogin: false },
  ];
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden focusable="false">
      <path
        d="M4 8H24M4 14H24M8 20H24"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** כותרת עליונה קבועה (Header/Desktop + Header/Mobile ב‑Figma) */
export function SiteHeader({ onLogout, admin = false }: Props) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = Boolean(onLogout);
  const role: Role = admin ? "admin" : loggedIn ? "user" : "guest";
  const homeTo = admin ? "/admin" : loggedIn ? "/profile" : "/";
  const links = navFor(role);

  // הכפתור המשני: אורח → התחברות (ובדף ההתחברות עצמו → צור קשר), מחובר → האזור האישי
  const cta =
    role === "user"
      ? { to: "/profile", label: "האזור האישי" }
      : role === "guest"
        ? pathname === "/login"
          ? { to: "/contact", label: "צור קשר" }
          : { to: "/login", label: "התחברות" }
        : null;

  // התפריט הנפתח נסגר בניווט ובמקש Escape
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const renderNav = (mobile: boolean) =>
    links.map((l) => {
      const plain = role === "guest" && l.guestToLogin;
      const to = plain ? "/login" : l.to;
      if (plain) {
        const Plain = mobile ? S.MobileNavPlain : S.NavPlain;
        return (
          <Plain key={l.label} to={to}>
            {l.label}
          </Plain>
        );
      }
      const Item = mobile ? S.MobileNavItem : S.NavItem;
      return (
        <Item key={l.label} to={to}>
          {l.label}
        </Item>
      );
    });

  return (
    <S.Bar>
      <S.Inner>
        <S.Brand to={homeTo} aria-label="תאוריה — דף הבית">
          <Logo size={34} />
        </S.Brand>

        <S.Nav aria-label="ניווט ראשי">{renderNav(false)}</S.Nav>

        <S.Actions>
          {role === "user" && onLogout ? (
            <S.LogoutButton type="button" onClick={onLogout}>
              התנתקות
            </S.LogoutButton>
          ) : null}
          {cta ? <S.Cta to={cta.to}>{cta.label}</S.Cta> : null}
          {role === "admin" && onLogout ? (
            <S.CtaButton type="button" onClick={onLogout}>
              התנתקות
            </S.CtaButton>
          ) : null}
        </S.Actions>

        <S.MenuButton
          type="button"
          aria-label={menuOpen ? "סגירת התפריט" : "פתיחת התפריט"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <MenuIcon />
        </S.MenuButton>
      </S.Inner>

      {menuOpen ? (
        <S.MobilePanel id="mobile-menu">
          <nav aria-label="תפריט נייד" style={{ display: "contents" }}>
            {renderNav(true)}
          </nav>
          {cta ? <S.MobileCta to={cta.to}>{cta.label}</S.MobileCta> : null}
          {role === "admin" && onLogout ? (
            <S.MobileCtaButton type="button" onClick={onLogout}>
              התנתקות
            </S.MobileCtaButton>
          ) : null}
          {role === "user" && onLogout ? (
            <S.MobileLogout type="button" onClick={onLogout}>
              התנתקות
            </S.MobileLogout>
          ) : null}
        </S.MobilePanel>
      ) : null}
    </S.Bar>
  );
}
