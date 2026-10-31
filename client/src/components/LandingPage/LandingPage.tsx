import { useEffect, useState } from "react";
import { fetchPublicRating, type PublicRating } from "../../api";
import { Ring, Triangle, TrafficLight, RoadCurve } from "../Deco/Deco";
import { StatCard } from "../StatCard/StatCard";
import { NarrowOnly, WideOnly } from "../Responsive/Responsive";
import { DemoQuiz } from "./DemoQuiz";
import * as S from "./LandingPage.styles";

/** מקטעי "למה לתרגל כאן?" — בסדר התצוגה משמאל לימין כמו ב‑Figma */
const FEATURES = [
  {
    title: "מצב למידה לפי נושאים",
    text: "לומדים את התשובה הנכונה לפני המשחק, ובודקים אם הפנמתם.",
  },
  {
    title: "מעקב התקדמות אישי",
    text: "רואים בכל רגע את אחוז ההצלחה, זמן ממוצע לשאלה, והנושאים שדורשים חיזוק.",
  },
  {
    title: "מיקוד על הטעויות שלכם",
    text: "המערכת זוכרת על אילו שאלות טעיתם, כמה פעמים ומתי, ומחזירה אותן עד שתשלטו בהן.",
  },
];

const FAQ = [
  {
    q: "כמה שאלות יש במבחן התאוריה האמיתי?",
    a: "מבחן התאוריה כולל 30 שאלות אמריקאיות, וכדי לעבור צריך לענות נכון על לפחות 26 מהן (90%).",
  },
  {
    q: "האם התרגול חינמי?",
    a: "כן. מבחן הניסיון פתוח לכולם ללא הרשמה, וההרשמה החינמית מוסיפה שמירת התקדמות.",
  },
  {
    q: "האם צריך להוריד אפליקציה?",
    a: "לא. הכול עובד ישירות בדפדפן, גם בנייד וגם במחשב, בלי התקנה.",
  },
];

function scrollToDemo() {
  document
    .getElementById("demo")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** מינימום דירוגים אמיתיים לפני שמציגים ממוצע ומוסיפים אותו לסימון לגוגל */
const MIN_RATINGS = 10;

/** מוסיף aggregateRating לסימון ה-JSON-LD הסטטי (דירוג אמיתי בלבד) */
function applyRatingSchema(r: PublicRating) {
  const el = document.getElementById("ld-json");
  if (!el || r.average === null) return;
  try {
    const data = JSON.parse(el.textContent ?? "");
    const app = data["@graph"]?.find(
      (n: { "@type"?: string }) => n["@type"] === "WebApplication",
    );
    if (!app) return;
    app.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: r.average,
      ratingCount: r.count,
      bestRating: 5,
      worstRating: 1,
    };
    el.textContent = JSON.stringify(data);
  } catch {
    /* סימון פגום - לא משנים */
  }
}

