import { Router } from "express";
import mongoose from "mongoose";
import { AttemptModel } from "../models/Attempt.js";
import { SupportTicketModel } from "../models/SupportTicket.js";
import { UserFeedbackModel } from "../models/UserFeedback.js";
import { UserModel } from "../models/User.js";
import { CounterModel, DEMO_FINISH_COUNTER } from "../models/Counter.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { deleteUserAndRelatedData } from "../services/deleteUserCascade.js";
import { registeredAtFromObjectId } from "../services/userActivity.js";

const router = Router();

router.use(requireAuth, requireAdmin);

router.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ error: "מזהה משתמש לא תקין" });
  }
  const { deletedUser } = await deleteUserAndRelatedData(userId);
  if (!deletedUser) {
    return res.status(404).json({ error: "משתמש לא נמצא" });
  }
  res.status(204).send();
});

router.delete("/tickets/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  if (!mongoose.isValidObjectId(ticketId)) {
    return res.status(400).json({ error: "מזהה פנייה לא תקין" });
  }
  const deleted = await SupportTicketModel.findByIdAndDelete(ticketId);
  if (!deleted) {
    return res.status(404).json({ error: "פנייה לא נמצאה" });
  }
  res.status(204).send();
});

router.delete("/feedback/:feedbackId", async (req, res) => {
  const { feedbackId } = req.params;
  if (!mongoose.isValidObjectId(feedbackId)) {
    return res.status(400).json({ error: "מזהה משוב לא תקין" });
  }
  const deleted = await UserFeedbackModel.findByIdAndDelete(feedbackId);
  if (!deleted) {
    return res.status(404).json({ error: "משוב לא נמצא" });
  }
  res.status(204).send();
});

router.get("/stats", async (_req, res) => {
  const userCount = await UserModel.countDocuments();
  const totalAttempts = await AttemptModel.countDocuments();
  const demoCounter = await CounterModel.findOne({
    name: DEMO_FINISH_COUNTER,
  }).lean();
  const demoAttempts = (demoCounter as { count?: number } | null)?.count ?? 0;

  const usersRaw = await UserModel.aggregate([
    {
      $lookup: {
        from: "attempts",
        localField: "_id",
        foreignField: "userId",
        as: "atts",
      },
    },
    {
      $project: {
        userId: { $toString: "$_id" },
        username: 1,
        email: 1,
        attemptCount: { $size: "$atts" },
        createdAt: 1,
        lastLoginAt: 1,
      },
    },
    { $sort: { username: 1 } },
  ]);

  const users = usersRaw.map((row) => ({
    userId: row.userId as string,
    username: row.username as string,
    email: (row.email as string) ?? "",
    attemptCount: row.attemptCount as number,
    registeredAt: row.createdAt
      ? new Date(row.createdAt as Date).toISOString()
      : registeredAtFromObjectId(row.userId as string),
    lastLoginAt: row.lastLoginAt
      ? new Date(row.lastLoginAt as Date).toISOString()
      : null,
  }));

  const ticketsRaw = await SupportTicketModel.find()
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();

  const tickets = ticketsRaw.map((t) => ({
    id: String(t._id),
    username: t.username,
    email: (t.email as string) ?? "",
    body: t.body,
    createdAt: (t.createdAt as Date).toISOString(),
  }));

  const [feedbackAgg, feedbacksRaw] = await Promise.all([
    UserFeedbackModel.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          avgAppearance: { $avg: "$appearanceRating" },
          avgEfficiency: { $avg: "$efficiencyRating" },
        },
      },
    ]),
    UserFeedbackModel.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean(),
  ]);

  const feedbackSummary = feedbackAgg[0] as
    | {
        count?: number;
        avgAppearance?: number;
        avgEfficiency?: number;
      }
    | undefined;

  const feedbacks = feedbacksRaw.map((f) => ({
    id: String(f._id),
    username: f.username,
    email: (f.email as string) ?? "",
    appearanceRating: f.appearanceRating as number,
    efficiencyRating: f.efficiencyRating as number,
    comment: (f.comment as string) ?? "",
    createdAt: (f.createdAt as Date).toISOString(),
  }));

  res.json({
    userCount,
    totalAttempts,
    demoAttempts,
    users,
    tickets,
    feedbackCount: feedbackSummary?.count ?? 0,
    avgAppearance: feedbackSummary?.avgAppearance ?? null,
    avgEfficiency: feedbackSummary?.avgEfficiency ?? null,
    feedbacks,
  });
});

export default router;
