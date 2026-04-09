import * as S from "./PracticeSectionTabs.styles";

export type PracticeSection = "practice" | "profile";

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
      </S.Tabs>
    </S.TabsRail>
  );
}
