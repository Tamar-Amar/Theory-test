import jwt from "jsonwebtoken";
import { JWT_EXPIRES_DAYS, JWT_SECRET } from "../config.js";

export type JwtRole = "user" | "admin";

export function signUserToken(
  userId: string,
  role: JwtRole = "user"
): string {
  return jwt.sign({ sub: userId, role }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES_DAYS}d`,
  });
}

export function signAdminToken(): string {
  return jwt.sign({ sub: "admin", role: "admin" }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES_DAYS}d`,
  });
}
