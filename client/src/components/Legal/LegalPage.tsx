import { useEffect, useMemo, useState } from "react";
import { Ring } from "../Deco/Deco";
import { getLegalDoc } from "./legalContent";
import * as S from "./Legal.styles";

type Props = {
  slug: string;
};

const sectionId = (i: number) => `legal-sec-${i}`;

/** מרחק מראש המסך שבו פרק נחשב "פעיל" (מתחת לכותרת הקבועה) */
const ACTIVE_OFFSET_PX = 150;

export function LegalPage({ slug }: Props) {
  const doc = getLegalDoc(slug);
  const [active, setActive] = useState(0);

  /** פריטי "בעמוד זה": רק פרקים שיש להם כותרת, עם האינדקס המקורי לעיגון */
  const toc = useMemo(
    () =>
      (doc?.sections ?? [])
        .map((section, index) => ({ index, heading: section.heading }))
        .filter((item): item is { index: number; heading: string } =>
          Boolean(item.heading)
        ),
    [doc]
  );

  useEffect(() => {
    if (doc) {
      document.title = `${doc.title} | תרגול תאוריה`;
    }
    window.scrollTo({ top: 0 });
    setActive(0);
  }, [doc]);

  // הדגשת הפרק הפעיל בעת גלילה
  useEffect(() => {
    if (toc.length < 2) return;

    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(toc.length - 1);
        return;
      }
      let current = 0;
      toc.forEach((item, i) => {
        const el = document.getElementById(sectionId(item.index));
        if (el && el.getBoundingClientRect().top - ACTIVE_OFFSET_PX <= 0) {
          current = i;
        }
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  const jumpTo = (tocPosition: number, sectionIndex: number) => {
    const el = document.getElementById(sectionId(sectionIndex));
    if (!el) return;
    const reduceMotion =
      document.documentElement.dataset.a11yMotion === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    setActive(tocPosition);
  };

  if (!doc) {
    return (
      <S.Page dir="rtl">
        <S.Header>
          <S.Title>הדף לא נמצא</S.Title>
          <S.Updated>המסמך המבוקש אינו קיים.</S.Updated>
        </S.Header>
      </S.Page>
    );
  }

  return (
    <S.Page dir="rtl">
      <S.Deco aria-hidden>
        <Ring width={100} height={100} style={{ opacity: 0.13 }} />
      </S.Deco>

      <S.Header>
        <S.Title>{doc.title}</S.Title>
        <S.Updated>עודכן לאחרונה: {doc.updated}</S.Updated>
      </S.Header>

      <S.Layout>
        <S.Article>
          {doc.intro && <S.Intro>{doc.intro}</S.Intro>}

          {doc.sections.map((section, i) => (
            <S.Section key={i} id={sectionId(i)}>
              {section.heading && (
                <S.SectionHeading>{section.heading}</S.SectionHeading>
              )}
              {section.paragraphs?.map((p, j) => (
                <S.Paragraph key={j}>{p}</S.Paragraph>
              ))}
              {section.bullets && (
                <S.List>
                  {section.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </S.List>
              )}
            </S.Section>
          ))}
        </S.Article>

        {toc.length > 1 && (
          <S.Toc aria-label="בעמוד זה">
            <S.TocTitle>בעמוד זה</S.TocTitle>
            {toc.map((item, pos) => (
              <S.TocLink
                key={item.index}
                href={`#${sectionId(item.index)}`}
                $active={pos === active}
                aria-current={pos === active ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  jumpTo(pos, item.index);
                }}
              >
                {item.heading}
              </S.TocLink>
            ))}
          </S.Toc>
        )}
      </S.Layout>
    </S.Page>
  );
}
