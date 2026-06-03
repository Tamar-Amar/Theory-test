import { Router } from "express";
import mongoose from "mongoose";
import { QuestionModel } from "../models/Question.js";
import { QuizSessionModel } from "../models/QuizSession.js";
import { AttemptModel } from "../models/Attempt.js";
import { UserQuestionStatModel } from "../models/UserQuestionStat.js";
import { UserModel } from "../models/User.js";
import { SupportTicketModel } from "../models/SupportTicket.js";
import { shuffleOptions } from "../services/shuffle.js";
import { requireAuth, requireRegularUser, optionalAuth } from "../middleware/auth.js";
import { pickQuestionsForQuiz } from "../services/quizPick.js";
import { recordQuestionOutcome } from "../services/userStats.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseTicketEmail(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const email = raw.trim().toLowerCase();
  if (!email) return undefined;
  if (!EMAIL_RE.test(email)) {
    return "__invalid__";
  }
  return email;
}

type QuizSessionItem = {
  questionId: mongoose.Types.ObjectId;
  shuffledOptions: string[];
  correctShuffledIndex: number;
};

type AttemptItemLean = {
  text: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  imageUrl?: string;
};

type AttemptSummaryLean = {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  score: number;
  total: number;
  category?: string;
  durationMs?: number;
  items?: AttemptItemLean[];
};

const SESSION_TTL_MS = 60 * 60 * 1000;

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

router.get("/meta", async (_req, res) => {
  const count = await QuestionModel.countDocuments();
  const categories = await QuestionModel.distinct("category");
  res.json({
    questionCount: count,
    categories: categories.filter(Boolean).sort(),
  });
});

router.get("/stats", requireAuth, requireRegularUser, async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.authUser!.id);

  const [agg, avgTimeAgg, recentDocs, weakQuestionsCount] = await Promise.all([
    AttemptModel.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          attemptsCount: { $sum: 1 },
          totalAnswered: { $sum: "$total" },
          totalCorrect: { $sum: "$score" },
          avgPercent: {
            $avg: {
              $multiply: [100, { $divide: ["$score", "$total"] }],
            },
          },
          bestPercent: {
            $max: {
              $multiply: [100, { $divide: ["$score", "$total"] }],
            },
          },
        },
      },
    ]),
    AttemptModel.aggregate([
      {
        $match: {
          userId,
          total: { $gt: 0 },
          durationMs: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: null,
          avgMsPerQuestion: {
            $avg: { $divide: ["$durationMs", "$total"] },
          },
        },
      },
    ]),
    AttemptModel.aggregate([
      { $match: { userId } },
      { $sort: { createdAt: -1 } },
      { $limit: 15 },
      {
        $project: {
          score: 1,
          total: 1,
          category: 1,
          durationMs: 1,
          createdAt: 1,
          hasDetails: {
            $gt: [{ $size: { $ifNull: ["$items", []] } }, 0],
          },
        },
      },
    ]),
    UserQuestionStatModel.countDocuments({ userId, totalWrong: { $gt: 0 } }),
  ]);

  const summary = agg[0];
  const attemptsCount = summary?.attemptsCount ?? 0;
  const timeSummary = avgTimeAgg[0];
  const averageMsPerQuestion =
    timeSummary?.avgMsPerQuestion != null
      ? Math.round(Number(timeSummary.avgMsPerQuestion))
      : null;

  res.json({
    attemptsCount,
    averageMsPerQuestion,
    averagePercent:
      attemptsCount > 0 && summary?.avgPercent != null
        ? Math.round(Number(summary.avgPercent))
        : null,
    bestPercent:
      attemptsCount > 0 && summary?.bestPercent != null
        ? Math.round(Number(summary.bestPercent))
        : null,
    totalAnswered: summary?.totalAnswered ?? 0,
    totalCorrect: summary?.totalCorrect ?? 0,
    weakQuestionsCount,
    recentAttempts: recentDocs.map((a) => {
      const dur = a.durationMs;
      const tot = a.total;
      const avgMsPerQuestion =
        dur != null && dur > 0 && tot > 0 ? Math.round(dur / tot) : null;
      return {
        id: String(a._id),
        createdAt: (a.createdAt as Date).toISOString(),
        score: a.score,
        total: a.total,
        percent: Math.round((100 * a.score) / a.total),
        category: a.category || "",
        avgMsPerQuestion,
        hasDetails: Boolean(a.hasDetails),
      };
    }),
  });
});

