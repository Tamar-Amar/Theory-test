import type { Meta } from "../../api";
import { TopicsPanel } from "./TopicsPanel";

type Props = { meta: Meta | null };

export function LearningArea({ meta }: Props) {
  return <TopicsPanel meta={meta} />;
}
