import mongoose from "mongoose";

const SessionItemSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    shuffledOptions: { type: [String], required: true },
    correctShuffledIndex: { type: Number, required: true },
  },
  { _id: false }
);

const QuizSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    /** TTL: MongoDB מוחק מסמך כש־expiresAt עבר (~דקה). גיבוי אם submit נכשל לפני מחיקה מפורשת */
    expiresAt: { type: Date, required: true, expires: 0 },
    items: { type: [SessionItemSchema], required: true },
  },
  { collection: "quiz_sessions" }
);

export type QuizSessionDoc = mongoose.InferSchemaType<typeof QuizSessionSchema>;
export const QuizSessionModel =
  mongoose.models.QuizSession ||
  mongoose.model("QuizSession", QuizSessionSchema);