router.get("/attempts/:id", requireAuth, requireRegularUser, async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.authUser!.id);
  let oid: mongoose.Types.ObjectId;
  try {
    oid = new mongoose.Types.ObjectId(req.params.id);
  } catch {
    return res.status(400).json({ error: "מזהה לא תקין" });
  }

  const att = (await AttemptModel.findOne({
    _id: oid,
    userId,
  }).lean()) as AttemptSummaryLean | null;
  if (!att) {
    return res.status(404).json({ error: "לא נמצא" });
  }

  const rawItems = att.items ?? [];
  res.json({
    id: String(att._id),
    createdAt: (att.createdAt as Date).toISOString(),
    score: att.score,
    total: att.total,
    percent: Math.round((100 * att.score) / att.total),
    category: att.category || "",
    durationMs: att.durationMs ?? null,
    items: rawItems.map((it) => {
      const img =
        it.imageUrl && typeof it.imageUrl === "string"
          ? it.imageUrl.trim()
          : "";
      return {
        text: it.text,
        options: it.options,
        selectedIndex: it.selectedIndex,
        correctIndex: it.correctIndex,
        isCorrect: it.isCorrect,
        ...(img ? { imageUrl: img } : {}),
      };
    }),
  });
});

router.post("/tickets", optionalAuth, async (req, res) => {
  const body =
    typeof req.body?.body === "string" ? req.body.body.trim() : "";

  if (!body || body.length < 5) {
    return res.status(400).json({ error: "תוכן הפנייה קצר מדי" });
  }
  if (body.length > 8000) {
    return res.status(400).json({ error: "תוכן הפנייה ארוך מדי" });
  }

  if (req.authUser && req.authUser.role !== "admin") {
    const userId = new mongoose.Types.ObjectId(req.authUser.id);
    const u = await UserModel.findById(userId).select("username email").lean();
    if (!u) {
      return res.status(401).json({ error: "משתמש לא נמצא" });
    }
    const row = u as unknown as { username: string; email: string };
    const parsedEmail = parseTicketEmail(req.body?.email);
    if (parsedEmail === "__invalid__") {
      return res.status(400).json({ error: "כתובת אימייל לא תקינה" });
    }
    await SupportTicketModel.create({
      userId,
      username: row.username,
      email: parsedEmail || row.email,
      body,
    });
    return res.status(201).json({ ok: true });
  }

  const name =
    typeof req.body?.name === "string" ? req.body.name.trim() : "";
  if (name.length < 2) {
    return res.status(400).json({ error: "נא למלא שם (לפחות 2 תווים)" });
  }
  if (name.length > 64) {
    return res.status(400).json({ error: "השם ארוך מדי" });
  }

  const parsedEmail = parseTicketEmail(req.body?.email);
  if (parsedEmail === "__invalid__") {
    return res.status(400).json({ error: "כתובת אימייל לא תקינה" });
  }

  await SupportTicketModel.create({
    username: name,
    email: parsedEmail,
    body,
  });
  res.status(201).json({ ok: true });
});

router.post("/sessions", requireAuth, requireRegularUser, async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.authUser!.id);
  const count = Math.min(
    40,
    Math.max(3, Number(req.body?.count) || 10)
  );
  const category =
    typeof req.body?.category === "string" ? req.body.category.trim() : "";
  const focusWeak = true;

  const filter = category ? { category } : {};
  const total = await QuestionModel.countDocuments(filter);
  if (total < count) {
    return res.status(400).json({
      error:
        total === 0
          ? "אין שאלות במסד. יש לטעון שאלות ל־MongoDB (למשל ייבוא למאגר questions)."
          : `לא מספיק שאלות בקטגוריה: במסד ${total}, נבחרו ${count} למבחן.`,
    });
  }

  let picked: Awaited<ReturnType<typeof pickQuestionsForQuiz>>;
  try {
    picked = await pickQuestionsForQuiz(userId, count, category, focusWeak);
  } catch (e) {
    if (e instanceof Error && e.message === "INSUFFICIENT_QUESTIONS") {
      return res.status(400).json({
        error: "לא מספיק שאלות לבניית המבחן.",
      });
    }
    throw e;
  }

  const items = picked.map((q) => {
    const { shuffledOptions, correctShuffledIndex } = shuffleOptions(
      q.options,
      q.correctOptionIndex
    );
    return {
      questionId: q._id,
      shuffledOptions,
      correctShuffledIndex,
    };
  });

  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const session = await QuizSessionModel.create({
    userId,
    expiresAt,
    items,
  });

  const clientItems = items.map((it, index) => {
    const img = picked[index].imageUrl?.trim();
    return {
      index,
      text: picked[index].text,
      options: it.shuffledOptions,
      ...(img ? { imageUrl: img } : {}),
    };
  });

  res.status(201).json({
    sessionId: session._id,
    expiresAt: session.expiresAt,
    focusWeak,
    questions: clientItems,
  });
});

