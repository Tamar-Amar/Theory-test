import type {
  AttemptQuestionReview,
  QuizQuestion,
  SubmitResponse,
} from "../api";
import { formatQuestionText } from "./formatQuestionText";

export function buildQuestionReviews(
  questions: QuizQuestion[],
  breakdown: SubmitResponse["breakdown"]
): AttemptQuestionReview[] {
  return breakdown.map((b, i) => {
    const q = questions[i];
    return {
      text: q?.text ? formatQuestionText(q.text) : "",
      options: q?.options ?? [],
      selectedIndex: b.selectedIndex,
      correctIndex: b.correctIndex,
      isCorrect: b.isCorrect,
      ...(q?.imageUrl ? { imageUrl: q.imageUrl } : {}),
    };
  });
}