export function LandingPage() {
  const [rating, setRating] = useState<PublicRating | null>(null);

  useEffect(() => {
    void fetchPublicRating().then((r) => {
      if (r && r.average !== null && r.count >= MIN_RATINGS) {
        setRating(r);
        applyRatingSchema(r);
      }
    });
  }, []);

  useEffect(() => {
    document.title = "תרגול מבחני תאוריה - מבחן מדומה חינם וממוקד טעויות";
  }, []);

  return (
    <>
      {/* ===== Hero ===== */}
      <S.HeroSection>
        <S.HeroDeco aria-hidden>
          <Ring style={{ top: "80px", left: "9%", opacity: 0.14 }} width={92} height={92} />
          <TrafficLight style={{ top: "70px", right: "9%", opacity: 0.55 }} width={40} height={106} />
          <Triangle style={{ top: "310px", left: "17%", opacity: 0.16 }} width={70} height={61} />
          <RoadCurve
            style={{ top: "280px", left: "50%", transform: "translateX(-55%)", opacity: 0.26 }}
            width={820}
            height={205}
          />
        </S.HeroDeco>

        <S.HeroInner>
          <S.HeroContent>
            <S.Title>
              לומדים תאוריה <span>ברוגע</span>,<br />
              ועוברים בביטחון.
            </S.Title>
            <S.Lead>
              מבחני תאוריה מדומים בפורמט הבחינה האמיתית, שאלות לפי נושאים, ומערכת
              חכמה שמזהה את הטעויות שלכם ומחזירה אותן עד שתשלטו בחומר.
            </S.Lead>
            <S.HeroActions>
              <S.HeroSecondary to="/login">הרשמה חינם</S.HeroSecondary>
              <S.HeroPrimary type="button" onClick={scrollToDemo}>
                התחילו מבחן ניסיון
              </S.HeroPrimary>
            </S.HeroActions>
            {rating ? (
              <S.RatingLine>
                ★ <strong>{rating.average}</strong> מתוך 5 · {rating.count}{" "}
                דירוגים של משתמשים
              </S.RatingLine>
            ) : null}
            <S.Stats>
              <StatCard
                value="6"
                label={
                  <>
                    <WideOnly>סוגי רישיון</WideOnly>
                    <NarrowOnly>רישיונות</NarrowOnly>
                  </>
                }
              />
              <StatCard
                value="26"
                label={
                  <>
                    <WideOnly>תשובות נכונות </WideOnly>למעבר
                  </>
                }
              />
              <StatCard
                value="30"
                label={
                  <>
                    שאלות<WideOnly> במבחן</WideOnly>
                  </>
                }
              />
            </S.Stats>
          </S.HeroContent>
        </S.HeroInner>
      </S.HeroSection>

      {/* ===== מבחן ניסיון ===== */}
      <S.DemoSection id="demo">
        <S.DemoInner>
          <S.SectionTitle>מבחן ניסיון - ללא הרשמה</S.SectionTitle>
          <S.SectionSub>
            מבחן ניסיון קצר שייתן לכם טעימה מהמערכת.
          </S.SectionSub>
          <DemoQuiz />
        </S.DemoInner>
      </S.DemoSection>

      {/* ===== למה לתרגל כאן? ===== */}
      <S.FeaturesSection>
        <S.FeaturesInner>
          <S.FeaturesTitle>למה לתרגל כאן?</S.FeaturesTitle>
          <S.FeaturesRow>
            {FEATURES.map((f) => (
              <S.FeatureCard key={f.title}>
                <S.FeatureTitle>{f.title}</S.FeatureTitle>
                <S.FeatureText>{f.text}</S.FeatureText>
              </S.FeatureCard>
            ))}
          </S.FeaturesRow>
        </S.FeaturesInner>
      </S.FeaturesSection>

      {/* ===== שאלות נפוצות ===== */}
      <S.FaqSection>
        <S.FaqInner>
          <S.FaqTitle>שאלות נפוצות</S.FaqTitle>
          {FAQ.map((item) => (
            <S.FaqItem key={item.q}>
              <S.FaqQ>{item.q}</S.FaqQ>
              <S.FaqA>{item.a}</S.FaqA>
            </S.FaqItem>
          ))}
        </S.FaqInner>
      </S.FaqSection>

      {/* ===== רצועת CTA ===== */}
      <S.CtaSection>
        <S.CtaDeco aria-hidden>
          <Ring style={{ top: "60px", left: "7%", opacity: 0.12 }} width={92} height={92} />
          <TrafficLight style={{ top: "40px", right: "8%", opacity: 0.5 }} width={40} height={106} />
        </S.CtaDeco>
        <S.CtaInner>
          <S.CtaTitle>מוכנים לבדוק את עצמכם?</S.CtaTitle>
          <S.CtaButton type="button" onClick={scrollToDemo}>
            נסו מבחן ניסיון
          </S.CtaButton>
        </S.CtaInner>
      </S.CtaSection>
    </>
  );
}
