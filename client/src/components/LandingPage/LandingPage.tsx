import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DemoQuiz } from "./DemoQuiz";
import { DEMO_QUESTIONS } from "./demoQuestions";
import * as S from "./LandingPage.styles";

const FAQ: { q: string; a: string }[] = [
  {
    q: "כמה שאלות יש במבחן התאוריה האמיתי?",
    a: "מבחן התאוריה כולל 30 שאלות אמריקאיות, וכדי לעבור צריך לענות נכון על לפחות 26 מהן (90%). התרגול כאן בנוי באותו פורמט כדי להרגיל אתכם לבחינה.",
  },
  {
    q: "האם התרגול חינמי?",
    a: "כן. אפשר לתרגל כאן בלי לשלם. מבחן הניסיון בעמוד זה פתוח לכולם ללא הרשמה, וההרשמה החינמית מוסיפה שמירת התקדמות ושאלות שממוקדות בטעויות שלכם.",
  },
  {
    q: "מה זה תרגול ממוקד טעויות?",
    a: "המערכת זוכרת על אילו שאלות טעיתם, כמה פעמים, ומתי, ומחזירה אותן אליכם בתדירות גבוהה יותר עד שתשלטו בהן - כך אתם לא מבזבזים זמן על מה שכבר ידוע לכם.",
  },
  {
    q: "האם צריך להוריד אפליקציה?",
    a: "לא. הכול עובד ישירות בדפדפן, גם בנייד וגם במחשב, בלי התקנה.",
  },
];

export function LandingPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    document.title =
      "תרגול מבחני תאוריה - מבחן מדומה חינם וממוקד טעויות";
  }, []);

  return (
    <>
      <S.Hero>
        <S.Title>תרגול מבחני תאוריה - חינם וממוקד טעויות</S.Title>
        <S.Lead>
          מבחני תאוריה מדומים בפורמט הבחינה האמיתית, שאלות לפי נושאים, ומערכת חכמה
          שמזהה את הטעויות שלכם ומחזירה אותן עד שתשלטו בחומר. התחילו לתרגל עכשיו -
          בלי הרשמה.
        </S.Lead>
        <S.CtaRow>
          <S.CtaPrimary to="/login" $pulse>
            הרשמה חינם לגישה מלאה ושמירת התקדמות
          </S.CtaPrimary>
          <S.CtaGhost href="#demo">נסו מבחן ניסיון</S.CtaGhost>
        </S.CtaRow>
        <S.SocialLine>
          הצטרפו ל<S.SocialEmphasis>מאות לומדים</S.SocialEmphasis> שכבר תרגלו כאן{" "}
          <S.SocialEmphasis>אלפי מבחנים</S.SocialEmphasis>
        </S.SocialLine>
      </S.Hero>

      <S.Section>
        <S.SectionTitle>למה לתרגל כאן?</S.SectionTitle>
        <S.Features>
          <S.Feature>
            <S.FeatureIcon aria-hidden>🎯</S.FeatureIcon>
            <S.FeatureTitle>מיקוד על הטעויות שלכם</S.FeatureTitle>
            <S.FeatureText>
              לא עוד שאלות אקראיות בלבד - המערכת מחזירה את השאלות שטעיתם בהן עד
              שתדעו אותן בביטחון.
            </S.FeatureText>
          </S.Feature>
          <S.Feature>
            <S.FeatureIcon aria-hidden>📊</S.FeatureIcon>
            <S.FeatureTitle>מעקב התקדמות אישי</S.FeatureTitle>
            <S.FeatureText>
              רואים בכל רגע את אחוז ההצלחה, זמן ממוצע לשאלה, והנושאים שדורשים
              חיזוק.
            </S.FeatureText>
          </S.Feature>
          <S.Feature>
            <S.FeatureIcon aria-hidden>📚</S.FeatureIcon>
            <S.FeatureTitle>מצב למידה לפי נושאים</S.FeatureTitle>
            <S.FeatureText>
              תרגול ממוקד נושא עם תשובות נכונות והסברים, בנוסף למבחנים מדומים
              מלאים.
            </S.FeatureText>
          </S.Feature>
        </S.Features>
      </S.Section>

      <S.Section id="demo">
        <S.SectionTitle>מבחן ניסיון - בלי הרשמה</S.SectionTitle>
        <S.SectionIntro>
          {DEMO_QUESTIONS.length} שאלות אמיתיות בפורמט הבחינה. ענו, קבלו ציון
          והסבר על כל שאלה - בדיוק כמו בתרגול המלא.
        </S.SectionIntro>
        <S.DemoLaunch>
          <S.DemoLaunchTitle>מוכנים לבדוק את עצמכם?</S.DemoLaunchTitle>
          <S.DemoLaunchText>
            מבחן ניסיון קצר שייתן לכם טעימה מהמערכת. לוקח פחות מדקה.
          </S.DemoLaunchText>
          <S.DemoLaunchButton type="button" onClick={() => setDemoOpen(true)}>
            התחילו מבחן ניסיון
          </S.DemoLaunchButton>
        </S.DemoLaunch>
      </S.Section>

      <S.Section>
        <S.SectionTitle>שאלות נפוצות</S.SectionTitle>
        {FAQ.map((item, i) => (
          <S.FaqItem key={i}>
            <S.FaqQuestion>{item.q}</S.FaqQuestion>
            <S.FaqAnswer>{item.a}</S.FaqAnswer>
          </S.FaqItem>
        ))}
      </S.Section>

      <S.Disclaimer>
        אתר זה הוא כלי תרגול עצמאי ואינו קשור למשרד התחבורה או לרשות הרישוי, ואינו
        מהווה מקור רשמי. השימוש כפוף ל<Link to="/terms">תנאי השימוש</Link>{" "}
        ול<Link to="/privacy">מדיניות הפרטיות</Link>.
      </S.Disclaimer>

      {demoOpen && <DemoQuiz onClose={() => setDemoOpen(false)} />}
    </>
  );
}