router.post(
  "/learning/sessions",
  requireAuth,
  requireRegularUser,
  async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.authUser!.id);
    const count = Math.min(24, Math.max(3, Number(req.body?.count) || 8));
    const category =
      typeof req.body?.category === "string" ? req.body.category.trim() : "";
    const focusWeak = true;

    const filter = category ? { category } : {};
    const total = await QuestionModel.countDocuments(filter);
    if (total < count) {
      return res.status(400).json({
        error:
          total === 0
            ? "אין שאלות במסד. יש לטעון שאלות ל־MongoDB (למשל ייבוא למאגר questions)."
            : `לא מספיק שאלות בקטגוריה: במסד ${total}, נבחרו ${count} ללמידה.`,
      });
    }

    let picked: Awaited<ReturnType<typeof pickQuestionsForQuiz>>;
    try {
      picked = await pickQuestionsForQuiz(userId, count, category, focusWeak);
    } catch (e) {
      if (e instanceof Error && e.message === "INSUFFICIENT_QUESTIONS") {
        return res.status(400).json({
          error: "לא מספיק שאלות לבניית יחידת הלמידה.",
        });
      }
      throw e;
    }

    const clientItems = picked.map((q, index) => {
      const { shuffledOptions, correctShuffledIndex } = shuffleOptions(
        q.options,
        q.correctOptionIndex
      );
      const img = q.imageUrl?.trim();
      return {
        index,
        text: q.text,
        options: shuffledOptions,
        correctIndex: correctShuffledIndex,
        ...(img ? { imageUrl: img } : {}),
      };
    });

    res.status(201).json({
      focusWeak,
      questions: clientItems,
    });
  }
);

router.post("/sessions/:id/submit", requireAuth, requireRegularUser, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.authUser!.id);
    const sessionId = req.params.id;
    const answers = req.body?.answers as number[] | undefined;
    const durationMs =
      typeof req.body?.durationMs === "number" ? req.body.durationMs : undefined;
    const category =
      typeof req.body?.category === "string" ? req.body.category : "";

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "חסר מערך answers" });
    }

    const session = await QuizSessionModel.findById(sessionId);
    if (!session || session.expiresAt < new Date()) {
      return res.status(410).json({ error: "המבחן פג תוקף או לא נמצא" });
    }

    if (String(session.userId) !== String(userId)) {
      return res.status(403).json({ error: "אין גישה למבחן הזה" });
    }

    const sessionItems = session.items as QuizSessionItem[];

    if (answers.length !== sessionItems.length) {
      return res.status(400).json({ error: "מספר תשובות לא תואם" });
    }

    let correct = 0;
    const breakdown = sessionItems.map((it, i) => {
        const selected = answers[i];
        const ok = selected === it.correctShuffledIndex;
        if (ok) correct++;
        return {
          questionId: String(it.questionId),
          selectedIndex: selected,
          correctIndex: it.correctShuffledIndex,
          isCorrect: ok,
        };
    });

    for (let i = 0; i < sessionItems.length; i++) {
      const qid = sessionItems[i].questionId;
      await recordQuestionOutcome(
        userId,
        qid instanceof mongoose.Types.ObjectId
          ? qid
          : new mongoose.Types.ObjectId(String(qid)),
        breakdown[i].isCorrect
      );
    }

    const qIds = sessionItems.map((it) => it.questionId);
    const questionDocs = await QuestionModel.find({
      _id: { $in: qIds },
    }).lean();
    const qMap = new Map<string, { text: string; imageUrl?: string }>();
    for (const q of questionDocs) {
      const row = q as {
        _id: mongoose.Types.ObjectId;
        text?: string;
        imageUrl?: string;
      };
      qMap.set(String(row._id), {
        text: row.text ?? "",
        imageUrl: row.imageUrl,
      });
    }

    const attemptItems = sessionItems.map((it, i) => {
      const doc = qMap.get(String(it.questionId));
      const selected = answers[i];
      const img = doc?.imageUrl?.trim();
      return {
        questionId: it.questionId,
        text: doc?.text ?? "(שאלה לא נמצאה במאגר)",
        options: it.shuffledOptions,
        selectedIndex: selected,
        correctIndex: it.correctShuffledIndex,
        isCorrect: selected === it.correctShuffledIndex,
        ...(img ? { imageUrl: img } : {}),
      };
    });

    const removed = await QuizSessionModel.findOneAndDelete({
      _id: session._id,
      userId,
    });
    if (!removed) {
      console.warn("[submit] סשן לא נמחק (כבר לא קיים?)", sessionId);
    }

    await AttemptModel.create({
      userId,
      score: correct,
      total: sessionItems.length,
      category,
      durationMs,
      items: attemptItems,
    });

    res.json({
      score: correct,
      total: sessionItems.length,
      percent: Math.round((100 * correct) / sessionItems.length),
      breakdown,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "submit failed";
    console.error("[submit]", e);
    res.status(500).json({ error: msg });
  }
});

export default router;
