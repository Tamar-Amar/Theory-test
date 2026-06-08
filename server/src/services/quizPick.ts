import mongoose from "mongoose";
import { QuestionModel } from "../models/Question.js";
import { getMasteredQuestionIds, pickWeakQuestionIds } from "./userStats.js";
import { shuffleArray } from "./shuffle.js";
import { buildQuestionFilter } from "./questionFilter.js";

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
  licenseType: string,
  focusWeak: boolean,
  excludeImages = false
): Promise<QuestionForQuiz[]> {
  const noImage = excludeImages
    ? {
        $or: [
          { imageUrl: { $exists: false } },
          { imageUrl: null },
          { imageUrl: "" },
        ],
      }
    : {};
  const filter = { ...buildQuestionFilter({ category, licenseType }), ...noImage };
  const masteredIds = await getMasteredQuestionIds(userId);
  const availableFilter =
    masteredIds.length > 0
      ? { ...filter, _id: { $nin: masteredIds } }
      : filter;

  const total = await QuestionModel.countDocuments(availableFilter);
  if (total < count) {
    throw new Error("INSUFFICIENT_QUESTIONS");
  }

  let weakIds: mongoose.Types.ObjectId[] = [];
  if (focusWeak) {
    const weakTarget = Math.min(Math.ceil(count * 0.5), count);
    weakIds = await pickWeakQuestionIds(userId, category, licenseType, weakTarget);
  }

  const withExcluded = (extra: mongoose.Types.ObjectId[]) => {
    const nin = [...masteredIds, ...extra];
    if (!nin.length) return filter;
    return { ...filter, _id: { $nin: nin } };
  };

  const remaining = count - weakIds.length;
  const matchRandom = withExcluded(weakIds);

  const randomDocs =
    remaining > 0
      ? ((await QuestionModel.aggregate([
          { $match: matchRandom },
          { $sample: { size: remaining } },
        ])) as QuestionForQuiz[])
      : [];

  const weakDocs =
    weakIds.length > 0
      ? await QuestionModel.find({ _id: { $in: weakIds }, ...noImage }).lean()
      : [];

  const weakById = new Map(
    weakDocs.map((q) => [String(q._id), q as unknown as QuestionForQuiz])
  );
  const weakOrdered = weakIds
    .map((id) => weakById.get(String(id)))
    .filter(Boolean) as QuestionForQuiz[];

  let merged = [...weakOrdered, ...randomDocs];

  if (merged.length < count) {
    const haveIds = merged.map((q) => q._id);
    const need = count - merged.length;
    const topUp = (await QuestionModel.aggregate([
      { $match: withExcluded([...weakIds, ...haveIds]) },
      { $sample: { size: need } },
    ])) as QuestionForQuiz[];
    merged = [...merged, ...topUp];
  }

  return shuffleArray(merged).slice(0, count);
}
