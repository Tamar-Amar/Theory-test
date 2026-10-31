import * as S from "./SmartModeInfo.styles";

export function SmartModeInfo() {
  return (
    <S.Box>
      <S.Head>
        <S.Dot aria-hidden />
        מצב חכם
      </S.Head>
      <S.Text>
        חלק מהשאלות נבחרות לפי טעויות בבחינות קודמות — תדירות, רצף שגיאות וזמן
        מהטעות האחרונה. השאר נבחרות באופן אקראי. שאלה שעניתם עליה נכון לא תופיע
        שוב.
      </S.Text>
    </S.Box>
  );
}
