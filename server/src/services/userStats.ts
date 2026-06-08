import mongoose from "mongoose";
import { UserQuestionStatModel } from "../models/UserQuestionStat.js";
import { QuestionModel } from "../models/Question.js";
import { buildQuestionFilter } from "./questionFilter.js";

function priorityScore(s: {
  totalWrong: number;
  wrongStreak: number;
  lastWrongAt?: Date;
}): number {
  const base = s.totalWrong * 3 + s.wrongStreak * 2 + 1;
  let recency = 0;
  if (s.lastWrongAt) {
    const hours =
      (Date.now() - new Date(s.lastWrongAt).getTime()) / 3_600_000;
    recency = 36 / (hours + 1.5);
  }
  return base + recency;
}

/** בחירה משוקללת ללא החזרה */
function pickWeightedIds(
  items: { questionId: mongoose.Types.ObjectId; weight: number }[],
  k: number
): mongoose.Types.ObjectId[] {
  const pool = [...items];
  const out: mongoose.Types.ObjectId[] = [];
  for (let i = 0; i < k && pool.length; i++) {
    const sum = pool.reduce((a, x) => a + x.weight, 0);
    let r = Math.random() * sum;
    for (let j = 0; j < pool.length; j++) {
      r -= pool[j].weight;
      if (r <= 0) {
        out.push(pool[j].questionId);
        pool.splice(j, 1);
        break;
      }
    }
  }
  return out;
}

/**
 * עדכון סטטיסטיקה - בלי התנגשות אופרטורים ב-MongoDB:
 * אסור לשלב $setOnInsert על שדה שמופיע גם ב-$inc / $set (PlanExecutor error).
 * ב-upsert: רק userId+questionId ב-setOnInsert; $inc על שדה חדש מתחיל מערך הנכון.
 */
export async function recordQuestionOutcome(
  userId: mongoose.Types.ObjectId,
  questionId: mongoose.Types.ObjectId,
  isCorrect: boolean
) {
  if (isCorrect) {
    await UserQuestionStatModel.findOneAndUpdate(
      { userId, questionId },
      {
        $set: { lastCorrectAt: new Date(), wrongStreak: 0 },
        $inc: { totalCorrect: 1, correctStreak: 1 },
        $setOnInsert: { userId, questionId },
      },
      { upsert: true }
    );
  } else {
    await UserQuestionStatModel.findOneAndUpdate(
      { userId, questionId },
      {
        $set: { lastWrongAt: new Date(), correctStreak: 0 },
        $inc: { totalWrong: 1, wrongStreak: 1 },
        $setOnInsert: { userId, questionId },
      },
      { upsert: true }
    );
  }
}

export async function pickWeakQuestionIds(
  userId: mongoose.Types.ObjectId,
  category: string,
  licenseType: string,
  maxPick: number
): Promise<mongoose.Types.ObjectId[]> {
  if (maxPick <= 0) return [];

  const stats = await UserQuestionStatModel.find({
    userId,
    totalWrong: { $gt: 0 },
    totalCorrect: 0,
  }).lean();

  if (!stats.length) return [];

  const qids = stats.map((s) => s.questionId);
  const qFilter: Record<string, unknown> = {
    _id: { $in: qids },
    ...buildQuestionFilter({ category, licenseType }),
  };

  const existing = await QuestionModel.find(qFilter).select("_id").lean();
  const allowed = new Set(existing.map((d) => String(d._id)));
  const ranked = stats
    .filter((s) => allowed.has(String(s.questionId)))
    .map((s) => {
      const st = s as unknown as {
        questionId: mongoose.Types.ObjectId;
        totalWrong: number;
        wrongStreak: number;
        lastWrongAt?: Date;
      };
      return {
        questionId: st.questionId,
        weight: priorityScore(st),
      };
    })
    .sort((a, b) => b.weight - a.weight);

  if (!ranked.length) return [];

  return pickWeightedIds(ranked, Math.min(maxPick, ranked.length));
}

/** שאלות שענו עליהן נכון לפחות פעם — לא מוצגות שוב */
export async function getMasteredQuestionIds(
  userId: mongoose.Types.ObjectId
): Promise<mongoose.Types.ObjectId[]> {
  const stats = await UserQuestionStatModel.find({
    userId,
    totalCorrect: { $gt: 0 },
  })
    .select("questionId")
    .lean();
  return stats.map(
    (s) => s.questionId as mongoose.Types.ObjectId
  );
}
