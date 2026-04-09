import type { Meta } from "../../api";
import { Card } from "../Card/Card";
import { FormField, FieldSelect } from "../FormField/FormField";
import { SmartModeInfo } from "../SmartModeInfo/SmartModeInfo";
import { PrimaryButton } from "../Button/Button";
import { LoadingState } from "../LoadingState/LoadingState";

const COUNTS = [5, 10, 15, 20, 30] as const;

type Props = {
  meta: Meta | null;
  loadingMeta: boolean;
  count: number;
  category: string;
  starting: boolean;
  onCount: (n: number) => void;
  onCategory: (c: string) => void;
  onStart: () => void;
};

export function QuizSetup({
  meta,
  loadingMeta,
  count,
  category,
  starting,
  onCount,
  onCategory,
  onStart,
}: Props) {
  return (
    <>
      <Card>
        {loadingMeta ? (
          <LoadingState />
        ) : (
          <>
            <FormField id="count" label="כמה שאלות במבחן?">
              <FieldSelect
                id="count"
                value={count}
                onChange={(e) => onCount(Number(e.target.value))}
              >
                {COUNTS.map((n) => (
                  <option key={n} value={n}>
                    {n} שאלות
                  </option>
                ))}
              </FieldSelect>
            </FormField>
            <FormField id="cat" label="נושא (אופציונלי)">
              <FieldSelect
                id="cat"
                value={category}
                onChange={(e) => onCategory(e.target.value)}
              >
                <option value="">הכל — מעורבב</option>
                {(meta?.categories || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </FieldSelect>
            </FormField>
            <SmartModeInfo />
            <PrimaryButton
              type="button"
              disabled={starting || !meta?.questionCount}
              onClick={onStart}
            >
              {starting ? "פותח מבחן…" : "התחל מבחן"}
            </PrimaryButton>
          </>
        )}
      </Card>
    </>
  );
}
