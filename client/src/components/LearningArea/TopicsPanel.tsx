import { useNavigate } from "react-router-dom";
import type { Meta } from "../../api";
import { LEARNING_TOPICS, resolveQuizCategory } from "./topicContent";
import * as S from "./TopicsPanel.styles";

type Props = { meta: Meta | null };

export function TopicsPanel({ meta }: Props) {
  const navigate = useNavigate();

  const goPractice = (quizCategories: string[]) => {
    const cat = resolveQuizCategory(meta, quizCategories);
    navigate(
      cat ? `/practice?category=${encodeURIComponent(cat)}` : "/practice"
    );
  };

  return (
    <S.Root>
      <S.PageHeader>
        <S.PageTitle>נושאי למידה</S.PageTitle>
        <S.TopicsIntro>
          לפני שמתחילים לתרגל — מומלץ לעבור על הנושאים הבאים. הם מכסים את
          מה שחוזר הכי הרבה במבחן התאוריה.
        </S.TopicsIntro>
      </S.PageHeader>

      <S.TopicGrid>
        {LEARNING_TOPICS.map((topic, index) => (
          <S.TopicCard
            key={topic.id}
            $accent={topic.accent}
            $accentBg={topic.accentBg}
          >
            <S.TopicCardHead>
              <S.TopicIcon aria-hidden="true">{topic.icon}</S.TopicIcon>
              <S.TopicHeadText>
                <S.TopicNumber $accent={topic.accent}>
                  {index + 1}
                </S.TopicNumber>
                <S.TopicTitle>{topic.title}</S.TopicTitle>
              </S.TopicHeadText>
            </S.TopicCardHead>

            <S.TopicSubtitle>{topic.subtitle}</S.TopicSubtitle>

            <S.IncludesSection>
              <S.IncludesLabel $accent={topic.accent}>
                מה זה כולל?
              </S.IncludesLabel>
              <S.IncludesList>
                {topic.includes.map((item, i) => (
                  <S.IncludesItem key={i}>
                    <S.Bullet $accent={topic.accent} aria-hidden="true" />
                    <S.IncludesText>{item}</S.IncludesText>
                  </S.IncludesItem>
                ))}
              </S.IncludesList>
            </S.IncludesSection>

            <S.PracticeBtn
              type="button"
              $accent={topic.accent}
              onClick={() => goPractice(topic.quizCategories)}
            >
              תרגלו מבחן בנושא
            </S.PracticeBtn>
          </S.TopicCard>
        ))}
      </S.TopicGrid>
    </S.Root>
  );
}
