import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export type AuthUser = { id: string; role?: "admin" };

declare global {
  namespace Express {
    interface Request {
      authUser?: AuthUser;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token =
    header?.startsWith("Bearer ") ? header.slice(7).trim() : null;
  if (!token) {
    return res.status(401).json({ error: "נדרשת התחברות" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      sub?: string;
      role?: string;
    };
    if (!decoded.sub) {
      return res.status(401).json({ error: "טוקן לא תקין" });
    }
    req.authUser = {
      id: decoded.sub,
      role: decoded.role === "admin" ? "admin" : undefined,
    };
    next();
  } catch {
    return res.status(401).json({ error: "פג תוקף או טוקן לא תקין" });
  }
}

/** משתמש רגיל בלבד — לא מנהל (מבחנים וסטטיסטיקות אישיות) */
export function requireRegularUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.authUser) {
    return res.status(401).json({ error: "נדרשת התחברות" });
  }
  if (req.authUser.role === "admin") {
    return res.status(403).json({
      error: "חשבון מנהל מיועד ללוח הבקרה בלבד, לא לתרגול",
    });
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.authUser?.role !== "admin") {
    return res.status(403).json({ error: "נדרשת הרשאת מנהל" });
  }
  next();
}
