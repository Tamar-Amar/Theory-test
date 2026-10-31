import { Fragment, useEffect, useMemo, useState } from "react";
import {
  fetchAttemptDetail,
  fetchUserStats,
  updateUserLicenseType,
  type AttemptDetail,
  type Meta,
  type UserStats,
} from "../../api";
import { formatAvgMsPerQuestion } from "../../utils/formatAvgPerQuestion";
import { formatShortDate } from "../../utils/formatShortDate";
import { Chip } from "../Chip/Chip";
import { QuestionReviewList } from "../QuestionReviewList/QuestionReviewList";
import { NarrowOnly, WideOnly } from "../Responsive/Responsive";
import { StatCard } from "../StatCard/StatCard";
import { Tag } from "../Tag/Tag";
import { VehicleIcon } from "../VehicleIcon/VehicleIcon";
import { ProgressChart } from "./ProgressChart";
import * as S from "./PersonalStats.styles";

/** סדר הצגת סוגי הרישיון כמו ב‑Figma (מימין לשמאל) */
const LICENSE_ORDER = ["B", "A", "C1", "C", "D", "1"];
const licenseRank = (id: string) => {
  const i = LICENSE_ORDER.indexOf(id);
  return i === -1 ? LICENSE_ORDER.length : i;
};

function formatWhen(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : formatShortDate(d);
}

type Props = {
  meta: Meta | null;
  loadingMeta: boolean;
  licenseType: string;
  onLicenseTypeSaved: (licenseType: string) => void;
};

