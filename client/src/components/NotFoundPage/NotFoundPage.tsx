import { useEffect } from "react";
import { RoadCurve, Triangle, TrafficLight } from "../Deco/Deco";
import * as S from "./NotFoundPage.styles";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "הדף לא נמצא | תרגול תאוריה";
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <S.Root>
      <S.Deco aria-hidden>
        <Triangle style={{ top: "90px", left: "19%", opacity: 0.15 }} width={110} height={96} />
        <TrafficLight style={{ top: "100px", left: "76%", opacity: 0.5 }} width={44} height={116} />
        <RoadCurve style={{ top: "250px", left: "25%", opacity: 0.25 }} width={720} height={180} />
      </S.Deco>

      <S.Code>404</S.Code>
      <S.Title>הדף לא נמצא</S.Title>
      <S.Text>
        הכתובת הזו אינה קיימת באתר. חזרו לדף הבית, או עיינו ב
        <a href="/sitemap.xml">מפת האתר</a>.
      </S.Text>
      <S.HomeLink to="/">חזרה לדף הבית</S.HomeLink>
    </S.Root>
  );
}
