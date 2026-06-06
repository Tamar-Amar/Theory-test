import mongoose from "mongoose";
import { UserModel } from "../models/User.js";

export async function touchLastLogin(userId: string): Promise<void> {
  if (!mongoose.isValidObjectId(userId)) return;
  await UserModel.findByIdAndUpdate(userId, {
    $set: { lastLoginAt: new Date() },
  });
}

/** תאריך משוער להרשמה ממשתמשים ישנים לפני timestamps */
export function registeredAtFromObjectId(id: string): string | null {
  if (!mongoose.isValidObjectId(id)) return null;
  try {
    return new mongoose.Types.ObjectId(id).getTimestamp().toISOString();
  } catch {
    return null;
  }
}
