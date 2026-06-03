import { Router } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { getAdminCredentials } from "../config.js";
import { UserModel } from "../models/User.js";
import { signAdminToken, signUserToken } from "../services/jwt.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^\S{3,32}$/;

router.post("/register", async (req, res) => {
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
  if (password.length < 8) {
    return res.status(400).json({ error: "סיסמה: לפחות 8 תווים" });
  }

  const passwordHash = await bcrypt.hash(password, 11);
  try {
    const user = await UserModel.create({
      username,
      email: email.toLowerCase(),
      passwordHash,
      passwordPlain: password,
    });
    const token = signUserToken(user._id.toString(), "user");
    return res.status(201).json({
      token,
      user: { username: user.username, email: user.email },
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

router.post("/login", async (req, res) => {
  const username =
    typeof req.body?.username === "string" ? req.body.username.trim() : "";
  const password =
    typeof req.body?.password === "string" ? req.body.password : "";

  if (!username || !password) {
    return res.status(400).json({ error: "חסר שם משתמש או סיסמה" });
  }

  const adminCreds = getAdminCredentials();
  if (
    adminCreds.password &&
    username === adminCreds.username &&
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

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "שם משתמש או סיסמה שגויים" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "שם משתמש או סיסמה שגויים" });
  }

  const token = signUserToken(user._id.toString(), "user");
  res.json({
    token,
    user: { username: user.username, email: user.email },
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
    .select("username email")
    .lean();
  if (!user) {
    return res.status(401).json({ error: "משתמש לא נמצא" });
  }
  const u = user as unknown as { username: string; email: string };
  res.json({ username: u.username, email: u.email });
});

export default router;