export function PersonalStats({
  meta,
  loadingMeta,
  licenseType,
  onLicenseTypeSaved,
}: Props) {
  const [data, setData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [savingLicense, setSavingLicense] = useState(false);
  const [licenseErr, setLicenseErr] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detailsById, setDetailsById] = useState<Record<string, AttemptDetail>>(
    {}
  );
  const [detailLoadingId, setDetailLoadingId] = useState<string | null>(null);
  const [detailErrById, setDetailErrById] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    fetchUserStats()
      .then((s) => {
        if (!cancelled) setData(s);
      })
      .catch((e) => {
        if (!cancelled) setErr(e instanceof Error ? e.message : "שגיאת טעינה");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectLicense = async (id: string) => {
    if (id === licenseType || savingLicense) return;
    setSavingLicense(true);
    setLicenseErr(null);
    try {
      const user = await updateUserLicenseType(id);
      onLicenseTypeSaved(user.licenseType || id);
    } catch (e) {
      setLicenseErr(e instanceof Error ? e.message : "שמירה נכשלה");
    } finally {
      setSavingLicense(false);
    }
  };

  const toggleDetails = (id: string, hasDetails: boolean) => {
    if (!hasDetails) return;
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
    if (detailsById[id]) return;
    setDetailLoadingId(id);
    setDetailErrById((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    fetchAttemptDetail(id)
      .then((d) => setDetailsById((m) => ({ ...m, [id]: d })))
      .catch((e) =>
        setDetailErrById((m) => ({
          ...m,
          [id]: e instanceof Error ? e.message : "שגיאת טעינה",
        }))
      )
      .finally(() => setDetailLoadingId(null));
  };

  // מדדים לפי נושא — נגזרים מהניסיונות האחרונים (אין פילוח נושאי בשרת)
  const topicStats = useMemo(() => {
    const cats = meta?.categories ?? [];
    const rows = data?.recentAttempts ?? [];
    return cats.map((cat) => {
      const matching = rows.filter((a) => a.category === cat);
      const avg = matching.length
        ? Math.round(
            matching.reduce((s, a) => s + a.percent, 0) / matching.length
          )
        : null;
      return { cat, avg };
    });
  }, [meta, data]);

  const lastPercent = data?.recentAttempts[0]?.percent;
  const avgTime =
    data?.averageMsPerQuestion != null
      ? formatAvgMsPerQuestion(data.averageMsPerQuestion)
      : "–";

  return (
    <S.Root>
      <S.PageTitle>האזור האישי</S.PageTitle>

      <S.LicenseSection>
        <S.CardLabel>סוג רישיון</S.CardLabel>
        {loadingMeta ? (
          <S.Hint>טוען סוגי רישיון…</S.Hint>
        ) : (
          <S.ChipRow>
            {[...(meta?.licenseTypes ?? [])]
              .sort((a, b) => licenseRank(a.id) - licenseRank(b.id))
              .map((lt) => (
                <Chip
                  key={lt.id}
                  active={licenseType === lt.id}
                  disabled={savingLicense}
                  icon={<VehicleIcon licenseId={lt.id} />}
                  onClick={() => selectLicense(lt.id)}
                >
                  {lt.label}
                </Chip>
              ))}
          </S.ChipRow>
        )}
        {!licenseType ? (
          <S.Warning>
            לפני תחילת מבחן או תרגול, בחרו כאן את סוג הרישיון שעליו אתם נבחנים.
          </S.Warning>
        ) : (
          <S.Hint>
            התרגול והמבחנים מותאמים לרישיון שבחרתם. ניתן לעדכן בכל עת.
          </S.Hint>
        )}
        {licenseErr ? <S.SaveError>{licenseErr}</S.SaveError> : null}
      </S.LicenseSection>

      {err ? <S.Empty>{err}</S.Empty> : null}

      {!err ? (
        <S.StatsRow>
          {loading || !data ? (
            Array.from({ length: 4 }).map((_, i) => (
              <S.StatCardSkeleton key={i} aria-hidden />
            ))
          ) : (
            <>
              {/* מימין לשמאל, כמו ב‑Figma */}
              <StatCard
                value={data.attemptsCount}
                label={
                  <>
                    מבחנים<WideOnly> שהושלמו</WideOnly>
                  </>
                }
              />
              <StatCard
                value={
                  data.averagePercent != null ? `${data.averagePercent}%` : "–"
                }
                label={
                  <>
                    <WideOnly>ממוצע אחוזי הצלחה</WideOnly>
                    <NarrowOnly>הצלחה</NarrowOnly>
                  </>
                }
              />
              <StatCard value={avgTime} label="ממוצע זמן לשאלה" />
              <StatCard
                value={lastPercent != null ? `${lastPercent}%` : "–"}
                label="המבחן האחרון"
              />
            </>
          )}
        </S.StatsRow>
      ) : null}

      {!err && data ? (
        <S.TwoCol>
          <ProgressChart recentAttempts={data.recentAttempts} />

          <S.Card>
            <S.SectionTitle>מדדים לפי נושא</S.SectionTitle>
            <S.TopicList>
              {topicStats.map(({ cat, avg }) => (
                <S.TopicRow key={cat}>
                  <S.TopicName>{cat}</S.TopicName>
                  {avg != null ? (
                    <Tag variant="warm">{avg}%</Tag>
                  ) : (
                    <S.Muted>–</S.Muted>
                  )}
                </S.TopicRow>
              ))}
            </S.TopicList>
          </S.Card>
        </S.TwoCol>
      ) : null}

      {!err && data ? (
        <S.TableCard>
          <S.SectionTitle>ניסיונות אחרונים</S.SectionTitle>
          {data.recentAttempts.length === 0 ? (
            <S.Empty>
              עדיין אין ניסיונות. עברו ללשונית «תרגול» והתחילו מבחן.
            </S.Empty>
          ) : (
            <S.TableWrap>
              <S.Table>
                <thead>
                  <tr>
                    <S.Th>תאריך</S.Th>
                    <S.Th>נושא</S.Th>
                    <S.Th>ציון</S.Th>
                    <S.Th>ממוצע לשאלה</S.Th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentAttempts.map((a) => (
                    <Fragment key={a.id}>
                      <S.Tr
                        $clickable={a.hasDetails}
                        onClick={() => toggleDetails(a.id, a.hasDetails)}
                      >
                        <S.Td>{formatWhen(a.createdAt)}</S.Td>
                        <S.Td>
                          {a.category ? a.category : <S.Muted>הכל</S.Muted>}
                        </S.Td>
                        <S.Td>
                          <S.Num>
                            {a.score} / {a.total}
                          </S.Num>
                        </S.Td>
                        <S.Td>
                          {a.avgMsPerQuestion != null ? (
                            formatAvgMsPerQuestion(a.avgMsPerQuestion)
                          ) : (
                            <S.Muted>–</S.Muted>
                          )}
                        </S.Td>
                      </S.Tr>
                      {expandedId === a.id ? (
                        <tr>
                          <S.ExpandedCell colSpan={4}>
                            <S.ExpandedInner>
                              {detailLoadingId === a.id &&
                              !detailsById[a.id] ? (
                                <S.Muted>טוען…</S.Muted>
                              ) : detailErrById[a.id] ? (
                                <S.Muted>{detailErrById[a.id]}</S.Muted>
                              ) : detailsById[a.id]?.items.length ? (
                                <>
                                  <S.SubSectionTitle>
                                    פירוט שאלות
                                  </S.SubSectionTitle>
                                  <QuestionReviewList
                                    items={detailsById[a.id].items}
                                  />
                                </>
                              ) : (
                                <S.Muted>
                                  לא נשמר פירוט למבחן זה (מבחן ישן).
                                </S.Muted>
                              )}
                            </S.ExpandedInner>
                          </S.ExpandedCell>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))}
                </tbody>
              </S.Table>
            </S.TableWrap>
          )}
        </S.TableCard>
      ) : null}
    </S.Root>
  );
}
