import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  applyA11yToDocument,
  DEFAULT_A11Y,
  hasActiveA11y,
  loadA11ySettings,
  nextFontScale,
  saveA11ySettings,
  type A11ySettings,
} from "./a11ySettings";
import * as S from "./AccessibilityWidget.styles";

function AccessibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <circle cx="12" cy="4.5" r="2.25" fill="currentColor" />
      <path
        d="M4.5 9.25h15M12 9.25v5.5M8.25 20.5 12 14.75l3.75 5.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(() => loadA11ySettings());
  const panelId = useId();
  const titleId = useId();
  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyA11yToDocument(settings);
    saveA11ySettings(settings);
  }, [settings]);

  const close = useCallback(() => {
    setOpen(false);
    fabRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelector<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }, [open]);

  const update = (patch: Partial<A11ySettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  };

  const toggle = (key: keyof Omit<A11ySettings, "fontScale">) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const active = hasActiveA11y(settings);

  return (
    <>
      {open && (
        <S.Backdrop
          type="button"
          aria-label="סגירת תפריט נגישות"
          onClick={close}
        />
      )}
      <S.Root>
        {open && (
          <S.Panel
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <S.PanelHeader>
              <S.PanelTitle id={titleId}>ממשק נגישות</S.PanelTitle>
              <S.CloseBtn type="button" aria-label="סגירה" onClick={close}>
                ×
              </S.CloseBtn>
            </S.PanelHeader>

            <S.Section>
              <S.SectionLabel id={`${panelId}-font`}>גודל טקסט</S.SectionLabel>
              <S.FontControls role="group" aria-labelledby={`${panelId}-font`}>
                <S.FontBtn
                  type="button"
                  aria-label="הקטנת טקסט"
                  disabled={settings.fontScale <= 100}
                  onClick={() =>
                    update({ fontScale: nextFontScale(settings.fontScale, -1) })
                  }
                >
                  א−
                </S.FontBtn>
                <S.FontValue aria-live="polite">{settings.fontScale}%</S.FontValue>
                <S.FontBtn
                  type="button"
                  aria-label="הגדלת טקסט"
                  disabled={settings.fontScale >= 150}
                  onClick={() =>
                    update({ fontScale: nextFontScale(settings.fontScale, 1) })
                  }
                >
                  א+
                </S.FontBtn>
              </S.FontControls>
            </S.Section>

            <S.Section>
              <S.SectionLabel>התאמות תצוגה</S.SectionLabel>
              <S.Toggle
                type="button"
                $on={settings.highContrast}
                aria-pressed={settings.highContrast}
                onClick={() => toggle("highContrast")}
              >
                ניגודיות גבוהה
                <S.ToggleState $on={settings.highContrast}>
                  {settings.highContrast ? "פעיל" : "כבוי"}
                </S.ToggleState>
              </S.Toggle>
              <S.Toggle
                type="button"
                $on={settings.highlightLinks}
                aria-pressed={settings.highlightLinks}
                onClick={() => toggle("highlightLinks")}
              >
                הדגשת קישורים
                <S.ToggleState $on={settings.highlightLinks}>
                  {settings.highlightLinks ? "פעיל" : "כבוי"}
                </S.ToggleState>
              </S.Toggle>
              <S.Toggle
                type="button"
                $on={settings.readableFont}
                aria-pressed={settings.readableFont}
                onClick={() => toggle("readableFont")}
              >
                גופן קריא יותר
                <S.ToggleState $on={settings.readableFont}>
                  {settings.readableFont ? "פעיל" : "כבוי"}
                </S.ToggleState>
              </S.Toggle>
              <S.Toggle
                type="button"
                $on={settings.underlineHeadings}
                aria-pressed={settings.underlineHeadings}
                onClick={() => toggle("underlineHeadings")}
              >
                קו תחתון לכותרות
                <S.ToggleState $on={settings.underlineHeadings}>
                  {settings.underlineHeadings ? "פעיל" : "כבוי"}
                </S.ToggleState>
              </S.Toggle>
              <S.Toggle
                type="button"
                $on={settings.reduceMotion}
                aria-pressed={settings.reduceMotion}
                onClick={() => toggle("reduceMotion")}
              >
                הפחתת אנימציות
                <S.ToggleState $on={settings.reduceMotion}>
                  {settings.reduceMotion ? "פעיל" : "כבוי"}
                </S.ToggleState>
              </S.Toggle>
            </S.Section>

            <S.Actions>
              <S.ResetBtn
                type="button"
                disabled={!active}
                onClick={() => setSettings({ ...DEFAULT_A11Y })}
              >
                איפוס הגדרות
              </S.ResetBtn>
              <S.StatementLink to="/accessibility" onClick={close}>
                להצהרת הנגישות
              </S.StatementLink>
            </S.Actions>
          </S.Panel>
        )}

        <S.Fab
          ref={fabRef}
          type="button"
          $active={open || active}
          aria-expanded={open}
          aria-controls={panelId}
          aria-haspopup="dialog"
          aria-label={open ? "סגירת ממשק נגישות" : "פתיחת ממשק נגישות"}
          onClick={() => setOpen((v) => !v)}
        >
          <S.FabIcon>
            <AccessibilityIcon />
          </S.FabIcon>
          נגישות
        </S.Fab>
      </S.Root>
    </>
  );
}
