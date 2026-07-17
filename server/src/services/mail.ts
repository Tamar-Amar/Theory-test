import nodemailer from "nodemailer";
import { getSmtpConfig } from "../config.js";

export async function sendPasswordResetEmail(opts: {
  to: string;
  resetUrl: string;
}): Promise<"sent" | "logged"> {
  const smtp = getSmtpConfig();
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

  if (!smtp) {
    console.info(
      `[password-reset] SMTP לא מוגדר — קישור איפוס עבור ${opts.to}:\n${opts.resetUrl}`
    );
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
    subject,
    text,
    html,
  });

  return "sent";
}
