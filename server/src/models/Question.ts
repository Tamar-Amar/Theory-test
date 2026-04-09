import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    sourceId: { type: Number, required: true, unique: true, index: true },
    text: { type: String, required: true },
    category: { type: String, default: "" },
    options: { type: [String], required: true },
    correctOptionIndex: { type: Number, required: true },
    imageUrl: { type: String, default: "" },
    syncedAt: { type: Date, default: Date.now },
  },
  { collection: "questions" }
);

export type QuestionDoc = mongoose.InferSchemaType<typeof QuestionSchema>;
export const QuestionModel =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);
