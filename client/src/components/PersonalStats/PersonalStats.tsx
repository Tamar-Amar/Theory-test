import { Fragment, useEffect, useState } from "react";
import {
  fetchAttemptDetail,
  fetchUserStats,
  updateUserLicenseType,
  type AttemptDetail,
  type Meta,
  type UserStats,
} from "../../api";
import { ProgressChart } from "./ProgressChart";
import { QuestionReviewList } from "../QuestionReviewList/QuestionReviewList";
import { formatAvgMsPerQuestion } from "../../utils/formatAvgPerQuestion";
import { FormField } from "../FormField/FormField";
import { SelectField } from "../SelectField/SelectField";
import { PrimaryButton, SecondaryButton } from "../Button/Button";
import * as S from "./PersonalStats.styles";

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
  const [selectedLicense, setSelectedLicense] = useState(licenseType);
  const [savingLicense, setSavingLicense] = useState(false);
  const [licenseErr, setLicenseErr] = useState<string | null>(null);
  const [saveOk, setSaveOk] = useState(false);
  const [editingLicense, setEditingLicense] = useState(!licenseType);
  const [expandedAttemptId, setExpandedAttemptId] = useState<string | null>(
    null
  );
  const [detailsById, setDetailsById] = useState<Record<string, AttemptDetail>>(
    {}
  );
  const [detailLoadingId, setDetailLoadingId] = useState<string | null>(null);
  const [detailErrById, setDetailErrById] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    setSelectedLicense(licenseType);
    if (licenseType) setEditingLicense(false);
  }, [licenseType]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    fetchUserStats()
      .then((s) => {
        if (!cancelled) setData(s);
      })
      .catch((e) => {
        if (!cancelled)
          setErr(e instanceof Error ? e.message : "שגיאת טעינה");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const pct = (n: number | null) =>
    n == null ? "-" : `${n}%`;

  const licenseOptions = (meta?.licenseTypes || []).map((row) => ({
    value: row.id,
    label: row.label,
  }));

  const selectedLicenseLabel =
    meta?.licenseTypes.find((row) => row.id === licenseType)?.label ||
    licenseOptions.find((row) => row.value === licenseType)?.label ||
    licenseType;

  const showLicenseEditor = editingLicense || !licenseType;

  const handleSaveLicense = async () => {
    if (!selectedLicense) {
      setLicenseErr("יש לבחור סוג רישיון");
      return;
    }
    setSavingLicense(true);
    setLicenseErr(null);
    setSaveOk(false);
    try {
      const user = await updateUserLicenseType(selectedLicense);
      onLicenseTypeSaved(user.licenseType || selectedLicense);
      setEditingLicense(false);
      setSaveOk(true);
      window.setTimeout(() => setSaveOk(false), 2500);
    } catch (e) {
      setLicenseErr(e instanceof Error ? e.message : "שמירה נכשלה");
    } finally {
      setSavingLicense(false);
    }
  };

  const ready = Boolean(!loading && !err && data);

  return (
    <S.Root>
      <S.LicenseCard>
        <S.SectionTitle>סוג הרישיון שלך</S.SectionTitle>
        {!licenseType ? (
          <S.LicenseWarning>
            לפני תחילת מבחן או תרגול, בחרו כאן את סוג הרישיון שעליו אתם נבחנים.
          </S.LicenseWarning>
        ) : (
          <S.LicenseIntro>
            התרגול והמבחנים מותאמים לרישיון שבחרתם. ניתן לעדכן בכל עת.
          </S.LicenseIntro>
        )}
        {loadingMeta ? (
          <S.Muted>טוען סוגי רישיון…</S.Muted>
        ) : licenseOptions.length ? (
          showLicenseEditor ? (
            <>
              <FormField id="profile-license" label="בחרו סוג רישיון">
                <SelectField
                  id="profile-license"
                  value={selectedLicense}
                  options={licenseOptions}
                  onChange={setSelectedLicense}
                  ariaLabel="סוג רישיון לתרגול"
                />
              </FormField>
              <S.LicenseActions>
                <PrimaryButton
                  type="button"
                  disabled={savingLicense || !selectedLicense}
                  onClick={handleSaveLicense}
                >
                  {savingLicense ? "שומר…" : "שמירת בחירה"}
                </PrimaryButton>
                {licenseType ? (
                  <SecondaryButton
                    type="button"
                    disabled={savingLicense}
                    onClick={() => {
                      setSelectedLicense(licenseType);
                      setEditingLicense(false);
                      setLicenseErr(null);
                    }}
                  >
                    ביטול
                  </SecondaryButton>
                ) : null}
                {saveOk ? <S.SaveOk>נשמר בהצלחה</S.SaveOk> : null}
              </S.LicenseActions>
              {licenseErr ? <S.LicenseHint>{licenseErr}</S.LicenseHint> : null}
            </>
          ) : (
            <S.LicenseCurrentRow>
              <S.LicenseCurrent>{selectedLicenseLabel}</S.LicenseCurrent>
              <SecondaryButton
                type="button"
                onClick={() => {
                  setSelectedLicense(licenseType);
                  setEditingLicense(true);
                  setLicenseErr(null);
                  setSaveOk(false);
                }}
              >
                שינוי סוג הרישיון שנבחר
              </SecondaryButton>
            </S.LicenseCurrentRow>
          )
        ) : (
          <S.Muted>לא נטענו סוגי רישיון מהמאגר.</S.Muted>
        )}
      </S.LicenseCard>

      {err ? <S.Empty>{err}</S.Empty> : null}

      {!err && (loading || data) ? (
        <>
          <S.SectionTitle>מדדים מפורטים</S.SectionTitle>
          <S.SummaryGrid>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <S.StatCardSkeleton key={i} aria-hidden />
              ))
            ) : data ? (
              <>
                <S.StatCard>
                  <S.StatValue>{data.attemptsCount}</S.StatValue>
                  <S.StatLabel>מבחנים שהושלמו</S.StatLabel>
                </S.StatCard>
                <S.StatCard>
                  <S.StatValue>{pct(data.averagePercent)}</S.StatValue>
                  <S.StatLabel>ממוצע אחוזי הצלחה</S.StatLabel>
                </S.StatCard>
                <S.StatCard>
                  <S.StatValue>{pct(data.bestPercent)}</S.StatValue>
                  <S.StatLabel>שיא באחוזים</S.StatLabel>
                </S.StatCard>
                <S.StatCard>
                  <S.StatValue>{data.totalCorrect}</S.StatValue>
                  <S.StatLabel>תשובות נכונות (סה״כ)</S.StatLabel>
                </S.StatCard>
                <S.StatCard>
                  <S.StatValue>{data.totalAnswered}</S.StatValue>
                  <S.StatLabel>שאלות שנענו (סה״כ)</S.StatLabel>
                </S.StatCard>
                <S.StatCard>
                  <S.StatValue>
                    {data.averageMsPerQuestion != null ? (
                      formatAvgMsPerQuestion(data.averageMsPerQuestion)
                    ) : (
                      "-"
                    )}
                  </S.StatValue>
                  <S.StatLabel>ממוצע זמן לשאלה (בכל המבחנים)</S.StatLabel>
                </S.StatCard>
              </>
            ) : null}
          </S.SummaryGrid>
        </>
      ) : null}

      <ProgressChart
        loading={loading && !err}
        recentAttempts={data?.recentAttempts ?? []}
        totalCorrect={data?.totalCorrect ?? 0}
        totalAnswered={data?.totalAnswered ?? 0}
      />

      {loading && !err ? (
        <>
          <S.SectionTitle>ניסיונות אחרונים</S.SectionTitle>
          <S.TableLoadingPlaceholder>טוען טבלה…</S.TableLoadingPlaceholder>
        </>
      ) : null}

      {ready && data ? (
        <>
          <div>
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
                      <S.Th>ציון</S.Th>
                      <S.Th>אחוז</S.Th>
                      <S.Th>נושא</S.Th>
                      <S.Th>ממוצע לשאלה</S.Th>
                      <S.Th>פירוט</S.Th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentAttempts.map((a) => (
                      <Fragment key={a.id}>
                        <S.Tr>
                          <S.Td>{formatWhen(a.createdAt)}</S.Td>
                          <S.Td>
                            {a.score}/{a.total}
                          </S.Td>
                          <S.Td>{a.percent}%</S.Td>
                          <S.Td>
                            {a.category ? (
                              a.category
                            ) : (
                              <S.Muted>הכל</S.Muted>
                            )}
                          </S.Td>
                          <S.Td>
                            {a.avgMsPerQuestion != null ? (
                              formatAvgMsPerQuestion(a.avgMsPerQuestion)
                            ) : (
                              <S.Muted>-</S.Muted>
                            )}
                          </S.Td>
                          <S.Td>
                            {a.hasDetails ? (
                              <S.DetailButton
                                type="button"
                                onClick={() => {
                                  if (expandedAttemptId === a.id) {
                                    setExpandedAttemptId(null);
                                    return;
                                  }
                                  setExpandedAttemptId(a.id);
                                  if (detailsById[a.id]) return;
                                  setDetailLoadingId(a.id);
                                  setDetailErrById((prev) => {
                                    const next = { ...prev };
                                    delete next[a.id];
                                    return next;
                                  });
                                  fetchAttemptDetail(a.id)
                                    .then((d) =>
                                      setDetailsById((m) => ({
                                        ...m,
                                        [a.id]: d,
                                      }))
                                    )
                                    .catch((e) =>
                                      setDetailErrById((m) => ({
                                        ...m,
                                        [a.id]:
                                          e instanceof Error
                                            ? e.message
                                            : "שגיאת טעינה",
                                      }))
                                    )
                                    .finally(() => setDetailLoadingId(null));
                                }}
                              >
                                {expandedAttemptId === a.id
                                  ? "הסתר פירוט"
                                  : "הצג פירוט"}
                              </S.DetailButton>
                            ) : (
                              <S.Muted title="מבחן ישן לפני שמירת פירוט במערכת">
                                -
                              </S.Muted>
                            )}
                          </S.Td>
                        </S.Tr>
                        {expandedAttemptId === a.id && (
                          <S.Tr>
                            <S.ExpandedCell colSpan={6}>
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
                          </S.Tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </S.Table>
              </S.TableWrap>
            )}
          </div>
        </>
      ) : null}
    </S.Root>
  );
}
