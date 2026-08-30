import { Router } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import { getAdminCredentials, getClientAppUrl } from "../config.js";
import { UserModel } from "../models/User.js";
import { signAdminToken, signUserToken } from "../services/jwt.js";
import { requireAuth, requireRegularUser } from "../middleware/auth.js";
import { touchLastLogin } from "../services/userActivity.js";
import { parseLicenseType } from "../constants/licenseTypes.js";
import { needsUxFeedback } from "../constants/uxFeedback.js";
import { sendPasswordResetEmail } from "../services/mail.js";
import {
  createResetToken,
  hashResetToken,
} from "../services/passwordReset.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^\S{3,32}$/;
const MAX_PASSWORD_LEN = 128;

const FORGOT_OK_MESSAGE =
  "אם קיים חשבון עם כתובת האימייל הזו, נשלח אליה קישור לאיפוס סיסמה.";

/** הגנה מפני ניחוש סיסמאות (brute-force / credential stuffing) */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "יותר מדי ניסיונות. נסו שוב בעוד מספר דקות" },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "יותר מדי ניסיונות הרשמה. נסו שוב מאוחר יותר" },
});

const forgotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "יותר מדי בקשות איפוס. נסו שוב בעוד מספר דקות" },
});

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "יותר מדי ניסיונות. נסו שוב בעוד מספר דקות" },
});

router.post("/register", registerLimiter, async (req, res) => {
  const username =
    typeof req.body?.username === "string" ? req.body.username.trim() : "";
  const email =
    typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const password =
    typeof req.body?.password === "string" ? req.body.password : "";

  if (!USERNAME_RE.test(username)) {
    return res.status(400).json({
      error: "שם משתמש: 3–32 תווים רצופים ללא רווחים",
    });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "כתובת אימייל לא תקינה" });
  }
  if (password.length < 8 || password.length > MAX_PASSWORD_LEN) {
    return res.status(400).json({
      error: `סיסמה: בין 8 ל־${MAX_PASSWORD_LEN} תווים`,
    });
  }

  const passwordHash = await bcrypt.hash(password, 11);
  try {
    const now = new Date();
    const user = await UserModel.create({
      username,
      email: email.toLowerCase(),
      passwordHash,
      lastLoginAt: now,
    });
    const token = signUserToken(user._id.toString(), "user");
    return res.status(201).json({
      token,
      user: { username: user.username, email: user.email, licenseType: "" },
    });
  } catch (e: unknown) {
    if (e instanceof mongoose.Error.ValidationError) {
      const first = Object.values(e.errors)[0];
      const path = first?.path;
      if (path === "username") {
        return res.status(400).json({
          error: "שם משתמש: 3–32 תווים רצופים ללא רווחים",
        });
      }
      if (path === "email") {
        return res.status(400).json({ error: "כתובת אימייל לא תקינה" });
      }
      return res.status(400).json({
        error: first?.message || "נתונים לא תקינים",
      });
    }
    const code =
      e && typeof e === "object" && "code" in e ? (e as { code: number }).code : 0;
    if (code === 11000) {
      return res.status(409).json({ error: "שם משתמש או אימייל כבר קיימים" });
    }
    console.error("register failed:", e);
    return res.status(400).json({ error: "ההרשמה נכשלה" });
  }
});

router.post("/login", loginLimiter, async (req, res) => {
  const identifier =
    typeof req.body?.username === "string" ? req.body.username.trim() : "";
  const password =
    typeof req.body?.password === "string" ? req.body.password : "";

  if (!identifier || !password) {
    return res.status(400).json({ error: "חסר שם משתמש / אימייל או סיסמה" });
  }

  const adminCreds = getAdminCredentials();
  if (
    adminCreds.password &&
    identifier === adminCreds.username &&
    password === adminCreds.password
  ) {
    const token = signAdminToken();
    return res.json({
      token,
      user: {
        username: adminCreds.username,
        email: "מנהל המערכת",
        admin: true,
      },
    });
  }

  const user = await UserModel.findOne({
    $or: [{ username: identifier }, { email: identifier.toLowerCase() }],
  });
  if (!user) {
    return res.status(401).json({ error: "שם משתמש / אימייל או סיסמה שגויים" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "שם משתמש / אימייל או סיסמה שגויים" });
  }

  await touchLastLogin(user._id.toString());

  const token = signUserToken(user._id.toString(), "user");
  res.json({
    token,
    user: {
      username: user.username,
      email: user.email,
      licenseType: parseLicenseType(user.licenseType) || "",
      needsUxFeedback: needsUxFeedback(user.uxFeedbackSurveyId),
    },
  });
});

