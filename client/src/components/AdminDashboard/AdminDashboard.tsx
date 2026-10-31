import { useEffect, useMemo, useState } from "react";
import {
  deleteAdminFeedback,
  deleteAdminTicket,
  deleteAdminUser,
  fetchAdminStats,
  type AdminFeedbackRow,
  type AdminStats,
  type AdminTicketRow,
  type AdminUserRow,
} from "../../api";
import { PASS_STORY_PREFIX } from "../../constants/stories";
import { formatShortDate } from "../../utils/formatShortDate";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { FieldInput, FormField } from "../FormField/FormField";
import { LoadingState } from "../LoadingState/LoadingState";
import { StatCard } from "../StatCard/StatCard";
import { Tag } from "../Tag/Tag";
import { BroadcastPanel } from "./BroadcastPanel";
import * as S from "./AdminDashboard.styles";

function formatWhen(iso: string | null | undefined) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("he-IL", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

/** תאריך בלבד, למשל "28.10.2026" */
function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return formatShortDate(d);
}

/** "היום, 09:12" / "אתמול" / "28.10.2026" — כמו ב‑Figma */
function formatLastLogin(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const startOfDay = (x: Date) =>
    new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const dayDiff = Math.round(
    (startOfDay(new Date()) - startOfDay(d)) / 86_400_000
  );
  if (dayDiff === 0) {
    const hhmm = d.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `היום, ${hhmm}`;
  }
  if (dayDiff === 1) return "אתמול";
  return formatShortDate(d);
}

type AdminTab = "users" | "tickets" | "feedback" | "stories" | "broadcast";

/** הסדר כאן הוא הסדר מימין לשמאל (RTL) */
const TABS: { id: AdminTab; label: string }[] = [
  { id: "users", label: "משתמשים" },
  { id: "tickets", label: "פניות" },
  { id: "feedback", label: "משובים" },
  { id: "stories", label: "סיפורי הצלחה" },
  { id: "broadcast", label: "שליחת מייל" },
];

const SEARCH_LABELS: Record<AdminTab, string> = {
  users: "חיפוש משתמשים",
  tickets: "חיפוש פניות",
  feedback: "חיפוש משובים",
  stories: "חיפוש סיפורי הצלחה",
  broadcast: "",
};

const SEARCH_PLACEHOLDERS: Record<AdminTab, string> = {
  users: "חיפוש לפי שם משתמש או אימייל…",
  tickets: "חיפוש לפי משתמש, אימייל או תוכן…",
  feedback: "חיפוש לפי משתמש, אימייל או משוב…",
  stories: "חיפוש לפי משתמש, אימייל או תוכן הסיפור…",
  broadcast: "",
};

type UserSortKey = keyof Pick<
  AdminUserRow,
  | "username"
  | "email"
  | "licenseType"
  | "attemptCount"
  | "registeredAt"
  | "lastLoginAt"
>;

/** הסדר כאן קובע את סדר העמודות (מימין לשמאל) */
const USER_SORT_LABELS: Record<UserSortKey, string> = {
  username: "שם משתמש",
  email: "אימייל",
  licenseType: "סוג רישיון",
  attemptCount: "מבחנים",
  registeredAt: "תאריך הרשמה",
  lastLoginAt: "כניסה אחרונה",
};

function compareUsers(
  a: AdminUserRow,
  b: AdminUserRow,
  key: UserSortKey,
  asc: boolean
) {
  const mul = asc ? 1 : -1;

  if (key === "attemptCount") {
    return (a.attemptCount - b.attemptCount) * mul;
  }

  if (key === "registeredAt" || key === "lastLoginAt") {
    const at = a[key] ? new Date(a[key]!).getTime() : 0;
    const bt = b[key] ? new Date(b[key]!).getTime() : 0;
    return (at - bt) * mul;
  }

  return (
    String(a[key] ?? "").localeCompare(String(b[key] ?? ""), "he", {
      sensitivity: "base",
    }) * mul
  );
}

