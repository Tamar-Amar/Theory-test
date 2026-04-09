import mongoose from "mongoose";

const UserQuestionStatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
      index: true,
    },
    totalWrong: { type: Number, default: 0 },
    totalCorrect: { type: Number, default: 0 },
    wrongStreak: { type: Number, default: 0 },
    correctStreak: { type: Number, default: 0 },
    lastWrongAt: { type: Date },
    lastCorrectAt: { type: Date },
  },
  { collection: "user_question_stats" }
);

UserQuestionStatSchema.index({ userId: 1, questionId: 1 }, { unique: true });

export type UserQuestionStatDoc = mongoose.InferSchemaType<
  typeof UserQuestionStatSchema
>;
export const UserQuestionStatModel =
  mongoose.models.UserQuestionStat ||
  mongoose.model("UserQuestionStat", UserQuestionStatSchema);
