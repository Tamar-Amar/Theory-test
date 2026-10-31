import { sendBroadcastEmail, type BroadcastDelivery } from "./mail.js";

/**
 * מצב שליחת הודעה לכל המשתמשים. נשמר בזיכרון התהליך — מתאים לשרת בודד
 * ארוך‑חיים; באתחול שרת באמצע שליחה המצב אובד.
 */
export type BroadcastStatus = {
  running: boolean;
  total: number;
  sent: number;
  failed: number;
  /** null עד שהשליחה הסתיימה */
  delivery: BroadcastDelivery | null;
  subject: string;
  startedAt: string | null;
  finishedAt: string | null;
};

const idle: BroadcastStatus = {
  running: false,
  total: 0,
  sent: 0,
  failed: 0,
  delivery: null,
  subject: "",
  startedAt: null,
  finishedAt: null,
};

let status: BroadcastStatus = { ...idle };

export function getBroadcastStatus(): BroadcastStatus {
  return { ...status };
}

/** מתחיל שליחה ברקע. מחזיר false אם שליחה אחרת כבר רצה (מונע שליחה כפולה). */
export function startBroadcast(opts: {
  recipients: string[];
  subject: string;
  body: string;
}): boolean {
  if (status.running) return false;

  status = {
    running: true,
    total: opts.recipients.length,
    sent: 0,
    failed: 0,
    delivery: null,
    subject: opts.subject,
    startedAt: new Date().toISOString(),
    finishedAt: null,
  };

  void sendBroadcastEmail({
    ...opts,
    onProgress: ({ sent, failed }) => {
      status = { ...status, sent, failed };
    },
  })
    .then((result) => {
      status = {
        ...status,
        running: false,
        sent: result.sent,
        failed: result.failed,
        delivery: result.delivery,
        finishedAt: new Date().toISOString(),
      };
    })
    .catch((e) => {
      console.error("[broadcast] שליחה נכשלה:", e);
      status = {
        ...status,
        running: false,
        failed: status.total - status.sent,
        delivery: "sent",
        finishedAt: new Date().toISOString(),
      };
    });

  return true;
}
