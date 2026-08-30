import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "../Legal/Legal.styles";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "הדף לא נמצא | תרגול תאוריה";
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <S.Article dir="rtl">
      <S.Title>הדף לא נמצא</S.Title>
      <S.Intro>
        הכתובת הזו אינה קיימת באתר. חזרו לדף הבית, או עיינו במפת האתר.
      </S.Intro>
      <S.Paragraph>
        <Link to="/">חזרה לדף הבית</Link>
      </S.Paragraph>
      <S.List>
        <li>
          <a href="/llms.txt">llms.txt</a> — מה האתר עושה ולמי הוא מיועד
        </li>
        <li>
          <a href="/sitemap.xml">sitemap.xml</a> — עמודים ציבוריים
        </li>
      </S.List>
    </S.Article>
  );
}
