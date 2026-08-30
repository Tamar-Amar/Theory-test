import mongoose from "mongoose";

const UserFeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    surveyId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, trim: true, lowercase: true },
    appearanceRating: { type: Number, required: true, min: 1, max: 5 },
    efficiencyRating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "", maxlength: 2000 },
  },
  { collection: "user_feedback", timestamps: true }
);

UserFeedbackSchema.index({ userId: 1, surveyId: 1 }, { unique: true });
UserFeedbackSchema.index({ createdAt: -1 });

export type UserFeedbackDoc = mongoose.InferSchemaType<typeof UserFeedbackSchema>;
export const UserFeedbackModel =
  mongoose.models.UserFeedback ||
  mongoose.model("UserFeedback", UserFeedbackSchema);
