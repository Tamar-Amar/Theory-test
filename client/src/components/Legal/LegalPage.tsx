import { useEffect } from "react";
import { getLegalDoc } from "./legalContent";
import * as S from "./Legal.styles";

type Props = {
  slug: string;
};

export function LegalPage({ slug }: Props) {
  const doc = getLegalDoc(slug);

  useEffect(() => {
    if (doc) {
      document.title = `${doc.title} | תרגול תאוריה`;
    }
    window.scrollTo({ top: 0 });
  }, [doc]);

  if (!doc) {
    return (
      <S.Article dir="rtl">
        <S.Title>הדף לא נמצא</S.Title>
        <S.Paragraph>המסמך המבוקש אינו קיים.</S.Paragraph>
      </S.Article>
    );
  }

  return (
    <S.Article dir="rtl">
      <S.Title>{doc.title}</S.Title>
      <S.Updated>עודכן לאחרונה: {doc.updated}</S.Updated>
      {doc.intro && <S.Intro>{doc.intro}</S.Intro>}

      {doc.sections.map((section, i) => (
        <section key={i}>
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
        </section>
      ))}
    </S.Article>
  );
}