router.patch("/me/license-type", requireAuth, requireRegularUser, async (req, res) => {
  const licenseType = parseLicenseType(req.body?.licenseType);
  if (!licenseType) {
    return res.status(400).json({ error: "יש לבחור סוג רישיון תקין" });
  }

  const user = await UserModel.findByIdAndUpdate(
    req.authUser!.id,
    { licenseType },
    { new: true }
  )
    .select("username email licenseType")
    .lean();

  if (!user) {
    return res.status(401).json({ error: "משתמש לא נמצא" });
  }

  const u = user as unknown as {
    username: string;
    email: string;
    licenseType?: string;
  };
  res.json({
    username: u.username,
    email: u.email,
    licenseType,
  });
});

router.get("/me", requireAuth, async (req, res) => {
  if (req.authUser!.role === "admin") {
    return res.json({
      username: getAdminCredentials().username,
      email: "מנהל המערכת",
      admin: true,
    });
  }

  const user = await UserModel.findById(req.authUser!.id)
    .select("username email licenseType uxFeedbackSurveyId")
    .lean();
  if (!user) {
    return res.status(401).json({ error: "משתמש לא נמצא" });
  }

  await touchLastLogin(req.authUser!.id);

  const u = user as unknown as {
    username: string;
    email: string;
    licenseType?: string;
    uxFeedbackSurveyId?: string;
  };
  res.json({
    username: u.username,
    email: u.email,
    licenseType: parseLicenseType(u.licenseType) || "",
    needsUxFeedback: needsUxFeedback(u.uxFeedbackSurveyId),
  });
});

router.post("/forgot-password", forgotLimiter, async (req, res) => {
  const email =
    typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "כתובת אימייל לא תקינה" });
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ message: FORGOT_OK_MESSAGE });
  }

  const { rawToken, tokenHash, expiresAt } = createResetToken();
  user.passwordResetTokenHash = tokenHash;
  user.passwordResetExpires = expiresAt;
  await user.save();

  const resetUrl = `${getClientAppUrl()}/reset-password?token=${encodeURIComponent(rawToken)}`;

  try {
    await sendPasswordResetEmail({ to: email, resetUrl });
  } catch (e) {
    console.error("forgot-password email failed:", e);
    user.passwordResetTokenHash = null;
    user.passwordResetExpires = null;
    await user.save();
    return res.status(502).json({
      error: "שליחת המייל נכשלה. נסו שוב מאוחר יותר",
    });
  }

  return res.json({ message: FORGOT_OK_MESSAGE });
});

router.post("/reset-password", resetLimiter, async (req, res) => {
  const token =
    typeof req.body?.token === "string" ? req.body.token.trim() : "";
  const password =
    typeof req.body?.password === "string" ? req.body.password : "";

  if (!token || token.length < 32) {
    return res.status(400).json({ error: "קישור איפוס לא תקין" });
  }
  if (password.length < 8 || password.length > MAX_PASSWORD_LEN) {
    return res.status(400).json({
      error: `סיסמה: בין 8 ל־${MAX_PASSWORD_LEN} תווים`,
    });
  }

  const tokenHash = hashResetToken(token);
  const user = await UserModel.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({
      error: "קישור האיפוס אינו תקין או שפג תוקפו. בקשו קישור חדש",
    });
  }

  user.passwordHash = await bcrypt.hash(password, 11);
  user.passwordResetTokenHash = null;
  user.passwordResetExpires = null;
  await user.save();

  return res.json({ message: "הסיסמה עודכנה בהצלחה. אפשר להתחבר עכשיו" });
});

export default router;
