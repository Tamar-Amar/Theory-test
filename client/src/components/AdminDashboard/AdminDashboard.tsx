import { useEffect, useMemo, useState } from "react";
import {
  deleteAdminTicket,
  deleteAdminUser,
  fetchAdminStats,
  type AdminStats,
  type AdminTicketRow,
  type AdminUserRow,
} from "../../api";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { LoadingState } from "../LoadingState/LoadingState";
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

type UserSortKey = keyof Pick<
  AdminUserRow,
  "username" | "email" | "registeredAt" | "lastLoginAt" | "attemptCount"
>;

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

const USER_SORT_LABELS: Record<UserSortKey, string> = {
  username: "שם משתמש",
  email: "אימייל",
  registeredAt: "תאריך הרשמה",
  lastLoginAt: "כניסה אחרונה",
  attemptCount: "מבחנים שהושלמו",
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

export function AdminDashboard() {
  const [data, setData] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [deleteErr, setDeleteErr] = useState<string | null>(null);
  const [ticketDeleteErr, setTicketDeleteErr] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingTicketId, setDeletingTicketId] = useState<string | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [userSortKey, setUserSortKey] = useState<UserSortKey>("username");
  const [userSortAsc, setUserSortAsc] = useState(true);
  const [ticketSearch, setTicketSearch] = useState("");
  const [ticketSortKey, setTicketSortKey] = useState<TicketSortKey>("createdAt");
  const [ticketSortAsc, setTicketSortAsc] = useState(false);

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
      `למחוק את המשתמש "${u.username}"?\n\nיימחקו לצמיתות כל הנתונים שלו: מבחנים, סשנים פעילים, סטטיסטיקות שאלות ופניות תמיכה. לא ניתן לבטל.`
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
    const preview =
      t.body.length > 80 ? `${t.body.slice(0, 80).trim()}…` : t.body;
    const ok = window.confirm(
      `למחוק את הפנייה מ"${t.username}"?\n\n"${preview}"\n\nלא ניתן לבטל.`
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

  function handleUserSort(key: UserSortKey) {
    if (userSortKey === key) {
      setUserSortAsc((prev) => !prev);
      return;
    }
    setUserSortKey(key);
    setUserSortAsc(true);
  }

  function handleTicketSort(key: TicketSortKey) {
    if (ticketSortKey === key) {
      setTicketSortAsc((prev) => !prev);
      return;
    }
    setTicketSortKey(key);
    setTicketSortAsc(key !== "createdAt");
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

  const visibleTickets = useMemo(() => {
    if (!data) return [];

    const q = ticketSearch.trim().toLowerCase();
    const filtered = q
      ? data.tickets.filter(
          (t) =>
            t.username.toLowerCase().includes(q) ||
            t.email.toLowerCase().includes(q) ||
            t.body.toLowerCase().includes(q)
        )
      : data.tickets;

    return [...filtered].sort((a, b) =>
      compareTickets(a, b, ticketSortKey, ticketSortAsc)
    );
  }, [data, ticketSearch, ticketSortKey, ticketSortAsc]);

  if (loading) {
    return <LoadingState />;
  }

  if (err) {
    return <ErrorAlert>{err}</ErrorAlert>;
  }

  if (!data) {
    return null;
  }

  const withAttempts = data.users.filter((u) => u.attemptCount > 0).length;
  const approxNoTests = Math.max(0, data.userCount - withAttempts);

  return (
    <S.Root>
      <S.SummaryGrid>
        <S.StatCard>
          <S.StatValue>{data.userCount}</S.StatValue>
          <S.StatLabel>משתמשים רשומים</S.StatLabel>
        </S.StatCard>
        <S.StatCard>
          <S.StatValue>{data.totalAttempts}</S.StatValue>
          <S.StatLabel>מבחנים שהושלמו (סה״כ)</S.StatLabel>
        </S.StatCard>
        <S.StatCard>
          <S.StatValue>{data.demoAttempts}</S.StatValue>
          <S.StatLabel>מבחני ניסיון שהושלמו</S.StatLabel>
        </S.StatCard>
        <S.StatCard>
          <S.StatValue>{withAttempts}</S.StatValue>
          <S.StatLabel>משתמשים עם לפחות מבחן אחד</S.StatLabel>
        </S.StatCard>
        <S.StatCard>
          <S.StatValue>{approxNoTests}</S.StatValue>
          <S.StatLabel>משתמשים בלי מבחנים (הערכה)</S.StatLabel>
        </S.StatCard>
        <S.StatCard>
          <S.StatValue>{data.tickets.length}</S.StatValue>
          <S.StatLabel>פניות אחרונות (עד 200)</S.StatLabel>
        </S.StatCard>
      </S.SummaryGrid>

      <div>
        <S.SectionTitle>משתמשים</S.SectionTitle>
        {deleteErr ? <ErrorAlert>{deleteErr}</ErrorAlert> : null}
        {data.users.length === 0 ? (
          <S.Empty>אין משתמשים רשומים במערכת.</S.Empty>
        ) : (
          <>
            <S.UsersToolbar>
              <S.SearchInput
                type="search"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="חיפוש לפי שם משתמש או אימייל…"
                aria-label="חיפוש משתמשים לפי שם או אימייל"
              />
            </S.UsersToolbar>
            {visibleUsers.length === 0 ? (
              <S.Empty>לא נמצאו משתמשים התואמים לחיפוש.</S.Empty>
            ) : (
              <S.ScrollableTableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      {(Object.keys(USER_SORT_LABELS) as UserSortKey[]).map(
                        (key) => (
                          <S.SortableTh
                            key={key}
                            $active={userSortKey === key}
                            onClick={() => handleUserSort(key)}
                            aria-sort={
                              userSortKey === key
                                ? userSortAsc
                                  ? "ascending"
                                  : "descending"
                                : "none"
                            }
                          >
                            {USER_SORT_LABELS[key]}
                            {userSortKey === key ? (
                              <S.SortIndicator aria-hidden>
                                {userSortAsc ? "↑" : "↓"}
                              </S.SortIndicator>
                            ) : null}
                          </S.SortableTh>
                        )
                      )}
                      <S.ThActions>פעולות</S.ThActions>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleUsers.map((u) => (
                      <S.Tr key={u.userId}>
                        <S.Td>{u.username}</S.Td>
                        <S.Td>{u.email || "-"}</S.Td>
                        <S.TdDate>{formatWhen(u.registeredAt)}</S.TdDate>
                        <S.TdDate>{formatWhen(u.lastLoginAt)}</S.TdDate>
                        <S.Td>{u.attemptCount}</S.Td>
                        <S.TdActions>
                          <S.DeleteButton
                            type="button"
                            disabled={deletingId !== null}
                            onClick={() => handleDeleteUser(u)}
                            aria-label={
                              deletingId === u.userId
                                ? "מוחק משתמש"
                                : `מחק משתמש ${u.username}`
                            }
                            title="מחק משתמש"
                          >
                            <TrashIcon />
                          </S.DeleteButton>
                        </S.TdActions>
                      </S.Tr>
                    ))}
                  </tbody>
                </S.Table>
              </S.ScrollableTableWrap>
            )}
          </>
        )}
      </div>

      <div>
        <S.SectionTitle>פניות מהמשתמשים</S.SectionTitle>
        {ticketDeleteErr ? <ErrorAlert>{ticketDeleteErr}</ErrorAlert> : null}
        {data.tickets.length === 0 ? (
          <S.Empty>אין פניות עדיין.</S.Empty>
        ) : (
          <>
            <S.UsersToolbar>
              <S.SearchInput
                type="search"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                placeholder="חיפוש לפי משתמש, אימייל או תוכן…"
                aria-label="חיפוש פניות לפי משתמש, אימייל או תוכן"
              />
            </S.UsersToolbar>
            {visibleTickets.length === 0 ? (
              <S.Empty>לא נמצאו פניות התואמות לחיפוש.</S.Empty>
            ) : (
              <S.ScrollableTableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      {(Object.keys(TICKET_SORT_LABELS) as TicketSortKey[]).map(
                        (key) => (
                          <S.SortableTh
                            key={key}
                            $active={ticketSortKey === key}
                            onClick={() => handleTicketSort(key)}
                            aria-sort={
                              ticketSortKey === key
                                ? ticketSortAsc
                                  ? "ascending"
                                  : "descending"
                                : "none"
                            }
                          >
                            {TICKET_SORT_LABELS[key]}
                            {ticketSortKey === key ? (
                              <S.SortIndicator aria-hidden>
                                {ticketSortAsc ? "↑" : "↓"}
                              </S.SortIndicator>
                            ) : null}
                          </S.SortableTh>
                        )
                      )}
                      <S.ThActions>פעולות</S.ThActions>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTickets.map((t) => (
                      <S.Tr key={t.id}>
                        <S.TdDate>{formatWhen(t.createdAt)}</S.TdDate>
                        <S.Td>{t.username}</S.Td>
                        <S.Td>{t.email || "-"}</S.Td>
                        <S.Td>
                          <S.TicketBody>{t.body}</S.TicketBody>
                        </S.Td>
                        <S.TdActions>
                          <S.DeleteButton
                            type="button"
                            disabled={deletingTicketId !== null}
                            onClick={() => handleDeleteTicket(t)}
                            aria-label={
                              deletingTicketId === t.id
                                ? "מוחק פנייה"
                                : `מחק פנייה מ${t.username}`
                            }
                            title="מחק פנייה"
                          >
                            <TrashIcon />
                          </S.DeleteButton>
                        </S.TdActions>
                      </S.Tr>
                    ))}
                  </tbody>
                </S.Table>
              </S.ScrollableTableWrap>
            )}
          </>
        )}
      </div>
    </S.Root>
  );
}
