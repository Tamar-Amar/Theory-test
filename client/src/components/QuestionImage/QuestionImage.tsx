import * as S from "./QuestionImage.styles";

type Props = {
  src: string;
  alt?: string;
};

export function QuestionImage({ src, alt = "איור לשאלה" }: Props) {
  return (
    <S.Figure>
      <S.Img src={src} alt={alt} loading="lazy" decoding="async" />
      <S.Caption>תמונה להמחשה</S.Caption>
    </S.Figure>
  );
}
