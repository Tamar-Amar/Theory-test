import mongoose from "mongoose";
import { QuestionModel } from "../models/Question.js";
import { pickWeakQuestionIds } from "./userStats.js";
import { shuffleArray } from "./shuffle.js";

export type QuestionForQuiz = {
  _id: mongoose.Types.ObjectId;
  text: string;
  options: string[];
  correctOptionIndex: number;
  imageUrl?: string;
};

export async function pickQuestionsForQuiz(
  userId: mongoose.Types.ObjectId,
  count: number,
  category: string,
  focusWeak: boolean
): Promise<QuestionForQuiz[]> {
  const filter = category ? { category } : {};
  const total = await QuestionModel.countDocuments(filter);
  if (total < count) {
    throw new Error("INSUFFICIENT_QUESTIONS");
  }

  let weakIds: mongoose.Types.ObjectId[] = [];
  if (focusWeak) {
    const weakTarget = Math.min(Math.ceil(count * 0.62), count);
    weakIds = await pickWeakQuestionIds(userId, category, weakTarget);
  }

  const remaining = count - weakIds.length;
  const matchRandom: Record<string, unknown> = { ...filter };
  if (weakIds.length) {
    matchRandom._id = { $nin: weakIds };
  }

  const randomDocs =
    remaining > 0
      ? ((await QuestionModel.aggregate([
          { $match: matchRandom },
          { $sample: { size: remaining } },
        ])) as QuestionForQuiz[])
      : [];

  const weakDocs =
    weakIds.length > 0
      ? await QuestionModel.find({ _id: { $in: weakIds } }).lean()
      : [];

  const weakById = new Map(
    weakDocs.map((q) => [String(q._id), q as unknown as QuestionForQuiz])
  );
  const weakOrdered = weakIds
    .map((id) => weakById.get(String(id)))
    .filter(Boolean) as QuestionForQuiz[];

  let merged = [...weakOrdered, ...randomDocs];

  if (merged.length < count) {
    const have = new Set(merged.map((q) => String(q._id)));
    const need = count - merged.length;
    const topUp = (await QuestionModel.aggregate([
      {
        $match: {
          ...filter,
          _id: {
            $nin: [...have].map((id) => new mongoose.Types.ObjectId(id)),
          },
        },
      },
      { $sample: { size: need } },
    ])) as QuestionForQuiz[];
    merged = [...merged, ...topUp];
  }

  return shuffleArray(merged).slice(0, count);
}