type TicketSortKey = keyof Pick<
  AdminTicketRow,
  "createdAt" | "username" | "email" | "body"
>;

const TICKET_SORT_LABELS: Record<TicketSortKey, string> = {
  createdAt: "תאריך",
  username: "משתמש",
  email: "אימייל",
  body: "תוכן",
};

const STORY_SORT_LABELS: Record<TicketSortKey, string> = {
  createdAt: "תאריך",
  username: "משתמש",
  email: "אימייל",
  body: "הסיפור",
};

function compareTickets(
  a: AdminTicketRow,
  b: AdminTicketRow,
  key: TicketSortKey,
  asc: boolean
) {
  const mul = asc ? 1 : -1;

  if (key === "createdAt") {
    return (
      (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * mul
    );
  }

  return (
    String(a[key] ?? "").localeCompare(String(b[key] ?? ""), "he", {
      sensitivity: "base",
    }) * mul
  );
}

type FeedbackSortKey = keyof Pick<
  AdminFeedbackRow,
  "createdAt" | "username" | "appearanceRating" | "efficiencyRating" | "comment"
>;

const FEEDBACK_SORT_LABELS: Record<FeedbackSortKey, string> = {
  createdAt: "תאריך",
  username: "משתמש",
  appearanceRating: "נראות",
  efficiencyRating: "יעילות",
  comment: "משוב",
};

function compareFeedback(
  a: AdminFeedbackRow,
  b: AdminFeedbackRow,
  key: FeedbackSortKey,
  asc: boolean
) {
  const mul = asc ? 1 : -1;

  if (key === "createdAt") {
    return (
      (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * mul
    );
  }

  if (key === "appearanceRating" || key === "efficiencyRating") {
    return (a[key] - b[key]) * mul;
  }

  return (
    String(a[key] ?? "").localeCompare(String(b[key] ?? ""), "he", {
      sensitivity: "base",
    }) * mul
  );
}

function formatAvg(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return "—";
  return n.toLocaleString("he-IL", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });
}

const isStory = (t: AdminTicketRow) => t.body.startsWith(PASS_STORY_PREFIX);
const storyText = (t: AdminTicketRow) =>
  t.body.slice(PASS_STORY_PREFIX.length).trim();

function StarsCell({ value }: { value: number }) {
  const filled = Math.min(5, Math.max(0, Math.round(value)));
  return (
    <S.StarsCell aria-label={`${filled} מתוך 5`}>
      {"★".repeat(filled)}
      {"☆".repeat(5 - filled)}
    </S.StarsCell>
  );
}

/** מספר שורות בעמוד בכל טבלאות הניהול */
const PAGE_SIZE = 10;

/** רשימת מספרי עמודים להצגה: הכול אם מעט, אחרת 1 … סביב הנוכחי … אחרון */
function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const wanted = new Set([1, total, current - 1, current, current + 1]);
  const nums = [...wanted]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

type PageInfo = { current: number; total: number; count: number };

/** מעבר בין דפי הטבלה — מוצג רק כשיש יותר מעמוד אחד */
function Pager({
  info,
  onPage,
}: {
  info: PageInfo;
  onPage: (page: number) => void;
}) {
  const { current, total, count } = info;
  if (count <= PAGE_SIZE) return null;
  const from = (current - 1) * PAGE_SIZE + 1;
  const to = Math.min(current * PAGE_SIZE, count);
  return (
    <S.Pager aria-label="מעבר בין דפי הטבלה">
      <S.PagerInfo>
        מציג {from} עד {to} מתוך {count}
      </S.PagerInfo>
      <S.PagerButtons>
        <S.PageBtn
          type="button"
          disabled={current === 1}
          onClick={() => onPage(current - 1)}
        >
          הקודם
        </S.PageBtn>
        {pageList(current, total).map((p, i) =>
          p === "…" ? (
            <S.PagerGap key={`gap-${i}`} aria-hidden>
              …
            </S.PagerGap>
          ) : (
            <S.PageBtn
              key={p}
              type="button"
              $active={p === current}
              aria-current={p === current ? "page" : undefined}
              onClick={() => onPage(p)}
            >
              {p}
            </S.PageBtn>
          )
        )}
        <S.PageBtn
          type="button"
          disabled={current === total}
          onClick={() => onPage(current + 1)}
        >
          הבא
        </S.PageBtn>
      </S.PagerButtons>
    </S.Pager>
  );
}

/** תאי כותרת ממוינים לטבלה — מציג חץ כיוון בעמודה הפעילה */
function SortHead<K extends string>({
  labels,
  activeKey,
  asc,
  showIndicator,
  onSort,
}: {
  labels: Record<K, string>;
  activeKey: K;
  asc: boolean;
  /** חץ כיוון מוצג רק אחרי שהמשתמש מיין בעצמו (כמו בעיצוב) */
  showIndicator: boolean;
  onSort: (key: K) => void;
}) {
  return (
    <>
      {(Object.keys(labels) as K[]).map((key) => (
        <S.SortableTh
          key={key}
          $active={activeKey === key}
          onClick={() => onSort(key)}
          aria-sort={
            activeKey === key ? (asc ? "ascending" : "descending") : "none"
          }
        >
          {labels[key]}
          {showIndicator && activeKey === key ? (
            <S.SortIndicator aria-hidden>{asc ? "↑" : "↓"}</S.SortIndicator>
          ) : null}
        </S.SortableTh>
      ))}
    </>
  );
}

export function AdminDashboard() {
  const [data, setData] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [tab, setTab] = useState<AdminTab>("users");
  const [deleteErr, setDeleteErr] = useState<string | null>(null);
  const [ticketDeleteErr, setTicketDeleteErr] = useState<string | null>(null);
  const [feedbackDeleteErr, setFeedbackDeleteErr] = useState<string | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null);
  const [deletingFeedbackId, setDeletingFeedbackId] = useState<string | null>(
    null
  );
  const [userSearch, setUserSearch] = useState("");
  const [userSortKey, setUserSortKey] = useState<UserSortKey>("username");
  const [userSortAsc, setUserSortAsc] = useState(true);
  const [ticketSearch, setTicketSearch] = useState("");
  const [storySearch, setStorySearch] = useState("");
  const [ticketSortKey, setTicketSortKey] = useState<TicketSortKey>("createdAt");
  const [ticketSortAsc, setTicketSortAsc] = useState(false);
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackSortKey, setFeedbackSortKey] =
    useState<FeedbackSortKey>("createdAt");
  const [feedbackSortAsc, setFeedbackSortAsc] = useState(false);
  const [sortTouched, setSortTouched] = useState({
    users: false,
    tickets: false,
    feedback: false,
  });

  const [page, setPage] = useState(1);

  // חיפוש, מיון או מעבר טאב — חוזרים לעמוד הראשון
  useEffect(() => {
    setPage(1);
  }, [
    tab,
    userSearch,
    ticketSearch,
    storySearch,
    feedbackSearch,
    userSortKey,
    userSortAsc,
    ticketSortKey,
    ticketSortAsc,
    feedbackSortKey,
    feedbackSortAsc,
  ]);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    fetchAdminStats()
      .then(setData)
      .catch((e) =>
        setErr(e instanceof Error ? e.message : "שגיאת טעינה")
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleDeleteUser(u: {
    userId: string;
    username: string;
  }) {
    const ok = window.confirm(
      `למחוק את המשתמש "${u.username}"?\n\nיימחקו לצמיתות כל הנתונים שלו: מבחנים, סשנים פעילים, סטטיסטיקות שאלות, פניות תמיכה ומשוב. לא ניתן לבטל.`
    );
    if (!ok) return;
    setDeletingId(u.userId);
    setDeleteErr(null);
    try {
      await deleteAdminUser(u.userId);
      setData(await fetchAdminStats());
    } catch (e) {
      setDeleteErr(e instanceof Error ? e.message : "מחיקה נכשלה");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleDeleteTicket(t: AdminTicketRow) {
    const shown = isStory(t) ? storyText(t) : t.body;
    const preview =
      shown.length > 80 ? `${shown.slice(0, 80).trim()}…` : shown;
    const ok = window.confirm(
      `למחוק את ${isStory(t) ? "הסיפור" : "הפנייה"} מ"${t.username}"?\n\n"${preview}"\n\nלא ניתן לבטל.`
    );
    if (!ok) return;
    setDeletingTicketId(t.id);
    setTicketDeleteErr(null);
    try {
      await deleteAdminTicket(t.id);
      setData(await fetchAdminStats());
    } catch (e) {
      setTicketDeleteErr(e instanceof Error ? e.message : "מחיקה נכשלה");
    } finally {
      setDeletingTicketId(null);
    }
  }

  async function handleDeleteFeedback(f: AdminFeedbackRow) {
    const preview = f.comment.trim()
      ? f.comment.length > 80
        ? `${f.comment.slice(0, 80).trim()}…`
        : f.comment
      : "(ללא טקסט)";
    const ok = window.confirm(
      `למחוק את המשוב מ"${f.username}"?\n\n"${preview}"\n\nלא ניתן לבטל.`
    );
    if (!ok) return;
    setDeletingFeedbackId(f.id);
    setFeedbackDeleteErr(null);
    try {
      await deleteAdminFeedback(f.id);
      setData(await fetchAdminStats());
    } catch (e) {
      setFeedbackDeleteErr(e instanceof Error ? e.message : "מחיקה נכשלה");
    } finally {
      setDeletingFeedbackId(null);
    }
  }

  function handleUserSort(key: UserSortKey) {
    setSortTouched((p) => ({ ...p, users: true }));
    if (userSortKey === key) {
      setUserSortAsc((prev) => !prev);
      return;
    }
    setUserSortKey(key);
    setUserSortAsc(true);
  }

  function handleTicketSort(key: TicketSortKey) {
    setSortTouched((p) => ({ ...p, tickets: true }));
    if (ticketSortKey === key) {
      setTicketSortAsc((prev) => !prev);
      return;
    }
    setTicketSortKey(key);
    setTicketSortAsc(key !== "createdAt");
  }

  function handleFeedbackSort(key: FeedbackSortKey) {
    setSortTouched((p) => ({ ...p, feedback: true }));
    if (feedbackSortKey === key) {
      setFeedbackSortAsc((prev) => !prev);
      return;
    }
    setFeedbackSortKey(key);
    setFeedbackSortAsc(key !== "createdAt");
  }

  const visibleUsers = useMemo(() => {
    if (!data) return [];

    const q = userSearch.trim().toLowerCase();
    const filtered = q
      ? data.users.filter(
          (u) =>
            u.username.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        )
      : data.users;

    return [...filtered].sort((a, b) =>
      compareUsers(a, b, userSortKey, userSortAsc)
    );
  }, [data, userSearch, userSortKey, userSortAsc]);

  const plainTickets = useMemo(
    () => (data ? data.tickets.filter((t) => !isStory(t)) : []),
    [data]
  );
  const storyTickets = useMemo(
    () => (data ? data.tickets.filter(isStory) : []),
    [data]
  );

  const visibleTickets = useMemo(() => {
    const q = ticketSearch.trim().toLowerCase();
    const filtered = q
      ? plainTickets.filter(
          (t) =>
            t.username.toLowerCase().includes(q) ||
            t.email.toLowerCase().includes(q) ||
            t.body.toLowerCase().includes(q)
        )
      : plainTickets;

    return [...filtered].sort((a, b) =>
      compareTickets(a, b, ticketSortKey, ticketSortAsc)
    );
  }, [plainTickets, ticketSearch, ticketSortKey, ticketSortAsc]);

  const visibleStories = useMemo(() => {
    const q = storySearch.trim().toLowerCase();
    const filtered = q
      ? storyTickets.filter(
          (t) =>
            t.username.toLowerCase().includes(q) ||
            t.email.toLowerCase().includes(q) ||
            storyText(t).toLowerCase().includes(q)
        )
      : storyTickets;

    return [...filtered].sort((a, b) =>
      compareTickets(a, b, ticketSortKey, ticketSortAsc)
    );
  }, [storyTickets, storySearch, ticketSortKey, ticketSortAsc]);

  const visibleFeedbacks = useMemo(() => {
    if (!data) return [];

    const list = data.feedbacks ?? [];
    const q = feedbackSearch.trim().toLowerCase();
    const filtered = q
      ? list.filter(
          (f) =>
            f.username.toLowerCase().includes(q) ||
            f.email.toLowerCase().includes(q) ||
            f.comment.toLowerCase().includes(q)
        )
      : list;

    return [...filtered].sort((a, b) =>
      compareFeedback(a, b, feedbackSortKey, feedbackSortAsc)
    );
  }, [data, feedbackSearch, feedbackSortKey, feedbackSortAsc]);

  if (loading) {
    return <LoadingState />;
  }

  if (err) {
    return <ErrorAlert>{err}</ErrorAlert>;
  }

  if (!data) {
    return null;
  }

  const paginate = <T,>(items: T[]) => {
    const total = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const current = Math.min(page, total);
    return {
      rows: items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
      info: { current, total, count: items.length } as PageInfo,
    };
  };
  const usersPage = paginate(visibleUsers);
  const ticketsPage = paginate(visibleTickets);
  const feedbackPage = paginate(visibleFeedbacks);
  const storiesPage = paginate(visibleStories);

  const emailRecipients = new Set(
    data.users.map((u) => u.email.trim().toLowerCase()).filter(Boolean)
  ).size;

  const searchValue =
    tab === "users"
      ? userSearch
      : tab === "tickets"
        ? ticketSearch
        : tab === "feedback"
          ? feedbackSearch
          : storySearch;

  const onSearch = (value: string) => {
    if (tab === "users") setUserSearch(value);
    else if (tab === "tickets") setTicketSearch(value);
    else if (tab === "feedback") setFeedbackSearch(value);
    else setStorySearch(value);
  };

  const tabHasRows =
    tab === "users"
      ? data.users.length > 0
      : tab === "tickets"
        ? plainTickets.length > 0
        : tab === "feedback"
          ? (data.feedbacks ?? []).length > 0
          : tab === "stories"
            ? storyTickets.length > 0
            : false;

  return (
    <S.Root>
      <S.TitleRow>
        <S.Title>לוח ניהול</S.Title>
        <Tag variant="warm">מנהל מערכת</Tag>
      </S.TitleRow>

      <S.StatsGrid>
        <StatCard
          value={data.userCount.toLocaleString("he-IL")}
          label="משתמשים רשומים"
        />
        <StatCard
          value={data.demoAttempts.toLocaleString("he-IL")}
          label="מבחני ניסיון שהושלמו"
        />
        <StatCard
          value={formatAvg(data.avgEfficiency)}
          label="דירוג יעילות ממוצע"
        />
        <StatCard value={plainTickets.length} label="פניות פתוחות" />
      </S.StatsGrid>

      <S.Tabs role="tablist" aria-label="אזורי ניהול">
        {TABS.map((t) => (
          <S.Tab
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            $active={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </S.Tab>
        ))}
      </S.Tabs>

      {tab === "users" && deleteErr ? <ErrorAlert>{deleteErr}</ErrorAlert> : null}
      {(tab === "tickets" || tab === "stories") && ticketDeleteErr ? (
        <ErrorAlert>{ticketDeleteErr}</ErrorAlert>
      ) : null}
      {tab === "feedback" && feedbackDeleteErr ? (
        <ErrorAlert>{feedbackDeleteErr}</ErrorAlert>
      ) : null}

      {tabHasRows ? (
        <S.SearchBlock>
          <FormField id="admin-search" label={SEARCH_LABELS[tab]}>
            <FieldInput
              id="admin-search"
              type="search"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={SEARCH_PLACEHOLDERS[tab]}
              aria-label={SEARCH_LABELS[tab]}
            />
          </FormField>
        </S.SearchBlock>
      ) : null}

      {tab === "users" &&
        (data.users.length === 0 ? (
          <S.Empty>אין משתמשים רשומים במערכת.</S.Empty>
        ) : visibleUsers.length === 0 ? (
          <S.Empty>לא נמצאו משתמשים התואמים לחיפוש.</S.Empty>
        ) : (
          <S.TableCard>
            <S.TableScroll>
            <S.Table>
              <thead>
                <tr>
                  <SortHead
                    labels={USER_SORT_LABELS}
                    activeKey={userSortKey}
                    asc={userSortAsc}
                    showIndicator={sortTouched.users}
                    onSort={handleUserSort}
                  />
                  <S.Th aria-label="פעולות" />
                </tr>
              </thead>
              <tbody>
                {usersPage.rows.map((u) => (
                  <S.Tr key={u.userId}>
                    <S.Td>{u.username}</S.Td>
                    <S.Td>{u.email || "-"}</S.Td>
                    <S.Td>{u.licenseType || "-"}</S.Td>
                    <S.TdNum>{u.attemptCount}</S.TdNum>
                    <S.Td>{formatDate(u.registeredAt)}</S.Td>
                    <S.Td>{formatLastLogin(u.lastLoginAt)}</S.Td>
                    <S.Td>
                      <S.DeleteButton
                        type="button"
                        disabled={deletingId !== null}
                        onClick={() => handleDeleteUser(u)}
                        aria-label={
                          deletingId === u.userId
                            ? "מוחק משתמש"
                            : `מחק משתמש ${u.username}`
                        }
                      >
                        מחיקה
                      </S.DeleteButton>
                    </S.Td>
                  </S.Tr>
                ))}
              </tbody>
            </S.Table>
            </S.TableScroll>
            <Pager info={usersPage.info} onPage={setPage} />
          </S.TableCard>
        ))}

      {tab === "tickets" &&
        (plainTickets.length === 0 ? (
          <S.Empty>אין פניות עדיין.</S.Empty>
        ) : visibleTickets.length === 0 ? (
          <S.Empty>לא נמצאו פניות התואמות לחיפוש.</S.Empty>
        ) : (
          <S.TableCard>
            <S.TableScroll>
            <S.Table>
              <thead>
                <tr>
                  <SortHead
                    labels={TICKET_SORT_LABELS}
                    activeKey={ticketSortKey}
                    asc={ticketSortAsc}
                    showIndicator={sortTouched.tickets}
                    onSort={handleTicketSort}
                  />
                  <S.Th aria-label="פעולות" />
                </tr>
              </thead>
              <tbody>
                {ticketsPage.rows.map((t) => (
                  <S.Tr key={t.id}>
                    <S.Td>{formatWhen(t.createdAt)}</S.Td>
                    <S.Td>{t.username}</S.Td>
                    <S.Td>{t.email || "-"}</S.Td>
                    <S.Td>
                      <S.TicketBody>{t.body}</S.TicketBody>
                    </S.Td>
                    <S.Td>
                      <S.DeleteButton
                        type="button"
                        disabled={deletingTicketId !== null}
                        onClick={() => handleDeleteTicket(t)}
                        aria-label={
                          deletingTicketId === t.id
                            ? "מוחק פנייה"
                            : `מחק פנייה מ${t.username}`
                        }
                      >
                        מחיקה
                      </S.DeleteButton>
                    </S.Td>
                  </S.Tr>
                ))}
              </tbody>
            </S.Table>
            </S.TableScroll>
            <Pager info={ticketsPage.info} onPage={setPage} />
          </S.TableCard>
        ))}

      {tab === "feedback" &&
        ((data.feedbacks ?? []).length === 0 ? (
          <S.Empty>אין משובים עדיין.</S.Empty>
        ) : visibleFeedbacks.length === 0 ? (
          <S.Empty>לא נמצאו משובים התואמים לחיפוש.</S.Empty>
        ) : (
          <S.TableCard>
            <S.TableScroll>
            <S.Table>
              <thead>
                <tr>
                  <SortHead
                    labels={FEEDBACK_SORT_LABELS}
                    activeKey={feedbackSortKey}
                    asc={feedbackSortAsc}
                    showIndicator={sortTouched.feedback}
                    onSort={handleFeedbackSort}
                  />
                  <S.Th aria-label="פעולות" />
                </tr>
              </thead>
              <tbody>
                {feedbackPage.rows.map((f) => (
                  <S.Tr key={f.id}>
                    <S.Td>{formatWhen(f.createdAt)}</S.Td>
                    <S.Td>{f.username}</S.Td>
                    <S.Td>
                      <StarsCell value={f.appearanceRating} />
                    </S.Td>
                    <S.Td>
                      <StarsCell value={f.efficiencyRating} />
                    </S.Td>
                    <S.Td>
                      <S.TicketBody>
                        {f.comment.trim() ? f.comment : "—"}
                      </S.TicketBody>
                    </S.Td>
                    <S.Td>
                      <S.DeleteButton
                        type="button"
                        disabled={deletingFeedbackId !== null}
                        onClick={() => handleDeleteFeedback(f)}
                        aria-label={
                          deletingFeedbackId === f.id
                            ? "מוחק משוב"
                            : `מחק משוב מ${f.username}`
                        }
                      >
                        מחיקה
                      </S.DeleteButton>
                    </S.Td>
                  </S.Tr>
                ))}
              </tbody>
            </S.Table>
            </S.TableScroll>
            <Pager info={feedbackPage.info} onPage={setPage} />
          </S.TableCard>
        ))}

      {tab === "broadcast" && (
        <BroadcastPanel recipientCount={emailRecipients} />
      )}

      {tab === "stories" &&
        (storyTickets.length === 0 ? (
          <S.Empty>אין סיפורי הצלחה עדיין.</S.Empty>
        ) : visibleStories.length === 0 ? (
          <S.Empty>לא נמצאו סיפורי הצלחה התואמים לחיפוש.</S.Empty>
        ) : (
          <S.TableCard>
            <S.TableScroll>
            <S.Table>
              <thead>
                <tr>
                  <SortHead
                    labels={STORY_SORT_LABELS}
                    activeKey={ticketSortKey}
                    asc={ticketSortAsc}
                    showIndicator={sortTouched.tickets}
                    onSort={handleTicketSort}
                  />
                  <S.Th aria-label="פעולות" />
                </tr>
              </thead>
              <tbody>
                {storiesPage.rows.map((t) => (
                  <S.Tr key={t.id}>
                    <S.Td>{formatWhen(t.createdAt)}</S.Td>
                    <S.Td>{t.username}</S.Td>
                    <S.Td>{t.email || "-"}</S.Td>
                    <S.Td>
                      <S.TicketBody>{storyText(t)}</S.TicketBody>
                    </S.Td>
                    <S.Td>
                      <S.DeleteButton
                        type="button"
                        disabled={deletingTicketId !== null}
                        onClick={() => handleDeleteTicket(t)}
                        aria-label={
                          deletingTicketId === t.id
                            ? "מוחק סיפור"
                            : `מחק סיפור מ${t.username}`
                        }
                      >
                        מחיקה
                      </S.DeleteButton>
                    </S.Td>
                  </S.Tr>
                ))}
              </tbody>
            </S.Table>
            </S.TableScroll>
            <Pager info={storiesPage.info} onPage={setPage} />
          </S.TableCard>
        ))}
    </S.Root>
  );
}
