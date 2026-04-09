import mongoose from "mongoose";
import { ATTEMPT_EXPIRE_AFTER_SECONDS } from "../config.js";

const AttemptItemSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    text: { type: String, required: true },
    options: { type: [String], required: true },
    selectedIndex: { type: Number, required: true },
    correctIndex: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
    imageUrl: { type: String },
  },
  { _id: false }
);

const AttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    category: { type: String, default: "" },
    durationMs: { type: Number },
    /** צילום מצב השאלות כפי שהוצגו במבחן (אפשרות מעורבבות) */
    items: { type: [AttemptItemSchema] },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "attempts" }
);

if (ATTEMPT_EXPIRE_AFTER_SECONDS > 0) {
  AttemptSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: ATTEMPT_EXPIRE_AFTER_SECONDS }
  );
}

export type AttemptDoc = mongoose.InferSchemaType<typeof AttemptSchema>;
export const AttemptModel =
  mongoose.models.Attempt || mongoose.model("Attempt", AttemptSchema);
