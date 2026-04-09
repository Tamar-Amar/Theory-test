/** תצוגת ממוצע זמן לשאלה (מילישניות) */
export function formatAvgMsPerQuestion(ms: number) {
  const sec = ms / 1000;
  if (sec < 60) return `${sec.toFixed(1)} שנ׳`;
  const s = Math.floor(sec);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
