import { useEffect, useState } from "react";
import {
  deleteAdminUser,
  fetchAdminStats,
  type AdminStats,
} from "../../api";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { LoadingState } from "../LoadingState/LoadingState";
import * as S from "./AdminDashboard.styles";

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString("he-IL", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function AdminDashboard() {
  const [data, setData] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [deleteErr, setDeleteErr] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
          <S.TableWrap>
            <S.Table>
              <thead>
                <tr>
                  <S.Th>שם משתמש</S.Th>
                  <S.Th>אימייל</S.Th>
                  <S.Th>מבחנים שהושלמו</S.Th>
                  <S.Th>פעולות</S.Th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((u) => (
                  <S.Tr key={u.userId}>
                    <S.Td>{u.username}</S.Td>
                    <S.Td>{u.email || "—"}</S.Td>
                    <S.Td>{u.attemptCount}</S.Td>
                    <S.Td>
                      <S.DeleteButton
                        type="button"
                        disabled={deletingId !== null}
                        onClick={() => handleDeleteUser(u)}
                      >
                        {deletingId === u.userId ? "מוחק…" : "מחק משתמש"}
                      </S.DeleteButton>
                    </S.Td>
                  </S.Tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableWrap>
        )}
      </div>

      <div>
        <S.SectionTitle>פניות מהמשתמשים</S.SectionTitle>
        {data.tickets.length === 0 ? (
          <S.Empty>אין פניות עדיין.</S.Empty>
        ) : (
          <S.TableWrap>
            <S.Table>
              <thead>
                <tr>
                  <S.Th>תאריך</S.Th>
                  <S.Th>משתמש</S.Th>
                  <S.Th>תוכן</S.Th>
                </tr>
              </thead>
              <tbody>
                {data.tickets.map((t) => (
                  <S.Tr key={t.id}>
                    <S.Td>{formatWhen(t.createdAt)}</S.Td>
                    <S.Td>{t.username}</S.Td>
                    <S.Td>
                      <S.TicketBody>{t.body}</S.TicketBody>
                    </S.Td>
                  </S.Tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableWrap>
        )}
      </div>
    </S.Root>
  );
}
