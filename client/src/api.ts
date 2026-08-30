const TOKEN_KEY = "theory_token";

/** בפרודקשן (Vercel): כתבי ב־Environment Variables את כתובת ה־API ב־Render, ללא סלאש בסוף */
const API_BASE = (
  import.meta.env.VITE_API_BASE_URL as string | undefined
)?.replace(/\/$/, "") ?? "";

function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function authHeaders(): HeadersInit {
  const t = getStoredToken();
  const h: Record<string, string> = {};
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
}

export type Meta = {
  questionCount: number;
  categories: string[];
  licenseTypes: {
    id: string;
    label: string;
    questionCount: number;
  }[];
};

export type QuizQuestion = {
  index: number;
  text: string;
  options: string[];
  /** קישור ישיר לתמונה מהמאגר (תמרורים וכו׳) */
  imageUrl?: string;
};

export type StartQuizResponse = {
  sessionId: string;
  expiresAt: string;
  focusWeak: true;
  questions: QuizQuestion[];
};

export type LearningQuestion = {
  index: number;
  text: string;
  options: string[];
  correctIndex: number;
  imageUrl?: string;
};

export type StartLearningResponse = {
  focusWeak: true;
  questions: LearningQuestion[];
};

export type SubmitResponse = {
  score: number;
  total: number;
  percent: number;
  breakdown: {
    questionId: string;
    selectedIndex: number;
    correctIndex: number;
    isCorrect: boolean;
  }[];
};

export type AuthUser = {
  username: string;
  email: string;
  licenseType?: string;
  admin?: boolean;
  /** האם להציג את פופאפ המשוב החד-פעמי */
  needsUxFeedback?: boolean;
};

/** פירוט שאלה אחת לאחר מבחן (טקסטים כפי שהוצגו למשתמש) */
export type AttemptQuestionReview = {
  text: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  imageUrl?: string;
};

export type AttemptDetail = {
  id: string;
  createdAt: string;
  score: number;
  total: number;
  percent: number;
  category: string;
  licenseType: string;
  durationMs: number | null;
  items: AttemptQuestionReview[];
};

export type UserStats = {
  attemptsCount: number;
  /** ממוצע זמן לשאלה במילישניות - מחושב מכל המבחנים שיש בהם נתון זמן */
  averageMsPerQuestion: number | null;
  averagePercent: number | null;
  bestPercent: number | null;
  totalAnswered: number;
  totalCorrect: number;
  weakQuestionsCount: number;
  recentAttempts: {
    id: string;
    createdAt: string;
    score: number;
    total: number;
    percent: number;
    category: string;
    licenseType: string;
    /** זמן כולל חלקי מספר שאלות - להשוואה בין מבחנים באורכים שונים */
    avgMsPerQuestion: number | null;
    /** מבחנים לפני שמירת פירוט במסד - ללא כפתור פירוט */
    hasDetails: boolean;
  }[];
};

async function parseError(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as { error?: string };
    return j.error || res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<{ token: string; user: AuthUser }> {
  const res = await fetch(apiUrl("/api/auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function login(
  username: string,
  password: string
): Promise<{ token: string; user: AuthUser }> {
  const res = await fetch(apiUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  const res = await fetch(apiUrl("/api/auth/forgot-password"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function resetPassword(
  token: string,
  password: string
): Promise<{ message: string }> {
  const res = await fetch(apiUrl("/api/auth/reset-password"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function fetchMe(): Promise<AuthUser> {
  const res = await fetch(apiUrl("/api/auth/me"), { headers: authHeaders() });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function updateUserLicenseType(
  licenseType: string
): Promise<AuthUser> {
  const res = await fetch(apiUrl("/api/auth/me/license-type"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ licenseType }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function getMeta(): Promise<Meta> {
  const res = await fetch(apiUrl("/api/meta"));
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

/** מדווח על סיום מבחן ניסיון בדף הנחיתה (מונה במסך המנהל). שקט בכישלון. */
export async function recordDemoFinish(): Promise<void> {
  try {
    await fetch(apiUrl("/api/demo/finish"), { method: "POST" });
  } catch {
    /* מתעלמים - מדובר במדד בלבד */
  }
}

export async function fetchUserStats(): Promise<UserStats> {
  const res = await fetch(apiUrl("/api/stats"), { headers: authHeaders() });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export type AdminTicketRow = {
  id: string;
  username: string;
  email: string;
  body: string;
  createdAt: string;
};

export type AdminFeedbackRow = {
  id: string;
  username: string;
  email: string;
  appearanceRating: number;
  efficiencyRating: number;
  comment: string;
  createdAt: string;
};

export type AdminUserRow = {
  userId: string;
  username: string;
  email: string;
  attemptCount: number;
  registeredAt: string | null;
  lastLoginAt: string | null;
};

export type AdminStats = {
  userCount: number;
  totalAttempts: number;
  /** כמה פעמים סיימו מבחן ניסיון בדף הנחיתה */
  demoAttempts: number;
  users: AdminUserRow[];
  tickets: AdminTicketRow[];
  feedbackCount: number;
  avgAppearance: number | null;
  avgEfficiency: number | null;
  feedbacks: AdminFeedbackRow[];
};

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await fetch(apiUrl("/api/admin/stats"), {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function submitUxFeedback(payload: {
  appearanceRating: number;
  efficiencyRating: number;
  comment: string;
}): Promise<void> {
  const res = await fetch(apiUrl("/api/feedback"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function dismissUxFeedback(): Promise<void> {
  const res = await fetch(apiUrl("/api/feedback/dismiss"), {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function deleteAdminUser(userId: string): Promise<void> {
  const res = await fetch(
    apiUrl(`/api/admin/users/${encodeURIComponent(userId)}`),
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );
  if (!res.ok) throw new Error(await parseError(res));
}

export async function deleteAdminTicket(ticketId: string): Promise<void> {
  const res = await fetch(
    apiUrl(`/api/admin/tickets/${encodeURIComponent(ticketId)}`),
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );
  if (!res.ok) throw new Error(await parseError(res));
}

export async function deleteAdminFeedback(feedbackId: string): Promise<void> {
  const res = await fetch(
    apiUrl(`/api/admin/feedback/${encodeURIComponent(feedbackId)}`),
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );
  if (!res.ok) throw new Error(await parseError(res));
}

export async function submitSupportTicket(
  body: string,
  opts?: { guestName?: string; email?: string }
): Promise<void> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const payload: { body: string; name?: string; email?: string } = { body };

  if (opts?.email?.trim()) {
    payload.email = opts.email.trim();
  }
  if (opts?.guestName) {
    payload.name = opts.guestName;
  } else {
    Object.assign(headers, authHeaders());
  }

  const res = await fetch(apiUrl("/api/tickets"), {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await parseError(res));
}

export async function fetchAttemptDetail(
  attemptId: string
): Promise<AttemptDetail> {
  const res = await fetch(apiUrl(`/api/attempts/${attemptId}`), {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function createSession(
  count: number,
  category: string
): Promise<StartQuizResponse> {
  const res = await fetch(apiUrl("/api/sessions"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ count, category }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function submitSession(
  sessionId: string,
  answers: number[],
  durationMs: number,
  category: string
): Promise<SubmitResponse> {
  const res = await fetch(apiUrl(`/api/sessions/${sessionId}/submit`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ answers, durationMs, category }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function createLearningSession(
  count: number,
  category: string
): Promise<StartLearningResponse> {
  const res = await fetch(apiUrl("/api/learning/sessions"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({ count, category }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}
