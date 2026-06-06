import { useEffect, useState } from "react";

/** מחזיר true כאשר ה־media query מתקיים, ומתעדכן בשינוי גודל המסך */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/** מתחת לרוחב הזה משחק ההתאמות בתרגול אינו זמין (מסך קטן מדי) */
export const LEARNING_MIN_WIDTH = 902;
export const NARROW_SCREEN_QUERY = `(max-width: ${LEARNING_MIN_WIDTH - 1}px)`;
