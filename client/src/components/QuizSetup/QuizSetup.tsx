import type { Meta } from "../../api";
import { Card } from "../Card/Card";
import { FormField } from "../FormField/FormField";
import { SelectField } from "../SelectField/SelectField";
import { SmartModeInfo } from "../SmartModeInfo/SmartModeInfo";
import { PrimaryButton } from "../Button/Button";
import { LoadingState } from "../LoadingState/LoadingState";

const COUNTS = [5, 10, 15, 20, 30] as const;

const COUNT_OPTIONS = COUNTS.map((n) => ({
  value: String(n),
  label: `${n} שאלות`,
}));

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
              <SelectField
                id="count"
                value={String(count)}
                options={COUNT_OPTIONS}
                onChange={(v) => onCount(Number(v))}
                ariaLabel="כמה שאלות במבחן"
              />
            </FormField>
            <FormField id="cat" label="נושא (אופציונלי)">
              <SelectField
                id="cat"
                value={category}
                options={[
                  { value: "", label: "הכל - מעורבב" },
                  ...(meta?.categories || []).map((c) => ({
                    value: c,
                    label: c,
                  })),
                ]}
                onChange={onCategory}
                ariaLabel="נושא המבחן"
              />
            </FormField>
            <SmartModeInfo />
            <PrimaryButton
              type="button"
              disabled={starting || !meta?.questionCount}
              onClick={onStart}
            >
              {starting ? "פותחים מבחן…" : "התחילו מבחן"}
            </PrimaryButton>
          </>
        )}
      </Card>
    </>
  );
}
