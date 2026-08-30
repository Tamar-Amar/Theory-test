import nodemailer from "nodemailer";
import { getSmtpConfig } from "../config.js";

export const FEEDBACK_NOTIFY_EMAIL = "amtamar747@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stars(n: number): string {
  const filled = Math.min(5, Math.max(0, Math.round(n)));
  return `${"★".repeat(filled)}${"☆".repeat(5 - filled)} (${filled}/5)`;
}

async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<"sent" | "logged"> {
  const smtp = getSmtpConfig();
  if (!smtp) {
    console.info(`[mail] SMTP לא מוגדר — ${opts.subject}\n${opts.text}`);
    return "logged";
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  await transporter.sendMail({
    from: smtp.from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });

  return "sent";
}

export async function sendPasswordResetEmail(opts: {
  to: string;
  resetUrl: string;
}): Promise<"sent" | "logged"> {
  const subject = "איפוס סיסמה - תרגול תאוריה";
  const text = [
    "התקבלה בקשה לאיפוס סיסמה באתר תרגול תאוריה.",
    "",
    "לבחירת סיסמה חדשה לחצו על הקישור (בתוקף לשעה):",
    opts.resetUrl,
    "",
    "אם לא ביקשתם איפוס סיסמה, ניתן להתעלם מהודעה זו.",
  ].join("\n");

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.6">
      <p>התקבלה בקשה לאיפוס סיסמה באתר <strong>תרגול תאוריה</strong>.</p>
      <p>
        <a href="${opts.resetUrl}" style="display:inline-block;padding:10px 16px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">
          בחירת סיסמה חדשה
        </a>
      </p>
      <p style="color:#64748b;font-size:14px">הקישור בתוקף לשעה. אם לא ביקשתם איפוס, התעלמו מהודעה זו.</p>
    </div>
  `;

  return sendMail({ to: opts.to, subject, text, html });
}

export async function sendUxFeedbackCopyEmail(opts: {
  username: string;
  email: string;
  appearanceRating: number;
  efficiencyRating: number;
  comment: string;
}): Promise<"sent" | "logged"> {
  const comment = opts.comment.trim() || "(ללא טקסט)";
  const subject = `משוב חדש מ-${opts.username}`;
  const text = [
    "התקבל משוב חדש באתר תרגול תאוריה.",
    "",
    `משתמש: ${opts.username}`,
    `אימייל: ${opts.email || "—"}`,
    `נראות: ${stars(opts.appearanceRating)}`,
    `יעילות: ${stars(opts.efficiencyRating)}`,
    "",
    "משוב חופשי:",
    comment,
  ].join("\n");

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.6">
      <p>התקבל משוב חדש באתר <strong>תרגול תאוריה</strong>.</p>
      <p>
        <strong>משתמש:</strong> ${escapeHtml(opts.username)}<br>
        <strong>אימייל:</strong> ${escapeHtml(opts.email || "—")}<br>
        <strong>נראות:</strong> ${stars(opts.appearanceRating)}<br>
        <strong>יעילות:</strong> ${stars(opts.efficiencyRating)}
      </p>
      <p><strong>משוב חופשי:</strong></p>
      <p style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px">${escapeHtml(comment)}</p>
    </div>
  `;

  return sendMail({
    to: FEEDBACK_NOTIFY_EMAIL,
    subject,
    text,
    html,
  });
}
