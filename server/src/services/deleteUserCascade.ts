import mongoose from "mongoose";
import { AttemptModel } from "../models/Attempt.js";
import { QuizSessionModel } from "../models/QuizSession.js";
import { SupportTicketModel } from "../models/SupportTicket.js";
import { UserFeedbackModel } from "../models/UserFeedback.js";
import { UserQuestionStatModel } from "../models/UserQuestionStat.js";
import { UserModel } from "../models/User.js";

/**
 * מוחק משתמש ואת כל הרשומות המקושרות אליו (מבחנים, סשנים, סטטיסטיקות שאלות, פניות, משוב).
 */
export async function deleteUserAndRelatedData(
  userId: string
): Promise<{ deletedUser: boolean }> {
  const oid = new mongoose.Types.ObjectId(userId);

  await Promise.all([
    SupportTicketModel.deleteMany({ userId: oid }),
    UserFeedbackModel.deleteMany({ userId: oid }),
    AttemptModel.deleteMany({ userId: oid }),
    UserQuestionStatModel.deleteMany({ userId: oid }),
    QuizSessionModel.deleteMany({ userId: oid }),
  ]);

  const del = await UserModel.deleteOne({ _id: oid });
  return { deletedUser: del.deletedCount === 1 };
}
