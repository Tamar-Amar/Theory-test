import * as S from "./PracticeSectionTabs.styles";

export type PracticeSection = "practice" | "profile" | "learning";

function PersonIcon() {
  return (
    <S.TabIcon
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </S.TabIcon>
  );
}

function LearningIcon() {
  return (
    <S.TabIcon
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6.5 12 3l8 3.5-8 3.5z" />
      <path d="M4 10.5 12 14l8-3.5" />
      <path d="M7 13v4.2c0 .8 2.2 2.3 5 2.3s5-1.5 5-2.3V13" />
    </S.TabIcon>
  );
}

export function PracticeSectionTabs() {
  return (
    <S.TabsRail>
      <S.Tabs role="tablist" aria-label="אזור אפליקציה">
        <S.TabNav to="/profile" end role="tab">
          <S.TabInner>
            <PersonIcon />
            אזור אישי
          </S.TabInner>
        </S.TabNav>
        <S.TabNav to="/practice" end role="tab">
          תרגול
        </S.TabNav>
        <S.TabNav to="/learning" end role="tab">
          <S.TabInner>
            <LearningIcon />
            אזור למידה
          </S.TabInner>
        </S.TabNav>
      </S.Tabs>
    </S.TabsRail>
  );
}
