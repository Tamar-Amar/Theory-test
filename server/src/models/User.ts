import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 32,
      match: /^\S{3,32}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    /** לצפייה מנהל בלבד - נשמר בהרשמה */
    passwordPlain: { type: String },
    /** סוג הרישיון לתרגול — B, A, C, C1, D, 1 */
    licenseType: { type: String, default: "" },
    lastLoginAt: { type: Date },
  },
  { collection: "users", timestamps: true }
);

UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });

export type UserDoc = mongoose.InferSchemaType<typeof UserSchema>;
export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
